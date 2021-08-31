import { Image } from '@chakra-ui/image';
import {
  Container,
  HStack,
  VStack,
  Center,
  Box,
  Flex,
} from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';

import { SecondaryButton } from '../components/Buttons';
import BCSpacer from '../components/Spacer';
import { SectionTitle } from '../components/SectionTitle';

import {
  BarcampLandingImg,
  ShareIcon,
  IconContainer,
  TrainingIcon,
  LightIcon,
  SectionBg,
  SamplePic,
} from '../assets';

const Index = () => {
  return (
    <>
      <HStack
        position="relative"
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image position="absolute" src={BarcampLandingImg} w="100%" h="100%" />
        <Container maxW="container.xl">
          <VStack w="35%" alignItems="flex-start">
            <Text fontSize="35px">
              We bring people together to share their passion around technology.
            </Text>
            <BCSpacer size="sm" />
            <SecondaryButton py="7" px="10">
              Join Us Now
            </SecondaryButton>
          </VStack>
        </Container>
      </HStack>
      {/* What is Barcamp section */}
      <Center py="20" bgImage={SectionBg} flexDir="column">
        <Container maxW="container.xl">
          <SectionTitle type={'center'} color="#ffffff" alignItems="flex-start">
            What is Barcamp?
          </SectionTitle>
        </Container>
        <Container
          maxW="container.lg"
          py="70px"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#ffffff" textAlign="center" fontSize={['18px', '25px']}>
            Barcamp Cyberjaya is an annual user-generated unconference with
            topics surrounding technology and entrepreneurships.
          </Text>
        </Container>
        <Container maxW="container.md" pt="25px">
          <Flex
            flexDir={['column', 'column', 'row']}
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack mb="35px">
              <Box p="35px" borderRadous="5px" bgImage={IconContainer}>
                <Image src={ShareIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Share
              </Text>
            </VStack>
            <VStack mb="35px">
              <Box p="35px" borderRadius="5px" bgImage={IconContainer}>
                <Image src={TrainingIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Learn
              </Text>
            </VStack>
            <VStack mb="35px">
              <Box p="35px" borderRadius="5px" bgImage={IconContainer}>
                <Image src={LightIcon} />
              </Box>
              <Text pt="12px" color="#ffffff">
                Inspire
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Center>
      <Center bgColor="white">
        <Box>awsdfa</Box>
      </Center>
      {/* Gallery Section */}
      <Center pt="80px" bgImage={SectionBg} flexDir="column">
        <Container pb="50px" maxW="container.xl">
          <SectionTitle color="#ffffff">GALLERY</SectionTitle>
        </Container>
        <Container maxW="container.xl">
          <Flex
            flexDir={['column', 'column', 'row']}
            alignItems="center"
            justifyContent="space-between"
            py="50px"
          >
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
          </Flex>
          <Flex
            flexDir={['column', 'column', 'row']}
            alignItems="center"
            justifyContent="space-between"
            pb="90px"
          >
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
            <Box w={['100%', '50%', '75%']} mb={['25px', '0']}>
              <Image src={SamplePic} />
            </Box>
          </Flex>
        </Container>
      </Center>
    </>
  );
};

export default Index;
