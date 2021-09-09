import { Image } from '@chakra-ui/image';
import { Container, Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
// import Loader from '../components/Loader';

import { Splash1 } from '../assets';

const Login = () => {
  const handleGoogleLogin = async (googleData) => {
    console.log(googleData);
    // if (googleData) {
    //   await axios
    //     .post(`${process.env.REACT_APP_API_URL}auth/google`, {
    //       token: googleData.tokenId,
    //     })
    //     .then((res) => {
    //       if (res.status === 201) {
    //         // dispatch(LOGIN(res.data));
    //         // history.push("/home");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // toast({
    //       //   title: "Failed to Load",
    //       //   description: "Something went wrong on our side!",
    //       //   status: "error",
    //       //   duration: 10,
    //       //   isClosable: false,
    //       //   position: "top",
    //       // });
    //     });
    // } else {
    //   console.log("error");
    // }
  };

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
                clientId="295011704852-9n96q9tn0r8jmrmdoh0ltrku4sqm9obj.apps.googleusercontent.com"
                render={(renderProps) => (
                  <PrimaryButton
                    onClick={() => {
                      renderProps.onClick();
                    }}
                    disabled={renderProps.disabled}
                    px="50"
                    py="6"
                  >
                    Join us now
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
