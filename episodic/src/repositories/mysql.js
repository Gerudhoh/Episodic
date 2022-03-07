var mysql = require('mysql2');

const pool =  mysql.createConnection({
<<<<<<< HEAD
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
=======
    host: "episodic.mysql.database.azure.com",
    user: "hohenade",
    password: "[q#rPZMd[~4WF(9t",
    database: "episodic",
>>>>>>> Adding search capabilities
    port: 3306
});

const promisePool = pool.promise();

module.exports = promisePool;
