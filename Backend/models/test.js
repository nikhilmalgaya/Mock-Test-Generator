const mongoose = require('mongoose');
const questionSchema = require('./questions').schema;

const testSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    questions: [questionSchema]  
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test.schema;
