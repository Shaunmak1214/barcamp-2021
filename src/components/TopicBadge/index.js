import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/layout';

const TopicBadge = ({ topic }) => {
  return (
    <Flex
      align="center"
      justify="center"
      borderRadius="4px"
      bg="#C9E1FF"
      color="gray.800"
      py={'3px'}
      px={'12px'}
      fontSize="xs"
      fontWeight="500"
      textTransform="uppercase"
    >
      {topic}
    </Flex>
  );
};

TopicBadge.propTypes = {
  topic: PropTypes.string,
};

export default TopicBadge;
