// 声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 声明属性
  this.callback = []
  // 保存实例对象的this值
  const self = this

  // resolve函数
  function resolve(data) {
    // 判断状态
    if (self.PromiseState !== 'pending') return
    // 1.修改对象的状态（PromiseState）
    self.PromiseState = 'fulfilled'
    // 2.设置对象的结果值（PromiseResult）
    self.PromiseResult = data
    // 调用成功的回调函数
    self.callback.forEach(item => {
      item.onResolved(data)
    })
  }

  // reject函数
  function reject(data) {
    // 判断状态
    if (self.PromiseState !== 'pending') return
    // 1.修改对象的状态（PromiseState）
    self.PromiseState = 'reject'
    // 2.设置对象的结果值（PromiseResult）
    self.PromiseResult = data
    // 调用失败的回调函数
    self.callback.forEach(item => {
      item.onRejected(data)
    })
  }

  try {
    // 同步调用【执行器函数】
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 调用回调函数
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  }
  if (this.PromiseState === 'reject') {
    onRejected(this.PromiseResult)
  }
  if (this.PromiseState === 'pending') {
    this.callback.push({
      onResolved,
      onRejected
    })
  }
}