---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-04-11 10:28:42
title: FWT抄袭笔记
tags:
  - FWT
categories:
  - 学习笔记
password:
---
看到坐在我左边的dalao在学FWT。

想着二轮前学一些很酷很炫~~很失败~~的算法，于是来~~背一下~~学一下吧。

[抄袭来源](http://www.cnblogs.com/cjyyb/p/9065615.html)。

<!-- more -->

### 引入

我们利用FFT可以在$O(n\log n)$的时间复杂度内计算

$$H[k]=(F\times G)[k]=\sum_{i+j=k}F[i]G[j]$$

假如说我们把这个式子变一变

$$H[k]=(F\vee G)[k]=\sum_{i\vee j=k}F[i]G[j]$$

$$H[k]=(F\wedge G)[k]=\sum_{i\wedge j=k}F[i]G[j]$$

$$H[k]=(F\oplus G)[k]=\sum_{i\oplus j=k}F[i]G[j]$$

其中$\vee$指按位或，$\wedge$指按位与，$\oplus$指按位异或。

我们还是希望能够在$O(n\log n)$的时间复杂度内计算出答案。

这种时候我们就需要FWT（快速沃尔什变换，Fast Walsh–Hadamard Transformation）了。

在FFT中，我们先计算出了$F$和$G$的点值多项式，然后将对应位直接相乘得到了$F\times G$的点值多项式，最后还原回了$F\times G$。

类似地，我们可不可以试着计算出两个多项式$F^{\prime},G^{\prime}$，使得

$$(F\times G)^{\prime}=F^{\prime}\cdot G^{\prime}$$

~~当然可以啊不然还怎么会有FWT（~~

### 一些约定

对于两个向量$A$和$B$，我们令

$$(A,B)=(A[0],A[1],\cdots,B[0],B[1],\cdots)$$

设$F$的项数为$2^{t}$。为了方便，我们将其看做一个$2^{t}$维向量

$$(F[0],F[1],\cdots,F[2^{t}-1])$$

然后我们定义

$$F_{0}=(F[0],F[1],\cdots,F[2^{t-1}-1])$$

$$F_{1}=(F[2^{t-1}],F[2^{t-1}+1],\cdots,F[2^{t}-1])$$

### 正变换

#### 按位或

定义

$$F^{\prime}=\begin{cases}
&(F_{0}^{\prime},F_{1}^{\prime}+F_{0}^{\prime})\;\;\;\;\;\;\;\;&(t\gt 0)\\
&F&(t=0)
\end{cases}$$

我们发现

$$F^{\prime}[i]=\sum_{j\vee i=i}F[j]$$

$t=0$时这十分显然，我们来考虑$t\gt 0$时的情况。

首先很明显的一点是$j\vee i=i\Leftrightarrow j\subseteq i$，也就是说$j$是$i$的子集。

对于$F_{1}$中的一个下标$i$，我们在$F_{1}$左边接上$F_{0}$后，这个$i$就多了一个$2^{t-1}$。

之前$i$的每一个子集$j$，也同样多了一个$2^{t-1}$，它们产生的贡献已经被统计在了$F_{1}^{\prime}[i]$内。

那么去掉这个$2^{t-1}$，我们还有$j\subseteq i+2^{t-1}$，这部分其实就是$F_{0}^{\prime}[i]$的值。

据此，我们就有

$$\begin{aligned}
F^{\prime}\cdot G^{\prime}[i]&=\left(\sum_{j\subseteq i}F[j]\right)\left(\sum_{k\subseteq i}G[k]\right)\\
&=\sum_{j\vee k\subseteq i}F[j]G[k]\\
&=\sum_{l\subseteq i}\sum_{j\vee k=l}F[j]G[k]\\
&=\sum_{l\subseteq i}(F\vee G)[l]\\
&=(F\vee G)^{\prime}[i]
\end{aligned}$$

#### 按位与

定义

$$F^{\prime}=\begin{cases}
&(F_{0}^{\prime}+F_{1}^{\prime},F_{1}^{\prime})\;\;\;\;\;\;\;\;&(t\gt 0)\\
&F&(t=0)
\end{cases}$$

它具有类似的性质

$$F^{\prime}[i]=\sum_{j\wedge i=i}F[j]$$

$$(F\wedge G)^{\prime}=F^{\prime}\cdot G^{\prime}$$

证明略。

#### 按位异或

定义

$$F^{\prime}=\begin{cases}
&(F_{0}^{\prime}+F_{1}^{\prime},F_{0}^{\prime}-F_{1}^{\prime})\;\;\;\;\;\;\;\;&(t\gt 0)\\
&F&(t=0)
\end{cases}$$

然后我们发现按位异或并没有像上面一样的和子集相关的性质。因此我们需要通过一些其他方式来证明它的正确性。

首先

$$(F+G)^{\prime}=F^{\prime}+G^{\prime}$$

如果$F$和$G$都只有一项，这十分显然。

否则

$$\begin{aligned}
F^{\prime}+G^{\prime}&=(F_{0}^{\prime}+F_{1}^{\prime},F_{0}^{\prime}-F_{1}^{\prime})+(G_{0}^{\prime}+G_{1}^{\prime},G_{0}^{\prime}-G_{1}^{\prime})\\
&=(F_{0}^{\prime}+G_{0}^{\prime}+F_{1}^{\prime}+G_{1}^{\prime},F_{0}^{\prime}+G_{0}^{\prime}-F_{1}^{\prime}-G_{1}^{\prime})\\
&=((F+G)_{0}^{\prime}+(F+G)_{1}^{\prime},(F+G)_{0}^{\prime}-(F+G)_{1}^{\prime})\\
&=(F+G)^{\prime}
\end{aligned}$$

$$(F\oplus G)^{\prime}=F^{\prime}\cdot G^{\prime}$$

这个不会证，告辞。

### 逆变换

就是把刚刚算出来的$F^{\prime}$变回$F$。

$$F=\begin{cases}
&F^{\prime}&(t=0)\\
&\begin{cases}
&(F_{0},F_{1}-F_{0})&(\vee)\\
&(F_{0}-F_{1},F_{1})&(\wedge)\\
&(\cfrac{F_{0}+F_{1}}{2},\cfrac{F_{0}-F_{1}}{2})\;\;\;\;\;\;\;\;&(\oplus)
\end{cases}\;\;\;\;\;\;\;\;&(t\gt 0)
\end{cases}$$

~~啥意思啊看不懂啊（~~

然后您就可以切掉这道[板子题](https://www.luogu.org/problemnew/show/P4717)了。

```cpp
#include<cstdio>
#define re register
#define maxn 17
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

int n;
int F[1<<maxn][3],G[1<<maxn][3];

#define FWT(F,tp) {\
	for(re int p=1;p<n;p<<=1)\
		for(re int i=0;i<n;i+=p<<1)\
			for(re int j=i;j<i+p;++j){\
				F[j+p][0]=!tp?(F[j+p][0]+F[j][0])%mod:(F[j+p][0]-F[j][0]+mod)%mod;\
				F[j][1]=!tp?(F[j][1]+F[j+p][1])%mod:(F[j][1]-F[j+p][1]+mod)%mod;\
				re int x=F[j][2],y=F[j+p][2];\
				F[j][2]=(x+y)%mod;\
				F[j+p][2]=(x-y+mod)%mod;\
				if(tp){\
					F[j][2]=499122177LL*F[j][2]%mod;\
					F[j+p][2]=499122177LL*F[j+p][2]%mod;\
				}\
			}\
}

int main(){
	cltstream::read(n);
	n=1<<n;
	for(re int i=0;i<n;++i){
		cltstream::read(F[i][0]);
		F[i][1]=F[i][2]=F[i][0];
	}
	for(re int i=0;i<n;++i){
		cltstream::read(G[i][0]);
		G[i][1]=G[i][2]=G[i][0];
	}
	FWT(F,0);
	FWT(G,0);
	for(re int j=0;j<3;++j)
		for(re int i=0;i<n;++i)
			F[i][j]=1LL*F[i][j]*G[i][j]%mod;
	FWT(F,1);
	for(re int j=0;j<3;++j)
		for(re int i=0;i<n;++i)
			cltstream::write(F[i][j],i<n-1?32:10);
	clop();
	return 0;
}
```

### 单位元

我们知道FFT中的单位元多项式是$F(x)=1$，类似地，FWT是否也拥有这样的一个单位元呢？

当然是有的。

对于按位或和按位异或来说，它们的单位元是

$$(1,0,\cdots,0,0)$$

对于按位与来说，它的单位元是

$$(0,0,\cdots,0,1)$$

### 求逆

既然有了单位元，我们就不禁会想……这东西能求逆吗？

大概……能吧。

以下所有运算在模$998244353$意义下进行。

#### 按位或

给定一个多项式$F$，让你求出一个多项式$G$，使得

$$F\vee G=(1,0,\cdots,0,0)$$

首先我们需要知道

$$F\vee G=(F_{0}\vee G_{0},F_{0}\vee G_{1}+F_{1}\vee G_{0}+F_{1}\vee G_{1})$$

注意到左半部分和右半部分的下标有一个重要区别就是从右往左第$t$位是否为$1$。

如果某个下标和右半部分的某个下标进行了按位或，它的第$t$位一定是$1$，那么它就跑到右半部分去了。

否则，即两个左半部分的下标进行了按位或，这种情况结果还是在左半部分。

然后我们就可以往下推了

$$\begin{aligned}
F_{0}\vee G_{1}+F_{1}\vee G_{0}+F_{1}\vee G_{1}&=0\\
(F_{0}+F_{1})\vee G_{1}&=-F_{1}\vee G_{0}\\
G_{1}&=-F_{1}\vee G_{0}\vee (F_{0}+F_{1})^{-1}
\end{aligned}$$

边界条件$G[0]=F[0]^{-1}$。

大致代码如下

```cpp
void Inv(re int* F,re int* G,re int n){
	if(n==1)
		G[0]=cltpow(F[0],mod-2);
	else{
		int tmp1[1<<maxn],tmp2[1<<maxn];
		Inv(F,G,n>>1);
		for(re int i=0;i<(n>>1);++i)
			tmp1[i]=F[i]+F[(n>>1)+i];
		Inv(tmp1,tmp2,n>>1);
		FWT(F+(n>>1),n>>1,0);
		FWT(G,n>>1,0);
		FWT(tmp2,n>>1,0);
		for(re int i=0;i<(n>>1);++i)
			tmp2[i]=1LL*F[(n>>1)+i]*G[i]%mod*tmp2[i]%mod;
		FWT(F+(n>>1),n>>1,1);
		FWT(G,n>>1,1);
		FWT(tmp2,n>>1,1);
		for(re int i=0;i<(n>>1);++i)
			G[(n>>1)+i]=(mod-tmp2[i])%mod;
	}
}
```

时间复杂度非常显然是$O(n^{2}2^{n})$。

#### 按位与

给定一个多项式$F$，让你求出一个多项式$G$，使得

$$F\wedge G=(0,0,\cdots,0,1)$$

我们可以用类似的过程得到如下结论

$$F\wedge G=(F_{0}\wedge G_{0}+F_{0}\wedge G_{1}+F_{1}\wedge G_{0},F_{1}\wedge G_{1})$$

$$G_{0}=-F_{0}\wedge G_{1}\wedge (F_{0}+F_{1})^{-1}$$

#### 按位异或

给定一个多项式$F$，让你求出一个多项式$G$，使得

$$F\oplus G=(1,0,\cdots,0,0)$$

首先我们有

$$F\oplus G=(F_{0}\oplus G_{0}+F_{1}\oplus G_{1},F_{0}\oplus G_{1}+F_{1}\oplus G_{0})$$

也就是说

$$F_{0}\oplus G_{0}+F_{1}\oplus G_{1}=\epsilon$$
$$F_{0}\oplus G_{1}+F_{1}\oplus G_{0}=0$$

将上面两个式子相加、相减，得到

$$(F_{0}+F_{1})\oplus(G_{0}+G_{1})=\epsilon$$
$$(F_{0}-F_{1})\oplus(G_{0}-G_{1})=\epsilon$$

于是

$$G_{0}=\cfrac{(F_{0}+F_{1})^{-1}+(F_{0}-F_{1})^{-1}}{2}$$

$$G_{1}=\cfrac{(F_{0}+F_{1})^{-1}-(F_{0}-F_{1})^{-1}}{2}$$

时间复杂度$O(n2^{n})$。

这就没了？并不是。

如果您按照上面的式子写好程序，然后往里面输入

```
2
1 2 3 4
```

这样一组数据，您会发现您的程序给出的结果并不正确。

那么原因是什么呢？是我们式子推错了吗？

输出一下中间的运算过程，我们发现，在中间有一步，我们计算$(2,2)^{-1}$时，需要用到$(0)^{-1}$。

显然它不存在，但是同样显然的是，如果$(2,2)^{-1}$存在，那么这个过程不应该出现这样的问题。

所以说原因就是，$(2,2)^{-1}$，或者更进一步地，$(1,2,3,4)^{-1}$__不存在__。

### [子集卷积](https://loj.ac/problem/152)

~~让我来看看有没有点进去看完题面一脸懵逼地关闭标签页的。~~

这道题是让我们求这个东西

$$h_{R}=\sum_{S\vee T=R,S\wedge T=\varnothing}f_{S}g_{T}$$

这比我们之前看到的卷积拥有更加严格的要求，$S\wedge T=\varnothing$，很明显，这是在提示我们抄题解。

我们定义

$$F_{i,S}=\begin{cases}
&f_{S}\;\;\;\;\;\;\;\;&(|S|=i)\\
&0&(|S|\neq i)
\end{cases}$$

$$G_{i,S}=\begin{cases}
&g_{S}\;\;\;\;\;\;\;\;&(|S|=i)\\
&0&(|S|\neq i)
\end{cases}$$

$$H_{i,S}=\begin{cases}
&h_{S}\;\;\;\;\;\;\;\;&(|S|=i)\\
&0&(|S|\neq i)
\end{cases}$$

然后我们从小到大枚举$i$，计算

$$H_{i}=\sum_{j=0}^{i}F_{j}\vee G_{i-j}$$

为了理解这个式子，我们先将其展开

$$H_{i,R}=\sum_{j=0}^{i}\sum_{S\vee T=R}F_{j,S}G_{i-j,T}$$

根据定义，$F_{i,S}$和$G_{i,S}$有值当且仅当$|S|=i$，因此这就相当于

$$H_{i,R}=\sum_{S\vee T=R,|S|+|T|=i}F_{|S|,S}G_{|T|,T}$$

因为$S$和$T$可能会有交集，从而$i\gt |R|$时$H_{i,R}$也可能有值，这是不符合定义的，因此（如果有必要的话）我们需要手动清空。

代码如下

```cpp
#include<cstdio>
#define re register
#define maxn 20
#define mod 1000000009

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

int n,N;
int cnt[1<<maxn],F[maxn+1][1<<maxn],G[maxn+1][1<<maxn],H[maxn+1][1<<maxn];

inline void FWT(re int* F,re int tp){
	for(re int p=1;p<N;p<<=1)
		for(re int i=0;i<N;i+=p<<1)
			for(re int j=i;j<i+p;++j)
				F[j+p]=!tp?(F[j+p]+F[j])%mod:(F[j+p]-F[j]+mod)%mod;
}

int main(){
	cltstream::read(n);
	N=1<<n;
	for(re int i=1;i<N;++i)
		cnt[i]=cnt[i>>1]+(i&1);
	for(re int i=0;i<N;++i)
		cltstream::read(F[cnt[i]][i]);
	for(re int i=0;i<N;++i)
		cltstream::read(G[cnt[i]][i]);
	for(re int i=0;i<=n;++i){
		FWT(F[i],0);
		FWT(G[i],0);
		for(re int j=0;j<=i;++j)
			for(re int S=0;S<N;++S)
				H[i][S]=(H[i][S]+1LL*F[j][S]*G[i-j][S]%mod)%mod;
		FWT(H[i],1);
		for(re int S=0;S<N;++S)
			cnt[S]==i||(H[i][S]=0);
	}
	for(re int i=0;i<N;++i)
		cltstream::write(H[cnt[i]][i],32);
	clop();
	return 0;
}
```

### 例题

![](/images/TIM图片20181011211750.jpg)
