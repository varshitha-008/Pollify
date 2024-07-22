
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, VStack, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useBreakpointValue, Button, Collapse, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
// import { ChevronDownIcon } from '@chakra-ui/icons';
// import { AddIcon, DragHandleIcon, CheckIcon } from '@chakra-ui/icons'; // Import these icons

// const Sidebar = ({ isOpen, onClose }) => {
//   const isDesktop = useBreakpointValue({ base: false, md: true });

//   return (
//     <>
//       {isDesktop ? (
//         <Box 
//           w="250px"
//           p={4}
//           bg="teal.600"
//           color="white"
//           position="fixed"
//           top="64px"
//           left="0"
//           height="calc(100vh - 64px)"
//           boxShadow="md"
//           zIndex="docked"
//         >
//           <VStack spacing={4} align="start">
//             <Button as={Link} to="/polls"  variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
//               User Polls
//             </Button>

//             <Button as={Link} to="/showallcreations" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }} onClick={() => {}}>
//               Create Poll
//               <ChevronDownIcon ml={2} />
//             </Button>

//             <Collapse in={isOpen}>
//               <Box mt={2}>
//                 <Menu>
//                   <MenuButton
//                     as={Button}
//                     colorScheme="teal"
//                     variant="solid"
//                     size="md"
//                     borderRadius="md"
//                     rightIcon={<ChevronDownIcon />}
//                     _hover={{ bg: 'teal.600' }}
//                     w="100%"
//                     textAlign="left"
//                   >
//                     Create Poll
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem as={Link} to="/showallcreations">
//                       <AddIcon mr={2} /> MCQ Poll Creation
//                     </MenuItem>
//                     <MenuItem as={Link} to="/pollcreation">
//                       <AddIcon mr={2} /> Poll Creation
//                     </MenuItem>
//                     <MenuItem as={Link} to="/polldrag">
//                       <DragHandleIcon mr={2} /> Drag Poll
//                     </MenuItem>
//                     <MenuItem as={Link} to="/true-false-poll">
//                       <CheckIcon mr={2} /> Binary Poll
//                     </MenuItem>
//                   </MenuList>
//                 </Menu>
//               </Box>
//             </Collapse>

//             <Button as={Link} to="/pollsresult" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
//               Analytics
//             </Button>
//             {/* <Button as={Link} to="/get-true-false-poll" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//               See True/False Polls
//             </Button> */}
//           </VStack>
//         </Box>
//       ) : (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay>
//             <DrawerContent>
//               <DrawerCloseButton />
//               <DrawerHeader>Sidebar</DrawerHeader>
//               <DrawerBody>
//                 <VStack spacing={4} align="start">
//                   <Button as={Link} to="/pollcreation" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//                     Poll Creation
//                   </Button>
//                   <Button as={Link} to="/polls" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//                     User Polls
//                   </Button>
//                   <Button as={Link} to="/polldrag" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//                     Drag Poll
//                   </Button>
//                   <Button as={Link} to="/true-false-poll" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//                     Create True/False Poll
//                   </Button>
//                   <Button as={Link} to="/get-true-false-poll" colorScheme="teal" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.600' }}>
//                     See True/False Polls
//                   </Button>
//                 </VStack>
//               </DrawerBody>
//             </DrawerContent>
//           </DrawerOverlay>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  Button,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AddIcon, DragHandleIcon, CheckIcon } from '@chakra-ui/icons';

const Sidebar = ({ isOpen, onClose }) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <Box
          w="250px"
          p={4}
          bg="teal.500"
          color="white"
          position="fixed"
          top="78px"
          left="0"
          height="calc(100vh - 64px)"
          boxShadow="md"
          zIndex="docked"
        >
          <VStack spacing={4} align="start">
            <Button as={Link} to="/polls" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
              User Polls
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                variant="solid"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'teal.200' }}
                rightIcon={<ChevronDownIcon />}
              >
                Create Poll
              </MenuButton>
              <MenuList bg={'teal.300'}>
                <MenuItem bg={'teal.300'} as={Link} to="/showallcreations">
                  <AddIcon mr={2} />Poll Creation
                </MenuItem>
                <MenuItem bg={'teal.300'} as={Link} to="/pollcreation">
                  <AddIcon mr={2} />MCQ Poll Creation
                </MenuItem>
                <MenuItem bg={'teal.300'} as={Link} to="/polldrag">
                  <DragHandleIcon mr={2} /> Drag Poll
                </MenuItem>
                <MenuItem bg={'teal.300'} as={Link} to="/true-false-poll">
                  <CheckIcon mr={2} /> Binary Poll
                </MenuItem>
              </MenuList>
            </Menu>

            <Button as={Link} to="/pollsresult" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
              Analytics
            </Button>
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
                  <Button as={Link} to="/polls" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
                    User Polls
                  </Button>

                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="solid"
                      size="md"
                      borderRadius="md"
                      _hover={{ bg: 'teal.200' }}
                      rightIcon={<ChevronDownIcon />}
                    >
                      Create Poll
                    </MenuButton>
                    <MenuList>
                      <MenuItem color={"red"} as={Link} to="/showallcreations">
                        <AddIcon mr={2} color={"red"} /> Poll Creation
                      </MenuItem>
                      <MenuItem as={Link} to="/pollcreation">
                        <AddIcon mr={2} /> MCQ Poll Creation
                      </MenuItem>
                      <MenuItem as={Link} to="/polldrag">
                        <DragHandleIcon mr={2} /> Drag Poll
                      </MenuItem>
                      <MenuItem as={Link} to="/true-false-poll">
                        <CheckIcon mr={2} /> Binary Poll
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Button as={Link} to="/pollsresult" variant="solid" size="md" borderRadius="md" _hover={{ bg: 'teal.200' }}>
                    Analytics
                  </Button>
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
