// src/components/DashboardLayout.jsx
import { Box, Flex ,Text} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => (
  <Flex height="100vh">
    <Box width="250px" bg="gray.100" p={4}>
      <Text>I am dash board</Text>
      <Sidebar />
    </Box>
    <Box flex="1" p={4}>
      <Outlet />
    </Box>
  </Flex>
);

export default DashboardLayout;
