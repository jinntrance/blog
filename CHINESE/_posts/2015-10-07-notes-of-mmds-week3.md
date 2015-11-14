---
layout: post
title: "MMDS 笔记 week 3&4"
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

此方法是根据图模型，生成对应的network 。假设模型为

\`B(V,C,M,{p_c})\`

其中V 为节点集合，C 为社区集合，M 为单个节点与C 的关系（Memberships），然后每个community c 都会有一个概率$p_c$ 表示社区内节点连接的概率。

要生成网络时，任意两个节点$u, v$ 连接的概率：

\`P(u, v) = 1- prod_(c in M_u nn M_v) (1-p_c)\`

### BigCLAM

此方法是通过network 找到对应Graph 的过程。假设节点u 与社区A 的membership 强度用$F\_{uA}$ 表示，u 跟所有社区的关系可以用$\vec F_u$ 表示。那么社区A 中任意两个节点连接的概率为\`P\_A (u,v) = 1- e^(-F\_(uA) * F_(vA))\` （使用e 将这个概率控制在0-1之间，且跟u,v 两者跟A的强度正相关），那么在所有社区中，此两者节点节点连接的概率就为 

\`P(u,v) = 1- prod_c (1-P_c(u,v)) = 1- e^(-vec F_u * vec F_v^T)\`

BigClam 就是通过包含现有点V 和边E 的网络图$G(V,E)$，来找出上面提到的F值。划分社区，无疑就是让社区之间更有区分度。比如节点a 只跟节点b 连接，无疑节点a 就该划分到 b所在的社区。意即，上面节点连接概率p(u,v)， 需要考虑到：

- 如果实际网络中u, v 连接，那么概率p(u,v)应该越大越正确。
- 如果实际网络中u, v 并未连接，那么p(u,v) 越小越好。

换言之，那我们可以调整F 优化如下的likelihood 式子

\`arg max_F prod\_((u,v) in E) p(u,v) prod_((u,v) !in E) (1-p(u,v))\`

考虑到相乘会放大误差且增加计算量，可对上式求log，得到log-likelihood \`arg max_F l(F)\`，其中$l(F)$ 函数

\`l(F) = sum\_((u,v) in E) log(p(u,v)) + sum\_((u,v) !in E) log(1-1+ e^(-vec F_u * vec F_v^T))\`
\` = sum\_(v in N(u)) log(1- e^(-vec F_u * vec F_v^T)) + sum_(v !in v in N(u)) (-vec F_u * vec F_v^T) 
\`

其中$N(u)$ 代表u 节点的邻居节点。然后通过梯度下降可求。梯度下降求解过程中，优化点就是先针对全局节点计算F 值的和，然后u 的非邻居节点的F值加和值就等于全部减去u 邻居节点的F 值和。因为非邻居节点数量太大，不必每次梯度下降迭代时都遍历全部非邻居节点。

### Laplacian & Spectral Graph Partition

用对角矩阵D($a_{ii}=d_i$) 表示每个节点的度；邻接矩阵（Adjacency Matrix）用A  表示：

- n* n matrix- $A=[a\_{ij}]$, $a_{ij}=1$ if edge between node i and j
如果一个图G 里面所有节点的度都为$d$ 那么我们叫他d-regular graph；则这种图的特征值和特征向量为$d, \vec e$，因为$A * \vec e = d * \vec e$

那么\`L = D-A\` 就是Laplacian Matrix；则LM 的一个特征值和特征向量为$\lambda_1 = 0, \vec e$, 对于对称矩阵M， 定义

\`
lambda_2 = min_x ((vec x ^T * M * vec x)/(vec x ^T * vec x))
\`

则对于LM 有：

\`vec x ^T * L * vec x = vec x ^T * D * vec x - vec x ^T * A * vec x\`
\`= sum_i D_(ii) * x_i^2 - sum\_((i,j) in E)  2 x_i x_j\` 
\` = sum\_((i,j) in E) (x_i - x_j)^2\`

且需要满足 $\vec x$ 是单位向量即 $\sum_i x_i^2 = 1$；且$\vec x$ 跟LM 的特征向量$\vec e$垂直即 $\sum_i x_i * 1 = 0$

则 \` lambda_2 = min_x (sum\_((i,j) in E) (x_i - x_j)^2)/(sum_i x_i^2) \`

对于已经在组A 内的所有节点，假设其$x_i =-1$，如果j 节点划分到A 组，那么$x_j = -1$，不者$x_j = 1$ 。那么$\lambda_2$ 的物理意义就在于，而如果要找最佳的分割，使得跟A 内部链接比较稠密的点都划分到A 内部。

Spectral Clustering Algorithms 步骤

- Pre-processing: 计算 Laplacian Matrix $L$
- Decomposition 
    - 计算特征值和特征向量$\vec \lambda$，及特征向量矩阵 $X$，
    - 把点映射到低纬上计算$\lambda_{2} = \vec \lambda[2]$，以及$X$ 对应的第二列值$X[:,2]$
- Grouping 基于上一步结果$X[:,2]$ 排序（排序过程中记录下行号，即对应的节点ID ），然后使用threshold 将排序后的点分到2或多组。


## Data Streams

如果使用滑动窗口计算整数平均时，可优化的点就是，之前长度为N 的滑动窗口平均为m，新来元素j，应该替换的元素为i ，则\`m = (j-i)/N + m\`

### DMGI Algorithm

0/1 数据流窗口计数，最优方案是使用Buckets，每个bucket 记录一段数据流：

- 该bucket 记录的0/1 串结束timestamp（可以用这个）
- 该bucekt 包含的1 的数量（必须是2的指数）

更新过程：

- 数据流进入$0$，现有bucket 不变化。
- 数据流进入$1$，对于有三个相同size n (n为2 的指数函数值1,2,4,8 等)的buckets，合并最早的两个size 为n 的buckets为一个size 为2n 的bucket，并更新end time 为最新bucket的end time；依次合并直到没有3个相同size 的buckets。
- 通过end timestamp 确定最早的buckets 是否已经超出sliding window 范围

### Bloom Filter

- 设置一个长度为t的BF ，为array of bits(default to be 0)
- 几个hash 函数可以把一串0/1 流hash 成一个自然数i(i<=t)
- 将BF 中第i 个bit 设置成1

新来一个数据流y，按照同样的方式计算$BF_y$，如果$BF_y$ 中有1 的位置BF 对应位置全为1，则该数据流出现过。如果$BF_y$中有1 的位置，BF 中有一个0，则y 未出现过。

假设d 个飞镖投t 个靶，那么单个靶被命中的概率是\`1/t\`,那么所有飞靶都未命中的概率为\`(1-1/t)^d = (1+1/(-t))^((-t)*(-d/t)) ~= e^(-d/t)\`

对于t长度的BF，n长度的元素，h个hash function，那么1 的density 为\`1-e^(-(n\*h)/t)\`, false positive 为 \`(1-e^(-(n*h)/t))^h\` 通常也会非常低

### Finding Distinct Elements

**Flajolet-Martin Approach**

估计数据流中唯一的元素个数：

- 将n 个元素使用h() 将其hash 到 $log_2 n$ 个bits 上（相当把n个数当作连续的且用二进制表示）
- 对于data stream 中的每一个元素a，设置r(a) 为h(a) 这个二进制数中连续的trailing zeros(数字末尾连续的0 ) 的个数
- 设置R为最大的r(a)
- 估计$2^R$ 即为最大distinct elements 数结果

分析该方法的理论基础：h(a) 有至少i 个trailing zeros（意即有$>=2^i$个不同的元素了）的概率为 \`1/2^i\`，如果有m 个不同的元素，则$R>=i$ (至少一个x 存在使 $h(x)$ 有i 个trailing zeros）的概率就是\`1-(1-1/2^i)^m = 1- e^(-m/2^i)\`。所以当\`m>> 2^i\`，前面的概率就\`~=1\`


**Moments**

n个不同元素会出现的数据流中，$m_i$ 表示i 元素出现的次数。k次方和\`sum m_i ^k\` 表示$k^{th} moment$。

那么second moment(又叫surprise number) 就是元素频次的平方和，且可表示数据流中元素出现频次是否比较平均还是差异很大。

**AMS method**

随机时间t选定元素a，则t时刻到现在，a出现的频次为k，那么surprise number 可为 $X=n\* (2*k-1)$ 因为其期望：

\`E(X) = 1/n sum n\*(2*k-1) = sum(2\*k-1) = sum k^2\`

就跟surprise number一致了，而且这种定义就可以处理流式计算。所以单$X$ 就可以代表surprise number 了，但可以取多次平均。

## Recommender System

#### TF-IDF 

计算过程中最好也Normalized：则Term i 在文档j 中的词频$f_{ij}$ ，总文档数N，则有：

\`T\_(ij)= f_(ij) / (max_k f\_(kj)),\`  \`IDF_i = log(N/n_i),\`

则：\`TFIDF\_(ij)=TF\_(ij) * IDF_j\`，其中$n_i$ 为term i 出现的文档数。

#### Cosine distance

通常 \`cos(theta) = (vec x * vec i)/(|vec x| * |vec i|)\`

其中计算距离时，计算的两个向量$\vec x$ 和 $\vec i$ 最好先做 mean normalisation,从而叫centered cosine distance

#### Item/User CF

可以用某个item 近似的items 预估某个用户x 对item i的评分。

\`r\_(x i) = b\_(x i) + (sum\_(j in N(i;x))(s\_(ij)* (r\_(xj) - b\_(xj)))) / (sum\_(j in N(i;x))(s_(ij)))\`

其中，$r\_{xi}$ 是用户x 对i 的评分 $s\_{ij}$ 为item i,j 两者的相似度。而$N(i;x)$ 则为用户x 评论过的跟i 相似的集合，而

\`b\_(x i) = mu + b_x + b_i\`

其中，$\mu$ 代表全局平均，$b_x$ 代表用户x 的评分相对于$ \mu$ 的bias，$b_i$ 代表item i 得到的评分相对于$\mu$ 的bias。

而user CF 也跟这个类似。可以根据相似用户对统一item 的评分来评估新的$r_{xi}$ 现在存在的一个问题，就是怎么有效的找相似集合，根据之前的学习有几个方向可以做：

- LSH(Near-Neighbour search in high dimensions)
- Clustering
- Dimensionality reduction

CF 的优劣势


- 适合任意的Items，无需特征
- 冷启动问题：需要足够的用户，寻找相似集合
- 稀疏性：难找评论过同一个item 的user
- 无法推荐没有被评论过的、新的、异常的items
- 倾向于推荐popular items

### Dimensionality reduction

#### SVD
PCA 降维，实际上就是利用SVD，使得原来\`A  ~~ U Sigma V^T \` 其中，

- U: Left singular vectors
- $\Sigma$: Singular values
- V: Right singular vectors

三者是唯一的；且$U,V$ 称作 column orthonormal(意即$U^T U =I = V^TV$) ；而$\Sigma$ 是diagonal(对角矩阵) 且值都为正数且从左上角到右下角由大到小的顺序排列。

在CF 中使用SVD，$U, V, \Sigma $ 则可分别解释为：用户对某些特征的权重、Item 在这些特征上的权重、该特征整体上的权重。PCA降维，则是在$\Sigma $里选择重要的特征抛弃不重要的特征进行降维。

SVD 奇异值分解可得上式，而如果使用特征值分解则可得\`A = X Lambda X^T\`，而其中A 需要为对称矩阵，同时X 也为单位正交矩阵（$XX^T=I$），$\Sigma$ 也为对角矩阵且每一个值代表一个特征值。

推导可得：

\`A A^T = U Sigma Sigma^T U^T,\`
\`A^T A = V Sigma Sigma^T V^T\`

所以以上两者的特征值就对应$\Lambda$ 中的值，及$\lambda_i = \sigma_{i}^2$。

**Latent factors** 
除了SVD ， 我们可以把评分当作：每个属性的特征矩阵P，与用户在这几个属性上的偏好矩阵Q，两者的乘积PQ。通过SVD 初始化$P=U, Q = \Sigma V$，然后再通过梯度下降的方法求解。

#### CUR
除了使用SVD 分解，还可以使用CUR(C 代表Columns，R 代表rows)进行分解。具体步骤如下：

- 按照采样列数c 采样原始矩阵A（ m * n ），得到C（m * c）
    * 对于$x=1:n$ 计算A 中每一列的分布\`P(x) = (sum_i A(i,x)^2) / (sum_(i,j) A(i,j)^2) \`
    * 对于$i=1:c, j=1:n$ ,基于分布 $P(x)$，计算选取列并得到C，其中\`C( :, i) = (A( :,j))/sqrt(c P(j))\`
- 同样的方式，对行进行采样得到R(c*n)
- 命$W = intersection\ of\ C\ and\ R$ ，则$U = W^+$ （W 的[广义逆](https://en.wikipedia.org/wiki/Generalized_inverse) 即满足$WW^+ W = W$，则$W^+$ 则为W 的广义逆）。如对W 进行SVD后$W=XZY^T$ 那么 $W^+ = Y Z^+ X^T$

如此 \`A ~~ CUR\` 即可求得




**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


