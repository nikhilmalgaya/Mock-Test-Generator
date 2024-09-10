const connectDB = require('./config/db');
const express = require('express');
const profile = require('./models/profile');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = 3000;

connectDB();

app.post('/user/register', async (req, res) => {
    try {

        const { firstname, lastname, photo,email} = req.body;
        
    
            const existingUser = await profile.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const newUser = new profile({
                email,
                firstname,
                lastname,
                photo
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully!' });
        } catch (error) {
            console.error('Error in /user/register:', error);
            res.status(500).send('Internal Server Error');
        }
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


