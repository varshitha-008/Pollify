import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import StatCard from './StatCard[1]';
import axios from '../login-signup/api';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalPolls, setTotalPolls] = useState(0);

  useEffect(() => {
    // Fetch total users
    axios.get('http://localhost:2300/api/allusers')
      // .then((response) => response.json())
      .then((data) => setTotalUsers(data.total))
      .catch((error) => console.error('Error fetching total users:', error));

    // Fetch total quizzes
    // fetch('http://localhost:2300/api/totalquizzes')
    //   .then((response) => response.json())
    //   .then((data) => setTotalQuizzes(data.total))
    //   .catch((error) => console.error('Error fetching total quizzes:', error));

    // // Fetch total polls
    // fetch('http://localhost:2300/api/totalpolls')
    //   .then((response) => response.json())
    //   .then((data) => setTotalPolls(data.total))
    //   .catch((error) => console.error('Error fetching total polls:', error));
  }, []);

  return (
    <Box p={4} >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Total Quizzes" value={totalQuizzes} />
        <StatCard label="Total Polls" value={totalPolls} />
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
