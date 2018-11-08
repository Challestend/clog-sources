---
title: 「Luogu-P5009」毒瘤分块题
date: 2018-11-08 08:04:22
tags: [洛谷,线段树]
categories: [题解]
mathjax: true
---
[传送门](https://www.luogu.org/problemnew/show/P5009)

<!-- more -->

从来没做过这么毒瘤的题qaq

就算看了题解现在还是一脸懵逼qaq

首先，题目带了分块，我们可以先考虑分块。但是我太菜了不知道分块怎么写，所以我写的线段树qaq

对$v$的修改相对来说比较简单，我们来重点看对$a$和$b$的修改。假设在某个时刻$t_1$，我们将某个$a_i$加上了$x$，然后又在某个时刻$t_2(t_2>t_1)$，我们要查询之前那个位置上的值，很明显地，答案应该是$v_i+t_1a_ib_i+(t_2-t_1)(a_i+x)b_i$。但是如果真的像这样计算，每次修改就要在这个表达式后面加上一项，很难有效地维护大量的修改。考虑到对$v$的修改比较简单，我们可以通过修改$v$将表达式维持在一个较为简单的形式。形式化地，我们可以找到一个$v_i^\prime$使得$v_i^\prime+t_1(a_i+x)b_i=v+t_1a_ib_i$，并将$v_i$修改至$v_i^\prime$，然后查询的时候我们就可以直接返回$v_i^\prime+t_2(a_i+x)b_i$了。不难发现$v_i^\prime=v_i-t_1xb_i$。

需要注意的是，因为我们要使用线段树维护，必然会遇到同一个区间被连续修改多次的情况。假设有这样一个区间，区间内$a$的总修改值是$x$，$b$的总修改值是$y$，那么在某一时刻$t$，该区间内所有值的和应该是$\Sigma v_i+t\Sigma (a_i+x)(b_i+y)$。现在我们考虑将$a$加上$z$，此时$\Sigma v_i^\prime+t\Sigma (a_i+x+z)(b_i+y)=\Sigma v_i+t\Sigma (a_i+x)(b_i+y)$，即$\Sigma v_i^\prime=\Sigma v_i-tz\Sigma (b_i+y)$。

不过，上式中$tz\Sigma (b_i+y)$的$(b_i+y)$指的是修改后的$b_i$的值，我们是肯定不能在下推标记时存储每一个历史版本的$b_i$的。我们考虑拆括号，将上式拆成$tz\Sigma b_i+tzy$，其中$tzy$是一个常数，我们可以直接累加入标记。而至于$tz\Sigma b_i$，考虑到每层节点的$\Sigma b_i$都不同，我们可以维护一个$B$，意思是$\Sigma v_i+=B\Sigma b_i$，每次修改时$B+=tz$。当然，我们还需要一个标记来记录对$a$自身的修改。对$b$的修改也是类似的。

然后是毒瘤的下推标记。

```cpp
addv[son]+=A[father]*suma[son]+B[father]*sumb[son]+addv[father];
//就是上面这句qaq现在还是一脸懵逼qaq
A[son]+=A[father];
B[son]+=B[father];
adda[son]+=adda[father];
addb[son]+=addf[father];
```

其实我也不知道我上面在扯些啥，所以以下是代码~~，反正应该没人能看懂我的清奇写法（~~

```cpp
#include<cstdio>
#define re register
#define maxn 200005
#define maxm 200005
#define mod 100000007

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

int n,m;
int sumv[(maxn<<2)+1],suma[(maxn<<2)+1],sumb[(maxn<<2)+1],sump[(maxn<<2)+1];
int A[(maxn<<2)+1],B[(maxn<<2)+1];
int addv[(maxn<<2)+1],adda[(maxn<<2)+1],addb[(maxn<<2)+1];

inline void pushDown(int cur,int ln,int rn){
	sumv[cur<<1]=(sumv[cur<<1]+1LL*A[cur]*suma[cur<<1]%mod)%mod;
	sumv[cur<<1]=(sumv[cur<<1]+1LL*B[cur]*sumb[cur<<1]%mod)%mod;
	sumv[cur<<1]=(sumv[cur<<1]+1LL*ln*addv[cur]%mod)%mod;
	sump[cur<<1]=(sump[cur<<1]+1LL*adda[cur]*sumb[cur<<1]%mod)%mod;
	sump[cur<<1]=(sump[cur<<1]+1LL*addb[cur]*suma[cur<<1]%mod)%mod;
	sump[cur<<1]=(sump[cur<<1]+1LL*adda[cur]*addb[cur]%mod*ln%mod)%mod;
	suma[cur<<1]=(suma[cur<<1]+1LL*ln*adda[cur]%mod)%mod;
	sumb[cur<<1]=(sumb[cur<<1]+1LL*ln*addb[cur]%mod)%mod;
	addv[cur<<1]=(addv[cur<<1]+1LL*A[cur]*adda[cur<<1]%mod)%mod;
	addv[cur<<1]=(addv[cur<<1]+1LL*B[cur]*addb[cur<<1]%mod)%mod;
	addv[cur<<1]=(addv[cur<<1]+addv[cur])%mod;
	A[cur<<1]=(A[cur<<1]+A[cur])%mod;
	B[cur<<1]=(B[cur<<1]+B[cur])%mod;
	adda[cur<<1]=(adda[cur<<1]+adda[cur])%mod;
	addb[cur<<1]=(addb[cur<<1]+addb[cur])%mod;
	sumv[cur<<1|1]=(sumv[cur<<1|1]+1LL*A[cur]*suma[cur<<1|1]%mod)%mod;
	sumv[cur<<1|1]=(sumv[cur<<1|1]+1LL*B[cur]*sumb[cur<<1|1]%mod)%mod;
	sumv[cur<<1|1]=(sumv[cur<<1|1]+1LL*rn*addv[cur]%mod)%mod;
	sump[cur<<1|1]=(sump[cur<<1|1]+1LL*adda[cur]*sumb[cur<<1|1]%mod)%mod;
	sump[cur<<1|1]=(sump[cur<<1|1]+1LL*addb[cur]*suma[cur<<1|1]%mod)%mod;
	sump[cur<<1|1]=(sump[cur<<1|1]+1LL*adda[cur]*addb[cur]%mod*rn%mod)%mod;
	suma[cur<<1|1]=(suma[cur<<1|1]+1LL*rn*adda[cur]%mod)%mod;
	sumb[cur<<1|1]=(sumb[cur<<1|1]+1LL*rn*addb[cur]%mod)%mod;
	addv[cur<<1|1]=(addv[cur<<1|1]+1LL*A[cur]*adda[cur<<1|1]%mod)%mod;
	addv[cur<<1|1]=(addv[cur<<1|1]+1LL*B[cur]*addb[cur<<1|1]%mod)%mod;
	addv[cur<<1|1]=(addv[cur<<1|1]+addv[cur])%mod;
	A[cur<<1|1]=(A[cur<<1|1]+A[cur])%mod;
	B[cur<<1|1]=(B[cur<<1|1]+B[cur])%mod;
	adda[cur<<1|1]=(adda[cur<<1|1]+adda[cur])%mod;
	addb[cur<<1|1]=(addb[cur<<1|1]+addb[cur])%mod;
	A[cur]=B[cur]=addv[cur]=adda[cur]=addb[cur]=0;
}

inline void pushUp(int cur){
	sumv[cur]=(sumv[cur<<1]+sumv[cur<<1|1])%mod;
	suma[cur]=(suma[cur<<1]+suma[cur<<1|1])%mod;
	sumb[cur]=(sumb[cur<<1]+sumb[cur<<1|1])%mod;
	sump[cur]=(sump[cur<<1]+sump[cur<<1|1])%mod;
}

void build(int cur,int l,int r){
	if(l==r){
		cltstream::read(sumv[cur]);
		cltstream::read(suma[cur]);
		cltstream::read(sumb[cur]);
		sumv[cur]=(sumv[cur]%mod+mod)%mod;
		suma[cur]=(suma[cur]%mod+mod)%mod;
		sumb[cur]=(sumb[cur]%mod+mod)%mod;
		sump[cur]=1LL*suma[cur]*sumb[cur]%mod;
	}
	else{
		int mid=(l+r)>>1;
		build(cur<<1,l,mid);
		build(cur<<1|1,mid+1,r);
		pushUp(cur);
	}
}

int query(int L,int R,int t,int cur,int l,int r){
	if(l>=L&&r<=R)
		return (sumv[cur]+1LL*t*sump[cur]%mod)%mod;
	else{
		int mid=(l+r)>>1,res=0;
		pushDown(cur,mid-l+1,r-mid);
		if(L<=mid)
			res=(res+query(L,R,t,cur<<1,l,mid))%mod;
		if(R>mid)
			res=(res+query(L,R,t,cur<<1|1,mid+1,r))%mod;
		return res;
	}
}

void modifyV(int L,int R,int x,int cur,int l,int r){
	if(l>=L&&r<=R){
		sumv[cur]=(sumv[cur]+1LL*(r-l+1)*x%mod)%mod;
		addv[cur]=(addv[cur]+x)%mod;
	}
	else{
		int mid=(l+r)>>1;
		pushDown(cur,mid-l+1,r-mid);
		if(L<=mid)
			modifyV(L,R,x,cur<<1,l,mid);
		if(R>mid)
			modifyV(L,R,x,cur<<1|1,mid+1,r);
		pushUp(cur);
	}
}

void modifyA(int L,int R,int t,int x,int cur,int l,int r){
	if(l>=L&&r<=R){
		sumv[cur]=(sumv[cur]+(-1LL*x*t%mod*sumb[cur]%mod+mod)%mod)%mod;
		suma[cur]=(suma[cur]+1LL*(r-l+1)*x%mod)%mod;
		sump[cur]=(sump[cur]+1LL*sumb[cur]*x%mod)%mod;
		B[cur]=(B[cur]+(-1LL*x*t%mod+mod)%mod)%mod;
		addv[cur]=(addv[cur]+(-1LL*x*t%mod*addb[cur]%mod+mod)%mod)%mod;
		adda[cur]=(adda[cur]+x)%mod;
	}
	else{
		int mid=(l+r)>>1;
		pushDown(cur,mid-l+1,r-mid);
		if(L<=mid)
			modifyA(L,R,t,x,cur<<1,l,mid);
		if(R>mid)
			modifyA(L,R,t,x,cur<<1|1,mid+1,r);
		pushUp(cur);
	}
}

void modifyB(int L,int R,int t,int x,int cur,int l,int r){
	if(l>=L&&r<=R){
		sumv[cur]=(sumv[cur]+(-1LL*x*t%mod*suma[cur]%mod+mod)%mod)%mod;
		sumb[cur]=(sumb[cur]+1LL*(r-l+1)*x%mod)%mod;
		sump[cur]=(sump[cur]+1LL*suma[cur]*x%mod)%mod;
		A[cur]=(A[cur]+(-1LL*x*t%mod+mod)%mod)%mod;
		addv[cur]=(addv[cur]+(-1LL*x*t%mod*adda[cur]%mod+mod)%mod)%mod;
		addb[cur]=(addb[cur]+x)%mod;
	}
	else{
		int mid=(l+r)>>1;
		pushDown(cur,mid-l+1,r-mid);
		if(L<=mid)
			modifyB(L,R,t,x,cur<<1,l,mid);
		if(R>mid)
			modifyB(L,R,t,x,cur<<1|1,mid+1,r);
		pushUp(cur);
	}
}

int main(){
	cltstream::read(n);
	cltstream::read(m);
	build(1,1,n);
	for(re int i=1;i<=m;++i){
		int opt,t,l,r,x;
		cltstream::read(opt);
		cltstream::read(t);
		cltstream::read(l);
		cltstream::read(r);
		switch(opt){
			case 1:
				cltstream::write(query(l,r,t,1,1,n),10);
				break;
			case 2:
				cltstream::read(x);
				modifyA(l,r,t,(x%mod+mod)%mod,1,1,n);
				break;
			case 3:
				cltstream::read(x);
				modifyB(l,r,t,(x%mod+mod)%mod,1,1,n);
				break;
			case 4:
				cltstream::read(x);
				modifyV(l,r,(x%mod+mod)%mod,1,1,n);
				break;
		}
	}
	clop();
	return 0;
}
```

大概是我太菜了不适合做这种毒瘤题吧qaq

![](https://i.loli.net/2018/11/08/5be38edf529ca.jpg)

距 __在NOIp2018爆零__ 还剩 __1 天__。