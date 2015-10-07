---
layout: post
title: "MMDS 笔记 week1/2"
modified: 2015-09-28 22:46:29 +0800
tags: [MMDS,ML]

---

[Mining Massive Datasets](https://www.coursera.org/course/mmds) 里面俩小伙儿销魂的口音和白发大叔口语中的长难句让自己之前没能坚持下去。这次重新开课，再也不能放过这个机会了。

## PageRank

原始算法

- 假设N 维$\vec r$ 记录每个链接的初权重；其中每个值都初始化为$1/N$
- 那么用矩阵$M$ 中的\`M\_(ij)\` 代表j 这条链接指向i 这个链接的贡献权重；如果j 的出度为d，则j 指向的链接的\`M\_(ij)\` 都为$1/d$ ；未指向的链接\`M_(ij)\`  为0；
- 迭代过程中计算\`vec r^(n+1) = M * vec r^n\` 即可得到最好PageRank 权值；不难发现，收敛后$\vec r$ 就是$M$ 特征值为1 的特征向量

但因为有dead ends 和 Spider Trap，对应需要优化的是：dead ends 出度假设就为$N$，列向量就一直为\`1/N\`；spider trap 下，还是以一定概率指向其他链接。优化后的算法: 

\`
r\_i = sum\_( j ->i ) beta r\_j/d\_j + (1-beta) /n
\`

即每个url，按照$\beta$(通常选0.8, 0.9) 的概率按照它已有的出度链接走，然后按照$1-\beta$ 的概率随机走。矩阵表现形式为：

\`
vec r^(n+1) = (beta * M + (1-beta)/n vec e * vec e^T) * vec r ^n
\`

其中$\vec e$ 为n 维的单位向量。

## Similarity

K-shingle == K-gram ，也就是连续几个字/词当作一个元素，然后在文档里面找出这样元素的集合（需要去重）。所以变化其中部分的时候，文档总体相似性还在。
但是这样需要存储很大的量，可否用hash 的方式把数据存成其hash 值然后仍然保留相似性？ 

- 对于这样的set，建立boolean matrices： 每行代表某个元素，列代表一个doc ；这是一个稀疏矩阵。
- 使用MinHashing，假设原始矩阵是m 行n 列: 
    1. 当前第i 次随机选择之前未选择过的行
    2. 然后用h(c)（列c 第一次出现1 的 i 值）这个hash 函数来降低存储
    3. 每次i+=1 重复1-2 直到h(c) 对于每列都有值
    4. 再次让i=1 开始重复1-3 共k次，这样，最后的k*n 的矩阵就不再是稀疏矩阵了。

其中，对于MinHashing，k次随机选择各行且不再选择之前选过的行，可以用不同的hash 函数来达到这个目的。具体流程类似，并如下：

- 有K 个hash 函数；m 行元素$$；n 列doc；原始矩阵为M；最后产出的稠密矩阵为K 维的MH 矩阵。
- 针对每个hash 函数，对于每一列，找出针对这一列为1 的每一行hash(row_number) 的最小值。
- 优化算法，即在遍历m 行时，

```
for k in 1:K
    for j in 1:n    
        C = {i|M_(ij) == 1}
        MH_(kj) = min(hash_k(C)) 
    end
end
```

### Locality Sensitive Hashing

在上面MinHash 的基础上，假设把m 行划分为b 分(bands)，每份r 行。（即$b*r=m$）那么如果两个集合的相似度为s（即两个元素中任意两个元素相同的可能性为s）；则这两个集合，至少一个band 完全相等的概率为：

\`
p = 1 - (1-s^r)^b
\`

当b=20, r=5 时，s 与 p值关系如下表。不难发现当s<=0.4 或s>=0.6 时，LSH 就很有区分度。

s|p
:--:|:--:
0.1|0.000199981
0.2|0.00638058
0.3|0.0474943
0.4|0.18605
0.5|0.470051
0.6|0.801902
0.7|0.974781
0.8|0.999644
0.9|1.0

所以查找相似集合时（搜索中找一个复杂query 对应的doc 时），如果集合元素很大，那么LSH 就能很大的提升效率。而b，r 就能控制查询速度召回率。详细看参见[LSH应用] 分析。

### Non-Euclidiean Distance 

- Jaccard Distance: \`|A nn B| / |A uu B|\`
- Cosine distance: 向量夹角余弦值 \`(vec a * vec b) / (|vec a|*|vec b|)\`
- Edit distance: 字符串中，变换字符串所需要删除、添加的字符数。\`|x| + |y| - 2 |LCS(x,y)|\` 。其中LCS(x,y) 代表x，y 的最长相同子串（longest common sequence）
- Hamming Distance: bit vectors 中不同的位数

### Find frequent itemsets

#### A-Prori Algorithm

基于一个假设，一个pair 的集合为C，当 \`L in C\`，如果L 的频次小于s，那么C 的频次不可能 >= s。所以就是每轮找出并剔除support < threshold 的subset

```
for k = 1:K
    C_k 表示 size 为 k 的pair 的集合
    L_k 表示 C_k 中 support 大于等于之前定义的s_k 的集合
    由L_k 构造C_(k+1)
end
```

#### PCY algorithm

基于这样一个假设，如果\`l in B\` ，如果B 中每个元素的频次之和 <s，那么l 的频次也小于s。

具体实现：A-Prori 算法第k 次迭代时，可以用一个hash 函数将size 为k+1 的pair 映射到size 较小的buckets B_k，然后记录每个bucket 的频次；然后在k+1 次迭代前，用k 轮的threshold 把B_k 转化成一个0/1 的bitmap BM_k，接着迭代时，只统计满足如下条件的items：

1. 元素在\`C_(k+1)\`集合中
2. 通过1-k 个**不同的**hash 函数得到的\`BM_1 to BM_k\` 中对应的bit 都需要为1 。（每一次迭代的hash 函数如果一致，后续迭代就得不到增益了。）

其中每一次迭代使用的内存占用为：

- 候选pairs 集合\`#C_(k)\`
- 当前存储的buckets counter \`#B_k\`
- 第1到k-1 次的bitmap \`sum\_(j=1)^(k-1)BM\_j\`


#### Multihash

跟PCY 类似，不过每一次迭代，就用m 个不同的hash 函数。接着生成m 个bitmaps 时，使用theshold/ m 作为阀值。那么，每一次bitmap 的限制就变成了：\`vec (BM_k)\` 中至少有一个bitmap 对应的bit 为1 。


#### SON algorithm

1. 按照比例r 随机采样，那么可以把大于\` t = (threshold)/r\` 的frequent itemsets $L_i$取出来
2. 多次随机采样后，取出在所有$L_i$ 中出现过多次(或全部出现)的itemsets 作为最后的frequent itemsets $L$
3. 然后在pass 2 中全局验证L 的正确性，并最后得出最终的L 

#### Toivonen's algorithm

1. 跟SON algorithm 类似，不过按照r 随机采样后， 阀值变得更低，为了减少在样本中不频繁但全局频繁的false negatives ，如 \` t = (threshold)/(1.25r)\` 。最后频繁项集合为L 
2. 找到L 的negative border NB。（假设有negative border 中的元素 N，那么\`N !in L\` ，且N 的所有直接子集属于L。比如{A,B,C} 的直接子集为：{A,B} {B,C} {A,C}） 
3. 在pass 2中，L和NB 都当作频繁项来找全局频繁项。如果NB 中不存在频繁项，那最后结果很Okay，终止 。如果NB 还存在频繁项，那么从新采样直到终止。


[LSH应用]: http://www.strongczq.com/2012/04/locality-sensitive-hashinglsh%E4%B9%8B%E9%9A%8F%E6%9C%BA%E6%8A%95%E5%BD%B1%E6%B3%95.html

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


