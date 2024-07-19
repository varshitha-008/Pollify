
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from './api';

const PollCreation = () => {
  const [questions, setQuestions] = useState([{ question: '', options: [{ text: '' }] }]);
  const [title,setTitle]= useState("");

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: '' });
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [{ text: '' }] }]);
  };

  const removeQuestion = (qIndex) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    console.log('Retrieved token:', token);  
  
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }
  
    const pollData = {
      title: `${title}`,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.map(opt => ({ text: opt.text }))
      }))
    };
  
    try {
      const response = await axios.post('/polls', pollData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Poll created successfully:', response.data);
      alert('Poll created successfully!');
      setQuestions([{ question: '', options: [{ text: '' }] }]);
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Failed to create poll. Server responded with status code ${error.response.status}.`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Failed to create poll. No response received from server.');
      } else {
        console.error('Error message:', error.message);
        alert('Failed to create poll. Error setting up request.');
      }
    }
  };
  
  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Box>
        <Input value={title} onChange={(e)=>setTitle(e.value)} placeholder='Enter Your Poll Title'></Input>
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {questions.map((q, qIndex) => (
            <Box key={qIndex} w="100%" p={4} borderWidth={1} borderRadius="lg">
              <HStack justifyContent="space-between">
                <FormControl id={`question-${qIndex}`} isRequired>
                  <FormLabel>Question {qIndex + 1}</FormLabel>
                  <Textarea
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    placeholder={`Enter question ${qIndex + 1}`}
                  />
                </FormControl>
                {qIndex > 0 && (
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Remove question"
                    onClick={() => removeQuestion(qIndex)}
                  />
                )}
              </HStack>
              {q.options.map((option, oIndex) => (
                <HStack key={oIndex} w="100%" mt={2}>
                  <FormControl id={`option-${qIndex}-${oIndex}`} isRequired>
                    <FormLabel>Option {oIndex + 1}</FormLabel>
                    <Input
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </FormControl>
                  {oIndex > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Remove option"
                      onClick={() => removeOption(qIndex, oIndex)}
                    />
                  )}
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} onClick={() => addOption(qIndex)} w="100%" mt={2}>
                Add Option
              </Button>
            </Box>
          ))}
          <Button leftIcon={<AddIcon />} onClick={addQuestion} w="100%">
            Add Question
          </Button>
          <Button type="submit" colorScheme="blue" w="100%">
            Create Poll
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PollCreation;
