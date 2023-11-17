import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';

const SellerRequestItem = ({ item }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="semibold">Item #{item.itemId}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text mt= {2}>Name: {item.itemName}</Text> 
        <Text mt= {2}>Quantity: {item.itemQuantity}</Text>
        <Text mt={2}>Cost: ${item.itemCost}</Text>
        <Text mt={2}>Additional Comments: {item.itemComments}</Text>
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

export default SellerRequestItem;