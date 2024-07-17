// import React, { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
// import axios from './api'; 
import { Link } from 'react-router-dom';
// // npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/login', { email, password });
//       console.log('Login successful:', response.data);
//       toast({
//         title: "Login successful.",
//         description: "You have successfully logged in.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//       console.error(err);
//     }
//   };

//   return (
//     <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
//       <Heading mb="6" textAlign="center">Login</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl id="email" isRequired>
//           <FormLabel>Email</FormLabel>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormControl>
//         <FormControl id="password" mt="4" isRequired>
//           <FormLabel>Password</FormLabel>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormControl>
//         {error && <Text color="red.500" mt="4">{error}</Text>}
//         <Button mt="6" colorScheme="teal" type="submit" width="full">Login</Button>
//       </form>
//       <br/>
//       <p>Create an Account <Button as={Link} to="/Signup" size="md"  >
//         Signup
//       </Button> </p>
//     </Box>
//   );
// };

// export default LoginForm;

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
       <p>Create an Account <Button as={Link} to="/Signup" size="md"  >
         Signup
       </Button> </p>
    </Box>
  );
};

export default LoginForm;
