import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  Stack,
  Link,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../Images/polydashlogo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { database } from '../firebase-config';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  
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
      history('/signin')
    })
  };

  return (
    <Box mb={20}>
      <Flex
        bg={useColorModeValue('#A4D65E', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link as={RouterLink} to='/'>
            <Image src={logo} width="auto" height="38px" />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {isAuthenticated ? (
          <Button
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#0da955'} 
            onClick={handleClick}
            _hover={{
              bg: '#60e290',
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Link as={RouterLink} to="/signin">
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#0da955'}
              _hover={{
                bg: '#60e290',
              }}
            >
              Sign In
            </Button>
          </Link>
        )}
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const navItems = [
    { label: 'Home', href: "/" },
    { label: 'Orders', href: "/order" },
    { label: 'Drivers', href: '/delivery' },
    { label: 'Restaurants', href: '/seller' },
    { label: 'View Active Orders', href: '/order/tracking'}
  ];

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Link as={RouterLink} to={navItem.href} key={navItem.label}>
          <Box>
            <Button
              p={2}
              height="36px"
              fontSize={'sm'}
              fontWeight={700}
              bg="#E4E3D3"
              color={linkColor}
              href={navItem.href}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
            </Button>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};