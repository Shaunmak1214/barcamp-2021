import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const useAuthorized = ({ authCheckUrl }) => {
  const [authorized, setAuthorized] = useState(false);

  const checkAuthorized = async () => {
    axios.get(`${authCheckUrl}`).then((res) => {
      if (res.status === 200) {
        setAuthorized(true);
      }
    });
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  return { authorized, checkAuthorized };
};

useAuthorized.propTypes = {
  authCheckUrl: PropTypes.string.isRequired,
};

export default useAuthorized;
