const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Array to store registrations
let registrations = [];

// Trang chủ giới thiệu Hội nghị
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/response', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'response.html'));
});

// Trang đăng ký tham gia
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Xử lý form đăng ký
app.post('/register', (req, res) => {
    const { name, email, attendance } = req.body;
    
    const registration = {
        id: registrations.length + 1,
        name,
        email,
        attendance,
        registeredAt: new Date()
    };

    // Add to registrations array
    registrations.push(registration);

    // Send response
    res.json({
        message: 'Registration successful',
        registration: registration
    });
});

// Get all registrations (optional route)
app.get('/registrations', (req, res) => {
    res.json(registrations);
});

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});