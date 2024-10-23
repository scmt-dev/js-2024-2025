import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
};
