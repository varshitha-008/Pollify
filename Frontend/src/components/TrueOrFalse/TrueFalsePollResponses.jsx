import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts';
import axios from '../login-signup/api';
import { useParams } from 'react-router-dom';
import { Box, Heading, Select, SimpleGrid, VStack, Text, Icon } from '@chakra-ui/react';
import { FaChartPie, FaChartBar, FaChartLine } from 'react-icons/fa';
import io from 'socket.io-client';

const socket = io('http://localhost:2300');  // Update with your server URL if different

const TrueFalsePollResponses = () => {
  const { pollId } = useParams();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`/true-false-poll/results/${pollId}`);
        processResponses(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching poll responses:', error);
      }
    };

    fetchResponses();

    socket.on(`poll-results-${pollId}`, (newResponse) => {
      processResponses([newResponse], true);
    });

    return () => {
      socket.off(`poll-results-${pollId}`);
    };
  }, [pollId]);

  const processResponses = (responses, isUpdate = false) => {
    const questionMap = {};
    const userMap = {};

    responses.forEach(response => {
      response.answers.forEach(({ questionId, questionText, answer }) => {
        if (!questionMap[questionId]) {
          questionMap[questionId] = { questionText, True: 0, False: 0 };
        }
        questionMap[questionId][answer ? 'True' : 'False'] += 1;

        if (!userMap[questionId]) {
          userMap[questionId] = [];
        }
        if (!userMap[questionId].includes(response.userName)) {
          userMap[questionId].push(response.userName);
        }
      });
    });

    const data = Object.keys(questionMap).map(questionId => ({
      questionText: questionMap[questionId].questionText,
      responses: Object.entries(questionMap[questionId])
        .filter(([key]) => key !== 'questionText')
        .map(([answerText, value]) => ({
          name: answerText,
          value,
        })),
      users: userMap[questionId] || [],
    }));

    if (isUpdate) {
      setChartData(prevData => {
        const updatedData = [...prevData];
        data.forEach(newData => {
          const index = updatedData.findIndex(d => d.questionText === newData.questionText);
          if (index > -1) {
            updatedData[index] = newData;
          } else {
            updatedData.push(newData);
          }
        });
        return updatedData;
      });
    } else {
      setChartData(data);
    }
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
    <>
      <Select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        placeholder="Select chart type"
        mb={4}
      >
        <option value="pie">Pie Chart <Icon as={FaChartPie} /></option>
        <option value="bar">Bar Chart <Icon as={FaChartBar} /></option>
        <option value="line">Line Chart <Icon as={FaChartLine} /></option>
      </Select>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
        {chartData.map((data, index) => (
          <Box key={index} w="100%" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading as="h3" size="md" mb={4}>
              Question: {data.questionText}
            </Heading>
            {chartType === 'pie' && (
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
            )}
            {chartType === 'bar' && (
              <BarChart width={400} height={400} data={data.responses}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            )}
            {chartType === 'line' && (
              <LineChart width={400} height={400} data={data.responses}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            )}
            <VStack mt={4} align="start">
              <Text fontWeight="bold">Responded Users:</Text>
              {data.users.map((user, idx) => (
                <Text key={idx}>{user}</Text>
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TrueFalsePollResponses;
