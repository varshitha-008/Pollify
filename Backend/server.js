import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import loginrouter from './routes/Login.js';
import connectDB from './configs/db.js';
import bodyParser from 'body-parser';
import Otprouter from './routes/otprouter.js';
import { createpoll } from './routes/pollRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     next();
// });

// app.post('/sendemail', emailSender);
app.use('/api', Otprouter);

app.use('/api',loginrouter)
app.use('/api',createpoll)
app.use('/', (req, res) => {
    res.send("this is home route for polling");

});

const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        // sequelize.sync()
        //     .then(() => {
        //         console.log('Database & tables created!');
        //     })
        //     .catch(error => {
        //         console.error('Unable to sync database:', error);
        //     });

        // console.log('sql connected succesfully');
        connectDB()
        console.log('mongo connected');
        console.log(`sever is runing at ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})