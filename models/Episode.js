class Episode {
    constructor(
        title,
        image,
        description, 
        explicit, 
        rss,
        podcast,
        databaseId) { 
            this.rss = rss;
            this.title = title;
            this.description = description;
            this.explicit = explicit;
            this.podcast = podcast;
            this.image = image;
            this.rating = null;
            this.databaseId = databaseId;
        }

        updateRating(newRating) {
            this.rating = newRating;
        }

        stringify() {
            return this.title + this.description + this.explicit + this.audioLengthSeconds + this.podcast.title
        }
}

module.exports = Episode;
