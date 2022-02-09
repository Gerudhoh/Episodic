export default class Podcast {
    
    constructor(title, 
         description,
         rss,  
         image,  
         website,  
         publisher,  
         language,  
         genre,  
         explicit, 
         totalEpisodes,
         platforms) { 
            this.title = title;
            this.description = description;
            this.rss = rss;
            this.image = image;
            this.website = website;
            this.publisher = publisher;
            this.language = language;
            this.explicit = explicit;
            this.rating = null;
            this.genre = genre;
            this.episodes = [];
            this.totalEpisodes = totalEpisodes;
            this.platforms = platforms;
      }

    get title () { return this.title; }

    get description () { return this.description; }

    get rss () { return this.rss; }

    get image () { return this.image; }

    get website () { return this.website; }

    get publisher () { return this.publisher; }

    get language () { return this.language; }

    get genre () { return this.genre; }

    get explicit () { return this.explicit; }

    get episodes () { return this.episodes; }

    get totalEpisodes () { return this.totalEpisodes; }

    get rating () { return this.rating; }

    get platforms () { return this.platforms; }

    updateRating(newRating) {
        this.rating = newRating;
    }

    updateEpisodes(episodes) {
        this.episodes = episodes;
    }

    updatePlatforms(platforms) {
        this.platforms = platforms;
    }
}