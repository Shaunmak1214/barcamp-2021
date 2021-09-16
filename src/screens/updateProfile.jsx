import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../reducers/authSlice';

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
  Box,
  useToast,
} from '@chakra-ui/react';

import { SectionTitle } from '../components/SectionTitle';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import BCModal from './../components/Modal';
import Loader from '../components/Loader';

import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { BCTextFilledFormField, SelectFormField } from '../components/Forms';

import store from './../store/store';
import useAxios from './../hooks/useAxios';
import useModal from '../components/Modal/useModal';

// eslint-disable-next-line
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;

const schema = yup.object({
  fullname: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters'),
  age: yup
    .number()
    .required('Age is required')
    .min(16, 'Age must be at least 16')
    .max(100, 'Age must be at most 100')
    .typeError('Age is not valid'),
  contactnumber: yup
    .string()
    .required('Contact Number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  noc: yup
    .string()
    .required('Name of Company/ Name of Institution is required')
    .min(1),
  value: yup.string().notRequired(),
});

const updateProfile = () => {
  const authState = store.getState().auth;

  const toast = useToast();

  const [heard, setHeard] = useState([]);
  const [updateErr, setUpdateErr] = useState('');

  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  const dispatch = useDispatch();
  const { fetch, loading: isPosting } = useAxios(
    {
      method: 'patch',
      url: `/users/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (err, res) => {
      console.log(err, res);
      if (err) {
        if (err.data.error) {
          setUpdateErr(' ' + err.data.error);
        } else {
          setUpdateErr(' ' + err);
        }
        onModalOpen();
      } else if (res) {
        let resData = res.data;
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          toast({
            title: 'Update Profile Successfully.',
            position: 'top-right',
            variant: 'top-accent',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          let decodedData = jwt_decode(resData.accessToken);
          let loginObj = {
            accessToken: resData.accessToken,
            refreshToken: resData.refreshToken,
            user: decodedData,
          };
          dispatch(LOGIN(loginObj));
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          setUpdateErr(' ' + resData.data.error);
          onModalOpen();
        }
      }
    },
  );

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
              There is an error when updating your profile.
            </Text>
            <Text
              as="h3"
              fontSize="sm"
              fontFamily="Montserrat"
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
      <VStack w="100%" justifyContent="flex-start" alignItems="center">
        <BCSpacer size="xs" />
        <Container maxW="container.lg" alignItems="flex-start">
          <SectionTitle alignItems="flex-start" fontSize="3xl" type="left">
            <Text fontSize="3xl">
              Complete your {'  '}
              <span style={{ color: '#1050A0' }}>profile</span>
            </Text>
          </SectionTitle>
          <BCSpacer size="3xs" />
          <Text fontSize="xl" color="#797979">
            Please take a moment to complete your profile for starting your
            journey as a Barcamper.
          </Text>

          <BCSpacer size="md" />

          {updateErr ? (
            <Alert status="error">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>{updateErr}</AlertTitle>
                <AlertDescription display="block">
                  There is an error when updating your profile. Please try it
                  again.
                </AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          ) : null}

          <BCSpacer size="3xs" />

          <Formik
            validationSchema={schema}
            initialValues={{
              fullname: '',
              age: '',
              contactnumber: '',
              noc: '',
              others: '',
            }}
            onSubmit={(data) => {
              fetch({
                fullName: data.fullname,
                age: data.age,
                contactNumber: data.contactnumber,
                companyOrInstitution: data.noc,
                heard: [...heard, data.others],
              });
            }}
          >
            {() => (
              <Form autoComplete="off" h="100%">
                <VStack spacing={10} h="100%">
                  <SimpleGrid w="100%" spacing={10} columns={[1, 2, 2]}>
                    <Field
                      type="text"
                      label="Full Name *"
                      name="fullname"
                      placeholder="Enter your full name"
                      customLabel={
                        <Text fontSize="md" color="#1A202C">
                          Full Name <span style={{ color: 'red' }}>*</span>
                        </Text>
                      }
                      component={BCTextFilledFormField}
                    />
                    <Field
                      label="Age *"
                      name="age"
                      placeholder="Enter your age"
                      component={BCTextFilledFormField}
                      type="number"
                      customLabel={
                        <Text fontSize="md" color="#1A202C">
                          Age <span style={{ color: 'red' }}>*</span>
                        </Text>
                      }
                    />
                  </SimpleGrid>
                  <Field
                    label="Contact Number *"
                    name="contactnumber"
                    placeholder="01X-XXXXXXX"
                    component={BCTextFilledFormField}
                    type="tel"
                    customLabel={
                      <Text fontSize="md" color="#1A202C">
                        Contact Number <span style={{ color: 'red' }}>*</span>
                      </Text>
                    }
                  />
                  <Field
                    label="Name of Company / Name of Institution *"
                    name="noc"
                    placeholder="Enter your company name or university name "
                    component={BCTextFilledFormField}
                    customLabel={
                      <Text fontSize="md" color="#1A202C">
                        Name of Company / Name of Institution
                      </Text>
                    }
                  />
                  <VStack w="100%" h="100%" alignItems="flex-start">
                    <Text
                      fontFamily="Montserrat"
                      fontWeight="500"
                      fontSize="md"
                    >
                      How do you know about Barcamp Cyberjaya?{' '}
                      <span style={{ color: '#C2C2C2' }}> (optional)</span>
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
                      <SelectFormField
                        value="MMU Portal / MMLS"
                        onSelect={onSelect}
                      >
                        <Text>MMU Portal / MMLS</Text>
                      </SelectFormField>
                      <SelectFormField value="Discord" onSelect={onSelect}>
                        <Text>Discord </Text>
                      </SelectFormField>
                      <Field
                        name="others"
                        type="text"
                        placeholder=" Others: Please state if any..."
                        background="transparent"
                        border="1px solid #E9E9E9"
                        borderColor="#e9e9e9"
                        pl="14px"
                        autoComplete="new-password"
                        component={BCTextFilledFormField}
                      />
                    </Box>
                  </VStack>

                  <PrimaryButton
                    alignSelf="flex-end"
                    w={['100%', 'fit-content', 'fit-content']}
                    py="25px"
                    px="75px"
                    type="submit"
                    disabled={isPosting}
                  >
                    {isPosting ? (
                      <Loader type="" size="md" />
                    ) : (
                      <Text fontSize="lg">Submit</Text>
                    )}
                  </PrimaryButton>
                </VStack>
              </Form>
            )}
          </Formik>
        </Container>

        <BCSpacer size="md" />
      </VStack>
    </>
  );
};

export default updateProfile;
