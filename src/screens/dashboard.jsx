/*eslint-disable */
import React, { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Center,
  Flex,
} from '@chakra-ui/layout';

import { PrimaryButton, RevertButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { SectionTitle } from 'components/SectionTitle';
import InfoBlock from 'components/InfoBlock';
import TopicBlock from 'components/TopicBlock';
import Loader from '../components/Loader';
import Lottie from 'react-lottie';

import { useAxios } from '../hooks';
import store from './../store/store';
import useModal from '../components/Modal/useModal';
import BCModal from '../components/Modal/index';

import {
  ResultIcon,
  Splash1,
  VotingIcon,
  SectionBg,
  NoMessageIcon,
} from '../assets';
import { BlackLoader } from '../constants';

const Dashboard = () => {
  const authState = store.getState().auth;

  // data state
  const [userTopic, setUserTopic] = useState({});
  const [votedTopics, setVotedTopics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // section close state

  const [voteSectionClose, setVoteSectionClose] = useState(false);
  const [voteResultClose, setVoteResultClose] = useState(false);
  const [proposeSectionClose, setProposeSectionClose] = useState(false);

  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

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
        if (err.status === 425) {
          setProposeSectionClose(true);
        }
      } else if (res) {
        setUserTopic(res.data);
      }
    },
  );

  const { loading: deleteLoading, fetch: deleteUserVotes } = useAxios(
    {
      method: 'delete',
      url: `/votes/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },

    (err, res) => {
      if (err) {
      } else if (res.status === 200) {
        window.location.href = '/vote-topic';
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
        if (err.status === 425) {
          setVoteSectionClose(true);
        }
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
        if (err.status === 425) {
          setVoteResultClose(true);
        }
      } else if (res) {
        setLeaderboard(res.data);
      }
    },
  );

  const ProposedTopicRenderer = () => {
    if (proposeSectionClose) {
      return (
        <InfoBlock
          theme=""
          content={
            <Text fontSize="lg" py="40px">
              Uh,sorry, the proposing topic session is closed but the voting
              session is opening now. You may proceed to vote for your desired
              topic in the next section. Please contact BarCamp team if you have
              any inquiries.
            </Text>
          }
          leadingIcon={NoMessageIcon}
        />
      );
    } else {
      if (proposedLoading) {
        return <Loader type="block-loader" />;
      } else {
        if (Object.keys(userTopic).length > 0) {
          return (
            <TopicBlock rounded speaker={userTopic.user} topic={userTopic} />
          );
        } else {
          return (
            <InfoBlock
              buttonUrl="/propose-topic"
              buttonLabel="Propose a topic"
              theme="error"
              content={
                <Text fontSize="lg" color="#858585" mt="5">
                  You haven&apos;t proposed any topic yet. If you are
                  volunteering to share anything in BarCamp, kindly keep in mind
                  that the last day of proposing a topic is on
                  <span style={{ fontWeight: 'bold' }}> 30 September 2021</span>
                  .
                </Text>
              }
              leadingIcon={NoMessageIcon}
            />
          );
        }
      }
    }
  };

  const VotedTopicRenderer = () => {
    if (voteSectionClose) {
      return (
        <InfoBlock
          theme=""
          content={
            <Text fontSize="lg" py="40px">
              Voting will open on{' '}
              <span style={{ fontWeight: 600 }}>25 September! </span>Please
              remember to check back and vote for your topics then! Please
              contact BarCamp team if you have any inquiries.
            </Text>
          }
          leadingIcon={NoMessageIcon}
        />
      );
    } else {
      if (votedLoading) {
        return <Loader type="block-loader" />;
      } else {
        if (votedTopics && votedTopics.length > 0) {
          return votedTopics.map((topic, idx) => (
            <TopicBlock
              rounded
              key={idx}
              value={topic.topic._id}
              topic={topic.topic}
              speaker={topic.speaker}
              themeIcon={topic.speaker.picture}
            />
          ));
        } else {
          return (
            <InfoBlock
              theme="error"
              buttonUrl="/vote-topic"
              buttonLabel="Vote topics"
              content={
                <Text fontSize="lg" color="#858585" mt="5">
                  You haven&apos;t voted for any topic yet. Vote for your
                  desired topic now, the topic which gets the most vote will be
                  held on BarCamp. Kindly keep in mind that the last day for
                  voting is on{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    30 September 2021.{' '}
                  </span>
                </Text>
              }
              leadingIcon={VotingIcon}
            />
          );
        }
      }
    }
  };

  const LeaderboardRenderer = () => {
    if (voteResultClose) {
      return (
        <InfoBlock
          theme=""
          content={
            <Text fontSize="lg" py="26px">
              The voting result can be viewed starting from
              <span style={{ fontWeight: 'bold' }}> 25 September 2021 </span>
              .However, the announcement of the finalized list of voted topics
              will be made on
              <span style={{ fontWeight: 'bold' }}> 1 October 2021 </span>
              (one day before BarCamp). We will notify you via email if you have
              been selected to share.
            </Text>
          }
          leadingIcon={NoMessageIcon}
        />
      );
    } else {
      if (leaderboardLoading) {
        return <Loader type="block-loader" />;
      } else {
        if (leaderboard && leaderboard.length > 0) {
          return leaderboard.map((vote, idx) => (
            <TopicBlock
              rounded
              key={idx}
              lead={idx}
              value={vote.topic._id}
              topic={vote.topic}
              speaker={vote.user}
              themeIcon={vote.user.picture}
              count={vote.count}
              leaderboard={true}
            />
          ));
        } else {
          return (
            <InfoBlock
              theme=""
              content={
                <Text fontSize="lg" py="26px">
                  Error in retrieving the leaderboard. Please contact BarCamp
                </Text>
              }
              leadingIcon={ResultIcon}
            />
          );
        }
      }
    }
  };

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
        mb="20px"
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
                WELCOME TO BarCamp 2021!
              </Text>
              <Text fontSize="lg" fontWeight="300" color="#DA020E" mt="0">
                You are one of the participants in BarCamp 2021 now!
              </Text>
              <BCSpacer size="3xs" />
              <Text as="h2" fontSize="xl" fontWeight="300">
                Propose any interesting topic that you want to share in BarCamp.
                A voting session will be conducted soon to select the topics for
                the day of BarCamp.
              </Text>
              <BCSpacer size="sm" />
              <SimpleGrid columns={[1, 1, 2]}>
                <PrimaryButton
                  width="200px"
                  onClick={() => {
                    window.location.href = '/propose-topic';
                  }}
                  mb={['12px', '12px', '0']}
                  disabled={
                    !proposeSectionClose
                      ? Object.keys(userTopic).length > 0
                        ? true
                        : false
                      : true
                  }
                >
                  {!proposeSectionClose
                    ? Object.keys(userTopic).length > 0
                      ? 'Already proposed a topic'
                      : 'Propose Topic'
                    : 'Propose topic session closed'}
                </PrimaryButton>
                <PrimaryButton
                  width="215px"
                  backgroundColor="#B1B1B1"
                  onClick={() => {
                    window.location.href = '/vote-topic';
                  }}
                  disabled={
                    !voteSectionClose
                      ? votedTopics.length > 0
                        ? true
                        : false
                      : true
                  }
                >
                  {!voteSectionClose
                    ? votedTopics.length > 0
                      ? 'Already voted'
                      : 'Vote Topics'
                    : 'Vote Topics (Coming soon)'}
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

      <VStack py="40px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left" mb="10">
            Your Proposed Topic
          </SectionTitle>

          <ProposedTopicRenderer />
        </Container>
      </VStack>
      <VStack py="40px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <Container maxW="container.xl">
            <Flex
              flexDir={['col', 'col', 'row']}
              justifyContent="space-between"
            >
              <SectionTitle fontSize="2xl" type="left" mb="10">
                Your Voted Topic
              </SectionTitle>
              {votedTopics.length > 0 ? (
                <>
                  <RevertButton onOpen={onModalOpen}>
                    <Text>Revert Your Voted Topics</Text>
                  </RevertButton>
                  <BCModal
                    theme="normal"
                    content={
                      <>
                        <Text as="h3" fontSize="xl" fontFamily="600">
                          Are you sure you want to revert your votes?
                        </Text>
                      </>
                    }
                    modalOpen={isOpen}
                    onClose={onModalClose}
                    dialog={true}
                    onDeleteVotes={deleteUserVotes}
                    loading={deleteLoading}
                  />
                </>
              ) : null}
            </Flex>
          </Container>

          <VotedTopicRenderer />
        </Container>
      </VStack>
      <VStack py="40px" mb="12">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle fontSize="2xl" type="left" mb="10">
            Voting Result
          </SectionTitle>

          <LeaderboardRenderer />
        </Container>
      </VStack>
    </>
  );
};

export default Dashboard;
