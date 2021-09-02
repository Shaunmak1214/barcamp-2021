import { Image } from '@chakra-ui/image';
import { Container, Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
// import Loader from '../components/Loader';

import { Splash1 } from '../assets';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextFormField } from '../components/Forms';

const schema = yup.object({
  email: yup.string().email(),
});

const Login = () => {
  // const handleGoogleLogin = async (googleData) => {
  //   if (googleData) {
  //     await axios
  //       .post(`${API_URL}auth/google`, {
  //         googleToken: googleData.tokenId,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           dispatch(
  //             LOGIN({
  //               access_token: res.data,
  //             }),
  //           );
  //           /* setLoggedIn(true) */
  //           window.location.href = '/';
  //         } else {
  //           setErrorMessage(`Google Log In Failed ${res.data}`);
  //           setGoogleSignInClicked(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setErrorMessage(`Google Log In Failed ${googleData.tokenId}`);
  //         setGoogleSignInClicked(false);
  //       });
  //   } else {
  //     console.log('error');
  //   }
  // };

  return (
    <VStack w="100%" minH="100vh" justifyContent="center" alignItems="center">
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
            pr={[0, 0, 20]}
          >
            <Text as="h1" fontSize="35px" fontWeight="600">
              WELCOME TO BARCAMP
            </Text>
            <Text as="h2" fontSize="15px" fontWeight="500">
              Please login to continue. By logging in, you agree to our{' '}
              <Link color="blue">privacy policy</Link> . We only use this
              authentication to get your email and protect the app from
              unauthorised input.
            </Text>
            <BCSpacer size="sm" />
            <GoogleLogin
              clientId="202957668239-rkdg4atg2h8n5br8akn5c1k0s4uno6cm.apps.googleusercontent.com"
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
              // onSuccess={handleGoogleLogin}
              // onFailure={handleGoogleLogin}
              cookiePolicy={'single_host_origin'}
            />

            <Formik
              validationSchema={schema}
              initialValues={{ email: '' }}
              onSubmit={() => {}}
            >
              {() => (
                <Form>
                  <div>
                    <Field
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      component={TextFormField}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </VStack>
          <Image src={Splash1} alt="Login" />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Login;
