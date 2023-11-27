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
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useAuth } from '../context/AuthContext';
import { useCart } from '../Components/Cart';


const OrderForm = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const user = useAuth();

  // State for location and payment information
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [comments, setComments] = useState('');

  const orderCollectionRef = collection(db,"orders");
  // Function to place an order
  const placeOrder = async () => {
    const restaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null;
    // Handle the order placement logic here, e.g., send data to a server
    try {
      const orderDocRef = await addDoc(orderCollectionRef, {
        uid: user.uid,
        restaurantId: restaurantId,
        customerName: name,
        email: user.email,
        address: address,
        paymentInfo: paymentInfo,
        comments: comments,
        total: cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2),
        status: "Pending"
      });
      const itemsCollectioNRef = collection(orderDocRef,'items');
      for( const item of cartItems){
        await addDoc(itemsCollectioNRef,item);
      }
      console.log('Order document added successfully:', orderDocRef.id);
      window.location.href = `/order/tracking/1111`;
    } catch (error) {
      console.error('Error adding order document:', error);
      alert("Something went wrong with your order")
    }
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
          <FormLabel>Name for order</FormLabel>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <FormControl>
          <FormLabel>Delivery Location</FormLabel>
          <Input
            type="text"
            placeholder="Enter delivery location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

      <Box mt={4}>
        <FormControl>
          <FormLabel>Additional Comments</FormLabel>
          <Input
            type="text"
            placeholder="Enter any comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
      </Box>

      <Button
        mt={4}
        colorScheme="teal"
        onClick={placeOrder}
        disabled={!cartItems.length || !address || !paymentInfo}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default OrderForm;