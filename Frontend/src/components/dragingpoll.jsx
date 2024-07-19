import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import axios from './api';

const RatingPoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`/polls/${pollId}`);
        const pollData = response.data[0]; // Access the first object in the array
        setPoll(pollData);
        initializeSelectedRatings(pollData);
      } catch (error) {
        console.error('Error fetching poll details:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const initializeSelectedRatings = (pollData) => {
    const initialRatings = {};
    pollData.questions.forEach((question) => {
      initialRatings[question._id] = 0; // Initialize all ratings to 0
    });
    setSelectedRatings(initialRatings);
  };

  const handleRatingChange = (questionId) => (value) => {
    setSelectedRatings({
      ...selectedRatings,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: poll.questions.map((question) => ({
          questionId: question._id,
          questionText: question.question,
          rating: selectedRatings[question._id],
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
            <Slider
              defaultValue={0}
              min={0}
              max={10}
              step={1}
              value={selectedRatings[question._id]}
              onChange={handleRatingChange(question._id)}
              mt={4}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color="tomato" as="span">{selectedRatings[question._id]}</Box>
              </SliderThumb>
            </Slider>
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Submit Response
      </Button>
    </Box>
  );
};

export default RatingPoll;
