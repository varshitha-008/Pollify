import Poll from '../models/pollModel.js';
export const createPoll = async (req, res) => {
    const { title, questions } = req.body;

    console.log('Received data:', req.body);
    console.log('Token received:', req.headers['authorization']); // Log the received token

    if (!title || !questions) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid poll data. Poll must have at least one question.' });
    }

    for (const question of questions) {
        if (!question.question || !Array.isArray(question.options) || question.options.length === 0) {
            return res.status(400).json({ message: 'Each question must have text and at least one option.' });
        }
    }

    try {
        const poll = new Poll({
            title,
            questions: questions.map((q) => ({
                question: q.question,
                options: q.options.map(opt => ({ text: opt.text }))
            })),
            createdBy: req.user.id
        });

        await poll.save();
        res.json(poll);
    } catch (e) {
        console.error('Error creating poll:', e); // Log the error details
        res.status(500).json({ msg: 'Server error', error: e.message });
    }
};

export const allpolls= async (req, res) => {
    // router.get('/polls/use', authenticateToken, async (req, res) => {
      try {
        const polls = await Poll.find({ createdBy: req.user.id });
        res.json(polls);
      } catch (error) {
        console.error('Error fetching user polls:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    // });
  };

  

  
export const onepoll= async (req, res) => {
    // router.get('/polls/use', authenticateToken, async (req, res) => {
        const { pollId } = req.params;

        console.log(pollId);
      try {
        const polls = await Poll.find({ _id: pollId });
        res.json(polls);
      } catch (error) {
        console.error('Error fetching user polls:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    // });
  };
  
