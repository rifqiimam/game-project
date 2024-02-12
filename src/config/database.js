const { Pool } = require('pg');

const pool = new Pool({
    user: 'rifqi',
    host: 'localhost',
    database: 'game',
    password: 'rifqi',
    port: 5566, // Default PostgreSQL port
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};