const promisePool = require('../repositories/mysql');
const EpisodicList = require('./EpisodicList.js');

module.exports = {
    addEpisodicList(name, id) {
        return new Promise(async (res, rej) => {
            let sql = "insert into lists (name, userId) values (?,?)";
            
            const [rows, fields] = await promisePool.query(sql, [name, id]);

            console.log(`Rows in removeToken: ${JSON.stringify(rows)}`);

            res(rows);
        });
    }
};