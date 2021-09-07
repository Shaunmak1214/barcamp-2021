import React, { useState, useRef } from 'react';

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

import '../global.css';

const schema = yup.object({
  description: yup.string().required().min(3),
  topicTheme: yup.string().required(),
  topicName: yup.string().required().min(3),
  topicSummary: yup.string().required().min(3),
});

const ProposeTopic = () => {
  const scrollToRef = useRef(null);
  const [checked, setChecked] = useState(false);

  const handleConsentCheck = (e) => {
    setChecked(e.target.checked);
  };

  const executeScroll = () =>
    scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
            <Image src={ProposePic} alt="Login" />
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
      <Container maxW="container.xl" w="100%" py="50px">
        <Flex
          flexDir={['column', 'column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          ref={scrollToRef}
        >
          <SectionTitle fontSize="2xl" type="left">
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
        <BCSpacer size="sm" />
        <Formik
          validationSchema={schema}
          initialValues={{
            description: '',
            topicTheme: '',
            topicName: '',
            topicSummary: '',
          }}
          onSubmit={(data) => {
            console.log(data);
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
