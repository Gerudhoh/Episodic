const DataAdapter = require("./DataAdapter.js")
class SpotifyDataAdapter extends DataAdapter {
    adaptPodcasts(jsonInformation) {
        // Leverages the adaptPodcast method to adapt each podcast in the passed array to create a EpisodicList object 
    }

    adaptPodcast(jsonInformation) {
        // Adapts podcast information returned from a Spotify API query into a Podcast object 
    }

    adaptEpisode(jsonInformation) {
        // Adapts episode information returned from a Spotify API query into an Episode Object 
    }
}

module.exports = SpotifyDataAdapter;