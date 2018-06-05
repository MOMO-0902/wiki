## art-template是什么

art-template 是一个简约、超快的模板引擎。它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

## art-template 数据渲染方式

### 1.引入art-template.js文件

```js
<script src="template-debug.js"></script>
```

### 2.编写html模板

使用script标签包含art-template模板，注意type不能是'js'，使用双大括号{{}}包含引用数据

```html
<script id="test" type="text/html">
  <h1>{{title}}</h1>
</script>
```

### 3.向模板插入数据
```js
var data = {
  title: "hello world"
};
var html = template("test",data);
```

### 4.将模板插入dom结构
```js
document.getElementById('content').innerHTML = html;
```

## art-template 数据循环

art-template使用each循环数据

```js
var data1 = {
  0: li,
  1: zhang,
  2: zhao
};

var data2 = [
  pink,
  red,
  yellow
],

var data3 = [
  [one, two, three],
  [east, north, west]
]

var data4 = [
  [ki: 3, ji: 4],
  [ki: 5, ji: 6]
]

var data5 = [
  a: [1, 2, 3, 4],
  b: [5, 6, 7, 8]
]

var testData = {}
testData.data1 = data1
testData.data2 = data2
testData.data3 = data3
testData.data4 = data4
testData.data5 = data5

var html = template("test",testData);
document.getElementById('content').innerHTML = html;
```

```html
<script id="test" type="text/html">
  <!-- 循环data1,可直接循环对象 -->
  <p>
    {{each data1}}
    <span>{{$value}}</span>
    {{/each}
  </p>

  <!-- 循环data2数组 -->
  <p>
    {{each data2}}
    <span>{{$value}}</span>
    {{/each}}
  </p>

  <!-- 循环data3,嵌套循环对象$value中再循环$value -->
  <div>
    {{each data3}}
    <p>
      {{each $value}}
      <span>{{$value}}</span>
      {{/each}}
    </p>
    {{/each}}
  <div>
    <!-- 循环data3,嵌套循环对象$value中再循环$value -->
  <div>
    {{each data4}}
    <p>
      {{each $value}}
      <span>{{$value.ki}}</span>
      <span>{{$value.ji}}</span>
      {{/each}}
    </p>
   {{/each}}
  <div>
    <!-- 循环data3,嵌套循环对象$value中再循环$value -->
  <div>
    {{each data4}}
    <p>
      {{each $value.a}}
      <span>{{$value}}</span>
      {{/each}}
    </p> 
    <p>
      {{each $value.b}}
      <span>{{$value}}</span>
      {{/each}}
    </p>
    {{/each}}
  <div>
</script>
```
当dom结构中只有部分需要使用循环数据（比如表格表头不需要使用循环来渲染）时，可直接把需要渲染的部分循环出来就行了

```html
<script id="week-pub-temp" type="text/html">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th colspan="6">{{skTotal}}</th>
      </tr>
      <tr>
        <td>上刊客户（续刊）</td>
        <td>数量（杆）</td>
        <td>到期客户</td>
        <td>数量（杆）</td>
      </tr>
    </thead>
    <tbody>
      {{each list}}
      <tr>
        <td>{{$value.skCustomer}}</td>
        <td>{{$value.skNum}}</td>
        <td>{{$value.dqCustomer}}</td> 
        <td>{{$value.dqNum}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</script>
```

## art-template 数据根据条件显示

{{if}}

{{else if }}

{{else}}

{{/if}}

```html
<script id="test" type="text/html">
    <div>
        {{if bok==22}}
        <h1>线上</h1>
        {{else if bok==33}}
        <h2>隐藏</h2>
        {{else}}
        <h3>走这里</h3>
        {{/if}}
    </div>
</script>
```
```js
<script>
    var data = {
        "bok":22
    };
    var html = template('test',data);
    document.getElementById("app").innerHTML = html;
</script>
```

当几个模块共用一个模板但dom结构不太相同时，有两种方法，一种是使用if else语句控制哪一个结构渲染出来

```html
<!-- 月份多选 -->
  {{if monthChoice}}
  <div class="month clearfix">
      <span class="select-title">月份:</span>
      <div class="select-main">
          {{each months}}
          <label class="checkbox-inline">
              <input type="checkbox" class="month-check" name="{{id}}-month" value={{$index + 1}}>{{$value}}
          </label>
          {{/each}}
      </div>
  </div>
  {{/if}}

    <!-- 月份单选 -->
    {{if !monthChoice}}
    <div class="month clearfix">
      <span class="select-title">月份:</span>
      <div class="select-main">
          {{each months}}
          <label class="checkbox-inline">
              <input type="radio" class="month-check" name="{{id}}-month" value={{$index + 1}}>{{$value}}
          </label>
          {{/each}}
      </div>
  </div>
  {{/if}}

```
另外一种是全部渲染出来，再用css控制

```css
#industry .month {
  display: none;
}
```

## art-template为模板中dom元素的属性赋值

共用模板的时候有时我们也需要区分到底是哪个模块下的模板hmtl，比如现在每个模块都有单选按钮组或复选框组，但这些组要是同一个name我们才可以将其划为一组，所以我们需要利用将自定义数据传入模板，通过字符串拼接实现属性赋值

```html
 <div class="year clearfix">
        <span class="select-title">年份:</span>
        <div class="select-main">
            {{each years}}
            <label class="checkbox-inline">
                <input type="radio" class="year-check" name="{{id}}-years" value={{$value}}>{{$value}}
            </label>
            {{/each}}
        </div>
    </div>
```
```js
var yMoremSingal = { citys: citys, pays: pays, industrys: industrys, types: types, years: years, months: months ,id:'', yearChoice: true, monthChoice: false}

yMoremSingal.id = "all-issue-industry"
moreHtml = template("select-temp", yMoremSingal)
$("#all-issue-industry .all-select").append(moreHtml)
```

## art-template调用子模板

{{include 'main'}} 引入子模板，数据默认为共享
{{include 'main' a}} a为制定数据，但是同样必须是父级数据，可以看看下面的例子，如果不注入的a的话，引入的子模板是接受不到数据的

```html
<script id="main" type="text/html">
    <ul>
       {{each list}}
            <li>{{$value}}</li>
        {{/each}}
    </ul>
</script>
<script id="test" type="text/html">
    <div>
        <ul>
            {{each person}}
                <li>{{$value.name}}</li>
            {{/each}}
        </ul>
        {{include 'main' a}}
    </div>
</script>
<script>
    var data = {
        person:[
            {name:"jack",age:18},
            {name:"tom",age:19},
            {name:"jerry",age:20},
            {name:"kid",age:21},
            {name:"jade",age:22}
        ],
        a:{
            list:['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        }
    };
    var html = template("test",data);
    document.getElementById("app").innerHTML=html;
</script>      
```