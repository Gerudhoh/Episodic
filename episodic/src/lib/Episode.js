class Episode {
    constructor(
        title,
        id,
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
            this.id = id;
        }

        /*get title () { return this.title; }

        get description () { return this.description; }

        get audioLengthSeconds () { return this.audioLengthSeconds; }

        get explicit () { return this.explicit; }

        get podcast () { return this.podcast; }

        get rating () { return this.rating; }*/

        updateRating(newRating) {
            this.rating = newRating;
        }
}

module.exports = Episode;