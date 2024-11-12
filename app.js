const { exec } = require('child_process');
const readline = require('readline');

// Setup readline to capture user input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (filePath) => {
    // Run the Python script with the user's input as an argument
    exec(`python3 main.py ${filePath}`, (error, stdout, stderr) => {
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

    rl.close();  // Close the readline interface after executing the script
});
