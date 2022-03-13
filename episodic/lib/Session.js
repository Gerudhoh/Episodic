const User = require("./User.js");
const DataFetcher = require("./api-data/DataFetcher.js");
const DatabaseConnection = require("./DatabaseConnection.js");
const SpotifyAdapter = require("./api-data/SpotifyDataAdapter.js");
const PodcastIndexAdapter = require("./api-data/PodcastIndexAdapter.js");
const ListenNotesAdapter = require("./api-data/ListenNotesAdapter.js");

class Session {
    constructor() {
        this.user = null;
        this.DataFetcher = new DataFetcher(
            "spotifyApikey",
            "spotifySecret",
            "listenNotesApiKey",
            "podcastIndexApiKey",
            "podcastIndexSecret"
        );
        let databaseInfo = new Map();
        databaseInfo.set("host", "INSERT HOSTNAME");
        databaseInfo.set("username", "INSERT USERNAME");
        databaseInfo.set("password", "INSERT PASSWORD");
        this.databaseConnection = new DatabaseConnection(databaseInfo);
        this.spotifyAdapter = new SpotifyAdapter();
        this.listenNotesAdapter = new ListenNotesAdapter();
        this.podcastIndexAdapter = new PodcastIndexAdapter();
    }

    login() {
        // Fetches the user’s info from the database using the DatabaseConnector’s readUser() method 
    }

    logout() {
        // Writes the user’s info to the database using the DatabaseConnector’s writeUser() method and signs them out 
    }
    /*
    ===========================================================
    NOTE: The following methods all update the User’s activity 
    ===========================================================
    */
    
    addPodcastToList(podcastName, listName) {
        // Fetches the podcast from the ListenNotes API using the DataFetcher 
        // Uses the ListenNotesAdapter to turn the fetched podcast information into a Podcast object 
        // Adds the podcast to the specified list using the User’s addPodcastToList method. 
    }
    
    removePodcastFromList(podcastName, listName) {
        // Gets the specified from the user 
        // Removes the podcast from the list 
    }
    
    updatePodcast(podcast) {
        // Calls the user’s removePodcastFromList, then addPodcastToList  
    }
    
    ratePodcast(podcastName) {
        // Creates a Rating object based on the review 
        // Calls the Podcast’s updateRating method 
    }
    
    addEpisodeToList(episodeName, listName) {
        // Fetches the episode from the ListenNotes API using the DataFetcher 
        // Uses the ListenNotesAdapter to turn the fetched podcast information into an Episode object 
        // Adds the podcast to the specified list using the User’s addEpisodeToList method. 
    }
    
    removeEpisodeFromList(episodeName, listName) {
        // Gets the specified from the user 
        // Removes the Episode from the list 
    }
    
    updateEpisode(episode) {
        // Calls the user’s removeEpisodeFromList, then addEpisodeToList 
    }
    
    rateEpisode(episodeName) {
        // Creates a Rating object based on the review 
        // Calls the Episode’s updateRating method 
    }
    
    addFriend(username) {
        // Adds a friend to the User’s friendsList using User.getProfile().addFriend() 
    }
    
    removeFriend(username) {
        // Removes the friend from the User’s friendsList using User.getProfile().removeFriend() 
    }
    
    getPodcastRecommendations() {
        // Queries the ListenNotes API using the corresponding DataFetcher method 
    }
    
    getEpisodeRecommendations() {
        // Queries the ListenNotes API using the corresponding DataFetcher method 
    }
    
    playEpisode() {
        // Queries the Spotify API using the corresponding DataFetcher method 
    }
    
    pauseEpisode() {
        // Queries the Spotify API using the corresponding DataFetcher method 
    }
}

module.exports = Session;