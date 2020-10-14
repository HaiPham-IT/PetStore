require('dotenv').config()
module.exports = {
    dbName: process.env.DB_NAME,
    dbUserName:'',
    dbPassword:'',
    getUrlConnection: function(){
        return `mongodb://localhost:27017/${dbName}`
    }
}