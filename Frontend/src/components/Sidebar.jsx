// src/components/Sidebar.jsx
import { VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <VStack spacing={4} align="stretch">
    <Link to="create-poll">
      <Button>Create Poll</Button>
    </Link>
    <Link to="my-polls">
      <Button>My Polls</Button>
    </Link>
    <Link to="poll-results">
      <Button>Poll Results</Button>
    </Link>
  </VStack>
);

export default Sidebar;
