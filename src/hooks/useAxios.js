import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API_URL } from '../constants/';

axios.defaults.baseURL = API_URL;

const useAxios = (axiosParams, onUpdate) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (data) => {
    axios
      .request({
        ...axiosParams,
        data: data ? data : null,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          setResponse(res);
        } else {
          setError(res);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    onUpdate(response, error);
  }, [response, error]);

  return { response, error, loading, fetch: fetchData };
};

useAxios.propTypes = {
  axiosParams: PropTypes.object.isRequired,
  onDone: PropTypes.func,
};

export default useAxios;

// to use it:
// const App = () => {
//   const { response, loading, error, fetch } = useAxios({
//       method: 'POST',
//       url: '/posts',
//       headers: {
//         accept: '*/*'
//       },
//       data: {
//           userId: 1,
//           id: 19392,
//           title: 'title',
//           body: 'Sample text',
//       },
//       cb(fetch())
//   });

//   return (
//       <div className='App'>
//           <h1>Posts</h1>

//           {loading ? (
//               <p>loading...</p>
//           ) : (
//               <div>
//                   {error && (
//                       <div>
//                           <p>{error.message}</p>
//                       </div>
//                   )}
//                   <div> {
//                     response && <p>{response.id}</p>
//                   }
//                   </div>
//               </div>
//           )}
//       </div>
//   );
// };
