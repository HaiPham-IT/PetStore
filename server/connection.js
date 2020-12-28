require('dotenv').config()
module.exports = {
    dbName: process.env.DB_NAME||"petstoredb",
    dbUserName:'',
    dbPassword:'',
    getUrlConnection: function(){
        console.log(`mongodb://localhost:27017/${this.dbName}`)
        return `mongodb://localhost:27017/${this.dbName}`
    }
}