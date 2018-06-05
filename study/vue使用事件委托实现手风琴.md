# 未使用事件委托实现vue手风琴

```
uvar Vue = require('vue-plus');
var config = require('config');

var component = Vue.extend({

	data: function() {
		return {
			list: [],
			page: 1,
			hasMore: true,
			isShowLoading: false,
			loadingTip: '',
			// 详情数据数组
			infos: [],
			current: {},
			rate: 0
		};
	},

	template: __inline('./list.tpl'),

	methods: {
		toggleDetail: function ($event, ctime, which) {
			// 获取当前元素,即当前列表项
			var $curr = $event.currentTarget;
			// 返回列表项的下一个同胞（位于同一列表中）
			var currentItem = $curr.nextElementSibling;
			// 获取下一列表项的display属性
			var display = currentItem.style.display;
			// 获取当前列表项的第一个子元素的第二个子元素，即img旋转图标
			var img = $event.currentTarget.children[0].children[1];
			// 获取所有详情数据模块，结果为一个数组
			var $details = document.querySelectorAll('.bg-fcfcfc');
			// 获取所有旋转图标，结果为一个数组
			var $imgs = document.querySelectorAll('.angle');

			// 循环详情数组，（当点击此列表时，）如果此详情数组是显示的，那就让它隐藏，实现切换，同时改变旋转图标的样式
			for(var i = 0, l = $details.length; i < l; i++) {
				if($details[i].style.display === '') {
					$details[i].style.display = 'none';
					$imgs[i].className        = 'angle fr';
				}
			}

		// 如果下一列表项是隐藏的，
			if(display === 'none') {
				//显示
				// 如果当前详情项在列表详情数组里为未空，那就请求接口
				if(!this.infos[which]) {
					var promise = Vue.ajax({
							url: 'http://qlll.dev.zhongfl.com/api/account/Interestdetail',
							method: 'post',
							// 提交列表项的时间
							data: {date: ctime}
						})
						.success(reqSuccess(function(resp) {
							// 将请求数据赋值给当前详情列表中对应当前条目的那一项
							this.infos[which] = resp.data;
							// 将请求数据赋值给当前详情项
							this.current = resp.data;
							//
							if(!resp.data.activity){
								this.rate = 0;
							} else {
								this.rate = resp.data.activity.rate;
								currentItem.style.display = '';
								img.className = 'angle fr angleRotate';
							}
						}, this));
				} else {
					this.current = this.infos[which];
					currentItem.style.display = '';
					img.className = 'angle fr angleRotate';
				}
			} else {
				//隐藏
				img.className = 'angle fr';
				currentItem.style.display = 'none';
			}
		},

		onScrollBottom: function() {
			if (isBottomOnScroll()) {
				if (this.hasMore) {
					this.fetchData();
				} else {
					window.onscroll = null;
				}
			}
		},
		fetchData: function() {
			this.isShowLoading = true;
			this.loadingTip  = '正在加载...';
			var promise = Vue.ajax({
				url: 'http://qlll.dev.zhongfl.com/api/account/interestlist',
				method: 'get',
				data: {
					page: this.page,
					len: 15			//安卓手机列表第一页数据过少导致不能滚动。
				}
			})
			.success(reqSuccess(function(resp) {
				var list = resp.data.list;
				if (list.length > 0) {
					this.isShowLoading = false;
					this.list = this.list.concat(list);
					this.page += 1;
				} else {
					this.isShowLoading = true;
					this.loadingTip = '没有更多数据了';
					this.hasMore = false;
				}
			}, this));
		}
	},

	ready: function() {
		this.fetchData();
		window.onscroll = this.onScrollBottom.bind(this);
		var $details = document.querySelectorAll('.bg-fcfcfc');
		var $imgs    = document.querySelectorAll('.angle');

		for(var i = 0, l = $details.length; i < l; i++) {
			$details[i].style.display = 'none';
			$imgs[i].className        = 'angle fr';
		}
	}

});

/* @require ./style.less */
module.exports = {component: component};

```



# 事件委托简单例子

```
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  <title>钱隆归来了</title>
  <style media="screen">
    ul{
      list-style: none;
      background:#ff0;

    }
    ul li{
      padding:10px 0;
      background:#cdcdcd;
      border-bottom:1px solid #ddd;
    }
  </style>
</head>
<body>
  <div id="app">
    <ul id="ul">
      <li>
          <p>
            li里面的p
            <span>span1</span>
            <span>span2</span>
            <span>span3</span>
          </p>
      </li>
      <li>222</li>
      <li>333</li>
      <li>444</li>
    </ul>
  </div>
</body>
<script type="text/javascript">
window.onload=function(){
  //循环li
  
  var ul=document.getElementById("ul")
  ul.onclick=function(event){
      console.log(this)
      console.log(event)
      console.log(event.nodeName)
      var ev = ev || window.event;
　　  var target = ev.target || ev.srcElement;
　　  if(target.nodeName.toLowerCase() == 'li'||target.nodeName.toLowerCase() == 'p'||target.nodeName.toLowerCase() == 'span'){
  　　　 alert('触发了li');
　　   }
  }
}
</script>
</html>
```

