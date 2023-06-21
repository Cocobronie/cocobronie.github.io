---
title: 搭建Bolg全过程记录
date: 2023-05-26 19:12:56
tags: config
swiper_index: 1
top_group_index: 2
cover: mycover.png
ai: true
typora-root-url: ./..
---
# 搭建Bolg全过程记录

## 1、Hexo+GithubPage+阿里云域名配置

### 搭建过程这个博主说的比较清楚：

[使用 Hexo+GitHub 搭建个人免费博客教程（小白向） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/60578464)

### Hexo+GithubPage搭建原理：

在本地撰写 Markdown 格式文章后，通过 Hexo 解析文档，渲染生成具有主题样式的 HTML 静态网页，再推送到 GitHub 上完成博文的发布。

<img src="/images/hexoConfigNote/image-20230526214207511.png" alt="image-20230526214207511" style="zoom:80%;" />

### 访问网址

deploy到Github上之后就可以通过<https://用户名.github.io>来访问你的博客了

也可以通过**域名**来访问，在阿里云上购买一个即可。

### Hexo 博客文件夹目录结构如下：

![img](/images/hexoConfigNote/v2-264c75c0e493ae8cc5f283567c64ff2c_720w.webp)

### _config.yml文件的[配置 | Hexo](https://hexo.io/zh-cn/docs/configuration.html)

- 注意：仅仅注释掉某些配置并不会引起页面改变，除非改变配置的值！！

<img src="/images/hexoConfigNote/image-20230526214721316.png" alt="image-20230526214721316" style="zoom:50%;" />

注释掉之后照样显示：

![image-20230526214734538](/images/hexoConfigNote/image-20230526214734538.png)

除非删除对应的值：

<img src="/images/hexoConfigNote/image-20230526214745972.png" alt="image-20230526214745972" style="zoom: 50%;" />

此时显示：

![image-20230526214802166](/images/hexoConfigNote/image-20230526214802166.png)





## 2、Hexo常用命令

### 搭建相关

- 初始化

```shell
hexo init [folder]	 #新建一个网站。如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。
```

- 在某些情况（尤其是更换主题后），如果发现您对站点的更改无论如何也不生效，您可能需要运行下面命令。

```shell
hexo clean 		    #清除缓存文件 (db.json) 和已生成的静态文件 (public)。
```

简写成下面这样不会删除public文件夹

```shell
hexo c	
```

简写成下面这样会删除public文件夹

```shell
hexo cl
```

- 生成网站静态文件到默认设置的  `public ` 文件夹。

```shell
hexo generate		#Hexo 引入了差分机制，如果 public 目录存在，那么 hexo g 只会重新生成改动的文件
hexo generate -f	#强制重新生成文件,使用该参数的效果接近 hexo clean && hexo generate
```

- 部署网站到 `github` 上

```shell
hexo deploy			#可以在 _config.yml 文件中配置 deploy 的相关参数
```

- 启动本地服务器，用于预览主题。预览的同时可以修改文章内容或主题代码，保存后刷新页面即可；但是对 Hexo 根目录 _config.yml 的修改，需要重启本地服务器后才能预览效果。

  如果你还没有部署到github上，还想在本地改改，这个方便你调试预览。

```shell
 hexo server		# 默认情况下，访问网址为： http://localhost:4000/
```

### 发布文章

**文章可以拥有如下属性：**

<img src="/images/hexoConfigNote/image-20230526214839842.png" alt="image-20230526214839842" style="zoom:67%;" />

- 新建一篇文章。如果没有设置 `layout` 的话，默认使用  _config.yml 中的 `default_layout` 参数代替。如果标题包含**空格**的话，请使用引号括起来。

  对于独立页面来说，Hexo 会创建一个以标题为名字的目录，并在目录中放置一个 `index.md` 文件。

```shell
hexo new [layout] <title>	# 目录位置：source/_posts/title

#title是必不可少的
hexo new page --path about/me "About me"	#创建一个 source/about/me.md 文件，同时 title 为 "About me"
hexo new page --path about/me			   #创建 source/_posts/about/me.md，同时 title 为 "page"
```

- 生成草稿，会在source/_drafts目录下生成一个new-draft.md文件。但是这个文件不被显示在页面上，链接也访问不到。

