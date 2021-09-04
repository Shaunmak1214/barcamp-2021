import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@chakra-ui/image';
import { Center, SimpleGrid, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { GoldBadge, PlatinumBadge, SilverBadge } from '../../assets/';

const SponsorBlockRenderer = ({ sponsorData, ...props }) => {
  const BadgeRender = ({ sponsorData }) => {
    switch (sponsorData.type) {
      case 'Platinum':
        return (
          <Center mb="10" w="100%">
            <Image src={PlatinumBadge} height="auto" width="285px" />
          </Center>
        );
      case 'Gold':
        return (
          <Center mb="10" w="100%">
            <Image src={GoldBadge} height="auto" width="285px" />
          </Center>
        );
      case 'Silver':
        return (
          <Center mb="10" w="100%">
            <Image src={SilverBadge} height="auto" width="285px" />
          </Center>
        );
      default:
        break;
    }
  };

  if (sponsorData) {
    return (
      <VStack alignItems="flex-start" justifyContent="center" {...props}>
        <BadgeRender sponsorData={sponsorData} />
        <SimpleGrid
          columns={[`2`, `3`, `${sponsorData.level}`]}
          spacing={5}
          px={['5', null, null]}
          w="100%"
          flexDir="row"
          flexWrap="wrap"
        >
          {sponsorData.sponsors.map((sponsor, idx) => {
            return (
              <Center key={idx} p={3} borderRadius="4px" bg="#F5F5F5">
                <Image src={sponsor.imageSrc} />
              </Center>
            );
          })}
        </SimpleGrid>
      </VStack>
    );
  } else {
    return <Text>No Data</Text>;
  }
};

SponsorBlockRenderer.propTypes = {
  sponsorData: PropTypes.any,
};

React.memo(SponsorBlockRenderer);

export { SponsorBlockRenderer };
