import BlackLoaderData from '../assets/lottie/black-loader.json';

export const BlackLoader = {
  loop: true,
  autoplay: true,
  animationData: BlackLoaderData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const API_URL = 'http://localhost:5000/api';
