const mongoose = require('mongoose');

require('dotenv').config();


 const dbURI = "mongodb+srv://malgayanikhil321:nikhilmalgaya321@cluster1.yopgy.mongodb.net/";

console.log(dbURI);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};



module.exports = connectDB;
