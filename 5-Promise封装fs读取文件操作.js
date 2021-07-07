function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      // 判断
      if (err) reject(err)
      // 成功
      resolve(data)
    })
  })
}

mineReadFile('./resource/content.txt').then(value => {
  // 输出文件内容
  console.log(value.toString())
}, reason => {
  console.log(reason)
})