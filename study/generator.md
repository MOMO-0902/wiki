# 异步编程

异步编程的目标就是怎样让它更像同步编程,所谓异步，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。
这种不连续执行的任务，就叫做异步。而连续的任务，就叫做同步。

# 回调函数--callback(重新调用)

js语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。

ex:
```
// 此例中，第一个参数，'/etc/passwd'即为任务要执行的第一段，请求文件，当请求文件成功后，执行函数的第二个参数，即为任务的第二段。
fs.readFile('/etc/passwd',function(err,data) {
  if (err) throw error
  alert(data)
  })
```

# Promise

如果多个回调函数嵌套，代码不是纵向谝，而是横向发展(执行最外层回调函数的同时执行第二个回调函数。。。)，很快就会乱成一团，无法管理。

```
fs.readFile(fileA, function(err, data) {
  rs.readFile(fileB,function(err, data) {
    ...
    })
  })
```
promise对象可以理解为一次执行的异步操作，只
promise为解决多个回调函数嵌套问题产生。允许将回调函数的横向加载，改成纵向加载，连续读取多个文件，按步骤执行，执行完上一下再执行下一个，写法如下：
ex1:
```
let myPromise = new Promise(function(resolve, reject) {
  // 250秒后将promise状态变为成功
  setTimeout(function() {
    resolve('成功')
  }),250
})
// 使用then方法返上述定义的mypromise对象,因为then方法返回一个新的promise对象，这个对象取决于onFulFilled状态（即then方法)的返回值，而在链式调用中，除第一个外每一个onFulFilled的入参都是上一个onFulFilled的返回值，如果不在then方法中返回值，那么再次调用时就是undefined.
myPromise.then(function(message) {
  alert('yee!' + message)
  return myPromise
}).then(function(message) {
  alert('yee!' + message + 'again')
  return myPromise
})

```
ex2:
```
var readFile = require('fs-readfile-promise')
readFile(fielA)
// 当fileA文件读取成功后转成字符串打印
.then(function(data) {
  alert(data.toString())
})
// 执行完readFileA回调函数后再执行readFileB
.then(function() {
  return readFile(fileB)
})
// fileB读取成功后转成字符串打印
.then(function() {
  alert(data.toString())
})
```

# 协程

协和意思是多个线程互相协作，完成异步任务。
第一步，协程A开始执行。
第二步，协程A执行到一半，进入暂停，执行权转移到协程By。
第三步，（一段时间后）协和B交还执行权。
第四步，协程A恢复执行。

协和遇到 yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行，它最大优点是写法非常像同步操作。、

# Generator函数

#### generator函数的数据交换

generator函数是协程es6的实现 ，最大特点就是可以交出函数的执行权（即暂停执行）
```
function* gen(x) {
  var y = yield x + 2
  return y
}
```
整个generator函数就是一个封装的异步任务，异步操作需要暂停的地方，都用yield声明，generator函数的执行方法如下：
```
// 调用generator函数，返回一个内部指针（即遍历器）g，将1传到gen函数中
var g = gen(1)
g.next() // {value: 3, done: flase}
g.next()//{value: undefined, done: true}
```
generator函数不会返回结果，而是返回指针对象，表示当前阶段作息（value是yield语句后边表达式的值，表示当前阶段的值，done表示generator函数是否执行完毕）。调用 g 的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x+2为止，当再次调用的时候程序从“var y = yield x + 2”处开始执行，后边没有语句了，直接return y肯定是undefined。

next方法返回值的value属性，是generator函数向外输入数据；next方法还可以接收参数，传入遍历器g中，作为上个阶段异步任务的返回结果。
```
function* () {
  var y = yield x + 2
  return y
}
var g = gen(1)
g.next() // {value: 3, done: false}
g.next(2) // {value: 2, done: true}
// 此处g.next(2)将2赋值给"var y = yield x + 2"处的y，即上面提到的作为上个阶段异步任务的返回结果。
```
```
function* () {
  var y = yield x + 2
  return y
}
var g = gen(1)
g.next(2) // {value: 3, done: false}
g.next() // {value: undefined, done: true}
// 第一次调用 g.next(2)中传入的参数2是无效，因为在遍历器生成的时候就用var g = gen(1)传入了参数，调用g的next方法会产出生成时传入的参数，所以结果还是1,第二次调用 g.next()并没有传入参数，所以用return y 返回结果是undefined
```
```
function* () {
  var y = yield x + 2
  return y
}
var g = gen(1)
g.next(2) // {value: 3, done: false}
g.next(5) // {value: 5, done: true}
// 此处 赋值5给y后直接返回y所以结果是5
```
```
function* () {
  var y = yield x + 2
  console.log(y)
  y = x
}
var g = gen(1)
g.next() // {value: 3, done: false}
g.next(5) // {value: 1, done: true}
结果： 5
      {value: 1, done: true}
// 此处赋值给y后重新赋值y给x，所以结果是1
```

## generator函数的错误处理

function* gen(x) {
  try {
    var y = yield x + 2
  } catch(e) {
    console.log(e)
  }
  return y
}
var g = gen(1)
g.next()
g.throw('出错了')

## generator函数的用法
var fetch = require('node-fetch')

function* gen() {
  var url = 'https://api.github.com/users/github'
  var result = yield fetch(url)
  console.log(result.bio)
}
var g =gen()
var result = g.next()
result.value.then(function(data) {
  return data.json()
  }).then(function(data) {
    g.next(data)
  })

# async

## async是什么

async是generator函数的语法糖。只是将generator里的*替换成了async表示里边有异步函数，yield替换成了await表示紧跟在后边的表达式需要等待结果。
```
function timeout(ms) {
  return new Promise((resolve) {
    setTimeout(resolve, ms)
    })
}

async function asyncPrint(value, ms) {
  await timeout(ms)
  console.log(value)
}

asyncPrint('hello', 50)
// 指定50秒后输出hello
```
