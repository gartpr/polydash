import React, {useState, useEffect} from 'react';
import { VStack, Flex, Text, Box, Accordion}  from '@chakra-ui/react';
import SellerRequest from '../Components/SellerRequest';
import {db} from "../firebase-config"
import { collection, getDocs, getDoc, updateDoc, doc, onSnapshot } from "firebase/firestore"

const SellerPage = () => {
    const [orderRequests, setOrderRequests] = useState([]);
    const [pastOrderRequests, setPastOrderRequests] = useState([]);
    const [activeOrderRequests, setActiveOrderRequests] = useState([]);
    const [newOrderRequests, setNewOrderRequests] = useState([]);
    
    useEffect(() => {
      const unsubscribeFromOrders = onSnapshot(collection(db, "orders"), (ordersSnapshot) => {
        const fetchOrders = async () => {
          const ordersWithDetails = await Promise.all(ordersSnapshot.docs.map(async (orderDoc) => {
            const orderData = orderDoc.data();

            // Fetch items for the order
            const itemsSnapshot = await getDocs(collection(db, "orders", orderDoc.id, "items"));
            const items = itemsSnapshot.docs.map((itemDoc) => ({
              ...itemDoc.data(),
              itemId: itemDoc.id,
            }));
            // Fetch the restaurant details
            let restaurantData = null;
            if (orderData.restaurantId) {
              const restaurantRef = doc(db, "restaurants", orderData.restaurantId);
              const restaurantSnapshot = await getDoc(restaurantRef);
              restaurantData = restaurantSnapshot.exists() ? restaurantSnapshot.data() : null;
            }
  
            let userData = null;
            if (orderData.uid) {
              const userRef = doc(db, "users", orderData.uid);
              const userSnapshot = await getDoc(userRef);
              userData = userSnapshot.exists() ? userSnapshot.data() : null;
            }

            // Immediately update the status in Firestore if it's "Not Received Yet"
            if (orderData.status === "Not Received Yet") {
              await updateOrderStatus(orderDoc.id, "Received");
              orderData.status = "Received"; // Reflect the updated status
            }

            return {
              ...orderData,
              id: orderDoc.id,
              items,
              user: userData,
              restaurant: restaurantData,
            };
          }));

          setOrderRequests(ordersWithDetails);
        };

        fetchOrders().catch(console.error);
      });

      // Return the unsubscribe function provided by onSnapshot
      return unsubscribeFromOrders;
    }, []);

    useEffect(() => {
      const newOrders = [];
      const activeOrders = [];
      const pastOrders = [];

      orderRequests.forEach((order) => {
        if (order.status === 'Received') {
          newOrders.push(order);
        } else if (order.status === 'Out for Delivery' || order.status === 'Cancelled') {
          pastOrders.push(order);
        } else {
          activeOrders.push(order);
        }
      });

      setNewOrderRequests(newOrders);
      setActiveOrderRequests(activeOrders);
      setPastOrderRequests(pastOrders);
    }, [orderRequests]);
    
    const updateOrderStatus = async (orderId, newStatus) => {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      return { id: orderId, status: newStatus };
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrderRequests((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        )
      );
    };

    return (
    <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
      <VStack spacing={6} align="stretch" maxWidth="container.xl" mx="auto" width="full">
        <Text as='u' fontSize="4xl" fontWeight="bold" color="#154734">
          Restaurants
        </Text>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              New Order Requests
            </Text>
            {newOrderRequests.length > 0 ? (
              <Accordion allowMultiple width="full" fontSize="lg">
                {newOrderRequests.map((request) => (
                  <SellerRequest key={request.id} 
                                order={request} 
                                onUpdateOrderStatus={handleUpdateOrderStatus}
                                isPastOrder={false}/>
                ))}
              </Accordion>
            ) : (
              <Text ml={2}> No New Orders. </Text>
            )}
        </Box>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              Active Order Requests
            </Text>
            {activeOrderRequests.length > 0 ? (
              <Accordion allowMultiple width="full" fontSize="lg">
                {activeOrderRequests.map((request) => (
                  <SellerRequest key={request.id} 
                                order={request} 
                                onUpdateOrderStatus={handleUpdateOrderStatus}
                                isPastOrder={false}/>
                ))}
              </Accordion>
            ) : (
              <Text ml={2}> No Active Orders. </Text>
            )}
        </Box>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              Past Order Requests
            </Text>
            {pastOrderRequests.length > 0 ? (
              <Accordion allowMultiple width="full" fontSize="lg">
                {pastOrderRequests.map((request) => (
                  <SellerRequest key={request.id} 
                                order={request} 
                                onUpdateOrderStatus={handleUpdateOrderStatus}
                                isPastOrder={true}/>
                ))}
              </Accordion>
            ) : (
              <Text ml={2}> No Past Orders. </Text>
            )}
        </Box>
      </VStack>
    </Flex>
    );
  };
  
export default SellerPage;
