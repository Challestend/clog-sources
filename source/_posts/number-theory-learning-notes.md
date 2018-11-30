---
title: 一些乱七八糟的数论
date: 2018-11-29 14:41:17
tags: [数论,杜教筛]
categories: [学习笔记]
mathjax: true
---
最近在洛谷日报的待审核列表里翻到了杜教筛的相关内容，打算连着之前的卷积反演啥的一起复习一下。

~~抄袭来源~~参考文献：

- [铃悬的数学小讲堂——狄利克雷卷积与莫比乌斯反演](https://lx-2003.blog.luogu.org/mobius-inversion)
- [浅谈杜教筛](https://www.luogu.org/blog/54745/dls-tql)

<!-- more -->

# 数论函数

## 定义与相关性质

数论函数就是定义域为$\mathbb{N}^{+}$的函数。

两个数论函数相加，就是简单地把函数值相加。

$$(f+g)(n)=f(n)+g(n)$$

数乘也是类似的。

$$(\alpha f)(n)=\alpha f(n)$$

~~好像没啥用。~~

在数论函数相关的运算中，一个非常重要的运算是狄利克雷卷积。两个数论函数的狄利克雷卷积是这样定义的：

$$(f\times g)(n)=\sum\limits_{i\mid n}f(i)g(\cfrac{n}{i})$$

或者说：

$$(f\times g)(n)=\sum\limits_{ij=n}f(i)g(j)$$

它具有以下的一些性质：

交换律，即$f\times g=g\times f$。

这很明显。

结合律，即$(f\times g)\times h=f\times(g\times h)$。

$$\begin{aligned}
((f\times g)\times h)(n)&=\sum\limits_{ij=n}(\sum\limits_{kl=i}f(k)g(l))h(j)\\
&=\sum\limits_{ijk=n}f(i)g(j)h(k)
\end{aligned}$$

$$\begin{aligned}
(f\times(g\times h))(n)&=\sum\limits_{ij=n}f(i)(\sum\limits_{kl=j}g(k)h(l))\\
&=\sum\limits_{ijk=n}f(i)g(j)h(k)
\end{aligned}$$

分配率，即$(f+g)\times h=f\times h+g\times h$。

$$\begin{aligned}
((f+g)\times h)(n)&=\sum\limits_{ij=n}(f+g)(i)h(j)\\
&=\sum\limits_{ij=n}f(i)h(j)+g(i)h(j)\\
&=(f\times h)(n)+(g\times h)(n)
\end{aligned}$$

单位元为$\epsilon(n)=[n=1]$，$f\times\epsilon =f$。

这也很明显。

对于任意一个满足$f(1)\neq 0$的函数$f$，都存在唯一的一个函数$g$使得$f\times g=\epsilon$。这时我们称$g$是$f$的逆。

我们可以这样定义一个函数的逆：

$$g(n)=\cfrac{\epsilon(n)-\sum\limits_{i\mid n,i\neq 1}f(i)g(\cfrac{n}{i})}{f(1)}$$

这样我们就有

$$\begin{aligned}
(f\times g)(n)&=\sum_{i\mid n}f(i)g(\cfrac{n}{i})\\
&=f(1)g(n)+\sum_{i\mid n,i\neq 1}f(i)g(\cfrac{n}{i})\\
&=\epsilon(n)-\sum\limits_{i\mid n,i\neq 1}f(i)g(\cfrac{n}{i})+\sum_{i\mid n,i\neq 1}f(i)g(\cfrac{n}{i})\\
&=\epsilon(n)
\end{aligned}$$

## 积性函数与完全积性函数

如果一个数论函数$f$满足

$$\forall x,y\in\mathbb{N}^{+}\wedge x\perp y\;\;f(xy)=f(x)f(y)$$

我们就说$f$是一个积性函数。

特别的，如果上式去掉$x\perp y$仍成立，则称$f$是一个完全积性函数。

很明显地，任意一个积性函数$f$一定有$f(1)=1$，这样才能有$f(1\times n)=f(1)\times f(n)=f(n)$。

常见的完全积性函数有$\epsilon,id^{k}$。$\epsilon$在上文已经提到过。$id^{k}(n)=n^k$。这两个函数的完全积性十分明显。

常见的积性函数有$\varphi,d,\sigma$。$\varphi(n)$的值等于小于等于$n$且与$n$互质的正整数的数量。$d(n)$和$\sigma(n)$的值分别等于$n$的约数个数和约数和。

关于$\varphi$的积性，我并不会证（

我们来分析$d$的积性。首先，根据唯一分解定理，$n$的每个因数都可以唯一地分解成$n$所有质因子的非负整数次幂乘积。不妨设

$$n=\prod\limits_{i=1}^{N}p_{i}^{r_{i}}$$

其中$p_{i}$都是质数，所有$r_{i}$都是正整数。对于每一个$p_{i}$，它的指数有$(r_{i}+1)$种取值，因而我们有

$$d(n)=\prod\limits_{i=1}^{N}(r_{i}+1)$$

我们再假设有一个$m$，且

$$m=\prod\limits_{i=1}^{M}q_{i}^{s_{i}}$$

如果说$n\perp m$，肯定有

$$\forall i\in [1,N]\cap\mathbb{Z},j\in [1,M]\cap\mathbb{Z}\;\;p_{i}\neq q_{j}$$

于是我们就有

$$nm=(\prod\limits_{i=1}^{N}p_{i}^{r_{i}})(\prod\limits_{j=1}^{M}q_{j}^{s_{j}})$$

$$\begin{aligned}
d(nm)&=(\prod\limits_{i=1}^{N}(r_{i}+1))(\prod\limits_{j=1}^{M}(s_{j}+1))\\
&=d(n)d(m)
\end{aligned}$$

不妨再反过来考虑。如果说$n\not\perp m$，那么一定存在一对$(i,j)(i\in [1,N]\cap\mathbb{Z},j\in [1,M]\cap\mathbb{Z})$，使得$p_{i}=q_{j}$。那么$d(n)d(m)$就会有一个因子是$(r_{i}+1)(s_{j}+1)=r_{i}s_{j}+r_{i}+s_{j}+1$。但是仔细思考我们会发现，$d(nm)$中对应的项应该是$r_{i}+s_{j}+1$。因而此时$d(nm)\neq d(n)d(m)$。

我们再来分析$\sigma$的积性。还是设

$$n=\prod\limits_{i=1}^{N}p_{i}^{r_{i}}$$

其中$p_{i}$都是质数，所有$r_{i}$都是正整数。与$d$不同的是，现在我们是要用$p_{i}$乘出$n$的因数，$p_{i}$在此过程中可以产生的贡献为$p_{i}^x(x\in [0,r_{i}]\cap\mathbb{Z})$。我们可以把这想象成一个$N$个数组，第$i$个数组的长度为$r_{i}+1$，第$j$个元素为$p_{i}^{j-1}$。现在我们每次从每个数组里选出恰好一个元素相乘，要求所有方案的乘积之和。我们知道，这个问题的答案就是

$$\prod\limits_{i=1}^{N}\sum\limits_{j=0}^{r_{i}}p_{i}^{j}$$

这正是$\sigma(n)$的值。

接下来的过程就与上文证明$d$的积性如出一辙了，在此不再重复。

现在我们来分析，两个积性函数的卷积是否也是积性函数。~~虽然说都这么问了肯定就是了。~~

$$\begin{aligned}
(f\times g)(n)(f\times g)(m)&=(\sum\limits_{i\mid n}f(i)g(\cfrac{n}{i}))(\sum\limits_{j\mid m}f(j)g(\cfrac{m}{j}))\\
&=\sum\limits_{i\mid n}\sum\limits_{j\mid m}f(i)g(\cfrac{n}{i})f(j)g(\cfrac{m}{j})\\
&=\sum\limits_{i\mid n}\sum\limits_{j\mid m}f(ij)g(\cfrac{nm}{ij})\\
&=\sum\limits_{k\mid nm}f(k)g(\cfrac{nm}{k})\\
&=(f\times g)(nm)
\end{aligned}$$

关于上面的第四个等号。时刻注意$n\perp m$，在这种前提下，我们枚举到的$i$和$j$一定也是互质的，那么$ij$的所有值一定是互不相同的。这从$d(nm)=d(n)d(m)$这一等式中也能看出。

再接下来，我们来分析一下一个积性函数的逆是否也是积性函数。

设有一个积性函数$f$，它的逆是$g$。

当$nm=1$时，$g(1)=1$。

当$nm>1$时，我们假设对于任意$n^{\prime}m^{\prime}<nm$，都有$g(n^{\prime}m^{\prime})=g(n^{\prime})g(m^{\prime})$。此时

$$\begin{aligned}
g(nm)&=-\sum\limits_{k\mid nm,k\neq 1}f(k)g(\cfrac{nm}{k})\\
&=-\sum\limits_{i\mid n,j\mid m,ij\neq 1}f(i)f(j)g(\cfrac{n}{i})g(\cfrac{m}{j})\\
&=g(n)g(m)-\sum\limits_{i\mid n,j\mid m}f(i)f(j)g(\cfrac{n}{i})g(\cfrac{m}{j})\\
&=g(n)g(m)-(\sum\limits_{i\mid n}f(i)g(\cfrac{n}{i}))(\sum\limits_{j\mid m}f(j)g(\cfrac{m}{j}))\\
&=g(n)g(m)-\epsilon(n)\epsilon(m)\\
&=g(n)g(m)
\end{aligned}$$

~~其实上面这些全都是抄来的（~~

# 莫比乌斯反演

## 正向反演

定义$\mu$为$1$的逆。也就是说，$\mu\times 1=\epsilon$。

如果您看过其他的一些关于莫比乌斯反演的学习笔记的话，您可能会看到如下的定义：

> 首先地，$\mu(1)=1$。当$n>1$时，如果$n$的所有质因子互不相同，设其有$k$个质因子，那么$\mu(n)=(-1)^{k}$。否则，$\mu(n)=0$。

那么，这两种定义等价吗？

考虑到$\mu$是一个积性函数，对于任意一个$n>1$，如果我们把它分解成

$$n=\prod\limits_{i=1}^{N}p_{i}^{r_{i}}$$

我们就有

$$\mu(n)=\prod\limits_{i=1}^{N}\mu(p_{i}^{r_{i}})$$

因此，确定一个积性函数的函数值的关键在于确定其在质数的非负整数次幂上的取值。

设有一个质数$p$。不难发现

$$\mu(p)=-\mu(1)=-1$$

$$\mu(p^{2})=-\mu(1)-\mu(p)=-1+1=0$$

$$\mu(p^{3})=-\mu(1)-\mu(p)-\mu(p^{2})=-1+1+0=0$$

$$\vdots$$

至此，不难看出上文给出的两种定义是等价的。

那么这个东西有什么用呢？

我们设

$$F(n)=\sum\limits_{i\mid n}f(i)$$

或者等价地说，$F=f\times 1$。我们可以得到

$$\begin{aligned}
F&=f\times 1\\
F\times\mu&=f\times 1\times\mu\\
F\times\mu&=f
\end{aligned}$$

像这样，如果说$F$相对好求，而$f$相对难求，我们就可以通过上式来减小我们求解$f$的难度。具体地说

$$f(n)=\sum\limits_{i\mid n}F(i)\mu(\cfrac{n}{i})$$

## 反向反演

有些时候我们还需要用到像下面这样反过来的莫比乌斯反演

$$F(n)=\sum\limits_{n\mid d}f(d)⇔f(n)=\sum\limits_{n\mid d}F(d)\mu(\cfrac{d}{n})$$

我们可以定义一种新的运算

$$(f\otimes g)(n)=\sum\limits_{n\mid d}f(d)g(\cfrac{d}{n})$$

我们不难证明出它具有结合律。具体过程与上文证明狄利克雷卷积的结合律的过程基本重复。那么我们就有

$$F=f\otimes 1⇔F\otimes\mu=f$$

于是就有了上面的反向反演。

## 例题

反正都讲完了反演了，就顺便来道[练习题](https://www.luogu.org/problemnew/show/P2522)吧。

题目大意很简单，就是要求

$$\sum\limits_{i=a}^{b}\sum\limits_{j=c}^{d}[(i,j)=k]$$

容斥一波我们得到

$$\sum\limits_{i=1}^{b}\sum\limits_{j=1}^{d}[(i,j)=k]-\sum\limits_{i=1}^{a-1}\sum\limits_{j=1}^{d}[(i,j)=k]-\sum\limits_{i=1}^{b}\sum\limits_{j=1}^{c-1}[(i,j)=k]+\sum\limits_{i=1}^{a-1}\sum\limits_{j=1}^{c-1}[(i,j)=k]$$

因此我们只需要关注下式的值

$$\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{m}[(i,j)=k]$$

考虑到$(i,j)=k⇔\cfrac{i}{k}\perp\cfrac{j}{k}$，设$N=\lfloor\cfrac{n}{d}\rfloor$，$M=\lfloor\cfrac{m}{d}\rfloor$，我们可以进一步改写上式

$$\sum\limits_{i=1}^{N}\sum\limits_{j=1}^{M}[i\perp j]$$

定义

$$f(d)=\sum\limits_{i=1}^{N}\sum\limits_{j=1}^{M}[(i,j)=d]$$

$$F(d)=\sum\limits_{i=1}^{N}\sum\limits_{j=1}^{M}[d\mid (i,j)]$$

我们知道$$d\mid (i,j)⇔d\mid i\wedge d\mid j$$。在$[1,N]$中共有$\lfloor\cfrac{N}{d}\rfloor$个$d$的倍数，在$[1,M]$中共有$\lfloor\cfrac{M}{d}\rfloor$个$d$的倍数。因此我们得到

$$F(d)=\lfloor\cfrac{N}{d}\rfloor\lfloor\cfrac{M}{d}\rfloor$$

同时，不难发现$F=f\otimes 1$，因此我们得到$f=F\otimes\mu$，即

$$f(d)=\sum\limits_{d\mid x}F(x)\mu(\cfrac{x}{d})$$

$$f(1)=\sum\limits_{i=1}^{min(N,M)}\lfloor\cfrac{N}{i}\rfloor\lfloor\cfrac{M}{i}\rfloor\mu(i)$$

这样一来，先线性筛出$\mu$，结合整除分块即可做到$O(\sqrt{n})$地求解了。

> 累死我了（
> 
> 这已经写了超过$10\text{KB}$了（
> 
> 剩下的先咕了吧（