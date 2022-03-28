'use strict'

// Require all modules needed
require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path');

const promisePool = require('./repositories/mysql');

// Import classes
const users = require("./models/User")
const lists = require("./models/EpisodicList")
const podcasts = require("./models/Podcast")
const episodes = require("./models/Episode")
const DataFetcher = require("./models/api-data/DataFetcher.js");
const ListenNotesDataAdapter = require("./models/api-data/ListenNotesDataAdapter.js");


// Expose the port specified in .env or port 5000
const port = process.env.PORT || 5000;

const fetcher = new DataFetcher(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.LISTEN_NOTES_KEY,
  process.env.PODCAST_INDEX_KEY,
  process.env.PODCAST_INDEX_SECRET)


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let buildFolder = path.join(process.cwd(), "build");
app.use(express.static(buildFolder));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

app.post('/api/v1/lists/create', async function (req, res) {
  let name = req.body.name;
  let list = null;
  let userId = req.body.id;

  if (userId != null) {
    let sql = "insert into lists (name, userId) values ('" + name + "', " + userId + ")";

    //throw it into the database
    await new Promise(async (rem, rej) => {
      try {
        let result = await promisePool.query(sql);
        let id = result[0].insertId;
        list = new lists(name, id);
        res.send({
          list: list
        });
        return;
      } catch (err) {
        res.send(err);
        return;
      }
    });
  }

  res.send({
    list: list
  });
  return;

});

app.post('/api/v1/lists/add/podcast', async function (req, res) {
  let list = req.body.list;
  let podcast = new podcasts(req.body.title, req.body.description, req.body.rss, req.body.image, req.body.website || "N/A", req.body.publisher || "N/A", req.body.language || "N/A", req.body.totalEpisodes || 0, null, req.body.podcastId);
  list = new lists(list.name, list.id, list);


  await new Promise(async (rem, rej) => {
    try {
      let sql = "insert ignore into podcasts (name, rss, description, image, website, publisher, language, totalEpisodes) values ('" + escape(podcast.title) + "', '" + podcast.rss + "', '" + escape(podcast.description) + "', '" + podcast.image + "', '" + podcast.website + "', '" + podcast.publisher + "', '" + podcast.language + "', " + podcast.totalEpisodes + ")";
      let result = await promisePool.query(sql);
      let insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from podcasts where name = '" + escape(podcast.title) + "'";
        let result = await promisePool.query(sql);
        podcast.databaseId = result[0][0].id;
      }
      else {
        podcast.databaseId = insertId;
      }
      list.addPodcast(podcast);
      let linkSql = "insert into lists_podcasts_link (listsId, podcastsId) values (" + list.id + ", " + podcast.databaseId + ")";
      await promisePool.query(linkSql);
      res.send({ success: true });
      return;
    } catch (err) {
      console.log(err);
      res.send({ success: false });
      return;
    }

  });
  return;

});

app.post('/api/v1/lists/remove/podcast', async function (req, res) {
  let list = req.body.list;
  let name = req.body.name;
  list = new lists(list.name, list.id, list);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "select id from podcasts where name = '" + escape(name) + "'";
      let result = await promisePool.query(sql);
      let linkSql = "delete from lists_podcasts_link where listsId = " + list.id + " and podcastsId = " + result[0][0].id + ";"
      await promisePool.query(linkSql);
      res.send({ success: true });
      return;
    } catch (err) {
      console.log(err);
      res.send({ success: false });
      return;
    }
  });

});

app.post('/api/v1/lists/add/episode', async function (req, res) {
  let list = req.body.list;
  list = new lists(list.name, list.id, list);
  let episodejson = req.body.episode;
  let episode = new episodes(episodejson.title, req.body.image, episodejson.description, episodejson.podcast.title);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "insert ignore into episodes (name, description, image, podcastName) values ('" + escape(episode.title) + "','" + escape(episode.description) + "', '" + episode.image + "','" + escape(episode.podcast) + "')";
      let result = await promisePool.query(sql);
      let insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from episodes where name = '" + escape(episode.title) + "'";
        let result = await promisePool.query(sql);
        episode.databaseId = result[0][0].id;
      }
      else {
        episode.databaseId = insertId;
      }
      list.addEpisode(episode);
      let linkSql = "insert into lists_episodes_link (listsId, episodesId) values (" + list.id + ", " + episode.databaseId + ")";
      await promisePool.query(linkSql);
      res.send({ success: true });
      return;
    } catch (err) {
      console.log(err);
      res.send({ success: false });
      return;
    }

  });
  return;

});

