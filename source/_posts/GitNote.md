---
title: Git踩坑记录
date: 2023-05-28 09:35:17
tags: Git
swiper_index: 1
top_group_index: 2
cover: mycover.jpg
ai: true
typora-root-url: ./..
---
# Git踩坑记录

## 前言

记录git报错场景：

我想把本地已经写好的项目上传到git，根据网上的某些教程，我依次进行了如下操作:

参考：[git上传文件基本命令](https://blog.csdn.net/weixin_43682721/article/details/88570397)

在我要上传项目的根目录，鼠标右键`Git bash Here`	

```shell
git init	#把这个目录变成git可以管理的仓库（ repositories ）
git remote add origin https://github.com/XX/XX.git #添加新的git方式的origin, github上创建好的仓库和本地仓库进行关联
git pull origin master	#把远程仓库更新与本地分支合并
```

此时报错：`fatal: couldn't find remote ref master`，但如果是新建的**仓库（ repositories ）**的话在pull代码的时候，出现这个提示，可以忽略不计。

```shell
git add .	#添加文件夹下的所有文件到缓存区，我执行了两次，第一次有三个warning，感觉没起作用
git commit -m "这里是注释" 	 #提交添加到缓存区的文件
```

此时报错：`error: pathspec 'commit”' did not match any file(s) known to git`，发现是中文引号，改成英文引号即可（已验证），单引号也会报错！！必须是英文双引号（这是网上说的，我还没验证）

<img src="/images/GitNote/image-20230528094312668.png" alt="image-20230528094312668" style="zoom:80%;" />

```shell
git push -u origin master	#把本地库的所有内容推送到远程仓库（github）上
```

此时出现报错：`fatal: unable to access 'https://github.com/XX/': Recv failure: Connection was reset`

参考：[git:上传代码时，出现fatal: unable to access ‘XXX‘: Recv failure: Connection was reset 错误解决方法](https://blog.csdn.net/m0_69087087/article/details/128838186)

应该是网络的问题，管理员模式打开cmd，运行下面的命令

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
ipconfig/flushdns
```

成功解决！！！

<img src="/images/GitNote/image-20230528095326943.png" alt="image-20230528095326943" style="zoom: 67%;" />

登录Github，发现多了一个分支`master`,但是当我想要将它与`main`分支合并的时候，出大问题了：

<img src="/images/GitNote/image-20230528100012067.png" alt="image-20230528100012067" style="zoom: 33%;" />

最后参考：[github：master提交项目到远程仓库出现“There isn’t anything to compare.”_](https://blog.csdn.net/Zero_Wong/article/details/123882159)

依次执行下面命令：

```shell
#1.将代码上传到GitHub的默认main分支（新）
1.git --version    #查看版本
2.git config --global init.defaultBranch main   #git在2.28.0上，重新设置git默认分支为main

#2.在执行提交操作即可
1.git init       //工作空间创建.git文件夹（默认隐藏了该文件夹）
2.git add .      //添加到暂存区
3.git commit -m "你的提交注释注释"
4.git remote add origin http://xxxxxxxxx.git   //本地仓库和远程github关联
5.git pull --rebase origin main  //远程有readme.md，拉一下
6.git push -u origin main        //代码合并
```

**成功解决！！！**最后把之前创建的`master`分支删除就可以啦~



<img src="/images/GitNote/image-20230528101552880.png" alt="image-20230528101552880" style="zoom:80%;" />

在要删除分支旁边，单击下面的图标即可。

![分支列表中某个分支的屏幕截图。 回收站图标以橙色轮廓突出显示。](/images/GitNote/branches-delete.png)



## 1、工作区与版本库

**工作区：**就是你在电脑上看到的目录，比如目录下testgit里的文件(.git隐藏目录版本库除外)。或者以后需要再新建的目录文件等等都属于工作区范畴。
**版本库(Repository)**：工作区有一个隐藏目录`.git`,这个不属于工作区，这是版本库。其中版本库里面存了很多东西，其中最重要的就是**stage(暂存区)**，还有Git为我们自动创建了第一个分支**master**,以及指向master的一个指针**HEAD**。

## 2、有两种获取 Git 项目仓库的方式

1. 将尚未进行版本控制的本地目录转换为 Git 仓库；
2. 从其它服务器 **克隆** 一个已存在的 Git 仓库。

## 3、前端人如何使用Git团队协作

这个博主讲得不错：

[超详细的前端程序员git指北 - 掘金 (juejin.cn)](https://juejin.cn/post/7166426575724871693)

## 4、Git中文版文档

[Git - 获取 Git 仓库 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-基础-获取-Git-仓库)
