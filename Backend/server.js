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
        const { firstname, lastname, photo, email } = req.body;

        console.log(firstname, lastname, photo, email);

        // Instead of findOne and then insert, use findOneAndUpdate with upsert
        const result = await profile.findOneAndUpdate(
            { email },
            { 
                $setOnInsert: {
                    firstname,
                    lastname,
                    photo
                }
            },
            { 
                upsert: true, 
                runValidators: true
            }
        );

        console.log(result);

        if (result == null) {
            // Document was inserted
            console.log("Data saved");
            return res.status(201).json({ message: "User registered successfully" });
        } else {
            // Document already existed
            return res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        console.error('Error:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
