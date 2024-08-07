const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const { Blogmodel } = require("../database");

const jwt = require("jsonwebtoken");

const jwtSecret = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, laudantium!";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Auth Token:success");

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();

    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

// Route 1: Get all blogs (Login required)
router.get("/fetchallblogs", fetchuser, async (req, res) => {
    try {
        const blogs = await Blogmodel.find({ user: req.user.id });
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 2: Add a new blog (Login required)
router.post("/addBlog", fetchuser, [
    body("blog", 'Blog content must be at least 5 characters long').isLength({ min: 5 }),
    body('title', 'Title is required').notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, blog } = req.body;
        const newBlog = new Blogmodel({
            title,
            blog,
            user: req.user.id
        });

        const savedBlog = await newBlog.save();
        res.json(savedBlog);

    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 3: Get a specific blog by ID (Login required)
router.get("/fetchblog/:id", fetchuser, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errors: "Invalid blog ID" });
    }

    try {
        const blog = await Blogmodel.findById(id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized access');
        }

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 4: Update an existing blog (Login required)
router.put("/updateblog/:id", fetchuser, [
    body("blog", 'Blog content must be at least 5 characters long').isLength({ min: 5 }),
    body('title', 'Title is required').notEmpty(),
], async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errors: "Invalid blog ID" });
    }

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, blog } = req.body;

        // Find the blog to update
        let existingBlog = await Blogmodel.findById(id);

        if (!existingBlog) {
            return res.status(404).send("Blog not found");
        }

        if (existingBlog.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized access');
        }

        existingBlog = await Blogmodel.findByIdAndUpdate(
            id,
            { $set: { title, blog } },
            { new: true, runValidators: true } // Returns the updated document and applies validation
        );

        res.json(existingBlog);

    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 5: Delete an existing blog (Login required)
router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errors: "Invalid blog ID" });
    }

    try {
        // Find the blog to delete
        const blog = await Blogmodel.findById(id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized access');
        }

        await Blogmodel.findByIdAndDelete(id);
        res.json({ success: "Blog has been deleted" });

    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Route 6: Get all blogs (No login required)
router.get("/public/blogs", async (req, res) => {
    try {
        const blogs = await Blogmodel.find({}) // Fetch all blogs and sort by creation date
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching public blogs:', error);
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

module.exports = router;
