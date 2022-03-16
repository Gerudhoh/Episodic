class Episode {
    constructor(
        title,
        image,
        description, 
        podcast,
        databaseId) { 
            this.title = title;
            this.description = description;
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
