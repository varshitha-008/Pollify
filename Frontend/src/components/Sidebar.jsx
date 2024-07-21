import React from 'react';
import { Box, VStack, Text, Link, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = ({ isOpen, onClose }) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <Box
          w="250px"
          p={4}
          bg="gray.800"
          color="white"
          position="fixed"
          top="64px" 
          left="0"
          height="calc(100vh - 64px)" 
          boxShadow="md"
          zIndex="docked" 
        >
          <VStack spacing={4} align="start">
            <Text fontSize="2xl" fontWeight="bold">Sidebar</Text>
            <Link href="/pollcreation">Poll Creation</Link>
            <Link href="/polls">User Polls</Link>
            <Link href="/login">Login</Link>
            {/* Add more links as needed */}
          </VStack>
        </Box>
      ) : (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Sidebar</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="start">
                  <Link href="/pollcreation">Poll Creation</Link>
                  <Link href="/polls">User Polls</Link>
                  <Link href="/login">Login</Link>
                  {/* Add more links as needed */}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
