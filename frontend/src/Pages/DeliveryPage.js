import React, { useEffect, useState } from 'react';
import { Box, Center, VStack, HStack, Button, Flex, Text, Accordion } from '@chakra-ui/react';
import DeliveryRequest from '../Components/DeliveryRequest';
import SellerRequest from '../Components/SellerRequest';
import { db } from "../firebase-config"
import { collection, getDocs, getDoc, updateDoc, doc, onSnapshot } from "firebase/firestore"

const DeliveryPage = () => {
    const [orderRequests, setOrderRequests] = useState([]);
    const orderCollectionRef = collection(db, "orders");

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
  
    //   useEffect(() => {
    //     const newOrders = [];
    //     const activeOrders = [];
    //     const pastOrders = [];
  
    //     orderRequests.forEach((order) => {
    //       if (order.status === 'Received') {
    //         newOrders.push(order);
    //       } else if (order.status === 'Out for Delivery' || order.status === 'Cancelled') {
    //         pastOrders.push(order);
    //       } else {
    //         activeOrders.push(order);
    //       }
    //     });
  
    //     setOrderRequests(activeOrders);
    //   }, [orderRequests]);
      
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
            Delivery Requests
        </Text>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
                Active Delivery Requests
            </Text>
            <Accordion allowMultiple width="full" fontSize="lg">
                {orderRequests.map((request) => (
                    <DeliveryRequest key={request.id} 
                                order={request}/>
                ))}
                </Accordion>
            {/* {orderRequests.length > 0 ? (
                <Accordion allowMultiple width="full" fontSize="lg">
                {orderRequests.map((request) => (
                    <SellerRequest key={request.id} 
                                order={request} 
                                onUpdateOrderStatus={handleUpdateOrderStatus}
                                isPastOrder={false}/>
                ))}
                </Accordion>
            ) : (
                <Text ml={2}> No Active Orders. </Text>
            )} */}
        </Box>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              Accepted Order Requests
            </Text>
            <Accordion allowMultiple width="full" fontSize="lg">
                {orderRequests.map((request) => (
                    <DeliveryRequest key={request.id} 
                                order={request}/>
                ))}
                </Accordion>
            {/* {pastOrderRequests.length > 0 ? (
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
            )} */}
        </Box>
        </VStack>
    </Flex>
    );
}

export default DeliveryPage;