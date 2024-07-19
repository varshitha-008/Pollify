
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from './api';
import { Box, Button, FormControl, FormLabel,Input, Text, VStack } from '@chakra-ui/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      const { accessToken, refreshToken } = response.data;
      console.log("accessToken:",accessToken);
      console.log(response.data);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setError('');
      // window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
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
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="teal">Login</Button>
        </VStack>
      </form><br/>
       <p>Create an Account <Text color={"blue"} as={Link} to="/Signup" size="md"  >
         Signup
       </Text> </p>
       <p> <Text color={"blue"} as={Link} to="/forgotpassword" size="md"  >
         ForgotPassword?
       </Text> </p>
    </Box>
  );
};

export default LoginForm;
