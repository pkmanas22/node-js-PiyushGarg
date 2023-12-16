// Importing required modules
const path = require('path');
const express = require('express');
const multer = require('multer')

// Creating an Express application
const app = express();
const PORT = 8000;

// const upload = multer({dest: "./uploads/"}) --> not needed
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

// Configuring EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware setup
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: false })) // Form data parsing middleware

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

let uploadedFile = null;

// Define your routes and middleware here
app.post('/profile', upload.single('profileImage'), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    uploadedFile = req.file;
    return res.redirect('/')
})

// Rendering the 'home' template with URL data
app.get('/', (req, res) => {
    const profileImage = uploadedFile ? `/uploads/${uploadedFile.filename}` : null;
    console.log(profileImage || 'No file uploaded yet');
    return res.render('homepage', { profileImage });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});