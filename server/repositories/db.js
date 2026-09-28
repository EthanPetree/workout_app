require('dotenv').config();
const {Pool} = require('pg');

console.log(`connection string: ${process.env.DATABASE_URL}`);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://ethanpetree:hellohecker@db:5432/mydb",
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};