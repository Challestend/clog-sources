---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-14 21:18:08
title: 有上下界的网络流问题与预留推进学习笔记
tags:
  - 网络流
  - 最大流
  - 预留推进
categories:
  - 学习笔记
password:
---
感觉最近好颓啊（

这是一篇正在咕咕咕的blog。
<!-- more -->

### [无源汇有上下界可行流](https://loj.ac/problem/115)

我们发现，这道题中每条边的流量有一个下界。相比起我们以前做过的网络流题目，我们发现它们并不对流量下界作出要求，也就是说，下界都是$0$。一种简单的想法就是，将每条边的流量上界置为$\text{upper}(e)-\text{lower}(e)$，下界置为$0$。然后我们发现，这样做可能会导致流量不平衡，我们需要调整。令

$$w(u)=\sum_{v\in V,(v,u)\in E}\text{lower}((v,u))-\sum_{v\in V,(u,v)\in E}\text{lower}((u,v))$$

- 如果$w(u)=0$，说明我们不需要对点$u$做出调整。
- 如果$w(u)\gt 0$，说明调整上下界后，流入$u$的流量减少地要比流出$u$的流量多，我们就建立一个源点，从其向点$u$连一条流量上界为$w(u)$的边。
- 如果$w(u)\lt 0$，说明调整上下界后，流出$u$的流量减少地要比流入$u$的流量多，我们就建立一个汇点，从点$u$向其连一条流量上界为$-w(u)$的边。

然后直接跑一边从源点到汇点的最大流即可。

需要注意的是我们额外向图中加入的边，加入它们的目的是为了平衡流量，易知，如果它们没有完全满载，就一定不能完全平衡原图的流量，此时问题无解。

否则，我们就已经构造出了一组可行解。

### [有源汇有上下界最大流](https://loj.ac/problem/116)

这道题与上面的区别在于限制了源点和汇点，并且要求求出最大流。

我们可以从汇点到源点连一条流量上界为$+\infty$的边，然后这整个网络就循环了，然后我们跑一遍无源汇有上下界可行流。

需要注意的是，我们毕竟只是求出了可行流，原图可能还并没有满载。因此，我们删去之前求解可行流时创建的超源和超汇，在原图的残余网络上再跑一边最大流，两次的流量之和就是问题的解。

当然，求解可行流时无解的话，整个问题无解。

### [有源汇有上下界最小流](https://loj.ac/problem/117)

还没看懂，先咕着。

### [最高标号预流推进（HLPP-Highest Label Preflow Pushing？）](https://loj.ac/problem/127)

还没看懂，先咕着。
