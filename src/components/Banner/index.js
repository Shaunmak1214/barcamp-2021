import { Center, Container, HStack, Text } from '@chakra-ui/layout';
import React from 'react';

import { RegisterButton } from '../Buttons';

const Index = () => {
  return (
    <Center boxShadow="0px 0px 40px rgba(0, 0, 0, 0.25)">
      <Container maxW="container.xl">
        <HStack justifyContent="space-between" py="40px">
          <Text
            as="h3"
            fontSize="35px"
            fontWeight="600"
            textTransform="uppercase"
            bgImage="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
            backgroundClip="text"
          >
            GET YOUR SEATS NOW!
          </Text>
          <RegisterButton
            onClick={() => {
              window.location.href = '/login';
            }}
          />
        </HStack>
      </Container>
    </Center>
  );
};

export default Index;
