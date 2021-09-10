import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { API_URL } from '../constants/';

const useAuthorized = ({ authCheckUrl }) => {
  const [authorized, setAuthorized] = useState(true);

  const checkAuthorized = async () => {
    axios.get(`${API_URL}${authCheckUrl}`).then((res) => {
      if (res.status === 200) {
        setAuthorized(true);
      }
    });
  };

  return { authorized, checkAuthorized };
};

useAuthorized.propTypes = {
  authCheckUrl: PropTypes.string.isRequired,
};

export default useAuthorized;
