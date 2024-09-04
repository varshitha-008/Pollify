
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from './login-signup/api';

const UserPollsResult = () => {
  const [polls, setPolls] = useState([]);
  const [scalepolls, setScalepolls] = useState([]);
  const [binary, setBinary] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPolls = async () => {
      //   console.log('Token used for request:', token);
      try {
        const response = await api.get('/polls', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data.polls || []);
        setScalepolls(response.data.scalepolls || []);
        setBinary(response.data.binarypoll || [])
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
      <Box w="100%" mx="auto" p={4}>
      <Heading>MCQ Polls</Heading><hr/>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {polls.map((poll) => (
          <GridItem key={poll._id} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" _hover={{ backgroundColor: 'gray.50' }}>
            <Box>
              <Heading as={Link} to={`/polls/${poll._id}`} size="md" mb={2}>
                {poll.title}
              </Heading>
              <Text mt={2}>{poll.questions.length} Questions</Text>
              <Flex w="100%" justifyContent="space-between" mt={4}>
                <Button mt={2}
                  ml={2} m={"2px"} colorScheme="blue" as={Link} to={`/polls/${poll._id}`}>
                  View Poll
                </Button>
                <Button colorScheme="green"
                  mt={2}
                  ml={2} m={"2px"} as={Link} to={`/polls/${poll._id}/responses`}>
                  View Result
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
      </Box>
      <Box mt={8} w="100%" mx="auto" p={4}><Heading>Scalling Polls</Heading><hr/>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {scalepolls.map((poll) => (
            <GridItem key={poll._id}>
              <Box
                // w="100%"
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
                  <Button mt={2}
                    ml={2} m={"2px"} colorScheme="blue" as={Link} to={`/scalepolls/${poll._id}`}>
                    View Poll
                  </Button>
                  <Button colorScheme="green"
                    mt={2}
                    ml={2} m={"2px"} as={Link} to={`/scalepolls/${poll._id}/responses`}>
                    View Result
                  </Button>
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box >
      <Box w="100%" mx="auto" p={4}><Heading>Binary Polls</Heading>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
          gap={6}
        >
          {binary.map((poll) => (
            <GridItem key={poll._id}>
              <Box
                p={4}
                boxShadow='lg'
                borderWidth={1}
                borderRadius="lg"
                // textAlign='center'
                _hover={{ backgroundColor: 'gray.100' }}
              >
                <Link to={`/true-false-poll/${poll._id}`}>
                  <Text fontSize="xl" fontWeight="bold">
                    {poll.title}
                  </Text>
                </Link>
                <Text mt={2}>{poll.questions.length} Questions</Text>
                <Flex w="100%" justifyContent="space-between" mt={4}>
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
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserPollsResult;
