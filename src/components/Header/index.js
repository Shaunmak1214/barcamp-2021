import React, { useEffect, useRef } from 'react';

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

import PropTypes from 'prop-types';

import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';
import { PrimaryButton } from '../Buttons';
import { BarcampFullLogo, PlatinumIcon } from '../../assets/';

const Index = () => {
  const sponsorHover = useRef(null);
  const headerSticky = useRef(null);

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

  const stickyToggle = (status) => {
    if (status) {
      headerSticky.current.style.top = '0px';
      headerSticky.current.style.background = 'white';
    } else {
      headerSticky.current.style.top = '15px';
      headerSticky.current.style.background = 'none';
    }
  };

  const SponsorBlockRenderer = ({ sponsorData }) => {
    if (sponsorData) {
      return (
        <VStack alignItems="flex-start" justifyContent="center">
          <HStack>
            <Image src={PlatinumIcon} height="15px" width="15px" />
            <Text fontFamily="Poppins" fontSize="18px" fontWeight="600">
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
                  <Image src={sponsor.imageSrc} />
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
      position="fixed"
      zIndex="50"
      w="100%"
      py="5px"
      top="15px"
      transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
      ref={headerSticky}
    >
      <Container maxW="container.xl">
        <HStack w="100%" justifyContent="space-between">
          <Image width="250px" height="auto" src={BarcampFullLogo} alt="Logo" />
          <HStack
            d={['none', 'none', 'flex']}
            className="navbar"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="8px"
            px="25px"
            spacing="45"
            position="relative"
          >
            <Link href="/" py="6">
              <Text fontSize="14px">AGENDA</Text>
            </Link>
            <Link href="/" py="6">
              <Text fontSize="14px">FAQ</Text>
            </Link>
            <Link
              href="/"
              py="6"
              onMouseOver={() => {
                sponsorToggle('in');
              }}
              onMouseLeave={() => {
                sponsorToggle('out');
              }}
            >
              <Text fontSize="14px">SPONSORS</Text>
            </Link>
            <PrimaryButton px="10" borderRadius="8px">
              Join us now
            </PrimaryButton>

            <HStack
              ref={sponsorHover}
              visibility="hidden"
              opacity="0"
              className="sponsor-hover"
              position="absolute"
              top="80px"
              right="0px"
              w="container.xl"
              bg="rgba(255, 255, 255, 0.98)"
              boxShadow="0px 16px 40px rgba(165, 165, 165, 0.25)"
              p="8"
              borderRadius="15px"
              transition="visibility 0.2s ease-in-out, opacity 0.2s ease-in-out"
              zIndex="50"
              cursor="pointer"
              // overflow="scroll"
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

React.memo(Index);

export default Index;
