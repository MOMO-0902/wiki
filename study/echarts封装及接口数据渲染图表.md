## echarts封装

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
## 接口数据渲染图表

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