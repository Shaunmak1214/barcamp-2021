import { Box } from '@chakra-ui/layout';
import React from 'react';
import PropTypes from 'prop-types';

const BCSpacer = ({ size }) => {
  if (size === '5xs') {
    return <Box height="3px" width="100%"></Box>;
  } else if (size === '4xs') {
    return <Box height="10px" width="100%"></Box>;
  } else if (size === '3xs') {
    return <Box height="20px" width="100%"></Box>;
  } else if (size === '2xs') {
    return <Box height="30px" width="100%"></Box>;
  } else if (size === 'xs') {
    return <Box height="40px" width="100%"></Box>;
  } else if (size === 'sm') {
    return <Box height="50px" width="100%"></Box>;
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
