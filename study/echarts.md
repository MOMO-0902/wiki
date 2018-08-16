## echarts封装及接口数据渲染图表

因为要使用接口数据渲染图表,所以我们不能写死数据,要对echarts进行封装

```html
  <div class="chart clearfix mt80">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="publication" style="width: 100%; height:400px;"></div>
  </div>
```
```js
  // 页面初始化时渲染图表
  var pubChart = echarts.init(document.getElementById('publication'));
  pubChart.setOption(industryTableView);

 // 客户类别上刊率图表
 // 将echarts数据定制全部写到一个方法里,方法参数为接口处数据
   function industryTableView(legendData, xAxisData, seriesData, month) {
    
    var text = month + '月份客户类别上刊率年度对比（%）'
    // 指定图表的配置项和数据
    var pubOption = {
      title: {
        text: text,
      },
      legend: {
        data: legendData,
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: xAxisData,
        axisLabel:{
          interval: 0,
          rotate: 60
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value} %',
        },
      }],
      series: seriesData,
      label: {
        normal: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            testStyle: {
                color: 'black'
            }
        }
      }
    }
    return pubOption
    // 使用刚指定的配置项和数据显示图表。
    }


```
### 接口数据渲染图表

```js
  // 我们使用var 定义的数据来代替接口请求来的数据
var indlist = [
  {
    time: '2017', 
    ji: ['2%', '3%', '5%', '7%']
  },
  {
    time: '2018', 
    ji: ['4%', '6%', '9%', '3%']
  },
]


for(var i = 0; i < indlist.length; i++) {
  legendData.push(indlist[i].time[0].substring(0,4) + '年')
  var seriesNum = indlist[i].ji
  var seriesItem = {}
  seriesItem.name =indlist[i].time[0].substring(0,4) + '年'
  seriesItem.type = 'bar'
  seriesItem.data = seriesNum
  seriesData.push(seriesItem)
}
```

所以最后seriesData的结果为
```js
seriesData = [
  {
    name: '2017年',
    type: 'bar',
    data: ['2%', '3%', '5%', '7%']
  },
  {
    name: '2018年',
    type: 'bar',
    data: ['4%', '6%', '9%', '3%']
  }
]
```
然后调用函数,将结果填充到图表中


再次渲染图表时请使用请加参数true,不合并数据,因为setOption默认设置是合并表格数据. 
```js
pubChart.setOption(industryTableView(legendData, xAxisData, seriesData, month), true);

```

## echarts图表配置参数

### 1.坐标轴两边留白

```js
 xAxis: {
  boundaryGap: false, //坐标轴两边留白
 }
```

boundaryGap为false图表内容紧临坐标轴，为true时坐标轴与图表之前有空白

### 2.x轴刻度标签显示不完全

##### ·设置标签与坐标轴的显示间隔与旋转角度

```js 
axisLabel: {
  interval:0,
  rotate:40
}
```
##### ·设置标签换行

让标签按分隔符显示

```js
axisLabel: {
  formatter: function(value) {
    return value.split('').join('\n') //将标签竖排显示，将字符串中每个字符都用回车分隔开
  }
}
```


### 3.y轴刻度标识显示不全

y轴刻度显示不全，调整图表大小和外边盒子大小都不起作用
在此要通过属性实现，有两个方法

##### ·grid绘图区调整

grid为直角坐标系内绘图网格，可以在网格上绘制图表
可通过设置grid组件的 top、bottom、left、right 等属性来设置grid组件距离窗口上下左右的距离 
通过 width height 等设置组件宽高

```js
grid: {}
  left: 50
}
```

也可通过x y属性来设置留白位置
```js
grid: {
  x: 60, //左留白
  y: 80, // 上留白
  x2: 12, // 右留白
  y2: 15  // 下留白
}

```

##### ·刻度标签与轴线之前的距离

axisLabel.margin 刻度标签与轴线之前的距离

```js
yAixs: {
  axisLabel: {
    margin: 50
  }
}
```

axisLabel属性为x y轴坐标轴刻度标签的相关设置(xAxis.axisLabel / yAxis.axisLabel)

##### *axisLabel常用属性

. axisLabel.show 是否显示刻度标签

. axisLabel.interval 坐标轴刻度标签的显示间隔

. axisLabel.inside 刻度标签是否朝内，默认朝外

. axisLabel.rotate 刻度标签旋转的角度，在标签显示不下的时候可对标签进行旋转防止重叠

. axisLabel.formatter 刻度标签的内容格式器

