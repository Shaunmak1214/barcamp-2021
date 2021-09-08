import { Image } from '@chakra-ui/image';
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Center,
  Box,
  Flex,
} from '@chakra-ui/layout';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
// import Loader from '../components/Loader';
import { useRef, useEffect } from 'react';

import { ResultIcon, Splash1, VotingIcon } from '../assets';
import { CountDownBlock } from 'components/Countdown';
import { SectionBg, NoMessageIcon } from '../assets';
import { SectionTitle } from 'components/SectionTitle';

const Dashboard = () => {
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  let interval = useRef();

  const countDownTimer = () => {
    const countDownDate = new Date('September 25, 2021 00:00:00').getTime();

    // @ts-ignore
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const calDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const calHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const calMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      );
      const calSeconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        daysRef.current.innerText = calDays;
        hoursRef.current.innerText = calHours;
        minutesRef.current.innerText = calMinutes;
        secondsRef.current.innerText = calSeconds;
      }
    }, 1000);
  };

  useEffect(() => {
    countDownTimer();

    return () => {
      clearInterval(interval.current);
    };
  }, []);
  return (
    <>
      <VStack w="100%" h="100vh" justifyContent="center" alignItems="center">
        <Container maxW="container.xl">
          <SimpleGrid
            columns={2}
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <VStack
              alignItems="flex-start"
              justifyContent="center"
              h="100%"
              pr={20}
            >
              <Text as="h1" fontSize="4xl" fontWeight="600">
                WELCOME TO BARCAMP
              </Text>
              <Text color="#1050A0" mt="0">
                You are one of the participants in Barcamp 2021 now!
              </Text>
              <BCSpacer size="sm" />
              <Text as="h2" fontSize="sm" fontWeight="500">
                If you are volunteering to become a speaker, feel free to
                propose an interesting topic for your sharing. A voting session
                will be conducted to select the speakers for Barcamp.
              </Text>
              <BCSpacer size="sm" />
              <HStack>
                <PrimaryButton width="200px">Propose Topic</PrimaryButton>
                <PrimaryButton width="250px" backgroundColor="#B1B1B1">
                  Vote Topic (Comming Soon)
                </PrimaryButton>
              </HStack>
            </VStack>
            <Image src={Splash1} alt="Login" />
          </SimpleGrid>
        </Container>
      </VStack>
      <Center
        id="countdown-timer"
        bgImg={SectionBg}
        alignItems="center"
        justifyContent="center"
      >
        <Container
          maxW="container.xl"
          py={['50px', '50px']}
          justifyContent="center"
          alignItems="center"
        >
          <SimpleGrid
            columns={[1, 1, 4]}
            spacing={2}
            textAlign="center"
            justifyItems="center"
            alignItems="center"
          >
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
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
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
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
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
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
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
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
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left">
            Your Proposed Topic
          </SectionTitle>
          <VStack
            mt="50px"
            border="3px solid #EB202B"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            pb="30px"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              p={['30px 0 25px 0', '45px 30px 25px 80px']}
              textAlign={['center', 'left']}
              flexDir={['column', 'column', 'row']}
            >
              <Image src={NoMessageIcon} />
              <Box p={['20px 45px', '0 50px']}>
                <Text>
                  You haven&apos;t proposed any topic yet. If you are
                  volunteering to become a speaker in Barcamp, kindly keep in
                  mind that the last day to propose a topic is on
                  <span style={{ fontWeight: 'bold' }}> 24 September 2021</span>
                </Text>
              </Box>
            </Flex>
            <PrimaryButton>Propose a Topic</PrimaryButton>
          </VStack>
        </Container>
      </VStack>
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left">
            Your Voted Topic
          </SectionTitle>

          <HStack
            justifyContent="center"
            alignItems="center"
            mb="10px"
            mt="50px"
            p={['25px', '55px 45px 70px 80px']}
            borderWidth="3px"
            borderStyle="solid"
            borderRadius="10px"
            style={{
              borderImageSource:
                'linear-gradient(90deg, rgba(16, 80, 160, 0.8) 0%, rgba(16, 80, 160, 0.8) 0.01%, rgba(235, 32, 43, 0.8) 100%, rgba(235, 32, 43, 0.8) 100%)',
              borderImageSlice: 1,
            }}
            flexDir={['column', 'column', 'row']}
          >
            <Image src={VotingIcon} mb={['35px', '0']} />
            <Box p={['0', '0 50px']}>
              <Text>
                The voting session will be opening soon. Every participants
                including speakers are able to vote your desired topics starting
                from <span style={{ fontWeight: 'bold' }}>25 September </span>
                until
                <span style={{ fontWeight: 'bold' }}> 27 September 2021 </span>
              </Text>
            </Box>
          </HStack>
        </Container>
      </VStack>
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left">
            Voting Result
          </SectionTitle>
          <HStack
            justifyContent="center"
            alignItems="center"
            mb="10px"
            mt="50px"
            p={['25px', '55px 45px 70px 80px']}
            borderWidth="3px"
            borderStyle="solid"
            borderRadius="10px"
            style={{
              borderImageSource:
                'linear-gradient(90deg, rgba(16, 80, 160, 0.8) 0%, rgba(16, 80, 160, 0.8) 0.01%, rgba(235, 32, 43, 0.8) 100%, rgba(235, 32, 43, 0.8) 100%)',
              borderImageSlice: 1,
            }}
            flexDir={['column', 'column', 'row']}
          >
            <Image src={ResultIcon} mb={['35px', '0']} />
            <Box p={['0', '0 50px']}>
              <Text>
                The voting result can be viewed strating from
                <span style={{ fontWeight: 'bold' }}> 25 September 2021 </span>
                which when the voting session is opened. However, the
                announcement for a finalized list of speakers will be made on
                <span style={{ fontWeight: 'bold' }}> 28 October 2021 </span>
                (One day before the Barcamp event)
              </Text>
            </Box>
          </HStack>
        </Container>
      </VStack>
    </>
  );
};

export default Dashboard;
