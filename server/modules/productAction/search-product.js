const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')

const searchProduct = async (req, res, next) => {
  try {
    let {proCode, proName, tm, proType, page = 1, pagesize = 5} = req.query
    //https://mongoosejs.com/docs/api.html#query_Query-populate
    let cri = {}
    let match = {}
    if(proCode) cri.proCode = proCode
    if(proName) cri.proName = proName
    if(proType) cri.proType = proType
    if(tm)
    {
      match = [
        {
          "$lookup": {
            "from": 'trademarks',
            "localField": 'trademark',
            "foreignField": '_id',
            "as": 'trademark'
          }
        },
        {
          "$match": {
            "trademark.name": tm
          }
        }
      ]
    }
    // let prod = await Product.find({'trademark.name': trademark}).populate().skip((page - 1)*pagesize).limit(pagesize)
    let prod = await Product.aggregate(match).skip((page - 1)*pagesize).limit(pagesize)
    return res.status(200).json(prod)
  } catch (error) {
    next(error)
  }
}

module.exports = {searchProduct}