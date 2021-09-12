import React, { useEffect } from 'react';

import { Formik, Form } from 'formik';

import { Image } from '@chakra-ui/image';
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Center,
  Flex,
  Box,
} from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

import { PrimaryButton } from '../components/Buttons';
import { SectionTitle } from 'components/SectionTitle';
import { SelectFormFieldClass } from '../components/Forms';
import BCSpacer from '../components/Spacer';
import TopicBadge from '../components/TopicBadge';
import InfoBlock from 'components/InfoBlock';
import { useScrollTo, useAxios } from '../hooks';

import BCModal from './../components/Modal';
import useModal from '../components/Modal/useModal';

import { SectionBg, VotingPic, AIIcon, VotingIcon } from '../assets';
import store from './../store/store';
import '../global.css';

const voteTopic = () => {
  const token = store.getState().auth.accessToken;

  const { scrollToRef, executeScroll } = useScrollTo();
  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  const voteTopicHeader = React.useRef(null);

  const [topicAvailable, setTopicAvailable] = React.useState([]);
  const [votes, setVotes] = React.useState([]);
  const [voteErr, setVoteErr] = React.useState('');

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

  const { fetch: fetchTopics } = useAxios(
    {
      method: 'get',
      url: '/topics',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    (res, err) => {
      if (err) {
        console.log(err);
      } else if (res) {
        setTopicAvailable(res.data);
      }
    },
  );

  // eslint-disable-next-line
  const { fetch: postVoteTopic } = useAxios(
    {
      method: 'post',
      url: '/votes',
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (res, err) => {
      if (res) {
        let resData = res.data;
        console.log(res);
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          window.location.href = '/dashboard';
        } else {
          setVoteErr(' ' + resData);
          onModalOpen();
        }
      } else if (err) {
        setVoteErr(' ' + err);
        onModalOpen();
      }
    },
  );

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <BCModal
        theme="error"
        content={
          <>
            <Text as="h3" fontSize="xl" fontFamily="Poppins" fontWeight="600">
              Theres an error updating your profile
            </Text>
            <Text
              as="h3"
              fontSize="sm"
              fontFamily="Poppins"
              fontWeight="400"
              textAlign="center"
              px="3"
            >
              Please try again later
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
              <Text as="h1" fontSize="4xl" fontWeight="600">
                Vote for the topics
              </Text>
              <Text as="h2" fontSize="md" fontWeight="500">
                Everyone votes, democracy at it’s best. The topic which gets the
                most vote will be held on Barcamp.
              </Text>
              <BCSpacer size="sm" />
              <HStack>
                <PrimaryButton width="200px" onClick={() => executeScroll()}>
                  Start Voting !
                </PrimaryButton>
              </HStack>
            </VStack>
            <Image d={['none', 'none', 'block']} src={VotingPic} alt="Login" />
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

      {topicAvailable && topicAvailable.length >= 5 ? (
        <>
          <Box className="voteTopicHeaderTop" w="100%" h="1px"></Box>
          <Center
            w="100%"
            bg="white"
            position={['flex', 'flex', 'sticky']}
            top="0px"
            zIndex={50}
            p="3"
            className="voteTopicHeader"
            ref={voteTopicHeader}
          >
            <Container maxW="container.xl" w="100%" py="0px">
              <Flex
                flexDir={['column', 'column', 'row']}
                justifyContent="space-between"
                alignItems="center"
                pt="5"
                pb="5"
                ref={scrollToRef}
              >
                <SectionTitle fontSize="2xl" type="left" mb={['7', '0', '0']}>
                  Pick your choice
                </SectionTitle>
                <Center mb={['7', '0', '0']}>
                  <Text>{votes.length} / 5 selected</Text>
                </Center>
                <Center
                  boxShadow="0px 16px 40px rgba(193, 193, 193, 0.25)"
                  borderRadius="8px"
                  px="6"
                  py="3"
                >
                  <Text as="h2" fontSize="sm" fontWeight="500">
                    Up to <span className="gradientText">FIVE</span> selections
                    per participant
                  </Text>
                </Center>
              </Flex>
            </Container>
          </Center>

          {voteErr ? (
            <Alert status="error">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>{voteErr}</AlertTitle>
                <AlertDescription display="block">
                  There is some error updating your profile. Please try again.
                </AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          ) : null}

          <Container maxW="container.xl" w="100%" py="50px">
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
                          onSelect={(value, selected) =>
                            onSelect(value, selected)
                          }
                          disabledSelect={votes.length >= 4 ? true : false}
                        >
                          <HStack
                            spacing={7}
                            py="0.5em"
                            px={['0rem', '0rem', '0.5em']}
                          >
                            <Image
                              src={AIIcon}
                              d={['none', 'none', 'flex']}
                              h="45px"
                              w="45px"
                              alt="Artificial Intelligence"
                            />
                            <VStack spacing={2} align="flex-start">
                              <TopicBadge topic={topic.theme} />
                              <Text
                                as="h3"
                                fontSize="md"
                                fontFamily="Montserrat"
                                fontWeight="600"
                              >
                                {topic.name}
                              </Text>
                              <Text as="h6" fontSize="sm" fontWeight="500">
                                {topic.description}
                              </Text>
                            </VStack>
                          </HStack>
                        </SelectFormFieldClass>
                      ))}
                    </VStack>

                    <BCSpacer size="sm" />

                    <PrimaryButton
                      alignSelf="flex-end"
                      w={['100%', 'fit-content', 'fit-content']}
                      py="25px"
                      px="75px"
                      disabled={votes.length < 5}
                      type="submit"
                    >
                      <Text fontSize="lg">Submit Vote</Text>
                    </PrimaryButton>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Container>
        </>
      ) : (
        <Center
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <InfoBlock
            theme="error"
            content={
              <Text>
                The voting session will be opening soon. Every participants
                including speakers are able to vote your desired topics starting
                from <span style={{ fontWeight: 'bold' }}>25 September </span>
                until
                <span style={{ fontWeight: 'bold' }}> 27 September 2021 </span>
              </Text>
            }
            leadingIcon={VotingIcon}
          />
          <BCSpacer size="xs" />
        </Center>
      )}
    </>
  );
};

export default voteTopic;
