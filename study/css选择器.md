
#### [attribute]选择器 用于选取带有指定属性的元素

```
a[target]选取带有target属性的a标签
```

#### [attribute = value] 选取带有指定属性和值的元素

```
a[taret = _blank]
```

#### [attribute~=value] 选取属性值中包含指定词汇的元素

```
[class~=flower]
//选取的指定词汇要是作为单独的属性值才可以被找到
<div class="flower Ht"></div>
//并不是指这种包含，这种找不到
<div class="flowerHt"></div>
```

#### [attribute|=value] 选取属性值以指定值开头的元素

```
[class|=de]
//选取的指定词汇必须是只以此词汇或者以此词汇+"-"的属性值
<div class="de"></div>
<div class="de-lang"></div>
//而不是连接起来作为整体值中以此词汇开头的,这种找不到
<div class="delang"></div>
```

#### :link 选择所有未被访问的链接

#### :visited 选择所有已被访问的链接

#### :active 选择活动链接,(鼠标点击时成为激活)

#### :hover 鼠标滑过链接时

#### :focus 选择获得焦点的元素

```
input:focus {
  color: #0f0;
}
```

#### :first-letter 选取每个元素的首字母

```
p.en-us:first-letter {
  font-size: 23px;
}
```

#### :first-line 选取每个元素的第一行

```
p.en-us:first-line {
  background-color: red;
}
```

#### :first-child 选择属于其父元素的首个子元素的指定选择器

```
//选取属于其父元素的首个子元素的每个<p>元素(总是选取其父元素中的第一个p元素)
<body>
  <p>我会被选中</p>
  <div>
    <p>我也会被选中</p>
    <p我不会被选中</p>
  </div>
</body>
//选取每个p元素中的每个i元素，其中p元素是其子元素中的第一个子元素
p:first-child i {}
//选择父元素下边的首个子元素
ul>:first-child {}
div>:first-child {}
```

#### :before 在指定元素前插入内容(内部插入),使用content,还可以定义样式

#### :after 在指定元素后插入内容(内部插入),使用content,还可以定义样式

```
p:before {
  content: "使用我插入内容 ";
  color: red;
  font-size: 15px;
}
```

#### :lang(language)选取带有以指定值开头的lang属性元素

```
//此处规则与[attribute|=value]处规则一样
```


#### element1~element2 选取相同父元素中前边有element1元素的每个element2元素,范围是包含element2元素的父元素内

```
p~ul {
  background: red;
}
```

#### [attribute^=value] 选取某属性值以指定值开头的元素

#### [attribute￥=value] 选取某属性值以指定值结尾的元素

#### [attribute^=value] 选取某属性值包含指定值的元素

```
[class="test"] {}
//此处以某字符开头/结尾/包含字符可以是宽松条件的，不必作为单独的属性值或以短横线分隔
<div class="test">我会被选中</div>
<p class="testtest">我们也会被选中</div>
<p class="test_test">我们也会被选中</div>
<p class="test-test">我们也会被选中</div>
```

#### :first-of-type 选择匹配属于其父元素的特定类型的首个子元素的每个元素

```
div:first-of-type 选择父元素的首个div元素
div:first-of-type 选择父元素下的首个div下边的p元素
//如果有嵌套元素，则选择每个匹配元素(即第一个元素)下的每个元素
<div>我会被选择</div>
<div>
  <div>我也会被选择>
</div>
```

#### :last-of-type选择匹配属于其父元素的特定类型的最后一个子元素的每个元素

#### :only-of-type选择匹配属于其父元素的特定类型的唯一子元素的每个元素，即要匹配的元素是其父元素中唯一类型子元素

```
p:only-of-type{}
<div>
  <p>我会被选中</p>
  <span>我不是p类型,所以上边p会被选中<span>
</div>
<div>
  <p>我也会被选中</p>
</div>
<div>
  <p>我们不会被选中</p>
  <p>我们不会被选中</p>
</div>
```

#### :only-child 匹配属于其父元素的唯一子元素的每个元素，即要匹配的元素是其父元素的唯一子元素

```
<div>
  <p>我会被选中</p>
</div>
<div>
  <p>我不会被选中</p>
  <p>因为我也是p元素，上边的并不是唯一子元素</p>
</div>
```

#### :nth-child(n)匹配属于其父元素的第n个子元素，无论元素类型，n从1开始计数

##### p:nth-child(1)

```
//如果祖先父元素中先包含匹配元素，但匹配元素同级中不包含嵌套元素，则每一个嵌套元素中的第n个子元素都会被选中，
<p>我会被选中</p>
<div>
  <p>我也会被选中</p>
</div>
<div>
  <p>我也会被选中</p>
</div>
//如果祖先父元素中没有先包含匹配元素，则只匹配嵌套父元素中的第n个子元素
<div>
  <p>我也会被选中</p>
</div>
<div>
  <p>我也会被选中</p>
</div>
<p>我不会被选中，因为前边已经有p元素了，我并不是第一个</p>
```

##### p:nth-child(odd) 选择所有偶数p

##### p:nth-child(even) 选择所有奇数p

##### p:nth-child(3n+1) 选择所有3的倍数+1的p元素(4,7,10...)

#### :nth-last-child(n) 选择倒数第几个匹配的元素

#### :nth-of-type(n) 选择匹配属于其父元素的特定类型的第n个元素的每个元素

```
exp:
p:nth-of-type(2)
<p>我不会被选中</p>
<p>我会被选中，因为我是第二个p</p>
<div>
```

#### :nth-last-of-type(n) 选择匹配属于其父元素的特定类型的倒数第n个元素的每个元素

#### :last-child 匹配属于其父元素的最后一个元素的每个元素


#### :root匹配文档根元素，在html中根元素永远是html元素

#### :empty匹配没有子元素(包括文本节点)的每个元素

```
exp:
p:empty{} 匹配没有子元素或者文本内容的每个p元素
```

#### :target 选取当前活动的目标元素

```
exp:
:target { color: red }
<a href="active">点击跳转至内容<a>
<p id="#active">我是活动的目标元素</p>
```

#### :enabled 匹配每个已启用的元素(多数用在表单上)

```
exp:
input[type=text]:enalbed {}
```

#### :check匹配每个被选中的input元素(只用于单选按钮和复选框，只有opera支持此选择器)

#### :not()设置不是此元素的每个元素

#### ::selection匹配被用户选取的部分，只能应用少量css属性：color background cursor outline