# 使用事件委托实现vue手风琴组件

```
html：
<ul class="daily daliprob" @click="toggle($event)" >



import * as iakit from 'iakit'
import { queryInterestListInfo, interestDetailInfo } from 'services'
import create from './index.tpl'
import './index.styl'
import isReachBottom from 'helper/isReachBottom'

export default create({
  data() {
    return {
      listData: [],
      detailInfo: [],
      current: {
        basic: {},
        newcomer: [],
        new_come_rate: '',
        activity: [],
        commission: []
      },
      rate: 0,
      page: 1,
      // 是否有更多数据
      hasMore: true,
      // 是否显示加载更多数据信息
      isShowLoading: true
    }
  },
’
  created() {
    this.queryInterestList()
    // 为窗体添加滚动事件 RreachBottom,判断是否滑动到了页面底部
    window.addEventListener('scroll', this.RreachBottom)
  },

  methods: {
    getNode(node) {
      if (node.nodeName === 'LI') {
        return node
      } else if (node.nodeName === 'UL') {
        return false
      } else {
        return this.getNode(node.parentNode)
      }
    },

    toggle(e) {
      var target = e.target || e.srcElement
      var $li = document.querySelectorAll('li')
      // thisLi 当前点击li的e.target
      var thisLi = this.getNode(target)
      // 获取所有列表项，生成数组
      var $details = document.querySelectorAll('.earnDetail')
      // 获取所有旋转图标，生成数组
      var $icons = document.querySelectorAll('.eranIcon')
      for (let i = 0, length = $li.length; i < length; i++) {
        if (thisLi === $li[i]) {
          if ($details[i].style.display === '') {
            // div展开时，将它隐藏
            $details[i].style.display = 'none'
            $icons[i].className = 'eranIcon'
          } else {
            // 隐藏时，将它展开
            // 如果当前详情项数组里无对应此项数据
            if (!this.detailInfo[i]) {
              let ctime = thisLi.children[0].children[0].innerHTML
              interestDetailInfo(
                {
                  'data': ctime
                }
              ).then((resp) => {
                // 将请求到的详情项放入详情数组中
                this.detailInfo[i] = resp
                // 将请求详情项赋值给当前详情项，以供显示
                this.current = resp
                if (!this.activity) {
                  this.rate = 0
                } else {
                  this.rate = this.activity.rate
                }
              }).catch((err) => {
                iakit.alert('', err.message, [
                  {
                    text: '朕知道了'
                  }
                ])
              })
            } else {
              // 如果详情项数组中有对应此项数据，就将数组中的数据赋值给当前详情项，以供显示
              this.current = this.detailInfo[i]
            }
            $details[i].style.display = ''
            $icons[i].className = 'eranIcon rotate'
          }
        } else {
          $details[i].style.display = 'none'
          $icons[i].className = 'eranIcon'
        }
      }
    },

    queryInterestList() {
      // 判断数据是否正在加载中，以防重复加载
      if (this.fetching) {
        return
      }
      this.fetching = true
      this.isShowLoading = true
      this.loadingTip = '正在加载中...'
      queryInterestListInfo({
        page: this.page,
        len: 15
      }).then((resp) => {
        const data = resp.list
        // 成功后不显示提示信息，数据加载完毕
        this.isShowLoading = false
        this.fetching = false
        if (data && data.length > 0) { // 存在数据，用concat连接每次请求的数组项
          this.listData = this.listData.concat(data)
        } else { // 没有更多数据了
          this.hasMore = false
          this.isShowLoading = true
          this.loadingTip = '没有更多数据了'
        }
        // 请求页标志加1,即当再次请求时请求下一页
        this.page += 1
      }).catch((err) => {
        this.fetching = false
        iakit.alert('', err.message, [
          {
            text: '朕知道了'
          }
        ])
      })
    },

    RreachBottom() {
      // 如果滚动到页面底部，并且当前选项卡为投资项
      if (isReachBottom()) {
        // 判断接口还有无数据 ，如果有，就再次请求接口
        if (this.hasMore) {
          this.queryInterestList()
        } else {
          // 如果没有数据，就解绑此事件
          window.onscroll = null
        }
      }
    }
  }
})

```
