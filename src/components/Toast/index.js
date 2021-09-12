import { useToast, Box, Text } from '@chakra-ui/react';

const Toast = () => {
  const toast = useToast();

  const loginErrToast = () => {
    toast({
      position: 'bottom-right',
      duration: 9000,
      isClosable: true,
      render: () => (
        <Box
          p={5}
          borderRadius="10px"
          boxShadow="0px 16px 40px rgba(129, 129, 129, 0.25)"
          background="#fff"
        >
          <Text fontFamily="Montserrat" fontSize="md" color="black">
            Login failed
          </Text>
        </Box>
      ),
    });
  };

  return { loginErrToast };
};

export default Toast;
