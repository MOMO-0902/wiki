## 合并单元格

```html
  <table border="1">
    <thead>家庭成员关系表</thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>家庭住址</th>
    </tr>
    <tr>
      <td>张三</td>
      <td>18</td>
      <td rowspan="2">北京</td>
    </tr>
    <tr>
      <td>张三</td>
      <td>18</td>
    </tr>
    <tr>
      <td>李四</td>
      <td colspan="2">13</td>
    </tr>
  </table>
  ```

### 水平方向合并单元格

colspan属性是设置水平方向单元格的，数量"2"为从当前单元格开始合并几个单元格

### 垂直方向合并单元格

rowspan属性是设置垂直方向单元格的

## table加滚动条

overflow-x加水平滚动条，overflow-y加垂直滚动条

```css
table {
  flex-grow: 1;
  overflow-x: scroll
}
```

## table表头不动，表格内容滚动

表头不动内容滚动，可使用两个表格实现，表头是一个表格，内容是一个表格，都放在一个容器里，然后将放内容的表格设置一个固定高度，当内容超出高度时就显示滚动条

```html
 <!-- 表格容器，可用于设置整个的边框及高度 -->
  <div class="tbl-container">
  <!-- 表头容器，必须留出17px的滚动条位置 -->   
    <div class="tbl-header">
      <table border="1">
        <thead>
          <tr>
            <th style="width: 32%">姓名</th>
            <th style="width: 33%">年龄</th>
            <th style="width: 35%">家庭住址</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 表格内容容器-->
    <div class="tbl-body">
      <table border="1">
      <tbody>
        <tr>
          <td style="width: 32%">张三</td>
          <td style="width: 33%">18</td>
          <td style="width: 35%">北京</td>
        </tr>
        <tr>
          <td style="width: 32%">张三</td>
          <td style="width: 33%">18</td>
          <td style="width: 35%">北京</td>
        </tr>
        <tr>
          <td style="width: 32%">张三</td>
          <td style="width: 33%">18</td>
          <td style="width: 35%">北京</td>
        </tr>
        <tr>
          <td style="width: 32%">张三</td>
          <td style="width: 33%">18</td>
          <td style="width: 35%">北京</td>
        </tr>
        <tr>
          <td style="width: 32%">张三</td>
          <td style="width: 33%">18</td>
          <td style="width: 35%">北京</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  

```
```css
/* 表格容器样式，用flex布局可保证table内容能铺满剩余空间 */
.tbl-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* 设置表格的布局方式，用于宽度对齐 */
.tbl-header table{
  border-bottom: none;
  border-bottom-style: none;
  table-layout: fixed;
}

.tbl-body table {
  table-layout: fixed;
}

/* 设置表格内容容器，用于铺满整个剩余空间 */

.tbl-header {
  padding-right: 17px;
}

.tbl-body {
  height: 80px;
  overflow-y: scroll;
}
```

## 设置单元格宽度

在td中使用width设置table的单元格宽度不起作用
表格默认布局为自动布局，在自动表格布局中，列的宽度是由列单元格中没有折行的最宽的内容设定的。
解决办法为table设置 table-layout属性为fixed;
```html
<table table-layout="fixed"></table>
```
