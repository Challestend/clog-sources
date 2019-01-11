---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-04 11:14:12
title: 「AHOI2017/HNOI2017」礼物
tags:
  - AHOI
  - HNOI
  - 2017
  - NTT
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problemnew/show/P3723)

<!-- more -->

首先我们要有一个简单粗暴的暴力。

$$\min\limits_{x=0}^{n-1}\min\limits_{c_{1}=0,c_{2}=0}^{m}\sum\limits_{i=0}^{n-1}(A_{i}+c_{1}-B_{(i+x)\%n}-c_{2})^{2}$$

因为我们关心的只是两个数的差的平方，我们完全可以将$c_{1}$和$c_{2}$这两个非负整数合并成一个整数$c$。

$$\min\limits_{x=0}^{n-1}\min\limits_{c=-m}^{m}\sum\limits_{i=0}^{n-1}(A_{i}-B_{(i+x)\%n}+c)^{2}$$

我们仔细观察一下那个$\Sigma$。

$$\begin{aligned}
&\sum\limits_{i=0}^{n-1}(A_{i}-B_{(i+x)\%n}+c)^{2}\\
=&\sum\limits_{i=0}^{n-1}(A_{i}^{2}+B_{(i+x)\%n}^{2}+c^{2}-2A_{i}B_{(i+x)\%n}+2cA_{i}-2cB_{(i+x)\%n})\\
=&\sum\limits_{i=0}^{n-1}A_{i}^{2}+\sum\limits_{i=0}^{n-1}B_{i}^{2}+nc^{2}+2c(\sum\limits_{i=0}^{n-1}A_{i}-\sum\limits_{i=0}^{n-1}B_{i})-2\sum\limits_{i=0}^{n-1}A_{i}B_{(i+x)\%n}
\end{aligned}$$

首先$\Sigma A_{i}^{2}$和$\Sigma B_{i}^{2}$可以看成是常数项。

$nc^{2}+2c(\Sigma A_{i}-\Sigma B_{i})$可以看成是一个关于$c$的二次函数，令$k=(\Sigma A_{i}-\Sigma B_{i})$，我们知道它在$c=-\cfrac{k}{n}$处取得最小值。但是根据题意，$c$应当是一个整数，因此我们需要将$c=\lfloor -\cfrac{k}{n}\rfloor$和$c=\lceil -\cfrac{k}{n}\rceil$两者都代入原式，然后取较小值。

然后我们想要求出$\Sigma A_{i}B_{(i+x)\%n}$的最大值，加上上面那两项就是最终答案了。首先这个取模不好搞，我们把它拆开。

$$\sum\limits_{i=0}^{n-x-1}A_{i}B_{i+x}+\sum\limits_{i=0}^{x-1}A_{i-x+n}B_{i}$$

然后我们看到这个东西好像卷积啊，但是卷积要求两个下标加起来是常数，这个下标是加上一个数没办法卷积啊。

然后一想，我们可以倒过来搞啊。

定义$F^{R}(x)$是将$F(x)$的系数数组翻转过来得到的新多项式。于是我们可以将上式写成

$$\begin{aligned}
&\sum\limits_{i=0}^{n-x-1}A_{i}B^{R}_{n-x-1-i}+\sum\limits_{i=0}^{x-1}A^{R}_{x-1-i}B_{i}\\
=&(AB^{R})_{n-x-1}+(A^{R}B)_{x-1}
\end{aligned}$$

然后套一波多项式乘法的板子，扫一遍系数求个最大值就行了。需要注意的是当$x=0$的时候就只有$(AB^{R})_{n-1}$一项。

以下是代码：

```cpp
#include<cstdio>
#include<cmath>
#define re register
#define maxn 131072
#define mod 998244353
#define max(a,b) ((a)>=(b)?(a):(b))
#define min(a,b) ((a)<=(b)?(a):(b))
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

int n,m,ans,k,mx;
int unit[2][24],rev[maxn+1],A[maxn+1],B[maxn+1],C[maxn+1],D[maxn+1];

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
		if(i<rev[i])
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

int main(){
	cltstream::read(n);
	cltstream::read(m);
	for(re int i=0;i<n;++i){
		cltstream::read(A[i]);
		ans+=A[i]*A[i];
		k+=A[i];
		C[n-1-i]=A[i];
	}
	for(re int i=0;i<n;++i){
		cltstream::read(B[i]);
		ans+=B[i]*B[i];
		k-=B[i];
		D[n-1-i]=B[i];
	}
	ans+=min(n*floor(1.0*k/n)*floor(1.0*k/n)-2*k*floor(1.0*k/n),n*ceil(1.0*k/n)*ceil(1.0*k/n)-2*k*ceil(1.0*k/n));
	unit[0][23]=cltpow(3,119);
	unit[1][23]=cltpow(332748118,119);
	for(re int i=0;i<2;++i)
		for(re int j=22;j>=0;--j)
			unit[i][j]=1LL*unit[i][j+1]*unit[i][j+1]%mod;
	for(m=1;m<n;m<<=1);
	m<<=1;
	for(re int i=0;i<m;++i)
		rev[i]=(rev[i>>1]>>1)|((i&1)?(m>>1):0);
	NTT(A,m,0);
	NTT(B,m,0);
	NTT(C,m,0);
	NTT(D,m,0);
	for(re int i=0;i<m;++i){
		A[i]=1LL*A[i]*D[i]%mod;
		B[i]=1LL*B[i]*C[i]%mod;
	}
	NTT(A,m,1);
	NTT(B,m,1);
	mx=A[n-1];
	for(re int i=1;i<n;++i)
		mx=max(mx,A[n-1-i]+B[i-1]);
	cltstream::write(ans-=2*mx);
	clop();
	return 0;
}
```
