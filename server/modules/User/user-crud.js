const User = require('../model/user-schema')
const crypto = require('../crypto')
const createErr = require('../common/create-error')


const mandory = (parm = 'Parameter') => {
  createErr(`${parm} is required`, 400)
}
const createUser = async (req, res, next) => {
  try {
    let data = req.body
    let status = await validation(data)
    if(status === 'ok'){
      data.password = crypto.encrypt(data.password)
      data = await new User(data).save()
    }
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const checkUser = (username = mandory('usrname'), password = mandory('password')) => {
  return new Promise((resolve, reject) => {
    return User.findOne({username: username}, (err, rs) => {
      if(err) return reject(err)
      if(rs) return resolve('exits')
      return resolve('not exist')
    })
  })
}

const checkemail = (info) => {
  if(!info || !info.email) return
  return new Promise((resolve, reject) => {
    return User.findOne({'info.email': info.email}, (err, rs) => {
      if(err) return reject(err)
      if(rs) return resolve("exits")
      return resolve('not exist')
    })
  })
}

const validation = (data) => {
  return checkUser(data.username, data.password)
    .then(mes => (mes === 'exits') ? Promise.reject(createErr(`User [username=${data.username}] already exist`, 409)) : checkemail(data.info))
    .then(mes => (mes === 'exist') ? Promise.reject(createErr(`Email [username=${data.username}] already exist`, 409)) : Promise.resolve('ok'))
    .catch(err => Promise.reject(err))
}

module.exports = {createUser}