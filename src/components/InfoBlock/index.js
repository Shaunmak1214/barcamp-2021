import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@chakra-ui/image';
import { HStack, Box, Flex, VStack, Center } from '@chakra-ui/layout';
import { PrimaryButton } from '../../components/Buttons';

import { LinearBorder } from '../../assets';
import BCSpacer from 'components/Spacer';

const InfoBlock = ({ buttonUrl, buttonLabel, theme, content, leadingIcon }) => {
  let border = 'none';

  if (theme === 'error') {
    border = '3px solid #EB202B';
  }

  return (
    <VStack
      justifyContent="center"
      alignItems="flex-start"
      mb="10px"
      mt="50px"
      p={['25px', '30px 45px 30px 80px']}
      w="90%"
      border={border}
      borderRadius="10px"
      borderWidth="3px"
      borderStyle="solid"
      {...(border === 'none' && {
        style: {
          borderImage: `url(${LinearBorder})`,
          borderImageSlice: 7,
          borderImageWidth: '6px',
          borderImageOutset: 1,
        },
      })}
    >
      <HStack alignItems="center">
        {leadingIcon && <Image src={leadingIcon} mb={['35px', '0']} />}

        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Box w="100%" p={['0', '0 50px']}>
            {content}
          </Box>
          {buttonUrl && <BCSpacer size="sm" />}
        </Flex>
      </HStack>

      <Center w="100%">
        {buttonUrl && (
          <>
            <PrimaryButton
              w="200px"
              onClick={() => {
                window.location.href = buttonUrl;
              }}
            >
              {buttonLabel}
            </PrimaryButton>
          </>
        )}
      </Center>
    </VStack>
  );
};

InfoBlock.propTypes = {
  type: PropTypes.string,
  buttonUrl: PropTypes.string,
  buttonLabel: PropTypes.string,
  theme: PropTypes.string,
  content: PropTypes.object,
  leadingIcon: PropTypes.any,
};

export default InfoBlock;
