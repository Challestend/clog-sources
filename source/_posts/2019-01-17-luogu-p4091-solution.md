---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-17 11:28:06
title: 「HEOI2016/TJOI2016」求和
tags:
  - HEOI
  - TJOI
  - 2016
  - NTT
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problemnew/show/P4091)

感觉最近意志消沉啥也不想干，于是继续来颓blog（

<!-- more -->

仔细一推发现也不是什么很难的题，感觉几天前的自己就是个傻子（

首先我们知道如果$n\gt m$，$S(n,m)=0$。于是我们将原式写成

$$\sum_{i=0}^{n}\sum_{j=0}^{n}2^{j}j!S(i,j)=\sum_{j=0}^{n}2^{j}j!\sum_{i=0}^{n}S(i,j)$$

第二类斯特林数有一个通项公式，它长这样

$$S(n,m)=\cfrac{1}{m!}\sum_{i=0}^{m}(-1)^{i}C(m,i)(m-i)^{n}$$

直观理解一下，$S(n,m)$说的是将$n$个有标号的小球放进$m$个无标号的盒子，且不允许空盒的方案数。我们令$F(n,m,k)$表示将$n$个有标号的小球放进$m$个有标号的盒子，且其中至少有$k$个空盒的方案数。不难发现

$$F(n,m,k)=C(m,k)(m-k)^{n}$$

然后我们容斥一下，得到将$n$个有标号的小球放进$m$个有标号的盒子，且不允许空盒的方案数$G(n,m)$。不难发现

$$G(n,m)=\sum_{i=0}^{m}(-1)^{i}F(n,m,i)=\sum_{i=0}^{m}(-1)^{i}C(m,i)(m-i)^{n}$$

因为$S(n,m)$的定义中要求盒子无标号，我们再除以盒子的排列方案$m!$即可。

然后我们继续推式子

$$\begin{aligned}
\sum_{j=0}^{n}2^{j}j!\sum_{i=0}^{n}S(i,j)&=\sum_{j=0}^{n}2^{j}j!\sum_{i=0}^{n}\cfrac{1}{j!}\sum_{k=0}^{j}(-1)^{k}C(j,k)(j-k)^{i}\\
&=\sum_{j=0}^{n}2^{j}j!\sum_{i=0}^{n}\cfrac{1}{j!}\sum_{k=0}^{j}(-1)^{k}\cfrac{j!}{k!(j-k)!}(j-k)^{i}\\
&=\sum_{j=0}^{n}2^{j}j!\sum_{i=0}^{n}\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!(j-k)!}(j-k)^{i}\\
&=\sum_{j=0}^{n}2^{j}j!\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!(j-k)!}\sum_{i=0}^{n}(j-k)^{i}
\end{aligned}$$

我们看到右边就是一个等比数列求和，于是

$$\sum_{j=0}^{n}2^{j}j!\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!(j-k)!}\sum_{i=0}^{n}(j-k)^{i}=\sum_{j=0}^{n}2^{j}j!\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!}\cfrac{(j-k)^{n+1}-1}{(j-k)!(j-k-1)}$$

定义

$$F[i]=\cfrac{(-1)^{i}}{i!}$$

右边的等比数列求和比较麻烦，我们需要一些特判。

$$G[i]=\begin{cases}
&1&(i=0)\\
&n+1&(i=1)\\
&\cfrac{i^{n+1}-1}{i!(i-1)}\;\;&(i>1)
\end{cases}$$

然后我们就有

$$\sum_{j=0}^{n}2^{j}j!\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!}\cfrac{(j-k)^{n+1}-1}{(j-k)!(j-k-1)}=\sum_{j=0}^{n}2^{j}j!(F\times G)[j]$$

这么一想前几天的我还只会暴力二项式定理展开（

![](/images/TIM图片20181209192946.jpg)
