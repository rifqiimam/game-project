const model = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await model.getUsers(); // Use getUsers function from userModel
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password, token } = req.body;
    try {
        const newUser = await model.createUser(username, email, password, token); // Use createUser function from userModel
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
