---
title: 自己的一些大胆的想法（持续更新）
date: 2018-11-14 11:02:21
tags: [毒瘤题]
categories: [其它]
mathjax: true
top: true
---
自己闲得没事搞出来的一些毒瘤题。

~~不保证有解（~~

<!-- more -->

# Problem 1

## Description

定义一个从序列到序列的映射$\text{LIS()}$。我们认为$\text{LIS}(\{ a_n\})=\{ f_n\}$，当且仅当

$$\forall 1\leqslant i\leqslant n\;\; f_i=\begin{cases}&1&(i=1\vee \forall 1\leqslant j<i\;\; a_j\geqslant a_i)\\&\max\limits_{1\leqslant j<i\wedge a_j<a_i}f_j+1&(\text{Otherwise})\\\end{cases}$$

给你一个长度为$n$的序列$\{ f_n\}$，你需要求出满足

$$\text{LIS}(\{ a_n\})=\{ f_n\}\wedge\forall 1\leqslant i\leqslant n\;\; a_i\in [1,m]\cap\mathbb{Z}$$

的$\{ a_n\}$的数量，对$998244353$取模。

## Solution

很明显地，我们有

$$\forall 1\leqslant i<j\leqslant n\wedge f_i=f_j\;\;a_i\geqslant a_j$$

$$\forall 1\leqslant i,j\leqslant n\wedge f_i<f_j\;\;a_i<a_j$$

我们可以考虑将$\{ f_n\}$中最大的数记为$k$，数$x$的出现次数记为$cnt_x$。然后将$[1,m]$划分成$k$个独立区间$[1,x_1],[x_1+1,x_2],\cdots,[x_{k-1}+1,m]$，在第$i$个区间内独立地选出$cnt_i$个数并统计组成的所有不上升序列的数量。

我们定义$\text{nisc}(\text{Non-Increasing Sequence Count})(n,m)$表示在$n$个互不相等且具有大小关系的元素中选出$m$个元素（没有必要互不相同）组成的本质不同的不上升序列的数量。

考虑$m=1$时的情况。此时每个元素被选中都可以组成不上升序列。我们令$f[i][j]$表示$m=i$且第一次选中的元素是$j$时的总方案数。很明显地，我们有

$$\forall 1\leqslant i\leqslant n\;\;f[1][i]=1$$

$$\text{nisc}(n,1)=\sum\limits_{i=1}^nf[1][i]=n$$

现在考虑$m=2$。假设我们在第一次选择前再选一次。如果我们在这一次选择了$j$，下一次可能的选项有$1,2,\cdots,j$，所以

$$f[2][j]=\sum\limits_{k=1}^jf[1][k]$$

将这个公式进一步推广，我们得到

$$f[i][j]=\sum\limits_{k=1}^jf[i-1][k]$$

$$\text{nisc}(n,m)=\sum_{i=1}^nf[m][i]=f[m+1][n]$$

考虑对一个只有$1$的数组进行$m$次前缀和，然后询问第$n$个位置上的数是多少。虽然我不会证，不过我通过人力打表得出

$$\text{nisc}(n,m)=\frac1{m!}\prod\limits_{i=1}^{m}(n+i-1)$$

考虑一种naive的$\text{DP}$。定义$g[i][j]$表示将$[1,i]$分成$j$段，第$j$段中选$cnt_j$个元素组成不上升序列，这样的总方案数。我们有

$$g[n][m]=\sum\limits_{i=m-1}^{n-1}g[i][m-1]\text{nisc}(n-i,cnt_m)$$

然而很遗憾，这个方程是错的。

就比如说，考虑这样一组数据：

```plaintext
3 3
1 2 1
```

手动模拟一下，我们发现答案是$4$。但如果直接暴力地套上面的方程，我们会得到$5$。

从本质上来讲，上面的方程会把$[1,3]$划分成$\{[1,1],[2,3]\}$和$\{[1,2],[3,3]\}$。对于第一种，我们可以得到$\{\{1,2,1\},\{1,3,1\}\}$。对于第二种，我们可以得到$\{\{1,3,1\},\{1,3,2\},\{2,3,2\}\}$。注意到$\{1,3,1\}$出现了两次，这正是这种做法的错误所在。而且，更恐怖的是，我不认为我们有什么有效的去重方法。

如果有哪位神仙能够解出这道题，请在下方发表回复。

> 最近可能状态有些差，上面这些东西写完五分之四以后去吃午饭莫名感觉脑阔疼（
> 
> 因此，就先到这里吧。