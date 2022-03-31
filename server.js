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
    let sql = "insert into lists (name, userId) values ('" + escape(name) + "', " + userId + ")";

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

async function addPodcast(podcast, list) {
  let insertId = 0;
  return await new Promise(async (res, rej) => {
    try {
      let sql = "insert ignore into podcasts (name, rss, description, image, website, publisher, language, totalEpisodes) values ('" + escape(podcast.title) + "', '" + podcast.rss + "', '" + escape(podcast.description) + "', '" + podcast.image + "', '" + podcast.website + "', '" + podcast.publisher + "', '" + podcast.language + "', " + podcast.totalEpisodes + ")";
      let result = await promisePool.query(sql);
      insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from podcasts where name = '" + escape(podcast.title) + "'";
        let result = await promisePool.query(sql);
        insertId = result[0][0].id;
      }
      podcast.databaseId = insertId;
      if (list) {
        list.addPodcast(podcast);
        let linkSql = "insert into lists_podcasts_link (listsId, podcastsId) values (" + list.id + ", " + podcast.databaseId + ")";
        await promisePool.query(linkSql);
      }
      res({ success: true, id: insertId});
      return;
    } catch (err) {
      console.log(err);
      res({ success: false, id: insertId});
      return;
    }
  });
}

async function addEpisode(episode, list) {
  let insertId = 0;
  return await new Promise(async (res, rej) => {
    try {
      let sql = "insert ignore into episodes (name, description, image, podcastName) values ('" + escape(episode.title) + "','" + escape(episode.description) + "', '" + episode.image + "','" + escape(episode.podcast) + "')";
      let result = await promisePool.query(sql);
      insertId = result[0].insertId;
      if (insertId == "0") {
        let sql = "select id from episodes where name = '" + escape(episode.title) + "'";
        let result = await promisePool.query(sql);
        insertId = result[0][0].id;
      }
      episode.databaseId = insertId;
      if (list) {
        list.addEpisode(episode);
        let linkSql = "insert into lists_episodes_link (listsId, episodesId) values (" + list.id + ", " + episode.databaseId + ")";
        await promisePool.query(linkSql);
      }
      res({ success: true, id: insertId });
      return;
    } catch (err) {
      console.log(err);
      res({ success: false, id: insertId });
      return;
    }
  });
}

app.post('/api/v1/lists/add/podcast', async function (req, res) {
  let list = req.body.list;
  let podcast = new podcasts(req.body.title, req.body.description, req.body.rss, req.body.image, req.body.website || "N/A", req.body.publisher || "N/A", req.body.language || "N/A", req.body.totalEpisodes || 0, null, req.body.podcastId);
  list = new lists(list.name, list.id, list);

  await addPodcast(podcast, list).then(result => {
    res.send({ success: result.success });
  });
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

  await addEpisode(episode, list).then(result => {
    res.send({ success: result.success });
  });
  return;

});

