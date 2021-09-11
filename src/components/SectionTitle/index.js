import React from 'react';
import { Heading } from '@chakra-ui/react';
import { VStack, Box } from '@chakra-ui/layout';
import PropTypes from 'prop-types';

const SectionTitle = ({ type, ...props }) => {
  let children = props.children;
  if (type === 'left') {
    return (
      <Heading
        d="flex"
        justifyContent="flex-start"
        position="relative"
        {...props}
      >
        {children}
        <Box
          position="absolute"
          bottom="-8px"
          left="0px"
          h="3px"
          w="90px"
          bg="linear-gradient(90deg, #5BA4FF 0%, #FF5E66 100%)"
          style={{ content: ' ' }}
        ></Box>
      </Heading>
    );
  } else if (type === 'center') {
    return (
      <VStack>
        <Heading
          d="flex"
          justifyContent="center"
          position="relative"
          {...props}
        >
          {children}
          <Box
            position="absolute"
            bottom="-15px"
            h="3px"
            w="90px"
            bg="linear-gradient(90deg, #5BA4FF 0%, #FF5E66 100%)"
            style={{ content: ' ' }}
          ></Box>
        </Heading>
      </VStack>
    );
  } else {
    return (
      <VStack>
        <Heading
          d="flex"
          justifyContent="center"
          position="relative"
          {...props}
        >
          {children}
          <Box
            position="absolute"
            bottom="-5px"
            h="3px"
            w="90px"
            bg="linear-gradient(90deg, #5BA4FF 0%, #FF5E66 100%)"
            style={{ content: ' ' }}
          ></Box>
        </Heading>
      </VStack>
    );
  }
};

SectionTitle.propTypes = {
  children: PropTypes.node,
  type: PropTypes.any,
};

export { SectionTitle };
