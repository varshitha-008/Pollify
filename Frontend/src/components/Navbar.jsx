import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, HStack } from '@chakra-ui/react';

const Navbar = () => (
  <Box as="nav" bg="teal.500" p="4" boxShadow="md">
    <HStack spacing="4">
    <Button as={Link} to="/" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }} >
        Home
      </Button>
      <Button as={Link} to="/login" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }} >
        Login
      </Button>
      <Button as={Link} to="/signup" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }} >
        Register
      </Button>
      
      <Button as={Link} to="/polls" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }} >
        pollsAll
      </Button>
      <Button as={Link} to="/pollcreation" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }} >
        poll creation
      </Button>
    </HStack>
  </Box>
);

export default Navbar;
