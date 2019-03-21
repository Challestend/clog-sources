---
mathjax: true
date: 2018-12-20 16:58:39
title: 「多项式学习笔记Part II」多项式的进阶操作
tags:
  - FFT
  - NTT
categories:
  - 学习笔记
---
以下，如果不特别声明，则所有运算在模$998244353$意义下进行。

<!-- more -->

### 接下来的前置知识

#### 泰勒展开

说实话，其实我也不是很能理解这个东西（

我就凭感觉xjb扯了（

现在我们有一个函数$f(x)$，我们想要用一个多项式$g(x)$来近似$x$在$x_{0}$附近时$f(x)$的取值。

我们令

$$g(x)=\sum\limits_{i=0}^{n}g[i](x-x_{0})^{i}$$

我们想要让$x\rightarrow x_{0}$时，$g$在$x$处的各阶导数与$f$在$x_{0}$处的各阶导数分别相等。

我们先考虑$0$阶，也就是原函数。因为$x\rightarrow x_{0}$，所有包含$x-x_{0}$的项都可以忽略，因此我们有

$$g[0]=f(x_{0})$$

然后是$1$阶

$$g^{\prime}(x)=\sum\limits_{i=1}^{n}ig[i](x-x_{0})^{i-1}=g[1]=f^{\prime}(x_{0})$$

再然后是$2$阶

$$g^{\prime\prime}(x)=\sum\limits_{i=2}^{n}i(i-1)g[i](x-x_{0})^{i-2}=2g[2]=f^{\prime\prime}(x_{0})$$

最后是$3$阶

$$g^{\prime\prime\prime}(x)=\sum\limits_{i=3}^{n}i(i-1)(i-2)g[i](x-x_{0})^{i-3}=6g[3]=f^{\prime\prime\prime}(x_{0})$$

我们发现$g[n]$有如下的规律

$$g[n]=\cfrac{f^{(n)}(x_{0})}{n!}$$

综上所述

$$g(x)=\sum\limits_{i=0}^{n}\cfrac{f^{(i)}(x_{0})}{i!}(x-x_{0})^i$$

~~应该吧（~~

#### 多项式牛顿迭代

考虑一个$n-1$次多项式$F(x)$，我们希望求出一个多项式$G(x)$，使得

$$F(G(x))\equiv 0\pmod{x^{n}}$$

我们采用倍增的思想，假设我们已经求出了一个$G_{0}$使得

$$F(G_{0})\equiv 0\pmod{x^{t}}$$

我们希望求出一个$G$使得

$$F(G)\equiv 0\pmod{x^{2t}}$$

我们将$F$在$G_{0}$这里进行泰勒展开：

$$\begin{aligned}
F(G)&=F(G_{0})\\
&+F^{\prime}(G_{0})(G-G_{0})\\
&+\cfrac{F^{\prime\prime}(G_{0})}{2}(G-G_{0})^{2}\\
&+\cdots\end{aligned}$$

注意到

$$\begin{aligned}
F(G)-F(G_{0})&\equiv 0\pmod{x^{t}}\\
G-G_{0}&\equiv 0\pmod{x^{t}}
\end{aligned}$$

也就是说$G-G_{0}$的最低非零系数的项数大于等于$t$，$(G-G_{0})^{k}$的最低非零系数的项数大于等于$kt$，从而我们有

$$\begin{aligned}
F(G)&\equiv F(G_{0})+F^{\prime}(G_{0})(G-G_{0})\pmod{x^{2t}}\\
F^{\prime}(G_{0})G&\equiv F^{\prime}(G_{0})G_{0}-F(G_{0})\pmod{x^{2t}}\\
G&\equiv G_{0}-\cfrac{F(G_{0})}{F^{\prime}(G_{0})}\pmod{x^{2t}}
\end{aligned}$$

然后我们就一直倍增，倍增到$t\geqslant n$为止，此时$G_{0}$即为所求多项式。

### [多项式求逆](https://www.luogu.org/problemnew/show/P4238)

给你一个$n-1$次多项式$F(x)$，让你求出一个多项式$G(x)$，使得

$$F(x)\times G(x)\equiv 1\pmod{x^{n}}$$

假设我们已经求出了$G_{0}$使得

$$F\times G_{0}\equiv 1\pmod{x^{t}}$$

我们希望找到一个$G$使得

$$F\times G\equiv 1\pmod{x^{2t}}$$

据说能用牛顿迭代推，然而我不会（

考虑正常一点的方式~~，虽然说还是倍增~~。

$$\begin{aligned}
F\times G-F\times G_{0}&\equiv 0\pmod{x^{t}}\\
G-G_{0}&\equiv 0\pmod{x^{t}}\\
(G-G_{0})^{2}&\equiv 0\pmod{x^{2t}}\\
G^{2}-2GG_{0}+G_{0}^{2}&\equiv 0\pmod{x^{2t}}
\end{aligned}$$

