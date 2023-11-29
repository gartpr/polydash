import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  Box,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import SellerRequestItem from './SellerRequestItem';

const SellerRequest = ({ order, onDenyOrder, onApproveOrder, isPastOrder }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="semibold">{order.title} - {order.status}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontWeight="bold">{order.restaurantName}</Text> 
        <Text mt= {2}>Customer Name: {order.customerName}</Text>
        <Text mt={2}>Total Price: ${order.totalPrice}</Text>
        <Accordion allowMultiple width="full" fontSize="lg">
          {order.items.map((item) => (
            <SellerRequestItem key={item.itemName} item={item} />
          ))}
        </Accordion>
        {!isPastOrder && (
          <Flex justifyContent="flex-end" mt={4} pr={4}>
            <Button colorScheme="green" onClick={onApproveOrder} mr={2}>Approve</Button>
            <Button colorScheme="red" onClick={onDenyOrder}>Deny</Button>
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

// List of Orders
  // Restaurant Name
  // Customer Name
  // Total Price of Order
  // List of Items
    // Name
    // Quantity
    // Price
    // Comments
  // Comments
  //Status

export default SellerRequest;