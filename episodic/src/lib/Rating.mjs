export default class Rating {
    constructor(stars, review) { 
        this.stars = stars; 
        this.review = review; 
        this.creationDate = Date.now();   
    } 

    get stars() {
        return this.stars;
    }

    get review() {
        return this.review;
    }

    get creationDate() {
        return this.creationDate;
    }
}