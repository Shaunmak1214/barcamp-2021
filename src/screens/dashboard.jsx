import { Image } from '@chakra-ui/image';
import { Container, SimpleGrid, Text, VStack, Center } from '@chakra-ui/layout';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { useEffect, useState } from 'react';
import { AIIcon, ResultIcon, Splash1, VotingIcon } from '../assets';
import { CountDownBlock } from 'components/Countdown';
import { SectionBg, NoMessageIcon } from '../assets';
import { SectionTitle } from 'components/SectionTitle';
import { useCountdown } from '../hooks';
import InfoBlock from 'components/InfoBlock';
import TopicBlock from 'components/TopicBlock';
import { useAxios } from '../hooks';
import store from './../store/store';

const Dashboard = () => {
  const { daysRef, hoursRef, minutesRef, secondsRef } = useCountdown(
    'September 25, 2021 00:00:00',
  );

  const authState = store.getState().auth;
  const [userTopic, setUserTopic] = useState({});
  const [votedTopics, setVotedTopics] = useState([]);
  const { fetch } = useAxios(
    {
      method: 'get',
      url: `/topicsByUser/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    (res, err) => {
      if (err) {
        console.log(err);
      } else if (res) {
        setUserTopic(res.data);
      }
    },
  );

  const { fetch: getUserVotes } = useAxios(
    {
      method: 'get',
      url: `/votes/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    (res, err) => {
      if (res) {
        console.log(res.data);
        setVotedTopics(res.data);
      } else if (err) {
        console.log(err);
      }
    },
  );

  useEffect(() => {
    getUserVotes();

    fetch();
  }, []);

  return (
    <>
      <VStack
        w="100%"
        h="100vh"
        justifyContent={['flex-start', 'flex-start', 'center']}
        alignItems="center"
      >
        <BCSpacer d={['flex', 'none', 'none']} size="sm" />
        <Container maxW="container.xl">
          <SimpleGrid
            columns={[1, 1, 2]}
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <VStack
              alignItems="flex-start"
              justifyContent="center"
              h="100%"
              pr={[10, 0, 20]}
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
              <SimpleGrid columns={[1, 1, 2]}>
                <PrimaryButton
                  width="200px"
                  onClick={() => {
                    window.location.href = '/propose-topic';
                  }}
                >
                  Propose Topic
                </PrimaryButton>
                <PrimaryButton
                  width="250px"
                  backgroundColor="#B1B1B1"
                  onClick={() => {
                    window.location.href = '/vote-topic';
                  }}
                >
                  Vote Topic (Comming Soon)
                </PrimaryButton>
              </SimpleGrid>
            </VStack>
            <Image d={['none', 'none', 'block']} src={Splash1} alt="Login" />
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
          {userTopic ? (
            <TopicBlock topic={userTopic} />
          ) : (
            <InfoBlock
              buttonUrl="/propose-topic"
              buttonLabel="Propose a topic"
              theme="error"
              content={
                <Text>
                  You haven&apos;t proposed any topic yet. If you are
                  volunteering to become a speaker in Barcamp, kindly keep in
                  mind that the last day to propose a topic is on
                  <span style={{ fontWeight: 'bold' }}> 24 September 2021</span>
                </Text>
              }
              leadingIcon={NoMessageIcon}
            />
          )}
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
          {votedTopics && votedTopics.length > 0 ? (
            votedTopics.map((topic, idx) => (
              <TopicBlock
                key={idx}
                value={topic.topicId._id}
                topic={topic.topicId}
                themeIcon={AIIcon}
              />
            ))
          ) : (
            <InfoBlock
              theme=""
              content={
                <Text>
                  The voting session will be opening soon. Every participants
                  including speakers are able to vote your desired topics
                  starting from{' '}
                  <span style={{ fontWeight: 'bold' }}>25 September </span>
                  until
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    27 September 2021{' '}
                  </span>
                </Text>
              }
              leadingIcon={VotingIcon}
            />
          )}
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
          <InfoBlock
            theme=""
            content={
              <Text>
                The voting result can be viewed strating from
                <span style={{ fontWeight: 'bold' }}> 25 September 2021 </span>
                which when the voting session is opened. However, the
                announcement for a finalized list of speakers will be made on
                <span style={{ fontWeight: 'bold' }}> 28 October 2021 </span>
                (One day before the Barcamp event)
              </Text>
            }
            leadingIcon={ResultIcon}
          />
        </Container>
      </VStack>
    </>
  );
};

export default Dashboard;
