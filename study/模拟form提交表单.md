## 表单结构

模拟form提交表单，当点击按钮时执行form的submit()事件，表单的Name为接口所需参数名称，表单value为接口所需参数值

```html
<!-- 模拟form表单提交 -->
  <form action="" method="post" target="_blank" id="form_export" hidden>
    <input type='text' name="city" id="form-city">
    <input type="text" name="area" id="form-area">
    <input type="text" name="month" id="form-month">
    <input type="text" name="sale_type" id="form-type">
    <input type="text" name="type" value="2">
  </form>
```

##  处理要提交的接口数据

多个模块共用一个表单，为了提高性能，所以处理数据与提交的方法也只写了一个
思路是所有的“导出数据”按钮都有一个相同的class名，当点击不同模块的class名时，会自动获取我们为其设置的一个自定义属性'data-key',这个'data-key'属性标志了此按钮具体属于哪个模块，然后定义一个对象，里边定义了所有模块需要的不同的属性，然后对象的key即为'data-key'属性值，通过data-key属性值去对象中取到相应的值，再填充到表单里。

```html
<!-- 不同模块里的导出按钮 -->
<div class="industry">
  <input class="btn btn-default exportTotal" type="submit" value="导出数据" data-key="nineData">
</div>
<div class="type">
  <input class="btn btn-default exportTotal" type="submit" value="导出数据" data-key="sevenData">
</div>

```js
<!-- 定义不同模块所需的不同表单值对象 -->
var formDatas = {
    threeData: {
      url: '/all/getthree'
    },
    fourData: {
      url: '/all/getfour'
    },
    fiveData: {
      url: '/all/getfive'
    },
    sixData: {
      url: '/all/getsix'
    },
    sevenData: {
      url: '/all/getseven'
    },
    eightData: {
      url: '/all/geteight'
    },
    nineData: {
      url: '/all/getnine'
    }
  }
  
```
```js
// 因为不同模块的表单数据都是供用户选择的不固定的数据,所以此处我们单独赋值,如例是为threeData赋值
  formDatas.threeData.city = param.city
  formDatas.threeData.area = param.area
  formDatas.threeData.month = param.month
  formDatas.threeData.type = param.sale_type
```

## 提交表单

```js
   // 导出数据
   $(".exportTotal").click(function(){
    var myKey = $(this).attr("data-key")
    var exParam = formDatas[myKey]
    setExportData(exParam)
  })

  function setExportData(param){
    $("#form_export").prop('action', param.url)
    $("#form-city").prop('value', param.city)
    $("#form-area").prop('value', JSON.stringify(param.area))
    $("#form-month").prop('value', JSON.stringify(param.month))
    $("#form-type").prop('value', JSON.stringify(param.type))
    $("#form_export").submit()
  }
  
```
  