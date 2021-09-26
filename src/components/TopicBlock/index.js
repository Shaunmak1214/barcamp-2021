import React from 'react';
import PropTypes from 'prop-types';

import { VStack, HStack, Text, Box, Flex, Center } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

import TopicBadge from './../TopicBadge';

import {
  ChampionIcon,
  SilverIcon,
  BronzeIcon,
  SpeakerIcon,
} from '../../assets';

const TopicBlock = ({
  rounded,
  topic,
  speaker,
  // lead,
  themeIcon,
  count,
  leaderboard,
}) => {
  if (!topic || !topic.user) {
    return null;
  }

  const icon = themeIcon ? themeIcon : topic.user.picture;

  const MedalRenderer = ({ medal }) => {
    switch (medal) {
      case 0:
        return <Image h="80px" w="80px" src={ChampionIcon} alt="champion" />;

      case 1:
        return <Image h="80px" w="80px" src={SilverIcon} alt="silver" />;

      case 2:
        return <Image h="80px" w="80px" src={BronzeIcon} alt="bronze" />;
      default:
        return <> </>;
    }
  };

  MedalRenderer.propTypes = {
    medal: PropTypes.number,
  };

  return (
    <HStack
      w="100%"
      p="10px 25px"
      border="1px solid #E9E9E9;"
      borderRadius="8px"
      mb="10px"
      mt="0"
      transition="all 0.1s ease-in-out"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="0px 16px 40px rgba(195, 195, 195, 0.05)"
    >
      <Box width="100%">
        <HStack spacing={[0, 0, 7]} py="0.3em" px={['0rem', '0rem', '0.5em']}>
          <Image
            src={icon}
            borderRadius={rounded ? '50%' : '0'}
            d={['none', 'none', 'flex']}
            h="52px"
            w="52px"
          />
          <VStack align="flex-start" w="100%" wordBreak="break-all">
            <Flex
              justifyContent="flex-start"
              w={['100%', '50%', '95%']}
              flexDir={['column', 'column', 'row']}
              mb="10px"
            >
              <TopicBadge topic={topic.theme} />
              <Center
                ml={[0, 0, '10px']}
                mt={['10px', '10px', 0]}
                borderRadius="8px"
                border="1px solid #e9e9e9"
                px="3"
              >
                <Image src={SpeakerIcon} mr="5px" height="10px" width="auto" />
                <Text fontSize="sm" color="#797979">
                  {speaker.fullName}
                </Text>
              </Center>
            </Flex>
            <Text
              as="h3"
              fontSize="md"
              fontFamily="Montserrat"
              fontWeight="600"
              wordBreak="break-word"
            >
              {topic.name}
            </Text>
            <Text as="h6" fontSize="sm" fontWeight="500" wordBreak="break-word">
              {topic.description}
            </Text>
          </VStack>
        </HStack>
      </Box>

      {leaderboard && (
        <VStack spacing={0} h="100%" px="5">
          <Text className="gradientText" style={{ fontSize: '35px' }}>
            {count}
          </Text>
          <Text textAlign="center" fontSize="sm">
            {count <= 1 ? 'vote' : 'votes'}
          </Text>
        </VStack>
      )}
    </HStack>
  );
};

TopicBlock.propTypes = {
  idx: PropTypes.number,
  rounded: PropTypes.bool,
  topic: PropTypes.object,
  speaker: PropTypes.object,
  themeIcon: PropTypes.any,
  count: PropTypes.number,
  leaderboard: PropTypes.bool,
  lead: PropTypes.number,
};

export default TopicBlock;
