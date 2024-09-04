import mongoose from 'mongoose';

const { Schema } = mongoose;


const optionSchema = new Schema({
  text: { type: String, required: true }
});

const questionSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['radio', 'checkbox'], default: 'radio' }, // Add type field
  options: [optionSchema]
});

const pollSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['MCQ', 'Open'], default: 'MCQ' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  questions: { type: [questionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
