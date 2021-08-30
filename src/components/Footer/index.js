import React from 'react';
import {
  Container,
  VStack,
  Link,
  StackDivider,
  HStack,
  Center,
  Flex,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { BarcampWhiteLogo } from '../../assets/';
import { Text } from '@chakra-ui/react';

const Index = () => {
  return (
    <Center
      bg="linear-gradient(90deg, #1050A0 0%, #EA202C 99.99%, #EB202B 100%, #EB202B 100%)"
      py="6"
    >
      <Container maxW="container.xl" color="#ffffff">
        <Flex
          w="100%"
          flexDir={['column', 'column', 'row']}
          justifyContent="space-between"
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
          <VStack
            alignItems="flex-start"
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Text>FOLLOW US</Text>
            <HStack>
              <Text>
                <span style={{ opacity: 0.8 }}>Organized by</span> IT Society
                Cyberjaya
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Center>
  );
};

export default Index;
