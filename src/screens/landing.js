import { Image } from '@chakra-ui/image';
import { Container, HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';

import { SecondaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';

import { BarcampLandingImg } from '../assets';

const Index = () => {
  return (
    <HStack
      position="relative"
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Image position="absolute" src={BarcampLandingImg} w="100%" h="100%" />
      <Container maxW="container.xl">
        <VStack w="35%" alignItems="flex-start">
          <Text fontSize="35px">
            We bring people together to share their passion around technology.
          </Text>
          <BCSpacer size="sm" />
          <SecondaryButton py="7" px="10">
            Join Us Now
          </SecondaryButton>
        </VStack>
      </Container>
    </HStack>
  );
};

export default Index;
