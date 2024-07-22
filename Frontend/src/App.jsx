

import React, { useState, useEffect } from 'react';
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
// import pollMcqres from './components/MCQPoll/pollchart';

import CreatePollDrag from './components/scalingpoll/dragpollcreation';
import RatingPollAttend from './components/scalingpoll/dragingpoll';
import PollResults from './components/scalingpoll/ScalePollResult';
// import UserPolls from './components/Allpolls';
import CreateTrueFalsePoll from './components/TrueOrFalse/CreateTrueOrFalsePoll';
import AllTrueFalsePolls from './components/TrueOrFalse/AllTrueFalsePolls';
import AttendTrueFalsePoll from './components/TrueOrFalse/AttendTrueFalsePoll';
import TrueFalsePollResponses from './components/TrueOrFalse/TrueFalsePollResponses';
import IntuitiveAndEasyPage from './components/Feature/IntuitiveAndEasyPage';
import PollingOptionsPage from './components/Feature/PollingOptionsPage';
import GetStartedPage from './components/Feature/GetStartedPage';
import Home from './components/Home';
import axios from './components/login-signup/api';
import UserPollsResult from './components/Analitics';
import PollButtons from './components/createPolls';
import Ticket from './components/Ticket';
import AdminPanel from './components/Admin/AdminPanels';
import PollMcqres from './components/MCQPoll/pollchart';
import UserPolls from './components/Allpolls';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('accessToken');
    console.log(isAuthenticated);;
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      
      const refreshToken=localStorage.getItem('refreshToken');
      const response = await axios.post('/logout', {refreshToken}, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem("resetToken")
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

   return (
    <>
      <Box>
        <Navbar isAuthenticated={isAuthenticated} onOpenSidebar={onOpen} onLogout={handleLogout} />
        <Flex>
          {isAuthenticated && 
          <Sidebar isOpen={isOpen} onClose={onClose} />}
          <Box flex="1" p={4} mt="64px" ml={{ base: 0, md: '250px' }} transition="margin-left 0.3s ease">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/admin' element={<AdminPanel/>}/>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path='/pollcreation' element={<PollCreation />} />
              <Route path="/polls" element={<UserPolls />} />
              <Route path="/pollsresult" element={<UserPollsResult/>}/>

              <Route path='/showallcreations' element={<PollButtons/>}/>
              <Route path='/polldrag' element={<CreatePollDrag/>}/>
              <Route path="/polls/:pollId" element={<AttendPoll />} />
              
              <Route path="/polls/:pollId/responses" element={<PollMcqres />} />

              <Route path="/Scalepolls/:pollId" element={<RatingPollAttend />} />
              <Route path="/Scalepolls/:pollId/response" element={<PollResults />} />
              <Route path="/true-false-poll" element={<CreateTrueFalsePoll />} />
              <Route path="/get-true-false-poll" element={<AllTrueFalsePolls />} />
              <Route path="/true-false-poll/:pollId" element={<AttendTrueFalsePoll />} />
              <Route path="/true-false-poll/results/:pollId" element={<TrueFalsePollResponses />} />
              <Route path="/intuitive-and-easy" element={<IntuitiveAndEasyPage />} />
              <Route path="/5+-polling-options" element={<PollingOptionsPage />} />
              <Route path="/get-started-for-free" element={<GetStartedPage />} />
              <Route path='/contact' element={<Ticket/>}/>
            </Routes>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Box, Flex, useDisclosure } from '@chakra-ui/react';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import PollCreation from './components/MCQPoll/pollMCQ';
// import LoginForm from './components/login-signup/Loginpage';
// import RegisterForm from './components/login-signup/Signup';
// import ForgotPassword from './components/login-signup/forgotpassword';
// import ChangePassword from './components/login-signup/ChangePassword';
// import AttendPoll from './components/MCQPoll/MCQpollAttend';
// import CreatePollDrag from './components/scalingpoll/dragpollcreation';
// import RatingPollAttend from './components/scalingpoll/dragingpoll';
// import PollResults from './components/scalingpoll/ScalePollResult';
// import CreateTrueFalsePoll from './components/TrueOrFalse/CreateTrueOrFalsePoll';
// import AllTrueFalsePolls from './components/TrueOrFalse/AllTrueFalsePolls';
// import AttendTrueFalsePoll from './components/TrueOrFalse/AttendTrueFalsePoll';
// import TrueFalsePollResponses from './components/TrueOrFalse/TrueFalsePollResponses';
// import IntuitiveAndEasyPage from './components/Feature/IntuitiveAndEasyPage';
// import PollingOptionsPage from './components/Feature/PollingOptionsPage';
// import GetStartedPage from './components/Feature/GetStartedPage';
// import Home from './components/Home';
// import axios from './components/login-signup/api';
// import UserPollsResult from './components/Analitics';
// import PollButtons from './components/createPolls';
// import Ticket from './components/Ticket';
// import AdminPanel from './components/Admin/AdminPanels';
// import PollMcqres from './components/MCQPoll/pollchart';
// import UserPolls from './components/Allpolls';

// const App = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const checkAuthStatus = async () => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       onClose();
//     }
//   }, [isAuthenticated, onClose]);

//   const handleLogout = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken');
//       const response = await axios.post('/logout', { refreshToken }, { withCredentials: true });
//       if (response.status === 200) {
//         setIsAuthenticated(false);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('resetToken');
//         window.location.href = '/';
//       }
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   return (
//     <Box>
//       <Navbar isAuthenticated={isAuthenticated} onOpenSidebar={onOpen} onLogout={handleLogout} />
//       <Flex>
//         <Sidebar isOpen={isOpen} onClose={onClose} isAuthenticated={isAuthenticated} />
//         <Box flex="1" p={4} mt="64px" ml={{ base: 0, md: isAuthenticated ? '250px' : 0 }} transition="margin-left 0.3s ease">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/admin" element={<AdminPanel />} />
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/signup" element={<RegisterForm />} />
//             <Route path="/forgotpassword" element={<ForgotPassword />} />
//             <Route path="/change-password" element={<ChangePassword />} />
//             <Route path="/pollcreation" element={<PollCreation />} />
//             <Route path="/polls" element={<UserPolls />} />
//             <Route path="/polldrag" element={<CreatePollDrag />} />
//             <Route path="/dragingpoll" element={<RatingPollAttend />} />
//             <Route path="/showallcreations" element={<PollButtons />} />
//             <Route path="/pollsresult" element={<UserPollsResult />} />
//             <Route path="/ticket" element={<Ticket />} />
//             <Route path="/pollmcqres" element={<PollMcqres />} />
//             <Route path="/get-true-false-poll" element={<AllTrueFalsePolls />} />
//             <Route path="/attend-true-false-poll/:pollId" element={<AttendTrueFalsePoll />} />
//             <Route path="/true-false-poll" element={<CreateTrueFalsePoll />} />
//             <Route path="/true-false-poll-responses" element={<TrueFalsePollResponses />} />
//             <Route path="/analytics" element={<PollResults />} />
//             <Route path="/mcq-poll-attend/:pollId" element={<AttendPoll />} />
//             <Route path="/pollsresult" element={<UserPollsResult />} />
//             <Route path="/intuitive-and-easy" element={<IntuitiveAndEasyPage />} />
//             <Route path="/polling-options" element={<PollingOptionsPage />} />
//             <Route path="/get-started" element={<GetStartedPage />} />
//           </Routes>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default App;
