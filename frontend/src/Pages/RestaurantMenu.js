import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDoc, onSnapshot, doc } from 'firebase/firestore';
import {
  Container,
  Text,
  HStack,
  Button,
  Grid,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useCart, Cart } from '../Components/Cart';

async function getRestaurantName(restaurantId) {
  try {
    const restaurantRef = doc(db, 'restaurants', restaurantId);
    const restaurantDoc = await getDoc(restaurantRef);

    if (restaurantDoc.exists()) {
      return restaurantDoc.data().name;
    } else {
      console.log('Restaurant not found');
    }
  } catch (error) {
    console.error('Error fetching restaurant data:', error.message);
  }
}

const RestaurantMenu = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const { restaurantId } = useParams();
  const { cartItems, addToCart, getCartTotal } = useCart();

  const [menuItems, setmenuItems] = useState([]);
  const menuCollectionRef = collection(db, `restaurants/${restaurantId}/menu`);

  useEffect(() => {
    onSnapshot(menuCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setmenuItems(data);
      console.log(data);
    });
    const fetchRestaurantName = async () => {
      const name = await getRestaurantName(restaurantId);
      setRestaurantName(name);
    };

    fetchRestaurantName();
  }, [db]);

  // Mock data for the restaurant and its menu items
  //const restaurantName = 'Sample Restaurant';

  return (
    <Container maxW="container.lg">
      <Heading as="h1" size="xl" mt={4}>
        {restaurantName}
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4}
        mt={4}
      >
        {menuItems.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p="4">
              <Heading as="h2" size="md">
                {' '}
                {item.itemName}{' '}
              </Heading>
              <Text fontSize="lg">${item.itemCost.toFixed(2)}</Text>
              <HStack mt={2}>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => addToCart(item, restaurantId)}
                >
                  {' '}
                  Add to Cart{' '}
                </Button>
              </HStack>
            </Box>
          </Box>
        ))}
        <Cart cartItems={cartItems} getCartTotal={getCartTotal} />
      </Grid>
    </Container>
  );
};

export default RestaurantMenu;
