
import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Select } from '@chakra-ui/react';
import axios from '../login-signup/api';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Bar, Pie, Line, Radar, Scatter } from 'react-chartjs-2';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
  RadialLinearScale
);

const PollResults = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [responses, setResponses] = useState([]);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const response = await axios.get(`/scalepolls/${pollId}/results`);
        setPoll(response.data.poll);
        setResponses(response.data.responses);
      } catch (error) {
        console.error('Error fetching poll results:', error);
      }
    };

    fetchPollResults();
  }, [pollId]);

  const getChartData = () => {
    const labels = poll?.questions.map((q) => q.question) || [];
    const numericalData = [];
    const textualData = [];

    poll?.questions.forEach((question, index) => {
      if (question.useSlider) {
        const averageRating = responses
          .map((response) => parseInt(response.answers[index].selectedOption, 10))
          .reduce((acc, val) => acc + val, 0) / responses.length;
        numericalData.push(averageRating);
      } else {
        const textResponses = responses.map((response) => response.answers[index].selectedOption);
        textualData.push(textResponses.length);
      }
    });

    const datasets = [];

    if (numericalData.length) {
      datasets.push({
        label: 'Average Rating',
        data: numericalData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      });
    }

    if (textualData.length) {
      datasets.push({
        label: 'Text Responses Count',
        data: textualData,
        backgroundColor: 'rgba(192, 75, 192, 0.6)',
      });
    }

    return {
      labels,
      datasets,
    };
  };

  const renderChart = () => {
    const data = getChartData();
    const chartProps = {
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Poll Results' },
        },
      },
    };

    switch (chartType) {
      case 'bar':
        return <Bar {...chartProps} />;
      case 'pie':
        return <Pie {...chartProps} />;
      case 'line':
        return <Line {...chartProps} />;
      case 'radar':
        return <Radar {...chartProps} />;
      case 'scatter':
        return <Scatter {...chartProps} />;
      default:
        return <Text>Unable to draw chart with the selected type. Please try another chart type.</Text>;
    }
  };

  if (!poll) return <Text>Loading...</Text>;

  if (responses.length === 0) {
    return (
      <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="xl" mb={4}>
          {poll.title}
        </Heading>
        <Text>No responses received</Text>
      </Box>
    );
  }

  return (
    <Box w="600px" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={4}>
        {poll.title}
      </Heading>
      <Select
        placeholder="Select chart type"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="scatter">Scatter Chart</option>
      </Select>
      <VStack spacing={4}>
        {renderChart()}
      </VStack>
    </Box>
  );
};

export default PollResults;

