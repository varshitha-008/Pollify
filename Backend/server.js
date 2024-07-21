import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import loginrouter from './routes/Login.js';
import connectDB from './configs/db.js';
import bodyParser from 'body-parser';
import Otprouter from './routes/otprouter.js';
import pollrouter from './routes/pollRouter.js';
import router from './routes/trueFalsePollRoutes.js';
import trueOrFalseRouter from './routes/trueFalsePollRoutes.js';


// Set up for socket

import http from 'http';
import { Server } from 'socket.io';


const app = express();

const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  // Export io for use in the controller
export { io };

  

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api', pollrouter);
app.use('/api', Otprouter);

//polls for tru/false

app.use('/api',trueOrFalseRouter)

app.use('/api',loginrouter)
app.use('/', (req, res) => {
    res.send("this is home route");

});

const PORT = process.env.PORT || 3200;
server.listen(PORT, async () => {
    try {
        connectDB()
        console.log('mongo connected');
        console.log(`sever is runing at ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})