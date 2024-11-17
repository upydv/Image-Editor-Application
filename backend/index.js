const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const PORT = process.env.PORT || 5000;
const path = require('path');
const { log } = require('console');

// Define the uploads directory path
const UPLOADS_PATH = './uploads';
const SKETCHED_PATH ='./sketched_pic'
const BLACKANDWHITE_PATH ='./Mirrored_Images'
const GRAYSCALE_PATH ='./Gray_Scale'
const REMOVEBACKGROUND_PATH ='./RemoveBackground_image'
const BLUR_PATH ='./Blur_Images'
const PDF_PATH ='./Converted_PDFs'
const RESIZED_PATH ='./Resized_images'
const ENHANCED_PATH ='./Enhanced_Images'






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
if (!fs.existsSync(GRAYSCALE_PATH)) {
    fs.mkdirSync(GRAYSCALE_PATH);
}

if (!fs.existsSync(REMOVEBACKGROUND_PATH)) {
    fs.mkdirSync(REMOVEBACKGROUND_PATH);
}
if (!fs.existsSync(BLUR_PATH)) {
    fs.mkdirSync(BLUR_PATH);
}

if (!fs.existsSync(PDF_PATH)) {
    fs.mkdirSync(PDF_PATH);
}

if (!fs.existsSync(RESIZED_PATH)) {
    fs.mkdirSync(RESIZED_PATH);
}
if (!fs.existsSync(ENHANCED_PATH)) {
    fs.mkdirSync(ENHANCED_PATH);
}


const app = express();
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static(UPLOADS_PATH));
app.use('/sketched_pic', express.static(SKETCHED_PATH));
app.use('/Mirrored_Images', express.static(BLACKANDWHITE_PATH));
app.use('/Gray_Scale', express.static(GRAYSCALE_PATH));
app.use('/RemoveBackground_image', express.static(REMOVEBACKGROUND_PATH));
app.use('/Blur_Images', express.static(BLUR_PATH));
app.use('/Converted_PDFs', express.static(PDF_PATH));
app.use('/Resized_images', express.static(RESIZED_PATH));
app.use('/Enhanced_Images', express.static(ENHANCED_PATH));







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

    exec(`python3 sketching.py ${imageUrl}`, (error, stdout, stderr) => {
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
app.post('/api/Mirror', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 Mirror.py ${imageUrl}`, (error, stdout, stderr) => {
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


app.post('/api/Grayscale', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 grayscale.py ${imageUrl}`, (error, stdout, stderr) => {
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


app.post('/api/RemoveBackground', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 RemoveBackground.py ${imageUrl}`, (error, stdout, stderr) => {
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


app.post('/api/BackgroundBlur', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 BackgroundBlur.py ${imageUrl}`, (error, stdout, stderr) => {
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


app.post('/api/ImageToPDF', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 PDF.py ${imageUrl}`, (error, stdout, stderr) => {
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


app.post('/api/Resize', (req, res) => {
    const { imageUrl, height ,width } = req.body;
    
    const w = height || 300;
    const h = width || 400;
    console.log(w,h);
    
    const args = `resize ${h} ${w} ${imageUrl}`; 

    // Run the Python script with the specified filename as an argument
    exec(`python3 Resize.py ${args}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ message: "Error in resizing process", error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ message: "Error in resizing process", error: stderr });
        }
        console.log(stdout);  // Output from Python script
        res.json({ message: "Resizing completed successfully", output: stdout });
    });
});


app.post('/api/Enhance', (req, res) => {
    const { imageUrl } = req.body;

    exec(`python3 Enhance.py ${imageUrl}`, (error, stdout, stderr) => {
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

app.get('/Mirror/:fileName', (req, res) => {
    const filePath = path.join(BLACKANDWHITE_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/Grayscale/:fileName', (req, res) => {
    const filePath = path.join(GRAYSCALE_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/RemoveBackground/:fileName', (req, res) => {
    const filePath = path.join(REMOVEBACKGROUND_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/BackgroundBlur/:fileName', (req, res) => {
    const filePath = path.join(BLUR_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/ImageToPDF/:fileName', (req, res) => {
    const filePath = path.join(PDF_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/Resize/:fileName', (req, res) => {
    const filePath = path.join(RESIZED_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

app.get('/Enhance/:fileName', (req, res) => {
    const filePath = path.join(ENHANCED_PATH, req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
