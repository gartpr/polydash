import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';

const DeliveryRequest = ({ order }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text mt={2} fontWeight="bold">{order.title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontWeight="bold">{order.customerName}</Text>
        <Text mt={2}>{order.location}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeliveryRequest;