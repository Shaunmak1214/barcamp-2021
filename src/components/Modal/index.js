import React from 'react';
import PropTypes from 'prop-types';

import { VStack, Box, Text } from '@chakra-ui/layout';
import { IconButton, Image } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import BCSpacer from 'components/Spacer';
import { PrimaryButton } from 'components/Buttons';

import './modal.css';

const Modal = ({ successUrl, modalOpen, onClose }) => {
  const handleClose = () => {
    onClose();
    window.location.href = successUrl;
  };

  if (!modalOpen) return null;

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        w="100wh"
        h="100vh"
        backgroundColor="rgba(0,0,0,0.5)"
        zIndex="100"
        onClick={handleClose}
      ></Box>
      <VStack
        className="modal"
        position="fixed"
        left="50%"
        top="50%"
        maxWidth="500px"
        transform="translate(-50%, -50%)"
        spacing={5}
        alignItems="center"
        boxShadow="0px 16px 40px rgba(129, 129, 129, 0.25)"
        background="#fff"
        borderRadius="10px"
        padding="40px 40px"
        zIndex="150"
      >
        <Box
          d="flex"
          position="absolute"
          top="30px"
          right="30px"
          justifyContent="flex-end"
          onClick={handleClose}
        >
          <IconButton
            variant="ghost"
            aria-label="Close modal"
            icon={<CloseIcon w="12px" h="12px" />}
          />
        </Box>

        <BCSpacer size="3xs" />

        <Image
          src={
            'https://res.cloudinary.com/shaun-storage/image/upload/v1631240228/complete_vdkvie.gif'
          }
          h="125"
          w="125"
        />

        <Text as="h3" fontSize="xl" fontFamily="Montserrat" fontWeight="600">
          Thank you for voting your desired topic!{' '}
        </Text>
        <Text
          as="h3"
          fontSize="sm"
          fontFamily="Montserrat"
          fontWeight="400"
          textAlign="center"
          px="3"
        >
          Final voting result will be announced soon on 28 September 2021. Let’s
          meet at Barcamp on 2 October 2021.
        </Text>

        <BCSpacer size="4xs" />

        <PrimaryButton py="20px" px="85px" onClick={handleClose}>
          Close
        </PrimaryButton>
      </VStack>
    </>
  );
};

Modal.propTypes = {
  successUrl: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
