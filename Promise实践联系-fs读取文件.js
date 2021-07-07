const fs = require('fs')

// fs.readFile('./resource/content.txt', (err, data) => {
//   // 如果错误 则抛出错误
//   if (err) throw err
//   // 如果没有错误，则输出文件内容
//   console.log(data)
// })

const p = new Promise((resolve, reject) => {
  fs.readFile('./resource/content.txt', (err, data) => {
    // 如果出错
    if (err) reject(err)
    // 没有出错
    resolve(data)
  })
})

p.then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})