const express = require('express');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { userModel } = require('../database');
const fetchuser = require('../middleware/fetchUser');

const router = express.Router();
const jwtSecret = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, laudantium!";

// Route 1: Add a new user or check existing user (POST api/auth/addUser)
router.post("/addUser", [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email ID').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether user exists
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "A user with this email already exists" });
        }

        // Add a new user
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        console.log('User saved in the database');

        const data = {
            id: user._id
        };

        const authToken = jwt.sign(data, jwtSecret);

        res.json({ authToken });

    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 2: Authenticate a user (POST api/auth/login)
router.post("/login", [
    body("email", 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether user email exists
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ errors: "User doesn't exist" });
        }

        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: "Incorrect credentials, please try again" });
        }

        const data = {
            id: user._id
        };

        const authToken = jwt.sign(data, jwtSecret);
        console.log("Auth Token:", authToken);

        res.json({ authToken });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 3: Fetch user details (POST api/auth/getUser)
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);

        const user = await userModel.findById(userId).select("-password");
        res.json(user);

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

module.exports = router;
