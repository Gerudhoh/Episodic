import DataAdapter from "./DataAdapter.mjs"
export default class PodcastIndexDataAdapter extends DataAdapter {
    adaptPodcasts(jsonInformation) {
        // Leverages the adaptPodcast method to adapt each podcast in the passed array to create a EpisodicList object 
    }

    adaptPodcast(jsonInformation) {
        // Adapts podcast information returned from a PodcastIndex API query into a Podcast object 
    }

    adaptEpisode(jsonInformation) {
        // Adapts episode information returned from a PodcastIndex API query into an Episode Object 
    }
}