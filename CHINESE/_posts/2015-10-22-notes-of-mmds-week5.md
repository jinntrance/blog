---
layout: post
title: "MMDS 笔记 week 5&6&7"
modified: 2015-10-22 19:46:00 +0800
tags: [MMDS,ML]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

前绪笔记：
[第一二周的笔记]({{ site.url }}{% post_url 2015-09-28-notes-of-mmds-week1 %})
[第三四周的笔记]({{ site.url }}{% post_url 2015-10-07-notes-of-mmds-week3 %})

## Clustering

涉及到聚类，则需要计算“距离”，一般的距离有：

- Jaccard distance 集合之间的距离
- Euclidean distance 几何空间中的距离
- Cosine distance 向量之间的距离
- **Mahalanobis distance**: 表征一个点跟某centroid 的距离。

> 
  * Cluster C has centroid $(c_1,...,c_d)$ in d dimensions and standard deviations $(\sigma_1,...,\sigma_d)$. Point $P =(x_1,...,x_d)$.
  * Normalized distance in dimension i:$y_i = (x_i – c_i)/\sigma_i$
  * MD of point P from cluster C is $\sqrt{\sum\_{i=1}^d y_{i}^2}$

聚类Cluster 中的一些概念：

- Centroid 各点的平均值，中心，但是不存在该点。
- Clustroid， 离Centroid 最近（离所有其他点最近）的该cluster 中的点
- Diameter 该Cluster 中任意两点间最大的距离
- Radius 离centroid/clustroid 最远的点的距离

最简单最直接的是Hierarchical Clustering，就是每次合并最临近的点，然后慢慢将clusters 的数量减少到k。


### BFR

