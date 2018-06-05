## 定义

axios是一个基于Promise用于浏览器和nodejs的http客户端

## 特征

* 从浏览器中创建XMLHttpRequest
* 从nodejs发出http请求
* 支持Promise api
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换json数据
* 客户端支持防止 CSRF/XSRF(跨站请求伪造，也被称为one click attack/session riding，CRSF攻击可理解为攻击者盗用了你的身份，以你的名义发送恶意请求，会导致个人隐私泄露及财产安全问题。)

## 使用

### 执行get请求

1.可通过params对象传递参数
```
axios.get(url, {
  params: {}
})
     .then(() => {})
     .catch(() => {})
```
2.也可直接将参数拼接在路径后边
```
axios.get('/user?id=12321')
```

### 执行post请求

```
axios.post(url, data)
```

### 执行多个并发请求

```
getUserAccount() {
  axios.get('/user/12345')
}

getUserPermissions() {
  axios.get('/user/permissions')
}

axios.all([getUserAccount(), getUserPermissions()])
     .then(axios.sperad(function(acct,perms) {
       // 当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
      }))
     .catch(() => {})
```

## 配置

可以对axios进行一些设置来生成请求
1.
```
axios(config)
axios({
  methods,
  url,
  data,
})

ex: 发送一个post请求
axios({
  methods: 'POST',
  url: '/user/12321',
  data: {
    firstName: 'fred',
    lastName: 'mary'
  }
})
```

2.axios(url[,config])
发送一个get请求，get是默认请求方式
```
axios('/user/12321')
```

## 请求方式别名

```
axios.request(config)
axios.get(url[,config])
axios.delete(url[,config])
axios.head(url[,config])
axios.post(url[,data[,config]])
axios.put(url,[,data[,config]])
axios.patch(url,[,data[,config]])
```

## 创建实例

```
axios.create([config])

var instance = axios.create({
  baseURl: '',
  timeout: 1000,
  headers: {}
})
```

## 实例方法

```
axios#request(config)
axios#get(url[,config])
axios#delete(url[,config])
axios#head(url[,config])
axios#post(url[,data[,config]])
axios#put(url,[,data[,config]])
axios#patch(url,[,data[,config]])
```

## 请求配置
```
{
  url,
  methods,
  baseURL,
  // 对请求数据的改动
  transformRequest: [function(data) {
    return data
  }],
  // 在数据传送到'then/catch'之前对数据进行改动
  transformResponse: [function(data) {
    return data
  }],
  headers,
  params,
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormatL: 'brackets'})
  },
  data: {}
  timeout,
  // 表示跨域请求时是否需要凭证
  withCredentials: false,
  // 允许自定义请求
  adaptefr: function(config) {},
  // 'auth'表示应该使用http基础验证，并提供凭据,这将设置一个'Authorization'头，覆写掉现有的任意使用'headers'设置的自定义'Authorization'头
  auth: {
    username: '',
    password: ''
  },
  responseType: '',
  // 承载 xsrf token 的值的http头名称
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 允许为上传处理进度事件
  onUploadProgress: function(progressEvent) {
    //对原生事件的处理
  },
  // 定义允许的响应内容的最大尺寸
  maxContentLength,
  根据此函数返回的值定义promise的状态为resolve或rejected
  validateStatus: function(status) {
    return status >= 200 && status < 300
  },
  // 定义在nodejs中follow是最大重定向数目
  maxRedirects: 5,
  // 在nodejs中定义在执行http和https时使用的自定义代理
  httpAgent: new http.Agent({ keepAlive: true}),
  httpsAgent: new https.Agent({ keepAlive: true}),
  // proxy定义代理服务器的主机名称和端口，auth表示http基础验证应当用于连接代理，并提供凭据
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: '',
      password: ''
    }
  },
  // 指定用于取消请求的cancel token
  cancelToken: new cancelToken(function(cancel) {})
}
```

## 响应信息

```
{
  data: {}, //数据
  status: 200, //状态码
  statusText: 'OK', // 服务器响应的http状态信息
  headers: {}, 服务器响应头
  config: {} //为请求提供的配置信息
}
```

