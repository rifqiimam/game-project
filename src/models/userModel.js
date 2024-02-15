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

const saveToken = async (token,id) => {
    //console.log("saveToken", token, id)
    try {
        //console.log(token.token,id)
        const query = 'UPDATE users SET token = $1 WHERE id = $2 RETURNING *';
        
        const rows = await db.query(query, [token.token,id]);
        //console.log(rows,'masuk save token')
        return rows[0]; // Return the updated user row
    } catch (error) {
        console.error('Error saving token:', error);
        throw error;
    }
}

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

const getAllUserByToken = async (token) => {
    try {
        const query = 'SELECT * FROM users WHERE token = $1';
        const { rows } = await db.query(query, [token]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

module.exports = { getUserByUsernameOrEmail, createUser,saveToken, getAllUserByToken  };
