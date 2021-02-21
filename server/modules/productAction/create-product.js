const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')

const checkMissingField = (param, paramName) => {
  if(!param) throw new Error(`Missng field <${paramName}>`)
}

const createProduct = async (req, res, next) => {
  try {
    let product = req.body
    checkMissingField(product.proCode, 'proCode')
    checkMissingField(product.price, 'price')

    let prod = await Product.findOne({proCode: product.proCode})
    if(prod){
      throw new Error(`[proCode=${product.proCode}] is already exist`)
    }
    if(product.trademark){
      let trademark = await Trademark.findOne({name: product.trademark})
      if(!trademark) throw new Error(`Trademark [name=${product.trademark}] not exist`)
      product.trademark = trademark._id
    }
    product = await new Product(product).save()

    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

module.exports = {createProduct}