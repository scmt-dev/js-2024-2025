import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; 
import { signin, signup } from './controllers/authController.js';
import { authenticateToken } from './middlewares/authMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();1

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Authentication routes
app.post('/signup', signup);
app.post('/signin', signin);

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

// Health Check API Reference 
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app as the default export
export default app;