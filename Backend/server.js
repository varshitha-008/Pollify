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


const app = express();
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
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.use(cors({
  origin: 'http://localhost:5173', // URL of your frontend application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable cookies
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', pollRouter);
app.use('/api', otpRouter);
app.use('/api', loginRouter);
app.use('/api', scalePollRouter);

app.use('/', (req, res) => {
    res.send("this is home route");
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        connectDB();
        console.log('mongo connected');
        console.log(`server is running at ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});
