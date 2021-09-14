/*eslint-disable */
import React, { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Container, SimpleGrid, Text, VStack, Center } from '@chakra-ui/layout';

import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { SectionTitle } from 'components/SectionTitle';
import InfoBlock from 'components/InfoBlock';
import TopicBlock from 'components/TopicBlock';
import Loader from '../components/Loader';

import { useAxios } from '../hooks';
import store from './../store/store';

import {
  ResultIcon,
  Splash1,
  VotingIcon,
  SectionBg,
  NoMessageIcon,
} from '../assets';

const Dashboard = () => {
  const authState = store.getState().auth;

  // data state
  const [userTopic, setUserTopic] = useState({});
  const [votedTopics, setVotedTopics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const { loading: proposedLoading, fetch: getTopicsByUser } = useAxios(
    {
      method: 'get',
      url: `/topicsByUser/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },

    (err, res) => {
      if (err) {
      } else if (res) {
        setUserTopic(res.data);
      }
    },
  );

  const { loading: votedLoading, fetch: getUserVotes } = useAxios(
    {
      method: 'get',
      url: `/votes/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    /*eslint-disable */
    (err, res) => {
      if (err) {
      } else if (res) {
        setVotedTopics(res.data);
      }
    },
  );

  const { loading: leaderboardLoading, fetch: getLeaderboard } = useAxios(
    {
      method: 'get',
      url: `/votes/leaderboard`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    /*eslint-disable */
    (err, res) => {
      if (err) {
        console.log(err);
      } else if (res) {
        setLeaderboard(res.data);
      }
    },
  );

  useEffect(() => {
    setTimeout(() => {
      getUserVotes();
      getTopicsByUser();
      getLeaderboard();
    }, 500);
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
                  mb={['12px', '12px', '0']}
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
        w="100%"
        h="250px"
      ></Center>

      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left" mb="5">
            Your Proposed Topic
          </SectionTitle>
          {proposedLoading ? (
            <Loader type="block-loader" />
          ) : userTopic ? (
            <TopicBlock rounded topic={userTopic} />
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
          <SectionTitle fontSize="2xl" type="left" mb="5">
            Your Voted Topic
          </SectionTitle>
          {votedLoading ? (
            <Loader type="block-loader" />
          ) : votedTopics && votedTopics.length > 0 ? (
            votedTopics.map((topic, idx) => (
              <TopicBlock
                rounded
                key={idx}
                value={topic.topic._id}
                topic={topic.topic}
                themeIcon={topic.speaker.picture}
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
          <SectionTitle fontSize="2xl" type="left" mb="5">
            Voting Result
          </SectionTitle>
          {leaderboardLoading ? (
            <Loader type="block-loader" />
          ) : leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((vote, idx) => (
              <TopicBlock
                rounded
                key={idx}
                lead={idx}
                value={vote.topic._id}
                topic={vote.topic}
                themeIcon={vote.user.picture}
                count={vote.count}
                leaderboard={true}
              />
            ))
          ) : (
            <InfoBlock
              theme=""
              content={
                <Text>
                  The voting result can be viewed strating from
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    25 September 2021{' '}
                  </span>
                  which when the voting session is opened. However, the
                  announcement for a finalized list of speakers will be made on
                  <span style={{ fontWeight: 'bold' }}> 28 October 2021 </span>
                  (One day before the Barcamp event)
                </Text>
              }
              leadingIcon={ResultIcon}
            />
          )}
        </Container>
      </VStack>
    </>
  );
};

export default Dashboard;
