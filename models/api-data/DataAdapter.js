class DataAdapter {

    adaptPodcasts(jsonInformation) {
        // Leverages the adaptPodcast method to adapt each podcast in the passed array to create a EpisodicList object 
    }

    adaptPodcast(jsonInformation) {
        // Adapts podcast information returned from an API query into a Podcast object 
    }

    adaptEpisode(jsonInformation, podcastJson) {
        // Adapts episode information returned from an API query into an Episode Object 
    }

}
module.exports = DataAdapter;