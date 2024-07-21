import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Button, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from '../api';

const AllTrueFalsePolls = () => {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('/true-false-poll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching user polls:', error);
      }
    };

    fetchPolls();
  }, [token]);

  if (!polls.length) return <Text>No polls created by you.</Text>;

  return (
    <Box w="60%" mx="auto" p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
        {polls.map((poll) => (
          <Box
            key={poll._id}
            p={4}
            boxShadow='lg'
            borderWidth={1}
            borderRadius="lg"
            textAlign='center'
            _hover={{ backgroundColor: 'gray.100' }}
          >
            <Link to={`/true-false-poll/${poll._id}`}>
              <Text fontSize="xl" fontWeight="bold">
                {poll.title}
              </Text>
            </Link>
            <Button
              as={Link}
              to={`/true-false-poll/${poll._id}`}
              colorScheme="blue"
              mt={2}
            >
              View Poll
            </Button>
            <Button
              as={Link}
              to={`/true-false-poll/results/${poll._id}`}
              colorScheme="green"
              mt={2}
              ml={2}
            >
              View Results
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllTrueFalsePolls;
