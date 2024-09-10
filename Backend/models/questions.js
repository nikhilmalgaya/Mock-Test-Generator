const mongoose = require('mongoose');

// Define the schema for options
const optionSchema = new mongoose.Schema({
    text: { type: String, required: true }
});

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [optionSchema], // Use the optionSchema here
    correctOption: { type: mongoose.Schema.Types.ObjectId, ref: 'Option' }
});

// Create and export the model for questions
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
