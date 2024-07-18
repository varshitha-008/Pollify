
import express from "express";
import { protect, roleMiddleware } from "../middlewares/auth.js";
import { pollModel } from "../models/pollModel.js";
import { emitPollResults } from "../utils/socketUtils.js";
// import pollModel from "../models/pollModel.js";


// const { emitPollResults } = require('../utils/socketUtils');
// const Poll = require('../models/poll');

const router = express.Router();

// Create Poll
export const createpoll=router.post('/polls', protect, roleMiddleware('poll-creator') ,async (req, res) => {
  const { title, template, questions } = req.body;

  // Debugging information
//   console.log('Received data:', req.body);

  if (!title || !template || !questions) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const poll = new pollModel({
      title,
      template,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options
      })),
      createdBy: req.user.id
    });

    await poll.save();
    res.json(poll);
  } catch (e) {
    console.error('Error creating poll:', e);
    res.status(500).json({ msg: 'Server error', error: e.message });
  }
});


// Fetch Polls
export const getpoll= router.get('/', protect, async (req, res) => {
  try {
    
    console.log("hii");
    const polls = await pollModel.find({ createdBy: req.user.id });
    res.json(polls);
  } catch (e) {
    res.status(500).json({ msg: 'Server error', error:e });
  }
});

// Fetch Polls Shared With User
router.get('/shared', protect, async (req, res) => {
  try {
    const polls = await pollModel.find({ sharedWith: req.user.id });
    res.json(polls);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch Single Poll
router.get('/:id', protect, async (req, res) => {
  try {
    const poll = await pollModel.findOne({ _id: req.params.id, $or: [{ createdBy: req.user.id }, { sharedWith: req.user.id }] });
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    res.json(poll);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Poll
router.delete('/:id', protect, async (req, res) => {
  try {
    const poll = await pollModel.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    res.json({ msg: 'Poll deleted' });
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Submit Response
router.post('/:id/response', protect, async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const poll = await pollModel.findById(id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    // Check if user ID is already in sharedWith
    if (!poll.sharedWith.includes(req.user.id)) {
      poll.sharedWith.push(req.user.id);
    }

    poll.responses.push({ user: req.user.id, answers });
    await poll.save();

    emitPollResults(id);
    res.json({ msg: 'Response submitted' });
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch Poll Results
router.get('/:id/results', protect, async (req, res) => {
  try {
    const poll = await pollModel.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    res.json(poll.responses);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// module.exports = router;
// export 
