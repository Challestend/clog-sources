---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-02-13 21:41:39
title: 「年轻人，你渴望力量吗？」
tags:
  - min_25筛
categories:
  - 学习笔记
password:
---
标题来自某学长安利min_25筛的方式（

<!-- more -->

### 概述

我们知道，[杜教筛](/number-theory-learning-notes/)可以在$O(n^{\tfrac{2}{3}})$的时间复杂度内计算某些给定的积性函数的前缀和。

但是现在我们希望更快。于是我们有了min_25筛（

以下，我们约定$p$是一个质数。$\mathbb{P}_{i}$表示第$i$小的质数，$\mathbb{P}_{0}=0$。$\text{minp}(n)$表示$n$最小的质因数，$\text{minp}(1)=0$。

现在我们要求一个积性函数$f$的前缀和。我们需要它满足以下两条性质：

1. $f(p)$是一个__可以快速求前缀和的完全积性函数__，或者能用多个这样的函数运算得到。
2. $f(p^{k})$可以快速求，大概$O(k)$以内就可以。

### 第一部分

我们要对每一个$x=\lfloor\cfrac{n}{i}\rfloor(i\in\mathbb{N}\cap[1,n])$，求出

$$\sum_{i=1}^{x}[i\in\mathbb{P}]f(i)$$

定义

$$F(x,y)=\sum_{i=1}^{x}[i\in\mathbb{P}\vee\text{minp}(i)\gt\mathbb{P}_{y}]f^{\prime}(i)$$

也就是把所有质数和最小质因数大于$\mathbb{P}_y$的合数全部当成质数代入$f^{\prime}$求值并求和。不难发现

$$F(x,+\infty)=\sum_{i=1}^{x}[i\in\mathbb{P}]f(i)$$

我们回忆一下埃式筛法的运行过程。

筛完$k$次后，我们除去了最小质因数小于等于$\mathbb{P}_{k}$的合数，剩下了质数和最小质因数大于$\mathbb{P}_k$的合数。

可以看到这和$F(x,y)$的定义十分吻合。$F(x,y)$就是埃式筛法筛完$y$次后，没有被筛掉的数的$f^{\prime}$的值的和。

首先，第$y$次筛掉的最小的数很明显是$\mathbb{P}_{y}^{2}$，如果$\mathbb{P}_{y}^{2}\gt x$，我们什么也筛不掉，此时$F(x,y)=F(x,y-1)$。

也因此，筛质数筛到$\sqrt{n}$即可。

否则，即$\mathbb{P}_{y}^{2}\leqslant x$，我们将所有数除以$\mathbb{P}_{y}$，之前所有最小质因数等于$\mathbb{P}_{y}$的合数一一对应到了现在所有大于等于$\mathbb{P}_{y}$的数。

又因为$f^{\prime}$是完全积性的，假如我们有一个需要筛掉的数$z$，我们可以通过$f^{\prime}(\cfrac{z}{\mathbb{P}_{y}})f^{\prime}(\mathbb{P}_{y})$计算$f^{\prime}(z)$。

那么看起来

$$F(x,y)=F(x,y-1)-f^{\prime}(\mathbb{P}_{y})F(\lfloor\cfrac{n}{\mathbb{P}_{y}}\rfloor,y-1)$$

$F(\lfloor\cfrac{n}{\mathbb{P}_{y}}\rfloor,y-1)$包含了三类数的$f^{\prime}$的值：

1. 大于等于$\mathbb{P}_{y}$的质数。
2. 最小质因数大于等于$\mathbb{P}_{y}$（大于$\mathbb{P}_{y-1}$）的合数。
3. 小于$\mathbb{P}_{y}$的质数。

但是很明显第三类数不能被除去，因此实际上

$$F(x,y)=F(x,y-1)-f^{\prime}(\mathbb{P}_{y})\left(F(\lfloor\cfrac{n}{\mathbb{P}_{y}}\rfloor,y-1)-\sum_{i=1}^{y-1}f^{\prime}(\mathbb{P}_{i})\right)$$

综上所述

$$F(x,y)=\begin{cases}
&F(x,y-1)-f^{\prime}(\mathbb{P}_{y})\left(F(\lfloor\cfrac{n}{\mathbb{P}_{y}}\rfloor,y-1)-\sum\limits_{i=1}^{y-1}f^{\prime}(\mathbb{P}_{i})\right)\;\;&(\mathbb{P}_{y}^{2}\leqslant x)\\
&F(x,y-1)&(\mathbb{P}_{y}^{2}\gt x)
\end{cases}$$

