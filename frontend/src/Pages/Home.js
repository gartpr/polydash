import React, { useState, useEffect } from 'react';
import { Box, Center, VStack, HStack, Button, Text } from '@chakra-ui/react';
import logo from '../Images/polydashlogogreen.png';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData.role);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderButtonsBasedOnRole = () => {
    if (!user) {
      // User is not logged in, render all three buttons
      return (
        <HStack spacing={8}>
          <Link to="/signin">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Order
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Deliver
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Sell
            </Button>
          </Link>
        </HStack>
      );
    }

    // User is logged in, show only the corresponding button based on role
    switch (user) {
      case 'customer':
        return (
          <Link to="/order">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Order
            </Button>
          </Link>
        );
      case 'driver':
        return (
          <Link to="/delivery">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Deliver
            </Button>
          </Link>
        );
      case 'restaurant':
        return (
          <Link to="/seller">
            <Button
              fontSize="2xl"
              size="lg"
              colorScheme="teal"
              variant="outline"
            >
              Sell
            </Button>
          </Link>
        );
      default:
        // Handle unknown role or any other cases
        return null;
    }
  };

  return (
    <div>
      <Center h="100vh">
        <VStack spacing={8}>
          <Box>
            <img src={logo} alt="App Logo" width="400" />
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="#154734">
              We Deliver, You Devour
            </Text>
          </Box>
          <HStack spacing={8}>{renderButtonsBasedOnRole()}</HStack>
        </VStack>
      </Center>
    </div>
  );
};

export default Home;
