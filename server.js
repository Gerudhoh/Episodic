'use strict'

// Require all modules needed
require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path');

const promisePool = require('./repositories/mysql');

// Import classes
const users = require("./models/User")
const user_activity = require("./models/UserActivity")
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
    try {
      await new Promise(async (rem, rej) => {
        try {
          let result = await promisePool.query(sql);
          let id = result[0].insertId;
          list = new lists(name, id);
          await user_activity.addUserActivity("", "", "newList", "", userId, escape(name));

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
    catch (err) {
      console.log(err);
    }
  }
  return;

});

async function addPodcast(podcast, userId, list) {
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
        await user_activity.addUserActivity(escape(podcast.title), "", "Add", podcast.image, userId, escape(list.name));
      }
      else {
        //Created a review!
      }
      res({ success: true, id: insertId, listMsg: "Successfully added to list." });
      return;
    } catch (err) {
      console.log(err);
      let msg = "Failed to add to list.";
      if (err.code == 'ER_DUP_ENTRY') {
        msg = "This podcast is already in this list!";
      }
      res({ success: false, id: insertId, listMsg: msg });
      return;
    }
  });
}

async function addEpisode(episode, userId, list) {
  let insertId = 0;
  return await new Promise(async (res, rej) => {
    try {
      let link = episode.image;
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
        await user_activity.addUserActivity(escape(episode.title), "", "Add", episode.image, userId, escape(list.name));
      }
      else {
        //Created a review!
      }
      res({ success: true, id: insertId, listMsg: "Successfully added to list." });
      return;
    } catch (err) {
      console.log(err);
      let msg = "Failed to add to list.";
      if (err.code == 'ER_DUP_ENTRY') {
        msg = "This episode is already in this list!";
      }
      res({ success: false, id: insertId, listMsg: msg });
      return;
    }
  });
}

app.post('/api/v1/lists/add/podcast', async function (req, res) {
  let list = req.body.list;
  let podcast = new podcasts(req.body.title, req.body.description, req.body.rss, req.body.image, req.body.website || "N/A", req.body.publisher || "N/A", req.body.language || "N/A", req.body.totalEpisodes || 0, null, req.body.podcastId);
  list = new lists(list.name, list.id, list);

  await addPodcast(podcast, req.body.id, list).then(result => {
    res.send({ success: result.success, msg: result.listMsg });
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

  await addEpisode(episode, req.body.id, list).then(result => {
    res.send({ success: result.success, msg: result.listMsg });
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
    userList.forEach(element => {
      element.name = unescape(element.name);
    });

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

    try {
      for (const element of userList) {
        let list = new lists(unescape(element.name), element.id);
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
    } catch (err) {
      console.log(err);
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

    let element = userList.find(element => element?.name == escape(name));

    try {
      let list = new lists(unescape(element?.name), element.id);
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
    } catch (err) {
      res.send({ list: {}, success: false });
      return;
    }
  }
  res.send({ list: {}, success: false });

});

app.post("/api/v1/lists/delete", async function (req, res) {
  let name = req.body.name;
  let userId = req.body.id;

  let sql = "delete from lists where name = '" + escape(name) + "' and userId = " + userId;

  try {
    await promisePool.query(sql);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
})

app.post("/api/v1/reviews/add/podcast", async function (req, res) {
  let podcast = new podcasts(req.body.podcast.title, req.body.podcast.description, req.body.podcast.rss, req.body.podcast.image, req.body.podcast.website || "N/A", req.body.podcast.publisher || "N/A", req.body.podcast.language || "N/A", req.body.podcast.episodes.count || 0, null);

  await addPodcast(podcast, req.body.id).then(async result => {
    try {
      let msg = "Successfully added review.";
      let podcastId = result.id;
      let sql = "insert ignore into reviews (userId, podcastId, creationDate, rating, description) values (" + req.body.id + ", " + podcastId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
      let resultId = await promisePool.query(sql);

      let insertId = resultId[0].insertId;
      await user_activity.addUserActivity(escape(req.body.podcast.title), "", "newReview", req.body.podcast.image, req.body.id, req.body.newRating);
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

  await addEpisode(episode, req.body.id).then(async result => {
    try {
      let msg = "Successfully added review.";
      let episodeId = result.id;
      let sql = "insert ignore into reviews (userId, episodeId, creationDate, rating, description) values (" + req.body.id + ", " + episodeId + ", NOW(), " + req.body.newRating + ", '" + escape(req.body.newText) + "')";
      let resultId = await promisePool.query(sql);

      let insertId = resultId[0].insertId;
      await user_activity.addUserActivity(escape(episodejson.podcast.title), escape(episodejson.title), "newReview", episodejson.podcast.image, req.body.id, req.body.newRating);

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

app.post("/api/v1/reviews/get/user", async function (req, res) {
  await new Promise(async (rem, rej) => {
    try {

      let sql = "select reviews.*, users.*, podcasts.name as podcastName, podcasts.image as podcastImage, episodes.image as episodeImage, episodes.name as episodeName, episodes.podcastName as episodesPodcastName from reviews inner join users on users.id=reviews.userId left outer join podcasts on podcasts.id=reviews.podcastId left outer join episodes on episodes.id=reviews.episodeId where reviews.userId = " + req.body.id + "";
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
  try {
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
  } catch (err) {
    //can't access API
    console.log(err);
    res.send({ data: [] });
  }
});

app.post('/api/v1/get_episode_from_podcast', async function (req, res) {
  let podcastName = req.body.podName;
  let episodeName = req.body.epName;
  let apiClient = fetcher.getPodcastIndexApi();
  let episodes = [];
  try {
    apiClient.search(podcastName).then(async (response) => {
      let podcast = response.feeds.find(pod => pod.title === podcastName);
      episodes = await apiClient.episodesByFeedId(podcast?.id);
      let episode = episodes.items.find(ep => ep.title === episodeName);
      if (!episode) {
        return;
      }
      apiClient.episodeById(episode.id).then(async (response) => {
        res.send({ pod: podcast, episode: response.episode, eps: episodes });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/v1/trending', async function (req, res) {
  let apiClient = fetcher.getPodcastIndexApi();
  try {
    apiClient.raw("/podcasts/trending")
      .then((response) => {
        res.send({ data: response.feeds });
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/v1/randomep', async function (req, res) {
  let apiClient = fetcher.getPodcastIndexApi();
  let raw_episode = await apiClient.episodesRandom({ lang: "en" });
  let episode = raw_episode.episodes[0];
  let podcast = await apiClient.podcastById(episode.feedId);
  let episodes = await apiClient.episodesByFeedId(episode.feedId);
  res.send({ pod: podcast.feed, episode: episode, eps: episodes });
});

app.get('/api/v1/user/get/all', async function (req, res) {
  let result = await users.getAllUsers();
  res.send({ users: result });
});

app.post('/api/v1/user/update', async function (req, res) {
  let fetchedUser = await users.getUserById(req.body.id);
  let user = fetchedUser[0];
  if (!user) return;

  let doUpdate = false;
  let username = user.username;
  let email = user.email;
  let password = user.password;

  if (req.body.username !== user.username) {
    username = req.body.username;
    doUpdate = true;
  }

  if (req.body.email !== user.email) {
    email = req.body.email;
    doUpdate = true;
  }

  if (req.body.password !== user.password && req.body.password !== "") {
    password = req.body.password;
    doUpdate = true;
  }

  if (!doUpdate) {
    res.send({ info: "Don't need to do this", warning: true });
  } else {
    let result = await users.updateUser(username, email, password, req.body.id);
    res.send({ info: result.info, success: result.changedRows == 1 });
  }
});

app.post('/api/v1/searchPodcast', async function (req, res) {
  let podcastName = req.body.name;
  let apiClient = fetcher.getPodcastIndexApi();
  let episodes = [];
  try {
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
  }
  catch (err) {
    console.log(err);
  }
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
      count = count + 1;
    });
    res.send({ rating: rating / count });
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
      count = count + 1;
    });
    res.send({ rating: rating / count });
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
  let friends = [];
  friends.friends = {};
  let result = await users.addUser(req.body.username, req.body.email, req.body.password, token, friends);

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

// Check if a username and password is correct and generate a token
app.post('/api/v1/user/get/friends', async function (req, res) {
  let result = await users.getUserFriends(req.body.id);

  let myResult = [];

  if (result !== undefined && result.length > 0 && result[0].friends != undefined) {
    let friends = JSON.parse(result[0].friends);

    for (let i = 0; i < friends?.length; i++) {
      let user_friend = await users.getUserFriends(friends[i]);

      let user_friend_activity = await user_activity.getUserActivity(friends[i]);

      myResult[i] = {};

      if (user_friend !== [] && user_friend !== undefined && user_friend.length > 0) {
        myResult[i].username = user_friend[0].username;
        myResult[i].email = user_friend[0].email;
        myResult[i].id = user_friend[0].id;
        myResult[i].activity = user_friend_activity;
      }
    }
  }

  res.send(myResult);
});

// Check if a username and password is correct and generate a token
app.post('/api/v1/user_activity/get/friends', async function (req, res) {
  let all_activity = await user_activity.getUserFriendActivity(req.body.id);
  let user_friend = await users.getUserFriends(req.body.id);
  let result = [];
  let index = 0;

  if (user_friend.length > 0 && user_friend[0].friends !== undefined) {
    let friends = JSON.parse(user_friend[0].friends);

    for (let i = 0; i < all_activity.length; i++) {
      for (let j = 0; j < friends.length; j++) {
        if (parseInt(friends[j]) === parseInt(all_activity[i].user_id)) {
          result[index] = {};
          result[index].username = all_activity[i].username;
          result[index].email = all_activity[i].email;
          result[index].id = all_activity[i].user_id;
          if (all_activity[i].action_description === "newList") {
            result[index].activityInfo = {};
            result[index].activityInfo.listName = all_activity[i].list_name;
            result[index].activityInfo.reviewText = "Created list " + unescape(all_activity[i].list_name);
            result[index].activityType = "newList";
          }
          else if (all_activity[i].action_description === "listMove") {
            result[index].activityInfo = {};
            result[index].activityInfo.listName = all_activity[i].list_name;
            result[index].activityInfo.reviewText = "Moved list " + unescape(all_activity[i].list_name);
            result[index].activityType = "listMove";
          }
          else if (all_activity[i].action_description === "newReview") {
            result[index].activityInfo = {};
            result[index].activityInfo.listName = all_activity[i].list_name;
            result[index].activityInfo.podcastName = unescape(all_activity[i].podcast_name);
            result[index].activityInfo.episodeName = unescape(all_activity[i].episode_name);
            if (result[index].activityInfo.episodeName) {
              result[index].activityInfo.reviewText = "Reviewed episode " + unescape(all_activity[i].episode_name) + " (" + unescape(all_activity[i].podcast_name) + ")";
            }
            else {
              result[index].activityInfo.reviewText = "Reviewed podcast " + unescape(all_activity[i].podcast_name);
            }
            result[index].activityType = "newReview";
            result[index].image = all_activity[i].link;
          }
          else if (all_activity[i].action_description === "Add") {
            result[index].activityInfo = {};
            result[index].activityInfo.listName = "";

            if (all_activity[i].episode_name !== "" && all_activity[i].episode_name !== null) {
              result[index].activityInfo.reviewText = "Added episode \"" + unescape(all_activity[i].podcast_name) + "\" episode \"" + unescape(all_activity[i].episode_name) + "\"  to list " + all_activity[i].list_name;
              result[index].activityType = "add";
              result[index].image = all_activity[i].link;
            }
            else {
              result[index].activityInfo.reviewText = "Added podcast \"" + unescape(all_activity[i].podcast_name) + "\"  to list " + all_activity[i].list_name;
              result[index].activityType = "add";
              result[index].image = all_activity[i].link;
            }
          }
          index++;
        }
      }
    }
  }

  res.send(result);
});



app.post('/api/v1/user/add/friend', async function (req, res) {
  let search_term = req.body.search_term;
  let result = await users.getUser(search_term);

  try {
    if (result !== undefined && result[0] !== undefined) {
      let user_info = await users.getUserFriends(req.body.id);
      let newFriends = JSON.parse(user_info[0].friends);
      let friendsFriends = JSON.parse(result[0].friends);

      for (let i = 0; i < newFriends.length; i++) {
        if (newFriends[i] === result[0].id) {
          res.send({ success: false });
          return;
        }
      }

      newFriends = newFriends.concat(result[0].id);
      friendsFriends = friendsFriends.concat(parseInt(req.body.id));

      let addFriendResult = await user_activity.addFriendToUser(JSON.stringify(newFriends), req.body.id);
      let addUserAsFriendResult = await user_activity.addFriendToUser(JSON.stringify(friendsFriends), result[0].id);
      res.send({ success: true });
      return;
    }
  } catch (err) {
    console.log(err);
  }

  res.send({ success: false });
  return;
});


app.post('/api/v1/user_activity/add', async function (req, res) {
  let result = await user_activity.addUserActivity(req.body.podcast_name, req.body.episode_name, req.body.action_description, req.body.link, req.body.id, req.body.list_name);

  let myResult = {};
  myResult.podcast_name = req.body.podcast_name;
  myResult.episode_name = req.body.episode_name;
  myResult.action_description = action_description;
  myResult.link = link;
  myResult.user_id = user_id;

  res.send(myResult);
});



// Check if a username and password is correct and generate a token
app.post('/api/v1/user_activity/get', async function (req, res) {
  let myResult = [];

  let result = await users.getUserFriends(req.body.id);

  let user_friend_activity = await user_activity.getUserActivity(req.body.id);

  for (let i = 0; i < user_friend_activity.length; i++) {
    myResult[i] = {};
    if (result !== [] && result !== undefined && result[0] !== undefined) {
      myResult[i].username = result[0].username;
      myResult[i].email = result[0].email;
      myResult[i].id = result[0].id;
      if (user_friend_activity[i].action_description === "newList") {
        myResult[i].activityInfo = {};
        myResult[i].activityInfo.listName = unescape(user_friend_activity[i].list_name);
        myResult[i].activityInfo.reviewText = "Created list " + unescape(user_friend_activity[i].list_name);
        myResult[i].activityType = "newList";
      }
      else if (user_friend_activity[i].action_description === "listMove") {
        myResult[i].activityInfo = {};
        myResult[i].activityInfo.listName = unescape(user_friend_activity[i].list_name);
        myResult[i].activityInfo.reviewText = "Moved list " + unescape(user_friend_activity[i].list_name);
        myResult[i].activityType = "listMove";
      }
      else if (user_friend_activity[i].action_description === "newReview") {
        myResult[i].activityInfo = {};
        myResult[i].activityInfo.listName = unescape(user_friend_activity[i].list_name);
        myResult[i].activityInfo.podcastName = unescape(user_friend_activity[i].podcast_name);
        myResult[i].activityInfo.episodeName = unescape(user_friend_activity[i].episode_name);
        if (myResult[i].activityInfo.episodeName) {
          myResult[i].activityInfo.reviewText = "Reviewed episode " + unescape(user_friend_activity[i].episode_name) + " (" + unescape(user_friend_activity[i].podcast_name) + ")";
        }
        else {
          myResult[i].activityInfo.reviewText = "Reviewed podcast " + unescape(user_friend_activity[i].podcast_name);
        }
        myResult[i].image = user_friend_activity[i].link;
        myResult[i].activityType = "newReview";
      }
      else if (user_friend_activity[i].action_description === "Add") {
        myResult[i].activityInfo = {};
        myResult[i].activityInfo.listName = "";

        if (user_friend_activity[i].episode_name !== "" && user_friend_activity[i].episode_name !== null) {
          myResult[i].activityInfo.reviewText = "Added episode \"" + unescape(user_friend_activity[i].podcast_name) + "\" episode \"" + unescape(user_friend_activity[i].episode_name) + "\"  to list " + unescape(user_friend_activity[i].list_name);
          myResult[i].activityType = "add";
          myResult[i].image = user_friend_activity[i].link;
        }
        else {
          myResult[i].activityInfo.reviewText = "Added podcast \"" + unescape(user_friend_activity[i].podcast_name) + "\"  to list " + unescape(user_friend_activity[i].list_name);
          myResult[i].activityType = "add";
          myResult[i].image = user_friend_activity[i].link;
        }
      }
    }
  }

  res.send(myResult);
});


// Check if a username and password is correct and generate a token
app.post('/api/v1/user_activity/get/friend', async function (req, res) {
  let result = await users.getUserFriends(req.body.id);

  let myResult = [];

  if (result !== undefined && result[0] !== undefined && result[0].friends !== undefined) {
    let friends = JSON.parse(result[0].friends);

    for (let i = 0; i < friends?.length; i++) {
      let user_friend = await users.getUserFriends(friends[i]);

      let user_friend_activity = await user_activity.getUserActivity(friends[i]);

      for (let j = 0; j < user_friend_activity.length; j++) {
        myResult[i] = {};

        if (user_friend !== [] && user_friend !== undefined && user_friend.length > 0) {
          myResult[i].username = user_friend[0].username;
          myResult[i].email = user_friend[0].email;
          myResult[i].id = user_friend[0].id;
          myResult[i].activityInfo = user_friend_activity[0].link;
          myResult[i].activityType = user_friend_activity[0].activityType;
        }
      }
    }
  }

  res.send(myResult);
});

// Listen to the specified port for api requests
app.listen(port);
console.log('Running app at localhost: ' + port);