---
mathjax: true
date: 2018-12-26 20:17:22
title: 题目组试题选讲
tags:
  - 洛谷
  - 题目组
  - 毒瘤题
categories:
  - 题解
password: FLS&&8]T:$f3[yrtt!osE+K&3"`?IlA{
abstract: 该文章已被加密
message: 输入密码继续阅读
---
先宣传一波[团队](https://www.luogu.org/team/show?teamid=11367)。

<!-- more -->

### [「T47720」孤立元](https://www.luogu.org/problemnew/show/T47720)

[已有题解](/luogu-t47720-solution/)。

### [「T53537」营救元首](https://www.luogu.org/problemnew/show/T53537)

能看出[五彩斑斓的世界](https://www.luogu.org/problemnew/show/P4117)来吗？

没错就是JF切了这道题以后~~根号上脑~~搞了这么一个东西。

不过这道题相对之下有点麻烦的，因为你需要维护两个tag，一个处理减，一个处理推平。而且求前驱的时候不能值域分块，然后就只能套`set`。

详细点说的话，就是每个块维护最大值和最小值。操作$1$可以选择枚举所有大于$k$的数，然后减去$k$；也可以枚举所有小于等于$k$的数，加上$k$之后整个块打上一个减$k$的标记，标记这个块内的所有数都被减去了$k$。哪个运算量少就选哪个。

操作$2$就先查询最小值~~（这个都会吧）~~，然后散块直接改，整块打个标记就好，标记这个块内的所有数都被改成了另一个数。

操作$3$就不必多说了，散块暴力找，整块`lower_bound`。

不过说实话，写起来挺麻烦的。也懒得看以前我写的代码了，直接贴出来吧。

{% fold "Toggle Code" %}

```cpp
#include<cstdio>
#include<set>
#define re register
#define maxn 100000
#define maxm 100000
#define maxblock 320
#define maxval 200000
#define mod 998244353
#define max(a,b) ((a)>=(b)?(a):(b))
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

    char cltout[size+1],*oh=cltout;
    int outcnt=0;
    inline void pc(char c){
        if(c==-1)
            fwrite(cltout,1,outcnt,stdout);
        else{
            if(outcnt==size){
                fwrite(cltout,1,size,stdout);
                oh=cltout;
                outcnt=0;
            }
            *oh++=c;
            ++outcnt;
        }
    }
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
    inline void write(_tp x,char text=' '){
        if(x<0)
            pc(45),x=-x;
        if(!x)
            pc(48);
        else{
            int digit[22];
            for(digit[0]=0;x;digit[++digit[0]]=x%10,x/=10);
            for(;digit[0];pc(digit[digit[0]--]^48));
        }
        pc(text);
    }
}

int n,m,size;
int a[maxn+1],id[maxn+1];
int val[maxn+1],f[maxn+1];
int pos[maxblock+1][maxval+1];
int maxv[maxblock+1],minv[maxblock+1],tag[maxblock+1],sam[maxblock+1];
std::set<int> s[maxblock+1];

int find(int x){
    return f[x]==x?x:f[x]=find(f[x]);
}

inline void init(int x){
    maxv[x]=-2e9;
    minv[x]=2e9;
    for(re int i=(x-1)*size+1;i<=x*size&&i<=n;++i)
        if(!pos[x][a[i]]){
            val[i]=a[i];
            f[i]=i;
            pos[x][a[i]]=i;
            maxv[x]=max(maxv[x],a[i]);
            minv[x]=min(minv[x],a[i]);
            s[x].insert(a[i]);
        }
        else
            f[i]=pos[x][a[i]];
}

inline void destory(int x){
    for(re int i=(x-1)*size+1;i<=x*size&&i<=n;++i){
        a[i]=sam[x]?sam[x]:val[find(i)]+tag[x];
        pos[x][val[i]]=0;
    }
    tag[x]=sam[x]=0;
    s[x].clear();
}

inline void solve(int x,int y){
    if(sam[x]){
        if(sam[x]>y)
            sam[x]-=y;
        return;
    }
    if(maxv[x]-(y-tag[x])<=(y-tag[x])-minv[x]+1){
        for(re int i=(y-tag[x])+1;i<=maxv[x];++i)
            if(pos[x][i]){
                s[x].erase(i);
                if(!pos[x][i-y]){
                    val[pos[x][i]]-=y;
                    pos[x][i-y]=pos[x][i];
                    s[x].insert(i-y);
                }
                else
                    if(pos[x][i]>pos[x][i-y])
                        f[pos[x][i]]=pos[x][i-y];
                    else{
                        f[pos[x][i-y]]=pos[x][i];
                        pos[x][i-y]=pos[x][i];
                        val[pos[x][i-y]]-=y;
                    }
                pos[x][i]=0;
            }
    }
    else{
        for(re int i=(y-tag[x]);i>=minv[x];--i)
            if(pos[x][i]){
                s[x].erase(i);
                if(!pos[x][i+y]){
                    val[pos[x][i]]+=y;
                    pos[x][i+y]=pos[x][i];
                    s[x].insert(i+y);
                }
                else
                    if(pos[x][i]>pos[x][i+y])
                        f[pos[x][i]]=pos[x][i+y];
                    else{
                        f[pos[x][i+y]]=pos[x][i];
                        pos[x][i+y]=pos[x][i];
                        val[pos[x][i+y]]+=y;
                    }
                pos[x][i]=0;
            }
        tag[x]-=y;
    }
    minv[x]=*s[x].begin();
    std::set<int>::iterator it=s[x].end();
    --it;
    maxv[x]=*it;
}

inline void IntervalCut(int l,int r,int x){
    int L=id[l],R=id[r];
    destory(L);
    for(re int i=l;i<=L*size&&i<=r;++i)
        if(a[i]>x)
            a[i]-=x;
    init(L);
    for(re int i=L+1;i<=R-1;++i)
        solve(i,x);
    if(L<R){
        destory(R);
        for(re int i=(R-1)*size+1;i<=r;++i)
            if(a[i]>x)
                a[i]-=x;
        init(R);
    }
}

inline void IntervalAssignToMin(int l,int r){
    int L=id[l],R=id[r],res=2e9;
    destory(L);
    for(re int i=l;i<=L*size&&i<=r;++i)
        res=min(res,a[i]);
    for(re int i=L+1;i<=R-1;++i)
        res=min(res,sam[i]?sam[i]:minv[i]+tag[i]);
    if(L<R){
        destory(R);
        for(re int i=(R-1)*size+1;i<=r;++i)
            res=min(res,a[i]);
    }
    for(re int i=l;i<=L*size&&i<=r;++i)
        a[i]=res;
    init(L);
    for(re int i=L+1;i<=R-1;++i)
        sam[i]=res;
    if(L<R){
        for(re int i=(R-1)*size+1;i<=r;++i)
            a[i]=res;
        init(R);
    }
}

inline void IntervalPre(int l,int r,int x){
    int L=id[l],R=id[r],p=0,res=-2e9;
    if(sam[L]){
        if(sam[L]<x&&sam[L]>res){
            p=l;
            res=sam[L];
        }
    }
    else
        for(re int i=l;i<=L*size&&i<=r;++i)
            if(val[find(i)]+tag[L]<x&&val[find(i)]+tag[L]>res){
                p=i;
                res=val[f[i]]+tag[L];
            }
    for(re int i=L+1;i<=R-1;++i)
        if(sam[i]){
            if(sam[i]<x&&sam[i]>res){
                p=(i-1)*size+1;
                res=sam[i];
            }
        }
        else{
            std::set<int>::iterator it=s[i].lower_bound(x-tag[i]);
            if(it!=s[i].begin()){
                --it;
                if(*it+tag[i]<x&&*it+tag[i]>res){
                    p=pos[i][*it];
                    res=*it+tag[i];
                }
            }
        }
    if(L<R){
        if(sam[R]){
            if(sam[R]<x&&sam[R]>res){
                p=(R-1)*size+1;
                res=sam[R];
            }
        }
        else
            for(re int i=(R-1)*size+1;i<=r;++i)
                if(val[find(i)]+tag[R]<x&&val[find(i)]+tag[R]>res){
                    p=i;
                    res=val[f[i]]+tag[R];
                }
    }
    if(p)
        cltstream::write(p,'\n');
    else{
        cltstream::pc('G');
        cltstream::pc('R');
        cltstream::pc('E');
        cltstream::pc('A');
        cltstream::pc('T');
        cltstream::pc(10);
    }
}

int main(){
    cltstream::read(n);
    cltstream::read(m);
    for(re int i=1;i<=n;++i)
        cltstream::read(a[i]);
    for(;(size+1)*(size+1)<=n;++size);
    for(re int i=1;(i-1)*size+1<=n;++i){
        init(i);
        for(re int j=(i-1)*size+1;j<=i*size&&j<=n;++j)
            id[j]=i;
    }
    for(re int i=1;i<=m;++i){
        int opt,l,r,x;
        cltstream::read(opt);
        cltstream::read(l);
        cltstream::read(r);
        switch(opt){
            case 1:
                cltstream::read(x);
                IntervalCut(l,r,x);
                break;
            case 2:
                IntervalAssignToMin(l,r);
                break;
            case 3:
                cltstream::read(x);
                IntervalPre(l,r,x);
                break;
        }
    }
    for(re int i=1;i<=n;++i)
        (a[0]+=sam[id[i]]?sam[id[i]]:val[find(i)]+tag[id[i]])%=mod;
    cltstream::write(a[0],'\n');
    cltstream::pc(-1);
    return 0;
}
```

{% endfold %}

### [「T53987」ZJF日记](https://www.luogu.org/problemnew/show/T53987)

最短路计数+次短路求解。

其实这才应该是签到题啊，然而当初却被排到了T3。不是很懂（

不过话说回来其实题面写的很好啊。

sto __多弗桃__ orz

#### 关于SPFA

他死了。

### [「T56269」选择性失忆](https://www.luogu.org/problemnew/show/T56269)

sto __SnoWY__ orz

才刚学了几个月就出这种神仙题，把我这种从初中就开始学OI的菜鸡吊起来打（

首先我们看到要最小化第$k+1$大的边权。二分？那么问题就转化成了找一条路径，使得其中恰有$k$条边的边权小于某个给定数值。

emmmmmm……这是什么鬼（

总之二分大概不大可行。然后我觉得我扯不下去了，直接讲正解吧（

构造一张$k+1$层的分层图。如果说我们在某一层有一条边从$u$到$v$，边权是$w$，我们就从这一层的$u$，向下一层的$v$连一条$0$权边。然后从最上层的$1$开始跑最短路，路径长度定义为边权最大值，跑到最下层的$n$。然后`dis[最下层的n]`就是答案。

那么为什么这样做可行？假设说我们现在跑出了最上层的$n$的`dis`。现在我们将$n$下压一层，我们肯定会在之前边权最大的那一条边处跨越至下层。这样这条边的边权减为$0$，相当于是说被过滤掉了。不难想象出，如果我们下压$k$层到最底层，边权前$k$大的边就都被过滤掉了，这时路径上的边权最大值就是一开始的$k+1$大。

相信各位应该都会了，我就不贴代码了。

然后还是要%SnoWY。

[](https://i.loli.net/2018/12/26/5c237e1c077b4.jpg)

### [「T62117」复习](https://www.luogu.org/problemnew/show/T62117)

这是一道被线段树踩爆了的分块题。

每个块内维护总和、正数数量和绝对值最小的负数的绝对值。

每次加的时候，散块还是暴力重构，整块就判断一下绝对值最小的负数加完会不会变号，会就重构。

因为保证$k$非负，每个数最多变号一次，也就是说最多重构$n$次，时间复杂度$O(n\sqrt{n})$。

代码太丢人了不贴了。

### [「T64137」「魔板」线段树 2](https://www.luogu.org/problemnew/show/T64137)

这是一道~~丧心病狂的~~卡时空块状分块题。

关于块状分块请看[这里](/block-decomposition/)。

反正也没啥可说的，就是写起来麻烦，我就简单讲一下这题背后的故事吧。

首先一开始我们定的时空限制是$1\text{s}/4\text{MB}$。然而还是放跑了空间复杂度足够优秀的线段树。然后一气之下删了`fread`，把空间限制改到$2\text{MB}$，并把时间限制改到$850\text{ms}$。然后有神仙通过将线段树的多个叶子结点合并起来的方法又水过去了。最后空间直接卡到了现在的$1.5\text{MB}$。然后最后两个点询问加到$2\times 10^{6}$，并塞入大量单点操作，才算把该卡的都卡掉了。

顺便第一次写计分脚本祭。

### [「T65749」斩整「土偶剪定」](https://www.luogu.org/problemnew/show/T65749)

首先高维这种东西我们肯定不能硬想。

首先假设$a_{i}\gt 1$。如果说一个小土块恰有$k$面有颜色，这也就意味着，它恰有$k$个维度的坐标是$1$或$a_{i}$，剩下$n-k$个维度除了$1$和$a_{i}$以外随便选。那么我们的总方案数就是

$$2^{k}\sum_{\mid S\mid=n-k\wedge\forall i\in S,i\in[1,n]\cap\mathbb{Z}}\prod_{i\in S}(a_{i}-2)$$

下文为了方便，我们定义$Q_{k}$为

$$\sum_{\mid S\mid=k\wedge\forall i\in S,i\in[1,n]\cap\mathbb{Z}}\prod_{i\in S}(a_{i}-2)$$

也就是从所有的$a_{i}-2$中选$k$个相乘的所有方案的结果的总和。同时$Q_{0}=1$。

没错就是[这道题](https://www.luogu.org/problemnew/show/P4247)。

现在我们想要对于$[0,n]$内的每一个$i$求出$Q_{i}$。在上面那道题中我们采用的办法是分治。具体来说就是，如果说我们要在$[l,r]$内选$k$个数相乘，我们可以先在$[l,mid]$内选$x$个数相乘，再在$[mid+1,r]$内选$k-x$个数相乘，然后把结果相乘并累加。

形式化地讲的话

$$Q_{k}=\sum_{i=0}^{k}Q_{l,i}Q_{r,k-i}$$

然后我们直接$O(n^{2})$暴力算就好。但是我们发现如果说我们直接分治，我们会得到这么一个关于时间复杂度的递推式

$$T(n)=2T(\cfrac{n}{2})+O(n^{2})$$

根据主定理，我们有$T(n)=O(n^{2})$。

其实我一开始以为它是$O(n^{2}\log n)$的，仔细一算才发现不对（

不过我的标算并不是这么写的。我的做法是从头扫到尾，将前$k$个与第$k+1$个合并。这样的时间复杂度是

$$T(n)=T(n-1)+O(n)$$

很明显也是$O(n^{2})$的。不过好像常数相对较大？

~~然而对比了一下发现常数小了不少（~~

那么问题来了，如果说存在$a_{i}=1$怎么办？

存在$a_{i}=1$就说明，这一维的坐标一定会同时碰到两个边界。那么我们就可以扔掉这个$1$，把它当成$n-1$维处理，然后在最左边添上两个$0$就行了。

同理，如果存在$m$个$a_{i}=1$，我们就扔掉它们并当成$n-m$维处理，然后在最左边添上$2m$个$0$。

其实这道题还可以优化。仔细观察这个式子

$$Q_{k}=\sum_{i=0}^{k}Q_{l,i}Q_{r,k-i}$$

我们看到这其实就是一个卷积，我们套一波FFT/NTT就能把时间复杂度优化到

$$T(n)=2T(\cfrac{n}{2})+O(n\log n)$$

根据主定理，我们有$T(n)=O(n\log^{2}n)$。一写发现跑得飞快。

当然这是仅限于分治做法的，像我标算这种做法上了FFT/NTT也优化不了（

![](/images/TIM截图20190116111347.png)

上面这三个评测记录，最下面的是真正的标算，中间的是分治，上面的是NTT优化分治。

#### 论如何用最简短的语言描述主定理

$$T(n)=aT(\cfrac{n}{b})+O(n^{c}\log^{k}n)$$

$$T(n)=\begin{cases}
&O(n^{c})\;\;&(c>\log_{b}a\wedge k=0)\\
&O(n^{\log_{b}a})&(c<\log_{b}a\wedge k=0)\\
&O(n^{c}\log^{k+1}n)&(c=\log_{b}a)
\end{cases}$$
