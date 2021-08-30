// import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import createHistory from 'history/createBrowserHistory';
// import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#ABC4FF',
    accent: '#F2F6FF',
    secondary: '#D9F3F0',
    highlight: '#00C9A7',
    warning: '#FFC75F',
    danger: '#C34A36',
  },
  components: {
    Button: {
      variants: {
        solid() {
          return {
            _hover: {
              bg: `#BBC7E4`,
            },
            _active: { bg: `#BBC7E4` },
          };
        },
      },
    },
  },
});

// const history = createHistory();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