使用then时可用response参数来接收响应
axios.get('/user/12321')
     .then(function(response) {
       console.log(response.data)
       console.log(response.status)
       ……
})

## 配置默认值

* 全局的axios默认值
```
axios.defaults.baseURL = ''
// 设置请求头信息为AUTH_TOKEN
axios.defaluts.headers.common['Authorization'] = AUTH_TOKEN
// 设置请求的媒体类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fomr-urlencoded'
// 允许跨域的情况下携带cookie
axios.defaults.withCredentials = true
// 标识这是一个ajax请求
axios.defaults.headers.common['X-Request-With'] = 'XMLHttpRequest'
```

## 自定义实例默认值

```
var instance = axios.create({
  baseURL: 'https://api.example.com'
})

// 在实例忆创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

## 配置的优先顺序

在lib/defaults.js中找到库的默认值，然后是实例的defaults属性，最后是config请求参数
```
var instance = axios.create()

instance.defaults.timeout = 2000

instance.get('/longRequest', {
  timeout: 5000
})
```

## 拦截器

在请求或响应被then或catch之前拦截它们，此例包括封装axios--http.js
```
// 在请求发出之前拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.rejected(error)
})

*ex:
// 此处在请求发出之前，将config参数中的请求头授权为AUTH_TOKEN
axios.interceptors.request.use(config => {
  let AUTH_TOKEN = storage.get('AUTH_TOKEN')
  if (AUTH_TOKEN) {
    config.headers['Authorization']
  }
})


// 在响应之前拦截
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.rejected(error)
})


* ex:
axios.interceptors.response.use(response => {
  if (response.data.retcode === 2000000) {
    return response.data.data || response.data.data
  } esle {
    throw Error(response.data.msg || '服务异常')
  }
}, err => {
  if(err && err.message) {
    let retcode = err.response.data.retcode
    // 401为后台返回的状态未登录
    if (err.response.status === '401') {
      // 移除token信息
      storage.remove('AUTH_TOKEN')
    }
    if (err.response.status === 500) {
      err.message = err.response.data.message || '系统异常'
      err.retcode = retcode
    }
  }
  return Promise.reject(err)
})

export default axios
```
封装接口地址api.js
```
const prefix = window._CONFIG_.apiPath
export default (config => {
  return Object.keys(config).reduce((copy,name) => {
    copy[name] = `${prefix}${config[name]}`
    return copy
}, {})
})({
  // 接口地址
  user: '/api/user/user'
  ……
})
```
定义相关请求server.js
```
import api from '../api'
impost axios from '../http'
export function getUserInfo(userId) {
  return axios.get(api.user, params)
}
```
调用相关接口 getUser.js
```
import {getUserInfo} from '../server'
getUserInfo({userId: userId})
  .then((resp) => {
   console.log(resp)
   if (res.retcode === 2000000) {}
   if (res.retcode === 300000) {}
}).catch((err) => {
    console.log(err.message)
  })
```


## 移除拦截器

```
var myInterceptor = axios.interceptors.request.use(config => {})
axios.interceptor.request.eject(myInterceptor)
```

## 为自定义实例添加拦截器

```
var instance = axios.create()
instance.interceptors.request.use(config => {})

```

## 错误处理

可以使用validateStatus 配置选项定义一个自定义http状态码的错误范围
```
axios.get('/user/123213', {
  validateStatus: (status) => {
    return status< 500 //状态码在大于或等于500时才会reject
  }
})

```
## 取消请求

使用cancel token 取消请求，可以使用CancelToken.source工厂方法创建cancel token
```
var CancelToken = axios.cancelToken
var source = CancelToken.source()

axios.get('/user/12321', {
  cancelToken: source.token
}).catch((thrown) => {
  if (axios.isCancel(thrown)) {
    console.log(thrown.message)
  } else {
    // 处理错误
  }
})

source.cancel('operation canceled by the user')
```
还可以通过传递一个executor 函数到CancelToken 的构造函数来创建 cancel token的身份验证
```
var CancelToken = axios.CancelToken
var cancel

axios.get('/user/12312', {
  cancelToken: new CancelTokem(exector(c) => {
    // exector函数接收一个cancel函数作为参数
    cancel = c
  })
})
```
