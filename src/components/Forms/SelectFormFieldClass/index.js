import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicBadge from '../../TopicBadge';

import {
  HStack,
  Box,
  Center,
  VStack,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

// import { SpeakerIcon } from '../../../assets';

import '../SelectFormField/selectformfield.css';

export class Index extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      topic: PropTypes.object,
      onSelect: PropTypes.func,
      TopicIconRenderer: PropTypes.func,
      onLimitClick: PropTypes.func,
      children: PropTypes.node,
      props: PropTypes.object,
      disabledSelect: PropTypes.bool,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  handleSelect() {
    if (this.props.disabledSelect) {
      if (this.state.selected) {
        this.setState({ selected: !this.state.selected }, () => {
          this.props.onSelect(this.props.value, this.state.selected);
        });
      } else {
        this.props.onLimitClick();
      }
    } else {
      this.setState({ selected: !this.state.selected }, () => {
        this.props.onSelect(this.props.value, this.state.selected);
      });
    }
  }

  render() {
    return (
      <>
        <HStack
          className="selectable"
          w="100%"
          p={4}
          justifyContent="space-between"
          bg={this.state.selected ? '#1050A0' : 'transparent'}
          color={this.state.selected ? 'white' : 'black'}
          border="1px solid #E9E9E9;"
          borderRadius="8px"
          mb="5"
          cursor={
            this.props.disabledSelect && !this.state.selected
              ? 'not-allowed'
              : 'pointer'
          }
          wordBreak="break-all"
          transition="all 0.1s ease-in-out"
          onClick={() => this.handleSelect()}
          {...this.props}
        >
          {/* <Box width="90%">{this.props.children}</Box> */}
          <Box width="90%">
            <HStack
              spacing={[0, 0, 7]}
              py="0.5em"
              px={['0rem', '0rem', '0.5em']}
            >
              <Image
                src={this.props.TopicIconRenderer(this.props.topic.theme)}
                d={['none', 'none', 'flex']}
                h="45px"
                w="45px"
                alt="Artificial Intelligence"
              />
              <VStack spacing={2} align="flex-start" ml="0" w="100%">
                <Flex
                  justifyContent="flex-start"
                  w={['100%', '50%', '95%']}
                  flexDir={['column', 'column', 'row']}
                  mb="10px"
                >
                  <TopicBadge topic={this.props.topic.theme} />
                  <Center
                    ml={[0, 0, '10px']}
                    mt={['10px', '10px', 0]}
                    borderRadius="8px"
                    border="1px solid #e9e9e9"
                    px="3"
                  >
                    <svg
                      width="10"
                      height="10"
                      style={{ marginRight: '5px' }}
                      viewBox="0 0 12 13"
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.1108 6.02786C9.00661 5.4212 9.58996 4.4394 9.58996 3.33333C9.58996 1.49533 7.9796 0 6.00021 0C4.02083 0 2.41047 1.49533 2.41047 3.33333C2.41047 4.4394 2.9938 5.4212 3.88963 6.02786C1.66276 6.81916 0.0771484 8.82403 0.0771484 11.1667C0.0771484 12.1776 0.96284 13 2.0515 13H9.94893C11.0376 13 11.9233 12.1776 11.9233 11.1667C11.9233 8.82403 10.3377 6.81916 8.1108 6.02786ZM3.48741 3.33333C3.48741 2.04674 4.61465 1.00001 6.00021 1.00001C7.38578 1.00001 8.51302 2.04674 8.51302 3.33333C8.51302 4.61993 7.38578 5.66668 6.00021 5.66668C4.61465 5.66668 3.48741 4.61993 3.48741 3.33333ZM9.94893 12H2.0515C1.55666 12 1.15408 11.6262 1.15408 11.1666C1.15408 8.68532 3.32802 6.66664 6.00024 6.66664C8.67246 6.66664 10.8464 8.6853 10.8464 11.1666C10.8464 11.6262 10.4438 12 9.94893 12Z"
                        fill={this.state.selected ? '#ffffff' : '#757575'}
                      />
                    </svg>

                    <Text
                      fontSize="sm"
                      color={this.state.selected ? '#ffffff' : '#797979'}
                    >
                      {this.props.topic.user.fullName}
                    </Text>
                  </Center>
                </Flex>
                <Text
                  as="h3"
                  fontSize="md"
                  fontFamily="Montserrat"
                  fontWeight="600"
                >
                  {this.props.topic.name}
                </Text>
                <Text
                  as="h6"
                  fontSize="sm"
                  fontWeight="500"
                  wordBreak="break-all"
                >
                  {this.props.topic.description}
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Center width="10%">
            {this.state.selected ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 0C9.19674 0 0 9.19674 0 20.5C0 31.8033 9.19674 41 20.5 41C31.8033 41 41 31.8033 41 20.5C41 9.19674 31.8033 0 20.5 0ZM31.9574 15.1053L18.8559 28.104C18.0852 28.8747 16.8521 28.9261 16.0301 28.1554L9.09399 21.8358C8.27193 21.0652 8.22055 19.7807 8.93985 18.9586C9.71053 18.1366 10.995 18.0852 11.817 18.8559L17.3145 23.891L29.0288 12.1767C29.8509 11.3546 31.1353 11.3546 31.9574 12.1767C32.7794 12.9987 32.7794 14.2832 31.9574 15.1053Z"
                  fill="#E9E9E9"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 0C9.19674 0 0 9.19674 0 20.5C0 31.8033 9.19674 41 20.5 41C31.8033 41 41 31.8033 41 20.5C41 9.19674 31.8033 0 20.5 0ZM31.9574 15.1053L18.8559 28.104C18.0852 28.8747 16.8521 28.9261 16.0301 28.1554L9.09399 21.8358C8.27193 21.0652 8.22055 19.7807 8.93985 18.9586C9.71053 18.1366 10.995 18.0852 11.817 18.8559L17.3145 23.891L29.0288 12.1767C29.8509 11.3546 31.1353 11.3546 31.9574 12.1767C32.7794 12.9987 32.7794 14.2832 31.9574 15.1053Z"
                  fill="#E9E9E9"
                />
              </svg>
            )}
          </Center>
        </HStack>
      </>
    );
  }
}

React.memo(Index);

export default Index;
