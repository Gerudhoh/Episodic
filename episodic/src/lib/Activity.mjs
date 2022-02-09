export default class Activity {
    constructor() { 
        this.events = [];
    }
    
    get getEvents() {
        return this.events;
    }

    addActivity(activity){
        this.events.push(activity);
    }
}