app.post('/api/v1/lists/remove/episode', async function (req, res) {
  let list = req.body.list;
  let name = req.body.name;
  list = new lists(list.name, list.id, list);

  await new Promise(async (rem, rej) => {
    try {
      let sql = "select id from episodes where name = '" + escape(req.body.name) + "' and podcastName = '" + escape(req.body.podcastName) + "'";
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

    res.send({ list: list, success: true });
    return;
  }
  res.send({ list: {}, success: false });

});

app.post("/api/v1/lists/delete", async function (req, res) {
  let name = req.body.name;
  let userId = req.body.id;

  let sql = "delete from lists where name = '" + name + "' and userId = " + userId;

  try {
    await promisePool.query(sql);
    res.send({success: true});
  } catch (err) {
    console.log(err);
    res.send({success: false});
  }
})

app.post("/api/v1/reviews/add/podcast", async function (req, res) {
  let podcast = new podcasts(req.body.podcast.title, req.body.podcast.description, req.body.podcast.rss, req.body.podcast.image, req.body.podcast.website || "N/A", req.body.podcast.publisher || "N/A", req.body.podcast.language || "N/A", req.body.podcast.episodes.count || 0, null);

  await addPodcast(podcast).then(async result => {
    try {
      let msg = "Successfully added review.";
      let podcastId = result.id;
      let sql = "insert ignore into reviews (userId, podcastId, creationDate, rating, description) values (" + req.body.id + ", " + podcastId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
      let resultId = await promisePool.query(sql);
      
      let insertId = resultId[0].insertId;
      if (insertId == "0") {
        let newSql = "select id from reviews where userId = " + req.body.id + " and podcastId = " + podcastId;
        let newResult = await promisePool.query(newSql);
        let newId = newResult[0][0].id;
        let deleteSql = "delete from reviews where id = " + newId;
        await promisePool.query(deleteSql);
        sql = "insert ignore into reviews (userId, podcastId, creationDate, rating, description) values (" + req.body.id + ", " + podcastId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
        await promisePool.query(sql);
        msg = "Successfully updated review."
      }
      res.send({ success: true, msg: msg });
      return;
    } catch (err) {
      console.log(err)
      res.send({ success: false, msg: "Could not add review." });
      return;
    }
  });
})

app.post("/api/v1/reviews/add/episode", async function (req, res) {
  let episodejson = req.body.episode;
  let episode = new episodes(episodejson.title, episodejson.podcast.image, episodejson.description, episodejson.podcast.title);

  await addEpisode(episode).then(async result => {
    try {
      let msg = "Successfully added review.";
      let episodeId = result.id;
      let sql = "insert ignore into reviews (userId, episodeId, creationDate, rating, description) values (" + req.body.id + ", " + episodeId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
      let resultId = await promisePool.query(sql);
      
      let insertId = resultId[0].insertId;
      if (insertId == "0") {
        let newSql = "select id from reviews where userId = " + req.body.id + " and episodeId = " + episodeId;
        let newResult = await promisePool.query(newSql);
        let newId = newResult[0][0].id;
        let deleteSql = "delete from reviews where id = " + newId;
        await promisePool.query(deleteSql);
        sql = "insert ignore into reviews (userId, episodeId, creationDate, rating, description) values (" + req.body.id + ", " + episodeId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
        await promisePool.query(sql);
        msg = "Successfully updated review."
      }

      res.send({ success: true, msg: msg });
      return;
    } catch {
      res.send({ success: false, msg: "Could not add review." });
      return;
    }
  });
})

app.post("/api/v1/reviews/get/podcast", async function (req, res) {
  await new Promise(async (rem, rej) => {
    try {
      let idSql = "select id from podcasts where name = '" + escape(req.body.name) + "'";
      let idResult = await promisePool.query(idSql);
      let id = idResult[0][0].id;

      let sql = "select * from reviews inner join users on users.id=reviews.userId where reviews.podcastId = " + id + "";
      let results = await promisePool.query(sql);

      res.send({ results: results[0] });
    } catch (err) {
      res.send({ results: [] });
      return;
    }
  });
})

app.post("/api/v1/reviews/get/episode", async function (req, res) {
  await new Promise(async (rem, rej) => {
    try {
      let idSql = "select id from episodes where name = '" + escape(req.body.name) + "' and podcastName = '" + escape(req.body.podcastName) + "'";
      let idResult = await promisePool.query(idSql);
      let id = idResult[0][0].id;

      let sql = "select * from reviews inner join users on users.id=reviews.userId where reviews.episodeId = " + id + "";
      let results = await promisePool.query(sql);

      res.send({ results: results[0] });
    } catch (err) {
      res.send({ results: [] });
      return;
    }
  });
})

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
      res.send({ data: response.feeds });
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

app.post('/api/v1/rating/get/podcast', async function (req, res) {
  let sql = "select id from podcasts where name = '" + escape(req.body.name) + "'";
  let result = await promisePool.query(sql);
  if (result.length <= 0 || result[0].length <= 0) {
    res.send({ rating: 0 });
    return;
  }
  
  let id = result[0][0].id;
  try {
    sql = "select rating from reviews where podcastId = " + id;
    let results = await promisePool.query(sql);
    let count = 0;
    let rating = 0;
    results[0].forEach(element => {
      rating = rating + element.rating;
      count = count+1;
    });
    res.send({ rating: rating/count });
    return;
  } catch {
    res.send({ rating: 0 });
    return;
  }
})

app.post('/api/v1/rating/get/episode', async function (req, res) {
  let sql = "select id from episodes where name = '" + escape(req.body.name) + "' and podcastName = '" + escape(req.body.podcastName) + "'";
  let result = await promisePool.query(sql);
  if (result.length <= 0 || result[0].length <= 0) {
    res.send({ rating: 0 });
    return;
  }
  
  let id = result[0][0].id;
  try {
    sql = "select rating from reviews where episodeId = " + id;
    let results = await promisePool.query(sql);
    let count = 0;
    let rating = 0;
    results[0].forEach(element => {
      rating = rating + element.rating;
      count = count+1;
    });
    res.send({ rating: rating/count });
    return;
  } catch {
    res.send({ rating: 0 });
    return;
  }
})

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