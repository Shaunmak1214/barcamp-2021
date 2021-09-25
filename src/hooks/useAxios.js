import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API_URL } from '../constants/';

axios.defaults.baseURL = API_URL;

const useAxios = (axiosParams, onUpdate) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (data) => {
    setLoading(true);
    axios
      .request({
        ...axiosParams,
        data: data ? data : null,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 203) {
          onUpdate(null, res);
        } else {
          onUpdate(res, null);
        }
      })
      .catch((err) => {
        console.log(err);
        onUpdate(err.response, null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, fetch: fetchData };
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
