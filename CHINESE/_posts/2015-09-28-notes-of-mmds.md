---
layout: post
title: "MMDS 笔记"
modified: 2015-09-28 22:46:29 +0800
tags: [MMDS,ML]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

[Mining Massive Datasets](https://www.coursera.org/course/mmds) 里面印裔和另东欧还是南欧的俩小伙儿销魂的口音让自己之前没能坚持下去。这次重新开课，再也不能放过这个机会了。

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

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

