## 什么是vuePress

vuePress是以vue驱动的主题系统的简约静态网站生成工具（拥有自己的默认主题）。

veuPress由vue,vue-router,webpack驱动的单页面应用，每个markdonw文件都使用markdonw-it编译为html文件，然后作为vue组件的模板来处理。

### [中文官网](http://caibaojian.com/vuepress/guide/)

### [VuePress仓库](https://github.com/docschina/vuepress)

### [项目地址](https://github.com/MOMO-0902/wiki)


## 安装vuePress

### 全局安装

在此方式中，只是要项目根目录创建了一个README.md文件，直接执行访问的就是此文件
```
npm install -g vuepress

# 创建一个 markdown 文件
echo '# Hello VuePress' > README.md

# 开始编写文档
vuepress dev

# 构建
vuepress build

```

### 在已有项目中安装
```
# 安装为本地依赖项
npm install -D vuepress

# 创建一个 docs 目录
mkdir docs
# 创建一个 markdown 文件
echo '# Hello VuePress' > docs/README.md

# 开始编写文档
npx vuepress dev docs
```

还可以在package.json中添加js脚本，官网方式不好写，我们直接用常用的方式
```
{
  "scripts": {
    "start": "vuepress dev docs",//运行
    "build": "vuepress build docs"//打包
  }
}
```
## 使用vuePress搭建静态博客

接下来就是配置了，我会直接把我的配置文件贴上来，我们先看结构

### 博客结构

博客结构分为主页，导航栏，侧边栏


#### 在.docs目录下新建一个.vuePress文件，在此注意，搭建博客过程中所有的配置文件以及内容文件、主题等都放在此目录中

#### 在.vuePress文件夹下新建三个文件,public用来放图片等静态文件，theme中放到博客用到的主题，config.js中存放所有的配置
```
.vuePress
  ---public
  ---theme
  ---config.js
```

#### 在.docs文件夹下新建几个模块文件夹，比如我的就分为学习笔记、问题记录、关于我等,每个文件夹下再新建md文件

vuePress会自动把README.md设置为导航的主页，所以如果我们需要主页就先建README.md,再新建first.md,seconde.md等文件作为侧边栏要显示的文件

```
.docs
  ---.vuePress
  ---about
    ---README.md
    ---first.md
    ---seconde.md
  ---study
  ---problem
```

### 具体配置

### 最重要的config.js配置

##### 在此值得注意的是，主题配置不只是简单的样式配置等，其中包括导航与侧边栏部分的配置，此处配置参见官网导航栏”默认主题配置“

```
module.exports = {
  //网站标题
  title: '霍梦林的个人博客',
  // 主页描述
  description: 'Just playing around',
  // 要部署的仓库名字
  base: '/',
  dest: './docs/.vuepress/dist',
  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      // text为导航栏显示文字，link为路径，即文件夹名字，注意不要丢了名字前后的'/'
      {text: 'Home', link: '/'},
      {text: 'About', link: '/about/'},
      {text: 'Problem', link: '/problem/'},
      {text: 'Study', link: '/study/'},
      {text: 'CSDN', link: 'http://blog.csdn.net/weixin_38318244/'},
      {text: 'Github', link: 'https://github.com/momo-0902'}
    ],
    // 侧边栏配置,侧边栏组，不同（导航）页面对应不同的侧边栏
    // 以对象形式配置，前边的key为nav处的路径,后边提供一个数组作为此侧边栏中的子标题
    sidebar: {
      '/problem/': [
        // ''空字符串代表主页，显示README.md中的内容
        '',
        ['201709', '201709'],//使用数组为侧边栏起别名，前边是md名称，后边是链接显示的文字
        ['201710', '201710'],
        ],
      '/study/': [
        '',
        ['axios', '1.axios'],
        ['document', '2.document'],
        ]
    },
    // 这是嵌套标题链接，自动显示当前激活（导航）页面标题的链接，即显示深度（h1-h6的深度）
    sidebarDepth: 1
  }
}
```

### 网站主页配置，即.docs下README.md的配置

```
---
// 使用默认主题
home: true 
// 主页头像
heroImage: /me.jpg
// '开始学习'快捷按钮
actionText: Get Started →
// 快捷按钮跳转路径
actionLink: /about/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present momo
---

[[toc]]

:tada: :100:

啦啦啦德玛西亚

啦啦啦啦撸啊撸啊

<!-- ![aaa](~@alias/me.jpg) -->

这里使用了 markdown 的拓展 `[[toc]]`

## 这里是momo的博客
### 项目中遇到的问题
### 学习笔记
### csdn
### github

[关于我](/about/)



```


### theme主题配置

项目中只是把vuePress所有的主题配置都拷贝到了本项目中，项目结构如下：
```
theme
  ---styles
    ---theme.styl
    ---code.styl

  ---Home.vue
  ---Layout.vue

  ---until.js
```

### 打包部署


#### 构建

// 此处构建生成路径为./docs/.vuepress/dist,由config.js中配置：  dest: './docs/.vuepress/dist',
vuepress build docs

#### 导航到构建输出目录

// config.js中dest配置的输出目录是哪此处就cd进入哪，所有的git操作（包含初始，添加，提交等）都在此目录下
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

#### 推到你的仓库

##### 如果是部署到`<username>`.github.io的主页上

git push origin master

* 这时可能出现问题
fatal: 'origin' does not appear to be a git repository

以及fatal: Could not read from remote repository.

解决办法： 执行git remote add origin git@github.com:`<USERNAME>`/`<REPO>`.git


##### 如果是部署到分支上


git push -f git@github.com:`<USERNAME>`/`<REPO>`.git master:gh-pages

(git push -f git@github.com:momo-0902/wiki.git master:gh-pages)

### 可在package.json中配置脚本运行

#### npm start 运行项目

#### npm run build 打包

#### npm run deploy 部署