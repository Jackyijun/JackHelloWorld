const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/get-company-info', (req, res) => {
    const companyName = req.query.company.toLowerCase();
    const directoryPath = path.join(__dirname, 'pdfs');

    console.log(`Scanning directory: ${directoryPath}`);

    fs.access(directoryPath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error('No read access to directory:', err);
            return res.status(500).send('No read access to directory');
        }

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Unable to scan directory:', err);
                return res.status(500).send('Unable to scan directory');
            }

            // Filter files that contain the company name in their file name
            const matchedFiles = files.filter(file => file.toLowerCase().includes(companyName));

            if (matchedFiles.length === 0) {
                return res.status(404).send('No matching files found');
            }

            // Read and encode each matched file as base64
            const fileDataPromises = matchedFiles.map(file => {
                return new Promise((resolve, reject) => {
                    const filePath = path.join(directoryPath, file);
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        const base64Data = data.toString('base64');
                        resolve({ fileName: file, data: base64Data });
                    });
                });
            });

            Promise.all(fileDataPromises)
                .then(results => res.json(results))
                .catch(err => res.status(500).send('Error reading files'));
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
