const model = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Retrieve user from the database based on username or email
        const user = await model.getUserByUsernameOrEmail(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password provided matches the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the credentials are valid, generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await model.saveToken( {userId: user.id,token});
        // Return the JWT token to the client
        res.json({ token });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body; // Remove 'token' from destructuring
    try {
        // Check if the username or email already exists in the database
        const existingUser = await model.getUserByUsernameOrEmail(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Create a new user with the provided information
        const newUser = await model.createUser(username, email, hashedPassword);
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        // 1. Check for valid authentication header with JWT token:
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 2. Extract and verify JWT token (if token-based authentication):
        const token = authHeader.split(' ')[1]; // Assuming space after 'Bearer'
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // 3. Invalidate token (optional):
        // You can handle token invalidation using a blacklist, but it's not included here.

        // 4. Clear client-side cookies/local storage (if used):
        // Here, we're clearing any JWT tokens stored in cookies
        res.clearCookie('token'); 

        // 5. Return success response:
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
