import { HStack, Link, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';

import { DiscordOutlinedIcon } from '../../assets';

const Index = () => {
  return (
    <HStack position="fixed" bottom="20px" right="20px" zIndex="1001">
      <Link
        _hover={{ bg: 'black' }}
        bg="#5865F2"
        px="5"
        py="2"
        borderRadius="50px"
        color="white"
        d="flex"
        flexDir="row"
        alignItems="center"
        onClick={() => {
          window.open('https://discord.gg/AzCmaWd3jq', '_blank');
        }}
      >
        <Image
          src={DiscordOutlinedIcon}
          h="25px"
          w="25px"
          mr="10px"
          alt="Discord icon"
        />{' '}
        <Text fontFamily="Montserrat" fontSize="15px">
          Join our discord
        </Text>
      </Link>
    </HStack>
  );
};

export default Index;
