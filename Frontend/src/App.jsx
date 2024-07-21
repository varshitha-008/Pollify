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

// import Dashboard from './components/Dashboard';
// import Home from './components/Home';

import IntuitiveAndEasyPage from './components/Feature/IntuitiveAndEasyPage';
import PollingOptionsPage from './components/Feature/PollingOptionsPage';
import GetStartedPage from './components/Feature/GetStartedPage';
import Home from './components/Home';

//True or flase polls
import CreateTrueFalsePoll from './components/TrueOrFalse/CreateTrueOrFalsePoll.jsx'
import AllTrueFalsePolls from './components/TrueOrFalse/AllTrueFalsePolls.jsx';
import AttendTrueFalsePoll from './components/TrueOrFalse/AttendTrueFalsePoll.jsx';
import TrueFalsePollResponses from './components/TrueOrFalse/TrueFalsePollResponses.jsx';


const App = () => (
  <div>
    <Navbar />
    {/* <AttendPoll/> */}
    {/* <UserPolls/> */}
    <Routes>
      
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginForm />} />
       
      <Route path="/Signup" element={<RegisterForm />} />
      <Route path="/forgotpassword"  element={<ForgotPassword/>} />
      <Route path="/change-password" element={<ChangePassword/>} />
      <Route path="/polls" element={<UserPolls/>} />
      <Route path="Polls/:pollId" element={<AttendPoll/>} />
      <Route path="Polls/:pollId/responses" element={<PollResponses/>} />
      <Route path='/pollcreation' element={<PollCreation/>}/>


      <Route path="/intuitive-and-easy" element={<IntuitiveAndEasyPage />} />
        <Route path="/5+-polling-options" element={<PollingOptionsPage />} />
        <Route path="/get-started-for-free" element={<GetStartedPage />} />


        <Route path='/true-false-poll' element={<CreateTrueFalsePoll/>} />
        <Route path='/get-true-false-poll' element={<AllTrueFalsePolls/>} ></Route>
        <Route path='/true-false-poll/:pollId' element={<AttendTrueFalsePoll/>}/>
        <Route path='/true-false-poll/results/:pollId' element={<TrueFalsePollResponses></TrueFalsePollResponses>}/>

    </Routes>
  </div>
);
export default App;