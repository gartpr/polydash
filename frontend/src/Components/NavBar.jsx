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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../Images/polydashlogo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, collection, getDoc } from 'firebase/firestore';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);

      if (user) {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            const userRole = userData.role;
            console.log(userRole);
            setUser(userRole);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      history('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('#A4D65E', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
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
          <Link as={RouterLink} to="/">
            <Image src={logo} width="auto" height="38px" />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav user={user} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
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

const DesktopNav = ({ user }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Orders', href: '/order', roles: ['customer'] },
    { label: 'Drivers', href: '/delivery', roles: ['driver'] },
    { label: 'Restaurants', href: '/seller', roles: ['restaurant'] },
    {
      label: 'View Active Orders',
      href: '/order/tracking',
      roles: ['customer'],
    },
    { label: 'Contact Us', href: '/contact' },
  ];

  if (user === null) {
    return (
      <Stack direction={'row'} spacing={4}>
        <Link as={RouterLink} to="/">
          <Box>
            <Button
              p={2}
              height="36px"
              fontSize={'sm'}
              fontWeight={700}
              bg="#E4E3D3"
              color={linkColor}
              href="/"
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              Home
            </Button>
          </Box>
        </Link>
        <Link as={RouterLink} to="/contact">
          <Box>
            <Button
              p={2}
              height="36px"
              fontSize={'sm'}
              fontWeight={700}
              bg="#E4E3D3"
              color={linkColor}
              href="/"
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Link>
      </Stack>
    );
  }

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map(
        (navItem) =>
          (!navItem.roles || navItem.roles.includes(user)) && (
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
                  }}
                >
                  {navItem.label}
                </Button>
              </Box>
            </Link>
          ),
      )}
    </Stack>
  );
};
