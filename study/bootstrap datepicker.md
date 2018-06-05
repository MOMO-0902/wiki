## bootstrap datepicker引入方式最好是本地文件

因为可能需要修改js以完成配置

## bootstrap datepicker 插件结构

```
 <!-- datepicker -->
    <div class="build-date clearfix">
      <span class="select-title lh34">日期:</span>
      <div class="select-main">
        <div class="sandbox-start-container">
          <div class="input-group date start">
            <input type="text" class="form-control build-start-date">
            <span class="input-group-addon">
              <i class="glyphicon glyphicon-th"></i>
            </span>
          </div>
        </div>
        <div class="sandbox-end-container">
          <div class="input-group date end">
            <input type="text" class="form-control build-end-date">
            <span class="input-group-addon">
              <i class="glyphicon glyphicon-th"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
```

## bootstrap datepicker 配置

```js
$('.sandbox-start-container .input-group.date').datepicker({
  language: "cn",  // 语言
  weekStart: 1, // 起始周
  daysOfWeekDisabled: "0,1,2,3,4,5", // 禁止选择日期
  daysOfWeekHighlighted: "6", // 高亮周
  autoclose: true, // 自动关闭
  format: 'yyyy-m-d', // 日期格式
  forceParse: true, // 强制转换
}); 
```

### bootstrap datepicker 设置默认日期（自动选中并在输入框中显示）

```js
$('#all-issue-build .input-group.start').datepicker('setDate', date.firstSaturday)
$('#all-issue-build .input-group.end').datepicker('setDate', date.lastFriday)
```

### bootstrap datepicker 设置语言类型要在bootstrap-datepicker.js中添加配置

设置语言类型时，只在datepicker({})中设置了：language: "zh-CN"(官网复制的)，发现不起作用，通过查阅发现，设置默认语言要将配置写在bootstrap-datepicker.js中，语言类型为配置中的键

```js
var dates = $.fn.datepicker.dates = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM yyyy"
  },
  cn: {
    days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    clear: "清除"
  }
};
```


