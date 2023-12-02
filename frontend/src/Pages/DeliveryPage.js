import React, { useEffect, useState } from "react";
import { Box, VStack, Flex, Text, Accordion } from "@chakra-ui/react";
import { db } from "../firebase-config"
import { collection, onSnapshot } from "firebase/firestore"
import DeliveryRequest from "../Components/DeliveryRequest";

const DeliveryPage = () => {
    
    const [orderRequests, setOrderRequests] = useState([]);
    const [activeOrderRequests, setActiveOrderRequests] = useState([]);
    const [acceptedOrderRequests, setAcceptedOrderRequests] = useState([]);
    const [pickedUpOrderRequests, setPickedUpOrderRequests] = useState([]);
    const [deliveredOrderRequests, setDeliveredOrderRequests] = useState([]);

    useEffect(() => {
        const unsubscribeFromOrders = onSnapshot(collection(db, "orders"), (ordersSnapshot) => {
            const fetchOrders = async () => {
                const ordersWithDetails = await Promise.all(ordersSnapshot.docs.map(async (orderDoc) => {
                    const orderData = orderDoc.data();
        
                    return {
                        ...orderData,
                        id: orderDoc.id,
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
        const activeOrders = [];
        const acceptedOrders = [];
        const pickedUpOrders = [];
        const deliveredOrders = [];
        orderRequests.forEach((order) => {
            if (order.status === "Accepted") {
                acceptedOrders.push(order);
            } else if (order.status === "Picked Up") {
                pickedUpOrders.push(order);
            } else if (order.status === "Delivered") {
                deliveredOrders.push(order);
            } else {
                activeOrders.push(order);
            }
        });

        setActiveOrderRequests(activeOrders);
        setAcceptedOrderRequests(acceptedOrders);
        setPickedUpOrderRequests(pickedUpOrders);
        setDeliveredOrderRequests(deliveredOrders);
    }, [orderRequests]);

    return (
        <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
            <VStack spacing={6} align="stretch" maxWidth="container.xl" mx="auto" width="full">
                <Text as="u" fontSize="4xl" fontWeight="bold" color="#154734">
                    Delivery Requests
                </Text>
                <Box>
                    <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
                        Active Requests
                    </Text>
                    {activeOrderRequests.length > 0 ? (
                        <Accordion allowMultiple width="full" fontSize="lg">
                            {activeOrderRequests.map((request) => (
                                <DeliveryRequest key={request.id} 
                                                order={request}/>
                            ))}
                        </Accordion>
                    ) : (
                        <Text ml={2}>No Active Requests</Text>
                    )}
                </Box>
                <Box>
                    <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
                        Accepted Requests
                    </Text>
                    {acceptedOrderRequests.length > 0 ? (
                        <Accordion allowMultiple width="full" fontSize="lg">
                            {acceptedOrderRequests.map((request) => (
                                <DeliveryRequest key={request.id} 
                                                order={request}/>
                            ))}
                        </Accordion>
                    ) : (
                        <Text ml={2}>No Accepted Requests</Text>
                    )}
                </Box>
                <Box>
                    <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
                        Picked Up Requests
                    </Text>
                    {pickedUpOrderRequests.length > 0 ? (
                        <Accordion allowMultiple width="full" fontSize="lg">
                            {pickedUpOrderRequests.map((request) => (
                                <DeliveryRequest key={request.id} 
                                                order={request}/>
                            ))}
                        </Accordion>
                    ) : (
                        <Text ml={2}>No Picked Up Requests</Text>
                    )}
                </Box>
                <Box>
                    <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
                        Delivered Requests
                    </Text>
                    {deliveredOrderRequests.length > 0 ? (
                        <Accordion allowMultiple width="full" fontSize="lg">
                            {deliveredOrderRequests.map((request) => (
                                <DeliveryRequest key={request.id} 
                                                order={request}/>
                            ))}
                        </Accordion>
                    ) : (
                        <Text ml={2} mb={10}>No Delivered Requests</Text>
                    )}
                </Box>
            </VStack>
        </Flex>
    );
}

export default DeliveryPage;