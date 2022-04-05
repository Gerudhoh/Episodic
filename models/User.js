const promisePool = require('../repositories/mysql');

module.exports = {
    addUser: function (username, email, password, token, friends) {
        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO users(username, email, password, token, friends) VALUES(?,?,?,?,?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, email, password, token, JSON.stringify(friends)]);

            //console.log(`Rows in addUser: ${JSON.stringify(rows)}`);

            res(rows);
        });        
    },

    checkLogin: function (username, password) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM users WHERE username = (?) AND password = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, password]);

            //console.log(`Rows in checkLogin: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    checkExistingLogin: function (username, token) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM users WHERE username = (?) AND token = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [username, token]);

            //console.log(`Rows in checkExistingLogin: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getUserLists: function (id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM lists WHERE userId = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [id]);

            //console.log(`Rows in getUserLists: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    updateToken: function (username, password, token) {
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE users SET token = (?) WHERE username = (?) AND password = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [token, username, password]);

            //console.log(`Rows in updateToken: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    removeToken: function (username, token) {
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE users SET token = (?) WHERE username = (?) AND token = (?);'
            
            const [rows, fields] = await promisePool.query(sql, ["", username, token]);

            //console.log(`Rows in removeToken: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getUserFriends: function (user_id) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM users WHERE id = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [user_id]);

            //console.log(`Rows in getUserFriends: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getUser: function (search_term) {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT id, username, email, friends FROM users WHERE username = (?) OR email = (?);'
            
            const [rows, fields] = await promisePool.query(sql, [search_term, search_term]);

            //console.log(`Rows in getUserFriends: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getAllUsers: function () {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT username, email FROM users;';
            
            const [rows] = await promisePool.query(sql);

            //console.log(`Rows in getAllUsers: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },
};