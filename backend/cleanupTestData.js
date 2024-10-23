import mysql from 'mysql2';

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'user_password',
    database: process.env.DB_NAME || 'my_database'
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL for cleanup');

        // Delete test data - adjust the query as per your table structure
        const deleteTestDataQuery = 'DELETE FROM users WHERE email = "testuser@example.com"';

        db.query(deleteTestDataQuery, (err, result) => {
            if (err) {
                console.error('Error deleting test data:', err);
            } else {
                console.log('Test data deleted successfully');
            }

            // Close the database connection
            db.end();
        });
    }
});
