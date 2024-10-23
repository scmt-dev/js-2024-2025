require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',  // If using Docker, use the service name 'mysql' defined in docker-compose.yml
  user: process.env.DB_USER,  // This is the MySQL user you set in docker-compose
  password: process.env.DB_PASS,  // This is the MySQL user password
  database: process.env.DB_NAME  // This is the default database you set
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Sample route to fetch all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(results);
    }
  });
});

// Sample route to add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add user' });
    } else {
      res.json({ message: 'User added successfully', userId: result.insertId });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
