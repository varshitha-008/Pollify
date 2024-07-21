
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from './login-signup/api'; 

const UserPolls = () => {
  const [polls, setPolls] = useState([]);
  const [scalepolls, setScalepolls] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('Token used for request:', token); // Debug line to check token value
      try {
        const response = await api.get('/polls', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data.polls || []);
        setScalepolls(response.data.scalepolls || []);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error fetching user polls:', error.response?.data || error.message);
        setError('Error fetching polls. Please try again later.');
      }
    };

    fetchPolls();
  }, [token]);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!polls.length && !scalepolls.length) return <Text>No polls available.</Text>;

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <VStack spacing={6}>
        {polls.map((poll) => (
          <Box
            key={poll._id}
            w="100%"
            p={4}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            _hover={{ backgroundColor: 'gray.50' }}
          >
            <Heading as={Link} to={`/polls/${poll._id}`} size="md" mb={2}>
              {poll.title}
            </Heading>
            <Text mt={2}>{poll.questions.length} Questions</Text>
            <Flex w="100%" justifyContent="space-between" mt={4}>
              <Button colorScheme="teal" as={Link} to={`/polls/${poll._id}`}>
                Attempt Poll
              </Button>
              <Button colorScheme="teal" as={Link} to={`/polls/${poll._id}/responses`}>
                See Poll Result
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
      <Box mt={8} w="100%">
        <VStack spacing={6}>
          {scalepolls.map((poll) => (
            <Box
              key={poll._id}
              w="100%"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              _hover={{ backgroundColor: 'gray.50' }}
            >
              <Heading as={Link} to={`/scalepolls/${poll._id}`} size="md" mb={2}>
                {poll.title}
              </Heading>
              <Text mt={2}>{poll.questions.length} Questions</Text>
              <Flex w="100%" justifyContent="space-between" mt={4}>
                <Button colorScheme="teal" as={Link} to={`/scalepolls/${poll._id}`}>
                  Attempt Poll
                </Button>
                <Button colorScheme="teal" as={Link} to={`/scalepolls/${poll._id}/responses`}>
                  See Poll Result
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default UserPolls;
