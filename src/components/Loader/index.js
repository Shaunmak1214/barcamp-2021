import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import { BlackLoader } from '../../constants';

const Index = ({ size }) => {
  if (size === 'sm') {
    return (
      <>
        <Lottie
          options={BlackLoader}
          height={25}
          width={25}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </>
    );
  } else if (size === 'md') {
    return (
      <>
        <Lottie
          options={BlackLoader}
          height={45}
          width={45}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </>
    );
  } else if (size === 'lg') {
    return (
      <>
        <Lottie
          options={BlackLoader}
          height={75}
          width={75}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </>
    );
  } else if (size === 'xl') {
    return (
      <>
        <Lottie
          options={BlackLoader}
          height={100}
          width={100}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </>
    );
  } else {
    return (
      <>
        <Lottie
          options={BlackLoader}
          height={25}
          width={25}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </>
    );
  }
};

Index.propTypes = {
  size: PropTypes.string,
};

export default Index;
