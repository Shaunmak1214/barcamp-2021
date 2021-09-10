import React, { useState, useEffect } from 'react';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

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
import { Checkbox } from '@chakra-ui/react';
import { PrimaryButton } from '../components/Buttons';
import { SectionTitle } from 'components/SectionTitle';
import {
  BCTextFormField,
  BCTextAreaField,
  SelectDropdownFormField,
} from '../components/Forms';
import BCSpacer from '../components/Spacer';
import { SectionBg, ProposePic } from '../assets';
import axios from 'axios';
import { useScrollTo } from '../hooks';
import { API_URL } from './../constants/index';
import '../global.css';

const schema = yup.object({
  description: yup.string().required().min(3),
  topicTheme: yup.string().required(),
  topicName: yup.string().required().min(3),
  topicSummary: yup.string().required().min(3),
});

const ProposeTopic = () => {
  const { scrollToRef, executeScroll } = useScrollTo();
  const [checked, setChecked] = useState(false);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJams1TVdJd05qTTJZV0ZrWVRNME1XTTFZVEE0WlRCa09HWXlOREEyT1RjeU1EWTBaR000WldRaUxDSjBlWEFpT2lKS1YxUWlmUS5leUpwYzNNaU9pSmhZMk52ZFc1MGN5NW5iMjluYkdVdVkyOXRJaXdpWVhwd0lqb2lNamsxTURFeE56QTBPRFV5TFRsdU9UWnhPWFJ1TUhJNGFtMXliV1J2YURCc2RISnJkVFJ6Y1cwNWIySnFMbUZ3Y0hNdVoyOXZaMnhsZFhObGNtTnZiblJsYm5RdVkyOXRJaXdpWVhWa0lqb2lNamsxTURFeE56QTBPRFV5TFRsdU9UWnhPWFJ1TUhJNGFtMXliV1J2YURCc2RISnJkVFJ6Y1cwNWIySnFMbUZ3Y0hNdVoyOXZaMnhsZFhObGNtTnZiblJsYm5RdVkyOXRJaXdpYzNWaUlqb2lNVEV3TlRnMk1ESXhOelk1TXpreU5USXpOakEySWl3aVpXMWhhV3dpT2lKaWRYTmpiMjF3WVc1NU1USXpRR2R0WVdsc0xtTnZiU0lzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSmhkRjlvWVhOb0lqb2lSMDh0V21scU1VMWlVbloxVDA1Q2FtZHBaemRNZHlJc0ltNWhiV1VpT2lKQ2RYTWdZMjl0Y0dGdWVTSXNJbkJwWTNSMWNtVWlPaUpvZEhSd2N6b3ZMMnhvTXk1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMHZZUzlCUVZSWVFVcDNUbkJhVVRCeVdWUlNRVk5WU0RnMlIyWnliMVI2Ym5aNWRsbEpXaTFaU1hnMlNVSk5TajF6T1RZdFl5SXNJbWRwZG1WdVgyNWhiV1VpT2lKQ2RYTWlMQ0ptWVcxcGJIbGZibUZ0WlNJNkltTnZiWEJoYm5raUxDSnNiMk5oYkdVaU9pSmxiaUlzSW1saGRDSTZNVFl6TVRJd01EQXpPQ3dpWlhod0lqb3hOak14TWpBek5qTTRMQ0pxZEdraU9pSXdOakE0WXprNE1qWTNOVFl5WlRaa056TXlaRFJrTUdFMlpUTmlaREF3TWpWalpEY3hPREUzSW4wLmVVQjkxbE52ZzFjTi1xMkRScEZBNUZkMW1NSDdkV1g5M1dyTjBvRGM1Q0Z5SFJFOV9MeER3NDFDTXNjSGkyNy1uSVNjQzFwU2U3YkJTWjd4cGtLSnpOMV9KcEdFOFVsY0hiTDM3a2ttck00Zi0tNmJUbzNDNlBZSndiVEFDS0lNVGdNcl9qSG5BTXNUZ1dDOE04OFphVVBXcEVnU3Vwc3VBSzRoX0ZiMTFnTk5CTTVKel9TdUg0Tlh0VTczNFg3cFp2YW9lWDQxM1o4Z1ZrNFhZa0dheWd6SnZOTHd0MHRWaW43RkFWWVlXTjA4ZGhuSk5uYnB0dmh5LXZDZFE0d1BMLW0yMzMwOVIyNmV0UDFuTEVIT0Z3Z3FxWGJJVW9lcEF6X3hjdm1wMFZ4WnZOcWRQQXJlejN0NmNrQUhMNzU0b2FLT21SRC04RHdUc084SGFZbU55QSIsImVtYWlsIjoiYnVzY29tcGFueTEyM0BnbWFpbC5jb20iLCJ1c2VySWQiOiItSVFNVnZwZmkiLCJwZXJtaXNzaW9uRmxhZ3MiOjEsInJlZnJlc2hLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlsyNTQsNTEsMTE2LDExNywzOCwyNDgsNiwyNDksMTUsMTMyLDE3OCwyMzcsMjM5LDE5OSwxMDUsMTY3XX0sImlhdCI6MTYzMTIwMDA1NSwiZXhwIjoxNjMxMjM2MDU1fQ.D5Zmt9h8RX5YYFG2ZV_Zrnji74GQrlp5iwxIZe4r2yk';

  const handleConsentCheck = (e) => {
    setChecked(e.target.checked);
  };

  const handleTopicAdder = ({ description, topicTheme, topicName }) => {
    const data = {
      name: topicName,
      user: '-IQMVvpfi',
      theme: topicTheme,
      description,
      contact: '-',
      self_description: '-',
    };
    console.log(data);

    const config = {
      method: 'post',
      url: `${API_URL}topics`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // need to put content type?
        // log in then change footer etc
        // need to set open button? if the vote topic day arrive
      },
      data,
    };

    axios(config)
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var observer = new IntersectionObserver(
      function (entries) {
        // no intersection with screen
        if (entries[0].intersectionRatio === 0)
          document
            .querySelector('.voteTopicHeader')
            .classList.add('voteTopicHeader-sticky');
        // fully intersects with screen
        else if (entries[0].intersectionRatio === 1)
          document
            .querySelector('.voteTopicHeader')
            .classList.remove('voteTopicHeader-sticky');
      },
      { threshold: [0, 1] },
    );

    observer.observe(document.querySelector('.voteTopicHeaderTop'));
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
                <PrimaryButton width="200px" onClick={() => executeScroll()}>
                  Propose Topic
                </PrimaryButton>
              </HStack>
            </VStack>
            <Image d={['none', 'none', 'block']} src={ProposePic} alt="Login" />
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
        <Formik
          validationSchema={schema}
          initialValues={{
            description: '',
            topicTheme: '',
            topicName: '',
            topicSummary: '',
          }}
          onSubmit={(data) => handleTopicAdder(data)}
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
                    When you propose a topic, you are aware that other users can
                    view your information as a speaker.{' '}
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
  );
};

export default ProposeTopic;
