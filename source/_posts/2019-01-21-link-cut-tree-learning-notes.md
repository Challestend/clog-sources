---
mathjax: true
abstract: 该文章已被加密
message: 输入密码继续阅读
date: 2019-01-21 10:57:11
title: 动态树学习笔记
tags:
  - Splay
  - LCT
categories:
  - 学习笔记
password:
---
24号要出去学习，趁现在先自己xjb学点啥。

<!-- more -->

### 基本概念

首先我们有一道[模板题](https://www.luogu.org/problemnew/show/P3690)。

我们所熟悉的树链剖分指的是重链剖分。也就是定义一个节点的子树大小最大的儿子为它的重儿子，连接重儿子的边叫做重边，若干条重边连在一起形成重链。除了重儿子以外的儿子被称为轻儿子，连接轻儿子的边叫做轻边。

这样一来，我们给原树的节点重新标号，使得一条重链上的所有节点的新标号是连续的，然后通过线段树或者树状数组等能够处理区间的数据结构进行维护，通过轻边合并两条重链上的信息。时间复杂度一般是$O(n\log^{2}n)$。

但是这样有一个问题，因为线段树，又或者是树状数组，都是静态的数据结构，它们不能支持我们在上面xjb捣鼓。反映到原树上，这就意味着我们边的轻重只能也是静态的。这会带来很多不便。就比如说，我们现在要维护一片森林，要求支持动态连边、删边，同时需要查询某条链上的信息。

很明显这是重链剖分无法胜任的。为了解决这个问题，我们需要一种能够动态修改边的轻重的算法，也就是实链剖分。

实链剖分一般被称为LCT，全称~~Link-Cat Tree~~ ~~Linear Challestend Transformation~~ Link-Cut Tree，也就是动态树。

与重链剖分类似地，我们根据实际情况，随便钦定一个节点的某个儿子为它的实儿子，连接实儿子的边叫做实边，若干条实边连在一起形成实链。除了实儿子以外的儿子被称为虚儿子，连接虚儿子的边叫做虚边。

为了实现它，我们需要通过更加灵活的Splay来维护每一条实链。它具有如下性质：

1. 每棵Splay维护的是一条原森林中深度严格递增的路径，也就是一条实链。
2. 每个节点属于且仅属于一棵Splay。
3. 如果一个节点在原森林中有多个儿子，只有一个与它在同一颗Splay中，也就是实儿子。其他儿子所在的Splay的根节点有一根父指针指向这个节点，但是从这个节点访问不到它们。
4. 不同于重链剖分，就算一个节点有至少一个儿子，也可以没有实儿子。

以下图片来自https://wenku.baidu.com/view/75906f160b4e767f5acfcedb。

我们来看这样一棵树

![](/images/1309909-20180123095924037-1618037447.png)

其中粗线表示实边，虚线表示虚边。

它所对应的Splay森林可能长下面这样，每一个绿框内都是一棵Splay。

![](/images/1309909-20180123095955350-1680422636.png)

当然这并不是唯一的。

为了方便，我先放出我Splay的代码实现

{% fold "Toggle Code" %}

```cpp
struct SplayNode{
	SplayNode *ftr,*ls,*rs;
	int val,sum,rev;

	inline int isRoot(){
		return ftr==NULL||(ftr->ls!=this&&ftr->rs!=this);
		//判断一个节点是否是原森林中的一棵树的树根
	}

	inline void reverse(){
		std::swap(ls,rs);
		rev^=1;
	}

	inline void pushDown(){
		if(rev){
			if(ls!=NULL)
				ls->reverse();
			if(rs!=NULL)
				rs->reverse();
			rev=0;
		}
	}

	inline void pushUp(){
		sum=val;
		if(ls!=NULL)
			sum^=ls->sum;
		if(rs!=NULL)
			sum^=rs->sum;
	}
};

SplayNode mempool[maxn+1];

inline void rotate(re SplayNode* p){
	re SplayNode* q=p->ftr;
	q->pushDown();
	p->pushDown();
	p->ftr=q->ftr;
	if(p->ftr!=NULL){
		if(p->ftr->ls==q)
			p->ftr->ls=p;
		if(p->ftr->rs==q)
			p->ftr->rs=p;
	}
	if(q->rs==p){
		q->rs=p->ls;
		if(q->rs!=NULL)
			q->rs->ftr=q;
		p->ls=q;
		q->ftr=p;
	}
	else{
		q->ls=p->rs;
		if(q->ls!=NULL)
			q->ls->ftr=q;
		p->rs=q;
		q->ftr=p;
	}
	q->pushUp();
	p->pushUp();
}

inline void splay(re SplayNode* p){
//不同于我们以前写的Splay，现在我们只需要将一个节点旋转到根即可
	for(;!p->isRoot();rotate(p))
		if(!p->ftr->isRoot())
			rotate((p->ftr->ftr->ls==p->ftr)==(p->ftr->ls==p)?p->ftr:p);
}
```

{% endfold %}

### access

首先我们有一个基本操作

```cpp
void access(SplayNode*)
```

首先有一个问题是，这个单词怎么读？

`/ək'ses/`？不不不应该是`/'ækses/`。

如果您有兴趣，可以在[这里](https://github.com/shimohq/chinese-programmer-wrong-pronunciation)看看自己以前都读错了多少单词（

这个函数的作用是打通指定节点到根节点的路径，将这条路径修改成实链，并抛弃指定节点自身的实儿子。

我们来看看这个函数的具体过程。还是上面的例子，现在我们调用`access(N)`，整棵树会变成这样

![](/images/1309909-20180123101901740-2118178734.png)

~~虽然说好像图上用的还是轻重……不过这些细节就不要在意啦（~~

首先我们调用`splay(N)`，令$\text{N}$成为它所在的Splay的根节点，然后它所在的实链中再往下的部分就到了它的右子树中，我们直接回收它的右儿子指针即可。需要注意的是，我们并没有切断这条边，只是让它变虚，因此它的右儿子的父指针不应该被修改。

![](/images/1309909-20180123110136115-1112016464.png)

向上找到$\text{N}$的父亲$\text{I}$，调用`splay(I)`，回收$\text{I}$的右儿子指针。不过这一次，我们需要再令其指向$\text{N}$，然后$\text{N}$就成了$\text{I}$的实儿子了。

![](/images/1309909-20180123110156272-1242463729.png)

然后继续向上，找到$\text{I}$的父亲$\text{H}$，调用`splay(H)`，并令$\text{H}$的右儿子指针指向$\text{I}$。

![](/images/1309909-20180123110209772-2057141058.png)

最后一步，找到$\text{H}$的父亲$\text{A}$，调用`splay(A)`，并令$\text{A}$的右儿子指针指向$\text{H}$。

![](/images/1309909-20180123110213709-49169640.png)

然后我们看到，$\text{N}$和$\text{A}$到了同一颗Splay中，完成任务，返回。

代码实现：

{% fold "Toggle Code" %}

```cpp
inline void access(re SplayNode* p){
	splay(p);
	p->pushDown();
	p->rs=NULL;
	p->pushUp();
	for(re SplayNode* q=p;q->ftr!=NULL;q=q->ftr){
		splay(q->ftr);
		q->ftr->pushDown();
		q->ftr->rs=q;
		q->ftr->pushUp();
	}
	splay(p);
	//据说闲着没事瞎转转有利于摊开时间复杂度（
}
```

{% endfold %}

### findRoot

有了`access`，我们就可以随心所欲的瞎搞了。比如说

```cpp
SplayNode* findRoot(SplayNode*)
```

返回给定节点所在的树的树根，也就是调用完`access`后它所在的实链上深度最小的节点。

因为`access`的最后自带了一个`splay`，这个时候给定节点已经是Splay的根节点了，我们直接循环跳左儿子指针即可。

{% fold "Toggle Code" %}

```cpp
inline SplayNode* findRoot(re SplayNode* p){
	access(p);
	for(;p->ls!=NULL;p=p->ls);
	splay(p);
	return p;
}
```

{% endfold %}

### makeRoot && split

现在我们要提取出树上两个给定节点之间的路径。但是我们知道，这样的路径不一定满足深度严格递增，也就是说，它可能不能够出现在一棵Splay中。

不过办法总是有的。比如说我们指定了两个节点$x$和$y$，我们先调用`access(x)`，然后考虑翻转$x$的子树之后会发生什么。

`access`结束后，$x$没有右子树，翻转之后就没有了左子树，也就是说，现在没有比$x$的深度更小的节点了。换句话说就是，$x$现在成为了树根。

那么这样一来，$x$到$y$的路径就一定满足深度严格递增了，我们只需调用一次`access(y)`就可以把它抽出来。

我们实现下面两个函数

```cpp
void makeRoot(SplayNode*)
```

令给定节点成为树根。

```cpp
void split(SplayNode*,SplayNode*)
```

抽出给定的两个节点之间的路径。不过虽然说模板题保证联通，还是有必要稍微考虑一下不连通的情况的。

{% fold "Toggle Code" %}

```cpp
inline void makeRoot(re SplayNode* p){
	access(p);
	p->reverse();
}

inline void split(re SplayNode* p,re SplayNode* q){
	makeRoot(p);
	access(q);
}
```

{% endfold %}

### link

我们需要实现函数

```cpp
void link(SplayNode*,SplayNode*)
```

在给定的两个节点间连一条边。特殊地，如果说给定的两个节点已经联通，什么都不做直接返回。不过这是模板题的要求，有些题可能会让你输出操作失败，这种情况下改一下返回值就行。

思路很简单。假设我们指定$x$和$y$两个节点，首先调用`makeRoot(x)`，然后检查`findRoot(y)`的返回值。如果不是$x$，说明两个节点不连通，将$x$的父指针指向$y$；否则，即`findRoot(y)==x`，说明两个节点联通，直接返回。

{% fold "Toggle Code" %}

```cpp
inline void link(re SplayNode* p,re SplayNode* q){
	makeRoot(p);
	if(findRoot(q)!=p)
		p->ftr=q;
}
```

{% endfold %}

### cut

我们需要实现函数

```cpp
void cut(SplayNode*,SplayNode*)
```

切断给定的两个节点之间的边。不存在就什么也不做。

需要注意的是，两个节点$x$和$y$之间直接有边相连，不仅要求$x$与$y$联通，还要求它们在Splay中是相邻的两个节点。为了避免讨论深度的大小关系，我们先调用`makeRoot(x)`，此时$y$应该是$x$的右儿子，并且它不能有左儿子。

{% fold "Toggle Code" %}

```cpp
inline void cut(re SplayNode* p,re SplayNode* q){
	makeRoot(p);
	if(findRoot(q)==p&&q->ftr==p&&q->ls==NULL){
		q->ftr=p->rs=NULL;
		p->pushUp();
	}
}
```

{% endfold %}

把上面这么一些东西写好之后，再根据题目要求搞一搞，您就可以切掉模板题了。

完整板子：

{% fold "Toggle Code" %}

```cpp
#include<cstdio>
#include<algorithm>
#define re register
#define maxn 300000

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

	template <typename _tp>
	inline void swap(_tp& x,_tp& y){
		_tp z=x;
		x=y;
		y=z;
	}
}

struct LinkCutTree{
	struct SplayNode{
		SplayNode *ftr,*ls,*rs;
		int val,sum,rev;

		inline int isRoot(){
			return ftr==NULL||(ftr->ls!=this&&ftr->rs!=this);
		}

		inline void reverse(){
			std::swap(ls,rs);
			rev^=1;
		}

		inline void pushDown(){
			if(rev){
				if(ls!=NULL)
					ls->reverse();
				if(rs!=NULL)
					rs->reverse();
				rev=0;
			}
		}

		inline void pushUp(){
			sum=val;
			if(ls!=NULL)
				sum^=ls->sum;
			if(rs!=NULL)
				sum^=rs->sum;
		}
	};

	SplayNode mempool[maxn+1];

	inline void rotate(re SplayNode* p){
		re SplayNode* q=p->ftr;
		q->pushDown();
		p->pushDown();
		p->ftr=q->ftr;
		if(p->ftr!=NULL){
			if(p->ftr->ls==q)
				p->ftr->ls=p;
			if(p->ftr->rs==q)
				p->ftr->rs=p;
		}
		if(q->rs==p){
			q->rs=p->ls;
			if(q->rs!=NULL)
				q->rs->ftr=q;
			p->ls=q;
			q->ftr=p;
		}
		else{
			q->ls=p->rs;
			if(q->ls!=NULL)
				q->ls->ftr=q;
			p->rs=q;
			q->ftr=p;
		}
		q->pushUp();
		p->pushUp();
	}

	inline void splay(re SplayNode* p){
		for(;!p->isRoot();rotate(p))
			if(!p->ftr->isRoot())
				rotate((p->ftr->ftr->ls==p->ftr)==(p->ftr->ls==p)?p->ftr:p);
	}

	inline void build(re int n){
		for(re int i=1;i<=n;++i){
			re SplayNode* p=mempool+i;
			p->ftr=p->ls=p->rs=NULL;
			cltstream::read(p->val);
			p->sum=p->val;
			p->rev=0;
		}
	}

	inline void access(re SplayNode* p){
		splay(p);
		p->pushDown();
		p->rs=NULL;
		p->pushUp();
		for(re SplayNode* q=p;q->ftr!=NULL;q=q->ftr){
			splay(q->ftr);
			q->ftr->pushDown();
			q->ftr->rs=q;
			q->ftr->pushUp();
		}
		splay(p);
	}

	inline SplayNode* findRoot(re SplayNode* p){
		access(p);
		for(;p->ls!=NULL;p=p->ls);
		splay(p);
		return p;
	}

	inline void makeRoot(re SplayNode* p){
		access(p);
		p->reverse();
	}

	inline void split(re SplayNode* p,re SplayNode* q){
		makeRoot(p);
		access(q);
	}

	inline void link(re SplayNode* p,re SplayNode* q){
		makeRoot(p);
		if(findRoot(q)!=p)
			p->ftr=q;
	}

	inline void cut(re SplayNode* p,re SplayNode* q){
		makeRoot(p);
		if(findRoot(q)==p&&q->ftr==p&&q->ls==NULL){
			q->ftr=p->rs=NULL;
			p->pushUp();
		}
	}

	inline int queryPathXorSum(re int x,re int y){
		split(mempool+x,mempool+y);
		return (mempool+y)->sum;
	}

	inline void createEdge(re int x,re int y){
		link(mempool+x,mempool+y);
	}

	inline void destoryEdge(re int x,re int y){
		cut(mempool+x,mempool+y);
	}

	inline void modifyVertice(re int x,re int y){
		splay(mempool+x);
		(mempool+x)->val=y;
		(mempool+x)->pushUp();
	}

	void printTree(re SplayNode* p){
		if(p!=NULL){
			p->pushDown();
			printTree(p->ls);
			printf(
				"%d(%d,%d,%d)\n",
				p-mempool,
				p->ftr!=NULL?p->ftr-mempool:-1,
				p->ls!=NULL?p->ls-mempool:-1,
				p->rs!=NULL?p->rs-mempool:-1
			);
			printTree(p->rs);
		}
	}
};

int n,m;
LinkCutTree QAQ;

int main(){\
	cltstream::read(n);
	cltstream::read(m);
	QAQ.build(n);
	for(re int i=1;i<=m;++i){
		int opt,x,y;
		cltstream::read(opt);
		cltstream::read(x);
		cltstream::read(y);
		switch(opt){
			case 0:
				cltstream::write(QAQ.queryPathXorSum(x,y),10);
				break;
			case 1:
				QAQ.createEdge(x,y);
				break;
			case 2:
				QAQ.destoryEdge(x,y);
				break;
			case 3:
				QAQ.modifyVertice(x,y);
				break;
		}
	}
	clop();
	return 0;
}
```

{% endfold %}

~~是不是感觉很好写呢（~~

### 用LCT维护子树信息

咕咕咕。
