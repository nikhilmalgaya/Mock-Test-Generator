const mongoose = require('mongoose');
const testSchema = require('./test');

const profileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    photo: { type: String },
    email: { type: String, required: true },
    tests: [testSchema],
    appearedTests: [
        {
            test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
            score: Number,
            date: { type: Date, default: Date.now }
        }
    ]
},{timestamps:true});

// Case-insensitive unique index
profileSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

// Pre-save hook to trim and lowercase email
profileSchema.pre('save', function(next) {
    if (this.email) {
        this.email = this.email.trim().toLowerCase();
    }
    next();
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
