
import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import axios from '../login-signup/api';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack, Select, Text } from '@chakra-ui/react';

 const PollMcqres = () => {
  const { pollId } = useParams();
  const [chartData, setChartData] = useState([]);
  const [chartTypes, setChartTypes] = useState({});
  const [globalChartType, setGlobalChartType] = useState('pie');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`/polls/${pollId}/responses`);
        processResponses(response.data);
      } catch (error) {
        console.error('Error fetching poll responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [pollId]);

  const processResponses = (responses) => {
    if (responses.length === 0) {
      setChartData([]);
      return;
    }

    const questionMap = {};

    responses.forEach(response => {
      response.answers.forEach(({ questionText, answerText }) => {
        if (!questionMap[questionText]) {
          questionMap[questionText] = {};
        }
        answerText.forEach((text) => {
          if (!questionMap[questionText][text]) {
            questionMap[questionText][text] = 0;
          }
          questionMap[questionText][text] += 1;
        });
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

    // Initialize chart types for each question
    const initialChartTypes = data.reduce((acc, _, index) => {
      acc[index] = globalChartType; // Set to globalChartType initially
      return acc;
    }, {});
    setChartTypes(initialChartTypes);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderChart = (data, chartType) => {
    switch (chartType) {
      case 'pie':
        return (
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
        );
      case 'bar':
        return (
          <BarChart width={400} height={400} data={data.responses}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8">
              {data.responses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'line':
        return (
          <LineChart width={400} height={400} data={data.responses}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="value" stroke="#8884d8">
              {data.responses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Line>
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart width={400} height={400} data={data.responses}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8">
              {data.responses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Area>
          </AreaChart>
        );
      case 'radar':
        return (
          <RadarChart outerRadius={90} width={400} height={400} data={data.responses}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Responses" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}>
              {data.responses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Radar>
            <Tooltip />
            <Legend />
          </RadarChart>
        );
      case 'dot':
        return (
          <ScatterChart width={400} height={400}>
            <CartesianGrid />
            <XAxis type="category" dataKey="name" name="Answer" />
            <YAxis type="number" dataKey="value" name="Votes" />
            <ZAxis range={[100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Responses" data={data.responses} fill="#8884d8" />
          </ScatterChart>
        );
      default:
        return null;
    }
  };

  const handleChartTypeChange = (questionIndex, type) => {
    setChartTypes(prev => ({ ...prev, [questionIndex]: type }));
  };

  const handleGlobalChartTypeChange = (type) => {
    setGlobalChartType(type);
    setChartTypes(prev => {
      const updatedChartTypes = {};
      for (const key in prev) {
        updatedChartTypes[key] = type;
      }
      return updatedChartTypes;
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (chartData.length === 0) {
    return <Text>No responses received</Text>;
  }

  return (
    <VStack spacing={8}>
      <Select
        placeholder="Select global chart type"
        value={globalChartType}
        onChange={(e) => handleGlobalChartTypeChange(e.target.value)}
        mb={4}
      >
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="area">Area Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="dot">Dot Chart</option>
      </Select>
      {chartData.map((data, index) => (
        <Box key={index} w="600px" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <Heading as="h3" size="md" mb={4}>
            Question: {data.questionText}
          </Heading>
          <Select
            placeholder="Select chart type"
            value={chartTypes[index] || 'pie'}
            onChange={(e) => handleChartTypeChange(index, e.target.value)}
            mb={4}
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
            <option value="radar">Radar Chart</option>
            <option value="dot">Dot Chart</option>
          </Select>
          {renderChart(data, chartTypes[index] || globalChartType)}
        </Box>
      ))}
    </VStack>
  );
};


export default PollMcqres;
