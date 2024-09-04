
import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScalePoll',
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    selectedOption: {
      type: String,
      required: true
    }
  }],
  respondedAt: {
    type: Date,
    default: Date.now
  }
});

export const scaleresponce = mongoose.model('PollResponses', responseSchema);
