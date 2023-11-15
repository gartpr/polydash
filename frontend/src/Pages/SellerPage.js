import React from 'react';
import { Box, Center, VStack, HStack, Button, Flex, Text, Accordion}  from '@chakra-ui/react';
import SellerRequest from '../Components/SellerRequest';

const SellerPage = () => {
    const orderRequests = [
        {
          id: 1,
          title: 'Order #001',
          customerName: 'Bob Smith',
          details: '2x Pizza, 1x Soda',
        },
        {
          id: 2,
          title: 'Order #002',
          customerName: 'John B',
          details: '1x Burger, 1x Fries',
        },
        {
          id: 3,
          title: 'Order #003',
          customerName: 'Alexius Buntaran ',
          details: '1x Chicken Tenders, 1x Fries, 1x Ranch',
        },
        // ... more orders
      ];

    return (
    <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
      <VStack spacing={8} align="stretch" maxWidth="container.xl" mx="auto" width="full">
        <Text fontSize="4xl" fontWeight="bold" color="#154734">
          Restaurants
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
          Active Order Requests
        </Text>
        <Accordion allowMultiple width="full" fontSize="lg">
          {orderRequests.map((request) => (
            <SellerRequest key={request.id} order={request} />
          ))}
        </Accordion>
      </VStack>
    </Flex>
    );
  };
  
export default SellerPage;