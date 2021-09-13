import React, { useState, useEffect } from 'react';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Checkbox,
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Center,
  Flex,
  Box,
  Image,
} from '@chakra-ui/react';

import { PrimaryButton } from '../components/Buttons';
import { SectionTitle } from 'components/SectionTitle';
import {
  BCTextFormField,
  BCTextAreaField,
  SelectDropdownFormField,
} from '../components/Forms';
import BCSpacer from '../components/Spacer';
import InfoBlock from 'components/InfoBlock';
import BCModal from './../components/Modal';
import Loader from '../components/Loader';

import { useScrollTo, useAxios } from '../hooks';
import useModal from '../components/Modal/useModal';

import { SectionBg, ProposePic, NoMessageIcon } from '../assets';
import store from './../store/store';
import '../global.css';

const schema = yup.object({
  description: yup.string().required().min(3),
  topicTheme: yup.string().required(),
  topicName: yup.string().required().min(3),
  topicSummary: yup.string().required().min(3),
});

const ProposeTopic = () => {
  const { scrollToRef, executeScroll } = useScrollTo();

  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  const [checked, setChecked] = useState(false);
  const [isFetchTopicsLoading, setIsFetchTopicsLoading] = useState(true);
  const [userTopic, setUserTopic] = useState(null);
  const [updateErr, setUpdateErr] = React.useState('');

  const authState = store.getState().auth;

  const { fetch: postProposedTopic } = useAxios(
    {
      method: 'post',
      url: '/topics',
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (res, err) => {
      if (res) {
        let resData = res.data;
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          window.location.href = '/dashboard';
        } else {
          setUpdateErr(' ' + resData);
          onModalOpen();
        }
      } else if (err) {
        if (err.error) {
          setUpdateErr(' ' + err.error);
        } else {
          setUpdateErr(' ' + err);
        }
        onModalOpen();
      }
    },
  );

  const { fetch: fetchTopicsByUser } = useAxios(
    {
      method: 'get',
      url: `/topicsByUser/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    (res, err) => {
      if (err) {
        setUpdateErr(' ' + err);
        setIsFetchTopicsLoading(false);
      } else if (res) {
        setUserTopic(res.data);
        setIsFetchTopicsLoading(false);
      }
    },
  );

  const handleConsentCheck = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchTopicsByUser();
    }, 5000);
  }, []);

  // useEffect(() => {
  //   var observer = new IntersectionObserver(
  //     function (entries) {
  //       // no intersection with screen
  //       if (entries[0].intersectionRatio === 0)
  //         document
  //           .querySelector('.voteTopicHeader')
  //           .classList.add('voteTopicHeader-sticky');
  //       // fully intersects with screen
  //       else if (entries[0].intersectionRatio === 1)
  //         document
  //           .querySelector('.voteTopicHeader')
  //           .classList.remove('voteTopicHeader-sticky');
  //     },
  //     { threshold: [0, 1] },
  //   );

  //   observer.observe(document.querySelector('.voteTopicHeaderTop'));
  // }, []);

  if (isFetchTopicsLoading) {
    return <Loader type="full-page-loader" />;
  } else {
    return (
      <>
        <BCModal
          theme="error"
          content={
            <>
              <Text
                as="h3"
                fontSize="xl"
                fontFamily="Montserrat"
                fontWeight="600"
              >
                Theres an error updating your profile
              </Text>
              <Text
                as="h3"
                fontSize="sm"
                fontFamily="Montserrat"
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
                  Propose a topic TO BECOME A SPEAKER
                </Text>
                <Text as="h2" fontSize="sm" fontWeight="500">
                  Let’s brings people together to share their passion around
                  technology. There is no preset of speakers for BarCamp like
                  usual conferences. Propose an interesting topic for the voting
                  session later.
                </Text>
                <BCSpacer size="sm" />
                <HStack>
                  <PrimaryButton
                    width="200px"
                    disabled={userTopic ? true : false}
                    onClick={() => executeScroll()}
                    variant={userTopic ? 'disabled' : null}
                  >
                    {userTopic ? 'You already proposed' : 'Propose a topic'}
                  </PrimaryButton>
                </HStack>
              </VStack>
              <Image
                d={['none', 'none', 'block']}
                src={ProposePic}
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

        {userTopic ? (
          <Center
            w="100%"
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Container maxW="container.xl">
              <InfoBlock
                theme=""
                content={<Text>You already propose a topic</Text>}
                leadingIcon={NoMessageIcon}
              />
            </Container>
            <BCSpacer size="xs" />
          </Center>
        ) : (
          <>
            <BCSpacer size="sm" />

            <Box className="voteTopicHeaderTop" w="100%" h="1px"></Box>
            <Center
              w="100%"
              bg="white"
              position={['flex', 'flex', 'sticky']}
              top="0px"
              zIndex={50}
              p="3"
              className="voteTopicHeader"
            >
              <Container maxW="container.xl" w="100%" py="0px">
                <Flex
                  flexDir={['column', 'column', 'row']}
                  justifyContent="space-between"
                  alignItems={['flex-start', 'flex-start', 'center']}
                  pt="5"
                  pb="5"
                  ref={scrollToRef}
                >
                  <SectionTitle fontSize="2xl" type="left" mb={['7', '0', '0']}>
                    Propose a topic
                  </SectionTitle>
                  <Center
                    boxShadow="0px 16px 40px rgba(193, 193, 193, 0.25)"
                    borderRadius="8px"
                    px="6"
                    py="3"
                  >
                    <Text as="h2" fontSize="sm" fontWeight="500">
                      You are allowed to propose{' '}
                      <span className="gradientText">ONE</span> topic only
                    </Text>
                  </Center>
                </Flex>
              </Container>
            </Center>

            <Container maxW="container.xl" w="100%" py="50px">
              {updateErr ? (
                <Alert mb="10" status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>{updateErr}</AlertTitle>
                    <AlertDescription display="block">
                      There is some error updating your profile. Please try
                      again.
                    </AlertDescription>
                  </Box>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              ) : null}
              <Formik
                validationSchema={schema}
                initialValues={{
                  description: '',
                  topicTheme: '',
                  topicName: '',
                  topicSummary: '',
                }}
                onSubmit={(data) => {
                  postProposedTopic({
                    name: data.topicName,
                    user: authState.user.userId,
                    theme: data.topicTheme,
                    description: data.description,
                    contact: '-',
                    self_description: '-',
                  });
                }}
              >
                {() => (
                  <Form>
                    <VStack spacing={5} alignItems="flex-start">
                      <Text as="h3" fontSize="xl" textTransform="uppercase">
                        Speaker Details
                      </Text>
                      <Field
                        label="A short description of yourself"
                        name="description"
                        placeholder="I'm from ... "
                        maxLength={100}
                        component={BCTextAreaField}
                      />

                      <BCSpacer size="xs" />

                      <Text as="h3" fontSize="xl" textTransform="uppercase">
                        Topic Details
                      </Text>
                      <Field
                        label="Theme"
                        name="topicTheme"
                        placeholder="Theme of your topic"
                        component={SelectDropdownFormField}
                      />

                      <Field
                        label="Topic Name"
                        name="topicName"
                        placeholder="What if the earth is flat ??!!"
                        component={BCTextFormField}
                      />

                      <Field
                        label="Topic Summary"
                        name="topicSummary"
                        placeholder="We're going to talk about ..."
                        maxLength={250}
                        component={BCTextAreaField}
                      />

                      <Checkbox size="lg" pl="5" onChange={handleConsentCheck}>
                        <Text fontSize="sm">
                          When you propose a topic, you are aware that other
                          users can view your information as a speaker.{' '}
                        </Text>
                      </Checkbox>

                      <PrimaryButton
                        alignSelf="flex-end"
                        w={['100%', 'fit-content', 'fit-content']}
                        py="25px"
                        px="75px"
                        type="submit"
                        disabled={!checked}
                      >
                        <Text fontSize="lg">Propose</Text>
                      </PrimaryButton>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Container>
          </>
        )}
      </>
    );
  }
};

export default ProposeTopic;
