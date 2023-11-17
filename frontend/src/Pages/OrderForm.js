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
import { useCart } from '../Components/Cart';

const OrderForm = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  // State for location and payment information
  const [location, setLocation] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  // Function to place an order
  const placeOrder = async () => {
    window.location.href = `/order/tracking/1111`;
                                          //${order.id}
    // Handle the order placement logic here, e.g., send data to a server
    console.log('Order placed:', { cartItems, location, paymentInfo });
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} mt={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Cart Summary
        </Text>
        {cartItems.map((item) => (
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
        <Text>Total: ${getCartTotal()}</Text>
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
        disabled={!cartItems.length || !location || !paymentInfo}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default OrderForm;