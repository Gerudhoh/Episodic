var mysql = require('mysql2');

const pool =  mysql.createConnection({
    host: "episodic.mysql.database.azure.com",
    user: "hohenade",
    password: "[q#rPZMd[~4WF(9t",
    database: "episodic",
    port: 3306
});

const promisePool = pool.promise();

module.exports = promisePool;
