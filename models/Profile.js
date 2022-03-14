
class Profile {
    constructor(username, password, displayName) { 
        this.username = username; 
        this.password = password;     
        this.displayName = displayName;  
        this.profilePic = null;  
        this.friendsList = [];     
    }

    get username(){
       return this.username;
    }

    get password() {
        return this.password;
    }

    get displayName() {
        return this.displayName;
    }

    updateDisplayName(newName) {
        this.displayName = newName;
    }

    get profilePic() {
        return this.profilePic;
    }

    updateProfilePic(newImage) {
        this.profilePic = newImage;
    }

    get friendsList() {
        return this.friendsList();
    }

    addFriend(friendName) {
        this.friendsList.push(friendName);
    }

    removeFriend(friendName) {
        this.friendsList.pop(friendName);
    }
}

module.exports = Profile;