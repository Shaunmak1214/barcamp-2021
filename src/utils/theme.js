import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Source Sans Pro", sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem', // 14px
    md: '1rem', // 15px
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem', // 25px
    '3xl': '1.875rem',
    '4xl': '2.25rem', //35px
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  colors: {
    primary: '#EB202B',
    secondary: '#1050A0',
    highlight: '#FF7C83',
    warning: '#FFC75F',
    danger: '#C34A36',
  },
  sizes: {
    'container.xl': '1200px',
  },
  components: {
    Button: {
      variants: {
        solid() {
          return {
            _hover: {
              bg: `linear-gradient(90deg, #4F0004 0%, #630000 100%)`,
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
              bg: `linear-gradient(90deg, #4F0004 0%, #630000 100%)`,
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
        disabled() {
          return {
            _hover: {
              bg: `#001D41`,
              color: '#fff',
            },
            _active: { bg: `#00234F` },
            _disabled: {
              bg: '#6F6F6F',
            },
          };
        },
      },
    },
  },
});

export default theme;
