import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Radio, RadioGroup } from '@chakra-ui/react';

import { FaShareSquare } from 'react-icons/fa';
import axios from '../login-signup/api';
import ShareModal from './ShareModal';
const AttendTrueFalsePoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`/true-false-poll/${pollId}`);
        const pollData = response.data;
        setPoll(pollData);
        initializeSelectedAnswers(pollData);
      } catch (error) {
        console.error('Error fetching poll details:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const initializeSelectedAnswers = (pollData) => {
    const initialAnswers = {};
    pollData.questions.forEach((question) => {
      initialAnswers[question._id] = null;
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId) => (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: value === 'true',
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: poll.questions.map((question) => ({
          
          questionId: question._id,
          questionText:question.question,
          answer: selectedAnswers[question._id],
        })),
      };

      console.log('Submitting payload:', payload);

      const response = await axios.post(`/true-false-poll/response/${pollId}`, payload);
      console.log('Response submitted:', response.data);
    } catch (error) {
      console.error('Error submitting response:', error);
      console.error('Error details:', error.response ? error.response : error.message);
    }
  };

  if (!poll) return <Text>Loading poll details...</Text>;

  //shared model
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleShareClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  // const currentUrl = window.location.href;

  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      


      <Heading as="h2" size="xl" mb={4}>
        {poll.title}
      </Heading>

      <Button
        onClick={handleShareClick}
        colorScheme="blue"
        mb={4}
        variant="outline"
        leftIcon={<FaShareSquare />}
        // leftIcon={<FaShareAlt />}
      >
        Share This Poll
      </Button>

      {/* Modal for sharing URL */}
      <ShareModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        url={currentUrl}
      />

      
      <VStack spacing={4}>
        {poll.questions.map((question, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h3" size="md">{question.question}</Heading>
            <RadioGroup
              mt={2}
              value={selectedAnswers[question._id] === true ? 'true' : selectedAnswers[question._id] === false ? 'false' : null}
              onChange={handleAnswerChange(question._id)}
            >
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
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

export default AttendTrueFalsePoll;
