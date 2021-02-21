const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')

const modifyProduct = async (req, res, next) => {
  try {
    let product = req.body
    product = await readBody(req.query.id, product)
    await Product.updateOne({_id: req.query.id}, {$set: product})
    
    return res.status(200).json({message: 'Modify successfull'})
  } catch (error) {
    next(error)
  }
}

const readBody = async (id, body) => {
  try {
    let oldProd = await Product.findById(id)
    if(!oldProd) throw new Error(`Product [id=${id} not found]`)
    if(body.proCode){
      let prod = await Product.findOne({proCode: body.proCode})
      if(prod._id !== oldProd._id) throw new Error(`Product [code=${body.proCode}] already exist`)
    }
    if(body.trademark){
      let tm = await Trademark.findOne({name: body.trademark})
      if(!tm) throw new Error(`Trademark [name=${body.trademark}] does not exist`)
      body.trademark = tm._id
    }

    return body
  } catch (error) {
    throw error
  }
}

module.exports = {modifyProduct}