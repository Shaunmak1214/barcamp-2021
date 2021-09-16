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
      identifier: 'proposingTopic',
      title: 'Proposing Topic',
    },
    {
      idx: 4,
      identifier: 'votingTopic',
      title: 'Voting Topic',
    },
    {
      idx: 5,
      identifier: 'gatherTown',
      title: 'Gather Town',
    },
    {
      idx: 6,
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
          'Throughout the event, you do not have to turn on your camera and microphone, although we definitely encourage you to do so! Of course, if you are to speak in your slot, you should open your camera and microphone so that everyone can see and hear you!',
      },
      {
        idx: 2,
        title: 'Is there any entry fee?',
        content:
          'No, it is free. We do not collect any entry fee from participants for this event!',
      },
      {
        idx: 3,
        title: 'How do I register as a participant?',
        content:
          'Click the "Join Us Now" button in this website and log in with your Google account. ',
      },
      {
        idx: 4,
        title: 'Is it necessary for me to present a topic during BarCamp?',
        content:
          'If this is your first time attending BarCamp, we highly encourage you to give yourself a chance and come up with a topic which you can present to the audience! Of course, if you do not want to, that is perfectly fine as well.',
      },
      {
        idx: 5,
        title:
          'How do I know if my topic is getting into the slots of BarCamp 2021?',
        content:
          'The voting for the topics will be open from 25th September to 30th September 2021. The 15 topics with the most votes will be announced on the next day, with their specified time slots, so make sure to check back on the 1st of October to see if your topic was voted!',
      },
      {
        idx: 6,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Feel free to contact our BarCamp team via itsoc.mmu@gmail.com to assist you further on this matter. ',
      },
      {
        idx: 7,
        title: 'How do I register on Gather.Town?',
        content:
          'Just click into the Gather.Town link (https://www.gather.town/) and click on the ‘Sign Up’ button on the top right corner of the screen. ',
      },
      {
        idx: 8,
        title: 'Do I have to install the desktop app for Gather.Town? ',
        content:
          'No, you do not have to install the desktop app for Gather.Town. You can just log into the website to enter BarCamp Cyberjaya 2021 Server after registering on Gather.Town.',
      },
      {
        idx: 9,
        title:
          'I cannot access the Gather.Town BarCamp Cyberjaya 2021 Server, what should I do?',
        content:
          'Feel free to contact our BarCamp team via itsoc.mmu@gmail.com to assist you further on this matter. ',
      },
      {
        idx: 10,
        title:
          'Can I use any of the rooms in Gather.Town during the day of the event?',
        content:
          'Yes you can! Feel free to use any empty space in Gather.Town to hang out with your friends! Only the spaces in the 3 Halls are reserved for proposed topics to be shared. Any other place is free for you to explore and stay in.',
      },
      {
        idx: 11,
        title: 'Why do I have to join the Discord server?',
        content:
          'For BarCamp Cyberjaya 2021, we will be using a Discord server as our main channel to upload our event announcements to keep you updated with the latest news, as well as encouraging everyone to communicate and make friends with each other before the day of the event. ',
      },
      {
        idx: 12,
        title: 'What can I do inside the Discord Server?',
        content:
          'You can chat and also meet up with anyone inside the Discord Server! Make yourself at home and make some new friends too! Just make sure to follow our Discord Server Rules so that everyone can have a pleasant experience. ',
      },
    ],
    general: [
      {
        idx: 0,
        title: 'What do I have to prepare for this event?',
        content:
          'The first thing you need to do is to create an account for Gather.Town  and familiarize yourself with the features of the platform before the event day itself to ensure a smooth session. Secondly, do join this event with the intent of sharing your knowledge with others!',
      },
      {
        idx: 1,
        title: 'Do I have to open my camera and microphone?',
        content:
          'Throughout the event, you do not have to turn on your camera and microphone, although we definitely encourage you to do so! Of course, if you are to speak in your slot, you should open your camera and microphone so that everyone can see and hear you!',
      },
      {
        idx: 2,
        title:
          'In an ongoing session, I realise I do not enjoy it. Can I leave halfway and join another ongoing session? ',
        content:
          'Yes of course you can! We would like to stress that on the day of the event you get to VOTE WITH YOUR FEET, meaning you can either enter or leave a hall anytime you please to join another topic you may find interesting as well!',
      },
    ],
    registration: [
      {
        idx: 0,
        title: 'Is there any entry fee?',
        content:
          'No, it is free. We do not collect any entry fee from participants for this event!',
      },
      {
        idx: 1,
        title: 'How do I register as a participant?',
        content:
          'Click the "Join Us Now" button in this website and log in with your Google account. ',
      },
    ],
    proposingTopic: [
      {
        idx: 0,
        title: 'Is it necessary for me to present a topic during BarCamp?',
        content:
          'If this is your first time attending BarCamp, we highly encourage you to give yourself a chance and come up with a topic which you can present to the audience! Of course, if you do not want to, that is perfectly fine as well.',
      },
      {
        idx: 1,
        title:
          'How do I know if my topic is getting into the slots of BarCamp 2021?',
        content:
          'The voting for the topics will be open from 25th September to 30th September 2021. The 15 topics with the most votes will be announced on the next day, with their specified time slots, so make sure to check back on the 1st of October to see if your topic was voted!',
      },
      {
        idx: 2,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Feel free to contact our BarCamp team via itsoc.mmu@gmail.com to assist you further on this matter. ',
      },
    ],
    votingTopic: [
      {
        idx: 0,
        title: 'What is the voting session conducted for?',
        content:
          'The voting for the topics will be conducted starting from 25th September to 30th September 2021. The 15 topics with the most votes will be selected to share on the day of BarCamp, the finalized list of ',
      },
      {
        idx: 1,
        title:
          'How do I know if my topic is getting into the slots of BarCamp 2021?',
        content:
          'The voting for the topics will be open from 25th September to 30th September 2021. The 15 topics with the most votes will be announced on the next day, with their specified time slots, so make sure to check back on the 1st of October to see if your topic was voted!',
      },
      {
        idx: 2,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Feel free to contact our BarCamp team via itsoc.mmu@gmail.com to assist you further on this matter. ',
      },
    ],
    gatherTown: [
      {
        idx: 0,
        title: 'How do I register on Gather.Town?',
        content:
          'Just click into the Gather.Town link (https://www.gather.town/) and click on the ‘Sign Up’ button on the top right corner of the screen. ',
      },
      {
        idx: 1,
        title: 'Do I have to install the desktop app for Gather.Town? ',
        content:
          'No, you do not have to install the desktop app for Gather.Town. You can just log into the website to enter BarCamp Cyberjaya 2021 Server after registering on Gather.Town.',
      },
      {
        idx: 2,
        title:
          'I cannot access the Gather.Town BarCamp Cyberjaya 2021 Server, what should I do?',
        content:
          'Feel free to contact our BarCamp team via itsoc.mmu@gmail.com to assist you further on this matter. ',
      },
      {
        idx: 3,
        title:
          'Can I use any of the rooms in Gather.Town during the day of the event?',
        content:
          'Yes you can! Feel free to use any empty space in Gather.Town to hang out with your friends! Only the spaces in the 3 Halls are reserved for proposed topics to be shared. Any other place is free for you to explore and stay in.',
      },
    ],
    discordServer: [
      {
        idx: 0,
        title: 'Why do I have to join the Discord server?',
        content:
          'For BarCamp Cyberjaya 2021, we will be using a Discord server as our main channel to upload our event announcements to keep you updated with the latest news, as well as encouraging everyone to communicate and make friends with each other before the day of the event. ',
      },
      {
        idx: 1,
        title: 'What can I do inside the Discord Server?',
        content:
          'You can chat and also meet up with anyone inside the Discord Server! Make yourself at home and make some new friends too! Just make sure to follow our Discord Server Rules so that everyone can have a pleasant experience. ',
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
        columns={[
          '1',
          '1',
          FaqCategories.length < 4 ? FaqCategories.length : '4',
        ]}
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
