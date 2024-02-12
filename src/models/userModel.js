const db = require('../config/database');

const getUserByUsernameOrEmail = async (usernameOrEmail) => {
    try {
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $1';
        const { rows } = await db.query(query, [usernameOrEmail]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const createUser = async (username, email, password, token) => {
    try {
        const query = 'INSERT INTO users (username, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await db.query(query, [username, email, password, token]);
        return rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

module.exports = { getUserByUsernameOrEmail, createUser };