初值为

$$F(x,0)=\sum_{i=2}^{x}f^{\prime}(i)$$

注意到第二维只与$y-1$有关，我们可以滚掉。

还有一个问题。这类题目的$n$会很大，我们无法开一个长度为$n$的数组。

因为$x=\lfloor\cfrac{n}{i}\rfloor(i\in\mathbb{N}\cap[1,n])$，这样的$x$最多只有$2\sqrt{n}$个，我们可以离散化存储。

具体实现细节我说不清，看代码吧（

{% fold "Toggle Code" %}

```cpp
cltstream::read(n);
sq=sqrt(n);
for(re int i=2;i<=sq;++i){
	if(!f[i]){
		g[++g[0]]=i;
		fsum[g[0]]=fsum[g[0]-1]+/**/;
		//注释处应填f`(i)
	}
	for(re int j=1;j<=g[0]&&i*g[j]<=sq;++j){
		f[i*g[j]]=1;
		if(!(i%g[j]))
			break;
	}
}
m=0;
for(re int l=1,r;l<=n;r=n/(n/l),l=r+1){
	w[++m]=n/l;
	//编号对应的离散化前的值
	F[m]=/**/;
	//注释处应填\sum_{t=2}^{w[m]}f`(t)
	if(w[m]<=sq)
		id1[w[m]]=m;
	else
		id2[n/w[m]]=m;
	//分段存储值对应的编号，这样数组只需要开到sqrt{n}
}
for(re int j=1;j<=g[0];++j)
	for(re int i=1;i<=m&&w[i]>=g[j]*g[j];++i){
	//w[i]>=g[j]*g[j]，所以w[i]/g[j]>=g[j]
		re int id=w[i]/g[j]<=sq?id1[w[i]/g[j]]:id2[n/(w[i]/g[j])];
		F[i]-=/**/*(F[id]-fsum[j-1]);
		//注释处应填f`(g[j])
	}
```

{% endfold %}

这一部分的时间复杂度已被证明是$O(\cfrac{n^{\tfrac{3}{4}}}{\log n})$。~~然而看上去很奇怪（~~

### 第二部分

在第一部分中我们求出了所有质数的贡献，现在我们要扩展到全体整数。

定义

$$S(x,y)=\sum_{i=1}^{x}[\text{minp}(i)\geqslant\mathbb{P}_{y}]f(i)$$

也就是所有最小质因数大于等于$\mathbb{P}_{y}$的数的$f$的值的和。我们最终要求的就是$S(n,1)+f(1)$。

首先我们需要统计所有质数的贡献，也就是$F(x,+\infty)-\sum\limits_{i=1}^{y-1}f(\mathbb{P}_{i})$。

关于合数，我们枚举最小的质因数，然后把所有数除以这个数的若干次幂，得到的商的最小质因数应当大于这个数。

$$\sum_{i=y}^{\mathbb{P}_{i}^{2}\leqslant n}\sum_{j=1}^{\mathbb{P}_{i}^{j+1}\leqslant n}f(\mathbb{P}_{i}^{j})S(\lfloor\cfrac{x}{\mathbb{P}_{i}^{j}}\rfloor,i+1)$$

但是还有一个问题是$S(\lfloor\cfrac{x}{\mathbb{P}_{i}^{j}}\rfloor,i+1)$中不包括$f(1)$，因此$f(\mathbb{P}_{i}^{j})$没有被统计，我们需要手动算进来

$$\sum_{i=y}^{\mathbb{P}_{i}^{2}\leqslant n}\sum_{j=1}^{\mathbb{P}_{i}^{j+1}\leqslant n}\left(f(\mathbb{P}_{i}^{j})S(\lfloor\cfrac{x}{\mathbb{P}_{i}^{j}}\rfloor,i+1)+f(\mathbb{P}_{i}^{j+1})\right)$$

于是

$$S(x,y)=F(x,+\infty)-\sum\limits_{i=1}^{y-1}f(\mathbb{P}_{i})+\sum_{i=y}^{\mathbb{P}_{i}^{2}\leqslant n}\sum_{j=1}^{\mathbb{P}_{i}^{j+1}\leqslant n}\left(f(\mathbb{P}_{i}^{j})S(\lfloor\cfrac{x}{\mathbb{P}_{i}^{j}}\rfloor,i+1)+f(\mathbb{P}_{i}^{j+1})\right)$$

然后暴力搜，记忆化都不需要，时间复杂度还是$O(\cfrac{n^{\tfrac{3}{4}}}{\log n})$。~~就很神奇（~~

{% fold "Toggle Code" %}

```cpp
int S(re int x,re int y){
	if(x<=1||g[y]>x)
		return 0;
	else{
		re int id=x<=sq?id1[x]:id2[n/x];
		re int res=F[id]-fsum[y-1];
		for(re int i=y;i<=g[0]&&g[i]*g[i]<=x;++i)
			for(re int p=g[i];p*g[i]<=x;p*=g[i])
				res+=/*1*/*S(x/p,i+1)+/*2*/;
				//1处应填f(p)，2处应填f(p*g[i])
		return res;
	}
}
```

{% endfold %}

### [「Luogu-P4213」「模板」杜教筛（Sum）](https://www.luogu.org/problemnew/show/P4213)

首先我们有

$$\varphi(p)=\text{id}(p)-1$$

$$\mu(p)=-1$$

然后$\text{id}$和$1$都是能$O(1)$求前缀和完全积性函数，因此可以用min_25筛搞。

说起来比较麻烦，min_25筛不结合代码大概也很难理解，所以说直接上代码（

{% fold "Toggle Code" %}

```cpp
#include<cstdio>
#include<cmath>
#define re register
#define maxn 50000

