import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../reducers/authSlice';

import {
  Container,
  VStack,
  Link,
  Center,
  SimpleGrid,
  Box,
  HStack,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Text } from '@chakra-ui/react';

import {
  BarcampWhiteLogo,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from '../../assets/';

const Index = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LOGOUT());
    window.location.href = '/login';
  };

  return (
    <>
      <Center bg="linear-gradient(90deg, #1050A0 0%, #EA202C 99.99%, #EB202B 100%, #EB202B 100%)">
        <Container maxW="container.xl" color="#ffffff">
          <SimpleGrid
            columns={[1, 1, 3]}
            spacing={['40px', '40px', '100px']}
            p="45px 0"
          >
            <VStack
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="center"
            >
              <Image
                width="250px"
                height="auto"
                src={BarcampWhiteLogo}
                alt="Barcamp-logo"
              />
            </VStack>
            <VStack
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="center"
            >
              <Box>
                <Link href="/" textDecorationLine="underline">
                  <Text fontSize="xl" pb="10px">
                    AGENDA
                  </Text>
                </Link>
                <Link href="/" textDecorationLine="underline">
                  <Text fontSize="xl" pb="10px">
                    FAQ
                  </Text>
                </Link>
                <Link href="/" textDecorationLine="underline">
                  <Text fontSize="xl" pb="10px">
                    SPONSORS
                  </Text>
                </Link>
                <Link onClick={() => logout()} textDecorationLine="underline">
                  <Text fontSize="xl" pb="10px">
                    LOGOUT
                  </Text>
                </Link>
              </Box>
            </VStack>
            <VStack
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="center"
            >
              <Text>FOLLOW US</Text>
              <HStack
                width="130px"
                justifyContent="space-between"
                alignItems="center"
                pt="10px"
              >
                <Image src={FacebookIcon} />
                <Image src={InstagramIcon} />
                <Image src={LinkedinIcon} />
              </HStack>
            </VStack>
          </SimpleGrid>
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
