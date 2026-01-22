const User = require('../models/User');
const jwt = require('jsonwebtoken');

//token generation
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.register = async (req, res) => {
    try {
        //fetch user data from request body
        const { username, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        //password will be hashed in pre-save hook
        const newUser = await User.create({ username, email, password });

        //create token and login user after registration
        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};