import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Text } from '@chakra-ui/react';

const OrderTracking = () => {
    const { orderId } = useParams();

    return (
        <Container maxW="container.md">
            <Text> Awaiting order status for order: {orderId} </Text>
        </Container>
    );
};

export default OrderTracking;