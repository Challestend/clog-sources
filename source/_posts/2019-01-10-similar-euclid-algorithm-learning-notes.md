---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-10 13:37:33
title: 类欧几里得算法学习笔记
tags:
  - 数论
  - 类欧几里得
categories:
  - 学习笔记
password:
---
其实我也不知道这个算法的英文名是啥（

我就yy出来一个「Similar Euclid Algorithm」（

<!-- more -->

给你六个非负整数$n,a,b,c,k_{1},k_{2}$，你需要求出

$$\sum_{i=0}^{n}i^{k_{1}}\lfloor\cfrac{ai+b}{c}\rfloor^{k_{2}}\pmod{1000000007}$$

$n,a,b,c\leqslant 10^{9}$，$k_{1}+k_{2}\leqslant 10$。

![](https://i.loli.net/2019/01/10/5c36dbda14c92.jpg)

太难了，告辞（

所以我们现在来研究简单一点的。

给你四个非负整数$n,a,b,c$，你需要求出

$$\begin{aligned}
f(n,a,b,c)&\equiv\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor\pmod{998244353}\\
g(n,a,b,c)&\equiv\sum_{i=0}^{n}i\lfloor\cfrac{ai+b}{c}\rfloor\pmod{998244353}\\
h(n,a,b,c)&\equiv\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor^{2}\pmod{998244353}
\end{aligned}$$

$n,a,b,c\leqslant 10^{9}$，$10^{5}$组询问。

[传送门](https://www.luogu.org/problemnew/show/P5170)

于是我们开始愉快地推式子。首先我们暂不考虑取模，也就是下文中先用等号代替同余。

首先考虑$f(n,a,b,c)$，假设$a\geqslant c\vee b\geqslant c$

$$\begin{aligned}
f(n,a,b,c)&=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor\\
&=\sum_{i=0}^{n}\left(\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor+i\lfloor\cfrac{a}{c}\rfloor+\lfloor\cfrac{b}{c}\rfloor\right)\\
&=\sum_{i=0}^{n}\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor+\cfrac{n(n+1)}{2}\lfloor\cfrac{a}{c}\rfloor+(n+1)\lfloor\cfrac{b}{c}\rfloor\\
&=f(n,a\operatorname{mod}c,b\operatorname{mod}c,c)+\cfrac{n(n+1)}{2}\lfloor\cfrac{a}{c}\rfloor+(n+1)\lfloor\cfrac{b}{c}\rfloor
\end{aligned}$$

也就是说，我们只需要重点关注$a\lt c\wedge b\lt c$时的情况即可。我们令$m=\lfloor\cfrac{an+b}{c}\rfloor$，然后继续往下推

$$\begin{aligned}
f(n,a,b,c)&=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor\\
&=\sum_{i=0}^{n}\sum_{j=1}^{m}\left[j\leqslant\lfloor\cfrac{ai+b}{c}\rfloor\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[cj+c\leqslant ai+b\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[ai\geqslant cj+c-b\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[i\geqslant\cfrac{cj+c-b}{a}\right]\\
\end{aligned}$$

然后我们发现，我们可能需要在$\cfrac{cj+c-b}{a}$周围来一个上取整，然而上取整并没有什么比较好的性质。

考虑转换一下思路。既然$cj+c\leqslant ai+b$，我们就有$cj+c\lt ai+b+1$，然后再往下

$$\begin{aligned}
f(n,a,b,c)&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[cj+c\lt ai+b+1\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[ai\gt cj+c-b-1\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}\left[i\gt\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right]\\
&=\sum_{j=0}^{m-1}\left(n-\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right)\\
&=mn-\sum_{j=0}^{m-1}\lfloor\cfrac{cj+c-b-1}{a}\rfloor\\
&=mn-f(m-1,c,c-b-1,a)
\end{aligned}$$

然后我们看到，这个函数它递归了！

注意到$(a,b,c)$变成了$(c,c-b-1,a)$，虽然我不是很能理解，反正这个东西最多递归$\log a$次，时间复杂度就是$O(\log a)$了。

然后考虑$g(n,a,b,c)$。

$a\geqslant c\vee b\geqslant c$：

$$\begin{aligned}
g(n,a,b,c)&=\sum_{i=0}^{n}i\lfloor\cfrac{ai+b}{c}\rfloor\\
&=\sum_{i=0}^{n}\left(i\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor+i^{2}\lfloor\cfrac{a}{c}\rfloor+i\lfloor\cfrac{b}{c}\rfloor\right)\\
&=\sum_{i=0}^{n}i\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor+\cfrac{n(n+1)}{2}\lfloor\cfrac{b}{c}\rfloor\\
&=g(n,a\operatorname{mod}c,b\operatorname{mod}c,c)+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor+\cfrac{n(n+1)}{2}\lfloor\cfrac{b}{c}\rfloor
\end{aligned}$$

$a\lt c\wedge b\lt c$，当然$m$还是$\lfloor\cfrac{an+b}{c}\rfloor$：

$$\begin{aligned}
g(n,a,b,c)&=\sum_{i=0}^{n}i\lfloor\cfrac{ai+b}{c}\rfloor\\
&=\sum_{i=0}^{n}\sum_{j=1}^{m}i\left[j\leqslant\lfloor\cfrac{ai+b}{c}\rfloor\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m-1}i\left[i\gt\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right]
\end{aligned}$$

我们可以把上面这个式子理解成$\gt\lfloor\cfrac{cj+c-b-1}{a}\rfloor$且$\leqslant n$的所有自然数之和，于是差分一下我们得到

$$\begin{aligned}
g(n,a,b,c)&=\sum_{j=0}^{m-1}\left(\cfrac{n(n+1)}{2}-\cfrac{1}{2}\lfloor\cfrac{cj+c-b-1}{a}\rfloor^{2}-\cfrac{1}{2}\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right)\\
&=\cfrac{mn(n+1)}{2}-\cfrac{1}{2}\sum_{j=0}^{m-1}\lfloor\cfrac{cj+c-b-1}{a}\rfloor^{2}-\cfrac{1}{2}\sum_{j=0}^{m-1}\lfloor\cfrac{cj+c-b-1}{a}\rfloor\\
&=\cfrac{mn(n+1)}{2}-\cfrac{1}{2}h(m-1,c,c-b-1,a)-\cfrac{1}{2}f(m-1,c,c-b-1,a)
\end{aligned}$$

我们看到这个函数调用了$h(n,a,b,c)$，我们接下来就来研究一下这个函数。

$a\geqslant c\vee b\geqslant c$：

$$\begin{aligned}
h(n,a,b,c)&=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor^{2}\\
&=\sum_{i=0}^{n}\left(\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor+i\lfloor\cfrac{a}{c}\rfloor+\lfloor\cfrac{b}{c}\rfloor\right)^{2}\\
&=\sum_{i=0}^{n}\left(
\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor^{2}
+i^{2}\lfloor\cfrac{a}{c}\rfloor^{2}
+\lfloor\cfrac{b}{c}\rfloor^{2}
+2i\lfloor\cfrac{a}{c}\rfloor\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor
+2\lfloor\cfrac{b}{c}\rfloor\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor
+2i\lfloor\cfrac{a}{c}\rfloor\lfloor\cfrac{b}{c}\rfloor
\right)\\
&=
\sum_{i=0}^{n}\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor^{2}
+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor^{2}
+(n+1)\lfloor\cfrac{b}{c}\rfloor^{2}\\&
+2\lfloor\cfrac{a}{c}\rfloor\sum_{i=0}^{n}i\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor
+2\lfloor\cfrac{b}{c}\rfloor\sum_{i=0}^{n}\lfloor\cfrac{(a\operatorname{mod}c)i+(b\operatorname{mod}c)}{c}\rfloor
+n(n+1)\lfloor\cfrac{a}{c}\rfloor\lfloor\cfrac{b}{c}\rfloor
\\
&=
h(n,a\operatorname{mod}c,b\operatorname{mod}c,c)
+2\lfloor\cfrac{a}{c}\rfloor g(n,a\operatorname{mod}c,b\operatorname{mod}c,c)
+2\lfloor\cfrac{b}{c}\rfloor f(n,a\operatorname{mod}c,b\operatorname{mod}c,c)\\&
+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor^{2}
+(n+1)\lfloor\cfrac{b}{c}\rfloor^{2}
+n(n+1)\lfloor\cfrac{a}{c}\rfloor\lfloor\cfrac{b}{c}\rfloor
\end{aligned}$$

您绝对想象不到上面这一坨子东西的$\TeX$源码长什么样（

$a\lt c\wedge b\lt c$：

$$\begin{aligned}
h(n,a,b,c)&=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor^{2}\\
&=\sum_{i=0}^{n}\sum_{j=1}^{m^{2}}\left[j\leqslant\lfloor\cfrac{ai+b}{c}\rfloor^{2}\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m^{2}-1}\left[c^{2}j+c^{2}\lt a^{2}i^{2}+2abi+b^{2}+1\right]\\
&=\sum_{i=0}^{n}\sum_{j=0}^{m^{2}-1}\left[i\gt\sqrt{\lfloor\cfrac{c^{2}j+c^{2}-2abi-b^{2}-1}{a^{2}}\rfloor}\right]
\end{aligned}$$

![](https://i.loli.net/2019/01/10/5c36e7ca7de6a.jpg)

然后我们发现推不下去了。

不过办法总是有的。首先我们有一个看起来没啥用的式子

$$x^{2}=2\sum_{i=1}^{n}i-x$$

套进去

$$\begin{aligned}
h(n,a,b,c)&=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor^{2}\\
&=\sum_{i=0}^{n}\left(2\sum_{j=1}^{\lfloor\tfrac{ai+b}{c}\rfloor}j-\lfloor\cfrac{ai+b}{c}\rfloor\right)\\
&=2\sum_{i=0}^{n}\sum_{j=1}^{\lfloor\tfrac{ai+b}{c}\rfloor}j-\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor\\
&=2\sum_{j=1}^{m}j\sum_{i=0}^{n}\left[j\leqslant\lfloor\cfrac{ai+b}{c}\rfloor\right]-f(n,a,b,c)\\
&=2\sum_{j=0}^{m-1}(j+1)\sum_{i=0}^{n}\left[i\gt\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right]-f(n,a,b,c)\\
&=2\sum_{j=0}^{m-1}(j+1)\left(n-\lfloor\cfrac{cj+c-b-1}{a}\rfloor\right)-f(n,a,b,c)\\
&=m(m+1)n-2\sum_{j=0}^{m-1}j\lfloor\cfrac{cj+c-b-1}{a}\rfloor-2\sum_{j=0}^{m-1}\lfloor\cfrac{cj+c-b-1}{a}\rfloor-f(n,a,b,c)\\
&=m(m+1)n-2g(m-1,c,c-b-1,a)-2f(m-1,c,c-b-1,a)-f(n,a,b,c)\\
\end{aligned}$$

然后我们看到它奇迹般地递归了！

我们来总结一下。

$$f(n,a,b,c)=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor=\begin{cases}
&f(n,a\operatorname{mod}c,b\operatorname{mod}c,c)+\cfrac{n(n+1)}{2}\lfloor\cfrac{a}{c}\rfloor+(n+1)\lfloor\cfrac{b}{c}\rfloor\;\;&(a\geqslant c\vee b\geqslant c)\\
&mn-f(m-1,c,c-b-1,a)&(a\lt c\wedge b\lt c)
\end{cases}$$

$$g(n,a,b,c)=\sum_{i=0}^{n}i\lfloor\cfrac{ai+b}{c}\rfloor=\begin{cases}
&g(n,a\operatorname{mod}c,b\operatorname{mod}c,c)+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor+\cfrac{n(n+1)}{2}\lfloor\cfrac{b}{c}\rfloor\;\;&(a\geqslant c\vee b\geqslant c)\\
&\cfrac{mn(n+1)}{2}-\cfrac{1}{2}h(m-1,c,c-b-1,a)-\cfrac{1}{2}f(m-1,c,c-b-1,a)&(a\lt c\wedge b\lt c)
\end{cases}$$

$$h(n,a,b,c)=\sum_{i=0}^{n}\lfloor\cfrac{ai+b}{c}\rfloor^{2}=\begin{cases}
&h(n,a\operatorname{mod}c,b\operatorname{mod}c,c)
+2\lfloor\cfrac{a}{c}\rfloor g(n,a\operatorname{mod}c,b\operatorname{mod}c,c)
+2\lfloor\cfrac{b}{c}\rfloor f(n,a\operatorname{mod}c,b\operatorname{mod}c,c)\\&
+\cfrac{n(n+1)(2n+1)}{6}\lfloor\cfrac{a}{c}\rfloor^{2}
+(n+1)\lfloor\cfrac{b}{c}\rfloor^{2}
+n(n+1)\lfloor\cfrac{a}{c}\rfloor\lfloor\cfrac{b}{c}\rfloor\;\;
&(a\geqslant c\vee b\geqslant c)\\
&m(m+1)n-2g(m-1,c,c-b-1,a)-2f(m-1,c,c-b-1,a)-f(n,a,b,c)&(a\lt c\wedge b\lt c)
\end{cases}$$

但是还有一个细节，如果说$n=0$或$a=0$，我们需要直接特判，大概像这样：

$$f(n,a,b,c)=\begin{cases}
&\lfloor\cfrac{b}{c}\rfloor\;\;&(n=0)\\
&(n+1)\lfloor\cfrac{b}{c}\rfloor&(a=0)
\end{cases}$$

$$g(n,a,b,c)=\begin{cases}
&0\;\;&(n=0)\\
&\cfrac{n(n+1)}{2}\lfloor\cfrac{b}{c}\rfloor&(a=0)
\end{cases}$$

$$h(n,a,b,c)=\begin{cases}
&\lfloor\cfrac{b}{c}\rfloor^{2}&(n=0)\\
&(n+1)\lfloor\cfrac{b}{c}\rfloor^{2}&(a=0)
\end{cases}$$

另外写的时候注意三个函数值要套在结构体里一起算，不然还是会T。

```cpp
#include<cstdio>
#define re register
#define mod 998244353

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

int t,a,b,c,n,I2=499122177,I6=166374059;
struct Query{
	int f,g,h;

	Query(re int _f,re int _g,re int _h){
		f=_f;
		g=_g;
		h=_h;
	}
};

inline Query query(re int a,re int b,re int c,re int n){
	if(!n){
		b/=c;
		return Query(b,0,1LL*b*b%mod);
	}
	if(!a){
		b/=c;
		return Query(1LL*(n+1)*b%mod,1LL*n*(n+1)%mod*I2%mod*b%mod,1LL*(n+1)*b%mod*b%mod);
	}
	if(a>=c||b>=c){
		re Query res=query(a%c,b%c,c,n);
		a/=c,
		b/=c;
		return Query(
			(res.f+1LL*n*(n+1)%mod*I2%mod*a%mod+1LL*(n+1)*b%mod)%mod,
			(res.g+1LL*n*(n+1)%mod*(2*n+1)%mod*I6%mod*a%mod+1LL*n*(n+1)%mod*I2%mod*b%mod)%mod,
			(res.h+2LL*a*res.g%mod+2LL*b*res.f%mod
				  +1LL*n*(n+1)%mod*(2*n+1)%mod*I6%mod*a%mod*a%mod
				  +1LL*(n+1)*b%mod*b%mod+1LL*n*(n+1)%mod*a%mod*b%mod)%mod
		);
	}
	else{
		re int m=(1LL*a*n+b)/c;
		re Query res=query(c,c-b-1,a,m-1);
		re int tmp=((1LL*m*n%mod-res.f)%mod+mod)%mod;
		return Query(
			tmp,
			((1LL*m*n%mod*(n+1)%mod-res.h-res.f)%mod+mod)*I2%mod,
			((1LL*m*(m+1)%mod*n%mod-2LL*res.g%mod-2LL*res.f%mod-tmp)%mod+mod)%mod
		);
	}
}

int main(){
	cltstream::read(t);
	for(;t;--t){
		cltstream::read(n);
		cltstream::read(a);
		cltstream::read(b);
		cltstream::read(c);
		Query ans=query(a,b,c,n);
		cltstream::write(ans.f,32);
		cltstream::write(ans.h,32);
		cltstream::write(ans.g,10);
	}
	clop();
	return 0;
}
```

那么问题来了，这个东西有什么用啊。

~~没啥用（~~

其他的模板题我就不举了，我们来看一下[这样一道题](https://www.luogu.org/problemnew/show/P4433)。

看到推平操作我们可以直接往珂朵莉树上想了。

那么对于被推平的一段区间，我们将其压成一个节点丢到珂朵莉树上，然后维护六个信息`l,r,L,R,a,b`，表示其对应原序列中的$[l,r]$这段区间，里面一共有$\sum_{i=L}^{R}ai\operatorname{mod}b$颗石头。注意这里的`l,r,L,R`一定不要搞混~~，我就是因为这样WA了整整四遍（~~。

~~这三个样例一定是故意的。~~

然后每次我们初始化一个节点的时候直接算出节点内的石头总数，像下面这样：

$$\sum_{i=L}^{R}ai\operatorname{mod}b=\sum_{i=L}^{R}\left(ai-\lfloor\cfrac{ai}{b}\rfloor b\right)=\cfrac{(R+L)(R-L+1)}{2}-\sum_{i=0}^{R}\lfloor\cfrac{ai}{b}\rfloor b+\sum_{i=0}^{L-1}\lfloor\cfrac{ai}{b}\rfloor b$$

直接一波板子套上去。

还有就是，这么算的话中间量会爆`long long`，我们可以考虑用`__int128_t`来存。不过这个类型在本地一般是编译不了的，虽然说交到OJ上基本没问题。我们可以

```cpp
#ifdef ONLINE_JUDGE
	#define int __int128_t
#endif
```

然后把一些没必要用或者是不能用`__int128_t`的改成`signed`即可。

代码还是有必要贴一下的。

```cpp
#include<cstdio>
#include<iostream>
#include<set>
#define re register
#define _it std::set<node>::iterator
#ifdef ONLINE_JUDGE
	#define int __int128_t
#endif

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
		signed sn=1;
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
			signed digit[50];
			for(digit[0]=0;x;digit[++digit[0]]=x%10,x/=10);
			for(;digit[0];pc(digit[digit[0]--]^48));
		}
		if(text>=0)
			pc(text);
	}
}

int n,m;

inline int simEuc(re int n,re int a,re int b,re int c){
	if(!n)
		return b/c;
	if(!a)
		return (n+1)*(b/c);
	if(a>=c||b>=c){
		re int res=simEuc(n,a%c,b%c,c);
		return res+n*(n+1)*(a/c)/2+(n+1)*(b/c);
	}
	else{
		re int m=(a*n+b)/c;
		return m*n-simEuc(m-1,c,c-b-1,a);
	}
}

struct node{
	int l,r,L,R,a,b,sum;

	node(re int _l,re int _r,re int _L,re int _R,re int _a,re int _b){
		l=_l;
		r=_r;
		L=_L;
		R=_R;
		a=_a;
		b=_b;
		sum=(R+L)*(R-L+1)*a/2-simEuc(R,a,0,b)*b+simEuc(L-1,a,0,b)*b;
	}
};
std::set<node> s;

inline bool operator<(re node p1,re node p2){
	return p1.l<p2.l;
}

inline _it split(re int pos){
	re _it it=s.lower_bound(node(pos,0,1,0,0,1));
	if(it!=s.end()&&it->l==pos)
		return it;
	else{
		--it;
		re int l=it->l,r=it->r,L=it->L,R=it->R,a=it->a,b=it->b;
		s.erase(it);
		s.insert(node(l,pos-1,L,L+pos-l-1,a,b));
		return s.insert(node(pos,r,L+pos-l,R,a,b)).first;
	}
}

inline void modifyStone(re int l,re int r,re int a,re int b){
	re _it itr=split(r+1),itl=split(l);
	s.erase(itl,itr);
	s.insert(node(l,r,1,r-l+1,a,b));
}

inline int queryStone(re int l,re int r){
	re _it itr=split(r+1),itl=split(l);
	re int res=0;
	for(;itl!=itr;res+=itl->sum,++itl);
	return res;
}

signed main(){
	cltstream::read(n);
	cltstream::read(m);
	s.insert(node(1,n,1,0,0,1));
	for(re int i=1;i<=m;++i){
		re int opt,l,r,a,b;
		cltstream::read(opt);
		cltstream::read(l);
		cltstream::read(r);
		if(opt==1){
			cltstream::read(a);
			cltstream::read(b);
			modifyStone(l,r,a,b);
		}
		else
			cltstream::write(queryStone(l,r),10);
	}
	clop();
	return 0;
}
```
