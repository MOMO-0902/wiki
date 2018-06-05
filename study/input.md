# input
## input="text"

## 在表单中使用input="button"

### 在表单中不能使用`<button>``</button>`元素，因为不同的浏览器会提交不同的按钮值。请使用 input 元素在 HTML 表单中创建按钮。

## input="select"去除默认样式

### select 下拉框箭头处，取消默认样式 ，为其添加背景图

但一开始最左边的图标我也是直接在背景图上添加的，有两种方法，一种是为元素添加多个背景图

#### 除了backgroud-color是唯一一个不能使用多个值的background-x 元素，所以，我们以上的三个元素都可以使用多个值，两个值之间以逗号相连。
(1)
```
div {background-image:url(),url();
background-position:0 30px, 0 45px;
backgroud-repeat:no-repeat
}
(2)也可以使用background属性
div { background :url () no-repeat 0 30px;
url() no-repeat 0 45px;
}
```

#### 另一种是在select外套一个div,把左边用来装饰的背景图加到此div上，把下拉列表背景图加到select元素上。

### 去除select框默认样式
```
.myform select {
/*很关键：将默认的select选择框样式清除*/
appearance:none;
-moz-appearance:none;
-webkit-appearance:none;
/*在选择框的最右侧中间显示小箭头图片*/
background: url("../../images/symbols-下拉.png") no-repeat scroll 92.6% center transparent;
background-color: #fff;
background-size: 13.4px;
/*为下拉小箭头留出一点位置，避免被文字覆盖*/
padding-right: 22.5px;
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
```


### 想要select未选择时字体颜色是灰色，选择后颜色是黑色，可通过视觉效果来改变

在select位置定位一个相同样式的input,让select在input上方，然后将select颜色和背景色都设置为透明，改变select选中项后将内容赋值给input，同时改变input文字颜色
为input赋值:
```
$("input).val( )--- （）里是内容
```
选中select项后发生的事件用change

## select默认选中第一个不被禁用的项

### select默认选中一项，当第一项禁用时，会默认选中第二项，当点击了别的项之后再来点击引项才可以触发change事件。

给select写change事件，因为此项默认选中，所以再点击此项，也并没有触发change事件，要禁止select的默认选中状态，这样在点击此项时才会触发select的change事件
```
$(".select-house")[0].selectedIndex = -1;
```
zepto返回选中的option不能用selected,例$('option[selected]'),因为selected并不是css的标准属性，zepto返回选中的option用
```
var selectedoption = $("option").not(function() {
return !this.selected
})
```
获取选中项的值用
```
selectedoption .text()
```
