import { Center, Container, Flex, Text } from '@chakra-ui/layout';
import React from 'react';

import { PrimaryButton } from '../Buttons';

const Index = () => {
  return (
    <Center boxShadow="0px 0px 40px rgba(0, 0, 0, 0.25)">
      <Container maxW="container.xl">
        <Flex
          flexDir={['column', 'row', 'row']}
          justifyContent="space-between"
          alignItems="center"
          py="40px"
        >
          <Text
            as="h3"
            fontSize="4xl"
            fontWeight="600"
            textTransform="uppercase"
            bgImage="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
            backgroundClip="text"
            mb={['5', '0', '0']}
          >
            GET YOUR SEATS NOW!
          </Text>
          <PrimaryButton
            w={['100%', 'fit-content', 'fit-content']}
            py="25px"
            px="45px"
            fontFamily="Source Sans Pro"
            onClick={() => {
              window.location.href =
                'https://docs.google.com/forms/d/e/1FAIpQLSdTi-Pyc6i7L_CtYAleBQuQXI94jvIxW04xfXv_EuITz8Ausw/viewform';
            }}
          >
            Login / Register
          </PrimaryButton>
        </Flex>
      </Container>
    </Center>
  );
};

export default Index;
