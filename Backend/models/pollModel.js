// const mongoose = require('mongoose');
// const { Schema } = mongoose;
import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const PollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  template: {
    type: String,
    required: true,
    enum: ['single-choice', 'multiple-choice', 'rating-scale'], 
  },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  responses: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      answers: [String],
    },
  ],
});

export const pollModel = mongoose.model('Poll', PollSchema);

// module.exports = pollModel;

