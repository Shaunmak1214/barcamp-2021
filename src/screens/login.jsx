import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import { useDispatch } from 'react-redux';
import { LOGIN } from '../reducers/authSlice';
import store from '../store/store';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { loadGoogleScript } from '../lib/GoogleLogin';

import { Image } from '@chakra-ui/image';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import BCSpacer from '../components/Spacer';
import { useAuthorized } from '../hooks';
import { PrimaryButton } from '../components/Buttons';
import { LoginBanner } from '../assets';

require('dotenv').config();

function Login() {
  const toast = useToast();
  const dispatch = useDispatch();
  const authStore = store.getState().auth;
  const { authorized, checkAuthorized } = useAuthorized('auth/check');

  // eslint-disable-next-line
  const [gapi, setGapi] = useState();
  // eslint-disable-next-line
  const [googleAuth, setGoogleAuth] = useState();
  const [attached, setAttached] = useState(true);

  const onSuccess = async (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;

    if (id_token) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/`, {
          googleId: googleUser.$b.id_token,
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
      toast({
        title: `Google Login Failed`,
        description: 'Use the chrome browser instead.',
        variant: 'top-accent',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onFailure = () => {
    toast({
      title: `Google Login Failed`,
      description: 'Use the chrome browser instead.',
      variant: 'top-accent',
      status: 'error',
      isClosable: true,
    });
  };

  // const logOut = () => {
  //   // (Ref. 8)
  //   (async () => {
  //     await googleAuth.signOut();
  //   })();
  // };

  const attachSignIn = (auth2) => {
    auth2.attachClickHandler(
      'google-signin',
      {
        scope: 'profile email',
      },
      onSuccess,
      onFailure,
    );

    setAttached(false);
  };

  useEffect(() => {
    checkAuthorized();

    // Window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      setGapi(_gapi);

      _gapi.load('auth2', () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          });
          setGoogleAuth(_googleAuth);
          attachSignIn(_googleAuth);
        })();
      });
    };

    // Ensure everything is set before loading the script
    loadGoogleScript(); // (Ref. 9)
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
              <PrimaryButton
                id="google-signin"
                disabled={attached}
                px="50"
                py="6"
              >
                Login to BarCamp
              </PrimaryButton>
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
}

export default Login;
