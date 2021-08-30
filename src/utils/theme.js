import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Source sans pro", sans-serif',
  },
  colors: {
    primary: '#EB202B',
    accent: '#1050A0',
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
      },
    },
  },
});

export default theme;
