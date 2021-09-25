import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { HStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { ReturnIconBlue, ReturnIconWhite } from 'assets';

const PrimaryButton = React.forwardRef((props, ref) => (
  <Button
    bg="linear-gradient(90deg, #A23052 0%, #EB202B 100%)"
    borderRadius="4px"
    px="10"
    py="20px"
    {...props}
    ref={ref}
  >
    <Text as="h2" fontSize="md" color="white">
      {props.children}
    </Text>
  </Button>
));

const SecondaryButton = ({ ...props }) => {
  let children = props.children;
  return (
    <Button
      variant="secondary"
      bg="#1050A0"
      borderRadius="4px"
      px="10"
      py="20px"
      {...props}
    >
      <Text as="h2" fontSize="md" color="white">
        {children}
      </Text>
    </Button>
  );
};

const RegisterButton = ({ ...props }) => {
  return (
    <Button
      variant="register"
      boxShadow="0px 16px 40px rgba(80, 157, 253, 0.25);"
      bg="linear-gradient(90deg, #A23052 0%, #EB202B 100%)"
      borderRadius="4px"
      py="25px"
      px="10"
      {...props}
    >
      <Text as="h2" fontSize="md" color="white">
        Register Now
      </Text>
    </Button>
  );
};

const RevertButton = ({ onOpen, ...props }) => {
  const children = props.children;

  let imgRef = useRef(null);
  return (
    <Button
      variant="outlined"
      border="1px solid #1050A0"
      minW="240px"
      borderRadius="7px"
      px="5"
      py="20px"
      onClick={onOpen}
      _hover={{ bg: '#1050A0', color: '#FFFFFF' }}
      onMouseEnter={() => {
        imgRef.current.src = ReturnIconWhite;
      }}
      onMouseLeave={() => {
        imgRef.current.src = ReturnIconBlue;
      }}
      {...props}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        _hover={{ color: '#FFFFFF' }}
      >
        <Text as="h2" fontSize="16px">
          {children}
        </Text>
        <Image ref={imgRef} src={ReturnIconBlue} />
      </HStack>
    </Button>
  );
};

const FaqButton = ({ selected, ...props }) => {
  let textRef = useRef(null);
  let children = props.children;
  return (
    <Button
      variant="outlined"
      bg={selected ? '#1050A0' : 'none'}
      border="1px solid #1050A0"
      borderRadius="50px"
      onMouseOver={() => {
        if (selected) return;
        textRef.current.style.color = '#FFFFFF';
      }}
      onMouseLeave={() => {
        if (selected) return;
        textRef.current.style.color = '#1050A0';
      }}
      {...props}
    >
      <Text
        ref={textRef}
        as="h2"
        fontSize="16px"
        color={selected ? 'white' : '#1050A0'}
      >
        {children}
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

RevertButton.propTypes = {
  onOpen: PropTypes.func,

  children: PropTypes.node.isRequired,
};

RegisterButton.propTypes = {
  children: PropTypes.node,
};

FaqButton.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

export {
  PrimaryButton,
  SecondaryButton,
  FaqButton,
  RegisterButton,
  RevertButton,
};
