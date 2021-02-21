const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')

const deleteProduct = (req, res, next) => {
  return Product.deleteOne({_id: req.query.id})
    .then(() => res.status(200).json({message: 'delete successfull'}))
    .catch(err => next(err))
}

module.exports = {deleteProduct}