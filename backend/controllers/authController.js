import bcrypt from 'bcrypt';
import { db } from '../config/db.js';  // Added .js extension
import { generateToken } from '../utils/jwtUtils.js';  // Added .js extension

// Signup controller
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const userCheckQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await db.promise().query(userCheckQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password and insert new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        await db.promise().query(insertQuery, [name, email, hashedPassword, role || 'user']);

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Signin controller
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.promise().query(userQuery, [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = users[0];

        // check if user is disabled
        if (user.disabled) {
            return res.status(401).json({ error: 'User is disabled' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Remove password from user object
        delete user.password;
        
        // update last seen
        const updateLastSeenQuery = 'UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = ?';
        await db.promise().query(updateLastSeenQuery, [user.id]);

        // Generate JWT token
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        return res.json({ message: 'Signin successful', token, user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
