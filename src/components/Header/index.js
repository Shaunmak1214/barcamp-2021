import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Image } from '@chakra-ui/image';
import {
  Center,
  Container,
  HStack,
  Link,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { PrimaryButton } from '../Buttons';
import { BarcampFullLogo, PlatinumIcon, DownIcon } from '../../assets/';
import MobileMenu from './MobileMenu';

import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';

const Index = ({ cta, type }) => {
  const headerSticky = useRef(null);
  const sponsorHover = useRef(null);
  const moreHover = useRef(null);
  const joinButton = useRef(null);
  const mobileSize = window.screen.width <= 768;

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
        <VStack alignItems="flex-start" justifyContent="center">
          <HStack>
            <Image src={PlatinumIcon} height="15px" width="15px" />
            <Text fontFamily="Poppins" fontSize="lg" fontWeight="600">
              {sponsorData.type}
            </Text>
          </HStack>
          <SimpleGrid
            columns={sponsorData.level}
            spacing={5}
            w="100%"
            flexDir="row"
            flexWrap="wrap"
          >
            {sponsorData.sponsors.map((sponsor, idx) => {
              return (
                <Center key={idx} p={3} borderRadius="4px" bg="#F5F5F5">
                  <Image src={sponsor.imageSrc} w="100%" h="100%" />
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
            src={BarcampFullLogo}
            alt="Logo"
          />
          <MobileMenu />
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
            <Link
              href="#"
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
                w="150px"
                bg="rgba(255, 255, 255, 0.98)"
                boxShadow="0px 16px 40px rgba(165, 165, 165, 0.25)"
                py="4"
                px="2"
                borderRadius="4px"
                transition="visibility 0.2s ease-in-out, opacity 0.2s ease-in-out"
                zIndex="50"
                cursor="pointer"
              >
                <Link href="/dashboard" py="3">
                  <Text fontSize="sm">Dashboard</Text>
                </Link>
                <Link href="/vote-topic" py="3">
                  <Text fontSize="sm">Vote Topics</Text>
                </Link>
                <Link href="/propose-topic" py="3">
                  <Text fontSize="sm">Propose Topic</Text>
                </Link>
              </VStack>
            </Link>

            {/* Join us now condition rendering */}
            {cta && (
              <PrimaryButton
                ref={joinButton}
                d="none"
                transform="scaleX(0)"
                py="20px"
                fontFamily="Source Sans Pro"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Join us now
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
                <Image src={BarcampFullLogo} />
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
