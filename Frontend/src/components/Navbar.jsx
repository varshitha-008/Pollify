
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Text,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import img from '../assets/Pn.png';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const user = localStorage.getItem('user');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control drawer visibility
  console.log("is Athenticated",isAuthenticated);
  return (
    <Box
      as="nav"
      bg="teal.500"
      p="4"
      boxShadow="md"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <Flex justify="space-between" align="center" wrap="wrap">
        <IconButton
          icon={<HamburgerIcon />}
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
          bg="teal.500"
          _hover={{ bg: 'teal.600' }}
          aria-label="Open Sidebar"
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="wheat"
          borderRadius="50%"
          w="50px"
          h="50px"
          marginRight="auto"
          marginLeft="auto"
        >
          <Image src={img} alt="see" borderRadius="full" boxSize="60px" />
        </Box>
        <Box color={'white'} fontWeight="bold" fontSize="26px">
          POLLIFY
        </Box>

        <HStack spacing="4" flex="1" justify="center">
          <Button
            as={Link}
            to="/"
            colorScheme="teal"
            variant="solid"
            size="md"
            borderRadius="md"
            _hover={{ bg: 'teal.600' }} 
          >
            Home
          </Button>
          <Button
            as={Link}
            to="/contact"
            colorScheme="teal"
            variant="solid"
            size="md"
            borderRadius="md"
            _hover={{ bg: 'teal.600' }}
          >
            Contact
          </Button>
          
        </HStack>

        {isAuthenticated ? (
          <>
            {user === 'Admin@gmail.com' && (
              <Text
                as={Link}
                to="/admin"
                color="white"
                m="5px"
                variant="solid"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'teal.200' }}
              >
                Admin
              </Text>
            )}
            <Avatar size="md" name="User" onClick={onLogout} cursor="pointer">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </>
        ) : (
          <>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <Avatar size="md" name="User" cursor="pointer">
                    <AvatarBadge boxSize="1.25em" bg="tomato" />
                  </Avatar>
                }
                variant="outline"
                borderColor="teal.600"
              >
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem as={Link} to="/signup">
                  Register
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>

      
      {/* <Sidebar isOpen={isOpen} onClose={onClose} /> */}
    </Box>
  );
};

export default Navbar;
