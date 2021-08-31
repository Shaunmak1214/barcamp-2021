import React from 'react';
import {
  Container,
  VStack,
  Link,
  Center,
  Flex,
  HStack,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { BarcampWhiteLogo } from '../../assets/';
import { Text } from '@chakra-ui/react';

const Index = () => {
  return (
    <>
      <Center bg="linear-gradient(90deg, #1050A0 0%, #EA202C 99.99%, #EB202B 100%, #EB202B 100%)">
        <Container maxW="container.xl" color="#ffffff">
          <Flex
            w="100%"
            flexDir={['column', 'column', 'row']}
            justifyContent="space-between"
            py="55"
          >
            <VStack alignItems="flex-start">
              <Image
                width="250px"
                height="auto"
                src={BarcampWhiteLogo}
                alt="Barcamp-logo"
              />
            </VStack>
            <VStack alignItems="flex-start">
              <Link href="/">
                <Text fontSize="20px">AGENDA</Text>
              </Link>
              <Link href="/">
                <Text fontSize="20px">FAQ</Text>
              </Link>
              <Link href="/">
                <Text fontSize="20px">SPONSORS</Text>
              </Link>
            </VStack>
            <VStack alignItems="flex-start">
              <Text>FOLLOW US</Text>
            </VStack>
          </Flex>
        </Container>
      </Center>
      <HStack
        justifyContent="center"
        alignItems="center"
        borderTop="1px solid rgb(255, 255 , 255, .7 )"
        bg="linear-gradient(90deg, #1050A0 0%, #EA202C 99.99%, #EB202B 100%, #EB202B 100%)"
        py="20px"
      >
        <Text color="#ffffff">
          <span style={{ opacity: 0.8 }}>Organized by</span> IT Society
          Cyberjaya
        </Text>
      </HStack>
    </>
  );
};

export default Index;
