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
  Flex,
} from '@chakra-ui/layout';
import { Text, CloseButton } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import Faq from '../components/Faqs';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { SectionTitle } from '../components/SectionTitle';
import { CountDownBlock } from 'components/Countdown';
import Sponsor from '../components/Sponsors';
import Banner from '../components/Banner';

import { useCountdown } from '../hooks';

import {
  BarCampLandingImg,
  BarCampLandingImgMobile,
  ShareIcon,
  IconContainer,
  TrainingIcon,
  LightIcon,
  SectionBg,
  SectionBgTwo,
  SamplePicOne,
  SamplePicTwo,
  SamplePicThree,
  SamplePicFour,
  SamplePicFive,
  SamplePicSix,
  Agenda,
} from '../assets';

import { Countdown } from '../constants';
import { useState } from 'react';

const Index = () => {
  const { daysRef, hoursRef, minutesRef, secondsRef } = useCountdown(
    'October 2, 2021 00:00:00',
  );
  const [topicModalNotifierOpen, setTopicModalNotifierOpen] = useState(true);

  const LandingImgRenderer = () => {
    if (window.screen.width < 768) {
      return (
        <Image
          position="absolute"
          src={BarCampLandingImgMobile}
          w="100%"
          h="100%"
        />
      );
    } else {
      return (
        <Image position="absolute" src={BarCampLandingImg} w="100%" h="100%" />
      );
    }
  };

  return (
    <>
      <Flex
        display={topicModalNotifierOpen ? 'flex' : 'none'}
        flexDir={['column', 'column', 'row']}
        justifyContent="center"
        alignItems="center"
        zIndex="1001"
        position="fixed"
        bottom={['85px', '85px', '5']}
        left="50%"
        transform="translateX(-50%)"
        bg="white"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        borderRadius="md"
        py="0.8rem"
        px="1.5rem"
        w="fit-content"
        maxW="90%"
      >
        <Text
          w={['100%', '100%', '65%']}
          mr={['0', '0', '5']}
          mb={['10px', '10px', '0']}
          textAlign="center"
        >
          Topic proposal session has been extended to{' '}
          <span style={{ color: 'red' }}>30 September</span>!
        </Text>
        <PrimaryButton
          onClick={() => {
            window.location.href = '/propose-topic';
          }}
          mr={['0', '0', '5']}
        >
          Propose your topic
        </PrimaryButton>
        <CloseButton
          position="absolute"
          top="7px"
          right="7px"
          size="sm"
          onClick={() => {
            setTopicModalNotifierOpen(false);
          }}
        />
      </Flex>
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
              We bring people together to share their passion around technology
            </Heading>
            <BCSpacer size="sm" />
            <PrimaryButton
              py="25px"
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Login / Register
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
          <Heading textAlign="center" fontSize="3xl">
            We can&apos;t wait for the sharing to begin!
          </Heading>
          <Box
            position="relative"
            d="flex"
            justifyContent="center"
            alignItems="center"
            w={['100%', '100%', '50%']}
            h={['100%', '100%', '50%']}
            margin={['20px auto', '20px auto', '0 auto']}
          >
            <Lottie options={Countdown} />
          </Box>

          <SimpleGrid
            columns={[1, 1, 4]}
            spacing={2}
            textAlign="center"
            justifyItems="center"
            alignItems="center"
          >
            <CountDownBlock
              marginTop="-55px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['95px', '0']}
            >
              <Text
                ref={daysRef}
                fontSize="3xl"
                fontWeight="600"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Days
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-55px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['95px', '0']}
            >
              <Text
                ref={hoursRef}
                fontSize="3xl"
                fontWeight="600"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Hours
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-55px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['95px', '0']}
            >
              <Text
                ref={minutesRef}
                fontSize="3xl"
                fontWeight="600"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="md" color="#EB202B">
                Minutes
              </Text>
            </CountDownBlock>
            <CountDownBlock
              marginTop="-55px"
              background="rgba(255, 255, 255, 0.8)"
              marginBottom={['95px', '0']}
            >
              <Text
                ref={secondsRef}
                fontSize="3xl"
                fontWeight="600"
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
      <Center
        id="about"
        py="20"
        bgImage={[SectionBgTwo, SectionBgTwo, SectionBg]}
        flexDir="column"
      >
        <Container maxW="container.xl">
          <SectionTitle type="center" color="#ffffff" alignItems="flex-start">
            What is BarCamp?
          </SectionTitle>
        </Container>
        <Container
          maxW="container.lg"
          py="70px"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#ffffff" textAlign="center" fontSize={['md', 'xl']}>
            BarCamp Cyberjaya is an annual user-generated unconference with
            topics surrounding technology and entrepreneurship. What this means
            is that we gather, everyone proposes what they{"'"}d like to share
            and talk about, we vote on the topics we{"'"}re interested in, and
            off we go to listen and learn. Join us and bring your passion for
            sharing!
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

      {/* video section */}
      <Center py="20" flexDir="column">
        <Container maxW="container.xl">
          <iframe
            width="100%"
            height="670"
            src="https://www.youtube.com/embed/V4yuHoLQpck"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Container>
      </Center>

      {/* Agenda section */}
      <Center id="agenda" py="0" bgImage={SectionBgTwo} flexDir="column">
        <Container maxW="container.xl">
          <Image src={Agenda} />
        </Container>
      </Center>

      {/* FAQs section */}
      <Faq id="faq" />

      {/* Gallery Section */}
      <Center pt="80px" pb="30px" bgImage={SectionBg} flexDir="column">
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
