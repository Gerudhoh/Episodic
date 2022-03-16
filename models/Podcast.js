class Podcast {

    constructor(title,
         description,
         rss,
         image,
         website,
         publisher,
         language,
         totalEpisodes,
         platforms,
         databaseId) { 
            this.title = title;
            this.description = description;
            this.rss = rss;
            this.image = image;
            this.website = website;
            this.publisher = publisher;
            this.language = language;
            this.rating = null;
            this.episodes = [];
            this.totalEpisodes = totalEpisodes;
            this.platforms = platforms;
            this.databaseId = databaseId;
      }

    updateRating(newRating) {
        this.rating = newRating;
    }

    updateEpisodes(episodes) {
        this.episodes = episodes;
    }

    updatePlatforms(platforms) {
        this.platforms = platforms;
    }

    stringify() {
        return this.title + this.description + this.episodes + this.explicit + this.image + this.website + this.publisher;
    }
}

module.exports = Podcast;
