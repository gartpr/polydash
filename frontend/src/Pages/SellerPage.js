import React, {useState, useEffect} from 'react';
import { VStack, Flex, Text, Box, Accordion, Button}  from '@chakra-ui/react';
import SellerRequest from '../Components/SellerRequest';
import {db} from "../firebase-config"
import { collection, getDocs,onSnapshot } from "firebase/firestore"


const SellerPage = () => {

    const [orderRequests, setOrderRequests] = useState([]);
    const orderCollectionRef = collection(db, "orders");

    useEffect(() => {
      const unsubscribe = onSnapshot(orderCollectionRef, async (querySnapshot) => {
        const orderRequestsData = [];
  
          for (const doc of querySnapshot.docs) {
            
            const orderData = doc.data();
            if (orderData.status === "Pending") {
              const itemsCollectionRef = collection(orderCollectionRef, doc.id, 'items');
              const itemsSnapshot = await getDocs(itemsCollectionRef);
              const itemsData = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());
      
              orderRequestsData.push({ ...orderData, items: itemsData, id: doc.id });
            }
          }
        setOrderRequests(orderRequestsData);
      });
    }, [db]);
  
    const [pastOrderRequests, setPastOrderRequests] = useState([]);

    /**
    const [orderRequests, setOrderRequests] = useState([{
      id: 1,
      title: 'Order #001',
      status: "Pending",
      restaurantName: "Mustang Lanes",
      customerName: 'Bob Smith',
      totalPrice: 12.45,
      comments: "",
      items: [
        {
          itemId: 1,
          itemName: "Margharita Pizza",
          itemQuantity: 1,
          itemCost: 12.45,
          itemComments: ""
        },
      ]
    },
    {
      id: 2,
      title: 'Order #002',
      status: "Pending",
      restaurantName: "Vista Grande",
      customerName: 'John B',
      totalPrice: 14.54,
      comments: "",
      items: [
        {
          itemId: 1,
          itemName: "Orange Chicken w/ Rice",
          itemQuantity: 1,
          itemCost: 10.00,
          itemComments: ""
        },
        {
          itemId: 2,
          itemName: "Tiramisu",
          itemQuantity: 1,
          itemCost: 4.54,
          itemComments: "extra care"
        }
      ]
    },
    {
      id: 3,
      title: 'Order #003',
      status: "Pending",
      restaurantName: "Campus Market",
      customerName: 'Alexius Buntaran',
      totalPrice: 9.95,
      comments: "bring a fork and napkin",
      items: [
        {
          itemId: 1,
          itemName: "Chicken Tenders w/ Fries",
          itemQuantity: 1,
          itemCost: 9.95,
          itemComments: ""
        },
        {
          itemId: 2,
          itemName: "Ranch",
          itemQuantity: 2,
          itemCost: 0.00,
          itemComments: ""
        }
      ]
    }]);
     */
    // const orderCollectionRef = collection(db,"orders")
    // useEffect(() => {
    //   const getOrders = async() => {
    //   const data = await getDocs(orderCollectionRef);
    //   console.log(data)
    //   setOrderRequests(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
    //   };
    //   getOrders();
    // }, []);

    const handleDenyOrder = (orderId) => {
      // Find the order that is being denied
      const orderToMove = orderRequests.find((order) => order.id === orderId);
      
      // Filter out the order from the current orderRequests
      const updatedOrderRequests = orderRequests.filter((order) => order.id !== orderId);
    
      // Update the states
      setOrderRequests(updatedOrderRequests);
      setPastOrderRequests((prevOrders) => [...prevOrders, {...orderToMove, status: "Denied"}]);
    };

    const handleApproveOrder = (orderId) => {
      // Find the order that is being approved
      const orderToMove = orderRequests.find((order) => order.id === orderId);
    
      // Filter out the order from the current orderRequests
      const updatedOrderRequests = orderRequests.filter((order) => order.id !== orderId);
    
      // Update the states
      setOrderRequests(updatedOrderRequests);
      setPastOrderRequests((prevOrders) => [...prevOrders, { ...orderToMove, status: "Approved" }]);
    };

    return (
    <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
      <VStack spacing={8} align="stretch" maxWidth="container.xl" mx="auto" width="full">
        <Text fontSize="4xl" fontWeight="bold" color="#154734">
          Restaurants
        </Text>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              Active Order Requests
            </Text>
            <Accordion allowMultiple width="full" fontSize="lg">
            
              {orderRequests.map((request) => (
                <SellerRequest key={request.id} 
                               order={request} 
                               onDenyOrder={() => handleDenyOrder(request.id)}
                               onApproveOrder={() => handleApproveOrder(request.id)}
                               isPastOrder={false}/>
              ))}
            </Accordion>
        </Box>
        <Box>
            <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
              Past Order Requests
            </Text>
            <Accordion allowMultiple width="full" fontSize="lg">
              {pastOrderRequests.map((request) => (
                <SellerRequest key={request.id} order={request} isPastOrder={true} />
              ))}
            </Accordion>
        </Box>
      </VStack>
    </Flex>
    );
  };
  
export default SellerPage;