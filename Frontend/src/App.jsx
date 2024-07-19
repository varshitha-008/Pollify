import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/ChangePassword';
import PollCreation from './components/pollMCQ';
import AttendPoll from './components/MCQpollAttend';
import UserPolls from './components/Allpolls';
import PollDetails from './components/MCQpollAttend';
import PollResponses from './components/pollchart';
import RatingPoll from './components/dragingpoll';
import CreatePollDrag from './components/dragpollcreation';
// import PollAttendance from './components/MCQpollAttend';

const App = () => (
  <div>
    <Navbar />
    {/* <AttendPoll/> */}
    {/* <UserPolls/> */}
    <Routes>
      {/* <Route path='/' element={<CreatePollDrag/>}/> */}
      {/* <Route path='/' element={<RatingPoll/>}/> */}
      <Route path='/pollcreation' element={<PollCreation/>}/>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/Signup" element={<RegisterForm />} />
      <Route path="/forgotpassword"  element={<ForgotPassword/>} />
      <Route path="/change-password" element={<ChangePassword/>} />
      <Route path="/polls" element={<UserPolls/>} />
      <Route path="Polls/:pollId" element={<AttendPoll/>} />
      <Route path="Polls/:pollId/responses" element={<PollResponses/>} />
      {/* <Route path='/Polls/:pollid' element={<PollDetails/>}/> */}
    </Routes>
  </div>
);
export default App;