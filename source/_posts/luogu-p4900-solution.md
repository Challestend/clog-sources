---
title: 「Luogu-P4900」食堂
date: 2018-10-04 12:11:18
tags: [Luogu,数论]
categories: [题解]
mathjax: true
---
[传送门](https://www.luogu.org/problemnew/show/P4900)

<!-- more -->

~~闲着没事写篇题解（~~

简单来说，就是要求

$$\sum\limits_{i=A}^{B}\sum\limits_{j=1}^{i}\lbrace\frac{i}{j}\rbrace\pmod{998244353}$$

其中$\lbrace x\rbrace$表示取$x$的小数部分。

稍加思索，我们不难发现

$$\begin{aligned}
&\sum\limits_{i=A}^{B}\sum\limits_{j=1}^{i}\lbrace\frac{i}{j}\rbrace\\
\equiv&\sum\limits_{i=A}^{B}\sum\limits_{j=1}^{i}i\%j\times j^{-1}\\
\equiv&\sum\limits_{i=1}^{B}\sum\limits_{j=1}^{i}i\%j\times j^{-1}-\sum\limits_{i=1}^{A-1}\sum\limits_{j=1}^{i}i\%j\times j^{-1}
\pmod{998244353}
\end{aligned}$$

因此，我们只需要关注下式的值

$$\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{i}i\%j\times j^{-1}\pmod{998244353}$$

我们可以参考一下[这道题](https://www.luogu.org/problemnew/show/P3708)

在这道题中，我们定义了

$$f(x)=\sum\limits_{i=1}^{n}x\%i$$

首先，如果不考虑$x\%i=0$的情况，我们有

$$x\%i=(x-1)\%i+1$$

$$f(x)=f(x-1)+n$$

如果$x\%i=0$，我们需要从$f(x)$中减去$i$，而所有满足该条件的$i$的和就是$x$的约数和，因此

$$f(x)=f(x-1)+n-\sigma(x)$$

我们可以类似地定义

$$g(x)=\sum\limits_{i=1}^{n}x\%i\times i^{-1}\pmod{998244353}$$

$$h(x)=\sum\limits_{i\mid x}i\times i^{-1}\equiv\sum\limits_{i\mid x}1\equiv d(x)\pmod{998244353}$$

从而我们有

$$g(x)\equiv g(x-1)+\sum\limits_{i=1}^{n}i^{-1}-d(x)\pmod{998244353}$$

然而我们需要的是

$$\sum\limits_{i=1}^{n}ans(i)\pmod{998244353}$$

其中

$$ans(x)=\sum\limits_{i=1}^{x}x\%i\times i^{-1}\pmod{998244353}$$

不难发现当$i<j$时$i\%j=i$，从而

$$\begin{aligned}
&g(x)-ans(x)\\
\equiv&\sum\limits_{i=x+1}^{n}x\%i\times i^{-1}\\
\equiv&\sum\limits_{i=x+1}^{n}x\times i^{-1}
\pmod{998244353}
\end{aligned}$$

最终，我们得到

$$ans(x)\equiv g(x)-x\sum\limits_{i=x+1}^{n}i^{-1}$$

$$\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{i}i\%j\times j^{-1}\equiv\sum\limits_{i=1}^{n}ans(i)\pmod{998244353}$$

把上面这一坨东西预处理出来，我们就可以$O(1)$地处理所有询问了，总时间复杂度$O(n)$，空间复杂度$O(n)$。