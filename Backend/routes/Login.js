import express from 'express';
import { allUsers, login, logout, register, token, userStats } from '../controllers/login.js';
const loginrouter = express.Router();

loginrouter.post('/register', register);
loginrouter.delete('/allusers/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await Customer.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
loginrouter.get('/allusers', allUsers);
loginrouter.post('/login', login);
loginrouter.post('/token', token);
loginrouter.post('/logout', logout);
loginrouter.get('/user-stats', userStats);

export default loginrouter;

