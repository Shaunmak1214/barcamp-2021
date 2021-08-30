import React from 'react';
import { Heading } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/layout';
import PropTypes from 'prop-types';

const SectionTitle = ({ ...props }) => {
  let children = props.children;
  return (
    <HStack borderBottom="1px solid linear-gradient(90deg, #5BA4FF 0%, #FF5E66 100%); ">
      <Heading size="4x1" {...props}>
        {children}
      </Heading>
    </HStack>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node,
};

export { SectionTitle };
