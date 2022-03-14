const User = require('./User.js');
import { createConnection } from 'mysql'; 

class DatabaseConnection {
    constructor(databaseInfo) { 
        this.databaseConnection = createConnection({ 
            host: databaseInfo["host"], 
            user: databaseInfo["username"], 
            password: databaseInfo["password"] 
        }); 
    }
    
    get databaseConnection() {
        return this.databaseConnection;
    }

    readUser(username, password) {
        // Reads a User from the database and returns it as a User object 
    }

    writeUser(user) {
        // Writes a User’s information to the database 
    }
}

module.exports = DatabaseConnection;