app.post('/api/v1/lists/remove/episode', async function (req, res) {
  let list = req.body.list;
  let name = req.body.name;
  list = new lists(list.name, list.id, list);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "select id from episodes where name = '" + escape(name) + "'";
      let result = await promisePool.query(sql);
      let linkSql = "delete from lists_episodes_link where listsId = " + list.id + " and episodesId = " + result[0][0].id + ";"
      await promisePool.query(linkSql);
      res.send({ success: true });
      return;
    } catch (err) {
      console.log(err);
      res.send({ success: false });
      return;
    }
  });

});

app.post("/api/v1/lists/get/all/names", async function (req, res) {
  let userId = req.body.id;

  if (userId != null) {
    let userList = await users.getUserLists(userId);

    res.send({ lists: userList, noUser: false });
    return;
  }
  res.send({ lists: [], noUser: true });

});

// This endpoint is VERY slow because it needs to pull everything out of the database, not sure if there's a better way to do this but it's good enough for now
app.post("/api/v1/lists/get/all", async function (req, res) {
  let userId = req.body.id;

  if (userId != null) {

    let userList = await users.getUserLists(userId);
    let i = 0;

    for (const element of userList) {
      let list = new lists(element.name, element.id);
      let sql = "select * from lists_podcasts_link where listsId = " + list.id + "";
      let newResult = await promisePool.query(sql);
      for (const pod of newResult[0]) {
        let linkSql = "select * from podcasts where id = " + pod.podcastsId + "";
        let linkResult = await promisePool.query(linkSql);
        let temp = new podcasts(unescape(linkResult[0][0].name), linkResult[0][0].description, linkResult[0][0].rss, linkResult[0][0].image, linkResult[0][0].website, linkResult[0][0].publisher, linkResult[0][0].language, linkResult[0][0].totalEpisodes);
        list.addPodcast(temp);
      }

      sql = "select * from lists_episodes_link where listsId = " + list.id + "";
      newResult = await promisePool.query(sql);
      for (const ep of newResult[0]) {
        let linkSql = "select * from episodes where id = " + ep.episodesId + "";
        let linkResult = await promisePool.query(linkSql);
        let temp = new episodes(unescape(linkResult[0][0].name), linkResult[0][0].image, linkResult[0][0].description, unescape(linkResult[0][0].podcastName), linkResult[0][0].id);
        list.addEpisode(temp);
      }

      userList[i] = list;
      i++;
    }

    res.send({ lists: userList, noUser: false });
    return;
  }
  res.send({ lists: [], noUser: true });

});

app.post("/api/v1/lists/get/one", async function (req, res) {
  let userId = req.body.id;
  let name = req.body.name;

  if (userId != null) {

    let userList = await users.getUserLists(userId);
    
    let element = userList.find(element => element?.name == name);

    let list = new lists(element.name, element.id);
    let sql = "select * from lists_podcasts_link where listsId = " + list.id + "";
    let newResult = await promisePool.query(sql);
    for (const pod of newResult[0]) {
      let linkSql = "select * from podcasts where id = " + pod.podcastsId + "";
      let linkResult = await promisePool.query(linkSql);
      let temp = new podcasts(unescape(linkResult[0][0].name), linkResult[0][0].description, linkResult[0][0].rss, linkResult[0][0].image, linkResult[0][0].website, linkResult[0][0].publisher, linkResult[0][0].language, linkResult[0][0].totalEpisodes);
      list.addPodcast(temp);
    }

    sql = "select * from lists_episodes_link where listsId = " + list.id + "";
    newResult = await promisePool.query(sql);
    for (const ep of newResult[0]) {
      let linkSql = "select * from episodes where id = " + ep.episodesId + "";
      let linkResult = await promisePool.query(linkSql);
      let temp = new episodes(unescape(linkResult[0][0].name), linkResult[0][0].image, linkResult[0][0].description, unescape(linkResult[0][0].podcastName), linkResult[0][0].id);
      list.addEpisode(temp);
    }

    res.send({ list: list });
    return;
  }
  res.send({ list: {} });

});

