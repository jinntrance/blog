---
layout: post
title: "Notes of Machine Learning Specialization"
modified: 2016-01-11 18:36:26 +0800
tags: [Machine Learning, Coursera]

---

课程中的部分笔记，比较零散。

## Regression

Regulation 是不在intercept 在上面做的。

Ridge closed-form solution:
就是令梯度为0，然后直接求解。
梯度： 令\` -2H^T (vec y - H * vec w) + 2 lambda I vec w = 0\` ,解得\` vec w = （H^T H + lambda I ) ^ -1 H^T vec y\`

训练、验证、测试比例：80%,10%,10% 或 50%,25%,25%

Cross Validation 求的error ，是每一次的平均。

- Lasso Regression 就是 L1 Regularisation
- Ridge Regression 就是 L2 Regularisation

Lasso Cost = \`RSS(vec w) + lambda ||vec w||_1 =  sum\_(i=1)^N (y_i - sum\_(j=0)^D w_j * h_j(x_i))^2 + lambda sum\_(j=0)^D |w_j|\`

则令\`delta _ (w_j)[lasso co\st] = 2 z_j w_j - 2 rou _j + delta L1\`

其中 \`delta L1 = 
-lambdaif w_j <0; \
[-lambda, lambda] if w_j = 0; \
lambda if w_j>0\`


## Clustering

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

