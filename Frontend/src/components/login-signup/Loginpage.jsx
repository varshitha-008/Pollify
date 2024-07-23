
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from './api';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      console.log("API response:", response);

      if (response.data && response.data.accessToken && response.data.refreshToken) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
        localStorage.setItem('accessToken', accessToken);
        const user=email;
        localStorage.setItem('user',user);

        toast({
          title: 'Login successful.',
          description: "You have been successfully logged in.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          window.location.href = '/polls';
        }, 1000);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Login error:", err);

      toast({
        title: 'Login failed.',
        description: err.response?.data?.message || err.message || 'Please check your credentials.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
      <Text fontSize="2xl">Login</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password" mt="4" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">Login</Button>
        </VStack>
      </form>
      <br />
      <p>Create an Account <Text color={"blue"} as={Link} to="/Signup" size="md">Signup</Text></p>
      <p><Text color={"blue"} as={Link} to="/forgotpassword" size="md">ForgotPassword?</Text></p>
    </Box>
  );
};

export default LoginForm;
