---
layout: post
title: "MMDS 笔记 week 3"
modified: 2015-10-07 10:46:29 +0800
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

## Detecting communities

### Affiliation Graph Model

根据图模型，生成对应的network 。
假设模型为

\`B(V,C,M,{p_c})\`

其中V 为节点集合，C 为社区集合，M 为单个节点与C 的关系（Memberships），然后每个community c 都会有一个概率$p_c$ 表示社区内节点连接的概率。

要生成网络时，任意两个节点$u, v$ 连接的概率：

\`P(u, v) = 1- prod_(c in M_m nn M_v) (1-p_c)\`

### BigCLAM

假设节点u 与社区A 的membership 关系用$F\_{uA}$ 表示，u 跟所有社区的关系可以用$\vec F_u$ 表示。那么社区A 中任意两个节点连接的概率为\`P\_A (u,v) = 1- e^(-F\_(uA) * F_(vA))\`，那么在所有社区中，此两者节点节点连接的概率就为 

\`P(u,v) = 1- prod_c (1-P_c(u,v)) = 1- e^(-vec F_u * vec F_v^T)\`

BigClam 就是通过包含现有点V 和边E 的网络图$G(V,E)$，来找出上面提到的F值。划分社区，无疑就是让社区之间更有区分度。比如节点a 只跟节点b 连接，无疑节点a 就该划分到 b所在的社区。意即，上面节点连接概率p(u,v)， 需要考虑到：

- 如果实际网络中u, v连接，那么概率p(u,v)应该越大越正确。
- 如果实际网络中u，v并未连接，那么p(u,v) 越小越好。

换言之，那我们可以调整F 优化如下的likelihood 式子

\`arg max_F prod\_((u,v) in E) p(u,v) prod_((u,v) !in E) (1-p(u,v))\`

考虑到相乘会放大误差且增加计算量，可对上式求log，得到log-likelihood \`arg max_F log(F)\`

\`
log(F) = sum\_((u,v) in E) log(p(u,v)) + sum\_((u,v) !in E) log(1-1- e^(-vec F_u * vec F_v^T)) = sum\_(v in N(u)) log(1- e^(-vec F_u * vec F_v^T)) + sum_(v !in v in N(u)) (-vec F_u * vec F_v^T) 
\`

其中$N(u)$ 代表u 节点的邻居节点。然后通过梯度下降可求。梯度下降求解过程中，优化点就是先针对全局节点计算F 值的和，然后u 的非邻居节点的F值加和值就等于全部减去u 邻居节点的F 值和。因为非邻居节点数量太大，不必每次梯度下降迭代时都遍历全部非邻居节点。

### Laplacian & Spectral Graph Partition

用对角矩阵D($a_{ii}=d_i$) 表示每个节点的度；邻接矩阵（Adjacency Matrix）用A  表示：

- n* n matrix- $A=[a\_{ij}]$, $a_{ij}=1$ if edge between node i and j
如果一个图G 里面所有节点的度都为$d$ 那么我们叫他d-regular graph；则这种图的特征值和特征向量为$d, \vec e$，因为$A * \vec e = d * \vec e$

那么\`L = D-A\` 就是Laplacian Matrix；则LM 的特征值和特征向量为$\lambda_1 = 0, \vec e$, 对于对称矩阵M， 定义

\`
lambda_2 = min_x ((vec x ^T * M * vec x)/(vec x ^T * vec x))
\`

则对于LM 有：

\`vec x ^T * L * vec x = vec x ^T * D * vec x - vec x ^T * A * vec x\`
\`= sum_i D_(ii) * x_i^2 - sum\_((i,j) in E)  2 x_i x_j\` 
\` = sum\_((i,j) in E) (x_i - y_i)^2\`

且需要满足 $\vec x$ 是单位向量即 $\sum_i x_i^2 = 1$；且$\vec x$ 跟LM 的特征向量$\vec e$垂直即 $\sum_i x_i * 1 = 0$

则 \` lambda_2 = min_x (sum\_((i,j) in E) (x_i - y_i)^2)/(sum_i x_i^2) \`

对于已经在组A 内的所有节点，假设其$x_i =-1$，如果j 节点划分到A 组，那么$x_j = -1$，不者$x_j = 1$ 。那么$\lambda_2$ 的物理意义就在于，而如果要找最佳的分割，使得跟A 内部链接比较稠密的点都划分到A 内部。

Spectral Clustering Algorithms 步骤

- Pre-processing: 计算 Laplacian Matrix $L$
- Decomposition 
    - 计算特征值和特征向量$\vec \lambda$，基于特征向量矩阵 $X$，
    - 把点映射到低纬上计算$\lambda_{2} = \vec \lambda[2]$，以及$X$ 对应的第二列值$X[:,2]$
- Grouping 基于上一步结果$X[:,2]$ 排序（排序过程中记录下行号，即对应的节点ID ），将点分到2或多组。


### Data Streams

如果使用滑动窗口计算整数平均时，可优化的点就是，之前长度为N 的滑动窗口平均为m，新来元素j，应该替换的元素为i ，则\`m = (j-i)/N + m\`

**DMGI Algorithm**
0/1 数据流窗口计数，最优方案是使用Buckets，每个bucket 记录一段数据流：

- 该bucket 记录的0/1 串结束timestamp（可以用这个）
- 该bucekt 包含的1 的数量（必须是2的指数）

更新过程：

- 数据流进入$0$，现有bucket 不变化。
- 数据流进入$1$，对于有三个相同size n (n为2 的指数(1,2,4,8))的buckets，合并最早的两个n 的bucekts为一个size 为2n 的bucket并更新end time 为最新bucket的end time；依次合并直到没有3个相同size 的buckets。
- 通过end timestamp 确定最早的buckets 是否已经超出sliding window 范围

**Bloom Filter**


- 设置一个BF ，为array of bits(default to be 1)
- 几个hash 函数可以把一串0/1 流hash 成一个整数i
- 将BF 中第i 个bit 设置成1

新来一个数据流y，按照同样的方式计算$BF_y$，如果$BF_y$ 中有1 的位置BF 对应位置全为1，则该数据流出现过。如果$BF_y$中有1 的位置，BF 中有一个0，则y 未出现过。

#### Finding Distinct Elements

**Flajolet-Martin Approach**

- 将n 个元素使用h() 将其hash 到 $log_2^n$ 个bits 上，相当于二进制
- 对于每一个元素a，设置r(a) 为h(a) 这个二进制数 中连续的trailing zeros(数字末尾连续的0 ) 的个数
- 设置R为最大的r(a)
- 估计$2^R$ 即为最大结果

**Moments**

n个不同元素中出现的数据流中，$m_i$ 为表是i 元素出现的次数。\`sum m_i ^k\` 表示$k^{th} moment$，那么second moment(又叫surprise number) 就是元素频次的平方和。

**AMS method**

随机时间t选定元素a，则t时刻及以后到现在a出现的频次为k，那么定义$X=n\* (2*k-1)$ 则

\`E(X) = 1/n sum n\*(2*k-1) = sum(2\*k-1) = sum k^2\`

就跟surprise number一致了，而且这种定义就可以处理流式计算。所以单$X$ 就可以代表surprise number 了，单可以取多次平均。


**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


