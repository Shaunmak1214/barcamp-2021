import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Center,
  Flex,
  Box,
  Image,
  useToast,
} from '@chakra-ui/react';

import { PrimaryButton } from '../components/Buttons';
import { SectionTitle } from 'components/SectionTitle';
import { SelectFormFieldClass } from '../components/Forms';
import BCSpacer from '../components/Spacer';
import InfoBlock from 'components/InfoBlock';
import BCModal from './../components/Modal';
import Loader from '../components/Loader';

import { useScrollTo, useAxios } from '../hooks';
import useModal from '../components/Modal/useModal';

import {
  SectionBg,
  VotingPic,
  VotingIcon,
  NoMessageIcon,
  TechIcon,
  NonTechIcon,
  NonsenseIcon,
} from '../assets';
import store from './../store/store';
import '../global.css';

const voteTopic = () => {
  const token = store.getState().auth.accessToken;

  const { scrollToRef, executeScroll } = useScrollTo();
  const toast = useToast();
  const limitToast = useToast();
  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  const voteTopicHeader = React.useRef(null);

  // section close state
  const [voteClose, setVoteClose] = useState(false);

  // data state
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [topicAvailable, setTopicAvailable] = useState([]);
  const [votes, setVotes] = useState([]);
  const [voteErr, setVoteErr] = useState('');

  const authState = store.getState().auth;

  const onSelect = React.useCallback(
    (value, selected) => {
      setVotes((votes) => {
        if (selected) {
          if (votes.includes(value)) {
            return [...votes];
          } else {
            return [...votes, value];
          }
        } else {
          return votes.filter((item) => item !== value);
        }
      });
    },
    [setVotes],
  );

  const { loading: isFetchTopicsLoading, fetch: fetchTopics } = useAxios(
    {
      method: 'get',
      url: '/topics',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    (err, res) => {
      if (err) {
        if (err.status === 425) {
          window.location.href = '/dashboard';
        }
      } else if (res) {
        setTopicAvailable(res.data);
      }
    },
  );

  const { loading: isFetchVotesLoading, fetch: fetchVoteByUser } = useAxios(
    {
      method: 'get',
      url: `/votes/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    (err, res) => {
      if (err) {
        if (err.status === 425) {
          setVoteClose(true);
        } else {
          setAlreadyVoted(false);
        }
      } else if (res) {
        if (res.data.length > 0) {
          setAlreadyVoted(true);
        } else {
          setAlreadyVoted(false);
        }
      }
    },
  );

  const { loading: isPosting, fetch: postVoteTopic } = useAxios(
    {
      method: 'post',
      url: '/votes',
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (err, res) => {
      if (err) {
        if (err.data.error) {
          setVoteErr(' ' + err.error);
        } else {
          setVoteErr(' ' + err);
        }
        onModalOpen();
        executeScroll();
      } else if (res) {
        toast({
          title: 'Votes Submitted!',
          position: 'top-right',
          variant: 'top-accent',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    },
  );

  const TopicIconRenderer = (theme) => {
    if (theme === 'tech') {
      return TechIcon;
    } else if (theme === 'non-tech') {
      return NonTechIcon;
    } else {
      return NonsenseIcon;
    }
  };

  useEffect(() => {
    fetchVoteByUser();
    fetchTopics();
  }, []);

  if (isFetchVotesLoading || isFetchTopicsLoading) {
    return <Loader type="full-page-loader" />;
  } else {
    return (
      <>
        <BCModal
          theme="error"
          content={
            <>
              <Text as="h3" fontSize="xl" fontWeight="600">
                An error occurred when submitting the topics.
              </Text>
              <Text
                as="h3"
                fontSize="sm"
                fontFamily="Poppins"
                fontWeight="400"
                textAlign="center"
                px="3"
              >
                Please try again.
              </Text>
            </>
          }
          modalOpen={isOpen}
          onClose={onModalClose}
        />
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
                <Text as="h1" fontSize="4xl" fontWeight="600" py="2">
                  VOTE YOUR DESIRED TOPICS
                </Text>
                <Text as="h2" fontSize="xl" fontWeight="300">
                  Everyone votes, everyone shares the insight. The topics that
                  get the most votes will be held on the day of BarCamp. Vote
                  your desired topics that you&apos;d like to hear below.
                </Text>
                <BCSpacer size="2xs" />
                <HStack>
                  <PrimaryButton
                    width="200px"
                    disabled={alreadyVoted ? true : false}
                    variant={alreadyVoted ? 'disabled' : null}
                    onClick={() => executeScroll()}
                  >
                    {alreadyVoted ? 'Revert Voke' : 'Start Voting!'}
                  </PrimaryButton>
                </HStack>
              </VStack>
              <Image
                d={['none', 'none', 'block']}
                src={VotingPic}
                alt="Login"
              />
            </SimpleGrid>
          </Container>
        </VStack>
        <Center
          bgImg={SectionBg}
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="250px"
        ></Center>

        {isFetchTopicsLoading ? (
          <Loader type="full-page-loader" />
        ) : voteClose ? (
          <Center
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt="10"
          >
            <Container maxW="container.xl">
              <InfoBlock
                theme=""
                content={
                  <Text fontSize="lg" py="40px">
                    Uh, sorry, the voting session is{' '}
                    <span style={{ fontWeight: 600 }}>
                      either over or yet to be started ( starting from 25
                      September until 30 September)
                    </span>
                    . In that case kindly check back later. Please contact
                    BarCamp team if you have any inquiries
                  </Text>
                }
                leadingIcon={NoMessageIcon}
              />
              <BCSpacer size="xs" />
            </Container>
          </Center>
        ) : topicAvailable && topicAvailable.length >= 5 && !alreadyVoted ? (
          <>
            <Box className="voteTopicHeaderTop" w="100%" h="1px"></Box>
            <Center
              w="100%"
              bg="white"
              zIndex={50}
              p="3"
              className="voteTopicHeader"
              ref={voteTopicHeader}
            >
              <Container maxW="container.xl" w="100%" py="0px">
                <Flex
                  flexDir={['column', 'column', 'row']}
                  justifyContent="space-between"
                  alignItems={['flex-start', 'flex-start', 'center']}
                  w={['100%', '100%', null]}
                  pt="5"
                  pb="5"
                  ref={scrollToRef}
                >
                  <SectionTitle
                    fontSize="2xl"
                    type="left"
                    mb={['10', '0', '0']}
                  >
                    Pick your choice
                  </SectionTitle>
                  <Flex
                    flexDirection={['column', 'column', 'row']}
                    w={['100%', '100%', 'auto']}
                    boxShadow="0px 16px 40px rgba(193, 193, 193, 0.25)"
                    borderRadius="8px"
                    px="4"
                    py="3"
                  >
                    <Center
                      borderRadius="8px"
                      px="5"
                      py="1"
                      bgColor={votes.length === 5 ? '#C9E1FF' : '#FFDADA'}
                      transition="background-color 0.3s ease-in-out"
                      mr="5"
                      mb={[3, 0, 0]}
                    >
                      <Text>{votes.length} / 5 selected</Text>
                    </Center>
                    <Text
                      as="h2"
                      fontSize="md"
                      fontWeight="500"
                      d="flex"
                      alignItems="center"
                    >
                      Must submit exactly{' '}
                      <span
                        className="gradientText"
                        style={{ marginLeft: '3px', marginRight: '3px' }}
                      >
                        {' '}
                        FIVE{' '}
                      </span>{' '}
                      selections
                    </Text>
                  </Flex>
                </Flex>
              </Container>
            </Center>

            <Container maxW="container.xl" w="100%" py="50px">
              {voteErr ? (
                <Alert mb="10" status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>{voteErr}</AlertTitle>
                    <AlertDescription display="block">
                      There is an error when processing your request, please try
                      again.
                    </AlertDescription>
                  </Box>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              ) : null}
              <Formik
                initialValues={{
                  topic: '',
                }}
                onSubmit={() => {
                  postVoteTopic({
                    userId: authState.user.userId,
                    topicId: votes,
                    vote: 'topic',
                  });
                }}
              >
                {() => (
                  <Form>
                    <VStack>
                      <VStack spacing={5} alignItems="flex-start" w="100%">
                        {topicAvailable.map((topic, idx) => (
                          <SelectFormFieldClass
                            key={idx}
                            value={`${topic._id}`}
                            topic={topic}
                            onSelect={(value, selected) =>
                              onSelect(value, selected)
                            }
                            TopicIconRenderer={TopicIconRenderer}
                            onLimitClick={() => {
                              limitToast({
                                title: `Can only select 5 votes`,
                                position: 'top-right',
                                status: 'warning',
                                isClosable: true,
                              });
                            }}
                            disabledSelect={votes.length >= 5 ? true : false}
                          ></SelectFormFieldClass>
                        ))}
                      </VStack>

                      <BCSpacer size="sm" />

                      <PrimaryButton
                        alignSelf="flex-end"
                        w={['100%', 'fit-content', 'fit-content']}
                        py="25px"
                        px="75px"
                        disabled={isPosting || votes.length < 5}
                        type="submit"
                      >
                        {isPosting ? (
                          <Loader type="" size="md" />
                        ) : (
                          <Text fontSize="lg">Submit Votes</Text>
                        )}
                      </PrimaryButton>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Container>
          </>
        ) : topicAvailable.length < 5 ? (
          <Center
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt="10"
          >
            <Container maxW="container.xl">
              <InfoBlock
                theme="error"
                content={
                  <Text>
                    Uh, sorry. The proposing topic session is still in progress.
                    The voting session will be opening soon. Please contact
                    BarCamp team if you have any inquiries.
                  </Text>
                }
                leadingIcon={NoMessageIcon}
              />
              <BCSpacer size="xs" />
            </Container>
          </Center>
        ) : (
          <Center
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt="10"
          >
            <Container maxW="container.xl">
              <InfoBlock
                theme="error"
                content={
                  <Text>
                    You have already voted on the topics for this session. The
                    final topic announcement will be made on 1 October 2021.
                    Welcome to attend the sharing that you{"'"}d like to hear in
                    BarCamp on 2 October 2021. See you soon!
                  </Text>
                }
                leadingIcon={VotingIcon}
              />
              <BCSpacer size="xs" />
            </Container>
          </Center>
        )}
      </>
    );
  }
};

export default voteTopic;
