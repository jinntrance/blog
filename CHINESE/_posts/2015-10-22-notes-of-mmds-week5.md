---
layout: post
title: "MMDS 笔记 week 5&6"
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

但是当数据量很大而不能全部放在内存中计算时，而且用尽量少的迭代次数计算结果。我们就找到BFR(Bradley-Fayyard-Reina)。这个算法中，初始选中k 个centroids 后，遍历数据的过程中使用统计量（总数N、总和向量SUM、平方和向量SUMSQ）即可。那么在某一个维度i 上，$centroid_i = SUM_i / N$，而方差可以通过 $ variace_i = (SUMSQ_i / N) – (SUM_i / N)^2$。

我们需要维持三类集合：

- Discard set 离某个centroid 特别近（使用Mahalanobis distance 判断）而被归并的点。每个cluster 维护一个DS。
- Compression sets 多组点。每组内部点较近，但离任何一个centroid 都不近；这些点的小组（mini-cluster ）也被统计，但是这些小组不加入任何一个cluster。
- Retained set 离任何一个centroid 和 CS 中的mini-clusters 都不近；离待加入CS；只有一个集合。

BFR 算法具体步骤如下：

1. 每次处理一定量的数据（a chunk），离centroids 近（Mahal distance 小于$3\delta$，高斯分布中当点分布在$[\mu-d,\mu+d]$（d为$\delta,2\delta,3\delta$）范围内时的概率对应（68%, 95%, 99%） ）的点加入各个cluster 的DS，更新各个clusters 的统计量.
2. 这个chunk 中未加入DS 的各点，加上之前RS 中的点，使用内存中可用的clustering 算法聚类，然后加入CS中。无法聚类的仍然放在RS 中。
3. 使用阀值(合并后的variance 小于该阀值)，合并CS 中的mini-clusters
4. 重复第一步直到结束
5. 把CS 中的mini-clusters 和RS 的点都合并到他们最近的cluster

### CURE

CURE代表 Clustering Using REpresentatives

BFR 的一个问题是，只使用centroid 作为某个cluster 的代表。而使用Mahal Distance 时，就仅仅适用于 规则（二维中圆形或椭圆形的cluster）。而CURE 就使用多个点代表某个cluster，然后也能适用于任意形状的cluster。

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
- 假设$|A_r| \gt |A_g|$
- 因为$A_r$ 都无法分配到$S_r$ 中的任何一个广告主，所以$M\_{opt}$ 中 其都应该分配给$S_g$ 中
- 而$|S_g| = |A_g| \lt |A_r|$ ，矛盾，假设不成立。
- 故而$|A_r| \le |A_g|$，则CR 就应该>=0.5

计算广告中，早期使用CPM 收费，Overture 2000年首创使用CPC 收费，而AdWords 2002年首创使用eCPC(bid*CTR) 排序。但问题是，广告位有限，广告主预算也有限，每次query 都会竞价，而每次CTR 也不一样，如何来权衡这些呢？

BALANCE Algorithm：每次选取预算最充足的广告主。其\`CR=1-1/e\`



**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


