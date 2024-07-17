import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Signup" element={<RegisterForm />} />
    </Routes>
  </div>
);
export default App;