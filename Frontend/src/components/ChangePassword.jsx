import React, { useState } from 'react';
import axios from './api';
import { HStack, Input, Button, useToast,Box } from '@chakra-ui/react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('resetToken');
      console.log("token",token);
      const response = await axios.post('/change-password', { token, newPassword });
      toast({
        title: 'Success',
        description: response.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
  <Box maxW="sm" mx="auto" mt="30" p="6" boxShadow="md" borderRadius="md" bg="white">
      <HStack spacing={2} as="form" onSubmit={handleSubmit} flexWrap="wrap">
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          flex="1"
          minW="200px"
        />
        <Button type="submit" colorScheme="teal" flex="none">
          Change Password
        </Button>
      </HStack>
    </Box>
  );
};

export default ChangePassword;
