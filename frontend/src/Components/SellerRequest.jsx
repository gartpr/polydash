import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  Box,
  Text,
  Select,
  Flex,
} from '@chakra-ui/react';
import SellerRequestItem from './SellerRequestItem';

const SellerRequest = ({ order, onUpdateOrderStatus, isPastOrder }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Define a unique key for each accordion item
  const accordionKey = `accordion-${order.id}`;

  // Toggle the accordion open/closed state
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text as='i' mt={2} fontWeight="semibold">Order #{order.number} - Status: {order.status}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      <Text fontWeight="bold">Order Information:</Text>
        <Text mt={2}>Restaurant Name: {order.restaurant ? order.restaurant.name : 'N/A'}</Text>
        <Text mt= {2}>Customer Name: {order.customerName}</Text>
        <Text mt= {2}>Customer Email: {order.email}</Text>
        <Text mt= {2}>Delivery Address: {order.address}</Text>
        <Text mt= {2}>Payment Method: {order.paymentInfo}</Text>
        <Text mt={2}>Total Price: ${order.totalPrice}</Text>
        <Text mt={2}>Additional Comments: {order.comments}</Text>
        <Accordion allowMultiple width="full" fontSize="lg">
          {order.items.map((item, index) => (
            <SellerRequestItem key={item.itemName} item={item} index={index} />
          ))}
        </Accordion>
        {!isPastOrder && (
          <Flex justifyContent="space-between" mt={4} alignItems="center">
            <Box>
              <Text fontWeight="bold">Update Status:</Text>
              <Select onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)} value={order.status}>
                <option value="Received">Received</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </Box>
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SellerRequest;