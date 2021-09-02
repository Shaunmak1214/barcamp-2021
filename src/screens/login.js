import { Image } from '@chakra-ui/image';
import {
  Container,
  Link,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Center,
  Box,
} from '@chakra-ui/layout';
import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
// import Loader from '../components/Loader';
import { useRef, useEffect } from 'react';

import { Splash1 } from '../assets';

import { ResultIcon, Splash1, VotingIcon } from '../assets';
import { CountDownBlock } from 'components/Countdown';
import { SectionBg, NoMessageIcon } from '../assets';
import { SectionTitle } from 'components/SectionTitle';

const Login = () => {
  // const handleGoogleLogin = async (googleData) => {
  //   if (googleData) {
  //     await axios
  //       .post(`${API_URL}auth/google`, {
  //         googleToken: googleData.tokenId,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           dispatch(
  //             LOGIN({
  //               access_token: res.data,
  //             }),
  //           );
  //           /* setLoggedIn(true) */
  //           window.location.href = '/';
  //         } else {
  //           setErrorMessage(`Google Log In Failed ${res.data}`);
  //           setGoogleSignInClicked(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setErrorMessage(`Google Log In Failed ${googleData.tokenId}`);
  //         setGoogleSignInClicked(false);
  //       });
  //   } else {
  //     console.log('error');
  //   }
  // };

  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  let interval = useRef();

  const countDownTimer = () => {
    const countDownDate = new Date('September 25, 2021 00:00:00').getTime();

    // @ts-ignore
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const calDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const calHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const calMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      );
      const calSeconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        daysRef.current.innerText = calDays;
        hoursRef.current.innerText = calHours;
        minutesRef.current.innerText = calMinutes;
        secondsRef.current.innerText = calSeconds;
      }
    }, 1000);
  };

  useEffect(() => {
    countDownTimer();

    return () => {
      clearInterval(interval.current);
    };
  }, []);

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
              <Text as="h1" fontSize="35px" fontWeight="600">
                WELCOME TO BARCAMP
              </Text>
              <Text as="h2" fontSize="15px" fontWeight="500">
                Please login to continue. By logging in, you agree to our{' '}
                <Link color="blue">privacy policy</Link> . We only use this
                authentication to get your email and protect the app from
                unauthorised input.
              </Text>
              <BCSpacer size="sm" />
              <GoogleLogin
                clientId="202957668239-rkdg4atg2h8n5br8akn5c1k0s4uno6cm.apps.googleusercontent.com"
                render={(renderProps) => (
                  <PrimaryButton
                    onClick={() => {
                      renderProps.onClick();
                    }}
                    disabled={renderProps.disabled}
                    px="50"
                    py="6"
                  >
                    Join us now
                  </PrimaryButton>
                )}
                autoLoad={false}
                onAutoLoadFinished={() => {
                  console.log('Google Login Loaded');
                }}
                buttonText="Log in with Google"
                // onSuccess={handleGoogleLogin}
                // onFailure={handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
              />
            </VStack>
            <Image src={Splash1} alt="Login" />
          </SimpleGrid>
        </Container>
      </VStack>
      <Center
        id="countdown-timer"
        bgImg={SectionBg}
        alignItems="center"
        justifyContent="center"
      >
        <Container
          maxW="container.xl"
          py={['50px', '50px']}
          justifyContent="center"
          alignItems="center"
        >
          <SimpleGrid
            columns={[1, 1, 4]}
            spacing={2}
            textAlign="center"
            justifyItems="center"
            alignItems="center"
          >
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
              <Text
                ref={daysRef}
                fontSize="25px"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="15px" color="#EB202B">
                Days
              </Text>
            </CountDownBlock>
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
              <Text
                ref={hoursRef}
                fontSize="25px"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="15px" color="#EB202B">
                Hours
              </Text>
            </CountDownBlock>
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
              <Text
                ref={minutesRef}
                fontSize="25px"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="15px" color="#EB202B">
                Minutes
              </Text>
            </CountDownBlock>
            <CountDownBlock background="#ffffff" marginBottom={['25px', '0']}>
              <Text
                ref={secondsRef}
                fontSize="25px"
                fontWeight="bold"
                color="#1050A0"
              >
                0
              </Text>
              <Text fontSize="15px" color="#EB202B">
                Seconds
              </Text>
            </CountDownBlock>
          </SimpleGrid>
        </Container>
      </Center>
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle type="left">Your Proposed Topic</SectionTitle>
          <VStack
            mt="50px"
            p="45px 30px 45px 80px"
            border="3px solid #EB202B"
            borderRadius="10px"
          >
            <Text as="h1" fontSize="35px" fontWeight="600">
              WELCOME TO BARCAMP
            </Text>
            <Text as="h2" fontSize="15px" fontWeight="500">
              Please login to continue. By logging in, you agree to our{' '}
              <Link color="blue">privacy policy</Link> . We only use this
              authentication to get your email and protect the app from
              unauthorised input.
            </Text>
            <BCSpacer size="sm" />
            <GoogleLogin
              clientId="202957668239-rkdg4atg2h8n5br8akn5c1k0s4uno6cm.apps.googleusercontent.com"
              render={(renderProps) => (
                <PrimaryButton
                  onClick={() => {
                    renderProps.onClick();
                  }}
                  disabled={renderProps.disabled}
                  px="50"
                  py="6"
                >
                  Join us now
                </PrimaryButton>
              )}
              autoLoad={false}
              onAutoLoadFinished={() => {
                console.log('Google Login Loaded');
              }}
              buttonText="Log in with Google"
              // onSuccess={handleGoogleLogin}
              // onFailure={handleGoogleLogin}
              cookiePolicy={'single_host_origin'}
            />
          </VStack>
          <Image d={['none', 'none', 'flex']} src={Splash1} alt="Login" />
        </SimpleGrid>
      </Container>
    </VStack>

            <HStack justifyContent="center" alignItems="center" mb="10px">
              <Image src={NoMessageIcon} />
              <Box p="0 50px">
                <Text>
                  You haven&apos;t proposed any topic yet. If you are
                  volunteering to become a speaker in Barcamp, kindly keep in
                  mind that the last day to propose a topic is on
                  <span style={{ fontWeight: 'bold' }}> 24 September 2021</span>
                </Text>
              </Box>
            </HStack>
            <PrimaryButton>Propose a Topic</PrimaryButton>
          </VStack>
        </Container>
      </VStack>
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle type="left">Your Voted Topic</SectionTitle>

          <HStack
            justifyContent="center"
            alignItems="center"
            mb="10px"
            mt="50px"
            p="55px 45px 70px 80px"
            borderWidth="3px"
            borderStyle="solid"
            borderRadius="10px"
            style={{
              borderImageSource:
                'linear-gradient(90deg, rgba(16, 80, 160, 0.8) 0%, rgba(16, 80, 160, 0.8) 0.01%, rgba(235, 32, 43, 0.8) 100%, rgba(235, 32, 43, 0.8) 100%)',
              borderImageSlice: 1,
            }}
          >
            <Image src={VotingIcon} />
            <Box p="0 50px">
              <Text>
                The voting session will be opening soon. Every participants
                including speakers are able to vote your desired topics starting
                from <span style={{ fontWeight: 'bold' }}>25 September </span>
                until
                <span style={{ fontWeight: 'bold' }}> 27 September 2021 </span>
              </Text>
            </Box>
          </HStack>
        </Container>
      </VStack>
      <VStack py="50px">
        <Container
          maxW="container.xl"
          d="flex"
          alignItems="flex-start"
          flexDir="column"
        >
          <SectionTitle type="left">Voting Result</SectionTitle>
          <HStack
            justifyContent="center"
            alignItems="center"
            mb="10px"
            mt="50px"
            p="55px 45px 70px 80px"
            borderWidth="3px"
            borderStyle="solid"
            borderRadius="10px"
            style={{
              borderImageSource:
                'linear-gradient(90deg, rgba(16, 80, 160, 0.8) 0%, rgba(16, 80, 160, 0.8) 0.01%, rgba(235, 32, 43, 0.8) 100%, rgba(235, 32, 43, 0.8) 100%)',
              borderImageSlice: 1,
            }}
          >
            <Image src={ResultIcon} />
            <Box p="0 50px">
              <Text>
                The voting result can be viewed strating from
                <span style={{ fontWeight: 'bold' }}> 25 September 2021 </span>
                which when the voting session is opened. However, the
                announcement for a finalized list of speakers will be made on
                <span style={{ fontWeight: 'bold' }}> 28 October 2021 </span>
                (One day before the Barcamp event)
              </Text>
            </Box>
          </HStack>
        </Container>
      </VStack>
    </>
  );
};

export default Login;
