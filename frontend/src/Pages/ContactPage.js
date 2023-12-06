import React from 'react';
import { Box, Center, VStack, Text } from '@chakra-ui/react';
import logo from '../Images/polydashlogogreen.png';

const Contact = () => {
  return (
    <div>
      <Center h="100vh">
        <VStack spacing={8}>
          <Box>
            <img src={logo} alt="App Logo" width="400" />
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="#B38F4F">
              For any questions or required assistance, please contact:
            </Text>
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="#154734">
              (805) 123-4567
            </Text>
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="#154734">
              help@polydash.com
            </Text>
          </Box>
        </VStack>
      </Center>
    </div>
  );
};

export default Contact;
