import React, { useRef } from 'react';

import { Image } from '@chakra-ui/image';
import {
  Center,
  Container,
  HStack,
  Link,
  VStack,
  Box,
} from '@chakra-ui/layout';

import { Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { PrimaryButton } from '../Buttons';
import {
  MenuIcon,
  LinksIcon,
  CountdownIcon,
  MobileMenuIcon,
} from '../../assets/';
import BCSpacer from 'components/Spacer';
import { useCountdown } from '../../hooks';

const MobileMenu = () => {
  const { daysRef, hoursRef, minutesRef, secondsRef } = useCountdown(
    'October 2, 2021 00:00:00',
  );
  const isOpen = useRef(false);

  return (
    <>
      <VStack
        width="25px"
        height="25px"
        alignItems="center"
        justifyContent="space-around"
        cursor="pointer"
        right="15px"
        position="relative"
        zIndex="100"
        display={['block', 'none']}
        onClick={() => {
          isOpen.current.style.transform = 'translate(-52%, -0%) scale(1.00)';
          isOpen.current.style.opacity = '1';
          isOpen.current.style.visibility = 'visible';
        }}
      >
        <Box>
          <Image w="24px" h="15px" src={MobileMenuIcon} />
        </Box>
      </VStack>
      <VStack
        ref={isOpen}
        visibility="hidden"
        opacity="0"
        justifyContent="flex-start"
        bg="#fff"
        minW="92vw"
        h="92vh"
        position="absolute"
        top="20px"
        left="50%"
        transform="translate(-52%, -0%) scale(0.95)"
        transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
        transformOrigin="100% 0;"
        zIndex="100"
        overflow="hidden"
        boxShadow="0 3rem 5rem rgba(0, 0, 0, 0.3);"
        borderRadius="8px"
      >
        <VStack
          position="relative"
          px="2em"
          py="1rem"
          w="100%"
          h="100%"
          spacing="3"
          alignItems="flex-start"
          overflow="auto"
        >
          <Box
            d="flex"
            position="absolute"
            top="30px"
            right="40px"
            justifyContent="flex-end"
          >
            <CloseIcon
              w="12px"
              h="12px"
              onClick={() => {
                isOpen.current.style.transform =
                  'translate(-52%, -0%) scale(0.95)';
                isOpen.current.style.opacity = '0';
                isOpen.current.style.visibility = 'hidden';
              }}
            />
          </Box>

          <BCSpacer size="5xs" />
          <HStack alignItems="center">
            <Image src={CountdownIcon} h="18px" w="18px" />
            <Text
              fontSize="lg"
              fontWeight="600"
              color="#797979"
              fontFamily="Montserrat"
              mt="0px"
            >
              Countdown
            </Text>
          </HStack>
          <BCSpacer size="5xs" />
          <Container
            py="0.8rem"
            background="linear-gradient(91.71deg, rgba(184, 215, 255, 0.25) 4.01%, rgba(255, 205, 208, 0.25) 63.96%)"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontFamily="Montserrat" fontSize="sm" textAlign="center">
              <span ref={daysRef}>0</span> days : <span ref={hoursRef}>0</span>{' '}
              hours : <span ref={minutesRef}>0</span> minutes{' '}
              <span style={{ display: 'none' }} ref={secondsRef}></span>
            </Text>
          </Container>

          <BCSpacer size="3xs" />
          <HStack alignItems="center">
            <Image src={MenuIcon} h="15px" w="15px" />
            <Text
              fontSize="lg"
              fontWeight="600"
              color="#797979"
              fontFamily="Montserrat"
              mt="0px"
            >
              Menu
            </Text>
          </HStack>

          <BCSpacer size="5xs" />
          <VStack alignItems="flex-start">
            <Link href="/">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Home
              </Text>
            </Link>
            <Link href="/#about">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                About Us
              </Text>
            </Link>
            <Link href="/#agenda">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Agenda
              </Text>
            </Link>
            <Link href="/#faq">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Faq
              </Text>
            </Link>
            <Link href="/#sponsors">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Sponsors
              </Text>
            </Link>
          </VStack>

          <BCSpacer size="3xs" />
          <HStack alignItems="center">
            <Image src={LinksIcon} h="15px" w="15px" />
            <Text
              fontSize="lg"
              fontWeight="600"
              color="#797979"
              fontFamily="Montserrat"
              mt="0px"
            >
              Quick Links
            </Text>
          </HStack>

          <BCSpacer size="5xs" />
          <VStack alignItems="flex-start">
            <Link href="/dashboard">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Participant Dashboard
              </Text>
            </Link>
            <Link href="/propose-topic">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Propose Topic
              </Text>
            </Link>
            <Link href="/vote-topic">
              <Text fontSize="sm" fontFamily="Montserrat" fontWeight="600">
                Vote Topics
              </Text>
            </Link>
          </VStack>
        </VStack>
        <Center w="100%" p="2em" alignItems="flex-end">
          <PrimaryButton w="100%" py="0px">
            Join us now
          </PrimaryButton>
        </Center>
      </VStack>
    </>
  );
};

export default MobileMenu;
