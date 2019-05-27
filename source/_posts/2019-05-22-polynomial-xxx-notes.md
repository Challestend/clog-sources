---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-05-22 16:36:15
title: 不会起标题（理直气壮）
tags:
  - NTT
categories:
  - 瞎扯
password:
---
从APIO回来发现luogu多了几道NTT的板子题，于是来写一下。

关于游记……可能不会发了。

<!-- more -->

### [普通多项式转下降幂多项式](https://www.luogu.org/problemnew/show/P5383)

$$x^{n}=\sum_{i=0}^{n}S(n,i)x^{\underline{i}}$$

$$\begin{aligned}
\sum_{i=0}^{n-1}f_{i}x^{i}&=\sum_{i=0}^{n-1}f_{i}\sum_{j=0}^{i}S(i,j)x^{\underline{j}}\\
&=\sum_{j=0}^{n-1}\sum_{i=0}^{n-1}S(i,j)f_{i}x^{\underline{j}}\\
&=\sum_{j=0}^{n-1}\sum_{i=0}^{n-1}\cfrac{1}{j!}\sum_{k=0}^{j}(-1)^{k}C(j,k)(j-k)^{i}f_{i}x^{\underline{j}}\\
&=\sum_{j=0}^{n-1}\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!}\cfrac{1}{(j-k)!}\sum_{i=0}^{n-1}(j-k)^{i}f_{i}x^{\underline{j}}\\
&=\sum_{j=0}^{n-1}\sum_{k=0}^{j}\cfrac{(-1)^{k}}{k!}\cfrac{F(j-k)}{(j-k)!}x^{\underline{j}}\\
&=\sum_{j=0}^{n-1}g_{j}x^{\underline{j}}
\end{aligned}$$

所以

$$g_{i}=\sum_{j=0}^{i}\cfrac{(-1)^{j}}{j!}\cfrac{F(i-j)}{(i-j)!}$$

其中求$F(i-j)$需要多点求值。然而我不会。

告辞。

### [下降幂多项式转普通多项式](https://www.luogu.org/problemnew/show/P5393)

$$x^{\underline{n}}=\sum_{i=0}^{n}(-1)^{n-i}s(n,i)x^{i}$$

$$\begin{aligned}
\sum_{i=0}^{n-1}f_{i}x^{\underline{i}}&=\sum_{i=0}^{n-1}f_{i}\sum_{j=0}^{i}(-1)^{i-j}s(i,j)x^{j}\\
&=\sum_{j=0}^{n-1}\sum_{i=0}^{n-1}(-1)^{i-j}s(i,j)f_{i}x^{j}
\end{aligned}$$

……告辞。

### [下降幂多项式乘法](https://www.luogu.org/problemnew/show/P5394)

根据提示，一个下降幂多项式可以唯一确定一个次数相同的普通多项式，我们只需要转过去乘起来再转回来就好了！

……大概吧。

### [第二类斯特林数·行](https://www.luogu.org/problemnew/show/P5395)

紫题警告。不过的确简单。第二类斯特林数的通项公式推一推就能推成卷积形式。

### [第二类斯特林数·列](https://www.luogu.org/problemnew/show/P5396)

~~不会。抄的题解。~~

定义

$$S_{m}(x)=\sum_{i=0}^{+\infty}S(i,m)x^{i}$$

利用第二类斯特林数的递推公式

$$S(n,m)=S(n-1,m-1)+mS(n-1,m)$$

我们有

$$\begin{aligned}
S_{m}(x)&=\sum_{i=0}^{+\infty}S(i,m)x^{i}\\
&=\sum_{i=0}^{+\infty}(S(i-1,m-1)+mS(i-1,m))x^{i}\\
&=S_{m-1}(x)x+mS_{m}(x)x\\
&=\cfrac{S_{m-1}(x)x}{1-mx}\\
&=\cfrac{x^{m}}{\prod_{i=1}^{m}(1-ix)}
\end{aligned}$$

关于类似$\prod(1-ix)$这种的怎么计算……我怎么觉得我提过好几遍了呢（

### [第一类斯特林数·行](https://www.luogu.org/problemnew/show/P5408)

思路与「第二类斯特林数·列」类似。

$$s(n,m)=s(n-1,m-1)+(n-1)s(n-1,m)$$

$$\begin{aligned}
s_{n}(x)&=\sum_{i=0}^{+\infty}s(n,i)x^{i}\\
&=\sum_{i=0}^{+\infty}(s(n-1,i-1)+(n-1)s(n-1,i))x^{i}\\
&=(n-1+x)s_{n-1}(x)\\
&=\prod_{i=0}^{n-1}(i+x)
\end{aligned}$$

### [第一类斯特林数·列](https://www.luogu.org/problemnew/show/P5408)

我们发现「第二类斯特林数·列」和「第一类斯特林数·行」的思路行不通了。

~~题解，打开。~~

我们来观察一下这个式子

$$(1+x)^{t}$$

~~似乎并没有什么用。~~

$$\begin{aligned}
(1+x)^{t}&=\sum_{i=0}^{t}C(t,i)x^{i}\\
&=\sum_{i=0}^{+\infty}C(t,i)x^{i}\\
&=\sum_{i=0}^{+\infty}\cfrac{t^{\underline{i}}}{i!}x^{i}\\
&=\sum_{i=0}^{+\infty}\cfrac{1}{i!}\sum_{j=0}^{i}(-1)^{i-j}s(i,j)t^{j}x^{i}\\
&=\sum_{j=0}^{+\infty}\sum_{i=j}^{+\infty}\cfrac{1}{i!}(-1)^{i-j}s(i,j)x^{i}t^{j}\\
(1+x)^{t}&=e^{t\ln(1+x)}\\
&=\sum_{i=0}^{+\infty}\cfrac{(1+x)^{i}}{i!}t^{i}\\
&=\sum_{i=0}^{+\infty}\cfrac{1}{i!}\sum_{j=0}^{i}C(i,j)x^{j}t^{i}
\end{aligned}$$

根据上面两个不同的整理过程，我们有

$$\sum_{i=0}^{+\infty}\sum_{j=i}^{+\infty}\cfrac{1}{j!}(-1)^{j-i}s(j,i)x^{j}t^{i}=\sum_{i=0}^{+\infty}\cfrac{1}{i!}\sum_{j=0}^{i}C(i,j)x^{j}t^{i}$$

进一步地

$$\sum_{j=i}^{+\infty}\cfrac{1}{j!}(-1)^{j-i}s(j,i)x^{j}=\cfrac{1}{i!}\sum_{j=0}^{i}C(i,j)x^{j}$$
