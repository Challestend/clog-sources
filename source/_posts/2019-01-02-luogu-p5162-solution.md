---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-02 16:43:53
title: 「Luogu-P5162」WD与积木
tags:
  - NTT
categories:
  - 题解
password:
---
9102年的第一篇blog。

[传送门](https://www.luogu.org/problemnew/show/P5162)

<!-- more -->

大概算是我用NTT切的第一道非模板题。

其实本来应该是[这道](http://codeforces.com/contest/438/problem/E)。不过调不出来了弃了。

首先我们会有一种想法是将方案数和每种方案的层数和分别求出来，然后一除就可以了。我们令$F[i]$表示$i$块积木所有堆放方案的层数和，$G[i]$表示$i$块积木的堆放方案数。

首先考虑如何求方案数。我们可以枚举第一层放了哪些积木。于是我们大胆地写出这样一个$n^{2}$的方程：

$$G[n]=\sum\limits_{i=0}^{n}C_{n}^{i}G[n-i]$$

但是这样对吗？

代入$n=0$我们发现

$$G[0]=C_{0}^{0}G[0]=G[0]$$

![](https://i.loli.net/2019/01/02/5c2c7c9a52fe9.jpg)

注意到，这主要是因为$C_{n}^{0}=1$导致的，因此我们强行将它定义成$0$就好了。

那然后$G[0]$应该等于几？

$$G[1]=C_{1}^{0}G[1]+C_{1}^{1}G[0]=G[0]=1$$

所以说$G[0]=1$。

如果说您再往下算几项，您就会发现令$G[0]=1$是一个正确的选择。

再然后，我们看到这个式子像极了卷积。我们先来把组合数拆开

$$G[n]=n!\sum\limits_{i=0}^{n}\cfrac{1}{i!}\times\cfrac{G[n-i]}{(n-i)!}$$

定义

$$H[n]=\begin{cases}
&0&(n=0)\\
&\cfrac{1}{n!}\;\;&(n>1)
\end{cases}$$

$$G[n]=n!\sum\limits_{i=0}^{n}H[i]\times\cfrac{G[n-i]}{(n-i)!}$$

注意到我们在运算时先除以了$n-i$的阶乘，累加完之后又乘了一个$n$的逆元。这就启示我们，如果我们定义

$$G^{\prime}[n]=\cfrac{G[n]}{n!}$$

就可以得到

$$\begin{aligned}
G^{\prime}[n]&=\sum\limits_{i=0}^{n}H[i]\times G^{\prime}[n-i]\\
G^{\prime}&=G^{\prime}H+1
\end{aligned}$$

注意不要忘了$+1$。因为很明显地$G^{\prime}H[0]=0$，而$G^{\prime}[0]=1$。

然后我们就有

$$G^{\prime}=\cfrac{1}{1-H}$$

然后接下来我们并不需要还原出$G$。直接考虑$F$，也就是层数和。

首先还是枚举第一层放了哪些积木。不过需要注意的是，因为我们把第一层单独考虑了，因此每有一种堆放方案，我们就要再多算上一层。因此

$$F[n]=G[n]+\sum\limits_{i=0}^{n}C_{n}^{i}F[n-i]$$

然后我们拆开组合数，引入上面的$H$数组，并令$F[0]=0$。至于为什么，留作习题自证（

$$
\begin{aligned}
F[n]&=G[n]+n!\sum\limits_{i=0}^{n}H[i]\times\cfrac{F[n-i]}{(n-i)!}\\
&=n!\sum\limits_{i=0}^{n}H[i]\times\cfrac{F[n-i]+G[n-i]}{(n-i)!}\\
F^{\prime}[n]&=\cfrac{F[n]}{n!}\\
&=\sum\limits_{i=0}^{n}H[i]\times(F^{\prime}[n-i]+G^{\prime}[n-i])\\
F^{\prime}&=H(F^{\prime}+G^{\prime})
\end{aligned}$$

不过这次我们就不需要$+1$了。

解上面的方程，我们得到

$$F^{\prime}=\cfrac{HG^{\prime}}{1-H}=\cfrac{G^{\prime}}{(1-H)^{2}}$$

然后我们总结一下

$$H[n]=\begin{cases}
&0&(n=0)\\
&\cfrac{1}{n!}\;\;&(n>1)
\end{cases}$$

$$G^{\prime}=\cfrac{1}{1-H}$$

$$F^{\prime}=\cfrac{G^{\prime}}{(1-H)^{2}}$$

最后的答案，也就是$n$块积木的期望层数，就是$\cfrac{F[n]}{G[n]}$。然后不难发现$\cfrac{F^{\prime}[n]}{G^{\prime}[n]}=\cfrac{F[n]}{G[n]}$。

我就是不贴代码（

~~反正会的应该都能写出来了吧（~~
