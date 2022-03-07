class Episode {
    constructor(
        title,
        description, 
        audioLengthSeconds, 
        explicit, 
        podcast,
        listenNotesId,
        databaseId) { 
            this.title = title;
            this.description = description;
            this.audioLengthSeconds = audioLengthSeconds;
            this.explicit = explicit;
            this.podcast = podcast;
            this.listenNotesId = listenNotesId; 
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