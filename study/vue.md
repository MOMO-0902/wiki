## vue如何使用disabled

* 给disabled设置一个逻辑值isDisabled，在data中设置isDisabled为true，此为不可用，当要改变状态时再设置isDisabled为false
* disabled属性不要忘记加'：'
* 只有input标签才有disabled属性，disabled属性官方定义为input标签不可用属性
```
<input :disabled="isDisabled">
```

## mixins

mixins是一种公发vue组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
mixins选项接受一个混合对象的数组。这些混合实例对象像正常的实例对象一样包含选项，它们将在Vue.extend()里最终选择使用相同的选项合并逻辑合并.

#### 这句话的意思是调用mixins对象后，组件内部的内容如data,created,mothods等与父组件合并。相当于在引入后，父组件的各种属性方法都被扩充了。而且会先执行mixins内的方法。如果父组件与混合对象内的内容键名冲突时，取组件对象的键值对。

```
var addLog = {
  created() {
    console.log('mixins被执行了')
  },
  updated() {
    console.log('数字增加到' + this.num)
  },

}
export default create ({
  data() {
    return {
      num
    }
  },
  created() {
    console.log('父组件方法被执行了')
  },
  methods: {
    add() {
      this.num += 1
    }
  }
})
// 结果： mixins被执行了
          父组件方法被执行了
          数字增加到1
```

## vue 将选中项写入json备用
```
 var peopleList = [
        this.gender,
        this.age,
        this.marriage,
        this.level,
        this.education,
        this.carrer,
        this.house,
        this.car,
        this.hobby,
        this.industry
      ];
      var nameList = [
        "性别",
        "婚姻情况",
        "年龄",
        "消费等级",
        "学历",
        "身份职业",
        "是否有房",
        "是否有车",
        "兴趣爱好",
        "行业"
      ];
      // 将所选内容存入json中，后期遍历显示
      for (let i = 0; i < peopleList.length; i++) {
        if (JSON.stringify(peopleList[i]) !== "[]") {
          this.peopleJson[nameList[i]] = peopleList[i];
        }
      }
```