app.post('/api/v1/search', async function (req, res) {
  let name = req.body.name;
  let apiClient = fetcher.getListenNotesApi();
  let podcasts = await apiClient.search({
    q: name,
    type: 'podcast',
    only_in: 'title,description',
  });
  let episodes = await apiClient.search({
    q: name,
    only_in: 'title,description',
  });
  let data = podcasts.data.results.concat(episodes.data.results);
  res.send({ data: data });
});

app.post('/api/v1/get_episode_from_podcast', async function (req, res) {
  let podcastName = req.body.podName;
  let episodeName = req.body.epName;
  let apiClient = fetcher.getPodcastIndexApi();
  let episodes = [];
  apiClient.search(podcastName).then(async (response) => {
    let podcast = response.feeds.find(pod => pod.title === podcastName);
    episodes = await apiClient.episodesByFeedId(podcast?.id);
    console.log(episodes);
    let episode = episodes.items.find(ep => ep.title === episodeName);
    apiClient.episodeById(episode.id).then(async (response) => {
      res.send({ pod: podcast, episode: response.episode, eps: episodes });
    });
  });
});

app.get('/api/v1/trending', async function (req, res) {
  let apiClient = fetcher.getPodcastIndexApi();
  apiClient.raw("/podcasts/trending")
    .then((response) => {
      res.send({data: response.feeds });
    });

});

app.get('/api/v1/randomep', async function (req, res) {
  let apiClient = fetcher.getPodcastIndexApi();
  let raw_episode = await apiClient.episodesRandom({lang: "en"});
  let episode = raw_episode.episodes[0];
  let podcast = await apiClient.podcastById(episode.feedId);
  let episodes = await apiClient.episodesByFeedId(episode.feedId);
  res.send({ pod: podcast.feed, episode: episode, eps: episodes });
});

app.post('/api/v1/searchPodcast', async function (req, res) {
  let podcastName = req.body.name;
  let apiClient = fetcher.getPodcastIndexApi();
  let episodes = [];
  apiClient.search(podcastName).then(async (response) => {
    let length = response.feeds.length
    for (let i = 0; i < length; i++) {
      let podcast = response.feeds[i];
      if (podcast.title.trim() === podcastName.trim()) {
        episodes = await apiClient.episodesByFeedId(podcast?.id);
        res.send({ pod: podcast, eps: episodes });
        return;
      }
    }
  });
});


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.post('/api/v1/user/add', async function (req, res) {
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  let result = await users.addUser(req.body.username, req.body.email, req.body.password, token);

  let myResult = {};
  myResult.username = req.body.username;
  myResult.email = req.body.email;
  myResult.token = token;
  myResult.userId = result.insertId;

  res.send(myResult);
});


// Check if a username and password is correct and generate a token
app.post('/api/v1/user/login', async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  let result = await users.checkLogin(username, password);

  if (result !== [] && result !== undefined && result.length > 0) {
    let update_token = await users.updateToken(username, password, token);

    let myResult = {};
    myResult.username = username;
    myResult.token = token;
    myResult.email = result[0].email;
    myResult.userId = result[0].id;

    res.send(myResult);
  }
});

// Check if a token and username is correct for login
app.post('/api/v1/user/auth', async function (req, res) {
  let username = req.body.username;
  let token = req.body.token;
  let result = await users.checkExistingLogin(username, token);
  res.send(result);
});

// Log a user out by resetting their token
app.post('/api/v1/user/logout', async function (req, res) {
  let username = req.body.username;
  let token = req.body.token;
  let update_token = await users.removeToken(username, token);

  let myResult = {};
  myResult.username = "";
  myResult.email = "";
  myResult.token = "";
  myResult.userId = undefined;

  res.send(myResult);
});


// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);