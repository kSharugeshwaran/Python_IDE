const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(`python3 ${filepath} -o ${outPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    if (stderr) {
                        reject({ output: stderr });
                    } else {
                        reject({ output: error.message });
                    }
                } else {
                    resolve({ output: stdout, error: stderr });
                }
            }
        );
    })
    .then((result) => {
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully:", filepath);
            }
        });
        return result; 
    })
    .catch((error) => {
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully:", filepath);
            }
        });
        throw error; // Re-throw the error
    });
};


module.exports = {
    executePython
};