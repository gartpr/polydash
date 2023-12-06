import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Text,
  HStack,
  Button,
  Box,
  Progress,
} from '@chakra-ui/react';
import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router'

const OrderBox = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Out for delivery':
        return 'green';
      case 'Delivered':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <Box
      key={order.id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      mb="4"
    >
      <Text fontSize="lg">Order #{order.id}</Text>
      <Text fontSize="md">Restaurant: {order.restaurantName}</Text>
      <Text fontSize="md">Price: ${order.totalPrice}</Text>
      <HStack mt={2}>
        <Progress
          flex="1"
          hasStripe
          value={
            order.status === 'Cancelled'
              ? 100
              : order.status === 'Not Received Yet'
              ? 0
              : order.status === 'Received'
              ? 10
              : order.status === 'Confirmed'
              ? 20
              : order.status === 'Preparing'
              ? 30
              : order.status === 'Ready'
              ? 40
              : order.status === 'Driver Accepted'
              ? 50
              : order.status === 'Out for delivery'
              ? 80
              : order.status === 'Delivered'
              ? 100
              : 0
          }
          colorScheme={getStatusColor(order.status)}
          size="sm"
          borderRadius="full"
        />
      </HStack>
      <Text fontSize="md" mt={2}>
        Status: {order.status}
      </Text>
    </Box>
  );
};

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const user = useAuth();
  const navigate = useNavigate()

  const fetchOrders = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const orderIds = userDoc.exists() ? userDoc.data().orders || [] : [];

      const ordersCollectionRef = collection(db, 'orders');
      const ordersData = await Promise.all(
        orderIds.map(async (orderId) => {
          const orderDoc = await getDoc(doc(ordersCollectionRef, orderId));
          return orderDoc.exists() ? { id: orderId, ...orderDoc.data() } : null;
        }),
      );
      setOrders(ordersData.filter((order) => order !== null));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [user]);

  const handleRefresh = () => {
    fetchOrders();
    navigate(0);
  };

  useEffect(() => {
    fetchOrders();
  }, [user, fetchOrders]);

  return (
    <Container maxW="container.lg" mt={4}>
      <HStack mb={4}>
        <Button onClick={handleRefresh}>Refresh</Button>
      </HStack>
      {orders.map((order) => (
        <OrderBox key={order.id} order={order} />
      ))}
    </Container>
  );
};

export default OrderTrackingPage;
