class Episode {
    constructor(
        title,
        description, 
        audioLengthSeconds, 
        explicit, 
        podcast) { 
            this.title = title;
            this.description = description;
            this.audioLengthSeconds = audioLengthSeconds;
            this.explicit = explicit;
            this.podcast = podcast;
            this.rating = null;
        }

        updateRating(newRating) {
            this.rating = newRating;
        }

        stringify() {
            return this.title + this.description + this.explicit + this.audioLengthSeconds + this.podcast.title
        }
        
}

module.exports = Episode;