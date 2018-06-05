# vuex

## vuex-getter

### vuex中的getter使用属性访问和使用方法访问，但此处都是指的通过getter的返回值来访问，即返回值是属性或方法。

getter接收state作为其第一个参数，调用时vuex会自动执行最外层函数,即state这一层。
当通过属性访问时，getter是作为vue响应式系统的一部分缓存的，即只要是返回对象就会有缓存，除非state发生了变化
```
getters: {
  //引自doneTodosCount返回的不是外层(state,getters)函数，而是return后边的返回值
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
computed: {
  doneTodosCount() {
    return this.$store.getters.doneTodosCount
  }
}
```
而当通过方法访问时，getter每次都会重新进行调用，不会缓存结果
```
getters: {
  // 此处getTodoById同理，返回的不是外层(state)函数，而是(id)内层函数，所以接收的时候也是(id)函数来接收参数
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
此处箭头函数普通形式为
getTodoById: function(state) {
  return function(id) {
    return state.todos.find(function(todo) {
      return tood.id === id
    })
  }
}
调用时使用
store.getters.getTodoById(2)
此处2直接传给(state) => (id)的内层函数(id)
```

## vuex简单示例

### (参照<https://www.cnblogs.com/ghostwu/p/7521097.html>)

### 一、使用vue-cli完成环境搭建
```
1.npm install --global vue-cli 安装命令行工具
2.vue init webpack vue-demo 生成一个webpack项目,名字为vue-demo
3.cd vue-demo
4.npm install
5.npm run dev

```
### 二、删除helloworld组件，将App.vue与router文件都变成原始状态

App.vue
```
<template>
  <div id="app"></div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
```
router-index.js
```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//创建router实例，配置routes参数
export default new Router({
  routes: [
  {
    path: '/'
  }
  ]
})
```

### 三、npm i vuex --save-dev

### 四、 在main.js中引入vuex，并注册store，这样就可以使用this.$store来获得这个容器了

main.js
```
import Vue form 'vue'
import App form './App'
import router from './router'
// 引入vuex
import Vuex from 'vuex'
// 引入store
import store from './vuex/store'

// 模块化打包系统中，使用vue.use来安装Vuex
Vue.use(Vuex)

// 阻止vue在启动时生成生产提示
vue.config.productionTip = false

//创建vue实例，将组件、路由、与store挂载到实例上
new Vue({
  el: '#app', // 替换页面中id为app的div元素
  router, //挂载路由
  store, // 注册store
  template: '<App/>', // 告知页面这个组件用这样的标签来包裹着，并且使用它
  components: { App } //告知当前页面想使用App这个组件
})
```

### 五、创建store.js，用于存放所有的状态（改变的数据）

store.js
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建store，提供一个初始对象state，存放状态userName
const store = new Vuex.Store({
  state: {
    userName: 'ghostwu'
  }
})

export default store

```

### 六、将状态中的数据渲染到组件中

在components下创建组件Main.vue
```
<template>
 <div>{{myName}}</div>
</template>

<script>
  export default {
    name: 'Main',
    // 通过计算属性获取存储在全局容器store中state保存的状态值
    computed: {
      myName() {
        return this.$store.state.userName
      }
    }
  }
</script>
```

### 七、在app.vue中引入组件Main.vue

app.vue
```
<template>
  // 此处div为绑定vue实例的div
  <div id="app">
    <Mainc></Mainc>
  </div>
</template>

<script>
import Mainc from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Mainc
  }
}
</script>
```

### 八、使用mutation改变状态

在vuex中，只有提交mutation才能改变状态，每个mutation都有一个字符串的事件类型（type)和一个回调函数,这个回调函数就是我们实际进行状态更改的地方，并且它会接收state作为第一个参数
当触发事件类型（type)时，调用回调函数,使用store.commit方法

store.js
```
const store = new Vuex.Store({
  state: {
    userName: 'ghostwu'
  },
  mutations: {
    // 此处showUserName为事件类型（type)，并且它会接收state作为第一个参数，msg即为store.commit处传入的载荷(payload),需要使用header.vue中的点击事件来传递
    showUserName(state, msg) {
      // 回调函数
      state.userName = msg
    }
  }
})
```

新建Header.vue
```
<template>
  <div>
    <input type="text" v-model="msg" />
    <input type="button" @click="setName" value="点我" />
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      setName() {
        // 使用this.$store.commit 将载荷this.msg的值提交给showUserName
        this.$store.commit('showUserName', this.msg)
      }
    }
  }
</script>
```
