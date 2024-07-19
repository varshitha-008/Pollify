import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from './api';

const UserPolls = () => {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('/polls', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user polls:', error);
      }
    };

    fetchPolls();
  }, [token]);

  if (!polls.length) return <Text>No polls created by you.</Text>;

  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing={4}>
        {polls.map((poll) => (
          <Box
            key={poll._id}
            w="100%"
            p={4}
            borderWidth={1}
            borderRadius="lg"
            _hover={{ backgroundColor: 'gray.100' }}
          >
            <Link to={`${poll._id}`}>
              <Text fontSize="xl" fontWeight="bold">
                {poll.title}
              </Text>
            </Link>
            <Link to={`${poll._id}/responses`}>
              <Text fontSize="xl" fontWeight="bold">
                {poll.title}
              </Text>
            </Link>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UserPolls;
