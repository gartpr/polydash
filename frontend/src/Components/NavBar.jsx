import React from "react";
import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  Stack,
  Popover,
  Link,
  PopoverTrigger,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../Images/polydashlogo.png';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

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
          <Image src={logo} width="auto" height="38px"/>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            variant={'link'}
            href={'#'}>
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#5CB8B2'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Orders', href: '#' },
    { label: 'Drivers', href: '#' },
    { label: 'Restaurants', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Link to="/order">
            <Button
              p={2}
              height="36px"
              href={navItem.href}
              fontSize={'sm'}
              fontWeight={700}
              bg="#E4E3D3"
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
            </Button>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};
