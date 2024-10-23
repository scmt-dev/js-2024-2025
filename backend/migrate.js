import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import mysql from 'mysql2';

// Create equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your SQL file
const sqlFilePath = join(__dirname, 'db.sql');

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'user_password',
    database: process.env.DB_NAME || 'my_database'
});

// Read the SQL file and execute the query
fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
        console.error('Error reading SQL file:', err);
        process.exit(1);
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            process.exit(1);
        } else {
            console.log('SQL migration completed successfully');
            db.end();
        }
    });
});
