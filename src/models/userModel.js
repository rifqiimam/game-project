const db = require('../config/database');

const getUsers = async () => {
    try {
        const query = 'SELECT * FROM games';
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

module.exports = { getUsers };