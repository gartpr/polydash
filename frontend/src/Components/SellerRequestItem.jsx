import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';

const SellerRequestItem = ({ item, index }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="semibold">
              Item #{index + 1}: {item.itemName}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text mt={2}>Quantity: {item.quantity}</Text>
        <Text mt={2}>Cost: ${item.itemCost}</Text>
        <Text mt={2}>Additional Item Comments: {item.itemComments}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SellerRequestItem;
