import React, { useState, useEffect, useRef } from 'react';

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
  useToast,
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
  description: yup
    .string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters'),
  topicTheme: yup.string().required('Topic theme is required'),
  topicName: yup
    .string()
    .required('Topic name is required')
    .min(3, 'Topic name must be at least 3 characters'),
  topicSummary: yup
    .string()
    .required('Topic Summary is required')
    .min(3, 'Topic Summary must be at least 3 characters'),
});

const ProposeTopic = () => {
  const viewRef = useRef(null);
  const permanentRef = useRef(null);

  const { scrollToRef, executeScroll } = useScrollTo();
  const toast = useToast();

  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  // loading state
  const [checked, setChecked] = useState(false);

  const [userTopic, setUserTopic] = useState(null);
  const [updateErr, setUpdateErr] = React.useState('');

  const authState = store.getState().auth;

  const { loading: isPosting, fetch: postProposedTopic } = useAxios(
    {
      method: 'post',
      url: '/topics',
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (err, res) => {
      if (err) {
        if (err.data.error) {
          setUpdateErr(' ' + err.data.error);
        } else {
          setUpdateErr(' ' + err);
        }
        onModalOpen();
      } else if (res) {
        toast({
          title: 'Topics Submitted!',
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

  const { loading: isFetchTopicsLoading, fetch: fetchTopicsByUser } = useAxios(
    {
      method: 'get',
      url: `/topicsByUser/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
    (err, res) => {
      if (err) {
        if (err.status == 425) {
          window.location.href = '/dashboard';
        } else {
          setUpdateErr(' ' + err.data.error);
        }
      } else if (res) {
        setUserTopic(res.data);
      }
    },
  );

  const handleConsentCheck = () => {
    if (permanentRef.current.checked && viewRef.current.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  useEffect(() => {
    fetchTopicsByUser();
  }, []);

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
                Theres an error with your request.
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
                <Text as="h1" fontSize="4xl" fontWeight="600" py="2">
                  PROPOSE A TOPIC TO SHARE
                </Text>
                <Text as="h2" fontSize="xl" fontWeight="300">
                  Let’s brings people together to share their passion with
                  topics surrounding tech, non-tech and nonsense. There is no
                  preset sharing for Barcamp like usual conferences. Feel free
                  to propose anything to share your thought below.
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
            mt="10"
          >
            <Container maxW="container.xl">
              <InfoBlock
                theme=""
                content={
                  <Text>
                    You have already propose a topic for this session. The final
                    topic announcement will be made on 1 October 2021. See you
                    soon!
                  </Text>
                }
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
                    <Text as="h2" fontSize="md" fontWeight="500">
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
                    description: data.topicSummary,
                    self_description: data.description,
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
                        placeholder="I'm a ... "
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
                        placeholder="Select a theme for your topic"
                        component={SelectDropdownFormField}
                      />

                      <Field
                        label="Topic Name"
                        name="topicName"
                        placeholder="How coding is more like baking a pie than reading a book."
                        component={BCTextFormField}
                      />

                      <Field
                        label="Topic Summary"
                        name="topicSummary"
                        placeholder="I'm going to talk about ..."
                        maxLength={250}
                        component={BCTextAreaField}
                      />

                      <Checkbox
                        ref={viewRef}
                        size="lg"
                        pl="5"
                        onChange={handleConsentCheck}
                      >
                        <Text fontSize="md" ml="5px">
                          I{"'"}m aware that other users can view your topic and
                          information as a sharer.{' '}
                        </Text>
                      </Checkbox>

                      <Checkbox
                        ref={permanentRef}
                        size="lg"
                        pl="5"
                        onChange={handleConsentCheck}
                      >
                        <Text fontSize="md" ml="5px">
                          I{"'"}m aware that the information I submit will be
                          permanent and cannot be changed.
                        </Text>
                      </Checkbox>

                      <PrimaryButton
                        alignSelf="flex-end"
                        w={['100%', 'fit-content', 'fit-content']}
                        py="25px"
                        px="75px"
                        type="submit"
                        disabled={isPosting || !checked}
                      >
                        {isPosting ? (
                          <Loader type="" size="md" />
                        ) : (
                          <Text fontSize="lg">Propose</Text>
                        )}
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
