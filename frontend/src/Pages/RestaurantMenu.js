import React, { useState } from 'react';
import {
  Container,
  Text,
  HStack,
  Button,
  Grid,
  Box,
  Heading,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const RestaurantMenu = () => {
  // Mock data for the restaurant and its menu items
const restaurantName = 'Sample Restaurant';
const menuItems = [
    { id: 1, name: 'Burger', price: 9.99 },
    { id: 2, name: 'Pizza', price: 12.99 },
    { id: 3, name: 'Pasta', price: 10.49 },
];

const [cartItems, setCart] = useState([
    {
      id: 1,
      name: 'Item 1',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Item 2',
      price: 7.49,
    },
  ]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart([...cartItems, item]);
  };

return (
    <Container maxW="container.lg">
        <Heading as="h1" size="xl" mt={4}>{restaurantName}</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} mt={4}>
            {menuItems.map((item) => (
                <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Box p="4">
                        <Heading as="h2" size="md"> {item.name} </Heading>
                        <Text fontSize="lg">${item.price.toFixed(2)}</Text>
                        <HStack mt={2}>
                            <Button
                                size="sm"
                                colorScheme="teal"
                                onClick={() => addToCart(item)}
                            > Add to Cart </Button>
                        </HStack>
                    </Box>
                </Box>
            ))}

                <Link as={RouterLink} to="/order/form">
                    <Box borderWidth="1px" borderRadius="lg" p={2} maxW="300px">
                        <Text fontSize="lg" textAlign="center">Cart Summary</Text>
                        {cartItems.map((item) => (
                            <HStack key={item.id} justifyContent="space-between">
                                <Text>{item.name}</Text>
                                <Text>${item.price.toFixed(2)}</Text>
                            </HStack>
                        ))}
                    <HStack justifyContent="space-between">
                        <Text>Total:</Text>
                        <Text>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</Text>
                    </HStack>
                    </Box>
                </Link>
        </Grid>
    </Container>
  );
};

export default RestaurantMenu;