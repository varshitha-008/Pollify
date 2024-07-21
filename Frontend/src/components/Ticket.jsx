import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  Container,
  Heading,
  VStack,
  Flex
} from '@chakra-ui/react';

const Ticket = () => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/send-ticket', {
        subject,
        title,
        message
      });

      if (response.status === 200) {
        toast({
          title: 'Ticket submitted.',
          description: 'Your ticket has been submitted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Submission error.',
          description: 'There was an error submitting your ticket.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error sending ticket:', error);
      toast({
        title: 'Submission error.',
        description: 'There was an error submitting your ticket.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" width="100%" align="center" justify="center">
      <Container maxWidth="md">
        <Box as="form" onSubmit={handleSubmit} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">Submit a Ticket</Heading>

            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Select placeholder="Select subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Polls">Polls</option>
                <option value="Quizzes">Quizzes</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10} />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">Submit Ticket</Button>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Ticket;
