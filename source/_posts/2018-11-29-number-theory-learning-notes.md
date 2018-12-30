---
title: 一些乱七八糟的数论
date: 2018-11-29 14:41:17
tags:
  - 数论
  - 杜教筛
categories:
  - 学习笔记
mathjax: true
---
最近在洛谷日报的待审核列表里翻到了杜教筛的相关内容，打算连着之前的卷积反演啥的一起复习一下。

~~抄袭来源~~参考文献：

- [铃悬的数学小讲堂——狄利克雷卷积与莫比乌斯反演](https://lx-2003.blog.luogu.org/mobius-inversion)
- [浅谈杜教筛](https://www.luogu.org/blog/54745/dls-tql)
- [铃悬的数学小讲堂——杜教筛](https://lx-2003.blog.luogu.org/dujiao-sieve)

<!-- more -->

# 数论函数

## 定义与相关性质

数论函数就是定义域为$\mathbb{N}^{+}$的函数。

两个数论函数相加，就是简单地把函数值相加。

$$(f+g)(n)=f(n)+g(n)$$

数乘也是类似的。

$$(\alpha f)(n)=\alpha f(n)$$

点积也是类似的。

$$(f\cdot g)(n)=f(n)g(n)$$

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

> Updated on 2018-12-03
> 
> 例题……还是算了吧（
> 
> 发现反演常用的套路都忘的差不多了，还是别丢人了（

# 杜教筛

## 实现与模板题

接下来才是主要内容。

现在，我们要求一个积性函数的前$n$项和。$n\leqslant 10^{10}$。

我们定义

$$S(n)=\sum\limits_{i=1}^{n}f(i)$$

再拿来一个积性函数$g$，然后把它与$f$卷积并求前缀和。

$$\begin{aligned}
\sum_{i=1}^{n}(f\times g)(i)&=\sum_{i=1}^{n}\sum_{j\mid i}f(j)g(\cfrac{i}{j})\\
&=\sum_{i=1}^{n}g(i)\sum_{j=1}^{\lfloor\frac{n}{i}\rfloor}f(j)\\
&=\sum_{i=1}^{n}g(i)S(\lfloor\cfrac{n}{i}\rfloor)
\end{aligned}$$

然而我的语文实在是太菜了，大概说也说不明白，自行理解吧（

因为$g$也是积性函数，有$g(1)=1$，所以

$$\begin{aligned}
S(n)&=g(1)S(n)\\
&=\sum_{i=1}^{n}g(i)S(\lfloor\cfrac{n}{i}\rfloor)-\sum_{i=2}^{n}g(i)S(\lfloor\cfrac{n}{i}\rfloor)\\
&=\sum_{i=1}^{n}(f\times g)(i)-\sum_{i=2}^{n}g(i)S(\lfloor\cfrac{n}{i}\rfloor)
\end{aligned}$$

就是说从第一项开始的前缀和减去从第二项开始的前缀和等于第一项本身。

如果说我们选择的$g$可以让我们迅速地求出$f\times g$和$g$的前缀和，我们就可以做到快速求$f$的前缀和了。

关于后面的$g(i)S(\lfloor\cfrac{n}{i}\rfloor)$，如果直接暴力算复杂度会是$O(n)$的，在大部分情况下，这是无法接受的。

我们来分析一下$\lfloor\cfrac{n}{i}\rfloor$。如果$1\leqslant i\leqslant\sqrt{n}$，因为$i$只有$\sqrt{n}$种不同的取值，$\lfloor\cfrac{n}{i}\rfloor$同样也只有$\sqrt{n}$种不同的取值。如果$\sqrt{n}<i\leqslant n$，$1\leqslant\lfloor\cfrac{n}{i}\rfloor<\sqrt{n}$，又因为要向下取整，自然也只有$\sqrt{n}$种不同的取值。如果我们能够把$\lfloor\cfrac{n}{i}\rfloor$相同的$i$一起计算，就能够将时间杂度优化到$O(\sqrt{n})$。

大体代码如下：

```cpp
for(re int l=1,r;l<=n;l=r+1){
	r=n/(n/l);
	//......
}
```

关于$r$的这个上界是怎么来的，我并不会证（

这样一来，要计算$S(n)$，我们需要调用所有的$\lfloor\cfrac{n}{x}\rfloor$，分别是$\lfloor\cfrac{n}{1}\rfloor,\lfloor\cfrac{n}{2}\rfloor,\cdots,\lfloor\cfrac{n}{\sqrt{n}}\rfloor,\sqrt{n},\sqrt{n}-1,\cdots,1$。单独计算一个$S(n)$的时间复杂度很明显是$O(\sqrt{n})$的。那么这样一来，总体的时间复杂度就是

$$\begin{aligned}
O(\sum\limits_{i=1}^{\sqrt{n}}\sqrt{i}+\sqrt{\lfloor\cfrac{n}{i}\rfloor})&=O(\sum\limits_{i=1}^{\sqrt{n}}\sqrt{\lfloor\cfrac{n}{i}\rfloor})\\
&=O(\int\limits_{1}^{\sqrt{n}}\sqrt{\lfloor\cfrac{n}{x}\rfloor}dx)\\
&=O(\int\limits_{1}^{\sqrt{n}}\sqrt{\cfrac{n}{x}}dx)\\
&=O(2n^{\frac{1}{2}}(n^{\frac{1}{4}}-1))\\
&=O(n^{\frac{3}{4}})
\end{aligned}$$

因为相比之下$\sqrt{\lfloor\cfrac{n}{i}\rfloor}$很明显要大一些，我们就可以将$\sqrt{i}$舍去。然后去掉取整符号并用积分近似。

这个实现方法还可以优化。具体来讲，我们先线性筛出前$m$项，然后再用杜教筛。这么做的时间复杂度是$O(m+\cfrac{n}{\sqrt{m}})$，当$m=n^{\frac{2}{3}}$时取得最小值$O(n^{\frac{2}{3}})$。

举个例子，就比如说我们要求

$$\sum\limits_{i=1}^{n}\varphi(i)$$

我们取$f=\varphi,g=1$，这样根据$\varphi$的性质，$f\times g=id$。不难看出$g$与$f\times g$的前缀和都可以$O(1)$求。具体的代码实现差不多长这样：

```cpp
long long getSum(int n){
	if(n<=maxn)
		return phi[n];
	//phi是提前线性筛好的前缀和
	if(ans.count(n))
		return ans[n];
	//ans用来实现记忆化的哈希表，比如说unordered_map
	re long long res=1LL*n*(n+1)>>1;
	//f*g的前缀和
	for(re int l=2,r;l<=n;l=r+1){
	//注意要从2开始
		r=n/(n/l);
		res-=(r-l+1)*getSum(n/l);
		//r-l+1是g的前缀和
		//像这样递归+记忆化求解f的前缀和
	}
	return ans[n]=res;
	//返回的时候不要忘记存一下
	//就比如说我就忘过一次（
}
```

以及，不用哈希表也是可以的。因为我们查询的数都是形如$\lfloor\cfrac{n}{x}\rfloor$的，当这个值大于$n^{\frac{2}{3}}$，即$x<n^{\frac{1}{3}}$时，我们才会到哈希表里查询。因此我们可以令`ans[x]`表示$S(\lfloor\cfrac{n}{x}\rfloor)$。具体代码我就不写了（

再举个例子，求

$$\sum\limits_{i=1}^{n}\mu(i)$$

取$f=\mu,g=1,f\times g=\epsilon$。代码和上面差不多。

如果您理解了上面两个函数，这道[模板题](https://www.luogu.org/problemnew/show/P4213)您就可以切了。

## 其他题

### [「Luogu-P3768」简单的数学题](https://www.luogu.org/problemnew/show/P3768)

快乐地推式子：

$$\begin{aligned}
\sum\limits_{i=1}^{n}i\sum\limits_{j=1}^{n}j\text{gcd}(i,j)&=\sum\limits_{d=1}^{n}d^{3}\sum\limits_{i=1}^{\lfloor\frac{n}{d}\rfloor}i\sum\limits_{j=1}^{\lfloor\frac{n}{d}\rfloor}j[i\perp j]\\
&=\sum\limits_{d=1}^{n}d^{3}\sum\limits_{i=1}^{\lfloor\frac{n}{d}\rfloor}i\sum\limits_{j=1}^{\lfloor\frac{n}{d}\rfloor}j\sum\limits_{x\mid i,x\mid j}\mu(x)\\
&=\sum\limits_{d=1}^{n}d^{3}\sum\limits_{x=1}^{\lfloor\frac{n}{d}\rfloor}x^{2}\mu(x)\text{Sum}^{2}(\lfloor\cfrac{n}{dx}\rfloor)\\
&=\sum\limits_{i=1}^{n}\text{Sum}^{2}(\lfloor\cfrac{n}{i}\rfloor)i^{2}\sum\limits_{j\mid i}j\mu(\cfrac{i}{j})\\
&=\sum\limits_{i=1}^{n}\text{Sum}^{2}(\lfloor\cfrac{n}{i}\rfloor)i^{2}\varphi(i)
\end{aligned}$$

其中

$$\text{Sum}(n)=\sum\limits_{i=1}^{n}i$$

最后一步是因为

$$\begin{aligned}
id\times\mu&=\varphi\times 1\times\mu\\
&=\varphi\times\epsilon\\
&=\varphi
\end{aligned}$$

理解不了上面的式子的话就多看看吧（

不难发现我们是要求$f(n)=n^{2}\varphi(n)$的前缀和，那么，我们该怎么选取$g$呢？

~~枚举瞎蒙（~~

考虑$g(n)=n^{2}$。

$$\begin{aligned}
(f\times g)(n)&=\sum\limits_{i\mid n}f(i)g(\cfrac{n}{i})\\
&=\sum\limits_{i\mid n}i^{2}\varphi(i)\cfrac{n^{2}}{i^{2}}\\
&=n^{2}\sum\limits_{i\mid n}\varphi(i)\\
&=n^{3}
\end{aligned}$$

~~其实我都不知道我当时是怎么想到这种操作的（~~

然后就和上面一样了。

### [「Luogu-U18201」分析矿洞](https://www.luogu.org/problemnew/show/U18201)

不知道从哪翻出来的题（

是某场个人邀请赛的$\text{T}1$~~，从某种意义上也能看出那场比赛有多么神仙~~。

$$\begin{aligned}
\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}\varphi(\text{gcd}^{2}(i,j))&=\sum\limits_{d=1}^{n}\varphi(d^{2})\sum\limits_{i=1}^{\lfloor\frac{n}{d}\rfloor}\sum\limits_{j=1}^{\lfloor\frac{n}{d}\rfloor}[i\perp j]\\
&=\sum\limits_{d=1}^{n}\varphi(d^{2})\sum\limits_{i=1}^{\lfloor\frac{n}{d}\rfloor}\sum\limits_{j=1}^{\lfloor\frac{n}{d}\rfloor}\sum\limits_{x\mid i,x\mid j}\mu(x)\\
&=\sum\limits_{d=1}^{n}\varphi(d^{2})\sum\limits_{x=1}^{\lfloor\frac{n}{d}\rfloor}\mu(x)\lfloor\cfrac{n}{dx}\rfloor^{2}\\
&=\sum\limits_{i=1}^{n}\lfloor\cfrac{n}{i}\rfloor^{2}\sum\limits_{j\mid i}\varphi(j^{2})\mu(\cfrac{i}{j})\\
&=\sum\limits_{i=1}^{n}\lfloor\cfrac{n}{i}\rfloor^{2}\sum\limits_{j\mid i}j\varphi(j)\mu(\cfrac{i}{j})
\end{aligned}$$

设$f_1(n)=n\varphi(n),f_2(n)=\mu(n)$，考虑筛$f=f_1\times f_2$的前缀和。然而，与上面的其它题不同，并不存在一个$g$使我们能够$O(1)$地求出$g$和$f\times g$的前缀和。一种较优的方案是，令$g=1$，$f\times g=(id\cdot\varphi)\times\mu\times 1=id\cdot\varphi$，这样，我们还需要筛出$f_1(n)=n\varphi(n)$的前缀和。

怎么办？

再套一层杜教筛！

然而可能是常数会有些大也可能是我太菜了自带大常数，好像会跑的很慢（

以及，像这种$n$爆了`int`的，一定要注意经常取模。~~因为这个WA了好几次（~~

最后，源文件$17\text{KB}​$祭，blog翻页祭。