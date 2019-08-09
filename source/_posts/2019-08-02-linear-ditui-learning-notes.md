---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-08-02 16:19:20
title: 常系数齐次线性递推式第n项的计算
tags:
  - 向量
  - 矩阵乘法
  - NTT
categories:
  - 瞎扯
password:
---
没想到我竟然还有再次回到机房的一天。

~~在家颓了两个月了（~~

没想到我竟然还有再次开始写题的一天。

~~luogu都掉蓝了（~~

没想到我竟然还有再次更新blog的一天。

~~上一次还是五月份的时候（~~

我也不知道为什么我要学这么个东西（指标题），而且它好像还没什么用。

反正我就是学了。

~~谁能告诉我递推怎么翻译成英语。扔给google它拼命告诉我recursion（~~

好像扯得有点多的样子。

[传送门](https://www.luogu.org/problem/P4723)

<!-- more -->

首先我们分析一下我们需要干什么(?)。

我们需要计算一个满足以下三个要求的递推数列：

1. 「常系数」，指递推过程中用到的系数与下标$n$无关。
2. 「齐次」，指递推式中不存在常数项。
3. 「线性」，指递推式中仅存在一次项（算上系数是二次）。

~~不过好像存在常数项也能做的样子。~~

此类递推式一般具有以下形式

$$a_{n}=\sum_{i=1}^{k}f_{i}a_{n-i}$$

其中$f_{1},f_{2},\cdots,f_{k}$为系数数列。

上式仅针对于$n\geqslant k$的情况，$n\lt k$时$a_{n}$会被给出。

如下定义初始向量$S$

$$\begin{bmatrix}
&a_{0}&\\
&a_{1}\\
&a_{2}\\
&\vdots\\
&a_{k-3}\\
&a_{k-2}\\
&a_{k-1}
\end{bmatrix}$$

如下构造矩阵$A$

$$\begin{bmatrix}
&0&1&0&\cdots&0&0&0&\\
&0&0&1&\cdots&0&0&0\\
&0&0&0&\cdots&0&0&0\\
&\vdots&\vdots&\vdots&\ddots&\vdots&\vdots&\vdots\\
&0&0&0&\cdots&0&1&0\\
&0&0&0&\cdots&0&0&1\\
&f_{k}&f_{k-1}&f_{k-2}&\cdots&f_{3}&f_{2}&f_{1}
\end{bmatrix}$$

我们有

$$a_{n}=(A^{n}S)_{0}$$

于是我们计算出$A^{n}$即可。但该过程需要的时间复杂度是$O(k^{3}\log n)$的。

假设，我们有了一个奇妙的序列$q_{0},q_{1},\cdots,q_{k-1}$，它满足

$$A^{n}=\sum_{i=0}^{k-1}q_{i}A^{i}$$

这样一来，我们就可以在$O(k^{4})$的时间复杂度内……

不，实际上我们并不需要知道整个$A^{n}$，我们仅需要知道$A^{n}S$，或者更进一步地，知道$(A^{n}S)_{0}$即可。

我们把上式两边乘以$S$，然后整理

$$\begin{aligned}
A^{n}S&=\left(\sum_{i=0}^{k-1}q_{i}A^{i}\right)S\\
A^{n}S&=\sum_{i=0}^{k-1}q_{i}A^{i}S\\
A^{n}S&=\sum_{i=0}^{k-1}q_{i}(A^{i}S)\\
(A^{n}S)_{0}&=\sum_{i=0}^{k-1}q_{i}(A^{i}S)_{0}\\
a_{n}&=\sum_{i=0}^{k-1}q_{i}a_{i}
\end{aligned}$$

我们于是得到这样的式子。这使得我们能够在$O(k)$的时间复杂度内计算答案。

然后我们考虑如何构造$q_{i}$。

注意到$\sum_{i=0}^{k-1}q_{i}A^{i}$的次数比$A^{n}$低，我们令

$$A^{n}=P(A)G(A)+Q(A)$$

其中$P,G,Q$是三个矩阵多项式，并且我们钦定$G$的次数是$k$，$PG$的次数是$n$。

如果说，这个$G$还满足$G(A)=0$，我们就有

$$A^{n}=\sum_{i=0}^{k-1}q_{i}A^{i}=Q(A)$$

也就是说，我们要求的$q_{i}$，就是$Q$的系数，而$Q$是$A^{n}$对$G$取模的结果。

这一过程可以通过快速幂实现，只是取模从整数取模变成了多项式取模。时间复杂度$O(k\log k\log n)$。

于是我们考虑如何构造$G$的系数$g_{i}$。

通过查阅题解(??)，我们得知

$$g_{i}=\begin{cases}
&-f_{k-i}\;\;\;\;\;\;\;\;&(i\lt k)\\
&1&(i=k)
\end{cases}$$

~~证明？不会，告辞。~~

总结一下就是：

1. 构造多项式$G$。
2. 计算多项式$Q=A^{n}\operatorname{mod} G$。
3. 计算$a_{n}=\sum_{i=0}^{k-1}q_{i}a_{i}$。

> Updated on 2019-08-04
>
> ![](/images/TIM截图20190804192526.png)
>
> 告辞.jpg