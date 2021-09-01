import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const PrimaryButton = ({ ...props }) => {
  let children = props.children;
  return (
    <Button bg="#EB202B" {...props}>
      <Text as="h2" fontSize="16px" color="white">
        {children}
      </Text>
    </Button>
  );
};

const SecondaryButton = ({ ...props }) => {
  let children = props.children;
  return (
    <Button
      variant="secondary"
      bg="#1050A0"
      boxShadow="0px 16px 40px rgba(80, 157, 253, 0.25);"
      {...props}
    >
      <Text as="h2" fontSize="16px" color="white">
        {children}
      </Text>
    </Button>
  );
};

const RegisterButton = ({ ...props }) => {
  console.log('redner');
  return (
    <Button
      variant="register"
      boxShadow="0px 16px 40px rgba(80, 157, 253, 0.25);"
      bg="linear-gradient(90deg, #A23052 0%, #EB202B 100%)"
      borderRadius="8px"
      py="25px"
      px="10"
      {...props}
    >
      <Text as="h2" fontSize="18px" color="white">
        Register Now
      </Text>
    </Button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

RegisterButton.propTypes = {
  children: PropTypes.node,
};

export { PrimaryButton, SecondaryButton, RegisterButton };
