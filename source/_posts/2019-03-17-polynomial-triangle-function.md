---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-03-17 11:06:25
title: 来扯点多项式？
tags:
  - 多项式
  - 三角函数
categories:
  - 瞎扯
password:
---
在luogu上看到了多项式三角函数/反三角函数的板子。

不过还没加进公共题库，没人交，于是不敢交（

于是来口胡一波吧。

<!-- more -->

### 三角函数

总之就是求$\sin F(x)$，$\cos F(x)$，其他的三角函数都可以用这两个凑出来因此不需要单独讨论。

虽然说我们也有$\cos x=\sin(x+\cfrac{\pi}{2})$，但是问题来了，模意义下怎么表示$\pi$（

首先我们有欧拉公式

$$e^{ix}=\cos x+i\sin x$$

于是

$$e^{iF}=\cos F+i\sin F$$

根据定义，$i^{2}\equiv -1\equiv 998244352\pmod{998244353}$。而$998244352$是模$998244353$的二次剩余，说人话就是这样的$i$是存在的。

但是问题来了，我们该怎么分离$\sin$和$\cos$？

我们还需要有

$$e^{i(-F)}=\cos F-i\sin F$$

很明显地

$$\sin F=\cfrac{e^{iF}-e^{i(-F)}}{2i}$$

$$\cos F=\cfrac{e^{iF}+e^{i(-F)}}{2}$$

### 反三角函数

求$\arcsin F(x)$，$\arccos F(x)$。

我们令答案的多项式为$G(x)$。

我们都知道

$$\sin^{2}x+\cos^{2}x=1$$

于是知道了$\sin G$或者是$\cos G$，我们就可以推出另一项，然后再根据

$$e^{iG}=\cos G+i\sin G$$

$$G=\cfrac{\ln(\cos G+i\sin G)}{i}$$

就可以算出$G$了。

那么$\arctan F(x)$？

$$\sin^{2}G+\cos^{2}G=1$$

因为$\tan G$有意义，所以$\cos G\neq0$。

$$\tan^{2}G+1=\sec^{2}G$$

$$\cos G=\cfrac{1}{\sqrt{\tan^{2}G+1}}$$

但是看着就麻烦（

> Updated on 2019-03-18
>
> 上面这种做法大概不是正解，因为这样需要对一个常数项不是$1$，最低次非零系数也不是$1$的多项式求平方根，很明显这需要二次剩余~~，而且我不会~~。
>
> 考虑倍增。
>
> $$\sin G_{0}-F\equiv 0\pmod{x^{t}}$$
>
> $$\sin G-F\equiv 0\pmod{x^{2t}}$$
>
> $$G\equiv G_{0}-\cfrac{\sin G_{0}-F}{(\sin G_{0}-F)^{\prime}}\equiv G_{0}-\cfrac{\sin G_{0}-F}{\cos G_{0}}\pmod{x^{2t}}$$
>
> 然后是$\arccos$。
>
> $$G\equiv G_{0}-\cfrac{\cos G_{0}-F}{(\cos G_{0}-F)^{\prime}}\equiv G_{0}+\cfrac{\cos G_{0}-F}{\sin G_{0}}\pmod{x^{2t}}$$
>
> 然后是$\arctan$。不过我不怎么会求导$\tan$（
>
> $$\begin{aligned}
> (\tan x)^{\prime}&=(\cfrac{\sin x}{\cos x})^{\prime}\\
> &=\cfrac{(\sin x)^{\prime}}{\cos x}+\sin x(\cfrac{1}{\cos x})^{\prime}\\
> &=1+\tan^{2}x
> \end{aligned}$$
>
> $$G\equiv G_{0}-\cfrac{\tan G_{0}-F}{(\tan G_{0}-F)^{\prime}}\equiv G_{0}+\cfrac{\tan G_{0}-F}{1+\tan^{2} G_{0}}\pmod{x^{2t}}$$
>
> 这大概不能写（

### 多项式GCD/LCM

既然多项式能够整除和取模，那么GCD和LCM一定也是可以算的吧！

……应该可以吧（
