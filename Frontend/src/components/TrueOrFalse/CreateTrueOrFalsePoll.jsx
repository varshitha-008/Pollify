import React, { useState } from 'react';
import { Box, Button, Input, VStack, Textarea, Text, IconButton, HStack,useToast,Heading } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../api';

const CreateTrueFalsePoll = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '' }]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('accessToken');

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!title || questions.some(q => !q.question)) {
  //     setError('Please provide all required fields.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       '/true-false-poll',
  //       { title, questions },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     toast({
  //             title: 'Poll created.',
  //             description: `Poll "${response.data.title}" was successfully created.`,
  //             status: 'success',
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //     console.log('Poll created:', response.data);
  //     // Reset form after successful creation
  //     setTitle('');
  //     setQuestions([{ question: '' }]);
  //   } catch (error) {
  //     toast({
  //             title: 'Error.',
  //             description: 'There was an error creating the poll.',
  //             status: 'error',
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //     console.error('Error creating poll:', error);
  //     setError('Error creating poll. Please try again.');
  //   }
  // };


  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('/api/true-false-poll', { title, questions });
  //     toast({
  //       title: 'Poll created.',
  //       description: `Poll "${response.data.title}" was successfully created.`,
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     setTitle('');
  //     setQuestions([{ question: '' }]);
  //   } catch (error) {
  //     console.error('Error creating poll:', error);
  //     toast({
  //       title: 'Error.',
  //       description: 'There was an error creating the poll.',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || questions.some((q) => !q.question)) {
      setError('Please provide all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        '/true-false-poll',
        { title, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Poll created.',
        description: `Poll "${response.data.title}" was successfully created.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log('Poll created:', response.data);
      // Reset form after successful creation
      setTitle('');
      setQuestions([{ question: '' }]);
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'There was an error creating the poll.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error creating poll:', error);
      setError('Error creating poll. Please try again.');
    }
  };
  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <Heading color='teal' textAlign='center' >
          Binary Poll
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Poll Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {questions.map((q, index) => (
            <HStack key={index} w="100%" spacing={2}>
              <Textarea
                flex="1"
                placeholder={`Question ${index + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => removeQuestion(index)}
                aria-label="Remove question"
              />
            </HStack>
          ))}
          <Button
            leftIcon={<AddIcon />}
            onClick={addQuestion}
            colorScheme="teal"
          >
            Add Question
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
          >
            Create Poll
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
};

export default CreateTrueFalsePoll;
