export default class PlatformsList {
    constructor(spotifyUrl, googleUrl, youtubeUrl, itunesID) { 
        this.spotifyUrl = spotifyUrl;
        this.googleUrl = googleUrl;
        this.youtubeUrl = youtubeUrl;
        this.itunesID = itunesID;
      }
      
      get spotifyUrl() {
          return this.spotifyUrl;
      }

      get googleUrl() {
          return this.googleUrl;
      }

      get youtubeUrl() {
          return this.youtubeUrl;
      }

      get itunesID() {
          return this.itunesID;
      }
}