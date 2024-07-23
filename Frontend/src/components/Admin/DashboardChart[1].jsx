import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This is the dummy data
const data = [
  { name: 'Jan', users: 4000, quizzes: 2400, polls: 2400 },
  { name: 'Feb', users: 3000, quizzes: 1398, polls: 2210 },
  { name: 'Mar', users: 2000, quizzes: 9800, polls: 2290 },
  { name: 'Apr', users: 2780, quizzes: 3908, polls: 2000 },
  { name: 'May', users: 1890, quizzes: 4800, polls: 2181 },
  { name: 'Jun', users: 2390, quizzes: 3800, polls: 2500 },
  { name: 'Jul', users: 3490, quizzes: 4300, polls: 2100 },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}  // The dummy data is used here
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="quizzes" stroke="#82ca9d" />
        <Line type="monotone" dataKey="polls" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;