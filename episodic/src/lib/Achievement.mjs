export default class Achievement {
    constructor(description, image) { 
        this.description = description; 
        this.image = image; 
        this.creationDate = Date.now();   
    }

    get getDescription() {
        return this.description;
    }

    get getImage() {
        return this.image;
    }

    get getCreationDate() {
        return this.creationDate;
    }
}