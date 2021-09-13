import { Center, Container, SimpleGrid, Box } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { SectionTitle } from '../SectionTitle';
import { FaqButton } from '../Buttons';
import BCSpacer from '../Spacer';

const Index = ({ ...props }) => {
  const [selectedCat, setSelectedCat] = useState('general');

  const handleFaqSelect = useCallback(
    (selectedCat) => {
      setSelectedCat(selectedCat);
    },
    [setSelectedCat],
  );

  const FaqCategories = [
    {
      idx: 0,
      identifier: 'all',
      title: 'All',
    },
    {
      idx: 1,
      identifier: 'general',
      title: 'General',
    },
    {
      idx: 2,
      identifier: 'registration',
      title: 'Registration',
    },
    {
      idx: 3,
      identifier: 'discordServer',
      title: 'Discord Server',
    },
  ];

  const FaqItemsByCat = {
    all: [
      {
        idx: 0,
        title: 'What do I have to prepare for this event?',
        content:
          'The first thing you need to do is to create an account for Gather Town, and familiarize yourself with the features of the platform before the event day itself to ensure a smooth session. Secondly, do join this event with the intent of sharing your knowledge with others <3.',
      },
      {
        idx: 1,
        title: 'Do I have to open my camera and microphone?',
        content:
          'Throughout the event, you do not have to turn on your camera and microphone unless you are voted as a speaker based on the topic that you have proposed. ',
      },
      {
        idx: 2,
        title: 'I am not added into the WhatsApp Group. What should I do?',
        content:
          'In the event that we do not manage to add you into our WhatsApp Group, you may join the group with the link inside our Event Handbook. You could find it from the dashboard after log in yourself as a participant. ',
      },
      {
        idx: 3,
        title: 'How will I be able to retrieve my prizes?',
        content:
          'The organising committee will message the respective parties for further contact.',
      },
      {
        idx: 4,
        title: 'Is this free?',
        content: 'Yes, it is free. We do not collect any fees for this event!',
      },
      {
        idx: 5,
        title: 'How do I register as a participant?',
        content:
          'Click the "Join Us Now" button in this website and log in with your Google account. ',
      },
      {
        idx: 6,
        title: 'Why do I have to join the Discord server?',
        content:
          'For BarCamp Cyberjaya 2021, we will be using a Discord server as our main channel to upload our event announcements and materials to participants, as well as encouraging participants to communicate with each other and get familiar with this social platform.',
      },
      {
        idx: 7,
        title: 'What can I do inside the Discord Server?',
        content:
          'You can chat and also meet up with anyone inside the Discord Server! Make yourself at home and make some new friends too! Just make sure to follow our Discord Server Rules so that everyone can have a pleasant experience.',
      },
    ],
    general: [
      {
        idx: 0,
        title: 'What do I have to prepare for this event?',
        content:
          'The first thing you need to do is to create an account for Gather Town, and familiarize yourself with the features of the platform before the event day itself to ensure a smooth session. Secondly, do join this event with the intent of sharing your knowledge with others <3.',
      },
      {
        idx: 1,
        title: 'Do I have to open my camera and microphone?',
        content:
          'Throughout the event, you do not have to turn on your camera and microphone unless you are voted as a speaker based on the topic that you have proposed. ',
      },
      {
        idx: 2,
        title: 'I am not added into the WhatsApp Group. What should I do?',
        content:
          'In the event that we do not manage to add you into our WhatsApp Group, you may join the group with the link inside our Event Handbook. You could find it from the dashboard after log in yourself as a participant. ',
      },
      {
        idx: 3,
        title: 'How will I be able to retrieve my prizes?',
        content:
          'The organising committee will message the respective parties for further contact.',
      },
    ],
    registration: [
      {
        idx: 0,
        title: 'Is this free?',
        content: 'Yes, it is free. We do not collect any fees for this event!',
      },
      {
        idx: 1,
        title: 'How do I register as a participant?',
        content:
          'Click the "Join Us Now" button in this website and log in with your Google account. ',
      },
    ],
    discordServer: [
      {
        idx: 0,
        title: 'Why do I have to join the Discord server?',
        content:
          'For BarCamp Cyberjaya 2021, we will be using a Discord server as our main channel to upload our event announcements and materials to participants, as well as encouraging participants to communicate with each other and get familiar with this social platform.',
      },
      {
        idx: 1,
        title: 'What can I do inside the Discord Server?',
        content:
          'You can chat and also meet up with anyone inside the Discord Server! Make yourself at home and make some new friends too! Just make sure to follow our Discord Server Rules so that everyone can have a pleasant experience.',
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const FaqButtonRenderer = () => {
    return (
      <SimpleGrid
        columns={FaqCategories.length < 4 ? FaqCategories.length : '4'}
        spacing={10}
        spacingY={4}
      >
        {FaqCategories.map((cat, idx) => {
          return (
            <FaqButton
              key={idx}
              onClick={() => handleFaqSelect(cat.identifier)}
              selected={selectedCat === cat.identifier ? true : false}
            >
              {cat.title}
            </FaqButton>
          );
        })}
      </SimpleGrid>
    );
  };

  const FaqAccordionRenderer = ({ selected }) => {
    let items = FaqItemsByCat[selected];
    return (
      <Accordion data-aos={'fade-up'} allowMultiple allowToggle>
        {items.map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.content}</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  FaqAccordionRenderer.propTypes = {
    selected: PropTypes.string,
  };

  return (
    <Center py="20" {...props}>
      <Container maxW="container.xl">
        <SectionTitle>FAQ</SectionTitle>
        <BCSpacer size="sm" />
        <FaqButtonRenderer />
        <BCSpacer size="sm" />
        <FaqAccordionRenderer selected={selectedCat} />
      </Container>
    </Center>
  );
};

export default Index;
