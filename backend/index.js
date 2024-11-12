const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const PORT = process.env.PORT || 5000;

// Ensure the uploads directory exists
const path = './uploads';
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}


const app = express();
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Ensure the uploads folder exists
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to fetch all employees
app.get("/", (req, res) => {
    res.send("<h1>Home is here</h1>");
});


// Route for file upload
app.post("/upload", (req, res) => {
    upload.single('profileImage')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Multer error', error: err });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error', error: err });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({ message: "Successfully Uploaded", filePath: req.file.path });
    });
});


app.get('/uploads/:fileName', (req, res) => {
    const filePath = `${UPLOADS_PATH}/${req.params.fileName}`;
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


