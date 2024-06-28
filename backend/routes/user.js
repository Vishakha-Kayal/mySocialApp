const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// user registration
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email ,posts:[]});
        await user.save();
        const token = user.generateAccessToken();
        res.status(201).json({ message: 'User registered successfully', token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = user.generateAccessToken();
        res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;