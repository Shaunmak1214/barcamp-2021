import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../constants/';

axios.defaults.baseURL = API_URL;

export const useAxios = (axiosParams, onDone) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    axios
      .request(params)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        onDone();
      });
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading, fetchData: fetch };
};

// to use it:
// const App = () => {
//   const { response, loading, error } = useAxios({
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
