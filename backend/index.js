const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const PORT = process.env.PORT || 5000;

// Define the uploads directory path
const UPLOADS_PATH = './uploads';
const SKETCHED_PATH ='./sketched_pic'
const BLACKANDWHITE_PATH ='./Black_White_Images'


// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_PATH)) {
    fs.mkdirSync(UPLOADS_PATH);
}

if (!fs.existsSync(SKETCHED_PATH)) {
    fs.mkdirSync(SKETCHED_PATH);
}
if (!fs.existsSync(BLACKANDWHITE_PATH)) {
    fs.mkdirSync(BLACKANDWHITE_PATH);
}

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static(UPLOADS_PATH));
app.use('/sketched_pic', express.static(SKETCHED_PATH));
app.use('/Black_White_Images', express.static(BLACKANDWHITE_PATH));

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_PATH); // Use the defined UPLOADS_PATH
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

// Route to serve specific uploaded files
app.get('/uploads/:fileName', (req, res) => {
    const filePath = `${UPLOADS_PATH}/${req.params.fileName}`;
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

// Route to execute sketching script
app.post('/api/sketch', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 main.py ${imageUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ message: "Error in sketching process" });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ message: stderr });
        }
        console.log(stdout);  // Output from Python script
        res.json({ message: "Sketching completed successfully" });
    });
});

// Black and white
app.post('/api/blackandwhite', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 blackandwhite.py ${imageUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ message: "Error in Black and white process" });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ message: stderr });
        }
        console.log(stdout);  // Output from Python script
        res.json({ message: "Black and white completed successfully" });
    });
});


// Route to serve specific sketched files
app.get('/sketched_pic/:fileName', (req, res) => {
    const filePath = path.join(SKETCHED_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/Blackandwhite/:fileName', (req, res) => {
    const filePath = path.join(BLACKANDWHITE_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
