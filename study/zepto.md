
# zepto

## 1.zepto支持浏览器

ie10+
chrome 30+
firefox 24+
safiri 6+
ios 5+ safari
andriod 2.3+ browser

## 2.zepto 模块

### zepto —— default ——核心模块，必须引入
### event ——default —— 通过on() off()处理事件
### ajax —— default —— XMLHttpRequest 和JSONP实用功能
### form —— default —— 序列化提交web表单
### ie —— default —— 增加支持桌面的ie10和windows phone 8
### detect —— 提供$.os $.browser消息(
判断设备和浏览器，zepto.os判断查看设备，返回一个对象{ios:true ,iphoe:true,version:"6.1"}
zepto.browser查看浏览器，返回对象{version:'536.26,webkit:true}
)
### fx —— 提供 animate() 方法
### fx_methods —— 以动画形式的show,hide,toggle.fade*()方法，即可使用show() hide()方法支持动画
```
var div1 = $("#fool")
div1.animate({
  "width"; "300px",
  "height": "300px"
},
'slow','ease-in-out',
function {
  console.log('div animate callback')
  div2.hide('slow',function() {})
  div2.fadeOut('slow',function)() {
  console.log('div2 animate callback')
},2000)
```
### assets 支持从DOM中移除Image元素并清理 ios内存

mobile safari严格的资源占用限制说起；mobile safari要比桌面版的浏览器的资源占用限制严格的多，当ios加载大文件时会停止加载，这时需要回收这些图片资源 ，因为不能保证垃圾回收机制是否有回收处理掉这些图片，所以我们采用移除image元素后清理内存，释放图片资源。
### data 对data()方法的完整支持，能够在内存中存储内存对象(读取或写入dom的data-* 属性，点像attr，但属性名要加上data-，zepto基本实现 ‘data()’方法只能存储字符串，当读取属性时，会有下列转换：

“true","false""null"转换为相应类型
数字值转换为实际数字类型
有效的JSON值会被解析
其他一切均作为字符串返回
)
### deferred 提供$.Deferred pormised API.依赖"callbakcs"模块

* ajax请求或处理结果需要回调函数来执行完成后的操作时，使用deferred作为回调函数解决方案

$.Deferred()生成deferred对象
deferred.done()操作成功时的回调函数
deferred.fail()失败
deferred.promise() 无参时返回对象，运行状态无法改变，有参时作为在参数对象上部署deferred接口
deferre.resolve()改变 deferred对象运行状态为”已完成“触发done()方法
deferre.reject()改变 deferred对象运行状态为”已完成“触发fail()方法
$.when()为多个操作指定回调函数
```
deferred.then(),
deferred.always
ex:
$when($.ajax(url).then(successFunc,failureFunc)

```
* ajax版本区别

ajax1.5之前
```
$.ajax({url:test.html',
  success(){},
  error(){}
})
```
ajax 1.5之后 ,返回deferred对象,可链式操作
```
 $.ajax("test.html")
  .done({function(){})
  .fail(function(){})
```
允许添加多个回调函数
```
 $.ajax("test.html")
  .done({function(){})
  .fail(function(){})
  .done({function(){})
  .fail(function(){})
```
允许为多个事件指定一个回调函数
### callbacks 为"deferred"模块提供 $.Callbacks.

### selector 支持 jquery css表达式功能($('div:first')第一个div对象,el.is(':visible')判断el是否为禁用的input或者button

### touch 在触摸设备上触发tap- swipe-相关事件。
基本touch事件：
* touchstart 手指触发屏幕上的时候触发
* touchmove 手指在屏幕移动的时候触发
* touchcancel 系统取消touch事件的时候触发
###  gesture 在触摸设备上触发 pinch(手指缩放)事件

### stack (栈)提供andSelf() &end ()链式调用方法

###  ios3 String.prototype.trim 和 Array.prototype.reduce 方法 (如果他们不存在) ，以兼容 iOS 3.x.

## 3.zepto api

### (1).$()
//创建元素
```
#$("<p>hello</p>")
```
//创建带有属性的元素
```
$("<p />"),{ text”：’hello',id:"greeting',css:{color:"darkbule"} })
```
### (2).camelCase(string)驼峰命名

