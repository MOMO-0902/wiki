

# flex布局

### Flex是Flexible Box 的缩写，意为弹性布局。用来为盒状模型提供最大的灵活性。

* webkit内核的浏览器，必须要加上-webkit的前缀
```
.box{display: -webkit-flex;/* Safari */display: flex;}
```
* webkit内核八大浏览器包括： chrome,safari,搜狗高速浏览器，傲游浏览器3，qq浏览器，360极速浏览器，世界之窗浏览器（极速版），阿里云浏览器
### flex属性

#### 1.flex-wrap: 定义如何换行
{no-wrap（默认):不换行  <br>
wrap:换行，第一行在上方，  <br>
wrap-reverse: 换行，第一行在下方   <br>
}
#### justify-content： 项目在主轴上的对齐方式
{flex-start左对齐   <br>
flex-end 右对齐   <br>
center居中对齐   <br>
space-between两端对齐,项目之间间隔相等   <br>
space-around每个项目两侧的间隔相等，即左边距与右边距一样大，所以项目之间的间隔要比项目与大的外边框之间的距离大一倍。   <br>
 }

#### 子元素{flex:1}第一个参数为flex-flow:1,等分剩余空间，如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex 将几个项目换行并左对齐
```
 {   
 display: -webkit-flex;   
 dispaly: flex;   
 justify-content: flex-start;   
 flex-warp: wrap   
 }
```
#### flex实现垂直居中

* .flex布局使用align-item
```
 .parent {   
   display: flex;   
   align-item: center;   
 }
```
* .flex布局使用margin
```
 .parent {   
   display: flex;   
 }   
 //margin: auto实现元素水平垂直方向的居中
 .child {   
   margin: auto;   
 }
```

#### flex-flow是flex-direction和flex-warp的简写,规定元素是水平还是垂直排列,是否换行

#### align-items 设置项目的垂直对齐方式

{   <br>
stretch是无高度时铺满整个父容器,   <br>
baseline每个元素第一行文字的基线对齐   <br>
}

#### align-content 只适用于多行的flex容器,而align-items单行多行都适用,两个属性都设置时会优先使用align-content的值,当值同为center时,align-items是使交叉轴的中点对齐,元素位于等分容器高度部分的中点,而align-content是将多行元素作为一个flex元素并垂直对齐.
