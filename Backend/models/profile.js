const mongoose = require('mongoose');
const testSchema = require('./test'); 

const profileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    photo:{type:String},
    email: { type: String, required: true, unique:true },
    tests: [testSchema],  
    appearedTests: [
        {
            test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
            score: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;


