import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import store from '../store/store';

import { API_URL } from '../constants/';

const useAuthorized = (authCheckUrl) => {
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState(null);
  const authStore = store.getState().auth;

  const checkAuthorized = async () => {
    axios
      .get(`${API_URL}${authCheckUrl}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 204 || res.status === 203) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          setError('Unauthorized');
        }
      })
      .catch((err) => {
        setError('Unauthorized' + err);
        setAuthorized(false);
      });
  };

  return { authorized, authError: error, checkAuthorized };
};

useAuthorized.propTypes = {
  authCheckUrl: PropTypes.string.isRequired,
};

export default useAuthorized;