### (3).$contains(parent,node) 检查父节点是否包含给定的dom节点，如果两者是相同的节点 ，返回false

### (4).each(collection,function(index,item){...})遍历数组或心key-value值对方式遍历对象。回调函数返回false停止遍历。

* %d带符号十进制数
* %s字符串
### (5)$.fn在此对象上添加的方法所有的zepto对象都能调用

### (6)$.grep 获取包含回调函数中返回true的数组项
```
$.grep([1,2,3], function(item) {
  return item > 1
})
```
### (7)inArray 返回数组中指定元素的索引值

### (8)isNumeric如何该值为有限数值或一个字符串表示则返回true

### (9)isPLainObject 测试一个对象是否通过 对象常量("{}") 或者 new Object 创建的，如果是，则返回true。

### (10) var callback = $.noop引用一个空函数

### (11)$.parseJson接受一个标准格式的json并返回解析后的js对象

### (12)add 添加元素到当前匹配的元素集合中
```
$('li').add('p').css('background-color','red')
```
### (13)append在匹配元素末尾插入内容 after在匹配元素后面插入内容

### (14)append appendTo区别
```
$('ul').append('<li> new list item</li>')
$('<li> new list item </li>').appendTo('ul')
```
### (15) filter对象，过滤对象集合

### (16)forEach与each相似，都是遍历对象集合中的每个元素，但回调函数返回false时不停止遍历

### (17)get 从当前对象集合中获取指定的元素或所有元素
```
 $('h2').get()
$('h2').get(0)
```
### (18)hasClass 检查对象集合中是否有元素含有指定的class

### (19)获取或设置元素的html内容，不用innerHTML

### (20)is判断当前元素集合中第一个元素是否符合css选择器

### (21)offSet获取当前元素在document的位置

### (22)offsetParent 找到第一个定位过的祖先元素

### (23)parent 获取直接父元素,parents 获取所有祖先元素

### (24)pluck 获取对象元素的属性值，返回值是数组

### (25)prepend将内容插入到元素开头 prependTo(同appendTo)

### (26)prev 获取元素的前一个兄弟节点

### (27)prop读取或设置元素属性值，优先于attr

### (28)reduce 遍历当前对象集合，memo是上次函数的返回值，迭代进行遍历
```
reduce(function(memo,item,index,array){}
```
### (29)removeClass 移除class名可用空格分隔

### (30)replaceWith 用给定内容替换所有匹配元素

### (31)slice(start, [end]) 提取数组的子集

### (32)text 方法不能用来获取或设置html，只能获取元素的文本内容

### (33)toggleClass 如果匹配元素有此class名就删除它，如果没有就添加它

### (34)unwrap 移除集合中每个元素的直接父节点，并把他们的子元素还保留在原来的公交车

### (35)wrap 在每个匹配的元素外层包上一个html元素 (".button a').wrap('`<span>`')
wrapAll 在所有匹配元素外层包一个单独结构
```
$('a.button').wrapAll('<div id = buttons />')
```
wrapInner 将每个的内容包在一个单独的结构中
```
('ol lu '),wrapInner('<p><em /></p>')
 ```
### (36)Detect module

该方法可以在不同的环境中微调你的站点或应用，可以识别手机或平板，以及不同系统和浏览器
```
$.os.phone
$.os.andriod
```
## 4.zepto ajax

### (1). 默认情况下，ajax事件在document对象上触发。

```
$(document).on('ajaxBeforeSend', functio(e,xhr,options) {
//页面上的每个ajax请求之前都会触发
//可编辑ajax()和xhr对象
//通过返回false取消此操作
}
```
### (2). 如果请求的context 是一个dom节点，那么在该dom节点中触发，然后在dom中冒泡。

contenxt用于亩ajax相关回调函数的上下文(this指向)
```
$.ajax({
  //请求方式
  type:'GET‘，
  //请求地址
  url:'/projects',
  //请求数据
  data:{ name: 'zepto.js'},
  //期待服务器返回类型
  dataType: 'json',
  //请求超时时间
  timeout: 3000,
  //当前请求的this指向为body
  context: $('body')
  //成功后的回调
  success: function(data) {
    {'project':{'id': 41, 'html': '<div> ..'}}
    //将返回的json对象(html)附加到上下文对象
    this.append(data.project.html)
    }
  //请求失败后的回调
  error: function(xhr,type) {
    alert('error')
    }
})
//假定请求方式为post
$.ajax({
  type:'POST',
  url:'/',
  data:JSON.Stringfy({'name':'zepto.js'})
  //发送请求类型
  contentType:'appliction/json'
})
```

