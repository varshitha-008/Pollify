import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from './api';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack } from '@chakra-ui/react';

const PollResponses = () => {
  const { pollId } = useParams();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`/polls/${pollId}/responses`);
        processResponses(response.data);
      } catch (error) {
        console.error('Error fetching poll responses:', error);
      }
    };

    fetchResponses();
  }, [pollId]);

  const processResponses = (responses) => {
    const questionMap = {};

    responses.forEach(response => {
      response.answers.forEach(({ questionText, answerText }) => {
        if (!questionMap[questionText]) {
          questionMap[questionText] = {};
        }
        if (!questionMap[questionText][answerText]) {
          questionMap[questionText][answerText] = 0;
        }
        questionMap[questionText][answerText] += 1;
      });
    });

    const data = Object.keys(questionMap).map(questionText => ({
      questionText,
      responses: Object.entries(questionMap[questionText]).map(([answerText, value]) => ({
        name: answerText,
        value,
      })),
    }));

    setChartData(data);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <VStack spacing={8}>
      {chartData.map((data, index) => (
        <Box key={index} w="600px" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <Heading as="h3" size="md" mb={4}>
            Question: {data.questionText}
          </Heading>
          <PieChart width={400} height={400}>
            <Pie
              data={data.responses}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {data.responses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      ))}
    </VStack>
  );
};

export default PollResponses;
