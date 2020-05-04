const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
let user = require('./appApi/user')
let home = require('./appApi/home')
let goods = require('./appApi/goods')
let router = new Router()

app.use(bodyParser())
app.use(cors())
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())
app.use(router.routes())
app.use(router.allowedMethods());




(async () => {
  await connect()
  initSchemas()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName: 'sb', password: '000000'}, false)
//   oneUser.save().then(() => {
//     console.log('插入成功')
//   })
//   let user = await User.find({})
//   console.log(user)
})()

app.use(async (ctx) => {
  ctx.body = '<h1>KOA</h1>'
})

app.listen(9000)
