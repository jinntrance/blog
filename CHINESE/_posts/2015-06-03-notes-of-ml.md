---
layout: post
title: "机器学习零碎笔记"
modified: 2015-06-03 11:23:16 +0800
tags: [勤学札记]
categories: [机器学习]

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

## Learning to Rank

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
          那么位置p 的 \`DCG_p = rel_1 + sum\_ (i=2)^p (rel)\_i/log_2(i) \` 。
          或者高相关的 \`DCG_p = sum_(i=1)^p (2^(rel_i) - 1)/log_2(i+1) \`， 其中\`rel_i in [0,1]\` 
        - NDCG： 假设 ideal ranking 的情况下DCG 为1，那么其他ranking 的DCG 除上ideal ranking 的DCG值即为该ranking 下的NDCG 值。

## 排序模型

**[LambdaMart]** 就是把MART(GBDT) 的损失函数的梯度，替换成排序过程中pairwise 的梯度Lambda。也可参见[Visualizing LambdaMART] 了解

**[RankSVM]** 使用pointwise的SVM 算法，如果$d_2$ 排在$d_1$ 前面，但相关性（点击情况）$d_1>d_2$，设$d_1,d_2$ 的特征分别为$x_1, x_2$。 则$x_1-x_2$  为正样本，$x_2- x_1$  为负样本。如此再用分类问题求解就行。

推荐可使用的：
**[RBM]** 就是一个隐藏层的DBM，Deep BM又源自BM。具体路线还是：Hopfield网络->玻尔兹曼机BM ->受限玻尔兹曼机RBM。Hopfield网络，是基于能量模型建立的，如此就需要通过一定方式达到最终的平衡稳定状态。更多可以参见Coursera 课程 [Neural Networks for Machine Learning][NNML]
**[BPR]** 即使用pairwise 再用贝叶斯做极大似然求解。


分类效果评估：

\`F1 = (2\*recall*pr\ecision)/(recall + pr\ecision)\`

AUC(Area Under Curve): 就是recall 作为横座标，precision 作为纵坐标时曲线下的面积。
​        
HMC:

https://en.wikipedia.org/wiki/Hidden_Markov_model
​        
MCMC: 

https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo

## 正定矩阵

:设M是n阶方阵，如果对任何非零向量$\vec z$，都有$\vec z^T M \vec z> 0$，就称M 为正定矩阵。

LBFGS: [理解L-BFGS算法] 和[Numerical Optimization: Understanding L-BFGS] 这两个介绍得很详细。但是[Weighted Frobenius Norm] 还需要去了解http://mathworld.wolfram.com/FrobeniusNorm.html

$$
\mathbf{H}^{-1}\_{n+1} = (I - \rho_n y_n s_n^T) \mathbf{H}^{-1}_n (I - \rho_n s_n y_n^T) + \rho_n s_n s_n^T
$$

[Paxos]: 解决分布式更新数据后一致性的问题

training error = bias + noise
test error = noise + variance

假设

- label \`y^+ = f(x^+) + epsilon\`, 假设f 为true function，即最佳的拟合函数。
- 通过训练学到的函数为\`h(x^+)\`

则

- variance = \`E[(h(x^+) - \bar (h(x^+)))^2]\`, describes how much \`h(x^+)\` varies from one training set S to another
- bias = \`E[\bar (h(x^+)) -f(x^+)]\`, describes the average error of \`h(x^+)\`
- noise = \`E[(y^+ - f(x^+))^2] = E[epsilon ^2] = sigma ^ 2\`, describes how much \`y^+\` varies from \`f(x^+)\`




[Hinge loss] 

## 置信区间估计

设 \`X = (X_1, ..., X_n)\` 是总体 \`N(mu, sigma ^2)\` 的样本。

\`mu\` 的一个良好点估计 \`bar X = 1/n sum_(i=1)^n X_i\` 其分布为 \`bar X ~ N (mu, sigma^2 / n)\` ，亦即 \` Z = (bar X  - mu) / (sigma/sqrt(n))  ~ N (0, 1)\`


有\`P(|Z|<=u_{alpha/2}) = 1-alpha\`， 其中\`u\_{alpha/2}\` 为标准正太分布的上侧\`alpha/2\` 分位数（即标准正太分布\`>=alpha/2\` 的面积为\`alpha/2\`） 

如后的Z 值表，有\`P(|Z|<=1.96) = 0.95\`

| Desired Confidence | Z score |
| :----------------: | :-----: |
|        90%         |  1.645  |
|        95%         |  1.96   |
|        99%         |  2.576  |

则变换可得\`P(|mu| <= bar X + Z * sigma/sqrt(n)) = 1 - alpha\`

假设样本X 和总体的均值(概率)为\`p\`，那么其标准差应为\`\S = sqrt((p*(1-p)))\`; 则\`1-alpha\` 的置信区间下，总体均值\`mu\` 的置信区间为：

\`
\bar x - Z\_(alpha/2) * S /sqrt(n) <= mu <= \bar x + Z_(alpha/2) * S /sqrt(n)
\`

Z 值表可参照 [Parameter Estimation], 基本概念及讲解 [区间估计] 


CoEC: Clicks Over Expected Clicks

KLD: [Kullback–Leibler divergence][KLD] 用于计算两个概率分布之间距离（或称“差别”）



## 拉格朗日乘子

要求 

>  maxmize $f(x, y) $
>
>  subject to $g(x, y) \ge 0$

引入乘子 $\lambda$ 得Largrange function:


$$
\textbf L(x, y, \lambda) = f(x, y) + \lambda \cdot g(x, y)
$$

在 $\frac{\partial L}{\partial x} = 0, \frac{\partial L}{\partial y} = 0, \frac{\partial L}{\partial \lambda} = 0$  三者成立时 $\textbf L$取得极大值。

如果是因为相加的$g(x, y)$ 是非负数，且求极小值的$f(x, y)$ 时，也需要转化为求极大值。



## Word Embedding

[t-SNE][[t-SNE] 用于降纬，相似则在高纬空间中相近，不相似则较远。相关信息可见[此处](https://lvdmaaten.github.io/tsne/) 



## CTR Prediciton
**FTRL**

迭代优化公式如后，加入最后一项L1 正则项，使得最后能获取到稀疏解。
$$
\begin{equation}
\mathbf{w}_{t+1} = 
\underset{\rm \mathbf{w}}{\rm arg\ min}
\left(
\displaystyle\sum_{s=1}^t {\mathbf{g}_s \cdot \mathbf{w}} +
\frac 12 \displaystyle\sum_{s=1}^t {\sigma_s||\mathbf{w} - \mathbf{w}_s||_2^2} + 
\lambda_1||\mathbf{w}||_1\right)
\end{equation}
$$
参加[理解 FTRL 算法](http://vividfree.github.io/机器学习/2015/12/05/understanding-FTRL-algorithm) 推导。

**FFM** [FFM 介绍](http://tech.meituan.com/deep-understanding-of-ffm-principles-and-practices.html) 



# 假设检验



[T-test](https://en.wikipedia.org/wiki/Student%27s_t-test) 对于两个实验的均值效果差异，求

$$
t = \frac{\mu_1 - \mu_2}{\sqrt{s_1^2/n_1 + s_2^2/n_2}}
$$

其中 $s_i = \mu_i -\mu_i^2$ ，若 $t>1.959$ 则是显著的差异，即95% 的概率两者是有差异的。





[KLD]: https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence
[Hinge loss]:https://en.wikipedia.org/wiki/Hinge_loss
[Softmax function]: http://en.wikipedia.org/wiki/Softmax_function
[Sigmoid function]: http://en.wikipedia.org/wiki/Sigmoid_function
[理解L-BFGS算法]: http://mlworks.cn/posts/introduction-to-l-bfgs/
[Numerical Optimization: Understanding L-BFGS]: http://aria42.com/blog/2014/12/understanding-lbfgs/
[LambdaMart]: http://blog.csdn.net/huagong_adu/article/details/40710305
[Visualizing LambdaMART]: https://wellecks.wordpress.com/tag/lambdamart/
[RankSVM]: http://www.cnblogs.com/kemaswill/p/3241963.html
[RBM]: http://miibotree.com/2015/08/25/from-BM-to-RBM/
[NNML]: https://www.coursera.org/course/neuralnets
[BPR]: http://liuzhiqiangruc.iteye.com/blog/2073526
[Paxos]: https://zh.wikipedia.org/wiki/Paxos%E7%AE%97%E6%B3%95
[Parameter Estimation]: http://sphweb.bumc.bu.edu/otlt/MPH-Modules/BS/BS704_Confidence_Intervals/BS704_Confidence_Intervals2.html
[区间估计]: http://staff.ustc.edu.cn/~zwp/teach/Math-Stat/lec7.pdf
[t-SNE]: https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding


**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type="text/x-mathjax-config"> MathJax.Hub.Config({ asciimath2jax: { delimiters: [ ['`','`'],['$', '$']] }}); </script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML" async="async"></script>
{% endcomment %}