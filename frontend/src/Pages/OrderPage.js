import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Text,
  Grid,
  Heading,
  AspectRatio,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useCart, Cart } from '../Components/Cart';

/*const cartItems = [
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
];*/

const OrderPage = () => {
  const { cartItems, addToCart, getCartTotal } = useCart();

  const [restaurants, setRestaurants] = useState([]);
  const restaurantCollectionRef = collection(db, 'restaurants');

  useEffect(() => {
    onSnapshot(restaurantCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRestaurants(data);
      console.log(data);
    });
  }, [db]);

  return (
    <Container maxW="unset" padding={0}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        marginX={2}
        marginY={2}
        gap={2}
      >
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            as={RouterLink}
            to={`/order/menu/${restaurant.id}`}
          >
            <Box
              key={restaurant.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <AspectRatio ratio={4 / 3}>
                <img src={restaurant.image} alt={restaurant.name} />
              </AspectRatio>
              <Box p="4">
                <Heading as="h3" size="md">
                  {restaurant.name}
                </Heading>
                <Text color="gray.500">{restaurant.cuisine}</Text>
                <Text mt={2}>{restaurant.description}</Text>
              </Box>
            </Box>
          </Link>
        ))}
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          getCartTotal={getCartTotal}
        />
      </Grid>
    </Container>
  );
};

export default OrderPage;
