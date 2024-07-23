import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, HStack, Menu, MenuButton, MenuList, MenuItem, Avatar, AvatarBadge, Flex, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from '../components/login-signup/api';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setIsAuthenticated(true);
                // Fetch user details if needed
                // const userData = await fetchUserDetails();
                // setUser(userData);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Box as="nav" bg="teal.500" p="4" boxShadow="md">
            <Flex justify="space-between" align="center" wrap="wrap">
                <HStack spacing="4" flex="1" justify="center">
                    <Button as={Link} to="/" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
                        Home
                    </Button>
                    <Button as={Link} to="/polls" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
                        Polls
                    </Button>
                    <Button as={Link} to="/pollcreation" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
                        Poll Creation
                    </Button>
                    <Button as={Link} to="/polldrag" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
                        Drag Poll
                    </Button>
                </HStack>
                {isAuthenticated ? (
                    <Avatar size="md" onClick={handleLogout} cursor="pointer">
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                ) : (
                    <Menu>
                        <MenuButton as={IconButton} icon={
                          <Avatar size="md" cursor="pointer">
                            <AvatarBadge boxSize="1.25em" bg="tomato" />
                        </Avatar>} 
                        variant="outline" borderColor="teal.600">
                            <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={Link} to="/login">Login</MenuItem>
                            <MenuItem as={Link} to="/signup">Register</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
