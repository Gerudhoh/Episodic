const EpisodicList = require('./EpisodicList.js');

class User {
    constructor(profile, id, obj) { 
        if (obj)
        {
            Object.assign(this, obj);
            return;
        }
        //let listeningList = new EpisodicList("Listening") 
        //let onDeckList = new EpisodicList("On Deck") 
        //let finishedList = new EpisodicList("Finished") 
        this.episodicLists = [ /*listeningList, onDeckList, finishedList*/ ] //To make life easier for now, but we need this back when users and lists properly interact
        this.activity = []
        this.profile = profile; 
<<<<<<< HEAD
        this.id = id;
        this.achievements = [] 
=======
        this.achievements = [];
>>>>>>> Working on search stuff
      }     

      get userEpisodicLists () { return this.EpisodicLists; }

      get userActivity () { return this.activity; }

      get userProfile () { return this.profile; }

      get userAchievements () { return this.achievements; }
      
      get databaseId () { return this.id; }

      updateProfile(newProfile) {
          this.profile = newProfile;
      }

      addEpisodicList(newEpisodicList) {
          this.episodicLists.push(newEpisodicList);
      }

      getEpisodicListByName(listName) {
        for (const list in this.episodicLists) {
            if (list.name === listName) {
                return list;
            }
        }
        return null;
      }

      addToList(item, listName) {
        let list = this.getEpisodicListByName(listName);
        if (list != null) {
            list.push(item);
        } 
      }

      addPodcastToList(podcast, listName) {
          this.addToList(podcast, listName);
      }

      addEpisodeToList(episode, listName) {
        this.addToList(episode, listName);
      }

      removeFromList(item, listName) {
        let list = this.getEpisodicListByName(listName);
        if (list != null) {
            list.pop(item);
        }
      }

      removePodcastFromList(podcast, listName) {
          this.removeFromList(podcast, listName);
      }

      removeEpisodeFromList(episode, listName) {
          this.removeFromList(episode, listName);
      }
}

module.exports = User;
