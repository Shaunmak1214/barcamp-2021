import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN } from '../reducers/authSlice';
import store from '../store/store';

import { Image } from '@chakra-ui/image';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/layout';

import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { useAuthorized } from '../hooks';

import { LoginBanner } from '../assets';

require('dotenv').config();

const Login = () => {
  const dispatch = useDispatch();
  const authStore = store.getState().auth;
  const { authorized, checkAuthorized } = useAuthorized('auth/check');

  const handleGoogleLogin = async (googleData) => {
    if (googleData) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/`, {
          googleId: googleData.tokenId,
        })
        .then((res) => {
          if (res.status === 201) {
            let decodedData = jwt_decode(res.data.accessToken);
            let loginObj = {
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              user: decodedData,
            };
            dispatch(LOGIN(loginObj));
            window.location.href = '/dashboard';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  if (authStore.isAuthenticated && authorized) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <VStack
        w="100%"
        h="100vh"
        justifyContent={['flex-start', 'flex-start', 'center']}
        alignItems="center"
      >
        <BCSpacer d={['flex', 'none', 'none']} size="sm" />
        <Container maxW="container.xl">
          <SimpleGrid
            columns={[1, 1, 2]}
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <VStack
              alignItems="flex-start"
              justifyContent="center"
              h="100%"
              pr={[10, 0, 20]}
            >
              <Text as="h1" fontSize="4xl" fontWeight="600">
                LOGIN TO BarCamp 2021!
              </Text>
              <Text as="h2" fontSize="xl" fontWeight="300">
                Login with your google account to participate BarCamp 2021 now!
                We only use this authentication to get your email and protect
                the app from unauthorised input.
              </Text>
              <BCSpacer size="2xs" />
              <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={(renderProps) => (
                  <PrimaryButton
                    onClick={() => {
                      renderProps.onClick();
                    }}
                    disabled={renderProps.disabled}
                    px="50"
                    py="6"
                  >
                    Login to BarCamp
                  </PrimaryButton>
                )}
                autoLoad={false}
                onAutoLoadFinished={() => {
                  console.log('Google Login Loaded');
                }}
                buttonText="Log in with Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
              />
            </VStack>
            <Image
              d={['none', 'none', 'block']}
              src={LoginBanner}
              alt="Login"
            />
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
};

export default Login;
