const { Router } = require('express');
const multer = require('multer')
const path = require('path');

const Blog = require('../models/blog')
const Comment = require('../models/comment')

const blogRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

blogRouter.get("/add-blog", (req, res) => {
    // Render the page for adding a new blog
    res.render("addBlog", {
        user: req.user,
    });
});

blogRouter.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    // console.log(blog);
    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    })
})

blogRouter.post("/add-blog",upload.single("coverImage"), async (req, res) => {
    const { title, body} = req.body;
    // console.log(req.body);
    // console.log(req.file);

    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`
    })
    // console.log(blog._id);
    return res.redirect(`/blog/${blog._id}`)
});


blogRouter.post("/comment/:blogId", async (req, res) => {
    const { content } = req.body;

    await Comment.create({
        content,
        createdBy: req.user._id,
        blogId: req.params.blogId,
    })
    
    return res.redirect(`/blog/${req.params.blogId}`)
});

module.exports = blogRouter;