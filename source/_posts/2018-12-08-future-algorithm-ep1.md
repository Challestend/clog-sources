---
title: 「未来算法Episode I」严格根号分块实现树套树
date: 2018-12-08 19:55:00
tags:
  - 树套树
  - 分块
categories:
  - 未来算法
mathjax: true
---
分块天下第一！！！！！！！！！

<!-- more -->

我也不知道我为什么要写这个玩意，大概是我真的被这个外挂一般的东西吓到了吧。

[![](https://i.loli.net/2018/12/08/5c0bb272768cf.png)](https://www.luogu.org/record/show?rid=14518116)

![](https://i.loli.net/2018/12/08/5c0bb2c767fda.jpg)

我们从头说起。点开上面的那个评测记录，我们可以看到一道树套树的模板题。

先退一步来说，假如说我们去掉操作$3$，剩下的操作都可以用主席树来完成。

然而麻烦的是，我们在树上存的是前缀和。想要修改的话，暴力的复杂度是单次$O(n\text{log}n)$的。

那我们就在外层套个树状数组，把修改$O(n\text{log}n)$查询$O(\text{log}n)$均摊成全部$O(\text{log}^{2}n)$。

然而，很遗憾，我不会树套树，一点都不会，就连上面的这段文字也是我瞎扯出来的。

考虑~~无敌的~~分块。

一般我们想到的分块就是在块内维护`std::set`。这样操作$3$可以做到$O(\text{log}\sqrt{n})$，操作$1$、$4$、$5$可以做到$O(\sqrt{n}\text{log}\sqrt{n})$。至于操作$2$，我们在外层套一个二分，然后检查二分到的数的排名是不是$k$，时间复杂度$O(\text{log}10^{9}\sqrt{n}\text{log}\sqrt{n})$。

然而很明显的，这样做的效率十分低下，除了实现复杂度相对树套树小了一点以外没有任何优势。

我们来看一下[__Shadowice1984__](https://www.luogu.org/space/show?uid=56384)dalao在他的[另一篇题解](https://www.luogu.org/blog/ShadowassIIXVIIIIV/solution-p4119)中做出的评价：

> 这其实是一个误区。主席树之所以采取了二分的思路来解决问题是因为我们要求回答单次询问做到$O(\text{log}n)$的复杂度，这时候唯一的可行思路就是二分否则我们无法将复杂度控制在一个$\text{log}$之内。
> 
> 但是我们现在是使用分块解决问题。分块是有自己复杂度的，就是$O(\sqrt{n})$而不是$O(\text{log}n)$，这意味着分块其实和$\text{log}$的数据结构以及二分法并不是很搭（因为分块的结构本质上就不支持二分）。如果我们需要强行嵌入$\text{log}$的数据结构的话在绝大部分情况下都会使复杂度凭空多出个$\text{log}$来，这在强调常数的根号算法中绝对是致命的。

我也是从这位dalao的[blog](https://www.luogu.org/blog/ShadowassIIXVIIIIV/solution-p3380)里看到了严格根号分块实现树套树这种未来算法。

主要思想其实不难理解，既然分块和$\text{log}$不适合放在一起，我们就再套个分块，或者说，把值域也分成块。

定义`cnt1[i][j]`表示前$i$个块内有多少个元素的值在第$j$个块内，`cnt2[i][j]`表示前$i$个块内有多少个$j$（当然是离散化后的）。不难发现预处理出这两个数组的时间复杂度是$O((n+m)\sqrt{n})$的。

然后我们来分析每个操作该怎么实现：

1. 首先考虑序列中的整块。从头开始扫一遍值域块，一直扫到给定数所在块的前一个块，然后再在给定数所在块内从头扫到给定数的前一个，查询扫过的值有多少落在这些整块内。剩下的边角块自然地暴力判断。
2. 还是从头扫一遍值域块，看看每个值域块内有多少数落在给定区间内，大概判断出答案在哪个值域块内。然后在这个值域块内再扫一遍即可。需要注意的是我们需要再开两个数组`tmp1`和`tmp2`来保存边角块的信息。
3. 直接$O(\sqrt{n})$暴力重构两个`cnt`就好。
4. 需要两个类似于操作$2$的临时数组，存储的信息也是类似的。首先在给定数所在值域块内__从后往前扫__，找到答案直接退出。否则还是__从后往前扫所有值域块__，找到第一个非空的块然后进去找。
5. 操作$4$换个方向即可。

综上所述，该算法的时间复杂度为$O((n+m)\sqrt{n}+m\sqrt{n+m})$。当$n$，$m$取到极限值时，差不多是$38172068$，相比之下$O(m\text{log}^{2}n)\approx 12183043$。看起来好像比不过树套树，实际上开个$\text{O}2$跑得比谁都快，正如一开始那张图所示。

不过代码写出来有点长的：

```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
#define re register
#define maxn 50000
#define maxm 50000
#define maxs 230
#define max(a,b) ((a)>=(b)?(a):(b))
#define min(a,b) ((a)<=(b)?(a):(b))
#define lowbit(a) ((a)&(-(a)))

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

int n,m,sq1,sq2;
int id1[maxn+1],id2[maxn+maxm+1],p[maxn+maxm+1];
int a[maxn+1],opt[maxm+1][4];
int cnt1[maxs+1][(maxs<<1)+1],cnt2[maxs+1][maxn+maxm+1],tmp1[(maxs<<1)+1],tmp2[maxn+maxm+1];

int main(){
	cltstream::read(n);
	cltstream::read(m);
	for(;(sq1+1)*(sq1+1)<=n;++sq1);
	for(re int i=1;i<=n;++i){
		id1[i]=(i-1)/sq1+1;
		cltstream::read(a[i]);
		p[++p[0]]=a[i];
	}
	for(re int i=1;i<=m;++i){
		cltstream::read(opt[i][0]);
		cltstream::read(opt[i][1]);
		cltstream::read(opt[i][2]);
		if(opt[i][0]!=3)
			cltstream::read(opt[i][3]);
		else
			p[++p[0]]=opt[i][2];
	}
	std::sort(p+1,p+p[0]+1);
	p[0]=std::unique(p+1,p+p[0]+1)-p-1;
	for(;(sq2+1)*(sq2+1)<=p[0];++sq2);
	for(re int i=1;i<=p[0];++i)
		id2[i]=(i-1)/sq2+1;
	for(re int i=1;i<=n;++i){
		a[i]=std::lower_bound(p+1,p+p[0]+1,a[i])-p;
		++cnt1[id1[i]][id2[a[i]]];
		++cnt2[id1[i]][a[i]];
	}
	for(re int i=1;i<=id1[n];++i){
		for(re int j=1;j<=id2[p[0]];++j)
			cnt1[i][j]+=cnt1[i-1][j];
		for(re int j=1;j<=p[0];++j)
			cnt2[i][j]+=cnt2[i-1][j];
	}
	for(re int i=1;i<=m;++i){
		re int l,r,x,ans=0;
		switch(opt[i][0]){
			case 1:
				l=opt[i][1],r=opt[i][2],x=std::lower_bound(p+1,p+p[0]+1,opt[i][3])-p;
				if(id1[l]<id1[r]){
					for(re int j=l;j<=id1[l]*sq1;++j)
						ans+=(a[j]<x);
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j)
						ans+=(a[j]<x);
					for(re int j=1;j<id2[x];++j)
						ans+=cnt1[id1[r]-1][j]-cnt1[id1[l]][j];
					for(re int j=(id2[x]-1)*sq2+1;j<x;++j)
						ans+=cnt2[id1[r]-1][j]-cnt2[id1[l]][j];
				}
				else
					for(re int j=l;j<=r;++j)
						ans+=(a[j]<x);
				cltstream::write(ans+1,10);
				break;
			case 2:
				l=opt[i][1],r=opt[i][2],x=opt[i][3];
				if(id1[l]<id1[r]){
					for(re int j=l;j<=id1[l]*sq1;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=1;;++j)
						if(x>cnt1[id1[r]-1][j]-cnt1[id1[l]][j]+tmp1[j])
							x-=cnt1[id1[r]-1][j]-cnt1[id1[l]][j]+tmp1[j];
						else{
							for(re int k=(j-1)*sq2+1;k<=j*sq2;++k)
								if(x>cnt2[id1[r]-1][k]-cnt2[id1[l]][k]+tmp2[k])
									x-=cnt2[id1[r]-1][k]-cnt2[id1[l]][k]+tmp2[k];
								else{
									cltstream::write(p[k],10);
									break;
								}
							break;
						}
					for(re int j=l;j<=id1[l]*sq1;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				else{
					for(re int j=l;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=1;;++j)
						if(x>tmp1[j])
							x-=tmp1[j];
						else{
							for(re int k=(j-1)*sq2+1;k<=j*sq2;++k)
								if(x>tmp2[k])
									x-=tmp2[k];
								else{
									cltstream::write(p[k],10);
									break;
								}
							break;
						}
					for(re int j=l;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				break;
			case 3:
				l=opt[i][1],x=std::lower_bound(p+1,p+p[0]+1,opt[i][2])-p;
				for(re int j=id1[l];j<=id1[n];++j){
					--cnt1[j][id2[a[l]]];
					++cnt1[j][id2[x]];
					--cnt2[j][a[l]];
					++cnt2[j][x];
				}
				a[l]=x;
				break;
			case 4:
				l=opt[i][1],r=opt[i][2],x=std::lower_bound(p+1,p+p[0]+1,opt[i][3])-p;
				if(id1[l]<id1[r]){
					for(re int j=l;j<=id1[l]*sq1;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=x-1;j>=(id2[x]-1)*sq2+1&&!ans;--j)
						if(cnt2[id1[r]-1][j]-cnt2[id1[l]][j]+tmp2[j])
							ans=j;
					for(re int j=id2[x]-1;j>=1&&!ans;--j)
						if(cnt1[id1[r]-1][j]-cnt1[id1[l]][j]+tmp1[j])
							for(re int k=j*sq2;k>=(j-1)*sq2+1&&!ans;--k)
								if(cnt2[id1[r]-1][k]-cnt2[id1[l]][k]+tmp2[k])
									ans=k;
					for(re int j=l;j<=id1[l]*sq1;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				else{
					for(re int j=l;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=x-1;j>=(id2[x]-1)*sq2+1&&!ans;--j)
						if(tmp2[j])
							ans=j;
					for(re int j=id2[x]-1;j>=1&&!ans;--j)
						if(tmp1[j])
							for(re int k=j*sq2;k>=(j-1)*sq2+1&&!ans;--k)
								if(tmp2[k])
									ans=k;
					for(re int j=l;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				cltstream::write(ans?p[ans]:-2147483647,10);
				break;
			case 5:
				l=opt[i][1],r=opt[i][2],x=std::upper_bound(p+1,p+p[0]+1,opt[i][3])-p-1;
				if(id1[l]<id1[r]){
					for(re int j=l;j<=id1[l]*sq1;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=x+1;j<=id2[x]*sq2&&!ans;++j)
						if(cnt2[id1[r]-1][j]-cnt2[id1[l]][j]+tmp2[j])
							ans=j;
					for(re int j=id2[x]+1;j<=id2[p[0]]&&!ans;++j)
						if(cnt1[id1[r]-1][j]-cnt1[id1[l]][j]+tmp1[j])
							for(re int k=(j-1)*sq2+1;k<=j*sq2&&!ans;++k)
								if(cnt2[id1[r]-1][k]-cnt2[id1[l]][k]+tmp2[k])
									ans=k;
					for(re int j=l;j<=id1[l]*sq1;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
					for(re int j=(id1[r]-1)*sq1+1;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				else{
					for(re int j=l;j<=r;++j){
						++tmp1[id2[a[j]]];
						++tmp2[a[j]];
					}
					for(re int j=x+1;j<=id2[x]*sq2&&!ans;++j)
						if(tmp2[j])
							ans=j;
					for(re int j=id2[x]+1;j<=id2[p[0]]&&!ans;++j)
						if(tmp1[j])
							for(re int k=(j-1)*sq2+1;k<=j*sq2&&!ans;++k)
								if(tmp2[k])
									ans=k;
					for(re int j=l;j<=r;++j){
						--tmp1[id2[a[j]]];
						--tmp2[a[j]];
					}
				}
				cltstream::write(ans?p[ans]:2147483647,10);
		}
	}
	clop();
	return 0;
}
```

我还没写啥呢咋就$12\text{KB}$了（

这大概会成为一个系列，名字就叫做「未来算法」（$\text{Future Algorithm}$），不过也说不定，会不会以后哪天突然蹦出来个「未来算法Episode II」也说不定（