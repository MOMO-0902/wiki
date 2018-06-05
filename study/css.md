# css

```
 媒体查询 最大宽度为960px包括960
@media screen and (min-width:960px){
    body{
        background:orange;
    }
}
```

```
tap-highlight-color
设置或检索对象的轻按时高亮
```

```
.clearfix{
content:' ';
clear: both;
display: block;
overflow: hidden;
}
```

```
设置table隔行样式,即单数行和双数行不同样式
利用css奇偶选择器实现
//偶数
table tr:nth-child(odd){}
//奇数
table tr:nth-child(even)
```

```
body自带8px内边距
h标签 自带12px
p标签自带8px

```

```
不定高的元素实现垂直居中的方法
1.使用css属性transform
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
    //以其自身宽高的一半进行移动
    transform: translate(-50%, -50%)
  }
  弊端是当要居中的元素在高度上超过了视口，它的顶部会被裁掉

```

```
background简写的正确顺序是
color url no-repeat  attachment position
```

```
给元素加动画当点击的时候icon进行旋转,使用transform对元素进行旋转、缩放等操作，使用transition对动画定义时间、效果等过渡效果。
最开始的样式为 icon，在此定义动画的过渡效果
{
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}
当点击时添加class名，进行旋转。
.rotate{
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

```

```

```
