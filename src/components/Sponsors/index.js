import React from 'react';
import { Container, Center } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';

import { SectionTitle } from '../SectionTitle';
import { SponsorBlockRenderer } from '../Sponsors/utils';
import BCSpacer from '../Spacer';
import {
  platinumSponsor,
  goldSponsor,
  silverSponsor,
} from '../../datas/sponsors';
import { SponsorshipProposal } from '../../assets';

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
          <Link
            variant="secondary"
            bg="#1050A0"
            borderRadius="4px"
            px="12"
            py="12px"
            h="100%"
            color="white"
            fontWeight="600"
            href={SponsorshipProposal}
            target="_blank"
            rel="noreferrer"
          >
            Become a sponsor
          </Link>
        </Center>
        <BCSpacer />
      </Container>
    </Center>
  );
};

export default Index;
