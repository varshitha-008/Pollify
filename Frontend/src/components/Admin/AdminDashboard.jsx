import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import DashboardChart from './DashboardChart'; // Make sure to create this file

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPolls: 0,
    totalQuizzes: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3200/api/allusers');
        const data = await response.json();
        
        setStats({
          totalUsers: data.length, 
          totalPolls: Math.floor(Math.random() * 900) + 100, 
          totalQuizzes: Math.floor(Math.random() * 900) + 100 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Polls" value={stats.totalPolls} />
        <StatCard label="Total Quizzes" value={stats.totalQuizzes} />
      </SimpleGrid>
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>Activity Overview</Text>
        <DashboardChart />
      </Box>
    </Box>
  );
};

const StatCard = ({ label, value }) => (
  <Box
    px={{ base: 4, md: 8 }}
    py={5}
    shadow="xl"
    border="1px solid"
    borderColor="gray.800"
    rounded="lg"
    textAlign="center"
  >
    <Text fontSize="2xl" fontWeight="medium">{value}</Text>
    <Text mt={2} fontWeight="medium">{label}</Text>
  </Box>
);

export default Dashboard;
