---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-04-14 17:16:32
title: 「NOI2016」循环之美
tags:
  - 数论
categories:
  - 题解
password:
---
突然被wzx安利的一道题。

[传送门](https://www.luogu.org/problemnew/show/P1587)

[wzx的题解](https://www.cnblogs.com/asuldb/p/10706088.html)

<!-- more -->

~~通过查阅fuge的题解，~~我们发现我们要求的式子是

$$\sum_{i=1}^{n}\sum_{j=1}^{m}[i\perp j][j\perp k]$$

$[i\perp j]$保证了这是一个最简分数从而不会算重，$[j\perp k]$保证了这是一个纯循环小数。

首先关于$[1,n]$中与某个常数$k$互质的数的数量，我们有一个结论

$$\sum_{i=1}^{n}[i\perp k]=\sum_{i=1}^{n}\sum_{x|i,x|k}\mu(x)=\sum_{x|k}\lfloor\cfrac{n}{x}\rfloor\mu(x)$$

然后大力整理

$$\begin{aligned}
\sum_{i=1}^{n}\sum_{j=1}^{m}[i\perp j][j\perp k]&=\sum_{j=1}^{m}[j\perp k]\sum_{i=1}^{n}[i\perp j]\\
&=\sum_{j=1}^{m}[j\perp k]\sum_{x|j}\lfloor\cfrac{n}{x}\rfloor\mu(x)\\
&=\sum_{x=1}^{m}\lfloor\cfrac{n}{x}\rfloor\mu(x)\sum_{x|j}[j\perp k]\\
&=\sum_{x=1}^{m}\lfloor\cfrac{n}{x}\rfloor\mu(x)\sum_{j=1}^{\tfrac{m}{x}}[jx\perp k]\\
&=\sum_{x=1}^{m}[x\perp k]\lfloor\cfrac{n}{x}\rfloor\mu(x)\sum_{j=1}^{\tfrac{m}{x}}[j\perp k]\\
&=\sum_{x=1}^{m}[x\perp k]\lfloor\cfrac{n}{x}\rfloor\mu(x)\sum_{y|k}\lfloor\cfrac{m}{xy}\rfloor\mu(y)
\end{aligned}$$

这道题有一个突破口在于，$k$的范围很小，只有$2000$，从而$d(k)$的范围会更小，这就使得我们能够暴力枚举$k$的约数来计算第二个$\sum$。

观察第一个$\sum$，我们发现，套上一层整除分块之后，我们需要计算的是

$$\sum_{i=1}^{n}f(i)$$

其中

$$f(n)=[n\perp k]\mu(n)$$

考虑杜教筛，我们再找来一个函数

$$g(n)=[n\perp k]$$

把它们卷积

$$\begin{aligned}
(f\times g)(n)&=\sum_{d|n}f(d)g(\cfrac{n}{d})\\
&=\sum_{d|n}[d\perp k][\cfrac{n}{d}\perp k]\mu(d)\\
&=[n\perp k]\sum_{d|n}\mu(d)\\
&=\epsilon(n)
\end{aligned}$$

然后就差不多了。

不过有一个问题，像这种对$n$和$m$同时整除分块的情况，不能用类似min_25的trick（$N\leqslant\sqrt{n}$时存到`ans1[N]`，否则存到`ans2[n/N]`），只能通过unordered_map或者Hash来记忆化。

代码如下

```cpp
#include<cstdio>
#include<tr1/unordered_map>
#define re register
#define maxn 1000000
#define min(a,b) ((a)<=(b)?(a):(b))

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

int n,m,k;
int d[50],f[maxn+1],g[maxn+1],mu[maxn+1],F[maxn+1];
std::tr1::unordered_map<int,long long> ans;

long long T(re int x){
	re long long res=0;
	for(re int i=1;i<=d[0];++i)
		res+=1LL*(x/d[i])*mu[d[i]];
	return res;
}

long long S(re int N){
	if(N<=maxn)
		return F[N];
	if(ans.count(N))
		return ans[N];
	re long long res=1,lst=T(1);
	for(re int l=2,r;l<=N;l=r+1){
		r=N/(N/l);
		re long long tmp=T(r);
		res-=S(N/l)*(tmp-lst);
		lst=tmp;
	}
	return ans[N]=res;
}

int main(){
	cltstream::read(n);
	cltstream::read(m);
	cltstream::read(k);
	for(re int i=1;i<=k;++i)
		if(k%i==0)
			d[++d[0]]=i;
	mu[1]=F[1]=1;
	for(re int i=2;i<=maxn;++i){
		if(!f[i]){
			g[++g[0]]=i;
			mu[i]=-1;
			F[i]=-(k%i!=0);
		}
		for(re int j=1;j<=g[0]&&i*g[j]<=maxn;++j){
			f[i*g[j]]=1;
			if(i%g[j]){
				mu[i*g[j]]=mu[i]*mu[g[j]];
				F[i*g[j]]=F[i]*F[g[j]];
			}
			else
				break;
		}
	}
	for(re int i=1;i<=maxn;++i)
		F[i]+=F[i-1];
	re long long res=0,lst=0;
	for(re int l=1,r;l<=n&&l<=m;l=r+1){
		r=min(n/(n/l),m/(m/l));
		re long long tmp=S(r);
		res+=(n/l)*T(m/l)*(tmp-lst);
		lst=tmp;
	}
	cltstream::write(res);
	clop();
	return 0;
}
```