### (3).ajaxSettings 包含ajax请求的默认设置对象

### (4)append在每个匹配的元素末尾插入内容，内容可为html字符串，dom节点，或者节点组成的数组
```
$.get('https://api.github.com/users/momo-0902',function(response) {
$(document.body).append(response)
})
```
* !提示错误，Failed to execute 'insertBefore' on 'Node':parameter 1 is not of type 'Node'.
错误原因：无法在“Node”上执行“insertBefore”：参数1不是“Node”类型。
请求回来的结果是一个json字符串，并不是一个Node类型
```
* 将 $(document.body).append(response)改为console.log(response)可看请求成功的数据
$(document.body).append('<li>hahaha</li>')可增加一个li节点 到body中。
```
### (5).$param 序列化一个对象

### (6).$.post(url,[data],function(data,status,xhr){},[dataType])

```
$.post('/creat',
  //serialize()在ajax post请求中将用作提交表单值编译成URL编码的字符串。
  $("#some_form').serialize(),
  function(){
})
```
### (7).load(url, function(data, status, xhr){ ... })载入远程 html内容到当前集合中

```
$("#some_element“).load('/foo.html #bar') 匹配id为bar的html内容
```
### (8).ex

```
$("btn").click(function() {
  $.ajax({
    url:'user',
    type:'post',
    data:("userName:$("#userName").val(),"password":$("passWord").val()),
    async:false,
    success: functoin() {
      if(data == 0) {
        alert('用户名错误')
      }else if(data == 2) {
        alert('密码错误')
      }else {
      }
    }
  })
})
```

## 5.zepto 事件
### (1).$Event(type,[properties])

创建并初始化一个指定的dom事件，如果给定properties对象，使用它来扩展出新的事件对象。默认情况下，事件被设置为冒泡方式；这个可以通过设置bubbles为false来关闭。
### (2).$proxy

接受一个函数，返回一个新函数‘
并且这个新函数始终保持了特定的上下文(context)语境，新函数中this指向context参数。另外一种形式，原始的function是从上下文(context)对象的特定属性读取。
### (3) .off 移除通过on添加的事件

### (4).on为元素添加事件，事件以空格隔开

### (5).one为元素绑定一次性事件

### (6).trigger 在元素集合上触发指定事件

### (7).triggerHandler 在指定元素上触发指定事件


### (7).起初开发的时候我用的是给元素绑定onclick事件，但是click事件有300毫秒延迟，还是应该用zepto自带的tap事件

## 6.zepto动画

### zepto动画需要引入fx模块，用css动画实现

*  animiate(动画对象，花费时间，动画类型，动画完成时的回调函数)
```
ex1:
$("#banner ul").animate({marginLeft:"-800px"},600, function () {
  $("#banner ul").css('marginLeft','0px');
});
ex2:
$('some_element').animate({
  opacity: 0.25,
  left: '50px',
  color: '#000',
  rotateZ: '45deg',
  translated3d: '0,10px,0',
  },500,
  'ease-out')
})
```
#### css3动画整理如下

* 在css3中创建动画，需要@keyframes规则，在keyframes中定义新样式为动画效果
##### (1)、@keyframes规则

```
//从动画开始到结束使用关键词from to
@keyframesmyfirst {
  form{background:red}
  to{background: yellow}
}
//使用百分比来规定变化发生的时间
@keyframes myfirst {
  0% {background: red}
  25%{background: yellow}
  50%{background: blue}
  100%{background: green}
}
```
##### (2)、animat属性

aiimation: animate- name animate-duration animate- timing-function animate-delay
名字 花费时间 速度曲线 延迟
animate-iteration-count animate-direction
播放次数是否反向播放
绑定@keyframes中的动画到元素的animate属性中
```
div{
ainmation: myfirst 5s
//在此注意要加上浏览器兼容属性，此处省略
}
```
##### (3).其余动画属性

animation-play-state animation-fill-mode
动画是否正在运行或暂停 对象动画时间之外的状态
