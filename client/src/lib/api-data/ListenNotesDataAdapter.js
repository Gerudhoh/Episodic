const DataAdapter = require("./DataAdapter.js");
const Podcast = require("../Podcast.js");
const Episode = require("../Episode.js");

class ListNotesDataAdapter extends DataAdapter {
    adaptPodcasts(jsonInformation) {
        // Leverages the adaptPodcast method to adapt each podcast in the passed array to create a EpisodicList object 
        let podcasts = []
        let length = jsonInformation.length;
        for(let i = 0; i < length; i++) {
            let podcastInfo = jsonInformation[i];
            let pod = this.adaptPodcast(podcastInfo);
            podcasts.push(pod);
        }
        return podcasts;
    }

    adaptPodcast(jsonInformation) {
        // Adapts podcast information returned from a ListNotes API query into a Podcast object
         return new Podcast(
            jsonInformation.title_original || jsonInformation.title, 
            jsonInformation.description_original || jsonInformation.description,
            "N/A",  
            jsonInformation.image,  
            jsonInformation.website,  
            jsonInformation.publisher_original,  
            "N/A",  
            "Genre needs to be its own user story",  
            jsonInformation.explicit_content, 
            jsonInformation.total_episodes,
            "N/A",
            jsonInformation.id
        )
    }

    adaptEpisodes(jsonInformation) {
        // Leverages the adaptEpisode method to adapt each episode in the passed array to create a EpisodicList object 
        let episodes = []
        let length = jsonInformation.length;
        for(let i = 0; i < length; i++) {
            let episodeInfo = jsonInformation[i];
            let ep = this.adaptEpisode(episodeInfo);
            episodes.push(ep);
        }
        return episodes;
    }

    adaptEpisode(jsonInformation, podcastJson) {
        // Adapts episode information returned from a ListNotes API query into an Episode Object 
        return new Episode(
            jsonInformation.title_original || jsonInformation.title,
            jsonInformation.description_original,
            jsonInformation.audio_length_sec,
            jsonInformation.explicit_content,
            this.adaptPodcast(podcastJson),
            jsonInformation.id
        )
    }
}

module.exports = ListNotesDataAdapter;