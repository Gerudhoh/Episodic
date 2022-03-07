'use strict'

// Require all modules needed
require('dotenv').config()
const express = require("express");
const app  = express();
const path = require('path');

const promisePool = require('./repositories/mysql');

// Import all the models for the database requests
//const users = require("./models/users");

// Import lists class
const lists = require("./lib/EpisodicList");
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
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd()+"/client/build/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/client/build/index.html");
});


// Check if a username and password is correct and generate a token


app.post('/api/v1/lists/create', async function(req, res) {
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

app.post('/api/v1/lists/add/podcast', async function(req, res) {
  let list = req.body.list;
  let podcast = req.body.podcast;

  list = new lists(list.name, list.id, list);

  //let result = list.addPodcast(podcast);
  /*
  res.send({
    list: list
  });*/

});

app.post('/api/v1/search', async function(req, res) {
    let name = req.body.name;
    let apiClient = fetcher.getListenNotesApi();
    apiClient.search({
        q: name,
        type: 'podcast',
        only_in: 'title,description',
      }).then((response) => {
        res.send(response.data.results);
      })
  
  });


// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);

