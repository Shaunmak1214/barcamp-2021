import React from 'react';
import { getIn } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Index = ({ field, form, label, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <VStack
      className="bc-input-wrapper"
      w="100%"
      px="30px"
      py="20px"
      border="2px solid #C2C2C2"
      borderRadius="8px"
      bg="#FFFFFF"
    >
      <FormControl w="100%" id="email" isInvalid={errorText ? true : false}>
        <FormLabel
          fontFamily="Montserrat"
          fontWeight="500"
          fontSize="sm"
          color="#797979"
        >
          {label}
        </FormLabel>
        <Select
          fontFamily="Source Sans Pro"
          fontSize="xl"
          fontWeight="400"
          color="#000000"
          variant="unstyled"
          w="100%"
          size="lg"
          paddingY="5px"
          paddingLeft="0px"
          {...field}
          {...props}
        >
          <option value="tech">Tech</option>
          <option value="nontech">Non-Tech</option>
          <option value="nonsense">Nonsense</option>
        </Select>
        <FormErrorMessage fontFamily="Source Sans Pro" fontSize="sm">
          {errorText}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

Index.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
  props: PropTypes.any,
  label: PropTypes.any,
};

export default Index;
