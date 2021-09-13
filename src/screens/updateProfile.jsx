import React from 'react';
import { Container, SimpleGrid, Text, VStack, Box } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { SectionTitle } from '../components/SectionTitle';
import BCSpacer from '../components/Spacer';
import store from './../store/store';
import { PrimaryButton } from '../components/Buttons';
import useAxios from './../hooks/useAxios';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { BCTextFilledFormField, SelectFormField } from '../components/Forms';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../reducers/authSlice';
import BCModal from './../components/Modal';
import useModal from '../components/Modal/useModal';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullname: yup.string().required().min(3),
  age: yup.number().required().min(18),
  contactnumber: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid'),
  noc: yup.string().required().min(1),
});

const updateProfile = () => {
  const authState = store.getState().auth;

  const [heard, setHeard] = React.useState([]);
  const [updateErr, setUpdateErr] = React.useState('');

  const { isOpen, onModalClose, onModalOpen } = useModal({
    initialState: false,
  });

  const dispatch = useDispatch();
  const { fetch } = useAxios(
    {
      method: 'patch',
      url: `/users/${authState.user.userId}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
    (res, err) => {
      if (res) {
        let resData = res.data;
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          let decodedData = jwt_decode(resData.accessToken);
          let loginObj = {
            accessToken: resData.accessToken,
            refreshToken: resData.accessToken,
            user: decodedData,
          };
          dispatch(LOGIN(loginObj));
          window.location.href = '/dashboard';
        } else {
          setUpdateErr(' ' + resData.data.error);
          onModalOpen();
        }
      } else if (err) {
        setUpdateErr(' ' + err);
        onModalOpen();
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
            }}
            onSubmit={(data) => {
              fetch({
                fullName: data.fullname,
                age: data.age,
                contactNumber: data.contactnumber,
                companyOrInstitution: data.noc,
                heard: heard,
              });
            }}
          >
            {() => (
              <Form h="100%">
                <VStack spacing={10} h="100%">
                  <SimpleGrid w="100%" spacing={10} columns={[1, 2, 2]}>
                    <Field
                      label="Full Name *"
                      name="fullname"
                      placeholder="Enter your full name"
                      component={BCTextFilledFormField}
                    />
                    <Field
                      label="Age *"
                      name="age"
                      placeholder="Enter your age"
                      component={BCTextFilledFormField}
                    />
                  </SimpleGrid>
                  <Field
                    label="Contact Number *"
                    name="contactnumber"
                    placeholder="01X-XXXXXXX"
                    component={BCTextFilledFormField}
                  />
                  <Field
                    label="Name of Company / Name of Institution *"
                    name="noc"
                    placeholder="Enter your company name or university name *"
                    component={BCTextFilledFormField}
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
                    onClick={() => {
                      window.location.href = '#';
                    }}
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
    </>
  );
};

export default updateProfile;
