const promisePool = require('../repositories/mysql');
const EpisodicList = require('./EpisodicList.js');

module.exports = {
    initUsersTable: async function () {
        return new Promise(async (res, rej) => {
            let sql = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, token VARCHAR(100), PRIMARY KEY (id));`
            
            const [rows, fields] = await promisePool.query(sql);

            console.log(`Rows in initUsersTable: ${JSON.stringify(rows)}`);

            res("Created Users Table");
        });
    },

    addUser: function (username, password, token) {
        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO users(username, password, token) VALUES(?,?, ?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, password, token]);

            console.log(`Rows in addUser: ${JSON.stringify(rows)}`);

            res(rows);
        });        
    },

    checkLogin: function (username, password) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM users WHERE username = (?) AND password = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, password]);

            console.log(`Rows in checkLogin: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    checkExistingLogin: function (username, token) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM users WHERE username = (?) AND token = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, token]);

            console.log(`Rows in checkExistingLogin: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    updateToken: function (username, password, token) {
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE users SET token = (?) WHERE username = (?) AND password = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [token, username, password]);

            console.log(`Rows in updateToken: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    removeToken: function (username, token) {
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE users SET token = (?) WHERE username = (?) AND token = (?);'
            
            const [rows, fields] = await promisePool.query(sql, ["", username, token]);

            console.log(`Rows in removeToken: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getLists: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM lists WHERE userId = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            console.log(`Rows in getLists: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },
};