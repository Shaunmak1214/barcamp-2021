import React from 'react';

import { Image } from '@chakra-ui/image';
import {
  Container,
  HStack,
  VStack,
  Center,
  Box,
  SimpleGrid,
  Heading,
} from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import Faq from '../components/Faqs';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { SectionTitle } from '../components/SectionTitle';
import { CountDownBlock } from 'components/Countdown';
import Sponsor from '../components/Sponsors';
import Banner from '../components/Banner';

import { useCountdown } from '../hooks';

import {
  BarcampLandingImg,
  BarcampLandingImgMobile,
  ShareIcon,
  IconContainer,
  TrainingIcon,
  LightIcon,
  SectionBg,
  SamplePicOne,
  SamplePicTwo,
  SamplePicThree,
  SamplePicFour,
  SamplePicFive,
  SamplePicSix,
  CountDownGif,
} from '../assets';

const Index = () => {
  const { daysRef, hoursRef, minutesRef, secondsRef } = useCountdown(
    'September 25, 2021 00:00:00',
  );

  const LandingImgRenderer = () => {
    if (window.screen.width < 768) {
      return (
        <Image
          position="absolute"
          src={BarcampLandingImgMobile}
          w="100%"
          h="100%"
        />
      );
    } else {
      return (
        <Image position="absolute" src={BarcampLandingImg} w="100%" h="100%" />
      );
    }
  };

  return (
    <>
      <HStack
        position="relative"
        w="100%"
        h={['88vh', null, '100vh']}
        justifyContent="center"
        alignItems="center"
      >
        <LandingImgRenderer />
        <Container maxW="container.xl">
          <VStack w={['100%', '50%', '35%']} alignItems="flex-start">
            <Heading fontSize="3xl" fontWeight="400" lineHeight="1.5">
              We bring people together to share their passion around technology.
            </Heading>
            <BCSpacer size="sm" />
            <PrimaryButton
              py="25px"
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Join Us Now
            </PrimaryButton>
          </VStack>
        </Container>
      </HStack>
      <Center id="countdown-timer" alignItems="center" justifyContent="center">
        <Container
          maxW="container.xl"
          py={['50px', '100px']}
          justifyContent="center"
          alignItems="center"
        >
          <Heading textAlign="center" fontSize="4xl">
            We can&apos;t wait to show you what we&apos;ve got prepared
          </Heading>
          <Box
            position="relative"
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={CountDownGif} />
          </Box>

          <SimpleGrid
            columns={[1, 1, 4]}
            spacing={2}
            textAlign="center"
            justifyItems="center"
            alignItems="center"
          >
            <CountDownBlock
              marginTop="-150px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['180px', '0']}
            >
              <Text
                ref={daysRef}
                fontSize="2xl"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Days
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-150px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['180px', '0']}
            >
              <Text
                ref={hoursRef}
                fontSize="2xl"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Hours
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-150px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['180px', '0']}
            >
              <Text
                ref={minutesRef}
                fontSize="2xl"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Minutes
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-150px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['180px', '0']}
            >
              <Text
                ref={secondsRef}
                fontSize="2xl"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Seconds
              </Text>
            </CountDownBlock>
          </SimpleGrid>
        </Container>
      </Center>

      {/* What is Barcamp section */}
      <Center id="about" py="20" bgImage={SectionBg} flexDir="column">
        <Container maxW="container.xl">
          <SectionTitle type="center" color="#ffffff" alignItems="flex-start">
            What is Barcamp?
          </SectionTitle>
        </Container>
        <Container
          maxW="container.lg"
          py="70px"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#ffffff" textAlign="center" fontSize={['lg', '2xl']}>
            Barcamp Cyberjaya is an annual user-generated unconference with
            topics surrounding technology and entrepreneurships.
          </Text>
        </Container>

        <Container maxW="container.md" pt="25px">
          <SimpleGrid columns={['1', '1', '3']} spacing="15px">
            <VStack mb="35px">
              <Box p="35px" borderRadius="5px" bgImage={IconContainer}>
                <Image src={ShareIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Share
              </Text>
            </VStack>
            <VStack mb="35px">
              <Box p="35px" borderRadius="5px" bgImage={IconContainer}>
                <Image src={TrainingIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Learn
              </Text>
            </VStack>
            <VStack mb="35px">
              <Box p="35px" borderRadius="5px" bgImage={IconContainer}>
                <Image src={LightIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Inspire
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Center>

      {/* FAQs section */}
      <Faq id="faq" />

      {/* Gallery Section */}
      <Center pt="80px" bgImage={SectionBg} flexDir="column">
        <Container pb="50px" maxW="container.xl">
          <SectionTitle type="center" color="#ffffff">
            GALLERY
          </SectionTitle>
        </Container>
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            <Box>
              <Image src={SamplePicOne} />
            </Box>
            <Box>
              <Image src={SamplePicTwo} />
            </Box>
            <Box>
              <Image src={SamplePicThree} />
            </Box>
            <Box>
              <Image src={SamplePicFour} />
            </Box>
            <Box>
              <Image src={SamplePicFive} />
            </Box>
            <Box>
              <Image src={SamplePicSix} />
            </Box>
          </SimpleGrid>
          <BCSpacer size="md" />
        </Container>
      </Center>

      {/* Sponsorship Section */}
      <Sponsor id="sponsors" />

      {/* Banner */}
      <Banner />
    </>
  );
};

export default Index;
