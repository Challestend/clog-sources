---
title: 珂朵莉树学习笔记
date: 2018-10-13 21:13:09
tags:
  - 珂朵莉树
categories:
  - 学习笔记
mathjax: true
---
~~还有三周就是NOIp复赛了，我还在这学些乱七八糟的东西怕不是要凉。~~

~~话说上面那个数字是3你们看的出来吗，反正我在我的编辑器内看不出来。~~

总之就是，我们机房的一位珂学家突然沉迷数据结构并不知道从哪翻出来的毒瘤数据结构。

<!--more -->

我们先来看一道~~毒瘤~~例题，[「CF896C」Willem, Chtholly and Seniorious](http://codeforces.com/contest/896/problem/C)。

如果只看前三个操作的话~~，虽然我不会写也没写过~~，我觉得分块大概是可以做的。然而操作四是个什么鬼？区间$10^{9}$次方和？认真的？

这种时候我们就需要用到珂朵莉树了。珂朵莉树的英文名叫$\text{Old Driver Tree}$，简称$\text{ODT}$。当然您也可以叫它$\text{Chtholly Tree}$。从本质上来讲，珂朵莉树是一种基于`std::set`的暴力数据结构~~，虽然您也可以手写一颗平衡树~~，它的高效几乎全部建立在数据的完全随机上。如果您看过一些其他的珂朵莉树的学习笔记或者是题解的话，您应该总是会看到这样一句话：

> 珂朵莉树的核心操作在于推平一段区间，使一整段区间内的东西变得一样。

那么怎么推平呢？不急，我们慢慢讲。

珂朵莉树存储的是区间，而且每个区间内的所有值都相同，也就是说，我们需要存储的是一个区间的左右端点和值。我们可以写一个结构体：

```cpp
struct node{
    int l,r;
    mutable long long val;
    //这里的mutable是为了让我们在之后的修改过程中可以修改val的值

    node(int _l,int _r=-1,long long _val=-1){
    //调用时_r或_val不填的话默认-1，为了后面split时方便
        l=_l;
        r=_r;
        val=_val;
    }
};
std::set<node> s;

inline bool operator<(node p,node q){
    return p.l<q.l;
}
```

然后我们就可以初始化了。对于这道题，我们可以像这样初始化：

```cpp
for(re int i=1;i<=n;++i)
    s.insert(node(i,i,rnd()%maxval+1));
```

初始化完了？

初始化完了。

然后就是珂朵莉树的核心操作~~之一~~，

```cpp
std::<set>::iterator split(int pos)
```

作用是分离出一个左端点为`pos`的区间并返回它的迭代器。它的具体实现如下：

```cpp
#define _it std::set<node>::iterator
//上面这句手打非常麻烦，建议宏定义
inline _it split(int pos){
    _it it=std::lower_bound(s.begin(),s.end(),node(pos));
    //找第一个左端点大于等于pos的区间
    if(it!=s.end()&&it->l==pos)
        return it;
    //如果找到了一个左端点恰好为pos的区间，我们就不用split了，直接返回它的迭代器
    --it;
    //否则当前区间的左端点一定大于pos，pos这个位置一定在前一个区间内
    int l=it->l,r=it->r;
    long long val=it->val;
    s.erase(it);
    s.insert(node(l,pos-1,val));
    return s.insert(node(pos,r,val)).first;
    //将区间[l,r]删除，并插入区间[l,pos)和[pos,r]
}
```

虽然只是把一个区间砍成两半又放回去了，但我们并不是在做无用功，因为我们把原区间与操作无关的部分分离开了。

`insert`函数的返回值类型是`std::pair<std::_Rb_tree_const_iterator<node>,bool>`~~，别问我啥意思我也不懂，我只是从它的错误报告里抄过来了~~，因此我们需要加个`.first`。

`std::set`内部是用红黑树实现的，虽然我没写过，不过据说，它每次操作的时间复杂度都是近似$O(\operatorname{log}n)$的。

然后是一个同样很核心的操作，

```cpp
void assign(int l,int r,int x)
```

将区间$[l,r]$推平，全部赋成$x$。它的具体实现如下：

```cpp
inline void assign(int l,int r,int x){
    _it itr=split(r+1),itl=split(l);
    //注意一定要先split(r+1)再split(l)，因为如果l与r+1一开始恰好在同一区间内
    //后split(r+1)~~大概~~会修改树中左端点为l的区间的迭代器
    s.erase(itl,itr);
    //将[itl,itr)内所有区间删除
    s.insert(node(l,r,x));
    //用一个大区间取代它们
}
```

这就完了？

这就完了。

`assign`操作保证了珂朵莉树的时间复杂度，在数据随机的情况下，会使得`set`的大小迅速减小，并最终趋于$\operatorname{log}n$。本题的操作二就只需调用一次`assign(l,r,x)`即可。

然后是剩下的三个操作~~，一个比一个暴力~~。

操作一，一个一个区间地拿出来加。

```cpp
inline void IntervalAdd(int l,int r,int x){
    _it itr=split(r+1),itl=split(l);
    for(re _it p=itl;p!=itr;++p)
        p->val+=x;
}
```

就这么几行？

就这么几行。

操作三，把所有区间取出来，然后直接调用`std::sort`。

```cpp
inline long long IntervalXth(int l,int r,int x){
    _it itr=split(r+1),itl=split(l);
    vec.clear();
    for(re _it p=itl;p!=itr;++p)
        vec.push_back(std::make_pair(p->val,p->r-p->l+1));
    std::sort(vec.begin(),vec.end());
    for(re unsigned i=0;i<vec.size();++i){
        x-=vec[i].second;
        if(x<=0)
            return vec[i].first;
    }
    return 0;
}
```

操作四，暴力快速幂。

```cpp
inline int IntervalXpow(int l,int r,int x,int y){
    _it itr=split(r+1),itl=split(l);
    int res=0;
    for(re _it p=itl;p!=itr;++p)
        res=(1LL*res+1LL*(p->r-p->l+1)*cltpow(p->val%y,x,y)%y)%y;
    return res;
}
```

您可能会想，这么暴力的东西，时间复杂度确定不会动不动原地起爆？

这是我在$\text{CodeForces}$上的提交记录：

![](https://i.loli.net/2018/10/14/5bc28b1443ea5.png)

这是我之前提到的那位~~不愿意透露姓名的~~珂学家的跑得最快的一次提交记录：

![](https://i.loli.net/2018/10/14/5bc28c7ecfe96.png)

![](https://i.loli.net/2018/10/14/5bc28bc4eed79.jpg)

珂幻.jpg

因为珂朵莉树的高效几乎全部建立在数据的完全随机上，能用珂朵莉树做的题并没有多少，大部分是在做正解是线段树之类的题想不出正解时骗分用。就比如说，我在学习珂朵莉树时参考的一篇题解提到了[「CF915E」Physical Education Lessons](http://codeforces.com/contest/915/problem/E)，然而……

![](https://i.loli.net/2018/10/14/5bc297890bbc6.png)

> $\text{Updated on 2018-11-01}$：
> 
> 后来我卡了卡常数过了……
> 
> 以及，删掉了某些内容（

于是，接下来是珂朵莉树的完整板子。

```cpp
#include<cstdio>
#include<algorithm>
#include<vector>
#include<set>
#define re register
#define maxn 100000
#define _it std::set<node>::iterator

namespace cltstream{
    #ifdef ONLINE_JUDGE
        #define size 1048576
        char str[size+1],*head=str,*tail=str;
        inline char gc(){
            if(head==tail){
                tail=(head=str)+fread(str,1,size,stdin);
                if(head==tail)
                    return EOF;
            }
            return *head++;
        }
        #undef size
    #else
        #define gc getchar
    #endif

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
    inline void write(_tp x,char text=' '){
        if(x<0)
            putchar(45),x=-x;
        if(!x)
            putchar(48);
        else{
            int digit[20];
            for(digit[0]=0;x;digit[++digit[0]]=x%10,x/=10);
            for(;digit[0];putchar(digit[digit[0]--]^48));
        }
        putchar(text);
    }
}

int n,m,seed,maxval;
struct node{
    int l,r;
    mutable long long val;

    node(int _l,int _r=-1,long long _val=-1){
        l=_l;
        r=_r;
        val=_val;
    }
};
std::set<node> s;
std::vector<std::pair<long long,int> > vec;

inline int rnd(){
    int res=seed;
    seed=(7LL*seed+13)%1000000007;
    return res;
}

inline void swap(int& l,int& r){
    int tmp=l;
    l=r;
    r=tmp;
}

int cltpow(int x,int y,int mod){
    if(y==1)
        return x;
    int res=cltpow(x,y>>1,mod);
    res=1LL*res*res%mod;
    if(y&1)
        res=1LL*res*x%mod;
    return res;
}

inline bool operator<(node p,node q){
    return p.l<q.l;
}

inline _it split(int pos){
    _it it=std::lower_bound(s.begin(),s.end(),node(pos));
    if(it!=s.end()&&it->l==pos)
        return it;
    --it;
    int l=it->l,r=it->r;
    long long val=it->val;
    s.erase(it);
    s.insert(node(l,pos-1,val));
    return s.insert(node(pos,r,val)).first;
}

inline void IntervalAdd(int l,int r,int x){
    _it itr=split(r+1),itl=split(l);
    for(re _it p=itl;p!=itr;++p)
        p->val+=x;
}

inline void IntervalAssign(int l,int r,int x){
//就是之前提到的assign
    _it itr=split(r+1),itl=split(l);
    s.erase(itl,itr);
    s.insert(node(l,r,x));
}

inline long long IntervalXth(int l,int r,int x){
    _it itr=split(r+1),itl=split(l);
    vec.clear();
    for(re _it p=itl;p!=itr;++p)
        vec.push_back(std::make_pair(p->val,p->r-p->l+1));
    std::sort(vec.begin(),vec.end());
    for(re unsigned i=0;i<vec.size();++i){
        x-=vec[i].second;
        if(x<=0)
            return vec[i].first;
    }
    return 0;
}

inline int IntervalXpow(int l,int r,int x,int y){
    _it itr=split(r+1),itl=split(l);
    int res=0;
    for(re _it p=itl;p!=itr;++p)
        res=(1LL*res+1LL*(p->r-p->l+1)*cltpow(p->val%y,x,y)%y)%y;
    return res;
}

int main(){
    cltstream::read(n);
    cltstream::read(m);
    cltstream::read(seed);
    cltstream::read(maxval);
    for(re int i=1;i<=n;++i)
        s.insert(node(i,i,rnd()%maxval+1));
    for(re int i=1;i<=m;++i){
        int opt=rnd()%4+1,l=rnd()%n+1,r=rnd()%n+1,x,y;
        if(l>r)
            swap(l,r);
        switch(opt){
            case 1:
                x=rnd()%maxval+1;
                IntervalAdd(l,r,x);
                break;
            case 2:
                x=rnd()%maxval+1;
                IntervalAssign(l,r,x);
                break;
            case 3:
                x=rnd()%(r-l+1)+1;
                cltstream::write(IntervalXth(l,r,x),'\n');
                break;
            case 4:
                x=rnd()%maxval+1;
                y=rnd()%maxval+1;
                cltstream::write(IntervalXpow(l,r,x,y),'\n');
                break;
        }
    }
    return 0;
}
```

以上。
