const promisePool = require('../repositories/mysql');
const User = require('./User.js');

class EpisodicList {
    constructor(name, id, obj) { 
        if (obj)
        {
            Object.assign(this, obj);
            return;
        }

        this.name = name;
        this.podcasts = []; 
        this.episodes = [];
        this.id = id;
      }

      get listName () { return this.name; }

      get listPodcasts () { return this.podcasts; }

      get listEpisodes () { return this.episodes; }

      get listId () { return this.id; }

      addPodcast(podcast) {
          this.podcasts.push(podcast);

          let podcastId = 1; //Get from database adapter probably
          let sql = "insert into lists_podcasts_link (listsId, podcastsId) values (" + this.id + "," + podcastId + ")";
          
          //throw it in the database
          new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                console.log(err);
                res(err);
            }
        });
      }

      removePodcast(podcast) {
          this.podcasts.pop(podcast);

          let podcastId = 1; //Get from database adapter probably
          let sql = "delete from lists_podcasts_link where listsId = " + this.id + " and podcastsId = " + podcastId + ";"
          
          //throw it in the database
          new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                console.log(err);
                res(err);
            }
          });
      }

      updatePodcast(podcast) {
          this.removePodcast(podcast);
          this.addPodcast(podcast);
      }

      addEpisode(episode) {
          this.episodes.push(episode);

          let episodeId = 1; //Get from database adapter probably
          let sql = "insert into lists_episodes_link (listsId, episodesId) values (" + this.id + "," + episodeId + ")";

          new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                console.log(err);
                res(err);
            }
          });
      }

      removeEpisode(episode) {
          this.episodes.pop(episode);

          let episodeId = 1; //Get from database adapter probably
          let sql = "delete from lists_episodes_link where listsId = " + this.id + " and episodesId = " + episodeId + ";"

          new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                console.log(err);
                res(err);
            }
          });
      }

      updateEpisode(episode) {
          this.removeEpisode(episode);
          this.addEpisode(episode);
      }
}

module.exports = EpisodicList;
