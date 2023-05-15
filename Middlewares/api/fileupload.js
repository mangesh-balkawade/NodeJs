const express = require('express');
const multer = require('multer');

const app = express();

// Configure multer to use the "uploads" directory for storing files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// Create a multer instance with the configuration
const upload = multer({ storage: storage });

// Define a route for uploading a file
app.post('/upload', upload.single('file'), function (req, res, next) {
  // The uploaded file can be found in the req.file object
  console.log(req.file);
  res.send('File uploaded successfully');
});


module.exports=app
