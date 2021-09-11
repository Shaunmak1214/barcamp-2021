import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN } from '../reducers/authSlice';
import store from '../store/store';

import { Image } from '@chakra-ui/image';
import { Container, Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';

import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { useAuthorized } from '../hooks/';

import { Splash1 } from '../assets';

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
            let loginObj = {
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              user: jwt_decode(res.data.accessToken),
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
                WELCOME TO BARCAMP
              </Text>
              <Text as="h2" fontSize="md" fontWeight="500">
                Please login to continue. By logging in, you agree to our{' '}
                <Link color="blue">privacy policy</Link> . We only use this
                authentication to get your email and protect the app from
                unauthorised input.
              </Text>
              <BCSpacer size="sm" />
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
                    Login to barcamp
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
            <Image d={['none', 'none', 'block']} src={Splash1} alt="Login" />
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
};

export default Login;