. axisLabel.color(fontize/fontStyle/align/lineHeight/backgroundColor) 刻度标签常用css样式设置

### 4.图表区域线条颜色等

##### ·areaStyle 区域填充颜色

##### ·lineStyle 线条颜色

##### ·itemStyle 折线点颜色

```js
series: [{
  // 折线区域颜色
  areaStyle: { color: '#0c229f45'},
  // 折线线条颜色
  lineStyle: { color: '#0c229f45'},
  // 折线点颜色（散点图颜色描边等样式）
  itemStyle: { color: '#0c229f45'}
}]
```

### 5.图表上文本标签设置 label.normal


```js
series: [{
  label: {
    normal: {
      show: true, // 是否显示
      position: top, //值还可以是(/left/right/inside/insideTop，[50%, 50%]相对图形左上角的位置)
      distance: 30，// 当positon值为'top'等有效
      rotate: 30, // 旋转角度
      offset: true, //文字偏移量
      formatter:  function(val) {
        var strs = val.name.split('') //字符串数组
        var str = ''
        for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
          str += s
          if(!(i % 4)) str += '\n' //按需要求余
          }
        return `${str}: ${val.value}%`
      },//文本格式设置
      color: red // (fontSize, fontStyle, fontWeight等css常用属性)
    }
  }
}]
```

### 6.图表上图表的高亮样式label.emphasis

```js
series: [
  label: {
    normal: {},
    emphasis: {
      show: true, //是否有高亮效果
      textStyle: {
        fontWeight: 'bold'
      }
    }
  }
]

```

### 7.标签的视觉引导线样式

```js
series: [
  labelLine: {
    normal: {
      show: true, // 是否显示
      length: 30, // 第一段线长度
      length2: 40, // 第二段线长度
      smooth: false, // 是否平滑视觉引导线，也可以是表示平滑程度的数值 
      lineStyle: {
        color: 'red', // 线的颜色
        width: 3, // 线的宽度
        type: 'solid' // 线的类型
      },
      emphasis: {
        show: true,
        lineStyle: {
        }
      } // 高亮状态下引导线的样式
    }
  }
]
```

### 8.横向柱形图显示不同类别所占整体百分比

横向柱形图实现思路为将每个类别名称设置为y轴，然后将x轴隐藏

显示所占百分比思路为设置两个数据区域，然后让两个数据区域重叠，其中一个将数据都设置成100,另一个就设置自己所占百分比就行了

```js
xAxis: {
  show: false, //将x轴隐藏
  type: 'value',
  boundaryGap: [0, 0], //坐标轴两边留白策略,即图形在坐标轴内距离坐标轴线的边距,在未设置min和max值时,[0,0]表示两边不留白,图表紧挨坐标轴线,[0.3, 0.8]即表示图表与坐标轴之前有留白
  //min: 1000000 当设置min值是坐标轴起点的数值,如果Min值小于数据中的最小值,则图形会到坐标轴左侧显示,设置的boundrayGap: [x, y]中的x值无效,坐标轴刻度按max值和数据值来设定
  //max: 2000000 当设置max值是坐标轴终点的数值,设置的boundrayGap: [x, y]中的y值无效
}

yAxis: {
  axisLine: {
    show: false
  }, // y轴坐标轴线隐藏,注意不是y轴隐藏,我们还要显示文字的
  axisTick: [{
    show: false
  }] // y轴坐标轴刻度隐藏
}

// 设置两个数据区域
series: [
  {
    type: 'bar',
    data: [2.3, 64.2, 73.2, 63.4, 63.4]，
    tooltip: { show: false},
    barMinHeight: 30, //最小柱高
    barWidth: 10, // 柱宽度
    barMaxWidth: // 最大柱宽度
    z: 10, // 控制图表前后顺序
    itemStyle: { // 柱子样式
      normal: {
        color: '#ff6600', // 柱状图颜色
        label: {
          show: true, // 显示文本
          position: 'top', // 数据值位置
          formatter: '{c}%',
          textStyle: {
            color: '#000'
          }
        }
      }
    }
  },
  {
    type: 'bar',
    data: [100, 100, 100, 100, 100],
    tooltip: { show: false},
    barMinHeight: 30,
    barWidth: 10,
    barMaxWidth: 100,
    barGap: '-100%', // 两个柱子之间的距离，如果要重叠设置为-100%
    itemStyle: {
      normal: {
        color: '#ccc', // 柱子颜色，作为底层背景
        label: {
          show: false,
          position: 'top',
          testStyle: {
            color: '#000'
          }
        }
      }
    }
  }
]


```