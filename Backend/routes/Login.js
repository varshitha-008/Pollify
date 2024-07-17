import express from 'express';
import { allUsers, login, logout, register, token } from '../controllers/login.js';
// import { login, logout, register, token } from '../controlers/customer.js';
// import { register,login,token,logout } from '../controllers/userRouter.js';
const loginrouter = express.Router();

loginrouter.post('/register', register);
loginrouter.get('/allusers', allUsers);
loginrouter.post('/login', login);
loginrouter.post('/token', token);
loginrouter.post('/logout', logout);

export default loginrouter;