```shell
 hexo new draft "new draft"	
 hexo server --drafts				#预览草稿
 hexo publish [layout] <filename>	 #把草稿变成文章，或者页面
```

参考：

[指令 | Hexo](https://hexo.io/zh-cn/docs/commands.html)
[Hexo 最常用的几个命令 - 简书 (jianshu.com)](https://www.jianshu.com/p/a2d298e26dcd)



## 3、选择Hexo Theme

我选的是[安知鱼 - 生活明朗, 万物可爱 (anzhiy.cn)](https://anzhiy.cn/)

- 安装指南是在[安知鱼主题指南 (anzhiy.cn)](https://anzhiy.cn/docs/quick-start.html#💻-安裝)

- 安装步骤是参考的他的视频教程[anzhiyu主题安装_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Rs4y127hu/?spm_id_from=333.788&vd_source=592e40e3e456cbca5e66df60b04bf2d3)

配置：[安知鱼主题社交图标配置_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Cv4y1n7FW/?spm_id_from=pageDriver&vd_source=592e40e3e456cbca5e66df60b04bf2d3)

- 配置可以参考anzhiyu的文档：[安知鱼主题指南 (anheyu.com)](https://blog.anheyu.com/docs/)
- 也可以参考Butterfly(更全)：[Butterfly - A Simple and Card UI Design theme for Hexo](https://butterfly.js.org/)
- 配置查文档的话还是参考Butterfly，anzhiyu很多都没有

### 自定义头像（最开始刚加载的地方）

<img src="/images/hexoConfigNote/image-20230526214857770.png" alt="image-20230526214857770" style="zoom:67%;" />

Loading Animation (加载动画)中

```yaml
# Loading Animation (加载动画)
preloader:
  enable: true
  # source
  # 1. fullpage-loading
  # 2. pace (progress bar)
  # else all
  source: 3
  # pace theme (see https://codebyzach.github.io/pace/)
  pace_css_url:
  avatar: /img/avatar.jpg # 自定义头像
```

### 页面结构

![image-20230526214910920](/images/hexoConfigNote/image-20230526214910920.png)



### _config.anzhiyu.yml文件结构

- nav（左上角目录）

  <img src="/images/hexoConfigNote/image-20230526214924274.png" alt="image-20230526214924274" style="zoom:50%;" />

- Code Blocks (代码相关)

- search (搜索)

<img src="/images/hexoConfigNote/image-20230526214939187.png" alt="image-20230526214939187" style="zoom:80%;" />

<img src="/images/hexoConfigNote/image-20230526214948330.png" alt="image-20230526214948330" style="zoom:50%;" />

- Math (数学)
- Image (图片设置)
  - 可以设置**网站图标**：`Favicon`（网站图标）
  - 在这里设置**头像(`avatar`)**没用，头像(`avatar`)设置应该在：Loading Animation (加载动画)中设置
  - index_img
  - default_top_img
  - archive_img
  - tag_img
  - category_img
- Post（文章设置）
- Share System (分享功能)
- Comments System（评论设置）
- Chat Services（聊天区）
- Footer Settings（页脚设置）
- Analysis
- Advertisement（广告）
- Verification (站长验证)
- Beautify/Effect (美化/效果)
- Background effects (背景特效)
- aside (侧边栏)
- Bottom right button (右下角按钮)
- Lightbox (图片大图查看模式)
- Tag Plugins settings (标签外挂)
- other





## 4、clash优化上传速度

- 安装`clash`（一定要安在系统盘！！！不能有中文路径！！！确保之前的版本卸载干净），推荐在官网下载解压缩版
- 配置方法：[Clash for Windows 官网下载、设置教程 🌟 觅云🔥 (miyun.app)](https://doc.miyun.app/clash-for-windows/)



## 5、typora + hexo博客中插入图片

[(90条消息) typora + hexo博客中插入图片__吟游诗人的博客-CSDN博客](https://blog.csdn.net/qq_32623363/article/details/100524856)

- 首先在 `hexo > source`目录下建一个文件夹叫images，用来保存博客中的图片。

- 打开Typora的 `文件 > 偏好设置`，进行如下设置

  ```
  ../../source/images/${filename}
  ```

  

  <img src="/images/hexoConfigNote/image-20230526215016301.png" alt="image-20230526215016301" style="zoom:50%;" />

- 格式->图像->设置图片根目录

  <img src="/images/hexoConfigNote/image-20230526215415503.png" alt="image-20230526215415503" style="zoom:50%;" />

- 记得先在hexo里执行了  `hexo new  <title>` 再用typora打开.md文件进行编辑，这样图片插入时才会保存在文件夹中。

## 6、每次写Blog时

```shell
hexo new  <title>	#新建一篇Blog
```

- 用typora打开`source\_posts\<title>.md`，开始写你的Blog，每次记得保存！
- 生成文章页并预览

```shell
hexo cl	#清除public文件夹
hexo g	#生成
hexo s	#本地预览
```

- 如果觉得已经写好啦，部署到github上吧！

```shell
hexo d
```

## 7、添加百度统计实时观测网站数据

**一开始我没在[安知鱼主题指南 (anzhiy.cn)](https://anzhiy.cn/docs/)找到相关配置方法，所以就自己去看了theme文件夹下面的源码**

- 在`themes\anzhiyu\layout\includes\head\analytics.pug`文件中我找到了关于`baidu_analytics`的代码:

```pug
if theme.baidu_analytics
  script.
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?!{theme.baidu_analytics}";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
```

- 这段代码的作用是用于在用户的网站上集成百度统计（Baidu Analytics），以便收集访问数据和用户行为信息，为网站的运营和分析提供数据支持。接下来我们逐行分析此代码的作用：

1.  `if theme.baidu_analytics`：先判断是否设置了`baidu_analytics`，如果是，则继续执行后面的代码，否则跳过本段代码块。
2.  `script.`：代表这是一段JavaScript脚本。
3.  `var _hmt = _hmt || [];`：声明一个全局变量`_hmt`，如果该变量已存在，则直接将其赋值为自身，如果不存在，则将其赋值为空数组。
4.  `(function() { ... })();`：使用匿名函数立即把该函数作为表达式执行，不会在全局范围内定义变量，可以保证插件逻辑与项目逻辑没有任何干扰。
5. ` var hm = document.createElement("script");`：使用`document.createElement`方法创建一个`<script>`元素，即创建一个script标签。
6.  `hm.src = "https://hm.baidu.com/hm.js?!{theme.baidu_analytics}";`：设置百度统计脚本的`src`属性，其中`theme.baidu_analytics`是Vue中的动态属性，用于获取用户设置的百度统计统计ID。
7.  `var s = document.getElementsByTagName("script")[0];`：获取页面上第一个`<script>`元素。
8.  `s.parentNode.insertBefore(hm, s);`：将新创建的`<script>`元素插入到`s`元素之前，即在页面上引入百度统计的JS脚本文件，以完成数据收集的功能。

**后来，我在[Butterfly 安裝文檔(四) 主題配置-2 | Butterfly](https://butterfly.js.org/posts/ceeb73f/#在綫聊天)找到了相关配置方法**

<img src="/images/hexoConfigNote/image-20230527173207803.png" alt="image-20230527173207803" style="zoom: 67%;" />

**注意！！不是复制一整段代码！！而是**

![Snipaste_2023-05-27_17-56-31](/images/hexoConfigNote/Snipaste_2023-05-27_17-56-31.png)

## 8、加速Hexo网站的加载速度

[hexo](https://so.csdn.net/so/search?q=hexo&spm=1001.2101.3001.7020)-offline-popuphexo-offline-popup 是一个 [hexo](https://hexo.io/) 插件， 它可加速您的Hexo网站的加载速度，以及网站内容更新弹窗提示。

参考：[(90条消息) Hexo博客技巧：提升博客访问速度_基于github搭建的hexo博客如何加速_Chak Aciano的博客-CSDN博客](https://blog.csdn.net/weixin_58068682/article/details/116613947)

## 9、首页顶部 3 大分类配置

[站点基础配置(三) | 安知鱼主题指南 (anheyu.com)](https://blog.anheyu.com/docs/site-configuration3.html#首页顶部-3-大分类配置)
- 创建分类页
- 在`/_posts/`中创建文章，文章顶部配置

```
categories: 生活日常
```