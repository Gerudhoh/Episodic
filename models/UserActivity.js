const promisePool = require('../repositories/mysql');

module.exports = {

    addUserActivity (podcast_name, episode_name, action_description, link, user_id, list_name) {
        console.log(podcast_name);
        console.log(episode_name);
        console.log(action_description);
        console.log(link);
        console.log(user_id);
        console.log(list_name)
        return new Promise(async (res, rej) => {
            let sql = 'INSERT INTO user_activity(podcast_name, episode_name, action_description, link, user_id, list_name) VALUES(?,?,?,?,?,?);'
            
            const [rows, fields] = await promisePool.query(sql, [podcast_name, episode_name, action_description, link, user_id, list_name]);

            //console.log(`Rows in addUserActivity: ${JSON.stringify(rows)}`);

            res(rows);
        });        
    },

    addFriendToUser: function (friends, user_id) {
        console.log(friends);
        console.log(user_id);
        return new Promise(async (res, rej) => {
            let sql = 'UPDATE users SET friends=(?) WHERE id=(?);'
            
            const [rows, fields] = await promisePool.query(sql, [friends, user_id]);

            //console.log(`Rows in addFriendToUser: ${JSON.stringify(rows)}`);

            res(rows);
        });        
    },

    getUserActivity: function (user_id) {
        console.log(user_id);
        return new Promise(async (res, rej) => {
            let sql = 'SELECT * FROM user_activity WHERE user_id = (?) ORDER BY id DESC LIMIT 10;'
            
            const [rows, fields] = await promisePool.query(sql, [user_id]);

            //console.log(`Rows in getUserActivity: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },

    getUserFriendActivity: function () {
        return new Promise(async (res, rej) => {
            let sql = 'SELECT A.id, podcast_name, episode_name, action_description, list_name, link, user_id, username, email FROM user_activity A JOIN users B ON A.user_id = B.id ORDER BY A.id DESC LIMIT 10;'
            
            const [rows, fields] = await promisePool.query(sql);

            //console.log(`Rows in getUserActivity: ${JSON.stringify(rows)}`);

            res(rows);
        });
    },
};