import React, { useRef } from 'react';
import { HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SelectFormField = ({ onSelect, children, ...props }) => {
  const [selected, setSelected] = React.useState(false);
  const selectableRef = useRef(null);

  const handleSelect = () => {
    setSelected(!selected);
    onSelect(!selected);
    selectableRef.current.style.backgroundColor = '#1050A0';
    selectableRef.current.style.color = 'white';
  };

  const selectableHover = (status) => {
    if (status) {
      if (selected) {
        selectableRef.current.style.backgroundColor = '#002857';
        selectableRef.current.style.color = 'white';
      } else {
        selectableRef.current.style.backgroundColor = '#f5f5f5';
        selectableRef.current.style.color = 'black';
      }
    } else {
      if (selected) {
        selectableRef.current.style.backgroundColor = '#1050A0';
        selectableRef.current.style.color = 'white';
      } else {
        selectableRef.current.style.backgroundColor = 'transparent';
        selectableRef.current.style.color = 'black';
      }
    }
  };

  return (
    <>
      {selected}
      <HStack
        ref={selectableRef}
        w="100%"
        p={4}
        justifyContent="space-between"
        bg={selected ? '#1050A0' : 'transparent'}
        border="1px solid #E9E9E9;"
        borderRadius="8px"
        mb="5"
        cursor="pointer"
        transition="all 0.1s ease-in-out"
        onMouseOver={() => {
          selectableHover(true);
        }}
        onMouseLeave={() => {
          selectableHover(false);
        }}
        onClick={() => {
          handleSelect();
        }}
        {...props}
      >
        {children}
        {selected ? (
          <svg
            width="18"
            height="18"
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
            width="18"
            height="18"
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
      </HStack>
    </>
  );
};

React.memo(SelectFormField);

SelectFormField.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  props: PropTypes.node,
};

export default SelectFormField;
