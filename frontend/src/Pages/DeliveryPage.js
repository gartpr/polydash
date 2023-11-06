import React from 'react';
import { Box, Center, VStack, HStack, Button, Flex, Text, Accordion}  from '@chakra-ui/react';
import DeliveryRequest from '../Components/DeliveryRequest';

const DeliveryPage = () => {
    const orderRequests = [
        {
          id: 1,
          title: 'Order #001',
          customerName: 'Bob Smith',
          location: 'PCV - Foxen',
        },
        {
          id: 2,
          title: 'Order #002',
          customerName: 'John B',
          location: 'PCV - Estrella',
        },
        {
          id: 3,
          title: 'Order #003',
          customerName: 'Alexius Buntaran ',
          location: 'Frank E. Piling',
        },
        // ... more orders
      ];

    return (
    <Flex direction="column" align="stretch" minH="100vh" pt={8} width="full">
      <VStack spacing={8} align="stretch" maxWidth="container.xl" mx="auto" width="full">
        <Text fontSize="4xl" fontWeight="bold" color="#154734">
          Active Delivery
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="#3A913F">
          Active Delivery Requests
        </Text>
        <Accordion allowMultiple width="full" fontSize="lg">
          {orderRequests.map((request) => (
            <DeliveryRequest key={request.id} order={request} />
          ))}
        </Accordion>
      </VStack>
    </Flex>
    );
}

export default DeliveryPage;