namespace cltstream{
	#define size 1048576
	char cltin[size+1],*ih=cltin,*it=cltin;
	inline char gc(){
		#ifdef ONLINE_JUDGE
			if(ih==it){
				it=(ih=cltin)+fread(cltin,1,size,stdin);
				if(ih==it)
					return EOF;
			}
			return *ih++;
		#else
			return getchar();
		#endif
	}

	char cltout[size+1],*oh=cltout,*ot=cltout+size;
	inline void pc(char c){
		if(oh==ot){
			fwrite(cltout,1,size,stdout);
			oh=cltout;
		}
		*oh++=c;
	}
	#define clop() fwrite(cltstream::cltout,1,cltstream::oh-cltstream::cltout,stdout),cltstream::oh=cltstream::cltout
	#undef size

	template <typename _tp>
	inline void read(_tp& x){
		int sn=1;
		char c=gc();
		for(;c!=45&&(c<48||c>57)&&c!=EOF;c=gc());
		if(c==45&&c!=EOF)
			sn=-1,c=gc();
		for(x=0;c>=48&&c<=57&&c!=EOF;x=(x<<3)+(x<<1)+(c^48),c=gc());
		x*=sn;
	}

	template <typename _tp>
	inline void write(_tp x,char text=-1){
		if(x<0)
			pc(45),x=-x;
		if(!x)
			pc(48);
		else{
			int digit[22];
			for(digit[0]=0;x;digit[++digit[0]]=x%10,x/=10);
			for(;digit[0];pc(digit[digit[0]--]^48));
		}
		if(text>=0)
			pc(text);
	}
}

int t,n,sq,m;
int f[maxn+1],g[maxn+1],w[(maxn<<1)+1],id1[maxn+1],id2[maxn+1];
int prmcnt[maxn+1],prmCnt[(maxn<<1)+1];
long long prmsum[maxn+1],prmSum[(maxn<<1)+1];

long long getPhi(re int x,re int y){
	if(x<=1||g[y]>x)
		return 0;
	else{
		re int id=x<=sq?id1[x]:id2[n/x];
		re long long res=(prmSum[id]-prmCnt[id])-(prmsum[y-1]-prmcnt[y-1]);
		for(re int i=y;i<=g[0]&&1LL*g[i]*g[i]<=x;++i)
			for(re int p=g[i];1LL*p*g[i]<=x;p*=g[i])
				res+=1LL*p/g[i]*(g[i]-1)*getPhi(x/p,i+1)+1LL*p*(g[i]-1);
		return res;
	}
}

int getMu(re int x,re int y){
	if(x<=1||g[y]>x)
		return 0;
	else{
		re int id=x<=sq?id1[x]:id2[n/x];
		re int res=prmcnt[y-1]-prmCnt[id];
		for(re int i=y;i<=g[0]&&1LL*g[i]*g[i]<=x;++i)
			res-=getMu(x/g[i],i+1);
		return res;
	}
}

