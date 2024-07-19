import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Radio, RadioGroup } from '@chakra-ui/react';
import axios from './api';

const AttendPoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`/polls/${pollId}`);
        const pollData = response.data[0]; // Access the first object in the array
        setPoll(pollData);
        initializeSelectedOptions(pollData);
      } catch (error) {
        console.error('Error fetching poll details:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const initializeSelectedOptions = (pollData) => {
    const initialOptions = {};
    pollData.questions.forEach((question) => {
      initialOptions[question._id] = null; // Assuming option _id is available
    });
    setSelectedOptions(initialOptions);
  };

  const handleOptionChange = (questionId) => (value) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: poll.questions.map((question) => ({
          questionId: question._id,
          questionText: question.question,
          answerId: selectedOptions[question._id],
          answerText: question.options.find(option => option._id === selectedOptions[question._id]).text,
        })),
      };
      console.log('Submitting payload:', payload);

      const response = await axios.post(`/polls/${pollId}/responses`, payload);
      console.log('Response submitted:', response.data);
    } catch (error) {
      console.error('Error submitting response:', error);
      console.error('Error details:', error.response ? error.response : error.message);
    }
  };

  if (!poll) return <Text>Loading poll details...</Text>;

  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={4}>
        {poll.title}
      </Heading>
      <VStack spacing={4}>
        {poll.questions.map((question, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h3" size="md">{question.question}</Heading>
            <RadioGroup
              mt={2}
              value={selectedOptions[question._id]}
              onChange={handleOptionChange(question._id)}
            >
              {question.options.map((option, idx) => (
                <Radio key={idx} value={option._id}>{option.text}</Radio>
              ))}
            </RadioGroup>
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Submit Response
      </Button>
    </Box>
  );
};

export default AttendPoll;

