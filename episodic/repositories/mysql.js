var mysql = require('mysql2');

const pool =  mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: 3306
});

const promisePool = pool.promise();

module.exports = promisePool;
