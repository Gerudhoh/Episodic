'use strict'

// Require all modules needed
require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path');

const promisePool = require('./repositories/mysql');

// Import all the models for the database requests
//const users = require("./models/users");

// Import classes
const users = require("./lib/User")
const lists = require("./lib/EpisodicList")
const podcasts = require("./lib/Podcast")
const episodes = require("./lib/Episode")
const DataFetcher = require("./lib/api-data/DataFetcher.js");

// Expose the port specified in .env or port 5000
const port = process.env.PORT || 5000;

const fetcher = new DataFetcher(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.LISTEN_NOTES_KEY,
  process.env.PODCAST_INDEX_KEY,
  process.env.PODCAST_INDEX_SECRET)

var bodyParser = require('body-parser');
const User = require('./lib/User');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let buildFolder = path.join(process.cwd(), "build");
app.use(express.static(buildFolder));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});


// Check if a username and password is correct and generate a token

let currentUser = new User(null, 1);

app.post('/api/v1/lists/create', async function (req, res) {
  let name = req.body.name;

  let userId = 1; //Not sure where to find current user atm, do we need to pass this? 
  let sql = "insert into lists (name, userId) values ('" + name + "', " + userId + ")";

  let list = null;
  //throw it into the database
  await new Promise(async (res, rej) => {
    try {
      let result = await promisePool.query(sql);
      let id = result[0].insertId;
      list = new lists(name, id);
      currentUser.addEpisodicList(list);
      res(list);
    } catch (err) {
      console.log(err);
      res(err);
    }
  });

  res.send({
    list: list
  });

});

app.post('/api/v1/lists/add/podcast', async function (req, res) {
  let list = req.body.list;
  let podcastId = req.body.podcastId;

  list = new lists(list.name, list.id, list);

  if (list.podcasts.some((element) => element.id == podcastId)) {
    res.send({
      success: false
    });
    return;
  }

  res.send({
    success: false
  });

});

app.post('/api/v1/lists/remove/podcast', async function (req, res) {
  let list = req.body.list;
  let podcast = req.body.podcast;

  podcast = new podcasts("test", 1);  //Remove this line when podcasts are implemented

  list = new lists(list.name, list.id, list);

  list.removePodcast(podcast);

  res.send({
    list: list
  });

});

app.post('/api/v1/lists/add/episode', async function (req, res) {
  let list = req.body.list;
  let episode = req.body.episode;

  episode = new episodes("test", 1); //Remove this line when episodes are implemented

  list = new lists(list.name, list.id, list);
  let episodeId = episode.id;

  if (list.episodes.some((element) => element.id == episodeId)) {
    res.send({
      list: list
    });
    return;
  }

  list.addEpisode(episode);

  res.send({
    list: list
  });

});

app.post('/api/v1/lists/remove/episode', async function (req, res) {
  let list = req.body.list;
  let episode = req.body.episode;

  episode = new episodes("test", 1);  //Remove this line when podcasts are implemented

  list = new lists(list.name, list.id, list);

  list.removeEpisode(episode);

  res.send({
    list: list
  });

});

//This endpoint needs to be deleted when we have proper user logging in and out.
//We need to set the user's lists when they log in instead of when the page loads, which is where this is called.
app.get("/api/v1/lists/get/all/temp", async function (req, res) {
  if (currentUser.episodicLists.length == 0) {
    let sql = "select * from lists where userId = " + currentUser.id + "";
    await new Promise(async (res, rej) => {
      try {
        let result = await promisePool.query(sql);
        let i = 0;
        result[0].forEach(async (element) => {
          let list = new lists(element.name, element.id);
          sql = "select * from lists_podcasts_link where listsId = " + list.id + "";
          let newResult = await promisePool.query(sql);
          newResult[0].forEach(async (element) => {
            let linkSql = "select * from podcasts where id = " + element.podcastsId + "";
            let linkResult = await promisePool.query(linkSql);
            let newPodcast = new podcasts(linkResult[0][0].name, linkResult[0][0].id);
            list.addPodcast(newPodcast);
          });
          sql = "select * from lists_episodes_link where listsId = " + list.id + "";
          newResult = await promisePool.query(sql);
          newResult[0].forEach(async (element) => {
            let linkSql = "select * from episodes where id = " + element.episodesId + "";
            let linkResult = await promisePool.query(linkSql);
            let newEpisode = new episodes(linkResult[0][0].name, linkResult[0][0].id);
            list.addEpisode(newEpisode);
          });
          currentUser.addEpisodicList(list);
        });
        res({ lists: currentUser.episodicLists });

      } catch (err) {
        console.log(err);
        res(err);
      }
    });
  }
  res.send({ lists: currentUser.episodicLists });

});

app.post('/api/v1/search', async function (req, res) {
  let name = req.body.name;
  let apiClient = fetcher.getListenNotesApi();
  apiClient.search({
    q: name,
    type: 'podcast',
    only_in: 'title,description',
  }).then((response) => {
    console.log(response.data.results);
    res.send({ data: response.data.results });
  })

});

// You will need to manually refresh the page for this to work atm, because of the fact we're filling this array when the page renders and the page might not have been rendered when this is called
app.get("/api/v1/lists/get/all", async function (req, res) {
  res.send({ lists: currentUser.episodicLists });
});

// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);
