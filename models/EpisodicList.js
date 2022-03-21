const promisePool = require('../repositories/mysql');
const User = require('./User.js');

class EpisodicList {
    constructor(name, id, obj) {
        if (obj) {
            Object.assign(this, obj);
            return;
        }

        this.name = name;
        this.podcasts = [];
        this.episodes = [];
        this.id = id;
    }

    get listName() { return this.name; }

    get listPodcasts() { return this.podcasts; }

    get listEpisodes() { return this.episodes; }

    get listId() { return this.id; }

    addPodcast(podcast) {
        if (!this.podcasts) this.podcasts = [];
        this.podcasts.push(podcast);

        let podcastId = podcast.id;
        let sql = "insert into lists_podcasts_link (listsId, podcastsId) values (" + this.id + "," + podcastId + ")";

        //throw it in the database
        new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                //console.log(err);
                res(err);
            }
        });
    }

    removePodcast(podcastId) {
        this.podcasts?.forEach((element) => {
            if (element.databaseId == podcastId) {
                this.podcasts.pop(element);
            }
        });

        let sql = "delete from lists_podcasts_link where listsId = " + this.id + " and podcastsId = " + podcastId + ";"

        new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                console.log(result);
                res(result.insertId);
            } catch (err) {
                res(err);
            }
        });
    }

    updatePodcast(podcast) {
        this.removePodcast(podcast);
        this.addPodcast(podcast);
    }

    addEpisode(episode) {
        if (!this.episodes) this.episodes = [];
        this.episodes.push(episode);

        let episodeId = episode.id; 
        let sql = "insert into lists_episodes_link (listsId, episodesId) values (" + this.id + "," + episodeId + ")";

        new Promise(async (res, rej) => {
            try {
                let result = await promisePool.query(sql);
                res(result.insertId);
            } catch (err) {
                //console.log(err);
                res(err);
            }
        });
    }

    removeEpisode(episodeId) {
        this.episodes.forEach((element) => {
            if (element.databaseId == episodeId) {
                this.episodes.pop(element);
            }
        });

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
