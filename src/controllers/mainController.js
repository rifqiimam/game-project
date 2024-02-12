const model = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await model.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.createUser = async (req, res) => {
//     const { username, email } = req.body;
//     try {
//         const result = await db.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };