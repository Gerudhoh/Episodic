const DataFetcher = require("./lib/api-data/DataFetcher.js")
const { Client } = require('podcast-api');
const Podcast = require("./lib/Podcast.js");

const fetcher = new DataFetcher(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.LISTEN_NOTES_KEY,
  process.env.PODCAST_INDEX_KEY,
  process.env.PODCAST_INDEX_SECRET)

  let listenNotesApi = Client({ 
    apiKey: process.env.LISTEN_NOTES_KEY 
});  

// listenNotesApi.search({
//   q: 'Getting Literate',
// }).then((response) => {
//   console.log(response.data);
// })

// fetcher.fetchListenNotesPodcast("Getting Literate");
// console.log(pod.stringify())

// fetcher.fetchPodcastIndexPodcast("Getting Literate");

fetcher.fetchListenNotesEpisode("Getting Literate", "Getting Organized with Murder On The Orient Express");