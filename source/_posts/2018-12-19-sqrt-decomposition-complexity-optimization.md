---
title: 关于最优化分块时间复杂度的研究报告
date: 2018-12-19 20:19:18
tags:
  - 分块
categories:
  - 研究报告
mathjax: true
---
最近在刷Ynoi，然后卡常卡到自闭，于是来系统地研究一下分块的复杂度。

<!-- more -->

假设我们有一个长度为$n$的序列，块的大小是$x$，令$y=\cfrac{n}{x}$。对于每一次修改操作，我们的运算量是$\text{A}x+\text{B}y$。根据均值不等式

$$\cfrac{1}{2}(x+y)\geqslant\sqrt{xy}$$

我们有

$$\text{A}x+\text{B}y\geqslant2\sqrt{\text{AB}n}$$

当且仅当$x=\sqrt{\cfrac{\text{B}}{\text{A}}n}$时取等号。此时时间复杂度最小，为$O(\sqrt{\text{AB}n})$。

以上。
