import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/ChangePassword';

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Signup" element={<RegisterForm />} />
      <Route path="/forgotpassword"  element={<ForgotPassword/>} />
      <Route path="/change-password" element={<ChangePassword/>} />
    </Routes>
  </div>
);
export default App;