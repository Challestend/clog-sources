---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-03-31 09:33:49
title: 伯努利数失败笔记
tags:
  - 数论
  - 伯努利数
categories:
  - 学习笔记
password:
---
> 「クールでまばゆいばかりのアルゴリズムを学ばないでください、それはうまく検索することが最も重要です。」
>
> ——loli

~~以上，我失败了（~~

[前半部分的抄袭来源](https://www.luogu.org/blog/ShadowassIIXVIIIIV/guan-yu-bo-nu-li-shuo-zhuai-hua-zi-ran-shuo-mi-hu-gong-shi-di-zheng-mi)。

<!-- more -->

### 定义

伯努利数$B_{n}$具有如下性质：

$$\sum_{i=0}^{n}C_{n+1}^{i}B_{i}=[n=0]$$

### 自然数幂和

我们定义

$$S(n,k)=\sum_{i=0}^{n-1}i^{k}$$

$$T(n,k)=\cfrac{1}{k+1}\sum_{i=0}^{k}C_{k+1}^{i}B_{i}n^{k-i+1}$$

我们希望证明$S(n,k)=T(n,k)$。

在这里，我们采用一种名为「强归纳法」（或者「完全归纳法」）的方法。具体来说，假设我们已经对于任意的$0\leqslant j\lt k$，证明了$S(n,j)=T(n,j)$成立，利用这个结论推出$S(n,k)=T(n,k)$成立。

当$k=0$时

$$S(n,k)=n$$

$$T(n,k)=C_{1}^{0}B_{0}n$$

因为我们有

$$C_{1}^{0}B_{0}=[0=0]=1$$

从而$S(n,k)=T(n,k)$成立。

当$k\gt 0$时

$$S(n,k+1)=\sum_{i=0}^{n-1}i^{k+1}$$

$$\begin{aligned}
S(n,k+1)+n^{k+1}&=\sum_{i=0}^{n-1}(i+1)^{k+1}\\
&=\sum_{i=0}^{n-1}\sum_{j=0}^{k+1}C_{k+1}^{j}i^{j}\\
&=\sum_{j=0}^{k+1}C_{k+1}^{j}\sum_{i=0}^{n-1}i^{j}\\
&=\sum_{j=0}^{k+1}C_{k+1}^{j}S(n,j)\\
&=\sum_{j=0}^{k}C_{k+1}^{j}S(n,j)+C_{k+1}^{k+1}S(n,k+1)
\end{aligned}$$

注意到$C_{k+1}^{k+1}=1$，我们就能得到

$$n^{k+1}=\sum_{j=0}^{k}C_{k+1}^{j}S(n,j)$$

因为我们已经对于任意的$0\leqslant j\lt k$，证明了$S(n,j)=T(n,j)$成立，我们就可以将上式进一步变形

$$\begin{aligned}
n^{k+1}&=\sum_{j=0}^{k}C_{k+1}^{j}S(n,j)\\
&=\sum_{j=0}^{k-1}C_{k+1}^{j}T(n,j)+C_{k+1}^{k}S(n,k)\\
&=\sum_{j=0}^{k-1}C_{k+1}^{j}T(n,j)+C_{k+1}^{k}S(n,k)+C_{k+1}^{k}T(n,k)-C_{k+1}^{k}T(n,k)\\
&=\sum_{j=0}^{k}C_{k+1}^{j}T(n,j)+C_{k+1}^{k}S(n,k)-C_{k+1}^{k}T(n,k)
\end{aligned}$$

接下来，如果我们能够证明

$$n^{k+1}=\sum_{j=0}^{k}C_{k+1}^{j}T(n,j)$$

自然就能得出$S(n,k)=T(n,k)$。

愉快地推式子

$$\begin{aligned}
\sum_{j=0}^{k}C_{k+1}^{j}T(n,j)&=\sum_{j=0}^{k}C_{k+1}^{j}\cfrac{1}{j+1}\sum_{i=0}^{j}C_{j+1}^{i}B_{i}n^{j-i+1}\\
&=\sum_{j=0}^{k}C_{k+1}^{j}\cfrac{1}{j+1}\sum_{i=0}^{j}C_{j+1}^{j-i}B_{j-i}n^{i+1}\\
&=\sum_{j=0}^{k}C_{k+1}^{j}\cfrac{1}{j+1}\sum_{i=0}^{j}C_{j+1}^{i+1}B_{j-i}n^{i+1}\\
&=\sum_{j=0}^{k}C_{k+1}^{j}\cfrac{1}{j+1}\sum_{i=0}^{j}\cfrac{j+1}{i+1}C_{j}^{i}B_{j-i}n^{i+1}\\
&=\sum_{j=0}^{k}C_{k+1}^{j}\sum_{i=0}^{j}\cfrac{1}{i+1}C_{j}^{i}B_{j-i}n^{i+1}\\
&=\sum_{i=0}^{j}\cfrac{1}{i+1}\sum_{j=i}^{k}C_{k+1}^{j}C_{j}^{i}B_{j-i}n^{i+1}\\
&=\sum_{i=0}^{j}\cfrac{1}{i+1}\sum_{j=i}^{k}C_{k+1}^{i}C_{k-i+1}^{j-i}B_{j-i}n^{i+1}\\
&=\sum_{i=0}^{j}\cfrac{1}{i+1}C_{k+1}^{i}n^{i+1}\sum_{j=0}^{k-i}C_{k-i+1}^{j}B_{j}
\end{aligned}$$

上面的第二个等号是将后面的那个$\sum$倒过来（$i\rightarrow j-i$）求和。

~~返回本页面最上端之后，~~我们回想起伯努利数还有个这么个性质

$$\sum_{i=0}^{n}C_{n+1}^{i}B_{i}=[n=0]$$

于是

$$\begin{aligned}
\sum_{j=0}^{k}C_{k+1}^{j}T(n,j)&=\sum_{i=0}^{j}\cfrac{1}{i+1}C_{k+1}^{i}n^{i+1}\sum_{j=0}^{k-i}C_{k-i+1}^{j}B_{j}\\
&=\sum_{i=0}^{j}\cfrac{1}{i+1}C_{k+1}^{i}n^{i+1}[i=k]\\
&=\cfrac{1}{k+1}C_{k+1}^{k}n^{k+1}\\
&=n^{k+1}
\end{aligned}$$

$$\text{QED}$$

### 诶刚才我干了些什么来着

哦我好像是证明了这么一个东西

$$\sum_{i=0}^{n-1}i^{k}=\cfrac{1}{k+1}\sum_{i=0}^{k}C_{k+1}^{i}B_{i}n^{k-i+1}$$

### 如何求伯努利数

~~根据题解，~~我们知道伯努利数的生成函数是

$$\cfrac{x}{e^{x}-1}=\cfrac{x}{\sum\limits_{i=1}^{+\infty}\cfrac{x^{i}}{i!}}=\cfrac{1}{\sum\limits_{i=0}^{+\infty}\cfrac{x^{i}}{(i+1)!}}$$

### 例题

#### [「Luogu-P3711」仓鼠的数学题](https://www.luogu.org/problemnew/show/P3711)

$$\begin{aligned}
\sum_{i=0}^{n}a_{i}\sum_{j=0}^{x}j^{i}&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{i=0}^{n}a_{i}\sum_{j=0}^{x-1}j^{i}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{i=0}^{n}\cfrac{a_{i}}{i+1}\sum_{j=0}^{i}C_{i+1}^{j}B_{j}x^{i-j+1}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{i=0}^{n}\cfrac{a_{i}}{i+1}\sum_{j=0}^{i}C_{i+1}^{i-j}B_{i-j}x^{j+1}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{i=0}^{n}\cfrac{a_{i}}{i+1}\sum_{j=0}^{i}\cfrac{(i+1)!}{(i-j)!(j+1)!}B_{i-j}x^{j+1}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{i=0}^{n}i!a_{i}\sum_{j=0}^{i}\cfrac{1}{(j+1)!}\cfrac{B_{i-j}}{(i-j)!}x^{j+1}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{j=0}^{n}\cfrac{1}{(j+1)!}\sum_{i=j}^{n}i!a_{i}\cfrac{B_{i-j}}{(i-j)!}x^{j+1}
\end{aligned}$$

定义

$$F(x)=\sum_{i=0}^{n}(n-i)!a_{n-i}x^{i}$$

$$B(x)=\sum_{i=0}^{n}\cfrac{B_{i}}{i!}x^{i}$$

那么

$$\begin{aligned}
\sum_{i=0}^{n}a_{i}\sum_{j=0}^{x}j^{i}&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{j=0}^{n}\cfrac{1}{(j+1)!}\sum_{i=j}^{n}i!a_{i}\cfrac{B_{i-j}}{(i-j)!}x^{j+1}\\
&=\sum_{i=0}^{n}a_{i}x^{i}+\sum_{j=0}^{n}\cfrac{FB[n-j]}{(j+1)!}x^{j+1}
\end{aligned}$$
