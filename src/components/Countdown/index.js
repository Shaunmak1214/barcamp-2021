import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CountDownBlock = ({ ...props }) => {
  let children = props.children;
  return (
    <Box
      border="3px solid #C5DFFF"
      boxShadow="0px 16px 40px rgba(204, 204, 204, 0.25)"
      borderRadius="8px"
      width="215px"
      height="170px"
      d="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      zIndex="3"
      {...props}
    >
      <Text>{children}</Text>
    </Box>
  );
};

CountDownBlock.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
};

export { CountDownBlock };
