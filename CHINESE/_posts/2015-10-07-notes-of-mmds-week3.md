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

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


