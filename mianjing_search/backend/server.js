const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/get-company-info', (req, res) => {
    const companyName = req.query.company;
    const filePath = path.join(__dirname, 'pdfs', `${companyName}.pdf`);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(404).send('PDF not found');
        }
        const base64Data = data.toString('base64');
        res.json({ pdf: base64Data });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