两边同时乘$F$

$$\begin{aligned}
G-2G_{0}+FG_{0}^{2}&\equiv 0\pmod{x^{2t}}\\
G&\equiv 2G_{0}-FG_{0}^{2}\pmod{x^{2t}}
\end{aligned}$$

边界条件也很明显，就是当$t=1$时，$G[0]\equiv F[0]^{-1}$。

说起来是很简单对吧……然而我真正开始写了才发现自己就是个傻子啥也不会（

关于代码……现在还不是时候（

后面有一道超级综合题在等着我们（

### [多项式对数函数](https://www.luogu.org/problemnew/show/P4725)

给你一个$n-1$次多项式$F(x)$，让你求出一个多项式$G(x)$，使得

$$G(x)\equiv\ln F(x)\pmod{x^{n}}$$

对上式两边求导

$$G^{\prime}\equiv F^{\prime}\ln^{\prime}F\pmod{x^{n}}$$

又因为

$$\ln^{\prime}x=\frac{1}{x}$$

我们就得到

$$G^{\prime}\equiv\cfrac{F^{\prime}}{F}\pmod{x^{n}}$$

求导+求逆+不定积分即可。

### [多项式指数函数](https://www.luogu.org/problemnew/show/P4726)

超级综合题来了。

给你一个$n-1$次多项式$F(x)$，让你求出一个多项式$G(x)$，使得

$$G(x)\equiv e^{F(x)}\pmod{x^{n}}$$

首先

$$\ln G-F\equiv 0\pmod{x^{n}}$$

我们把$F$看成是常数项，定义函数

$$A(G)=\ln G-F$$

$$A^{\prime}(G)=\ln^{\prime}G=\cfrac{1}{G}$$

套牛顿迭代

$$\begin{aligned}
G&\equiv G_{0}-\cfrac{A(G_{0})}{A{^\prime}(G_{0})}\\
&\equiv G_{0}(1-\ln G_{0}+F)\pmod{x^{2t}}
\end{aligned}$$

然后把以上提到的所有板子全都复制过来就行了（

```cpp
#include<cstdio>
#include<cstring>
#define re register
#define maxn 524288
#define mod 998244353
#define swap(a,b) a^=b,b^=a,a^=b

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
	#define clop() fwrite(cltstream::cltout,1,cltstream::oh-cltstream::cltout,stdout)
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

int n;
int unit[2][24],rev[maxn+1],inv[maxn+1]={0,1},F[maxn+1],G[maxn+1],tmp1[maxn+1],tmp2[maxn+1],tmp3[maxn+1],tmp4[maxn+1];

inline int cltpow(re int x,re int y){
	re int res=1;
	for(;y;){
		if(y&1)
			res=1LL*res*x%mod;
		x=1LL*x*x%mod;
		y>>=1;
	}
	return res;
}

inline void NTT(re int* F,re int n,re int tp){
	for(re int i=0;i<n;++i)
		if(i<(rev[i]=(rev[i>>1]>>1)|((i&1)?(n>>1):0)))
			swap(F[i],F[rev[i]]);
	for(re int k=1,p=1;p<n;++k,p<<=1)
		for(re int i=0;i<n;i+=p<<1)
			for(re int j=i,tmp=1;j<i+p;++j,tmp=1LL*tmp*unit[tp][k]%mod){
				re int x=F[j],y=1LL*F[j+p]*tmp%mod;
				F[j]=(x+y)%mod;
				F[j+p]=(x-y+mod)%mod;
			}
	re int v=cltpow(n,tp*(mod-2));
	for(re int i=0;i<n;++i)
		F[i]=1LL*F[i]*v%mod;
}

inline void Inv(re int* F,re int* G,re int n){
	G[0]=cltpow(F[0],mod-2);
	for(re int i=1,j=4;i<n;i<<=1,j<<=1){
		for(re int k=0;k<(i<<1);++k)
			tmp1[k]=F[k];
		NTT(tmp1,j,0);
		NTT(G,j,0);
		for(re int k=0;k<j;++k)
			G[k]=(2-1LL*tmp1[k]*G[k]%mod+mod)*G[k]%mod;
		NTT(G,j,1);
		for(re int k=(i<<1);k<j;++k)
			G[k]=0;
		for(re int k=0;k<j;++k)
			tmp1[k]=0;
	}
}

inline void Ln(re int* F,re int* G,re int n){
	for(re int i=1;i<n;++i)
		G[i-1]=1LL*F[i]*i%mod;
	Inv(F,tmp2,n);
	re int N=1;
	for(;N<n;N<<=1);
	N<<=1;
	NTT(G,N,0);
	NTT(tmp2,N,0);
	for(re int i=0;i<N;++i)
		G[i]=1LL*G[i]*tmp2[i]%mod;
	NTT(G,N,1);
	for(re int i=n-1;i>=1;--i)
		G[i]=1LL*G[i-1]*inv[i]%mod;
	G[0]=0;
	for(re int i=n;i<N;++i)
		G[i]=0;
	for(re int i=0;i<N;++i)
		tmp2[i]=0;
}

inline void Exp(re int* F,re int* G,re int n){
	G[0]=1;
	for(re int i=1,j=2;i<(n<<1);i<<=1,j<<=1){
		Ln(G,tmp3,i);
		for(re int k=0;k<i;++k)
			tmp4[k]=F[k];
		NTT(tmp3,j,0);
		NTT(tmp4,j,0);
		NTT(G,j,0);
		for(re int k=0;k<j;++k)
			G[k]=((1LL-tmp3[k]+tmp4[k])%mod+mod)*G[k]%mod;
		NTT(G,j,1);
		for(re int k=0;k<j;++k)
			tmp3[k]=tmp4[k]=0;
	}
}

int main(){
	unit[0][23]=cltpow(3,119);
	unit[1][23]=cltpow(332748118,119);
	for(re int i=0;i<2;++i)
		for(re int j=22;j>=0;--j)
			unit[i][j]=1LL*unit[i][j+1]*unit[i][j+1]%mod;
	for(re int i=2;i<=maxn;++i)
		inv[i]=(mod-1LL*mod/i*inv[mod%i]%mod)%mod;
	cltstream::read(n);
	for(re int i=0;i<n;++i)
		cltstream::read(F[i]);
	Exp(F,G,n);
	for(re int i=0;i<n;++i)
		cltstream::write(G[i],i<n-1?32:-1);
	clop();
	return 0;
}
```

