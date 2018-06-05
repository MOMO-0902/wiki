```
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  <title>钱隆归来了</title>
  <style media="screen">
    body {
      height: 3000px;
      background: red;
    }
    html {
      box-sizing: border-box;
    }
    #test {
      margin-top: 1000px;
    }
  </style>
</head>
<body>
  <div id="app">sssssssssssssss</div>
  <input id="test" type="botton" name="" value="">
</body>
<script type="text/javascript">
window.onload=function(){
  let testIpt = document.getElementById("test")
  testIpt.onclick = function(){
    console.log("html-clientHeight" + document.documentElement.clientHeight)
    console.log("body-clientHeight" + document.body.clientHeight);
    console.log("hmtl-scrollHeight:" + document.documentElement.scrollHeight)
    console.log("body-scrollHeight:" + document.body.scrollHeight);
    console.log("hmtl-scrollTop:" + document.documentElement.scrollTop)
    console.log("body-scrollTop:" + document.body.scrollTop);
  }
}
</script>
</html>
```