import React from 'react';
import { Container, SimpleGrid, Text, VStack, Box } from '@chakra-ui/layout';
import { SectionTitle } from '../components/SectionTitle';
import BCSpacer from '../components/Spacer';

import { PrimaryButton } from '../components/Buttons';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { BCTextFilledFormField, SelectFormField } from '../components/Forms';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullname: yup.string().required().min(3),
  age: yup.number().min(18),
  contactnumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  noc: yup.string().required().min(1),
});

const updateProfile = () => {
  const [heard, setHeard] = React.useState([]);

  const onSelect = React.useCallback(
    (value, selected) => {
      setHeard((hear) => {
        if (selected) {
          if (hear.includes(value)) {
            return [...hear];
          } else {
            return [...hear, value];
          }
        } else {
          return hear.filter((item) => item !== value);
        }
      });
    },
    [setHeard],
  );
  return (
    <VStack w="100%" justifyContent="flex-start" alignItems="center">
      <BCSpacer size="xs" />
      <Container maxW="container.lg" alignItems="flex-start">
        <SectionTitle alignItems="flex-start" fontSize="3xl" type="left">
          <Text fontSize="2xl">
            Update your profile to become a {'  '}
            <span style={{ color: '#1050A0' }}>Barcamp Participant</span>
          </Text>
        </SectionTitle>

        <BCSpacer size="md" />

        <Formik
          validationSchema={schema}
          initialValues={{
            fullname: '',
            age: '',
            contactnumber: '',
            noc: '',
          }}
          onSubmit={(data) => {
            console.log(data);
            console.log(heard);
          }}
        >
          {() => (
            <Form h="100%">
              <VStack spacing={10} h="100%">
                <SimpleGrid w="100%" spacing={10} columns={[1, 2, 2]}>
                  <Field
                    label="Full Name"
                    name="fullname"
                    placeholder="Enter your full name"
                    component={BCTextFilledFormField}
                  />
                  <Field
                    label="Age"
                    name="age"
                    placeholder="Enter your age"
                    component={BCTextFilledFormField}
                  />
                </SimpleGrid>
                <Field
                  label="Contact Number"
                  name="contactnumber"
                  placeholder="01X-XXXXXXX"
                  component={BCTextFilledFormField}
                />
                <Field
                  label="Name of Company / Name of Institution"
                  name="noc"
                  placeholder="Enter your company name or university name"
                  component={BCTextFilledFormField}
                />
                <VStack w="100%" h="100%" alignItems="flex-start">
                  <Text fontFamily="Poppins" fontWeight="500" fontSize="md">
                    How do you know about Barcamp Cyberjaya *optional
                  </Text>
                  <Box w="100%" h="100%" py="5" borderRadius="8px">
                    <SelectFormField value="Facebook" onSelect={onSelect}>
                      <Text>Facebook</Text>
                    </SelectFormField>
                    <SelectFormField value="Instagram" onSelect={onSelect}>
                      <Text>Instagram</Text>
                    </SelectFormField>
                    <SelectFormField value="LinkedIn" onSelect={onSelect}>
                      <Text>LinkedIn</Text>
                    </SelectFormField>
                    <SelectFormField value="Youtube" onSelect={onSelect}>
                      <Text>Youtube</Text>
                    </SelectFormField>
                    <SelectFormField value="MMU" onSelect={onSelect}>
                      <Text>MMU</Text>
                    </SelectFormField>
                    <SelectFormField value="other" onSelect={onSelect}>
                      <Text>Other ... </Text>
                    </SelectFormField>
                  </Box>
                </VStack>

                <PrimaryButton
                  alignSelf="flex-end"
                  w={['100%', 'fit-content', 'fit-content']}
                  py="25px"
                  px="75px"
                  type="submit"
                >
                  <Text fontSize="lg">Register</Text>
                </PrimaryButton>
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
