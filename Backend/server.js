import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import loginRouter from './routes/Login.js';
import connectDB from './configs/db.js';
import bodyParser from 'body-parser';
import otpRouter from './routes/otprouter.js';
import pollRouter from './routes/pollRouter.js';
import scalePollRouter from './routes/Scallingpoll.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';


import router from './routes/trueFalsePollRoutes.js';
import trueOrFalseRouter from './routes/trueFalsePollRoutes.js';


// Set up for socket

import http from 'http';

import { Server } from 'socket.io';



//
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));



// app.use(express.json());
// app.use(bodyParser.json());




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

export { io };
// app.use(cors());

const allowedOrigins = ['https://pollify-1.onrender.com','http://localhost:5173', 'https://pollify-lz1s.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));


app.use(express.json());
app.use(bodyParser.json());
app.use('/api', pollRouter);
app.use('/api', otpRouter);
app.use('/api', loginRouter);
app.use('/api', scalePollRouter);
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.mongo_url }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
        },
    })
);



app.use('/api',trueOrFalseRouter)

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
