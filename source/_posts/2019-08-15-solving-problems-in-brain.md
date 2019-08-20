---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-08-15 13:54:54
title: Challestend的脑内切题清单
tags:
  - 杂题
categories:
  - 瞎扯
password:
---
如标题所示。

觉得比较简单或者懒得写代码的题。

~~wzx「你怎么还懒得写代码啊。你把这些题都写了就有事干了。」~~

可能有时候会闲着没事写几道。

<!-- more -->

### [「CF915F」Imbalance Value of a Tree](http://codeforces.com/problemset/problem/915/F)

最大值和最小值分开求。

大力并查集。

以上。

### [「CF455D」Serega and Fun](http://codeforces.com/problemset/problem/455/D)

大力块链。

记得loli以前考过这题。

~~结果那次数据随机放跑了暴力。~~

### [「CF1182E」Product Oriented Recurrence](http://codeforces.com/problemset/problem/1182/E)

令

$$g_{i}=\ln f_{i}$$

那么

$$g_{n}=(2n-6)\ln c+g_{n-1}+g_{n-2}+g_{n-3}$$

一定存在这样的$k_{0},k_{1},k_{2},k_{3}$，使得

$$g_{n}=k_{0}\ln c+k_{1}g_{1}+k_{2}g_{2}+k_{3}g_{3}$$

于是

$$f_{n}=c^{k_{0}}\cdot f_{1}^{k_{1}}\cdot f_{2}^{k_{2}}\cdot f_{3}^{k_{3}}$$

### [「CF1093E」Product Oriented Recurrence](http://codeforces.com/problemset/problem/1093/E)

定义$f_{i}$表示$a_{i}$在$b$中对应的下标，$g_{i}$表示$b_{i}$在$a$中对应的下标。

操作一就是在询问

$$\sum_{i=l_{a}}^{r_{a}}[f_{i}\in[l_{b},r_{b}]]$$

操作二就交换一下$f_{g_{x}}$和$f_{g_{y}}$，$g_{x}$和$g_{y}$。

大力分块。

### [「CF446C」DZY Loves Fibonacci Numbers](http://codeforces.com/problemset/problem/446/C)

~~通过查阅题解，~~我们知道斐波那契数拥有如下性质

$$F_{n+m}=F_{n+1}F_{m}+F_{n}F_{m-1}$$

考虑使用数学归纳法证明。首先

$$F_{n+0}=F_{n+1}F_{0}+F_{n}F_{-1}$$

……不从$1$开始。

$$F_{n+1}=F_{n+1}F_{1}+F_{n}F_{0}=F_{n+1}$$

$$F_{n+2}=F_{n+1}F_{2}+F_{n}F_{1}=F_{n+1}+F_{n}=F_{n+2}$$

$$\begin{aligned}
F_{n+m}&=F_{n+m-1}+F_{n+m-2}\\
&=F_{n+1}F_{m-1}+F_{n}F_{m-2}+F_{n+1}F_{m-2}+F_{n}F_{m-3}\\
&=F_{n+1}F_{m}+F_{n}F_{m-1}
\end{aligned}$$

于是

$$\sum_{i=1}^{x}F_{L+i}=F_{L+1}\sum_{i=1}^{x}F_{i}+F_{L}\sum_{i=0}^{x-1}F_{i}$$

然后大力线段树（细节略）。

[我甚至还写了](http://codeforces.com/contest/446/submission/58884107)。
