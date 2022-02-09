const SpotifyWebApi = require('spotify-web-api-node');
const { Client } = require('podcast-api');

export default class DataFetcher {
    constructor(spotifyApiKey, spotifySecret, listenNotesApiKey, podcastIndexApiKey, podcastIndexSecret) {    
        this.spotifyApi = new SpotifyWebApi({ 
            clientId: spotifyApiKey, 
            clientSecret: spotifySecret, 
            redirectUri: 'ADD' 
        });; 
        this.spotifyApi.setAccessToken(spotifyApiKey);
      
        this.podcastIndexApi = require('podcast-index-api')(podcastIndexApiKey, podcastIndexSecret);
  
        this.listenNotesApi = Client({ 
            apiKey: listenNotesApiKey 
        });   
    } 

    fetchSpotifyPodcast(podcastName){ 
    //Fetches a specified podcast from Spotify 
    }
    
    fetchListenNotesPodcast(podcastName) {
    //  Fetches a specified podcast from ListenNotes  
    }
    
    
    fetchSpotifyEpisode(podcastName, episodeName) {
    // Fetches a specified episode from Spotify 
    }
    
    
    fetchListenNotesEpisode(podcastName, episodeName) {
    // Fetches a specified episode from ListenNotes 
    }
    
    fetchPodcastsRecommendations(listenedList) {
    //Uses ListenNotes’s recommendations endpoint to fetch recommendations for each podcast in a list, using the fetchRecommendation method and adding the newly fetched  to method's returned  
    }
    
    
    fetchPodcastGenres() {
    // Uses ListenNote’s genre fetching endpoint to fetch podcast genres 
    } 
    
    
    fetchBestPodcastsByGenre(genre) {
    // Uses ListenNote’s genre fetching endpoint to fetch the best podcasts in a genre 
    }
    
    
    fetchPodcastRecommendation(podcast) {
    // Uses ListenNote’s recommendations endpoint to fetch recommendations for the given podcast 
    }
    
    
    fetchEpisodeRecommendation(episode) {
    // Uses ListenNote’s episode recommendation endpoint to fetch recommendations for the given podcast 
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