import React, { useState, useEffect } from 'react';
import { Box, Center, VStack, HStack, Button, Text}  from '@chakra-ui/react';
import logo from '../Images/polydashlogogreen.png';
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { database } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    signOut(database).then(val =>{
      history('/signup')
    })
  }
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
            <HStack spacing={8}>
              <Link to="/delivery">
                <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline">
                  Deliver
                </Button>
              </Link>
              <Link to="/order">
                <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline">
                  Order
                </Button>
              </Link>
              <Link to="/seller">
                <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline">
                  Sell
                </Button>
              </Link>
              {isAuthenticated && (
                <Button fontSize="2xl" size="lg" colorScheme="teal" variant="outline" onClick={handleClick}>
                  SignOut
                </Button>
              )}
            </HStack>
          </VStack>
        </Center>
      </div>
    );
  };
  
export default Home;