import { Center, Container, SimpleGrid, Box } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { SectionTitle } from '../SectionTitle';
import { FaqButton } from '../Buttons';
import BCSpacer from '../Spacer';

const Index = () => {
  const [selectedCat, setSelectedCat] = useState('general');

  const FaqCategories = [
    {
      idx: 0,
      identifier: 'general',
      title: 'General',
    },
    {
      idx: 1,
      identifier: 'registration',
      title: 'Registration',
    },
  ];

  const FaqItemsByCat = {
    general: [
      { idx: 0, title: 'How do I register?', content: 'blah' },
      { idx: 1, title: 'How do I register?', content: 'blah' },
    ],
    registration: [
      { idx: 0, title: 'How do I register in registration?', content: 'blah' },
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
              onClick={() => setSelectedCat(cat.identifier)}
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
    <Center py="20">
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
