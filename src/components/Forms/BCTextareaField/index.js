import React, { useRef } from 'react';
import { getIn } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Textarea,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BCTextareaField = ({ field, form, label, maxLength, ...props }) => {
  const lengthLeftText = useRef(maxLength);
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const handleOnchange = (e) => {
    let valueLength = e.target.value.length;
    let lengthLeft = maxLength - valueLength;
    lengthLeftText.current.innerHTML = lengthLeft;
  };

  return (
    <VStack
      className="bc-input-wrapper"
      w="100%"
      px="30px"
      py="20px"
      border="2px solid #C2C2C2"
      borderRadius="8px"
      bg="#FFFFFF"
      position="relative"
    >
      <Text position="absolute" right="40px" ref={lengthLeftText}></Text>
      <FormControl w="100%" id="email" isInvalid={errorText ? true : false}>
        <FormLabel
          fontFamily="Montserrat"
          fontWeight="500"
          fontSize="sm"
          color="#797979"
        >
          {label}
        </FormLabel>
        <Textarea
          fontFamily="Source Sans Pro"
          fontSize="xl"
          variant="unstyled"
          w="100%"
          size="lg"
          fontWeight="400"
          color="#000000"
          paddingY="5px"
          paddingLeft="0px"
          rows="2"
          maxLength={maxLength}
          resize={'none'}
          {...field}
          {...props}
          onKeyDown={handleOnchange}
        />
        <FormErrorMessage fontFamily="Source Sans Pro" fontSize="sm">
          {errorText}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

BCTextareaField.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
  props: PropTypes.any,
  label: PropTypes.any,
  maxLength: PropTypes.number,
};

export default BCTextareaField;
