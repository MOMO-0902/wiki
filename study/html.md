
# html

## 块级元素与行内元素

### 我试图在p 标签里嵌套h1，

```
<p class="creditp">
<h1>大额信用贷款</h1>
<span>放款快</span>
<span>无需抵押</span>
<span>手续便捷</span>
</p>
```
但浏览器解析成
```
<p class="creditp"></p>
<h1>大额信用贷款</h1>
<span>放款快</span>
<span>无需抵押</span>
<span>手续便捷</span>
<p> </p>
```
p标签里不能自由嵌套，只能 嵌套内联元素
p,h1,div,ol,ul,dl,hr,pre等都属于块级元素，默认独占一行
块级元素只能 嵌套内联元素，默认 几个内联元素都在同一行显示，比如`<a>``<span>`
但内联元素不能包含块元素，只能包含其他的内联元素
p标签不能包含其他块级元素，div h1 ul 等


## [target] `<a>`标签的属性，规定在何处打开链接文档

### 1.target="view_window"将文档重定向到一个单独的窗口，第一次打开一个新窗口，再点击其他链接仍在这个窗口

```
<ul>
  <li><a href="pref.html" target="view_window">Preface</a></li>
  <li><a href="chap1.html" target="view_window">Chapter 1</a></li>
</ul>
```

### 2.target="view_frame"在框架中打开窗口,将超链接内容定向到框架中,此例将百度页面打开在pref.html页面所在的框架中。

```
<li><a href="" target="view_frame">Preface</a></li>
<frameset cols="100, * ">
  <frame src = “top.html”
  <frame src="pref.html" name="view_frame">
</frmaeset>
```

### 3.target="_blank"在新打开未命名的窗口中载入文档

### 4.target="_self"在自身窗口中载入文档

### 5.target="_parent"在父框架集中载入文档

### 6.target="_top"在整个窗口中载入文档(覆盖框架等)


## 自定义字体

@font-face { font-family: `<YourWebFontName>`; src: `<source>` [`<format>`][,`<source>` [`<format>`]] * ; [font-weight: `<weight>`]; [font-style:` <style>`]; }

一般字体下载下来是.ttf格式，需要转换才能使用

### 字体转换网址

http://www.font2web.com//?error=no_file_uploaded
https://www.fontsquirrel.com/tools/webfont-generator

转换需要上传字体，转换完成后会自动下载安装包，解压安装包，将font文件夹下边.eot .woff .ttf .svg四个文件（这是我们自定义字体时需要的）引用到项目目录中，为更好的兼容性，我们采用以下代码
```
@font-face {
font-family: 'PingFangSCRegular';
src: url('../../fonts/PingFang SC Regular_0.eot');
src: url('../../fonts/PingFang SC Regular_0.eot?#iefix') format('embedded-opentype'),
url('../../fonts/PingFang SC Regular_0.woff') format('woff'),
url('../../fonts/PingFang SC Regular_0.ttf') format('truetype'),
url('../../fonts/PingFang SC Regular_0.svg#PingFangSCRegular') format('svg');
font-weight: normal;
font-style: normal;
}
```
然后再用font-family引用字体就可以了
```
body{
font-family: 'PingFangSCRegular'
}

```
## html标签

### 结构标签

`<aside>`标记定义页面内容的侧边栏
`<hgroup>` 标记定义一个区块的相关信息
`<figure>` 标记定义一组内容以及他们的标题
`<figcaption>` 标记定义figure元素的标题
`<dialog>` 标记定义一个对话框（会话框）类似微信,只有chrome和safari6才支持此标签,考虑到兼容性一般不用此标签

### 多媒体标签

`<embed>` 标记定义外部的可交互的内容或插件，比如flash

## DOM元素的增删改查

###

### 1.增加节点(本例添加一个文本节点）

#### appendChild将添加的节点做为元素最后一个子节点
（1）//创建文本节点
```
var newTextNode = document.createTextNode("这是一个新的节点")
```
//获取要在其添加节点的dom元素
```
var div1 = document.getElementById('#div-1')
```
//将节点添加至dom元素
```
div1.appendChild(newTextNode)
```
（2）//创建按钮节点
```
var newBtnNode = document.createElement('ipnut')
newBtnNode.type="button"
newBtnNode .value="一个新按钮"
```
//获取要在其添加节点的dom元素
```
var div1 = document.getElementById('#div-1')
```
//将节点添加至dom元素
```
div1.appendChild(newBtnNode)
```
#### insertBefore:在已有的元素前插入一个新元素；

#### insertAfter:在现有的元素后面插入一个新元素；

### 2.删除节点

//获取节点
```
var div1 = document.getElementById('#div-1')
```
//使用div节点的removeNode方法删除，但较少用
```
div1.removeNode(true)
```
//一般使用removeChild方法，删除子节点
//获取div2的父节点，然后使用父节点的removeChild,将div1删除
```
div1.parentNode.removeChild(div1)
```
### 3.替换节点

//用div3节点替换div1节点
```
var div1 = document.getElementById('#div-1')
var div3 = document.getElementById('#div-3')
div1.parentNode.replaceChild(div3,div1)
```
### 4.克隆节点

//克隆一个div3节点替换div1
```
var div1 = document.getElementById('#div-1')
var newdiv = document.getElementById('#div-new')
var copyDiv3 = div3.cloneNode(true)
div1.parentNode.replaceChild(copyDiv3,div1)
```
* .jquery对dom元素的增删改查
http://blog.csdn.net/u011530389/article/details/48155017

## pre
pre标签将其中的内容保留空格和换行符

也可使用white-space: pre属性 {  


}