int main(){
	for(re int i=2;i<=maxn;++i){
		if(!f[i]){
			g[++g[0]]=i;
			prmcnt[g[0]]=prmcnt[g[0]-1]+1;
			prmsum[g[0]]=prmsum[g[0]-1]+i;
		}
		for(re int j=1;j<=g[0]&&1LL*i*g[j]<=maxn;++j){
			f[i*g[j]]=1;
			if(!(i%g[j]))
				break;
		}
	}
	cltstream::read(t);
	for(;t;--t){
		cltstream::read(n);
		sq=sqrt(n);
		m=0;
		for(re int l=1,r;l<=n;r=n/(n/l),l=r+1){
			w[++m]=n/l;
			prmCnt[m]=w[m]-1;
			prmSum[m]=1LL*(w[m]-1)*(w[m]+2)/2;
			if(w[m]<=sq)
				id1[w[m]]=m;
			else
				id2[n/w[m]]=m;
		}
		for(re int j=1;j<=g[0];++j)
			for(re int i=1;i<=m&&w[i]>=1LL*g[j]*g[j];++i){
				re int id=w[i]/g[j]<=sq?id1[w[i]/g[j]]:id2[n/(w[i]/g[j])];
				prmCnt[i]-=prmCnt[id]-prmcnt[j-1];
				prmSum[i]-=1LL*g[j]*(prmSum[id]-prmsum[j-1]);
			}
		cltstream::write(getPhi(n,1)+1,32);
		cltstream::write(getMu(n,1)+1,10);
	}
	clop();
	return 0;
}
```
{% endfold %}

![](/images/TIM截图20190214152934.png)

上为min_25筛，下为杜教筛。

min_25筛的优势不仅在于时间复杂度，它还可以筛一些乱七八糟的东西。就比如说

### [「LOJ6053」简单的函数](https://loj.ac/problem/6053)

总结一下这个函数：

$$f(1)=1$$

$$f\left(\prod_{i=1}^{N}p_{i}^{r_{i}}\right)=\prod_{i=1}^{N}(p_{i}\otimes r_{i})$$

其中$\otimes$表示按位异或。

![](/images/TIM图片20190103092627.png)

按位异或从十进制的角度来看无异于玄学，因此杜教筛就没法做了（

注意到

$$f(p)=p\otimes 1=\begin{cases}
&p+1\;\;&(p=2)\\
&p-1\;\;&(p\gt 2)
\end{cases}$$

我们可以在算前缀和时将$f(2)$当成$2-1$，然后特判一下加回来。

然后还是要用min_25筛的前半部分筛出$\text{id}$和$1$，其实和上面的$\varphi$没多大区别就是加了点细节（

[好像这种能随便看代码的OJ可以直接扔个提交记录](https://loj.ac/submission/336101)。

### [「UOJ188」Sanrd](http://uoj.ac/problem/188)

次大质因数和。

其实这个题面有点考阅读的。

但是我们发现次大质因数这个函数和质数并没有什么关系，而且不积性。~~说好的只能筛积性函数呢（~~

我们来分析一下min_25筛的运行过程。

调用到$S(x,y)$时，剩下的最小质因数大于等于$\mathbb{P}_{y}$的数中，只有质数与$\mathbb{P}_{y-1}$相乘之后能够得到次大质因数为$\mathbb{P}_{y-1}$的数。这部分可以直接算。

关于次大质因数大于$\mathbb{P}_{y-1}$的，还是枚举递归暴力搜。然后还是没有算$f(\mathbb{P}_{i}^{j})$，手动加。

{% fold "Toggle Code" %}

```cpp
long long S(re long long n,re long long x,re int y){
	if(x<=1||g[y]>x)
		return 0;
	else{
		re int k=id[x<=sq?x:n/x+sq];
		re long long res=(y>1?g[y-1]:0)*(prmCnt[k]-y+1);
		for(re int i=y;i<=g[0]&&1LL*g[i]*g[i]<=x;++i)
			for(re long long p=g[i];p*g[i]<=x;p*=g[i])
				res+=S(n,x/p,i+1)+g[i];
		return res;
	}
}
```

{% endfold %}

[提交记录](http://uoj.ac/submission/324057)。

~~一道比一道神仙，像我这种菜鸡只能抄题解了（~~

### 课后习题

- [「LOJ572」「LibreOJ Round #11」Misaka Network与求和](https://loj.ac/problem/572)
- [「SP34096」DIVCNTK - Counting Divisors (general)](https://www.spoj.com/problems/DIVCNTK/)
- [「SP19985」GCDEX2 - GCD Extreme (hard)](https://www.spoj.com/problems/GCDEX2/)
- [「SP19975」APS2 - Amazing Prime Sequence (hard)](https://www.spoj.com/problems/APS2/)

### 其它文献

- https://www.luogu.org/blog/ShadowassIIXVIIIIV/solution-sp34096
- https://www.cnblogs.com/zhoushuyu/p/9187319.html
- https://www.cnblogs.com/cjyyb/p/10169190.html
