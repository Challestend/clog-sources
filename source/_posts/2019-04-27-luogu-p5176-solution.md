---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-04-27 13:11:37
title: 「Luogu-P5178」公约数
tags:
  - 数论
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problemnew/show/P5176)

<!-- more -->

首先我们看到要求的这个式子……这什么鬼啊能做吗（

冷静分析一波，我们可以根据括号里的两个加号将原式拆分成三个三重$\sum$

$$\begin{aligned}
&\sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{p}(ij,ik,jk)\cdot(i,j,k)\cdot\cfrac{(i,j)}{(i,k)\cdot(j,k)}\\
+&\sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{p}(ij,ik,jk)\cdot(i,j,k)\cdot\cfrac{(i,k)}{(i,j)\cdot(j,k)}\\
+&\sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{p}(ij,ik,jk)\cdot(i,j,k)\cdot\cfrac{(j,k)}{(i,j)\cdot(i,k)}
\end{aligned}$$

首先我们单独考虑第一个

$$\begin{aligned}
&\sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{p}(ij,ik,jk)\cdot(i,j,k)\cdot\cfrac{(i,j)}{(i,k)\cdot(j,k)}\\
=&\sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{p}(ij,(i,j)k)\cdot((i,j),k)\cdot\cfrac{(i,j)}{(i,k)\cdot(j,k)}\\
=&\sum_{d=1}^{\min(n,m)}\sum_{x=1}^{\lfloor\tfrac{n}{d}\rfloor}\sum_{y=1}^{\lfloor\tfrac{m}{d}\rfloor}[x\perp y]\sum_{k=1}^{p}(d^{2}xy,dk)\cdot(d,k)\cdot\cfrac{d}{(dx,k)\cdot(dy,k)}\\
=&\sum_{d=1}^{\min(n,m)}\sum_{x=1}^{\lfloor\tfrac{n}{d}\rfloor}\sum_{y=1}^{\lfloor\tfrac{m}{d}\rfloor}[x\perp y]\sum_{k=1}^{p}d^{2}\cdot(d,k)\cdot\cfrac{(dxy,k)}{(dx,k)\cdot(dy,k)}\\
\end{aligned}$$

考虑将$d,x,y,k$写成唯一分解形式，然后对于第$i$小的质数$c_{i}$，它在四个数中的指数分别是$r_{d,i},r_{x,i},r_{y,i},r_{k,i}$，那么

$$\begin{aligned}
=&\sum_{d=1}^{\min(n,m)}\sum_{x=1}^{\lfloor\tfrac{n}{d}\rfloor}\sum_{y=1}^{\lfloor\tfrac{m}{d}\rfloor}[x\perp y]\sum_{k=1}^{p}d^{2}\prod_{i=1}c_{i}^{\min(r_{d,i},r_{k,i})+\min(r_{d,i}+r_{x,i}+r_{y,i},r_{k,i})-\min(r_{d,i}+r_{x,i},r_{k,i})-\min(r_{d,i}+r_{y,i},r_{k,i})}
\end{aligned}$$

因为$x\perp y$，$r_{x,i}$和$r_{y,i}$中必定有一个为$0$，带入整理后我们得到

$$\begin{aligned}
=&\sum_{d=1}^{\min(n,m)}\sum_{x=1}^{\lfloor\tfrac{n}{d}\rfloor}\sum_{y=1}^{\lfloor\tfrac{m}{d}\rfloor}[x\perp y]\sum_{k=1}^{p}d^{2}\\
=&p\sum_{i=1}^{n}\sum_{j=1}^{m}(i,j)^{2}
\end{aligned}$$

对剩下的两个三重$\sum$也进行类似的化简，最后我们得到答案就是

$$p\sum_{i=1}^{n}\sum_{j=1}^{m}(i,j)^{2}+m\sum_{i=1}^{n}\sum_{j=1}^{p}(i,j)^{2}+n\sum_{i=1}^{m}\sum_{j=1}^{p}(i,j)^{2}$$
