import BlackLoaderData from '../assets/lottie/black-loader.json';
import CompleteGifData from '../assets/lottie/complete-gif.json';
import CountdownGifData from '../assets/lottie/countdown-gif.json';
import ErrorGifData from '../assets/lottie/error-gif.json';
import BCLoadingData from '../assets/lottie/bc-loading.json';

require('dotenv').config();

export const BlackLoader = {
  loop: true,
  autoplay: true,
  animationData: BlackLoaderData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const CompleteLoader = {
  loop: false,
  autoplay: true,
  animationData: CompleteGifData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const Countdown = {
  loop: true,
  autoplay: true,
  animationData: CountdownGifData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const ErrorLoader = {
  loop: false,
  autoplay: true,
  speed: 3,
  animationData: ErrorGifData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const BCLoader = {
  loop: true,
  autoplay: true,
  speed: 10,
  animationData: BCLoadingData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/';
