module.exports = (message, code) => {
    let err = new Error(message)
    err.statusCode = code
    throw err
}