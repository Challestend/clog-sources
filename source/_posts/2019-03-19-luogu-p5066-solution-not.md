---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-03-19 15:57:35
title: 「Ynoi2014D2T2」人人本着正义之名
tags:
  - 珂朵莉树
  - 平衡树
  - 毒瘤
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problemnew/show/P5066)

~~一人血书放大常数Splay一条生路。~~

<!-- more -->

之前Ynoi2014唯一一道没公开的题。

写个$O(nm)$的暴力就有30了。

我们来分析一下操作$3,4,5,6$都在干些啥。

以操作$3$为例，如果在操作前，有一个位置的数字是$1$，它左边是一个$0$，操作完之后那个$0$就会变成$1$。除此之外不会再有其它改变。

仔细想象一下这个过程，我们发现这实际上是将操作区间内所有极长连续$1$的左端点向左扩展了$1$位，所有极长连续$0$的右端点向左收缩了$1$位。

操作$4,5,6$也是类似的。

那么我们写一棵珂朵莉树就可以获得50分了。

但实际上emmmmm……我的珂朵莉树可能和别人不一样（

别人的珂朵莉树：

![](/images/TIM截图20190319161404.png)

我的珂朵莉树：

![](/images/TIM截图20190319161900.png)

那么满分做法？

手写平衡树。没了。

~~虽然这么说，但是lxl都写了将近10KB（~~

总体思路就是，手写平衡树维护所有极长连续段的长度，并不需要维护端点因为可以算出来，单独维护还麻烦。每个节点维护子树内极长连续$0$和$1$的数量、长度最小值，以及连续段的长度变化量（标记）。修改时判断一下如果最小值变成了$0$，那么就暴力重构。~~反正lxl说因为有前两个操作的存在这么做时间复杂度是对的。~~

首先有一个问题就是，这样做每个节点维护的必须要是__极长连续段__。想象一下，如果有两个相邻的节点值都是$1$，我们进行一次操作$3$或$4$，会发生什么？

两个节点的长度都加了$1$。然后整个序列莫名其妙多出来$1$个数。再然后您就WA了。

然后就是各种各样乱七八糟的细节。虽然这么说但好像没什么可列举的了。

然后您按照上面的思路打完四五百行的代码之后交上去一看：

![](/images/TIM截图20190319171721.png)

虽然说暴力重构的时间复杂度~~应该~~是对的，但是不难发现它常数大啊。

但是如果不重构，合并相邻的连续段就会变得非常麻烦。

结论就是这题不可写，散了吧散了吧。