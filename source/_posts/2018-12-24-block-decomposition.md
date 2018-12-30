---
mathjax: true
date: 2018-12-24 10:27:06
title: 关于块状分块的研究报告
tags:
  - 分块
  - 块状分块
categories:
  - 研究报告
password: qwijfpw49qg][pl}_,rp
abstract: 该文章已被加密
message: 输入密码继续阅读
---
之前的机房珂学家发明的船新的数据结构。

sto __Juan\_feng__ orz

<!-- more -->

[模板题](https://www.luogu.org/problemnew/show/T64137)

那么这道题怎么做呢？

- 线段树！不好意思卡空间，只给了⑨分。
- 树状数组！不好意思不保证乘的数有逆元，只给了59分。
- 分块！不好意思复杂度太大，只给了3分~~，和暴力一个分~~。

那么这道题怎么做呢？如标题所示，块状分块。

就是说，我们先把原序列分成很多小块，然后再将这些小块分成大块。每次操作时分为大整块、小整块、小散块三部分考虑。

假设说我们一个大块$\text{A}$个数，一个小块$\text{B}$个数，每次查询的时间复杂度就是

$$O(\cfrac{n}{\text{A}}+\cfrac{\text{A}}{\text{B}}+\text{B})$$

我们令

$$x=\cfrac{n}{\text{A}}\;\;y=\cfrac{\text{A}}{\text{B}}\;\;z=\text{B}$$

$$xyz=n$$

$$\begin{cases}
&x+y\geqslant 2\sqrt{xy}\\
&y+z\geqslant 2\sqrt{yz}\\
&x+z\geqslant 2\sqrt{xz}
\end{cases}$$

当

$$x=y=z=n^{\frac{1}{3}}$$

时，以上三式均取等号，此时

$$\text{A}=n^{\frac{2}{3}}\;\;\text{B}=n^{\frac{1}{3}}$$

$$O(\cfrac{n}{\text{A}}+\cfrac{\text{A}}{\text{B}}+\text{B})=O(n^{\frac{1}{3}})$$

就是这样的一个神奇的数据结构。

---

胡扯开始。

以上，我们通过套两层分块的方式将单次询问的时间复杂度从$O(\sqrt{n})$砍到了$O(n^{\frac{1}{3}})$也就是$O(\sqrt[3]{n})$。我们猜想，如果说我们套$k$层分块，单次询问的时间复杂度就是$O(n^{\frac{1}{k+1}})$，当$k$趋向于正无穷大时（？？？），我们就得到了一个单次询问$O(1)$的优秀数据结构（光速逃

胡扯结束。

---

代码先不贴（
