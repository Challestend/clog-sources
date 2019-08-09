---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-08-05 09:01:54
title: 「Luogu-P5349」幂
tags:
  - NTT
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problem/P5349)

<!-- more -->

~~其实挺休闲的一道题（~~

$$\sum_{i=0}f(i)r^{i}=\sum_{i=0}\sum_{j=0}^{m}f_{j}i^{j}r^{i}=\sum_{j=0}^{m}f_{j}\sum_{i=0}i^{j}r^{i}$$

于是我们设

$$g_{n}=\sum_{i=0}i^{n}r^{i}$$

$$\begin{aligned}
g_{n}&=\sum_{i=0}i^{n}r^{i}\\
&=\sum_{i=0}(i-1+1)^{n}r^{i}\\
&=\sum_{i=0}\sum_{j=0}^{n}\binom{n}{j}(i-1)^{j}r^{i}\\
&=\sum_{j=0}^{n}\binom{n}{j}\sum_{i=0}(i-1)^{j}r^{i}\\
&=n!\sum_{j=0}^{n}\cfrac{\sum_{i=0}(i-1)^{j}r^{i-1}}{j!}\cfrac{r}{(n-j)!}\\
\cfrac{g_{n}}{n!}&=\sum_{j=0}^{n}\cfrac{g_{j}}{j!}\cfrac{r}{(n-j)!}\\
\end{aligned}$$

我们不难发现卷积的形式。于是此题完。告辞。

~~怎么这么短啊（~~

```cpp
#include<cstdio>
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

int unit[2][24],rev[maxn];
int n,r;
int fac[maxn],fnv[maxn],F[maxn],G[maxn],H[maxn];

inline int cltpow(re int x,re int y){
	re int res=1;
	for(;y;x=1LL*x*x%mod,y>>=1)
		if(y&1)
			res=1LL*res*x%mod;
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
	int tmp[maxn];
	for(re int i=0;i<maxn;++i)
		G[i]=tmp[i]=0;
	G[0]=cltpow(F[0],mod-2);
	for(re int i=1,j=4;i<n;i<<=1,j<<=1){
		for(re int k=0;k<(i<<1);++k)
			tmp[k]=F[k];
		NTT(G,j,0);
		NTT(tmp,j,0);
		for(re int k=0;k<j;++k)
			G[k]=(2-1LL*tmp[k]*G[k]%mod+mod)*G[k]%mod;
		NTT(G,j,1);
		for(re int k=(i<<1);k<j;++k)
			G[k]=0;
	}
	for(re int i=n;i<maxn;++i)
		G[i]=0;
}

int main(){
	unit[0][23]=cltpow(3,119);
	unit[1][23]=cltpow(332748118,119);
	for(re int i=0;i<2;++i)
		for(re int j=22;j>=0;--j)
			unit[i][j]=1LL*unit[i][j+1]*unit[i][j+1]%mod;
	cltstream::read(n);
	cltstream::read(r);
	fac[0]=fac[1]=fnv[0]=fnv[1]=1;
	for(re int i=2;i<=n;++i)
		fnv[i]=(mod-1LL*mod/i*fnv[mod%i]%mod)%mod;
	for(re int i=2;i<=n;++i){
		fac[i]=1LL*fac[i-1]*i%mod;
		fnv[i]=1LL*fnv[i-1]*fnv[i]%mod;
	}
	for(re int i=0;i<=n;++i){
		cltstream::read(F[i]);
		H[i]=(mod-1LL*r*fnv[i]%mod)%mod;
	}
	++H[0];
	Inv(H,G,n+1);
	for(re int i=0;i<=n;++i)
		G[i]=1LL*G[i]*fac[i]%mod;
	re int ans=0;
	for(re int i=0;i<=n;++i)
		ans=(ans+1LL*F[i]*G[i]%mod)%mod;
	cltstream::write(ans);
	clop();
	return 0;
}
```