### 多项式开平方根

给你一个$n-1$次多项式$F(x)$，让你求出一个多项式$G(x)$，使得

$$G^{2}(x)\equiv F(x)\pmod{x^{n}}$$

牛顿迭代吼啊！

$$A(G)=G^{2}-F$$

$$A^{\prime}(G)=2G$$

$$\begin{aligned}
G&\equiv G_{0}-\cfrac{A(G_{0})}{A{^\prime}(G_{0})}\\
&\equiv G_{0}-\cfrac{G_{0}^{2}-F}{2G_{0}}\\
&\equiv\cfrac{G_{0}^{2}+F}{2G_{0}}\\
&=\cfrac{1}{2}(G_{0}+\cfrac{F}{G_{0}})\pmod{x^{2t}}
\end{aligned}$$

~~复制粘贴吼啊！~~

### 我刚才都学了些啥破玩意

[一道例题](http://codeforces.com/contest/438/problem/E)。

[Remote Judge](https://www.luogu.org/problemnew/show/CF438E)。

这是读题前的我：

![](https://i.loli.net/2018/12/21/5c1c3e4d32b6f.gif)

这是读题后的我：

![](https://i.loli.net/2018/12/21/5c1c3e4d34c6e.jpg)

这是知道了这题正解是多项式开平方根后的我：

![](https://i.loli.net/2018/12/21/5c1c3f327ea74.jpg)

我……我怕不是学了个假的多项式哦（

厚颜无耻地抄题解（

首先我们搞出生成函数（然而并不是很懂）

$$G(x)=\sum\limits_{i=0}^{m}G[i]x^{i}$$

其中

$$G[i]=[i\in\{c_{1},c_{2},\cdots,c_{n}\}]$$

定义$F[i]$表示权值为$i$的神犇二叉树的数量，我们有

$$F[0]=1$$

$$F[x]=\sum\limits_{i=0}^{x}G[i]\sum\limits_{j=0}^{x-i}F[j]F[x-i-j]$$

就是先枚举根节点权值（$i$），再枚举左子树权值（$j$），然后算出右子树权值（$x-i-j$）。

然后是一些神仙操作

$$\begin{aligned}
F[x]&=\sum\limits_{i=0}^{x}G[i]\sum\limits_{j=0}^{x-i}F[j]F[x-i-j]\\
&=\sum\limits_{i=0}^{x}G[i]F^{2}[x-i]\\
&=(GF^{2})[x]
\end{aligned}$$

令人窒息（

然后我们就有

$$GF^{2}+1=F$$

但是为什么要$+1$？因为$F(0)=F[0]=1$而$G(0)=G[0]=0$。

于是解上面这个一元二次方程，我们得到

$$F=\cfrac{1\pm\sqrt{1-4G}}{2G}$$

但是这个形式还是不是很好搞，我们将分子分母同时乘$(1\mp\sqrt{1-4G})$，然后化简一波

$$F=\cfrac{2}{1\mp\sqrt{1-4G}}$$

如果根号前取负，代入$x=0$，分母就减成$0$了；而如果取正，我们就得到很健康的$\cfrac{2}{2}=1$。综上所述

$$F=\cfrac{2}{1+\sqrt{1-4G}}$$

本来接下来应该有代码实现的，但是~~我拒绝~~咕咕咕。

~~其实是调不出来了（~~
