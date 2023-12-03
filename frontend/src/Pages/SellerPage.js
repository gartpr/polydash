import React, { useState, useEffect } from 'react';
import { VStack, Flex, Text, Box, Accordion, Select } from '@chakra-ui/react';
import SellerRequest from '../Components/SellerRequest';
import SellerSearchBar from '../Components/SellerSearchBar';
import { db } from "../firebase-config";
import { collection, getDocs, getDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";

const SellerPage = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const [pastOrderRequests, setPastOrderRequests] = useState([]);
  const [activeOrderRequests, setActiveOrderRequests] = useState([]);
  const [newOrderRequests, setNewOrderRequests] = useState([]);
  const [selectedSection, setSelectedSection] = useState("new");

  useEffect(() => {
    const unsubscribeFromOrders = onSnapshot(collection(db, "orders"), (ordersSnapshot) => {
      const fetchOrders = async () => {
        const ordersWithDetails = await Promise.all(ordersSnapshot.docs.map(async (orderDoc) => {
          const orderData = orderDoc.data();
          const itemsSnapshot = await getDocs(collection(db, "orders", orderDoc.id, "items"));
          const items = itemsSnapshot.docs.map((itemDoc) => ({
            ...itemDoc.data(),
            itemId: itemDoc.id,
          }));
          let restaurantData = null;
          if (orderData.restaurantId) {
            const restaurantRef = doc(db, "restaurants", orderData.restaurantId);
            const restaurantSnapshot = await getDoc(restaurantRef);
            restaurantData = restaurantSnapshot.exists() ? restaurantSnapshot.data() : null;
          }

          if (orderData.status === "Not Received Yet") {
            await updateOrderStatus(orderDoc.id, "Received");
            orderData.status = "Received";
          }

          return {
            ...orderData,
            id: orderDoc.id,
            items,
            restaurant: restaurantData,
          };
        }));
        console.log(ordersWithDetails)
        setOrderRequests(ordersWithDetails);
      };

      fetchOrders().catch(console.error);
    });

    return unsubscribeFromOrders;
  }, []);

  useEffect(() => {
    const newOrders = [];
    const activeOrders = [];
    const pastOrders = [];

    orderRequests.forEach((order) => {
      if (order.status === 'Received') {
        newOrders.push(order);
      } else if (order.status === 'Ready' || order.status === 'Cancelled') {
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

    if (['Confirmed', 'Preparing', 'Ready'].includes(newStatus)) {
      setNewOrderRequests((currentOrders) =>
        currentOrders.filter((order) => order.id !== orderId)
      );
      setActiveOrderRequests((currentOrders) => [...currentOrders, updatedOrder]);
    }
  
    // Check if the order should be moved to 'New Order Requests'
    if (newStatus === 'Received') {
      setActiveOrderRequests((currentOrders) =>
        currentOrders.filter((order) => order.id !== orderId)
      );
      setNewOrderRequests((currentOrders) => [...currentOrders, updatedOrder]);
    }
  
    // Check if the order should be moved to 'Past Order Requests'
    if (['Picked Up', 'Cancelled'].includes(newStatus)) {
      setActiveOrderRequests((currentOrders) =>
        currentOrders.filter((order) => order.id !== orderId)
      );
      setPastOrderRequests((currentOrders) => [...currentOrders, updatedOrder]);
    }
  
    // Update the order in pastOrderRequests if the status changes from 'Ready' to 'Picked Up'
    setPastOrderRequests((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, ...updatedOrder } : order
      )
    );
  };

  const handleSearchOrders = (filters) => {
    let filteredOrders = [];
    if (selectedSection === 'new') {
      filteredOrders = newOrderRequests;
    }
    else if (selectedSection === 'active') {
      filteredOrders = activeOrderRequests;
    }
    else {
      filteredOrders = pastOrderRequests;
    }
    filteredOrders = filteredOrders
      .filter((order) => {
        // Check if the order number or user name contains the search query
        const queryMatch =
          (String(order.number)).includes(filters.query) ||
          (order.customerName.toLowerCase().includes(filters.query.toLowerCase()));
  
        // Check if the order status matches the selected status
        const statusMatch =
          filters.status === "" || order.status === filters.status;
  
        // Check if the order price is within the selected price range
        const priceRange = getPriceRange(filters.priceRange);
        const priceRangeMatch =
          priceRange === "" ||
          (order.totalPrice >= priceRange.min &&
            order.totalPrice <= priceRange.max);
  
        return queryMatch && statusMatch && priceRangeMatch;
      });
  
    switch (selectedSection) {
      case 'new':
        setNewOrderRequests(filteredOrders);
        break;
      case 'active':
        setActiveOrderRequests(filteredOrders);
        break;
      default:
        setPastOrderRequests(filteredOrders);
    }
  };

  const handleClearFilters = () => {
    switch (selectedSection) {
      case 'new':
        setNewOrderRequests(orderRequests.filter((order) => order.status === 'Received'));
        break;
      case 'active':
        setActiveOrderRequests(orderRequests.filter((order) => ['Confirmed', 'Preparing', 'Ready'].includes(order.status)));
        break;
      case 'past':
        setPastOrderRequests(orderRequests.filter((order) => ['Picked Up', 'Cancelled'].includes(order.status)));
        break;
      default:
        break;
    }
  };

    // Helper function to get the price range as an object
    function getPriceRange(selectedPriceRange) {
      switch (selectedPriceRange) {
        case "$1-$5":
          return {min: 1, max: 5};
        case "$5-$15":
          console.log("good");
          return {min: 5, max: 15};
        case "$15-$25":
          return {min: 15, max: 52};
        case "$25+":
          return {min: 25, max: Infinity};
        default:
          return {min: 0, max: Infinity}; // Handle no price range selected
      }
    };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
      <VStack spacing={6} align="stretch" maxWidth="container.xl" mx="auto" width="full">
        <Text as='u' fontSize="4xl" fontWeight="bold" color="#154734">
          Restaurants
        </Text>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
            {selectedSection === 'new'
              ? "New Order Requests"
              : selectedSection === 'active'
              ? "Active Order Requests"
              : "Past Order Requests"
            }
          </Text>
          <Box display="flex" alignItems="center" px={2}>
            <Text marginRight="1rem">Show:</Text>
            <Select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              width="fit-content"
            >
              <option value="new">New Order Requests</option>
              <option value="active">Active Order Requests</option>
              <option value="past">Past Order Requests</option>
            </Select>
          </Box>
          <SellerSearchBar onSearch={handleSearchOrders} onClear={handleClearFilters} selectedSection={selectedSection} />
          {selectedSection === 'new' && newOrderRequests.length > 0 ? (
            <Accordion allowMultiple width="full" fontSize="lg">
              {newOrderRequests.map((request) => (
                <SellerRequest
                  key={request.id}
                  order={request}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  isPastOrder={false}
                />
              ))}
            </Accordion>
          ) : selectedSection === 'active' && activeOrderRequests.length > 0 ? (
            <Accordion allowMultiple width="full" fontSize="lg">
              {activeOrderRequests.map((request) => (
                <SellerRequest
                  key={request.id}
                  order={request}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  isPastOrder={false}
                />
              ))}
            </Accordion>
          ) : selectedSection === 'past' && pastOrderRequests.length > 0 ? (
            <Accordion allowMultiple width="full" fontSize="lg">
              {pastOrderRequests.map((request) => (
                <SellerRequest
                  key={request.id}
                  order={request}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  isPastOrder={true}
                />
              ))}
            </Accordion>
          ) : (
            <Text ml={2}> No {selectedSection === 'new' ? "New" : selectedSection === 'active' ? "Active" : "Past"} Orders. </Text>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};

export default SellerPage;
