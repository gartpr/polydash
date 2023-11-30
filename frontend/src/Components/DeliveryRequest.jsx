import React, { useState, useEffect } from 'react';
import { doc, getDoc,updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button
} from '@chakra-ui/react';

import { useAuth } from '../context/AuthContext';



const DeliveryRequest = ({ order }) => {

  const user = useAuth();

  const acceptDelivery = async (orderId) => {
  
    const orderDocRef = doc(db, 'orders', orderId);
    console.log(`Button clicked for order with ID: ${orderId}`);
    await updateDoc(orderDocRef, {
      status: "Picked Up",
      deliveryDriverId: user.uid
    });
    alert('You will now deliver this order');
  };

  const [restaurant, setRestaurant] = useState(null);
  const getRestaurant = async (restaurantId) => {
    const restaurantRef = doc(db, 'restaurants', restaurantId);
    try {
      const restaurantSnapshot = await getDoc(restaurantRef);
      if (restaurantSnapshot.exists()) {
        setRestaurant(restaurantSnapshot.data());
      } else {
        console.log('Restaurant not found');
      }
    } catch (error) {
      console.error('Error getting restaurant:', error.message);
    }
  };

  useEffect(() => {
    const restaurantId = order.restaurantId; // Replace with the actual restaurant ID
    getRestaurant(restaurantId);
  }, []);

  if (!restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="bold">{restaurant.name} {'->'} {order.address}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

      </h2>
      <AccordionPanel pb={4}>
      <Text fontWeight="bold">{restaurant.name}</Text>
      <Text fontWeight="bold">{restaurant.adress}</Text>
        <Text fontWeight="bold">{order.customerName}</Text>
        <Text mt={2}>{order.address}</Text>
        <Text>${order.deliveryFee}</Text>
        <Button onClick={() => acceptDelivery(order.id)}>
          Accept Delivery Request
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeliveryRequest;