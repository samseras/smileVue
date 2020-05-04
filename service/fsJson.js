const fs = require('fs')
fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE1 !== null) {
      i++
      console.log(value.NAME)
      pushData.push(value)
    }
  })
  console.log(i)
  console.log(pushData)
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), err => {
    if (err) console.log('写入文件失败')
    else console.log('写入操作陈工')
  })
})
