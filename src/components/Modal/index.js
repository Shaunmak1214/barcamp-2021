import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import { VStack, Box, Flex } from '@chakra-ui/layout';
import { IconButton, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import BCSpacer from 'components/Spacer';
import {
  PrimaryButton,
  SecondaryButton,
  MutedButton,
} from 'components/Buttons';

import { CompleteLoader, ErrorLoader, TrashBin } from '../../constants';
import Loader from '../Loader';
import './modal.css';

const Modal = ({
  theme,
  successUrl,
  content,
  modalOpen,
  onClose,
  dialog,
  onDeleteVotes,
  loading,
}) => {
  let animationData;
  const handleClose = () => {
    onClose();
    if (successUrl) {
      window.location.href = successUrl;
    }
  };
  let animationLoader = true;
  if (theme === 'sucess') {
    animationData = CompleteLoader;
  } else if (theme === 'error') {
    animationData = ErrorLoader;
  } else if (theme === 'normal') {
    animationLoader = false;
  } else {
    animationData = CompleteLoader;
  }

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

        {animationLoader ? (
          <Lottie options={animationData} height={200} width={200} />
        ) : (
          <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            w={['200px', '200px', '350px']}
          >
            <Lottie options={TrashBin} height={150} width={370} />
          </Box>
        )}

        {content}

        <BCSpacer size="4xs" />
        {dialog ? (
          <>
            <Flex
              justifyContent="space-between"
              flexDir={['column-reverse', 'column-reverse', 'row']}
            >
              <MutedButton
                mr={[0, 0, '15px']}
                bg="#c4c4c4"
                _hover={{ bg: '#000000' }}
                onClick={handleClose}
              >
                Close
              </MutedButton>

              <SecondaryButton
                onClick={() => onDeleteVotes()}
                disabled={loading}
                mb={['10px', 0, 0]}
                cursor={loading ? 'not-allowed' : 'pointer'}
                _hover={{ bg: '#00234F' }}
              >
                {loading ? (
                  <Loader type="" size="md" />
                ) : (
                  <Text>Revert Votes</Text>
                )}
              </SecondaryButton>
            </Flex>
          </>
        ) : (
          <PrimaryButton py="20px" px="85px" onClick={handleClose}>
            Close
          </PrimaryButton>
        )}
      </VStack>
    </>
  );
};

Modal.propTypes = {
  theme: PropTypes.string,
  successUrl: PropTypes.string,
  content: PropTypes.node,
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dialog: PropTypes.bool,
  onDeleteVotes: PropTypes.func,
  loading: PropTypes.bool,
};

export default Modal;
