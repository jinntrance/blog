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
PointWise: 平常的二分类问题，学每一个query-document 的分值
PairWise: 把每两个documents（一个pair）排序正确性（排序正确label为1 错误为-1）考虑进来。也就是预测每两个documents 排序正确性。cost function 就是让尽量多的这种pair 正确。
ListWise: 比PairWise 更进一步，预测list。cost function 就是让validation/test set 里面list 的正确性更高。

[Softmax function]: http://en.wikipedia.org/wiki/Softmax_function
[Sigmoid function]: http://en.wikipedia.org/wiki/Sigmoid_function
**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type="text/x-mathjax-config"> MathJax.Hub.Config({ asciimath2jax: { delimiters: [ ['`','`'],['$', '$']] }}); </script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML" async="async"></script>
{% endcomment %}