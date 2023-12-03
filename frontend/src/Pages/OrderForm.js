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
import { collection, addDoc,getDoc, updateDoc,doc } from "firebase/firestore"
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
    if(!user){
      console.log("User not signed in")
      alert("You must be signed in to place an order")
      return;
    }
    const restaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null;
    // Handle the order placement logic here, e.g., send data to a server
    try {
      const orderDocRef = await addDoc(orderCollectionRef, {
        title: "Order",
        uid: user.uid,
        restaurantId: restaurantId,
        customerName: name,
        email: user.email,
        address: address,
        paymentInfo: paymentInfo,
        comments: comments,
        totalPrice: cartItems.reduce((acc, item) => acc + item.itemCost * item.quantity, 0).toFixed(2),
        deliveryFee: (cartItems.reduce((acc, item) => acc + item.itemCost * item.quantity, 0)/1.2 * 0.2).toFixed(2),
        status: "Pending"
      });
      const itemsCollectioNRef = collection(orderDocRef,'items');
      for( const item of cartItems){
        await addDoc(itemsCollectioNRef,item);
      }
      console.log('Order document added successfully:', orderDocRef.id);
      const userRef = doc(db,"users",user.uid);
      
      const userDoc = await getDoc(userRef)
  
      // Get the current array or create an empty array if it doesn't exist
      const currentOrders = userDoc.exists() ? userDoc.data().orders || [] : [];

      // Concatenate the new items to the existing array
      const updatedOrders = currentOrders.concat(orderDocRef.id);

      // Update the user document with the new array of items
      await updateDoc(userRef, { orders: updatedOrders });

      window.location.href = `/order/tracking`;
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
                  <Box flex="1">
                      <Text>{item.itemName} {item.quantity && `(Qty: ${item.quantity})`}</Text>
                  </Box>
                  <Text>${(item.itemCost * (item.quantity || 1)).toFixed(2)}</Text>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >Remove</Button>
              </HStack>
          ))}
          <Text >Delivery Fee: ${((getCartTotal() / 1.2) * 0.2).toFixed(2)}</Text>
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