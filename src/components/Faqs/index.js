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
    }
  ];

  const FaqItemsByCat = {
    all: [
      {
        idx: 0,
        title: 'What do I have to prepare for this event?',
        content:
          'All you have to do is join us at the Faculty of Computing and Informatics at Multimedia University, Cyberjaya. All you have to do is register yourself, and vote for topics you find interesting!',
      },
      {
        idx: 1,
        title: 'Is it necessary for me to present a topic during BarCamp?',
        content:
          'If this is your first time attending BarCamp, we highly encourage you to give yourself a chance and come up with a topic which you can present to the audience! Of course, if you do not want to, that is perfectly fine as well.',
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
          'Click the "Join Us Now" button in this website and fill in the details in the Google Form! You can also register yourself on the day of the event at our registration counter!',
      },
      {
        idx: 4,
        title:
          'How do I know if my topic is getting into the slots of BarCamp Cyberjaya 2022?',
        content:
          'At 12:45pm, the votes will be counted for all proposed topics. And once the topics and slots have been confirmed, we will call for all speakers to check the time slots and room number so that everyone will be well informed on the topics which were voted for.',
      },
      {
        idx: 5,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Let us know at the registration counter! We will make the necessary ammendments to the agenda.',
      },
      {
        idx: 6,
        title:
          'Will lunch be served?',
        content:
          'Yes, we have prepared a lunch buffet for all participants. If that does not suffice, you may also visit other food stalls located in the vicinity of MMU as well.',
      },
      {
        idx: 7,
        title:
          'Will there by any car parkings available in this event?',
        content:
          'Yes, if your mode of transport is by your own personal car, we have made the necessary arrangements to ensure that all visitors will be able to park their cars within the university.',
      },
      {
        idx: 8,
        title:
          'In an ongoing session, I realise I do not enjoy it. Can I leave halfway and join another ongoing session? ',
        content:
          'Yes of course you can! We would like to stress that on the day of the event you get to VOTE WITH YOUR FEET, meaning you can either enter or leave a hall anytime you please to join another topic you may find interesting as well!',
      },
    ],
    general: [
      {
        idx: 0,
        title: 'What do I have to prepare for this event?',
        content:
        'All you have to do is join us at the Faculty of Computing and Informatics at Multimedia University, Cyberjaya. All you have to do is register yourself, and vote for topics you find interesting!',
      },
      {
        idx: 1,
        title:
          'Will there by any car parkings available in this event?',
        content:
          'Yes, if your mode of transport is by your own personal car, we have made the necessary arrangements to ensure that all visitors will be able to park their cars within the university.',
      },
      {
        idx: 2,
        title:
          'In an ongoing session, I realise I do not enjoy it. Can I leave halfway and join another ongoing session? ',
        content:
          'Yes of course you can! We would like to stress that on the day of the event you get to VOTE WITH YOUR FEET, meaning you can either enter or leave a hall anytime you please to join another topic you may find interesting as well!',
      },
      {
        idx: 3,
        title:
          'Will lunch be served?',
        content:
          'Yes, we have prepared a lunch buffet for all participants. If that does not suffice, you may also visit other food stalls located in the vicinity of MMU as well.',
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
          'Click the "Join Us Now" button in this website and fill in the details in the Google Form! You can also register yourself on the day of the event at our registration counter!',
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
          'How do I Propose a Topic in BarCamp?',
        content:
          'You will be provided with materials to write down the name of your topic. After that, you may paste it on our designated board in the Main Hall, where other participants will be able to vote for your topics',
      },
      {
        idx: 2,
        title:
          'How do I know if my topic is getting into the slots of BarCamp Cyberjaya 2022?',
        content:
          'At 12:45pm, the votes will be counted for all proposed topics. And once the topics and slots have been confirmed, we will call for all speakers to check the time slots and room number so that everyone will be well informed on the topics which were voted for.',
      },
      {
        idx: 3,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Let us know at the registration counter! We will make the necessary ammendments to the agenda.',
      },
    ],
    votingTopic: [
      {
        idx: 0,
        title: 'What is the voting session conducted for?',
        content:
          'The voting session allows all BarCampers to vote for their most favoured topics!',
      },
      {
        idx: 1,
        title:
          'How do I know if my topic is getting into the slots of BarCamp Cyberjaya 2022?',
        content:
          'At 12:45pm, the votes will be counted for all proposed topics. And once the topics and slots have been confirmed, we will call for all speakers to check the time slots and room number so that everyone will be well informed on the topics which were voted for.',
      },
      {
        idx: 2,
        title:
          'My topic was voted and a slot has been allocated for me, but I have an emergency and cannot make it on the day of the event. What should I do?',
        content:
          'Let us know at the registration counter! We will make the necessary ammendments to the agenda.',
      },
    ]
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
