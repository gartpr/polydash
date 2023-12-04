import React, { useState, useEffect } from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const DeliveryRequest = ({ order }) => {
  const acceptDelivery = async (orderID) => {
    const orderDocRef = doc(db, 'orders', orderID);
    await updateDoc(orderDocRef, {
      status: 'Driver Accepted',
    });
  };

  const pickedUpDelivery = async (orderID) => {
    const orderDocRef = doc(db, 'orders', orderID);
    await updateDoc(orderDocRef, {
      status: 'Out for Delivery',
    });
  };

  const deliveredDelivery = async (orderID) => {
    const orderDocRef = doc(db, 'orders', orderID);
    await updateDoc(orderDocRef, {
      status: 'Delivered',
    });
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

  const ButtonSelection = (orderStatus) => {
    switch (orderStatus.orderStatus) {
      case 'Driver Accepted':
        return (
          <Button
            colorScheme="green"
            onClick={() => pickedUpDelivery(order.id)}
          >
            Picked Up
          </Button>
        );
      case 'Out for Delivery':
        return (
          <Button
            colorScheme="green"
            onClick={() => deliveredDelivery(order.id)}
          >
            Delivered
          </Button>
        );
      case 'Delivered':
        return <div></div>;
      default:
        return (
          <Button colorScheme="green" onClick={() => acceptDelivery(order.id)}>
            Accept
          </Button>
        );
    }
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="bold" color="#B38F4F">
              Pickup Location:
            </Text>
            <Text mt={2} fontWeight="bold" mb={10}>
              {restaurant.name} - {restaurant.adress}
            </Text>
            <Text mt={2} fontWeight="bold" color="#B38F4F">
              Destination:
            </Text>
            <Text mt={2} fontWeight="bold">
              {order.address}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontWeight="bold" mt={10} color="#B38F4F">
          Customer Name:
        </Text>
        <Text mb={5}>{order.customerName}</Text>
        <Text fontWeight="bold" color="#B38F4F">
          Resteraunt:
        </Text>
        <Text mb={5}>{restaurant.name}</Text>
        <Text fontWeight="bold" color="#B38F4F">
          Delivery Fee:
        </Text>
        <Text mb={5}>${order.deliveryFee}</Text>
        <ButtonSelection orderStatus={order.status} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeliveryRequest;
