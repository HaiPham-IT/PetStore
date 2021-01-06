require('dotenv').config
module.exports = {
    port: {
        http: process.env.LISTEN_PORT || 3000
    },
    jwt: {
        secrectKey: process.env.JWT_SECRET_KEY || 'randomkey',
        expiresInMinutes: process.env.JWT_EXPIRES_IN_TIME || (3 * 30 * 24 * 60), // 8 hours in minute
        algorithm: process.env.JWT_ALGORITHM || 'HS256'
    },
    db: {
        dbName: process.env.DB_NAME || 'petstoredb',
        dbHost: process.env.DB_HOST || 'localhost',
        dbPort: process.env.DB_PORT || '27017'
    },
    scryptSecret: process.env.CRYPTO_SECRET_KEY || 'This1s4Rand0m'
}