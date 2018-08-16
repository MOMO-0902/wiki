

# js语言基础

## js数据类型

```
 *应对检测使用typeof检测null值返回值是"object"的方法
  function type(o) {
    return (0 === null) ? 'null' : (typeof o)
  }
```

```
*使用toString检测对象是安全、最准确的,先调用对象原型上的toString函数，再调用函数的apply方法在想要检测的对象上执行
var d = new Date()
var m = object.prototype.toString()
alert(m.apply(d))

```

## js方法与函数的区别
```
1.函数是"function"类的实例，与"string""object"等引用类型一样，具有自己的属性和方法，函数名是指向函数对象的指针，函数可以作为参数参与到传参和返回值中。call()和apply()是每个函数都包含的自有方法。
  方法(method)是通过对象调用的js函数，是比较特殊的函数，只是跟对象相关
2.函数着重定义，方法强调执行。
obj.fn1(obj.fn2)
调用obj下的fn1方法，并传递obj中名为fn2的函数，方法的执行一般都有返回值，而函数一般作为某个方法的参数
```

```
*parseInt("")内参数如果以0开头，会默认转变八进制，想正常解析要有解析字符串后加一个参数
parseInt("08",10) => 8,意为把十进制数值08转换为十进制数值为8
parseInt("11",8) => 9，意为把八进制数值11转换为十进制数值9

```

## js类型
```
- 基本数据类型（值类型）： Undefined Null Boolean Number String 基本类型都是按值访问
- 复杂类型（引用类型）： 按内存地址访问Object 该类型实例化的对象，是一组数据和功能（函数）的集合，在其基础上可继承更多的类型，比如 Array() Date() Function()类型，而object 与其继承的类型又统称为引用类型

```

## js运算符
```
*谨慎使用运算符
- 使用 === 与 !== 而不使用 == 与 !=
- 不建议使用 ++ 和　--
- "," 逗号运算符，想正确返回连续的值需要有（）括起来
```

## 使用return检测函数
```
测试js，用return返回不执行下边的函数来观察是否有问题。
```


## promise的post传参
```
postInfo({ money: this.ransomeMoney })
        .then((resp)=> {
          console.log(resp)
        }).catch((err) => {
          console.log(err.message)
        })
```
## js方法

### split(separator,howmany)方法分隔字符串，第一个参数是以何种方式分割字符串，第二个参数指定返回数组的最大长度

```js
split('')使用空字符串会分割字符串中每一个字符

例：
var str = 'how are you'
// 使用空字符串分割
str.split('') 结果为 ["h", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u"]
// 使用空格分割，
str.split(' '),结果为 ["how", "are", "you"]
```

### object.keys()遍历一个对象，返回一个由一个给定对象的自身可枚举属性组成的数组。

```js
/*Array对象*/
let arr = ['a', 'b', 'c']
console.log(object.keys(arr))
// 结果： ['0', '1', '2']

```
```
/*Array对象*/
let obj = [foo: 'bar', bar: 42]
console.log(object.keys(obj))
// 结果： ['foo', 'bar' ]


/*类数组对象*/
let obj = {0: 'a', 1: 'b', 2: 'c'}
console.log(object.keys(obj))
// 结果： ['0', '1', '2']
```
### every()方法用于检测数组所有元素是否都符合指定条件（通过函数提供），结果是一个逻辑值，如果有一个元素不满足，则整个表达式返回false，且剩余的元素不会再进行检测。

```js
var ages = [11,12,13,14]
function checkAdult(age) {
  return age >= 12
}
age.every(checkAdult)
// false
```


### some()方法用于检测数组中的元素是否满足指定条件，结果是一个逻辑值，如果有一个元素满足条件，则返回true，剩余元素不会再进行检测。即判断数组中是否有符合条件的元素，只要有一个就返回true，与every相反

```js
var ages = [11,12,13,14]
function checkAdult(age) {
  return age >= 12
}
age.every(checkAdult)
// true
```

### findIndex()返回数组中第一个符合条件的元素的index值，当数组中元素在测试条件返回true时，findIndex()会返回符合条件的元素的索引位置，之后的值不会再调用执行函数。没有符合条件的就返回-1

### js使用parseInt进制转换

```js
*parseInt("")内参数如果以0开头，会默认转变八进制，想正常解析要有解析字符串后加一个参数
parseInt("08",10) => 8,意为把十进制数值08转换为十进制数值为8
parseInt("11",8) => 9，意为把八进制数值11转换为十进制数值9

```
### 使用Date.parse判断两个日期大小

```js
 if (
        this.startDate != undefined &&
        this.endDate != undefined &&
        Date.parse(this.startDate) - Date.parse(this.endDate) > 0
      ) {
        this.$message.error("结束日期不得小于起始日期");
        if (val === 0) {
          this.startDate = "";
        } else {
          this.endDate = "";
        }
      }
```

### 正则表达式验证手机号、电话、邮箱

```js
  let mbTest = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
  let fixTest = /^0\d{2,3}-?\d{7,8}$/;
  let mailTest = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
```

### 根据url中的token值判断用户是否登录

```js
// 从当前url中取出token，如果token存在就存到localstorage中，如果不存在就弹出登录框
  var tokenUrl = location.search
  var reg = /[\?\&]token=[0-9a-zA-Z]+$/
  if (tokenUrl !== '') {
    if (reg.test(tokenUrl)) {
      var token = tokenUrl.split('=')[1]
      localStorage.setItem('token', token)
      console.log(token)
    } else {
      $('.login-main').css('display', 'block')
    }
  } else {
    $('.login-main').css('display', 'block')
  }
  
```