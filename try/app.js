const { exec } = require('child_process');

// Specify the filename directly
// const filename ='SSB1.jpg'
const filename = "https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/SSB1.jpg"; // Replace with your desired filename or argument

// Run the Python script with the specified filename as an argument
exec(`python3 main.py ${filename}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(stdout);  // Output from Python script

});