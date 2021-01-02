const Tradmark = require('../model/trademark-schema')

const checkTrademark = async (req, res, next) => {
    try {
        let {trademark} = req.body
        if(trademark){
            trademark = await Tradmark.findOne({name: trademark}).exec()
            if(trademark){
                req.body.trademark = trademark._id
            }else{
                let err = new Error('Trademark not found')
                err.statusCode = 404
                throw err
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {checkTrademark}