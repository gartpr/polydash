import React from 'react';
import { Box, Center, VStack, HStack, Button, Text } from '@chakra-ui/react';
import logo from '../Images/polydashlogogreen.png';

const RestaurantRequests = () => {
  /** 
    const orderRequests = [
        {
          id: 1,
          title: 'Order #001',
          customerName: 'Bob Smith',
          details: '2x Pizza, 1x Soda',
        },
        {
          id: 2,
          title: 'Order #002',
          customerName: 'John ',
          details: '1x Burger, 1x Fries',
        },
        // ... more orders
      ];
    */
  return (
    <Center h="100vh">
      <VStack spacing={8}>
        <Box>
          <img src={logo} alt="App Logo" width="400" />
        </Box>
        <Box>
          <Text fontSize="4xl" fontWeight="bold" color="#154734">
            We Deliver, You FAA
          </Text>
        </Box>
        <HStack spacing={8}>
          <Button
            fontSize="2xl"
            size="lg"
            colorScheme="teal"
            variant="outline"
            href="/delivery"
          >
            Deliver
          </Button>
          <Button
            fontSize="2xl"
            size="lg"
            colorScheme="teal"
            variant="outline"
            href="/order"
          >
            Order
          </Button>
          <Button
            fontSize="2xl"
            size="lg"
            colorScheme="teal"
            variant="outline"
            href="/selling"
          >
            Sell
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default RestaurantRequests;
