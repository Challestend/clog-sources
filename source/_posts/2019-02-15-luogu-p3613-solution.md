---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-02-15 19:25:37
title: 「Luogu-P3613」睡觉困难综合征
tags:
  - 树链剖分
  - LCT
categories:
  - 题解
password:
---
[传送门](https://www.luogu.org/problemnew/show/P3613)

<!-- more -->

### xjb扯

以前刚学树剖时看到这题感觉好神仙啊没法做啊。

然后现在学了LCT过来一看~~，这不就一水题（~~

xjb写了棵LCT一交。

![](/images/TIM截图20190215193107.png)

emmmmmm……

然后改的时候才发现全是细节错误，LCT的部分动都没动一下（

就比如说，下面是我第一次交的程序的主程序部分。

{% fold "Toggle Code" %}

```cpp
for(re int i=1;i<=m;++i){
	int opt,x,y;
	cltstream::read(opt);
	cltstream::read(x);
	cltstream::read(y);
	if(opt==1){
		int z;
		//我都不知道我当时是怎么想的（
		cltstream::read(z);
		split(mempool+x,mempool+y);
		re unsigned long long ans0=(mempool+y)->ans0,ans1=(mempool+y)->ans1,ans=0;
		for(re int j=k-1;j>=0;--j)
			if(((ans0>>j)&1)>=((ans1>>j)&1)||z<(1<<j))
			//甚至忘了用1ULL（
				ans^=ans0&(1<<j);
			else{
				z-=1<<j;
				ans^=ans1&(1<<j);
			}
		cltstream::write(ans,10);
	}
	else{
		unsigned long long z;
		cltstream::read(z);
		access(mempool+x);
		(mempool+x)->tp=y;
		(mempool+x)->val=z;
		(mempool+y)->pushUp();
		//？？？
	}
}
```

{% endfold %}

然后我Splay节点的内部信息甚至开成了`unsigned`，excuse me？？？

~~不这个东西这不是我写的（~~

### 真正的题解

首先LCT。

不过首先的首先您还是要先做了[这道题](https://www.luogu.org/problemnew/show/P2114)。

每个Splay节点维护两个值，分别是把$0$和$-1$在它所在的实链的一部分中按照深度递增的方向跑一遍得到的结果。

我们记这两个值为`ans0`和`ans1`。

左子树和节点本身的信息很好维护。

而关于右子树，看上去我们没办法迅速求出把到现在为止的`ans0`和`ans1`扔进去跑一遍的结果。

但是注意到这些都是按位运算，位与位之间不互相影响。

我们可以对于`ans0`中是$1$的那些位，提取出`rc->ans1`的对应位，对于`ans0`中是$0$的那些位，提取出`rc->ans0`的对应位。

然后`ans1`也类似处理就行了。

{% fold "Toggle Code" %}

```cpp
struct SplayNode{
	SplayNode *ftr,*lc,*rc;
	int tp,rev;
	unsigned val,ans0,ans1;

	inline unsigned long long apply(unsigned long long x){
		return tp==1?(x&val):tp==2?(x|val):(x^val);
	}

	/*...*/

	inline void pushUp(){
		ans0=0,ans1=-1;
		if(lc!=NULL){
			ans0=lc->ans0;
			ans1=lc->ans1;
		}
		ans0=apply(ans0),ans1=apply(ans1);
		if(rc!=NULL){
			ans0=(ans0&rc->ans1)|((~ans0)&rc->ans0);
			ans1=(ans1&rc->ans1)|((~ans1)&rc->ans0);
		}
	}
};
```

{% endfold %}

但是还有一个问题是，LCT在连边和提取路径时需要`makeRoot`，也就是说需要区间翻转。

但是由于不同种类的位运算混在一起没有交换律，我们无法快速地算出翻转后的答案。

那么提前维护好就行了。提前维护好`sna0`和`sna1`，表示把$0$和$-1$反过来跑一遍的结果。

然后就没了。