K-means 可参照[Clustering and PCA]({{site.url}}{% post_url 2015-08-09-ml-notes %}#clustering-and-pca) 

但是当数据量很大而不能全部放在内存中计算时，而且用尽量少的迭代次数计算结果。我们就找到BFR(Bradley-Fayyard-Reina)。这个算法中，初始选中k 个centroids 后，遍历数据的过程中使用统计量（总数N、总和向量SUM、平方和向量SUMSQ）即可。那么在某一个维度i 上，$centroid_i = SUM_i / N$，而方差可以通过$variace_i = (SUMSQ_i / N) – (SUM_i / N)^2$ 求得。

为了达到上面的愿景，我们需要维持三类集合：

- **Discard set** 离某个centroid 特别近（使用Mahalanobis distance 判断）而被归并的点。每个cluster 维护一个DS。
- **Compression sets** 多组点。每组内部点较近，但离任何一个centroid 都不近；这些点的小组（mini-cluster ）也被统计，但是这些小组不加入任何一个cluster。
- **Retained set** 离任何一个centroid 和 CS 中的mini-clusters 都不近；离待加入CS；只有一个集合。

BFR 算法具体步骤如下：

1. 每次处理一定量的数据（a chunk），离centroids 近（Mahal distance 小于$3\delta$，高斯分布中当点分布在$[\mu-d,\mu+d]$（d为$\delta,2\delta,3\delta$）范围内时的概率对应（68%, 95%, 99%） ）的点加入各个cluster 的DS，更新各个clusters 的统计量.
2. 这个chunk 中未加入DS 的各点，加上之前RS 中的点，使用内存中可用的clustering 算法聚类，然后加入CS中。无法聚类的仍然放在RS 中。
3. 使用阀值(合并后的variance 小于该阀值)，合并CS 中的mini-clusters
4. 重复第一步直到结束
5. 把CS 中的mini-clusters 和RS 的点都合并到他们最近的cluster

### CURE

CURE代表 Clustering Using REpresentatives

BFR 的一个问题是，只使用centroid 作为某个cluster 的代表。而使用Mahal Distance 时，就仅仅适用于规则（二维中圆形或椭圆形的且不重叠的clusters ）分布的点，对于狭长状，或交叉的clusters 就无能为力了。而CURE 就使用多个点代表某个cluster，然后也能适用于任意形状的cluster。

CURE 算法步骤：

1. 随机选取样本，在内存中cluster 成k 个，并作为initial clusters
2. 选取representative points(RP)：在一个cluster 中选取尽量分散的c（比如4） 个RPs（第一个离centroid 最远，然后后面的新RP离之前的RPs 最远）
3. 把RPs 向centroid 移动固定的比例（比如移动把距离缩小为原来的80%）
4. 重新扫描全部数据集，离新的点p 最近的RP 所在的cluster，就是p 需要分配过去的cluster 

## Computational Advertising

这里主要讲的是online  allocation 的问题，即把广告分配给哪个advertiser 的二分图的perfect matching 的问题。而且这个是需要Online algorithm 做的。

**Competitive ratio**

> For input I, suppose greedy produces matching $M\_{greedy}$ while an optimal matching is $M\_{opt}$, 
> Competitive ratio = \`min\_{forall  I} (|M\_{greedy}| / |M_{opt}|)\`

可以证明，贪心算法的Competitive ratio 最小是0.5 ，简单一些可用反证法证明。

- 假设$M\_{opt}$ 中的广告为A，广告主为S（大小与A相等）。$A\_g$ 可以表示已经分配的广告，$S_g$ 表示对应的收到广告的广告主。那么$A_r=A - A_g$ 表示未能分配的广告,$S_r=S - S_g$ 表示未分配到广告的广告主。
- 假设 $\|A_r\| \gt \|A_g\|$
- 因为$A_r$ 都无法分配到$S_r$ 中的任何一个广告主，所以$M\_{opt}$ 中 其都应该分配给$S_g$ 中
- 而$\|S_g\| = \|A_g\| \lt \|A_r\|$ ，矛盾，假设不成立。
- 故而$\|A_r\| \le \|A_g\|$，则CR 就应该>=0.5

计算广告中，早期使用CPM 收费，Overture 2000年首创使用CPC 收费，而AdWords 2002年首创使用eCPC(bid*CTR) 排序。但问题是，广告位有限，广告主预算也有限，每次query 都会竞价，而每次CTR 也不一样，如何来权衡这些呢？

BALANCE Algorithm：每次选取预算最充足的广告主。其\`CR=1-1/e\` 

- 假设有N 个advertisers A（每个advertiser 有budget B>N ），N 轮竞价，每轮有B 个queries。且假设第i 轮时，只有$A_i ... A_N$ 这$N-i+1$ 个advertisers 可以参与竞价。那么Optimum revenue 就为 $N*B$
- 那么第i 轮，$A_i$ 该轮分配到的queries 为\`B/(N-i+1)\`，总共分配到\`S_i = sum\_(i=1)^k B/(N-i+1) = B sum_(i=1)^k 1/(N-i+1)\` 最后耗尽budget 则应该有\`S_i >= B\`
- 根据Euler 公式，对于足够大的N，\`sum\_(i=1)^N 1 / N = ln N\` ，则\`S_i = B*( ln N - ln(N-i)) >= B\` 
- 解得Revenue  \`(1-1/e)\*B*N\`，从而\`CR = 1- 1/e\`




## SVM

SVM 也就是找到最佳的分隔线、面L。使得离L 最近的点离H 的距离（margin $\gamma$ ）最大。若L 为$\vec w * \vec x + b = 0$，那么点A 到L 的距离就可以表示为 $\vec w * A + b$

那么，数学化SVM 的基本思想表示可以为：

\`
argmax_(w) gamma = s.t. forall i,y_i (vec w * vec x_i + b) >= gamma
\`

上式中，不难发现如果直接把$\vec w$ 变大，$\gamma$ 也会随之增大；但实际上这个$\gamma$ 应该是不变的才对。所以应该归一化$\vec w$，可使用\`||w|| = sqrt (sum_(j=1)^d (vec w^j)^2)\`进行归一（其中d 代表维度数量）。 通过求解可得\`gamma = 1 / (||vec w||)\`，那么问题就转化为：

\`argmin_w 1/2 ||w||^2 , s.t. forall i,y_i (vec w * vec x_i + b) >= 1 \`

上面这种情况，还是所有数据都是可分的。如果不是，就需要引入Regulization Term 了。

\`min\_(w,b) 1/2 ||w||^2 + C sum_(i=1)^n       xi_i, s.t. forall i,y_i  (w x_i + b) >= 1- xi_i\`其中$\xi_i$ 惩罚项，如果i 被分对，则$\xi_i = 0$ 否则$\xi_i=\gamma + distance(x_i, L)$ 。其中上式为Hinge Loss，跟Android Ng 的ML课程讲的[SVM]({{ site.url }}{% post_url 2015-08-09-ml-notes %}#svm) 提到的也就比较一致了。 更确切的SVM 的目标函数应为：
\`f(w,b) = 1/2 sum\_(j=1)^d (vec w^j)2 +  C sum\_(i=1)^n max{0,1 - y\_i(sum_(j=1)^d vec w^j vec x_i^j +b)\`
然后用[(B)GD 或 SGD](({{ site.url }}{% post_url 2015-08-09-ml-notes %}#large-scale-ml)) 即可求解$w,b$
## Decision Tree
先说Information Gain的概念：
> IG(Y \| X) : We must transmit Y over a binary link. How many bits on average would it save us if both ends of the line knew X?
DT 建树时有两个问题需要考虑：- 如何最最佳的分裂节点？IG最大的
- 何时停止分裂？IG小于某个阀值，或叶子节点上的数据点数量达到下限数量了，或者叶子节点总数达到一定值。
- 叶子节点值怎么得？分类分题，就是多数的分类；回归问题：可求平均；或用线性回归再针对叶子上的样本拟合一下。

Entropy, \`H(X) = - sum_(j=1)^m p_j log p_j\` 其实反映了X 中各元素相互转换所需要的信息量。

> What’s the smallest possible number of bits, on average, per symbol, needed to transmit a stream of symbols drawn from X’s distribution?

所以，大信息熵意味中X 中元素分布越分散越均匀；小信息熵代表X 中元素分布越集中。

SVM 和DT 对比

**SVM**
- Classification: Usually only 2 classes
- Real valued features: (no categorical ones)
- Tens/hundreds of thousands of features
- Very sparse features
- Simple decision boundary. No issues with overfitting
  
Example applications

- Text classification
- Spam detection
- Computer vision
**Decision trees**
- Classification & Regression: Multiple (~10) classes
- Real valued and categorical features
- Few (hundreds) of features
- Usually dense features
- Complicated decision boundaries: Overfitting! Early stopping

Example applications

- User profile classification
- Landing page bounce prediction
## MAP-REDUCE Algorithms

MR 里面重点考虑两个方面

- computation cost
- communication cost

而后者实际上更耗时，所以要尽量降低后者，比如让reduce 阶段的replications 更少。如此MR 的好坏就由如下两个方面进行衡量。

- reducer size(q)，就是指一个reducer 能获取的最大inputs 数量
- replication  rate，就是指每个mapper 输出的KV 数量。

例如$n*n$ 的两个矩阵A 和矩阵B相乘，一般情况下的解决方法如后。假如单个reducer 输入为q，则实际只能拿到为q/n 这么多数量的行/列；假设其拿到最多q/2n 行，q/2n 列，那么这个reducer 最多产出\`q^2/(4n^2)\` 个数。因为产出$n^2$ 的数，则至少需要\`(4n^2)/q^2\` 个reduers，则输入所有reduers 的inputs 数量为 \`(4n^2)/q\`，则因为总的原输入为$2n^2$，则\`r=(2n^2)/q\`。故而communication cost 为$4n^4 * r$

而如果把A 分解成多个\`g\*g/2\` 的小块儿，把B 分解成多个\`g/2*g\` 的小块儿。如此两个阶段的MR 也可以减少communication cost 为\`4n^2g=(4n^3)/sqrt(q)\`(参见最后week 6最后一讲末页)。

## LSH

> A family **H** of hash functions is said to be $(d_1,d_2,p_1,p_2)$-sensitive if for any x and y in S:> 1. If $d(x,y) < d_1$, then the probability over all h in H, that h(x) = h(y) is at least $p_1$.2. If $d(x,y) > d_2$, then the probability over all h in H, that h(x) = h(y) is at most $p_2$.
如此，我们也可以用AND 和OR 的形式分别定义 $(d_1,d_2,p_1^r,p_2^r)$-sensitive 和 $(d_1,d_2,1-(1-p_1)^b,1-(1-p_2)^b)$-sensitive
 同时，也可以组合AND-OR的使用得到新的形式。
 
设两个串的Jacquard Distance为$J = E/(E+C)$，E、C 分别表示edit distance和共串的长度。而若一串长L，则另一串长M应：\`L*(1-J)<=M<=L/(1-J)\`
 
所以，通常，我们对string就下取整取\`|\__ JL+1 __|\` 个prefix chars来index，放入对应的hash buckets 中，查找的时候就可以根据prefix 对应的buckets 进行查找。

假设，字符串probe string $s$(长度L)和目标匹配t中，最先相等的是$s[i] == t[j]$(索引从1 开始)，那么两者的edit distance 一定有\`E>=i+j-2\`，而最长子串LCS 长度$C<=L- i +1$

所以\`J = E/(E+C) >= (i+j-2)/(L+J-1)\` 则 \`j<=(JL-J-i+2/(1-J))\`

## Topic-Specific PR

之前的[Page Rank]({{ site.url }}{% post_url 2015-09-28-notes-of-mmds-week1 %}/#pagerank) 公式简略如后：

\`
vec r^(n+1) = (beta * M + (1-beta)/n vec e * vec e^T) * vec r ^n
\`

原始的PR，就是$1-\beta$ 的random teleports 是针对所有节点的。现在就像把random walk 仅仅限制在符合Topic 的S集合节点里面则：

\`
vec r^(n+1) = (beta * M + (1-beta)/|S| * E_s) * vec r ^n
\`

其中$E_s$ 中，$E_{ij} = 1, if\ i \in S$ （亦即teleport 到S 集合中的点才为1），其余为0，即所有指向S 中节点的对应矩阵位置才为1。其实就是把网络权重向S 中的节点倾斜。

**Hubs and Authorities** 直观的理解是，出度比较多的可以叫Hubs，入度比较多的点可以叫Authorities。而且两者可以迭代相互贡献。即

\`
h_i = sum\_(i -> j) a\_j, 
a_j = sum_(i -> j) h_i
\`

**HITS algorithm** 的步骤就是：

1. \`a_i = h_i = 1/ sqrt(n)\`
2. 设邻接矩阵A，其中\`A_(ij) = 1, if i->j\`
3. \`a = A*h, h = A^T * a\`，归一化。
4. 迭代3 直至收敛。

大家知道PR 是怎么运作的后，很多人甚至也就想到了通过spam 来优化排名。可以分析一下背后的原理。最简单的就是通过无数多的farm pages 来跟待优化的target page相互指向。

设x，是原始的PR score， y 是通过spam 途径调整target 后的PR score，那么farm pages 的PR score 就是\`beta * y / M + (1-beta)/n\`，那么target page 的PR score 为：

\`y = x + beta * M * (beta * y / M + (1-beta)/n) + (1-beta)/n\`

则： \` y = x / (1-beta^2) + (beta\*M)/((1+beta)n) + 1/((1+beta)*n)\`

所以，实际上，只需要提高M 中对target 起贡献的farm pages 的数量，就能提高y。

避免上述spam，可以通过使用top PR值的URL 或权威域名（.edu .gov）的URL，先建立Topic-PR $r^+$ ；而通过全局计算$r$ ，如果\`r/ r^+\` 比1 大很多，则越可能是spam。

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


