import { Image } from '@chakra-ui/image';
import { Container, Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
// import Loader from '../components/Loader';

import { Splash1 } from '../assets';

const Login = () => {
  return (
    <VStack w="100%" h="100vh" justifyContent="center" alignItems="center">
      <Container maxW="container.xl">
        <SimpleGrid
          columns={2}
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
        >
          <VStack
            alignItems="flex-start"
            justifyContent="center"
            h="100%"
            pr={20}
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
            <PrimaryButton px="50" py="6">
              Join us now
            </PrimaryButton>
          </VStack>
          <Image src={Splash1} alt="Login" />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Login;
