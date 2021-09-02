import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Source Sans Pro", sans-serif',
  },
  colors: {
    primary: '#EB202B',
    secondary: '#1050A0',
    highlight: '#FF7C83',
    warning: '#FFC75F',
    danger: '#C34A36',
  },
  components: {
    Button: {
      variants: {
        solid() {
          return {
            _hover: {
              bg: `#A50009`,
            },
            _active: { bg: `#A50009` },
          };
        },
        secondary() {
          return {
            _hover: {
              bg: `#00234F`,
            },
            _active: { bg: `#00234F` },
          };
        },
        register() {
          return {
            _hover: {
              bg: `#A50009`,
            },
            _active: { bg: `#FF7C83` },
          };
        },
        outlined() {
          return {
            _hover: {
              bg: `#001D41`,
              color: '#fff',
            },
            _active: { bg: `#00234F` },
          };
        },
      },
    },
  },
});

export default theme;
