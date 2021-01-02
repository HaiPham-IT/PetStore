const config = require('./config')
module.exports = {
    dbName: config.db.dbName || "petstoredb",
    dbUserName:'',
    dbPassword:'',
    getUrlConnection: function(){
        console.log(`mongodb://localhost:27017/${this.dbName}`)
        return `mongodb://localhost:27017/${this.dbName}`
    }
}