// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
// import axios from './api'; // Ensure axios is correctly set up to connect with your backend

// const RegisterForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/register', { name, email, password });
//       console.log(response);
//       setSuccess('Registration successful! You can now log in.');
//       setName('');
//       setEmail('');
//       setPassword('');
//       setError('');
//       toast({
//         title: "Registration successful.",
//         description: "You can now log in.",
//         status: "success",
//         duration: 500,
//         isClosable: true,
//       });
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//       console.error(err);
//       toast({
//         title: "Registration failed.",
//         description: "Please try again.",
//         status: "error",
//         duration: 500,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
//       <Heading mb="6" textAlign="center">Register</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl id="name" isRequired>
//           <FormLabel>Name</FormLabel>

//         </FormControl>
//         <FormControl id="email" mt="4" isRequired>
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
//         {success && <Text color="green.500" mt="4">{success}</Text>}
//         <Button mt="6" colorScheme="teal" type="submit" width="full">Register</Button>
//       </form>
//       <br/>
//       <p>Alredy have an account <Button as={Link} to="/" size="md"  >
//         Login
//       </Button> </p>
//     </Box>
//   );
// };

// export default RegisterForm;


import React, { useState } from 'react';
import axios from './api';
import { FormControl,FormLabel,Box, Button, Input, Text, VStack } from '@chakra-ui/react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', { name, email, password });
      console.log(response);
      setSuccess('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white" >
      <Text fontSize="2xl">Register</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
            <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
         </FormControl>
          
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
         
        <FormControl id="password" isRequired>
          <FormLabel>PassWord</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Button type="submit" colorScheme="teal">Register</Button>
        </VStack>
      </form>
      <br/>
       <p>Alredy have an account <Text color={"blue"} as={Link} to="/" size="md"  >
         Login
       </Text> </p>
       
    </Box>
  );
};

export default RegisterForm;
