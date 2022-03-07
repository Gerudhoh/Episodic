const EpisodicList = require('./EpisodicList.js');

class User {
    constructor(profile) { 
        let listeningList = new EpisodicList("Listening") 
        let onDeckList = new EpisodicList("On Deck") 
        let finishedList = new EpisodicList("Finished") 
        this.episodicLists = [ listeningList, onDeckList, finishedList ] 
        this.activity = []
        this.profile = profile; 
        this.achievements = [];
      }     

      get EpisodicLists () { return this.EpisodicLists; }

      get activity () { return this.activity; }

      get profile () { return this.profile; }

      get achievements () { return this.achievements; }

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

export default User;