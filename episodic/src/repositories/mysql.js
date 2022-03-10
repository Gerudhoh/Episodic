var mysql = require('mysql2');
var CONFIG = require('./config.json');

const pool =  mysql.createConnection({
    host: CONFIG.host,
    user: CONFIG.user,
    password: CONFIG.password,
    database: CONFIG.database,
    port: CONFIG.port
});

const promisePool = pool.promise();

module.exports = promisePool;
