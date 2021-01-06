const config = require('./config')
module.exports = {
    dbName: config.db.dbName,
    dbUserName:'',
    dbPassword:'',
    dbHost:config.db.dbHost,
    dbPort:config.db.dbPort,
    getUrlConnection: function(){
        console.log(`mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`)
        return `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`
    }
}