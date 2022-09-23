import { BarCampFullLogo, DerivLogo, AuronexLogo } from '../assets';

const platinumSponsor = {
  type: 'Platinum',
  level: 3,
  sponsors: [
    {
      idx: 0,
      imageSrc: DerivLogo,
      link: 'https://deriv.com/',
    },
    {
      idx: 1,
      imageSrc: AuronexLogo,
      link: 'https://auronex.com/',
    },
  ],
};

const goldSponsor = {
  type: 'Gold',
  level: 4,
  sponsors: [
    {
      idx: 0,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 2,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 3,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 4,
      imageSrc: BarCampFullLogo,
    },
  ],
};

const silverSponsor = {
  type: 'Silver',
  level: 5,
  sponsors: [
    {
      idx: 0,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 2,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 3,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 4,
      imageSrc: BarCampFullLogo,
    },
    {
      idx: 5,
      imageSrc: BarCampFullLogo,
    },
  ],
};

export { platinumSponsor, goldSponsor, silverSponsor };
