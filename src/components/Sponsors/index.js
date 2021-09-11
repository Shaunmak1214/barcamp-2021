import React from 'react';
import { Container, Center } from '@chakra-ui/layout';

import { SectionTitle } from '../SectionTitle';
import { SecondaryButton } from '../Buttons';
import { SponsorBlockRenderer } from '../Sponsors/utils';
import BCSpacer from '../Spacer';
import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';

const Index = ({ ...props }) => {
  return (
    <Center {...props} pt="80px" flexDir="column">
      <Container maxW="container.xl" pt="20">
        <SectionTitle type={['left', 'center', 'center']} mb="20">
          SPONSORSHIP
        </SectionTitle>
        <SponsorBlockRenderer mb="20" sponsorData={platinumSponsor} />
        <SponsorBlockRenderer mb="20" sponsorData={goldSponsor} />
        <SponsorBlockRenderer sponsorData={silverSponsor} />
        <BCSpacer size="sm" />
        <Center w="100%">
          <SecondaryButton px="70px" py="25px">
            Become a sponsor
          </SecondaryButton>
        </Center>
        <BCSpacer />
      </Container>
    </Center>
  );
};

export default Index;
