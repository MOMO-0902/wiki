## 使用jquery为table的某一个td添加文字提示框，鼠标滑入出现，鼠标滑出消失

```html
  //因为tbody的内容是后来添加的，所以可以直接根据table来找到要加效果的td元素
  //如果html中td元素不是动态添加的，则可以直接给td加class名或id名，获取后再操作就可以了
 <tbody id="guding">
 </tbody>
```

```js
  //通过find()方法找到td
  var tdList = $('#guding').find('td:nth-child(3)')
  // 创建文字提示框并赋值属性与样式
  // 外层div
  var tip = document.createElement('div')
  $(tip).attr('class', 'tip')
  $(tip).css('pointer-events', 'none')
  // 文字框 
  var box = document.createElement('div')
  $(box).attr('class', 'box')
  // 向下箭头
  var arrow = document.createElement('div')
  $(arrow).attr('class', 'arrow')
  $(tip).append(box)
  $(tip).append(arrow)
```

```js
  // 鼠标滑入事件
  $(tdList).on('mouseenter', function(ev) {
    // 获取event元素，即获取事件状态（元素，键盘，鼠标等的状态）
    var oEvent = ev || event
    // 将td内容填充到文字提示框中
    $(box).html($(this).text())
    // 根据鼠标在屏幕中的位置，设置文字提示框的位置
    $(tip).css('left', oEvent.clietX - 50 + 'px')
    $(tip).css('top', oEvent.clientY - 50+ 'px')
    // 此处一开始用position定位，但position:absolute是根据设置了relative的父元素进行定位的，所以当屏幕大小发生变化时(如果存在滚动内容，absolute是根据父元素进行定位)，位置也会发生变化
    // 浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条，而position:fixed属性也是设置元素在当前可视窗口的位置
    $(tip).css('position', 'fixed')
    $(tip).css('z-index', '9000')
    // 将文字提示框添加到body中
    $('body').append(tip)
    // 也可直接使用字符串拼接省略上面“创建文字框步骤”
    var appendHtml = '<div class="tip" style="pointer-events:none;position:fixed;left:' + x + ';top:' + y + ';z-index:9000"><div class="box">'+$(this).text()+'</div><div class="arrow" style="margin-top:-5px"></div></div>'
    $('body').append(appendHtml)
    // 因为如果直接使用clienX与clientY属性来定位元素，鼠标位置就是元素的左上角，上边使用各减50px来进行位置调整，但如果文字过长就会导致位置还不是特别精准，箭头处不会处在要进行文字提示的元素正上方位置，所以此处应该减去的是文字提示框的长度/2,这样箭头位置几乎处于元素最上方
    var w = $('.box').outerWidth()
        var x1 = oEvent.clientX - w / 2 + 'px'
        $('.tip').css({
          'position': 'fixed',
          'left': x1,
          'top': y,
          'z-index': 9000,
        })
  }) 

  // 鼠标滑出事件
  // 在此使用移出子节点方法remove()而不是使用"display: none"，因为创建太多节点也不移除只是隐藏的话会影响性能
  $(tdList).on('mouseleave', function(ev, a) {
    $('body').remove(tip)
  })
```

```css
 /* 在这里一开始给了.tip和.box宽度为200最大400，但是当宽度超过200时还是不能显示完全，又不能不给宽度，所以在这里只需要给.box最小宽度min-width */
<style type="text/css" media="screen">
  .tip {
    position: relative;
    color: #fff;
    text-align: center;
  }
  .box {
    min-width: 400px;
    height: 40px;
    line-height: 40px;
    background: #3c3636;
  }
  /* 向下箭头只是一个小方形，通过定位与旋转实现效果 */
  .arrow {
    width: 10px;
    height: 10px;
    position: absolute;
    background: #3c3636;
    left: 47%;
    bottom: -5px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);		/* IE 9 */
    -webkit-transform: rotate(45deg);	/* Safari and Chrome */
    -o-transform: rotate(45deg);		/* Opera */
    -moz-transform: rotate(45deg);	
  }

</style>
```

