const config = require('../../config')
const jwt = require('jsonwebtoken')
const crypto = require('../crypto')
const createErr = require('../common/create-error')
const User = require('../model/user-schema')

const mandory = (parm = 'Parameter') => {
    createErr(`${parm} is required`, 400)
}

const getToken = async (username = mandory('username'), password = mandory('password')) => {
    try {
        const usr = await User.findOne({username: username}).populate('info')
        if(!usr || !crypto.matches(password, usr.password)){
            throw createErr(`Invalid username and password`, 400)
        }
        delete usr._doc.password
        const payload = {
            id: usr._id,
            username: usr.username
        }
        const token = jwt.sign(payload, config.jwt.secrectKey, {algorithm: config.jwt.algorithm, expiresIn: config.jwt.expiresInMinutes*60})
        return {user: usr, token: `Bear ${token}`}
    } catch (error) {
        throw error
    }
}

const verifyToken = async (headers = mandory('headers')) => {
    try {
        let payload = await isValidToken(headers.authorization)
        let checkUser = await User.findOne({username: payload.username}).populate('info')
        if(!checkUser){
            throw createErr('Token is invalid', 400)
        }
        return checkUser
    } catch (error) {
        throw error
    }
}

const isValidToken = (authorization) => {
    const readAuthorization = (authorization) => {
        return new Promise((resolve, reject) => {
            if(!authorization || !authorization.trim()){
                return reject(createErr('Missing Authorization', 400))
            }
            let part = authorization.split(' ')
            if(String(part[0]) === 'Bear' && authorization.substring(5)){
                return resolve(authorization.substring(5).trim())
            }
            return reject(createErr('Wrong Authorization', 400))
        })
    }
    const decodeToken = (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.jwt.secrectKey, {algorithms: config.jwt.algorithm}, (err, decode) => {
                if(err) return reject(err)
                return resolve(decode)
            })
        })
    }

    return readAuthorization(authorization)
        .then(token => decodeToken(token))
        .then(payload => Promise.resolve(payload))
        .catch(err => Promise.reject(err))
}

module.exports = {getToken, verifyToken}