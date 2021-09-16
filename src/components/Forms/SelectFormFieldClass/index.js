/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HStack, Box, Center } from '@chakra-ui/react';

import '../SelectFormField/selectformfield.css';

export class Index extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onSelect: PropTypes.func,
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
          <Box width="90%">{this.props.children}</Box>
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
