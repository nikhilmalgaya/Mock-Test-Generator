// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
connectDB();



const mcqSchema = new mongoose.Schema({
  number: String,
  question: String,
  options: [{ letter: String, text: String }]
});

const MCQ = mongoose.model('MCQ', mcqSchema);

// Parse MCQ function
function parseMCQ(text) {
  const questions = text.trim().split(/\n(?=\d+\s)/);
  
  return questions.map(q => {
    const [, number, question, options] = q.match(/(\d+)\s+(.*?)\n((?:[a-c]\..*\n?)+)/s);
    
    const parsedOptions = options.match(/([a-c])\.\s*(.*?)(?=\n[a-c]\.|\s*$)/gs).map(opt => {
      const [, letter, text] = opt.match(/([a-c])\.\s*(.*)/);
      return { letter, text: text.trim() };
    });
    
    return { number, question: question.trim(), options: parsedOptions };
  });
}

// API endpoint to parse and store MCQ
app.post('/api/parse-mcq', async (req, res) => {
  try {
    const { mcqText } = req.body;
    const parsedMCQ = parseMCQ(mcqText);
    
    // Clear existing MCQs
    await MCQ.deleteMany({});
    
    // Store new MCQs
    const savedMCQs = await MCQ.insertMany(parsedMCQ);
    
    res.json(savedMCQs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the MCQ.' });
  }
});

// API endpoint to get all MCQs
app.get('/api/mcqs', async (req, res) => {
  try {
    const mcqs = await MCQ.find();
    res.json(mcqs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching MCQs.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
