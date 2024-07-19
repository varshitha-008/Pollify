import React, { useState } from 'react';
import { Box, Button, Heading, Input, VStack, Textarea } from '@chakra-ui/react';
import axios from './api';

const CreatePollDrag = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '' }]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        questions,
      };

      const response = await axios.post('/polls', payload);
      console.log('Poll created:', response.data);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={4}>
        Create a Poll
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Poll Title"
          value={title}
          onChange={handleTitleChange}
        />
        {questions.map((question, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Textarea
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e)}
            />
            <Button
              mt={2}
              colorScheme="red"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove Question
            </Button>
          </Box>
        ))}
        <Button mt={4} colorScheme="blue" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </VStack>
      <Button mt={4} colorScheme="green" onClick={handleSubmit}>
        Create Poll
      </Button>
    </Box>
  );
};

export default CreatePollDrag;
