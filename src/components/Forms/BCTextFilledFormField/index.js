import React from 'react';
import { getIn } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TextFormField = ({ field, form, label, customLabel, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl w="100%" id="email" isInvalid={errorText ? true : false}>
      <FormLabel fontFamily="Montserrat" fontWeight="500" fontSize="md">
        {customLabel || label}
      </FormLabel>
      <Input
        fontFamily="Source Sans Pro"
        variant="filled"
        w="100%"
        size="md"
        paddingY="23px"
        paddingLeft="25px"
        {...field}
        {...props}
      />
      <FormErrorMessage fontFamily="Source Sans Pro" fontSize="sm">
        {errorText}
      </FormErrorMessage>
    </FormControl>
  );
};

TextFormField.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
  props: PropTypes.any,
  label: PropTypes.any,
  customLabel: PropTypes.any,
};

export default TextFormField;
