const DataAdapter = require("./DataAdapter.js");
const Podcast = require("../Podcast.js");

class ListNotesDataAdapter extends DataAdapter {
    adaptPodcasts(jsonInformation) {
        // Leverages the adaptPodcast method to adapt each podcast in the passed array to create a EpisodicList object 
        let podcasts = []
        console.log(jsonInformation);
        for(let podcastInfo in jsonInformation) {
            let pod = this.adaptPodcast(podcastInfo);
            podcasts.push(pod);
        }
        return podcasts;
    }

    adaptPodcast(jsonInformation) {
        // Adapts podcast information returned from a ListNotes API query into a Podcast object
         return new Podcast(
            jsonInformation.title_original, 
            jsonInformation.description_original,
            "N/A",  
            jsonInformation.image,  
            jsonInformation.website,  
            jsonInformation.publisher_original,  
            "N/A",  
            "Hard to Parse",  
            jsonInformation.explicit_content, 
            jsonInformation.total_episodes,
            "N/A")
    }

    adaptEpisode(jsonInformation) {
        // Adapts episode information returned from a ListNotes API query into an Episode Object 
    }
}

module.exports = ListNotesDataAdapter;