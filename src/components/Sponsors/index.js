import React from 'react';
import { Container, Center } from '@chakra-ui/layout';

import { SectionTitle } from '../SectionTitle';
import { PrimaryButton } from '../Buttons';
import { SponsorBlockRenderer } from '../Sponsors/utils';
import BCSpacer from '../Spacer';
import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';

const Index = () => {
  return (
    <Center pt="80px" flexDir="column">
      <Container maxW="container.xl" pt="20">
        <SectionTitle type="center" mb="20">
          SPONSORSHIP & PARTNERS
        </SectionTitle>
        <SponsorBlockRenderer mb="20" sponsorData={platinumSponsor} />
        <SponsorBlockRenderer mb="20" sponsorData={goldSponsor} />
        <SponsorBlockRenderer sponsorData={silverSponsor} />
        <BCSpacer size="sm" />
        <Center w="100%">
          <PrimaryButton px="70px" py="25px">
            Become a sponsor
          </PrimaryButton>
        </Center>
        <BCSpacer />
      </Container>
    </Center>
  );
};

export default Index;
