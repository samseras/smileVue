const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-vue'
const glob = require('glob')
const {resolve} = require('path')
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
let maxConnectTimes = 0
exports.connect = () => {
  mongoose.set('useCreateIndex', true)
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return new Promise((resolve, reject) => {
    // 数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('-------------数据库断开')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法解决，请认为处理。。。')
      }
    })
    mongoose.connection.on('error', (err) => {
      console.log('-------------数据库错误')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法解决，请认为处理。。。')
      }
    })
    mongoose.connection.once('open', () => {
      console.log('-------------MongoDB Connected successfully')
      resolve()
    })
  })
}
