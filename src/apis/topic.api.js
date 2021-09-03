import axios from 'axios';
import { API_URL } from '../constants/';

const fetchTopics = async () => {
  const { data } = await axios.get(`${API_URL}topics/`);
  return data;
};

const postTopics = async (topic) => {
  const { data } = await axios.post(`${API_URL}topics/`, topic);
  return data;
};

export { fetchTopics, postTopics };
