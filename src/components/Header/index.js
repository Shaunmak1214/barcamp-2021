import React, { useState, useEffect, useRef } from 'react';

import { Image } from '@chakra-ui/image';
import { Center, Container, HStack, Link } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { PrimaryButton } from '../Buttons';

import { BarcampFullLogo } from '../../assets/';

const Index = () => {
  const sponsorHover = useRef(null);

  const [scroll, setScroll] = useState(window.scrollY);
  const [sticky, setSticky] = useState(false);

  const handleScroll = (e) => {
    const window = e.currentTarget;
    setScroll(window.scrollY);
    if (scroll > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const sponsorToggle = () => {
    if (sponsorHover.current) {
      sponsorHover.current.classList.toggle('is-active');
    }
  };

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
      py="15px"
      transition="background-color 0.2s linear"
      bgColor={sticky ? 'white' : 'none'}
    >
      <Container maxW="container.xl">
        <HStack w="100%" justifyContent="space-between">
          <Image width="250px" height="auto" src={BarcampFullLogo} alt="Logo" />
          <HStack
            className="navbar"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="8px"
            py="10px"
            px="25px"
            spacing="45"
          >
            <Link href="/">
              <Text fontSize="14px">AGENDA</Text>
            </Link>
            <Link href="/">
              <Text fontSize="14px">FAQ</Text>
            </Link>
            <Link href="/" onMouseOver={sponsorToggle}>
              <Text fontSize="14px">SPONSORS</Text>
            </Link>
            <PrimaryButton px="7">JOIN US NOW</PrimaryButton>
          </HStack>
        </HStack>
      </Container>
    </Center>
  );
};

export default Index;
