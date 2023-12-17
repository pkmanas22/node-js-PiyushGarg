const { Router } = require('express');
const Blog = require('../models/blog')
const multer = require('multer')
const path = require('path');

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
    // console.log(blog);
    return res.render('blog', {
        user: req.user,
        blog,
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
    console.log(blog._id);
    return res.redirect(`/blog/${blog._id}`)
});

module.exports = blogRouter;