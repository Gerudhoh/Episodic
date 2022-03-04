const SpotifyWebApi = require('spotify-web-api-node');
const { Client } = require('podcast-api');
const PodcastIndexClient = require("podcastdx-client");
const PodcastIndexDataAdapter = require("./PodcastIndexDataAdapter.js")
const ListenNotesDataAdapter = require("./ListenNotesDataAdapter.js")

class DataFetcher {
    constructor(spotifyApiKey, spotifySecret, listenNotesApiKey, podcastIndexApiKey, podcastIndexSecret) {    
        // this.spotifyApi = new SpotifyWebApi({ 
        //     clientId: spotifyApiKey, 
        //     clientSecret: spotifySecret, 
        //     redirectUri: 'https://episodic.azurewebsites.net/' 
        // });; 
        // this.spotifyApi.setAccessToken(spotifyApiKey);
      
        this.podcastIndexApi = new PodcastIndexClient({
            key: podcastIndexApiKey,
            secret: podcastIndexSecret,
            // opt-out of analytics collection
            disableAnalytics: true,
          });
          this.podcastIndexDataAdapter = new PodcastIndexDataAdapter();
  
        this.listenNotesApi = Client({ 
            apiKey: listenNotesApiKey 
        });
        this.listenNotesDataAdapter = new ListenNotesDataAdapter()
    } 

    fetchSpotifyPodcast(podcastName){ 
    //Fetches a specified podcast from Spotify 
    }

    fetchPodcasts(podcastName) {
        this.listenNotesApi.search({
            q: podcastName,
            type: 'podcast',
            only_in: 'title,description',
          }).then((response) => {
              return this.listenNotesDataAdapter.adaptPodcasts(response.data.results);
          })
    }

    fetchListenNotesPodcast(podcastName) {
        this.listenNotesApi.search({
            q: podcastName,
            type: 'podcast',
            only_in: 'title,description',
          }).then((response) => {
              let length = response.data.results.length;
              let found = false;
              for(let i = 0; i < length; i++) {
                  let podcast = response.data.results[i];
                  if (podcast.title_original === podcastName) {
                    found = true;
                    let pod = this.listenNotesDataAdapter.adaptPodcast(podcast);
                    // console.log(pod.stringify());
                    return pod;
                  } 
              }
              if(found === false) {
                  return null;
              }
          })
    }
    
    fetchPodcastIndexPodcast(podcastName) {
        //  Fetches a specified podcast from ListenNotes  
        this.podcastIndexApi.search(podcastName).then((response) => {
            let length = response.feeds.length
            for(let i = 0; i < length; i++) {
                let podcast = response.feeds[i];
                if (podcast.title === podcastName) {
                    let pod = this.podcastIndexDataAdapter.adaptPodcast(podcast);
                    // console.log(pod.stringify());
                    return pod;
                } 
            }
            }
        );
    }
    
    
    fetchSpotifyEpisode(podcastName, episodeName) {
    // Fetches a specified episode from Spotify 
    }
    
    
    fetchListenNotesEpisode(podcastName, episodeName) {
        // Fetches a specified episode from ListenNotes
        this.listenNotesApi.search({
            q: episodeName,
            type: 'episode',
            only_in: 'title,description',
          }).then((response) => {
            let length = response.data.results.length;
              let found = false;
              for(let i = 0; i < length; i++) {
                  let episode = response.data.results[i];
                  if (episode.title_original === episodeName &&
                    episode.podcast.title_original === podcastName) {
                    found = true;
                    let ep = this.listenNotesDataAdapter.adaptEpisode(episode, episode.podcast);
                    // console.log(ep.stringify());
                    return ep;
                  } 
              }
              if(found === false) {
                  return null;
              }
          });
    }
    
    fetchPodcastsRecommendations(listenedList) {
    //Uses ListenNotes’s recommendations endpoint to fetch recommendations for each podcast in a list, using the fetchRecommendation method and adding the newly fetched  to method's returned  
    }
    
    
    fetchPodcastGenres() {
    // Uses ListenNote’s genre fetching endpoint to fetch podcast genres 
    // Genre needs to be its own user story
        this.listenNotesApi.fetchPodcastGenres({ top_level_only: 1 }).then((response) => {
            return response.data;
          }).catch((error) => {
            console.log(error);
          });
    } 
    
    
    fetchBestPodcastsByGenre(genre) {
    // Uses ListenNote’s genre fetching endpoint to fetch the best podcasts in a genre 
    // Genre needs to be its own user story
    }
    
    
    fetchPodcastRecommendation(podcast) {
    // Uses ListenNote’s recommendations endpoint to fetch recommendations for the given podcast
        this.listenNotesApi.fetchRecommendationsForPodcast({ id: podcast.listenNotesId }).then((response) => {
            return this.listenNotesDataAdapter.adaptPodcasts(response.data.recommendations);
          }).catch((error) => {
            console.log(error);
          });
    }
    
    
    fetchEpisodeRecommendation(episode) {
    // Uses ListenNote’s episode recommendation endpoint to fetch recommendations for the given podcast 
        this.listenNotesApi.fetchRecommendationsForEpisode({ id: episode.listenNotesId }).then((response) => {
            return this.listenNotesDataAdapter.adaptEpisodes(response.data.recommendations);
          }).catch((error) => {
            console.log(error);
          });
    } 
    
    getEpisodesSpotifyId(episode) {
    // Fetches the given podcast episode from the Spotify API and returns its ID 
    }
    
    playEpisode(episode) {
    // Uses Spotify’s api to play a specified episode. Gets the Episode’s Spotify id (needed to play the episode) from the getEpisodesSpotifyId method. 
    }
    
    pauseEpisode(episode) { 
    // Uses Spotify’s api to pause the playing episode. Gets the Episode’s Spotify id (needed to pause the episode) from the getEpisodesSpotifyId method.
    }
                
}

module.exports = DataFetcher;