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


// Check if a username and password is correct and generate a token
let currentUser = null;

app.post('/api/v1/lists/create', async function (req, res) {
  let name = req.body.name;
  let list = null;

  if (currentUser && currentUser.id !== undefined) {
    let userId = currentUser.id;
    let sql = "insert into lists (name, userId) values ('" + name + "', " + userId + ")";


    //throw it into the database
    await new Promise(async (rem, rej) => {
      try {
        let result = await promisePool.query(sql);
        let id = result[0].insertId;
        list = new lists(name, id);
        //currentUser.addEpisodicList(list);
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
  let podcast = new podcasts(req.body.title, req.body.description, req.body.rss, req.body.image, req.body.website || "N/A", req.body.publisher || "N/A", req.body.language || "N/A", req.body.genre || [], req.body.explicit || false, req.body.totalEpisodes || 0, null, req.body.podcastId);
  list = new lists(list.name, list.id, list);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "insert ignore into podcasts (name, rss, description, image, website, publisher, language, genre, explicit, totalEpisodes) values ('" + podcast.title + "', '" + podcast.rss + "', '" + escape(podcast.description) + "', '" + podcast.image + "', '" + podcast.website + "', '" + podcast.publisher + "', '" + podcast.language + "', '" + podcast.genre.toString() + "', " + podcast.explicit + ", " + podcast.totalEpisodes + ")";
      let result = await promisePool.query(sql);
      let insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from podcasts where name = '" + podcast.title + "'";
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
      let sql = "select id from podcasts where name = '" + name + "'";
      let result = await promisePool.query(sql);
      list.removePodcast(result[0][0].id);
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
  let episode = new episodes(episodejson.title, req.body.image, episodejson.description, episodejson.explicit == "explicit", episodejson.website, episodejson.podcast.title);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "insert ignore into episodes (name, rss, description, image, explicit, podcastName) values ('" + episode.title + "','" + episode.rss + "','" + escape(episode.description) + "', '" + episode.image + "'," + episode.explicit + ",'" + episode.podcast + "')";
      let result = await promisePool.query(sql);
      let insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from episodes where name = '" + episode.title + "'";
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
      let sql = "select id from episodes where name = '" + name + "'";
      let result = await promisePool.query(sql);
      list.removeEpisode(result[0][0].id);
      res.send({ success: true });
      return;
    } catch (err) {
      console.log(err);
      res.send({ success: false });
      return;
    }
  });

});

app.get("/api/v1/lists/get/all/names", async function (req, res) {

  if (currentUser && currentUser.id !== undefined) {

    let userList = await users.getUserLists(currentUser.id);

    res.send({ lists: userList, noUser: false });
    return;
  }
  res.send({ lists: [], noUser: true });

});

// This endpoint is VERY slow because it needs to pull everything out of the database, not sure if there's a better way to do this but it's good enough for now
app.get("/api/v1/lists/get/all", async function (req, res) {

  if (currentUser && currentUser.id !== undefined) {

    let userList = await users.getUserLists(currentUser.id);

    let i = 0;
    for (const element of userList) {
      let list = new lists(element.name, element.id);
      let sql = "select * from lists_podcasts_link where listsId = " + list.id + "";
      let newResult = await promisePool.query(sql);
      for (const pod of newResult[0]) {
        let linkSql = "select * from podcasts where id = " + pod.podcastsId + "";
        let linkResult = await promisePool.query(linkSql);
        let temp = new podcasts(linkResult[0][0].name, linkResult[0][0].description, linkResult[0][0].rss, linkResult[0][0].image, linkResult[0][0].website, linkResult[0][0].publisher, linkResult[0][0].language, linkResult[0][0].genre.split(","), linkResult[0][0].explicit, linkResult[0][0].totalEpisodes);
        list.addPodcast(temp);
      }

      sql = "select * from lists_episodes_link where listsId = " + list.id + "";
      newResult = await promisePool.query(sql);
      for (const ep of newResult[0]) {
        let linkSql = "select * from episodes where id = " + ep.episodesId + "";
        let linkResult = await promisePool.query(linkSql);
        let temp = new episodes(linkResult[0][0].name, linkResult[0][0].image, linkResult[0][0].description, linkResult[0][0].explicit, linkResult[0][0].rss, linkResult[0][0].podcastName, linkResult[0][0].id);
        list.addEpisode(temp);
      }

      userList[i] = list;
      i++;

      if (i >= 3) break;
    }

    res.send({ lists: userList, noUser: false });
    return;
  }
  res.send({ lists: [], noUser: true });

});

app.post("/api/v1/lists/get/one", async function (req, res) {

  let name = req.body.name;

  if (currentUser && currentUser.id !== undefined) {

    let userList = await users.getUserLists(currentUser.id);
    if(userList) {
      res.send({ list: {} });
      return;
    }
    
    let element = userList.find(element => element?.name == name);

    let list = new lists(element.name, element.id);
    let sql = "select * from lists_podcasts_link where listsId = " + list.id + "";
    let newResult = await promisePool.query(sql);
    for (const pod of newResult[0]) {
      let linkSql = "select * from podcasts where id = " + pod.podcastsId + "";
      let linkResult = await promisePool.query(linkSql);
      let temp = new podcasts(linkResult[0][0].name, linkResult[0][0].description, linkResult[0][0].rss, linkResult[0][0].image, linkResult[0][0].website, linkResult[0][0].publisher, linkResult[0][0].language, linkResult[0][0].genre.split(","), linkResult[0][0].explicit, linkResult[0][0].totalEpisodes);
      list.addPodcast(temp);
    }

    sql = "select * from lists_episodes_link where listsId = " + list.id + "";
    newResult = await promisePool.query(sql);
    for (const ep of newResult[0]) {
      let linkSql = "select * from episodes where id = " + ep.episodesId + "";
      let linkResult = await promisePool.query(linkSql);
      let temp = new episodes(linkResult[0][0].name, linkResult[0][0].image, linkResult[0][0].description, linkResult[0][0].explicit, linkResult[0][0].rss, linkResult[0][0].podcastName, linkResult[0][0].id);
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
  apiClient.search({
    q: name,
    type: 'podcast',
    only_in: 'title,description',
  }).then((response) => {
    res.send({ data: response.data.results });
  }).catch(err => { });

});

app.post('/api/v1/search', async function (req, res) {
  let name = req.body.name;
  let apiClient = fetcher.getListenNotesApi();
  apiClient.search({
    q: name,
    type: 'podcast',
    only_in: 'title,description',
  }).then((response) => {
    res.send({ data: response.data.results });
  }).catch(err => { console.log(err); });
});

app.post('/api/v1/searchPodcast', async function (req, res) {
  let podcastName = req.body.name;
  console.log(podcastName);
  let apiClient = fetcher.getPodcastIndexApi();
  let episodes = [];
  await apiClient.search(podcastName).then(async (response) => {
    let length = response.feeds.length
    for (let i = 0; i < length; i++) {
      let podcast = response.feeds[i];
      if (podcast.title === podcastName) {
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
  currentUser = null;

  let result = await users.addUser(req.body.username, req.body.email, req.body.password, token);

  let myResult = {};
  myResult.username = req.body.username;
  myResult.email = req.body.email;
  myResult.token = token;
  myResult.id = result.insertId;


  currentUser = myResult;

  res.send(myResult);
});


// Check if a username and password is correct and generate a token
app.post('/api/v1/user/login', async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  currentUser = null;

  console.log(username)
  console.log(password)

  let result = await users.checkLogin(username, password);

  console.log(result)

  if (result !== [] && result !== undefined && result.length > 0) {
    let update_token = await users.updateToken(username, password, token);

    let myResult = {};
    myResult.username = username;
    myResult.token = token;
    myResult.email = req.body.email;
    myResult.id = result[0].id;

    currentUser = myResult;

    res.send(myResult);
  }
});

// Check if a token and username is correct for login
app.post('/api/v1/user/auth', async function (req, res) {
  let username = req.body.username;
  let token = req.body.token;

  let result = await users.checkExistingLogin(username, token);
  currentUser = result[0];
  res.send(result);
});

// Log a user out by resetting their token
app.post('/api/v1/user/logout', async function (req, res) {
  let username = req.body.username;
  let token = req.body.token;

  let update_token = await users.removeToken(username, token);

  let myResult = {};
  myResult.username = "";
  myResult.username = "";
  myResult.token = "";
  myResult.id = undefined;

  res.send(myResult);
});



// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);