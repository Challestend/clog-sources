---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-03-15 11:34:27
title: 生成函数学习笔记
tags:
  - 生成函数
categories:
  - 学习笔记
password:
---
又被wzx吊打了QAQ

来写一篇生成函数吧QAQ

~~本文全部内容抄袭自[这篇blog](https://www.cnblogs.com/asuldb/p/10533453.html)和[这篇blog](https://www.cnblogs.com/asuldb/p/10534860.html)~~

<!-- more -->

### 定义

一个数列$\{a_{0},a_{1},\cdots,a_{n}\}$的生成函数$f(x)$被定义为

$$f(x)=\sum_{i=0}^{n}a_{i}x^{i}$$

就这样（

### 封闭表达式

但是这个形式比较玄乎，不便于我们推式子。特别是当我们需要求一个无穷数列的生成函数时。于是我们希望能够进一步化简。

比如说，当$a_{n}=c^{n}$，即这个数列是$\{1,c,c^{2},\cdots\}$时，它的生成函数是

$$f(x)=\sum_{i=0}^{n}c^{i}x^{i}=\cfrac{1-(cx)^{n+1}}{1-cx}$$

就是一个简单地等比数列求和。很明显，当$x\in(-1,1)$时，如果$n$趋向于正无穷大，则上式等于$\cfrac{1}{1-cx}$。

我们现在来分析一下斐波那契数列的生成函数。

$$\begin{aligned}
F(x)&=\sum_{i=0}^{n}F_{i}x^{i}\\
&=\sum_{i=0}^{n}(F_{i-1}+F_{i-2})x^{i}
\end{aligned}$$

为了方便，我们定义当$n\lt 0$时，$F_{n}=0$。

然后我们发现$F_{1}=F_{0}+F_{-1}=0+0=0$，于是我们再加上一项$[i=1]$。

$$\begin{aligned}
F(x)&=\sum_{i=0}^{n}(F_{i-1}+F_{i-2}+[i=1])x^{i}\\
&=x+\sum_{i=0}^{n}(F_{i-1}+F_{i-2})x^{i}\\
&=x+x\sum_{i=0}^{n}F_{i-1}x^{i-1}+x^{2}\sum_{i=0}^{n}F_{i-2}x^{i-2}\\
&=x+xF(x)+x^{2}F(x)
\end{aligned}$$

于是

$$F(x)=\cfrac{x}{1-x-x^{2}}$$

### 通项公式

#### 斐波那契数

那么问题来了，我们闲着没事求这个生成函数有什么用啊。

求通项公式。

我们知道形如$a_{n}=c^{n}$的数列的生成函数等于$\cfrac{1}{1-cx}$，我们可以试着将$\cfrac{x}{1-x-x^{2}}$分解成两个类似形式的分式的和。

设

$$1-x-x^{2}=(1-ax)(1-bx)$$

$$\begin{cases}
&a+b=1\\
&ab=-1
\end{cases}
\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;
\begin{cases}
&a=\cfrac{1+\sqrt{5}}{2}\\
&b=\cfrac{1-\sqrt{5}}{2}
\end{cases}$$

再设

$$\cfrac{c}{1-\cfrac{1+\sqrt{5}}{2}x}+\cfrac{d}{1-\cfrac{1-\sqrt{5}}{2}x}=\cfrac{x}{(1-\cfrac{1+\sqrt{5}}{2}x)(1-\cfrac{1-\sqrt{5}}{2}x)}$$

$$\cfrac{c}{1-\cfrac{1+\sqrt{5}}{2}x}+\cfrac{d}{1-\cfrac{1-\sqrt{5}}{2}x}=\cfrac{c-\cfrac{1-\sqrt{5}}{2}cx+d-\cfrac{1+\sqrt{5}}{2}dx}{(1-\cfrac{1+\sqrt{5}}{2}x)(1-\cfrac{1-\sqrt{5}}{2}x)}$$

于是

$$c-\cfrac{1-\sqrt{5}}{2}cx+d-\cfrac{1+\sqrt{5}}{2}dx=x$$

等式右边没有常数项，因此$c+d$应当是$0$。再继续接下去，我们得到

$$
\begin{cases}
&c=\cfrac{1}{\sqrt{5}}\\
&d=-\cfrac{1}{\sqrt{5}}
\end{cases}$$

于是

$$\begin{aligned}
F(x)&=\cfrac{1}{\sqrt{5}}\cfrac{1}{1-\cfrac{1+\sqrt{5}}{2}x}-\cfrac{1}{\sqrt{5}}\cfrac{1}{1-\cfrac{1-\sqrt{5}}{2}x}\\
&=\sum_{i=0}^{n}\cfrac{1}{\sqrt{5}}\left(\cfrac{1+\sqrt{5}}{2}\right)^{i}x^{i}-\sum_{i=0}^{n}\cfrac{1}{\sqrt{5}}\left(\cfrac{1-\sqrt{5}}{2}\right)^{i}x^{i}\\
&=\sum_{i=0}^{n}\cfrac{1}{\sqrt{5}}\left(\left(\cfrac{1+\sqrt{5}}{2}\right)^{i}-\left(\cfrac{1-\sqrt{5}}{2}\right)^{i}\right)x^{i}
\end{aligned}$$

结论就是

$$F_{n}=\cfrac{1}{\sqrt{5}}\left(\left(\cfrac{1+\sqrt{5}}{2}\right)^{n}-\left(\cfrac{1-\sqrt{5}}{2}\right)^{n}\right)$$

#### 卡特兰数

$$\begin{aligned}
F(x)&=\sum_{i=0}^{n}C_{i}x^{i}\\
&=\sum_{i=0}^{n}\left(\sum_{j=0}^{i-1}C_{j}C_{i-j-1}+[i=0]\right)x^{i}\\
&=1+\sum_{i=0}^{n}\left(\sum_{j=0}^{i-1}C_{j}C_{i-j-1}\right)x^{i}\\
&=1+x\sum_{i=0}^{n}\left(\sum_{j=0}^{i-1}C_{j}C_{i-j-1}\right)x^{i-1}\\
&=1+xF^{2}(x)
\end{aligned}$$

于是

$$xF^{2}(x)-F(x)+1=0$$

$$F(x)=\cfrac{1\pm\sqrt{1-4x}}{2x}$$

$$2xF(x)=1\pm\sqrt{1-4x}$$

当$x=0$时

$$2\times 0\times 1=1\pm1$$

因此根号前应该取负。至此我们得到

$$F(x)=\cfrac{1-\sqrt{1-4x}}{2x}$$

那么通项公式呢？

根据~~一个我抄过来的~~广义二项式定理，我们有

$$\begin{aligned}
\sqrt{1-4x}&=1+\sum_{i=1}^{n}\cfrac{(-1)^{i-1}}{i2^{2i-1}}C_{2i-2}^{i-1}(-4x)^{i}\\
&=1+2\sum_{i=1}^{n}\cfrac{(-1)^{2i-1}}{i}C_{2i-2}^{i-1}x^{i}\\
&=1-2\sum_{i=1}^{n}\cfrac{1}{i}C_{2i-2}^{i-1}x^{i}
\end{aligned}$$

$$\begin{aligned}
F(x)&=\cfrac{1-\sqrt{1-4x}}{2x}\\
&=\sum_{i=1}^{n}\cfrac{1}{i}C_{2i-2}^{i-1}x^{i-1}\\
&=\sum_{i=0}^{n}\cfrac{1}{i+1}C_{2i}^{i}x^{i}
\end{aligned}$$

于是

$$C_{n}=\cfrac{1}{n+1}C_{2n}^{n}$$

#### 默慈金数

~~等会默慈金数是个什么鬼？（~~

默慈金数一般记为$M_{n}$，被定义为在均匀分布在一个圆上的$n$个有编号的点之间连出彼此不相交的弦的方案数。一根弦也不连也是一种方案。

$$M_{0}=1$$

$$M_{n}=M_{n-1}+\sum_{i=0}^{n-2}M_{i}M_{n-i-2}$$

$$\begin{aligned}
F(x)&=\sum_{i=0}^{n}M_{i}x^{i}\\
&=\sum_{i=0}^{n}\left(M_{i-1}+\sum_{j=0}^{i-2}M_{j}M_{i-j-2}+[i=0]\right)x^{i}\\
&=1+\sum_{i=0}^{n}\left(M_{i-1}+\sum_{j=0}^{i-2}M_{j}M_{i-j-2}\right)x^{i}\\
&=1+xF(x)+x^{2}F^{2}(x)
\end{aligned}$$

于是

$$x^{2}F^{2}(x)+(x-1)F(x)+1=0$$

$$F(x)=\cfrac{1-x\pm\sqrt{1-2x-3x^{2}}}{2x^{2}}$$

总之根号前应该取负（

$$\begin{aligned}
F(x)&=\cfrac{1-x-\sqrt{1-2x-3x^{2}}}{2x^{2}}\\
&=\cfrac{2-2x-2\sqrt{1-2x-3x^{2}}}{4x^{2}}\\
&=\cfrac{(1+x)-2\sqrt{(1+x)(1-3x)}+(1-3x)}{4x^{2}}\\
&=\cfrac{(\sqrt{1+x}-\sqrt{1-3x})^{2}}{4x^{2}}
\end{aligned}$$

woc这什么鬼东西溜了溜了。

~~留作课后习题，哪位dalao推出来了让我%一%（~~

### 例题

#### [「TJOI2015」概率论](https://www.luogu.org/problemnew/show/P3978)

首先很明显，互不同构的二叉树一共$C_{n}$棵，其中$C_{n}$是卡特兰数。现在我们希望求出这些二叉树的叶子结点总数，我们记为$F_{n}$。不难发现

$$F_{0}=0$$

$$F_{1}=1$$

$$F_{n}=2\sum_{i=0}^{n-1}C_{i}F_{n-i-1}+[i=1]$$

$$\begin{aligned}
F(x)&=\sum_{i=0}^{n}F_{i}x^{i}\\
&=\sum_{i=0}^{n}\left(2\sum_{j=0}^{i-1}C_{j}F_{i-j-1}+[i=1]\right)x^{i}\\
&=x+2\sum_{i=0}^{n}\left(\sum_{j=0}^{i-1}C_{j}F_{i-j-1}\right)x^{i}\\
&=x+2xCF(x)
\end{aligned}$$

于是

$$F(x)=\cfrac{x}{1-2xC(x)}$$

其中$C(x)$是卡特兰数的生成函数，我们知道它的值是$\cfrac{1-\sqrt{1-4x}}{2x}$，所以说

$$F(x)=\cfrac{x}{\sqrt{1-4x}}$$

~~然后我又不会了（~~

$$(xC(x))^{\prime}=\cfrac{1}{\sqrt{1-4x}}=\cfrac{F(x)}{x}$$

$$(xC(x))^{\prime}=\sum_{i=0}^{n}(i+1)C_{i}x^{i}$$

$$\cfrac{F(x)}{x}=\sum_{i=0}^{n}F_{i}x^{i-1}=\sum_{i=-1}^{n}F_{i+1}x^{i}$$

我们就得到

$$iC_{i-1}=F_{i}$$

于是

$$\begin{aligned}
\text{Ans}&=\cfrac{F_{n}}{C_{n}}\\
&=\cfrac{nC_{n-1}}{C_{n}}\\
&=\cfrac{C_{2n-2}^{n-1}}{\cfrac{1}{n+1}C_{2n}^{n}}\\
&=\cfrac{\cfrac{(2n-2)!}{(n-1)!(n-1)!}}{\cfrac{(2n)!}{n!(n+1)!}}\\
&=\cfrac{(2n-2)!n!(n+1)!}{(n-1)!(n-1)!(2n)!}\\
&=\cfrac{n(n+1)}{2(2n-1)}
\end{aligned}$$

#### [「国家集训队」整数的lqp拆分](https://www.luogu.org/problemnew/show/P4451)

其实这道题我几个月前推出来了一个$O(n^{2})$的式子（

如果记答案为$G_{n}$，我们有

$$G_{n}=\sum_{i=0}^{n}F_{i}G_{n-i}$$

其中$F_{n}$是斐波那契数。为了方便，我们强行定义$G_{0}=1$。

$$\begin{aligned}
G(x)&=\sum_{i=0}^{n}G_{i}x^{i}\\
&=\sum_{i=0}^{n}\left(\sum_{j=0}^{i}F_{j}G_{i-j}+[i=0]\right)x^{i}\\
&=1+\sum_{i=0}^{n}\left(\sum_{j=0}^{i}F_{j}G_{i-j}\right)x^{i}\\
&=1+FG(x)
\end{aligned}$$

其中$F(x)$是斐波那契数的生成函数。于是

$$G(x)=\cfrac{1}{1-F(x)}=\cfrac{1-x-x^{2}}{1-2x-x^{2}}=1+\cfrac{x}{1-2x-x^{2}}$$

多出来的那个$1$是$G_{0}$，可以无视掉。

设

$$(1-ax)(1-bx)=1-2x-x^{2}$$

（中间过程略）

$$\begin{cases}
&a=1+\sqrt{2}\\
&b=1-\sqrt{2}
\end{cases}$$

再设

$$\cfrac{c}{1-(1+\sqrt{2})x}+\cfrac{d}{1-(1-\sqrt{2})x}=\cfrac{x}{1-2x-x^{2}}$$

（中间过程略$\times 2$）

$$\begin{cases}
&c=\cfrac{1}{2\sqrt{2}}\\
&d=-\cfrac{1}{2\sqrt{2}}
\end{cases}$$

于是

$$\begin{aligned}
G(x)&=1+\cfrac{1}{2\sqrt{2}}\cfrac{1}{1-(1+\sqrt{2})x}-\cfrac{1}{2\sqrt{2}}\cfrac{1}{1-(1-\sqrt{2})x}\\
&=1+\sum_{i=0}^{n}\cfrac{1}{2\sqrt{2}}\left((1+\sqrt{2})^{i}-(1-\sqrt{2})^{i}\right)x^{i}
\end{aligned}$$

最终结论就是

$$G_{n}=\cfrac{(1+\sqrt{2})^{n}-(1-\sqrt{2})^{n}}{2\sqrt{2}}$$

根据暴力枚举，我们得出$\sqrt{2}\equiv 59713600\pmod{10^{9}+7}$。
