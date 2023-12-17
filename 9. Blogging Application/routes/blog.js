const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const Blog = require('../models/blog');
const Comment = require('../models/comment');

const blogRouter = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Render page for adding a new blog
blogRouter.get("/add-blog", (req, res) => {
    res.render("addBlog", {
        user: req.user,
    });
});

// View a specific blog with comments
blogRouter.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
        res.render('blog', {
            // console.log(blog);
            user: req.user,
            blog,
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new blog
blogRouter.post("/add-blog", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, body } = req.body;
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            coverImageUrl: `/uploads/${req.file.filename}`
        });
        res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Add a comment to a blog
blogRouter.post("/comment/:blogId", async (req, res) => {
    try {
        const { content } = req.body;
        await Comment.create({
            content,
            createdBy: req.user._id,
            blogId: req.params.blogId,
        });
        res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = blogRouter;
