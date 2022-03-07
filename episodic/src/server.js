'use strict'

// Require all modules needed
const express = require("express");
const app  = express();
const path = require('path');
require('dotenv').config()

const promisePool = require('./repositories/mysql');

// Import all the models for the database requests
//const users = require("./models/users");

// Import classes
const users =  require("./lib/User")
const lists = require("./lib/EpisodicList")

// Expose the port specified in .env or port 5000
const port = process.env.PORT || 5000;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd()+"/client/build/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/client/build/index.html");
});

let currentUser = new users("test", 1);

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

app.get("/api/v1/lists/get/all", async function(req, res) {
  if (currentUser.episodicLists.length == 0){
  let sql = "select * from lists where userId = " + currentUser.id + "";
  //throw it into the database
  await new Promise(async (res, rej) => {
      try {
          let result = await promisePool.query(sql);
          result[0].forEach(element => {
            let list = new lists(element.name, element.id);
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

// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);
