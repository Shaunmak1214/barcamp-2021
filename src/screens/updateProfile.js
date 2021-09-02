import React from 'react';
import { Container, SimpleGrid, Text, VStack, Box } from '@chakra-ui/layout';
import { SectionTitle } from '../components/SectionTitle';
import BCSpacer from '../components/Spacer';

import { SecondaryButton } from '../components/Buttons';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextFormField } from '../components/Forms';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullname: yup.string().required().min(3),
  age: yup.number().min(18),
  contactnumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  noc: yup.string().required().min(1),
});

const updateProfile = () => {
  return (
    <VStack
      w="100%"
      minh="100vh"
      justifyContent="flex-start"
      alignItems="center"
    >
      <BCSpacer size="xs" />
      <BCSpacer size="xs" />
      <Container maxW="container.lg" alignItems="flex-start">
        <SectionTitle alignItems="flex-start" fontSize="30px" type="left">
          Register as a
          <Text ml="2" color="#1050A0;">
            {' '}
            Barcamp Participant
          </Text>
        </SectionTitle>

        <BCSpacer size="md" />

        <Formik
          validationSchema={schema}
          initialValues={{ fullname: '', age: '', contactnumber: '', noc: '' }}
          onSubmit={() => {
            console.log('submit');
          }}
        >
          {() => (
            <Form>
              <VStack spacing={10}>
                <SimpleGrid w="100%" spacing={10} columns={[1, 2, 2]}>
                  <Field
                    label="Full Name"
                    name="fullname"
                    placeholder="Enter your full name"
                    component={TextFormField}
                  />
                  <Field
                    label="Age"
                    name="age"
                    placeholder="Enter your age"
                    component={TextFormField}
                  />
                </SimpleGrid>
                <Field
                  label="Contact Number"
                  name="contactnumber"
                  placeholder="01X-XXXXXXX"
                  component={TextFormField}
                />
                <Field
                  label="Name of Company / Name of institution"
                  name="noc"
                  placeholder="Enter your company name or university name"
                  component={TextFormField}
                />
                <VStack w="100%" alignItems="flex-start">
                  <Text fontFamily="Poppins" fontWeight="600" fontSize="15px">
                    How do you know about Barcamp Cyberjaya
                  </Text>
                  <Box
                    w="100%"
                    h="250px"
                    border="2px solid #C2C2C2;"
                    borderRadius="8px"
                  ></Box>
                </VStack>

                <SecondaryButton
                  alignSelf="flex-end"
                  w={['100%', 'fit-content', 'fit-content']}
                  py="25px"
                  px="75px"
                >
                  <Text fontSize="18px">Register</Text>
                </SecondaryButton>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>

      <BCSpacer size="md" />
    </VStack>
  );
};

export default updateProfile;
