import React from 'react';
import PropTypes from 'prop-types';

import { VStack, HStack, Text, Box, Flex } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

import TopicBadge from './../TopicBadge';

import { ChampionIcon, SilverIcon, BronzeIcon } from '../../assets';

const TopicBlock = ({
  rounded,
  topic,
  lead,
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
      p="15px 25px"
      border="1px solid #E9E9E9;"
      borderRadius="8px"
      mb="2"
      mt="15px"
      cursor="pointer"
      transition="all 0.1s ease-in-out"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="0px 16px 40px rgba(195, 195, 195, 0.25)"
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
              justifyContent="space-between"
              w={['50%', '50%', '95%']}
              flexDir={['column', 'column', 'row']}
            >
              <TopicBadge topic={topic.theme} />
            </Flex>
            <Text
              as="h3"
              fontSize="md"
              fontFamily="Montserrat"
              fontWeight="600"
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
        <VStack spacing={3}>
          <MedalRenderer medal={lead} />
          <Box background="#f5f5f5" borderRadius="8px" p="10px">
            <Text width="50px" textAlign="center" fontSize="sm">
              <span className="gradientText">{count}</span>{' '}
              {count <= 1 ? 'vote' : 'votes'}
            </Text>
          </Box>
        </VStack>
      )}
    </HStack>
  );
};

TopicBlock.propTypes = {
  idx: PropTypes.number,
  rounded: PropTypes.bool,
  topic: PropTypes.object,
  themeIcon: PropTypes.any,
  count: PropTypes.number,
  leaderboard: PropTypes.bool,
  lead: PropTypes.number,
};

export default TopicBlock;
