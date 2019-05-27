---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-05-24 08:33:29
title: 大概算是个斯特林数总结？
tags:
  - 斯特林数
categories:
  - 瞎扯
password:
---
看到wzx写了个斯特林数总结，于是也想来写一个。

<!-- more -->

### 第二类斯特林数

#### 定义

将$n$个有标号的元素放入$m$个无标号的集合，且不允许空集的方案数。记为${n\brace m}$。

#### 递推式

$${n\brace m}={n-1\brace m-1}+m{n-1\brace m}$$

考虑第$n$个元素单独构成一个集合还是加入之前的某个集合即可。

$${n\brace 0}=1\qquad(n\geqslant 0)$$

$${n\brace n}=0\qquad(n\gt 0)$$

#### 通项公式

$${n\brace m}=\cfrac{1}{m!}\sum_{i=0}^{m}(-1)^{i}{m\choose i}(m-i)^{n}=\sum_{i=0}^{m}\cfrac{(-1)^{i}}{i!}\cfrac{(m-i)^{n}}{(m-i)!}$$

大力容斥即可。

不难发现等式最右边形成了卷积的形式，这使得我们能够在$O(n\log n)$的时间复杂度内计算出${n\brace i}$。

#### 自然数的次幂及幂和

$$m^{n}=\sum_{i=1}^{m}{m\choose i}i!{n\brace i}$$

考虑将$n$个有标号的元素任意地放入$m$个有标号的集合。每个元素都有$m$种选择，因此总方案数为$m^{n}$。

在这一过程中，可能只有部分集合非空。我们枚举这些非空集合的排列，然后将所有元素放入这些集合，并且这次不允许空集。

显然上述两种方法是等价的。

利用上面这个公式，我们还可以计算自然数的幂和。

$$\begin{aligned}
\sum_{i=0}^{n-1}i^{m}&=[m=0]+\sum_{i=1}^{n-1}i^{m}\\
&=[m=0]+\sum_{i=1}^{n-1}\sum_{j=1}^{i}{i\choose j}j!{m\brace j}\\
&=[m=0]+\sum_{j=1}^{n-1}j!{m\brace j}\sum_{i=j}^{n-1}{i\choose j}\\
&=[m=0]+\sum_{j=1}^{n-1}j!{m\brace j}{n\choose j+1}\\
&=[m=0]+\sum_{j=1}^{n-1}{m\brace j}\cfrac{n^{\underline{j+1}}}{j+1}
\end{aligned}$$

关于$\sum_{i=j}^{n-1}{i\choose j}={n\choose j+1}$，我们可以认为，等式左边枚举了一个最左侧的位置，然后再在这个位置右侧选择$j$个元素。

#### 次幂转下降幂

$$x^{n}=\sum_{i=0}^{n}{n\brace i}x^{\underline{i}}$$

考虑数学归纳法。

$$\begin{aligned}
x^{n+1}&=x\cdot x^{n}\\
&=\sum_{i=0}^{n}{n\brace i}x\cdot x^{\underline{i}}\\
&=\sum_{i=0}^{n}{n\brace i}(x-i+i)x^{\underline{i}}\\
&=\sum_{i=0}^{n}{n\brace i}x^{\underline{i+1}}+\sum_{i=0}^{n}{n\brace i}ix^{\underline{i}}\\
&=\sum_{i=0}^{n+1}{n\brace i-1}x^{\underline{i}}+\sum_{i=0}^{n+1}{n\brace i}ix^{\underline{i}}\\
&=\sum_{i=0}^{n+1}{n+1\brace i}x^{\underline{i}}
\end{aligned}$$

### 第一类斯特林数

这里我们讨论无符号第一类斯特林数。

#### 定义

$n$个有标号的元素构成$m$个圆排列的方案数。记为${n\brack m}$。

#### 递推式

$${n\brack m}={n-1\brack m-1}+(n-1){n-1\brack m}$$

考虑第$n$个元素单独构成一个圆排列还是插入到之前的某个元素之前即可。

$${n\brack 0}=1\qquad(n\geqslant 0)$$

$${n\brack n}=0\qquad(n\gt 0)$$

#### 通项公式

大概……没有吧。

#### 下降幂转次幂

$$x^{\underline{n}}=\sum_{i=0}^{n}(-1)^{n-i}{n\brack i}x^{i}$$

考虑数学归纳法。

$$\begin{aligned}
x^{\underline{n+1}}&=(x-n)x^{\underline{n}}\\
&=\sum_{i=0}^{n}(-1)^{n-i}{n\brack i}(x-n)x^{i}\\
&=\sum_{i=0}^{n}(-1)^{n-i}{n\brack i}x^{i+1}+\sum_{i=0}^{n}(-1)^{n-i+1}{n\brack i}nx^{i}\\
&=\sum_{i=0}^{n+1}(-1)^{n-i+1}{n\brack i-1}x^{i}+\sum_{i=0}^{n+1}(-1)^{n-i+1}{n\brack i}nx^{i}\\
&=\sum_{i=0}^{n+1}(-1)^{n-i+1}{n+1\brack i}x^{i}
\end{aligned}$$

### 斯特林反演

观察下面两个式子

$$\begin{aligned}
x^{n}&=\sum_{i=0}^{n}{n\brace i}x^{\underline{i}}\\
x^{\underline{n}}&=\sum_{i=0}^{n}(-1)^{n-i}{n\brack i}x^{i}
\end{aligned}$$

将它们套在一起

$$x^{\underline{n}}=\sum_{i=0}^{n}(-1)^{n-i}{n\brack i}\sum_{j=0}^{i}{i\brace j}x^{\underline{j}}\\=\sum_{j=0}^{n}\sum_{i=j}^{n}(-1)^{n-i}{n\brack i}{i\brace j}x^{\underline{j}}$$

于是

$$\sum_{i=m}^{n}(-1)^{n-i}{n\brack i}{i\brace m}=[m=n]$$
