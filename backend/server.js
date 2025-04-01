const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Sample endpoint
app.get('/dashboard-data', (req, res) => {
    res.json({
        logins: 25,
        logouts: 12,
        signups: 18
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
