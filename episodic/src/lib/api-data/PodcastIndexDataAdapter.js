const DataAdapter = require("./DataAdapter.js")
const Podcast = require("../Podcast.js");

class PodcastIndexDataAdapter extends DataAdapter {
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
        // Adapts podcast information returned from a PodcastIndex API query into a Podcast object 
        return new Podcast(
            jsonInformation.title, 
            jsonInformation.description,
            "N/A",  
            jsonInformation.image,  
            jsonInformation.link,  
            jsonInformation.author,  
            jsonInformation.language,  
            jsonInformation.categories,  
            "N/A", 
            "N/A",
            "N/A",
            "N/A")
    }

    adaptEpisode(jsonInformation, podcastJson) {
        // Adapts episode information returned from a PodcastIndex API query into an Episode Object 
    }
}

module.exports = PodcastIndexDataAdapter;