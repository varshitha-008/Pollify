import React from 'react';
import { Flex, Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Nav = ({ onSidebarOpen }) => (
  <Flex as="nav" p={4} bg="gray.900" color="white" align="center" justify="space-between" position="fixed" top="0" left="0" width="100%" zIndex="sticky">
    <Box fontSize="xl" fontWeight="bold">My App</Box>
    <IconButton
      icon={<HamburgerIcon />}
      aria-label="Open sidebar"
      display={{ base: 'block', md: 'none' }}
      onClick={onSidebarOpen}
    />
  </Flex>
);

export default Nav;
