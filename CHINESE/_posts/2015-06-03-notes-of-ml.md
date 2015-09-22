---
layout: post
title: "Notes of ML"
modified: 2015-06-03 11:23:16 +0800
tags: [机器学习]

---

为了防止自己以后遗忘，在此会把一下常用概念记下来。

[Softmax function] :
对于K维向量 $\vec z$ 其中的每一维
\`
delta (vec z)\_j = e^(z_j) / (sum_(k=1)^K e^(z_k) 
\` for j= 1,...,K

而针对多分类问题，则其为某个分类的概率为：

\`
P(y=j | vec x) = e^(vec x^T w_j)/ (sum_(k=1)^K e^(vec x^T vec w_k))
\`

[Sigmoid function] :
\`
S(t) = 1/(1+e^-t)
\`

排序中：

- PointWise: 平常的二分类问题，学每一个query-document 的分值
- PairWise: 把每两个documents（一个pair）排序正确性（排序正确label为1 错误为-1）考虑进来。也就是预测每两个documents 排序正确性。cost function 就是让尽量多的这种pair 正确。
- ListWise: 比PairWise 更进一步，预测list。cost function 就是让validation/test set 里面list 的正确性更高。

排序的指标：

* Binary relevance
    - Precision@K 排序中前K 中点击(标记为相关的)数量若为C；则该值为 C/K
    - Mean Average Precision
        - Average Precision是指，对于N 个搜索召回，从中找到R 个相关文档的位置集合I，计算I 中每个位置的Prec@K 然后求平均；则Average Precision 值为\`1/||I|| sum_(i in I) Prec\ at\ i\`;
        - MAP 就是多个queries 的AP 值平均
    - Mean Reciprocal Rank
        - 假设第一个相关文档的位置为K，对于单个query则 Reciprocal Rank Score = 1/K
        - MRR 就是多个queries 的RP 值平均
* Multiple levels of relevance* 
    - Normalized Discounted Cumulative Gain 
        - 假设n 个documents 中单个文档的rating 是$r_i$ 则对于Cumulative Gain(CG) \`CG = sum_(i=1)^n r_i\`
        - 而Discounted CG 有 \`DCG = r_1 + sum\_ (i=2)^n r_i/log_2(i)\` ，
        那么位置p 的 \`DCG_p = rel_1 + sum\_ (i=2)^p rel_i/log_2(i) \` ，
        或者高相关的 \`DCG_p = sum_(i=1)^p (rel_i - 1)/log_2(i+1) \`
        - NDCG： 假设 ideal ranking 的情况下DCG 为1，那么其他ranking 的DCG 除上ideal ranking 的DCG值即为该ranking 下的NDCG 值。
        
HMC:

https://en.wikipedia.org/wiki/Hidden_Markov_model
        
MCMC: 

https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo
        
## 

[Softmax function]: http://en.wikipedia.org/wiki/Softmax_function
[Sigmoid function]: http://en.wikipedia.org/wiki/Sigmoid_function
**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type="text/x-mathjax-config"> MathJax.Hub.Config({ asciimath2jax: { delimiters: [ ['`','`'],['$', '$']] }}); </script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML" async="async"></script>
{% endcomment %}