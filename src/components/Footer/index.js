import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../reducers/authSlice';

import {
  VStack,
  Link,
  Center,
  SimpleGrid,
  Box,
  HStack,
  Flex,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Text } from '@chakra-ui/react';
import store from '../../store/store';
import {
  BarCampWhiteLogo,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from '../../assets/';

const Index = () => {
  const dispatch = useDispatch();
  const authState = store.getState().auth;

  const logout = () => {
    dispatch(LOGOUT());
    window.location.href = '/login';
  };

  return (
    <>
      <Center bg="linear-gradient(90deg, #1050A0 0%, #EA202C 99.99%, #EB202B 100%, #EB202B 100%)">
        <Flex
          maxW="container.xl"
          w="100%"
          flexDir={['column', 'column', 'row']}
          justifyContent="space-between"
          color="#ffffff"
          py="3"
        >
          <VStack
            alignItems={['flex-start', 'flex-start', 'center']}
            justifyContent="center"
          >
            <Image
              width="400px"
              height="auto"
              src={BarCampWhiteLogo}
              alt="BarCamp-logo"
              onClick={() => {
                window.location.href = '/';
              }}
            />
          </VStack>
          <SimpleGrid
            columns={[1, 1, authState.isAuthenticated ? 3 : 2]}
            spacing={['40px', '40px', '0px']}
            p="25px 0px"
            alignItems={['center', 'center', 'flex-start']}
            w="100%"
          >
            <VStack
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyItems={['flex-start', 'flex-start', 'center']}
              pl="20px"
            >
              <VStack w="fit-content" alignItems="flex-start">
                <Box>
                  <Text fontSize="lg" fontWeight="700" pb="10px">
                    QUICK LINKS
                  </Text>

                  <Link href="/#about">
                    <Text fontSize="md" pb="10px">
                      {'>'} ABOUT
                    </Text>
                  </Link>
                  <Link href="/#agenda">
                    <Text fontSize="md" pb="10px">
                      {'>'} AGENDA
                    </Text>
                  </Link>
                  <Link href="/#faq">
                    <Text fontSize="md" pb="10px">
                      {'>'} FAQ
                    </Text>
                  </Link>
                  <Link href="/#sponsors">
                    <Text fontSize="md" pb="10px">
                      {'>'} SPONSORS
                    </Text>
                  </Link>
                  <Link href="mailto: itsoc.mmu@gmail.com">
                    <Text fontSize="md" pb="10px">
                      {'>'} CONTACT US
                    </Text>
                  </Link>
                </Box>
              </VStack>
            </VStack>
            <VStack
              d={authState.isAuthenticated ? 'flex' : 'none'}
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyItems={['flex-start', 'flex-start', 'center']}
              pl="20px"
            >
              <VStack w="fit-content" alignItems="flex-start">
                <Box>
                  <Text fontSize="lg" fontWeight="700" pb="10px">
                    PARTICIPANT
                  </Text>
                  <Link href="/dashboard">
                    <Text fontSize="md" pb="10px">
                      {'>'} DASHBOARD
                    </Text>
                  </Link>
                  <Link href="/propose-topic">
                    <Text fontSize="md" pb="10px">
                      {'>'} PROPOSE TOPIC
                    </Text>
                  </Link>
                  <Link href="/vote-topic">
                    <Text fontSize="md" pb="10px">
                      {'>'} VOTE TOPIC
                    </Text>
                  </Link>
                  <Link onClick={() => logout()}>
                    <Text fontSize="md" pb="10px">
                      {'>'} LOGOUT
                    </Text>
                  </Link>
                </Box>
              </VStack>
            </VStack>
            <VStack
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyItems={['flex-start', 'flex-start', 'center']}
              pl="20px"
            >
              <VStack w="fit-content" alignItems="flex-start">
                <Text fontSize="lg" fontWeight="700" pb="10px">
                  FOLLOW US
                </Text>
                <VStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing="15px"
                >
                  <Link
                    href="https://www.facebook.com/ITsocietyMMU/"
                    d="flex"
                    alignItems="center"
                  >
                    <Image src={FacebookIcon} h="18px" w="18px" mr="8px" />{' '}
                    ITSociety MMU Cyberjaya
                  </Link>

                  <Link
                    href="https://www.instagram.com/itsocietymmu/"
                    d="flex"
                    alignItems="center"
                  >
                    <Image src={InstagramIcon} h="18px" w="18px" mr="8px" />{' '}
                    itsocietymmu
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/it-society-mmu-cyberjaya/"
                    d="flex"
                    alignItems="center"
                  >
                    <Image src={LinkedinIcon} h="18px" w="18px" mr="8px" /> IT
                    Society Cyberjaya
                  </Link>
                </VStack>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Flex>
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
