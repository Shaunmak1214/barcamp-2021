import BlackLoaderData from '../assets/lottie/black-loader.json';

require('dotenv').config();

export const BlackLoader = {
  loop: true,
  autoplay: true,
  animationData: BlackLoaderData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
