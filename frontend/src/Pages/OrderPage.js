import React, { useEffect, useState } from 'react';
import { Box, Container, Text, Grid, Heading, AspectRatio, Link, HStack}  from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import market from '../Images/Campus_Market.jpg';
import starby from '../Images/starbys.jpg';
import subway from '../Images/subway.jpg';
import {db} from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"

const restaurantsHardCoded = [
    
    {
        id: 1,
        name: 'Campus Market',
        cuisine: 'Grill',
        description: 'Food fried haha.',
        image: market,
    },
    {
        id: 2,
        name: 'Subway',
        cuisine: 'subs',
        description: 'sambdwich',
        image: subway,
    },
    {
        id: 3,
        name: 'Starbucks',
        cuisine: 'coffee',
        description: 'coffeeeeeee',
        image: starby,
    },
    {
        id: 4,
        name: 'boof',
        cuisine: 'aaf',
        description: 'ooog',
        image: starby,
    }
];

const cartItems = [
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
];

const OrderPage = () => {
    const [restaurants,setRestaurants] = useState([])
        const restaurantCollectionRef = collection(db,"restaurants")

        useEffect(() => {
            const getRestaurants = async() => {
            const data = await getDocs(restaurantCollectionRef);
            console.log(data)
            setRestaurants(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
            };
            getRestaurants();
        }, []);
    return (
        <Container maxW="unset" padding={0}>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" 
                marginX={2}
                marginY={2}
                gap={2}
            >
            {restaurants.map((restaurant) => (
                <Link
                key={restaurant.id}
                as={RouterLink} 
                to={`/order/menu`}
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

export default OrderPage;