import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Option Schema
const optionSchema = new Schema({
  text: { type: String, required: true },
});

// Question Schema
const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true },
});

// Poll Schema
const pollSchema = new Schema({
  title: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  questions: { type: [questionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
