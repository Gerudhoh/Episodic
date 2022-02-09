export default class EpisodicList {
    constructor(name) { 
        this.name = name; 
        this.podcasts = []; 
        this.episodes = [];
      }

      get name () { return this.name; }

      get podcasts () { return this.podcasts; }

      get episodes () { return this.episodes; }

      addPodcast(podcast) {
          this.podcasts.push(podcast);
      }

      removePodcast(podcast) {
          this.podcasts.pop(podcast);
      }

      updatePodcast(podcast) {
          this.removePodcast(podcast);
          this.addPodcast(podcast);
      }

      addEpisode(episode) {
          this.episodes.push(episode);
      }

      removeEpisode(episode) {
          this.episodes.pop(episode);
      }

      updateEpisode(episode) {
          this.removeEpisode(episode);
          this.addEpisode(episode);
      }
}