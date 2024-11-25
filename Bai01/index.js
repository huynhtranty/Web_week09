// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Biến lưu kết quả tính toán
let calculationResult = null;

// Route chính
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'calculator.html'));
});

// Xử lý form submission
app.post('/calculate', (req, res) => {
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);
    const operation = req.body.operation;
    let result;
    let symbol;

    switch (operation) {
        case 'add':
            result = x + y;
            symbol = '+';
            break;
        case 'subtract':
            result = x - y;
            symbol = '-';
            break;
        case 'multiply':
            result = x * y;
            symbol = '×';
            break;
        case 'divide':
            result = x / y;
            symbol = '÷';
            break;
    }

    res.redirect(`/?x=${x}&y=${y}&operation=${operation}&result=${result}`);
});

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});