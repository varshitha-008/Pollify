import {Router} from 'express';
import protect from '../middlewares/auth.js';
import { createcreatescalepoll, getScalePollResults, onescalepoll, pollscaleresponce } from '../controllers/Scalepoll.js';

const scalepoll=Router();


// Create Poll
scalepoll.post('/Scalepolls',protect,createcreatescalepoll);

  // Store Poll Response
  scalepoll.post('/pollresponse',protect,pollscaleresponce);
  scalepoll.get('/scalepolls/:pollId/results',protect, getScalePollResults);
  // Get Poll for Attempting
  scalepoll.get('/Scalepolls/:id',onescalepoll);

  export default scalepoll;