import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../reducers/authSlice';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { PrimaryButton } from '../Buttons';
import { BarCampFullLogo, DownIcon, PlatinumIcon } from '../../assets/';
import MobileMenu from './MobileMenu';
import store from '../../store/store';

import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';

const Index = ({ cta, type }) => {
  const dispatch = useDispatch();

  const headerSticky = useRef(null);
  const sponsorHover = useRef(null);
  const moreHover = useRef(null);
  const joinButton = useRef(null);

  const authState = store.getState().auth;
  const user = authState.user;
  const isAuthenticated = authState.isAuthenticated;

  const mobileSize = window.screen.width <= 768;

  const logout = () => {
    dispatch(LOGOUT());
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSdTi-Pyc6i7L_CtYAleBQuQXI94jvIxW04xfXv_EuITz8Ausw/viewform';
  };

  const handleScroll = (e) => {
    const window = e.currentTarget;
    if (window.scrollY > 10) {
      stickyToggle(true);
    } else {
      stickyToggle(false);
    }
  };

  const sponsorToggle = (status) => {
    if (sponsorHover.current && status === 'in') {
      sponsorHover.current.style.visibility = 'visible';
      sponsorHover.current.style.opacity = '1';
    } else if (sponsorHover.current && status === 'out') {
      sponsorHover.current.style.visibility = 'hidden';
      sponsorHover.current.style.opacity = '0';
    }
  };

  const moreToggle = (status) => {
    if (moreHover.current && status === 'in') {
      moreHover.current.style.visibility = 'visible';
      moreHover.current.style.opacity = '1';
    } else if (moreHover.current && status === 'out') {
      moreHover.current.style.visibility = 'hidden';
      moreHover.current.style.opacity = '0';
    }
  };

  const stickyToggle = (status) => {
    if (status) {
      if (cta) {
        joinButton.current.style.display = 'flex';
        joinButton.current.style.transform = 'scaleX(1)';
      }

      headerSticky.current.style.top = '0px';
      headerSticky.current.style.background = 'white';
    } else {
      if (cta) {
        joinButton.current.style.display = 'none';
        joinButton.current.style.transform = 'scaleX(0)';
      }

      if (!mobileSize) {
        headerSticky.current.style.top = '15px';
        headerSticky.current.style.background = 'none';
      }
    }
  };

  const SponsorBlockRenderer = ({ sponsorData }) => {
    if (sponsorData) {
      return (
        <VStack alignItems="flex-start" justifyContent="flex-start" w="100%">
          <HStack>
            <Image src={PlatinumIcon} height="15px" width="15px" />
            <Text fontFamily="Montserrat" fontSize="lg" fontWeight="600">
              {sponsorData.type}
            </Text>
          </HStack>
          <SimpleGrid
            columns={sponsorData.level}
            spacing={5}
            w="100%"
            minW="100%"
            flexDir="row"
            flexWrap="wrap"
          >
            {sponsorData.sponsors.map((sponsor, idx) => {
              return (
                <Center
                  key={idx}
                  p={3}
                  borderRadius="4px"
                  bg="#F5F5F5"
                  cursor="pointer"
                  w="100%"
                  h="100%"
                  onClick={() => {
                    window.open(`${sponsor.link || '#'}`, '_blank');
                  }}
                >
                  <Image
                    maxH="125px"
                    src={sponsor.imageSrc}
                    w="auto"
                    minW="100px"
                    h="100%"
                    objectFit="contain"
                  />
                </Center>
              );
            })}
          </SimpleGrid>
        </VStack>
      );
    } else {
      return <Text>No Data</Text>;
    }
  };

  SponsorBlockRenderer.propTypes = {
    sponsorData: PropTypes.any,
  };

  React.memo(SponsorBlockRenderer);

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleScroll(e));

    // Google Analytics
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      window.removeEventListener('scroll', (e) => handleScroll(e));
    };
  }, [scroll]);

  return (
    <Center
      position={type === 'fixed' ? 'sticky' : ['sticky', 'sticky', 'fixed']}
      zIndex="50"
      w="100%"
      py="5px"
      top={mobileSize ? '0px' : '15px'}
      mb={mobileSize ? null : ['15px', null, null]}
      transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
      ref={headerSticky}
      fontFamily="Montserrat"
    >
      <Container maxW="container.xl">
        <HStack w="100%" justifyContent="space-between">
          <Image
            onClick={() => {
              window.location.href = '/';
            }}
            cursor="pointer"
            width="200px"
            height="auto"
            src={BarCampFullLogo}
            alt="Logo"
          />
          {mobileSize && <MobileMenu />}

          <HStack
            d={['none', 'none', 'flex']}
            className="navbar"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="8px"
            px="25px"
            spacing="45"
            position="relative"
          >
            <Link href="/#about" py="5">
              <Text fontSize="sm">ABOUT</Text>
            </Link>
            <Link href="/#agenda" py="5">
              <Text fontSize="sm">AGENDA</Text>
            </Link>
            <Link href="/#faq" py="5">
              <Text fontSize="sm">FAQ</Text>
            </Link>
            <Link
              href="#sponsors"
              py="5"
              onMouseOver={() => {
                sponsorToggle('in');
              }}
              onMouseLeave={() => {
                sponsorToggle('out');
              }}
            >
              <Text fontSize="sm">SPONSORS</Text>
            </Link>
            <Box
              py="5"
              position="relative"
              onMouseOver={() => {
                moreToggle('in');
              }}
              onMouseLeave={() => {
                moreToggle('out');
              }}
            >
              <Text fontSize="sm" d="flex" alignItems="center">
                MORE
                <Image src={DownIcon} height="12px" width="12px" ml="5px" />
              </Text>
              <VStack
                className="more-hover"
                ref={moreHover}
                visibility="hidden"
                opacity="0"
                position="absolute"
                top="70px"
                right="0px"
                w="215px"
                alignItems="flex-start"
                bg="rgba(255, 255, 255, 0.98)"
                boxShadow="0px 16px 40px rgba(165, 165, 165, 0.25)"
                py="4"
                px="4"
                borderRadius="4px"
                transition="visibility 0.2s ease-in-out, opacity 0.2s ease-in-out"
                zIndex="1001"
                cursor="pointer"
              >
                {isAuthenticated ? (
                  <>
                    <HStack mb="5px">
                      <Image
                        src={user.picture}
                        height="30px"
                        width="30px"
                        borderRadius="50%"
                      />
                      <Text
                        fontSize="xs"
                        fontWeight="500"
                        ml="5"
                        w="80%"
                        wordBreak="break-word"
                      >
                        {user.email}
                      </Text>
                    </HStack>

                    <Link href="/dashboard" py="3">
                      <Text fontSize="sm">Dashboard</Text>
                    </Link>
                    <Link href="/vote-topic" py="3">
                      <Text fontSize="sm">Vote Topics</Text>
                    </Link>
                    <Link href="/propose-topic" py="3">
                      <Text fontSize="sm">Propose Topic</Text>
                    </Link>
                    {isAuthenticated && (
                      <Link
                        py="3"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <Text fontSize="sm">Log Out</Text>
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdTi-Pyc6i7L_CtYAleBQuQXI94jvIxW04xfXv_EuITz8Ausw/viewform"
                    py="3"
                  >
                    <Text fontSize="sm">Login / Register</Text>
                  </Link>
                )}
              </VStack>
            </Box>

            {/* Join us now condition rendering */}
            {cta && (
              <PrimaryButton
                ref={joinButton}
                d="none"
                transform="scaleX(0)"
                py="20px"
                fontFamily="Source Sans Pro"
                onClick={() => {
                  window.location.href =
                    'https://docs.google.com/forms/d/e/1FAIpQLSdTi-Pyc6i7L_CtYAleBQuQXI94jvIxW04xfXv_EuITz8Ausw/viewform';
                }}
              >
                Login / Register
              </PrimaryButton>
            )}

            <HStack
              className="sponsor-hover"
              ref={sponsorHover}
              visibility="hidden"
              opacity="0"
              position="absolute"
              top="70px"
              right="0px"
              w="container.xl"
              bg="rgba(255, 255, 255, 0.98)"
              boxShadow="0px 16px 40px rgba(165, 165, 165, 0.25)"
              p="8"
              borderRadius="15px"
              transition="visibility 0.2s ease-in-out, opacity 0.2s ease-in-out"
              zIndex="50"
              cursor="pointer"
              onMouseOver={() => {
                sponsorToggle('in');
              }}
              onMouseLeave={() => {
                sponsorToggle('out');
              }}
            >
              <VStack w="65%">
                <SponsorBlockRenderer sponsorData={platinumSponsor} />
                <br></br>
                <SponsorBlockRenderer sponsorData={goldSponsor} />
                <br></br>
                <SponsorBlockRenderer sponsorData={silverSponsor} />
              </VStack>

              <Center w="35%" p={5}>
                <Image src={BarCampFullLogo} />
              </Center>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Center>
  );
};
Index.propTypes = {
  type: PropTypes.string,
  cta: PropTypes.bool,
};

React.memo(Index);

export default Index;
