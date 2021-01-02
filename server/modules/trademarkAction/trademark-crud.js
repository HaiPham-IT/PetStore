const Trademark = require('../model/trademark-schema')
const createErr = require('../common/create-error')

const createTrademark = (req, res, next) => {
    let trademark = req.body
    trademark = typeof trademark === 'object' ? trademark : {name: trademark}
    return Trademark.findOne(trademark).exec()
            .then(rs => rs ?  Promise.reject(createErr(`Trademark [${trademark.name}] already exist`, 409)) : new Trademark(trademark).save())
            .then(rs => res.status(200).json(rs))
            .catch(err => next(err))
}

const deleteTrademark = (req, res, next) => {
    return Trademark.deleteOne({name: req.params.name})
            .then(rs => rs.deletedCount > 0 ? res.status(200).json(rs) : Promise.reject(createErr(`Trademark [${req.params.name}] not found`, 404)))
            .catch(err => next(err))
}

module.exports = {createTrademark, deleteTrademark}