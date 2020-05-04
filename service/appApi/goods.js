const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let savecont = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        savecont++
      }).catch(err => {
        console.log('失败')
      })
    })
  })
  ctx.body = '开始导入'
})

router.get('/insertAllCategoryInfo', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        console.log('插入成功')
      }).catch(err => {
        console.log('数据插入失败', err)
      })
    })
  })
  ctx.body = '开始插入数据'
})

router.get('/insertCategorySubInfo', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(res => {
        console.log('插入成功')
      }).catch(err => {
        console.log('插入数据失败', err)
      })
    })
  })
  ctx.body = '插入数据'
})
// router.get('/insertAllCategoryInfo', async (ctx) => {
//   fs.readFile('./data_json/category.json','utf-8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     const Category = mongoose.model('Category')
//     data.RECORDS.map((value, index) => {
//       let newCategory = new Category(value)
//       newCategory.save().then(() => {
//         saveCount++
//       }).catch(err => {
//         console.log('插入数据失败', err)
//       })
//     })
//   })
//   ctx.body = '开始擦汗如数据'
// })
/**
 * 获取商品详情接口
 * */
router.get('/getGoodsDetailInfo', async (ctx) => {
  try {
    const Goods = mongoose.model('Goods')
    let goodId = ctx.request.query.goodsId
    console.log(goodId)
    let data = await Goods.findOne({ID: goodId}).exec()
    ctx.body = {code: 200, data, msg: 'success'}
  } catch (err) {
    ctx.body = {code: 500, meg: err}
  }
})
/**
 * 获取商品大类
 * */
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {code: 200, data: result}
  } catch (err) {
    ctx.body = {code: 500, msg: err}
  }
})
/**
 * 获取商品小类数据
 * */
router.get('/getCategorySubListById', async (ctx) => {
  try {
    const CategorySub = mongoose.model('CategorySub')
    let categoryId = ctx.request.query.categoryId
    console.log(categoryId)
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {code: 200, data: result, msg: 'success'}
  } catch (err) {
    ctx.body = {code: 500, msg: err}
  }
})
/*
* 根据商品类别获取商品类表
* */
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  try {
    const Goods = mongoose.model('Goods')
    let categorySubId = ctx.request.body.categorySubId
    let page = ctx.request.body.page
    let limit = ctx.request.body.limit ? ctx.request.body.limit : 10
    let start = (page - 1) * limit
    let result = await Goods.find({SUB_ID: categorySubId})
      .skip(start).limit(limit).exec()
    ctx.body = {code: 200, data: result, msg: 'success'}
  } catch (err) {
    ctx.body = {code: 500, msg: err}
  }
})
module.exports = router
