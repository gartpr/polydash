import React, { useState } from 'react';
import {
  Container,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const OrderForm = () => {
  // Mock cart data for demonstration
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Item 1',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Item 2',
      price: 7.49,
    },
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  // State for location and payment information
  const [location, setLocation] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  // Function to place an order
  const placeOrder = () => {
    // Handle the order placement logic here, e.g., send data to a server
    console.log('Order placed:', { cart, location, paymentInfo });
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} mt={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Cart Summary
        </Text>
        {cart.map((item) => (
          <HStack key={item.id} justifyContent="space-between" w="100%">
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </HStack>
        ))}
        <Text>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</Text>
      </VStack>

      <Box mt={4}>
        <FormControl>
          <FormLabel>Delivery Location</FormLabel>
          <Input
            type="text"
            placeholder="Enter delivery location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <FormControl>
          <FormLabel>Payment Information</FormLabel>
          <Input
            type="text"
            placeholder="Enter payment information"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
          />
        </FormControl>
      </Box>

      <Button
        mt={4}
        colorScheme="teal"
        onClick={placeOrder}
        disabled={!cart.length || !location || !paymentInfo}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default OrderForm;