import React from 'react';
import { Box, Center, VStack, HStack, Button, Text}  from '@chakra-ui/react';
import logo from '../Images/polydashlogogreen.png';

const Home = () => {
    return (
      <Center h="100vh">
        <VStack spacing={8}>
          <Box>
            <img src={logo} alt="App Logo" width="400" />
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="#154734">
              We Deliver, You Devour
            </Text>
          </Box>
          <HStack spacing={8}>
            <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline" href="/delivery">
              Deliver
            </Button>
            <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline" href="/order">
              Order
            </Button>
            <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline" href="/selling">
              Sell
            </Button>
          </HStack>
        </VStack>
      </Center>
    );
  };
  
export default Home;