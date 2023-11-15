import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';

const SellerRequest = ({ order }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="semibold">{order.title}</Text>
            <Text mt={2}>{order.status}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontWeight="bold">{order.restaurantName}</Text> 
        <Text mt= {2}>Customer: {order.customerName}</Text>
        <Text mt={2}>Order: {order.details}</Text>
        <Text mt={2}>{order.title}</Text>
            <Text mt={2}>{order.status}</Text>
            <Text mt={2}>{order.restaurantName}</Text>
            <Text mt={2}>{order.customerName}</Text>
            <Text mt={2}>{order.totalPrice}</Text>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text mt={2} fontWeight="semibold">{order.title}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
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