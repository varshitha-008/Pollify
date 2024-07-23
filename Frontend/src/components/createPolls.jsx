// PollButtons.js
import React from 'react';
import { Box, Button, SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon, DragHandleIcon, CheckIcon } from '@chakra-ui/icons';

const PollButton = ({ to, children, icon }) => (
  <Button
    as={Link}
    to={to}
    colorScheme="teal"
    variant="solid"
    size="lg"
    borderRadius="lg"
    _hover={{ bg: 'teal.600' }}
    leftIcon={icon}
    w="full"
    boxShadow="md"
    _active={{ bg: 'teal.700' }}
    _focus={{ boxShadow: 'outline' }}
  >
    {children}
  </Button>
);

const PollButtons = () => (
  <Box p={4} maxW="1200px" mx="auto">
    <Heading mb={6} textAlign="center">Poll Management</Heading>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
      <PollButton to="/pollcreation" icon={<AddIcon />}>
        Poll Creation
      </PollButton>
      <PollButton to="/polldrag" icon={<DragHandleIcon />}>
        Scaleing Poll
      </PollButton>
      <PollButton to="/true-false-poll" icon={<CheckIcon />}>
        Binary Poll
      </PollButton>
    </SimpleGrid>
  </Box>
);

export default PollButtons;
