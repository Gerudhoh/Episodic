class Podcast {

    constructor(title,
        id,
         description,
         rss,
         image,
         website,
         publisher,
         language,
         genre,
         explicit,
         totalEpisodes,
         platforms,
         listenNotesId,
         databaseId) { 
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
            this.listenNotesId = listenNotesId;
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
