const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
router.get('/', async (ctx) => {
  ctx.body = '这个识别用户操作界面'
})

router.post('/register', async (ctx) => {
  // ctx.body = ctx.request.body
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 1,
      msg: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      code: 0,
      msg: err
    }
  })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password

  const User = mongoose.model('User')
  await User.find({userName: userName}).then(async (res) => {
    console.log(res)
    if (res) {
      let newUser = new User()
      await newUser.comparePassword(password, res[0].password).then(isMatch => {
        if (isMatch) ctx.body = {code: 1, msg: '登陆成功'}
        else ctx.body = {code: 0, msg: '密码错误'}
      })
    } else {
      ctx.body = {
        code: 200,
        msg: '用户名不存在'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: err
    }
  })
  // const User = mongoose.model('User')
  // await User.find({userName: userName}).exec().then(async (res) => {
  //   console.log(res)
  //   if (res) {
  //     let newUser = new User()
  //     await newUser.comparePassword(password, res[0].password).then(isMatch => {
  //       ctx.body = {code: 1, msg: isMatch}
  //     }).catch(err => {
  //       console.log(err)
  //       ctx.body = {code: 500, msg: err}
  //     })
  //   } else {
  //     ctx.body = {
  //       code: 0,
  //       msg: '用户名不存在'
  //     }
  //   }
  // }).catch(err => {
  //   console.log(err)
  //   ctx.body = {code: 500, msg: err}
  // })
})
module.exports = router
