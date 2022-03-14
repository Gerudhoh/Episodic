'use strict'

// Require all modules needed
const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config()

const promisePool = require('./repositories/mysql');

// Import classes
const users = require("./models/User")
const lists = require("./models/EpisodicList")
const podcasts = require("./models/Podcast")
const episodes = require("./models/Episode")

// Expose the port specified in .env or port 5000
const port = process.env.PORT || 5000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/client/build/"));

let currentUser = null;

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post('/api/v1/user/add', async function (req, res) {
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  let result = await users.addUser(req.body.username, req.body.password, token);

  let myResult = {};
  myResult.username = req.body.username;
  myResult.token = token;

  currentUser = myResult;

  res.send(myResult);
});


// Check if a username and password is correct and generate a token
app.post('/api/v1/user/login', async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  let result = await users.checkLogin(username, password);

  if(result !== [] && result !== undefined && result.length > 0) {
    let update_token = await users.updateToken(username, password, token);

    let myResult = {};
    myResult.username = username;
    myResult.token = token;

    currentUser = myResult;

    res.send(myResult);
  }
});

// Check if a token and username is correct for login
app.post('/api/v1/user/auth', async function(req, res) {
  let username = req.body.username;
  let token = req.body.token;

  let result = await users.checkExistingLogin(username, token);
  res.send(result);
});

// Log a user out by resetting their token
app.post('/api/v1/user/logout', async function(req, res) {
  let username = req.body.username;
  let token = req.body.token;
  
  let update_token = await users.removeToken(username, token);

  let myResult = {};
  myResult.username = username;
  myResult.token = "";

  res.send(myResult);
});


app.post('/api/v1/lists/create', async function (req, res) {
  /*
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
  */

  res.send({
    list: []
  });

});

app.post('/api/v1/lists/add/podcast', async function (req, res) {
  /*let list = req.body.list;
  let podcast = req.body.podcast;

  podcast = new podcasts("test", 1);  //Remove this line when podcasts are implemented

  list = new lists(list.name, list.id, list);
  let podcastId = podcast.id;

  if (list.podcasts.some((element) => element.id == podcastId)) {
    res.send({
      list: list
    });
    return;
  }

  list.addPodcast(podcast);

  res.send({
    list: list
  });
  */
  res.send({
    list: []
  });

});

app.post('/api/v1/lists/remove/podcast', async function (req, res) {
  /*let list = req.body.list;
  let podcast = req.body.podcast;

  podcast = new podcasts("test", 1);  //Remove this line when podcasts are implemented

  list = new lists(list.name, list.id, list);

  list.removePodcast(podcast);

  res.send({
    list: list
  });*/
  res.send({
    list: []
  });

});

app.post('/api/v1/lists/add/episode', async function (req, res) {
  /*let list = req.body.list;
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
  });*/

});

app.post('/api/v1/lists/remove/episode', async function (req, res) {
  /*let list = req.body.list;
  let episode = req.body.episode;

  episode = new episodes("test", 1);  //Remove this line when podcasts are implemented

  list = new lists(list.name, list.id, list);

  list.removeEpisode(episode);

  res.send({
    list: list
  });*/

  res.send({
    list: []
  });

});

//This endpoint needs to be deleted when we have proper user logging in and out.
//We need to set the user's lists when they log in instead of when the page loads, which is where this is called.
app.get("/api/v1/lists/get/all/temp", async function (req, res) {
  /*if (currentUser.episodicLists.length == 0) {
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
  res.send({ lists: currentUser.episodicLists });*/
  res.send({
    lists: []
  });

});

// You will need to manually refresh the page for this to work atm, because of the fact we're filling this array when the page renders and the page might not have been rendered when this is called
app.get("/api/v1/lists/get/all", async function (req, res) {
  //res.send({ lists: currentUser.episodicLists });
  res.send({
    lists: []
  });
});

// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);
