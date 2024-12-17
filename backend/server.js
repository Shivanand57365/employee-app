const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();


const app = express();


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the database');

    const createTableQuery = `CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        department VARCHAR(50) NOT NULL,
        date_of_joining DATE NOT NULL,
        role VARCHAR(50) NOT NULL
    )`;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Employees table is ready');
        }
    });
});

app.post('/api/employees', (req, res) => {
    const { employee_id, name, email, phone_number, department, date_of_joining, role } = req.body;

    const query = `INSERT INTO employees (employee_id, name, email, phone_number, department, date_of_joining, role)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [employee_id, name, email, phone_number, department, date_of_joining, role], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Employee ID or Email already exists.');
            }
            return res.status(500).send('Database error occurred');
        }
        res.status(201).send('Employee added successfully');
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
