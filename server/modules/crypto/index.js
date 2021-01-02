const config = require('../../config')
const crypto = require('crypto-js')

const matches = (plainText, encryptText) => {
    return decrypt(String(encryptText)) === plainText
}

const encrypt = (plainText) => {
    return crypto.AES.encrypt(plainText, config.scryptSecret).toString()
}

const decrypt = (encryptText) => {
    let bytes =  crypto.AES.decrypt(String(encryptText), config.scryptSecret)
    return bytes.toString(crypto.enc.Utf8)
}

module.exports = {matches, encrypt, decrypt}