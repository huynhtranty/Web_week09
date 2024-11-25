// app.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Serve calculator page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'calculator.html'));
});

// Calculate endpoint
app.post('/calculate', (req, res) => {
    const { x, y, operation } = req.body;
    let result;

    switch(operation) {
        case 'add':
            result = parseFloat(x) + parseFloat(y);
            break;
        case 'subtract':
            result = parseFloat(x) - parseFloat(y);
            break;
        case 'multiply':
            result = parseFloat(x) * parseFloat(y);
            break;
        case 'divide':
            result = parseFloat(x) / parseFloat(y);
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});