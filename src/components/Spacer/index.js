import { Box } from '@chakra-ui/layout';
import React from 'react';
import PropTypes from 'prop-types';

const BCSpacer = ({ size }) => {
  if (size === 'sm') {
    return <Box height="40px" width="100%"></Box>;
  } else if (size === 'md') {
    return <Box height="60px" width="100%"></Box>;
  } else {
    return <Box height="125px" width="100%"></Box>;
  }
};

BCSpacer.propTypes = {
  size: PropTypes.string,
};

export default BCSpacer;
