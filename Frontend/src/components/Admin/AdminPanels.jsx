import React, { useState, useEffect } from 'react';
import {
  Box, Flex, VStack, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Icon,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, useToast, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon, ViewIcon, AtSignIcon, QuestionIcon, StarIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
// import Dashboard from './AdminDashboard';
import axios from '../login-signup/api';
import Dashboard from './AdminDashboard[1]';

const Sidebar = ({ onSelectComponent }) => {
  const menuItems = [
    { name: 'Dashboard', icon: ViewIcon },
    { name: 'Users', icon: AtSignIcon },
    { name: 'Quizzes', icon: QuestionIcon },
    { name: 'Polls', icon: StarIcon },
  ];

  return (
    <VStack ml="-20px" spacing={4} align="stretch" p={4} bg="blue.600" color="white" h="full">
      {menuItems.map((item) => (
        <Flex
          key={item.name}
          align="center"
          p={3}
          cursor="pointer"
          onClick={() => onSelectComponent(item.name)}
          _hover={{ bg: 'blue.700' }}
          borderRadius="md"
        >
          <Icon as={item.icon} boxSize={5} />
          <Text ml={4}>{item.name}</Text>
        </Flex>
      ))}
    </VStack>
  );
};

// const StatCard = ({ label, value }) => (
//   <Stat
//     px={{ base: 4, md: 8 }}
//     py={'5'}
//     shadow={'xl'}
//     border={'1px solid'}
//     borderColor={'gray.800'}
//     rounded={'lg'}
//   >
//     <StatLabel fontWeight={'medium'} isTruncated>
//       {label}
//     </StatLabel>
//     <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
//       {value}
//     </StatNumber>
//     <StatHelpText>
//       As of today
//     </StatHelpText>
//   </Stat>
// );

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/allusers');
      console.log(response);
      // const data = await response.json();
      console.log(response.data);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

 const handleCreateUser = async (userData) => {
    try {
      const response = await axios.post('/user', userData);
      if (response.status === 201) {
        fetchUsers();
        toast({ title: 'User created successfully', status: 'success' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast({ title: 'Error creating user', status: 'error' });
    }
  };


  const handleUpdateUser = async (userData) => {
    try {
      const response = await axios.patch(`/user/${userData._id}`, userData);
      fetchUsers();
      toast({ title: 'User updated successfully', status: 'success' });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({ title: 'Error updating user', status: 'error' });
    }
  };
  
  

  // const handleDeleteUser = async (userId) => {

  //   try {
  //     const response = await fetch(`http://localhost:2300/api/user/${userId}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       fetchUsers();
  //       toast({ title: 'User deleted successfully', status: 'success' });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     toast({ title: 'Error deleting user', status: 'error' });
  //   }
  // };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/user/${userId}`);
      fetchUsers();
      toast({ title: 'User deleted successfully', status: 'success' });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({ title: 'Error deleting user', status: 'error' });
    }
  };
  

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">User Management</Text>
        <Button colorScheme="blue" onClick={() => { setSelectedUser(null); onOpen(); }}>Create User</Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={3}>Loading...</Td>
              </Tr>
            ) : (
              users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit user"
                      mr={2}
                      onClick={() => { setSelectedUser(user); onOpen(); }}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete user"
                      onClick={() => handleDeleteUser(user._id)}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <UserFormModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
      />
    </Box>
  );
};

// const UserFormModal = ({ isOpen, onClose, user, onSubmit }) => {
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   useEffect(() => {
//     if (user) {
//       setFormData({ name: user.name, email: user.email });
//     } else {
//       setFormData({ name: '', email: '' });
//     }
//   }, [user]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(user ? { ...formData, id: user.id } : formData);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>{user ? 'Edit User' : 'Create User'}</ModalHeader>
//         <ModalCloseButton />
//         <form onSubmit={handleSubmit}>
//           <ModalBody>
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button type="submit" colorScheme="blue" mr={3}>
//               {user ? 'Update' : 'Create'}
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </form>
//       </ModalContent>
//     </Modal>
//   );
// };


const UserFormModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', _id: '' });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, _id: user._id });
    } else {
      setFormData({ name: '', email: '', _id: '' });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? 'Edit User' : 'Create User'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              {user ? 'Update' : 'Create'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};



const AdminPanel = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderContent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Users':
        return <UserManagement />;
      case 'Quizzes':
        return <Text>Quizzes Content</Text>;
      case 'Polls':
        return <Text>Polls Content</Text>;
      default:
        return <Text>Select a component</Text>;
    }
  };

  return (
    <Flex h="100vh">
      <Box display={{ base: 'none', md: 'block' }} w="250px" bg="teal.600">
        <Sidebar onSelectComponent={setSelectedComponent} />
      </Box>

      <Box flex={1} p={4} overflowY="auto">
        <Flex mb={4} align="center">
          <IconButton
            icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            onClick={onOpen}
            display={{ base: 'block', md: 'none' }}
            mr={4}
          />
          <Text fontSize="2xl" fontWeight="bold">
            Admin Panel - {selectedComponent}
          </Text>
        </Flex>
        {renderContent()}
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Sidebar onSelectComponent={setSelectedComponent} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default AdminPanel;

