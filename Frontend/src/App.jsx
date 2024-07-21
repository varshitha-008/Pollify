import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PollCreation from './components/MCQPoll/pollMCQ';
import LoginForm from './components/login-signup/Loginpage';
import RegisterForm from './components/login-signup/Signup';
import ForgotPassword from './components/login-signup/forgotpassword';
import ChangePassword from './components/login-signup/ChangePassword';
import AttendPoll from './components/MCQPoll/MCQpollAttend';
import PollResponses from './components/MCQPoll/pollchart';
import UserPolls from './components/Allpolls';
import CreatePollDrag from './components/scalingpoll/dragpollcreation';
import RatingPollAttend from './components/scalingpoll/dragingpoll';
import PollResults from './components/scalingpoll/ScalePollResult';
// import Nav from './components/Nav';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    {/* <Navbar/> */}
    <Flex direction="column" h="100vh">
      <Navbar/>
      {/* <Nav onSidebarOpen={onOpen} /> */}
      <Flex flex="1">
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Box flex="1" p={4} ml={{ base: 0, md: '250px' }} transition="margin-left 0.3s ease">
          <Routes>
            <Route path='/polldrag' element={<CreatePollDrag />} />
            <Route path='/pollcreation' element={<PollCreation />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/Signup" element={<RegisterForm />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/polls" element={<UserPolls />} />
            <Route path="Polls/:pollId" element={<AttendPoll />} />
            <Route path="polls/:pollId/responses" element={<PollResponses />} />
            <Route path='/Scalepolls/:pollId' element={<RatingPollAttend />} />
            <Route path='/Scalepolls/:pollId/response' element={<PollResults />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
    </>
  );
};

export default App;
