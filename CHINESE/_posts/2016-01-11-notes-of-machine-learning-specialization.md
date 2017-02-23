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

### Coordinate descent for lasso 

Lasso Cost = \`RSS(vec w) + lambda ||vec w||_1 =  sum\_(i=1)^N (y_i - sum\_(j=0)^D w_j * h_j(x_i))^2 + lambda sum\_(j=0)^D |w_j|\`

预先计算 \`z_j = sum_{i=1}^N h_j(x_i)^2\`

而 \`rho \_j = sum\_{i=1}^N h_j(x_i)(y_i - hat y_i(hat w _j))\`

则令\`delta _ (w_j)[lasso\ co\st] = 2 z_j w_j - 2 rho _j + delta L1\`

其中 

$$
\delta L1 = 
\begin{cases}
-\lambda & w_j <0 \\\\
[-\lambda, \lambda] & w_j = 0 \\\\
\lambda & w_j>0 \\\\
\end{cases}
$$

优化，从而求得

$$
w_j = 
\begin{cases}
\frac{2\rho \_j + \lambda}{2 z_j} & if \rho \_j < -0.5 \lambda\\\\
0 & if \rho \_j \in[-0.5 \lambda, 0.5 \lambda] \\\\
\frac{2\rho \_j - \lambda}{2 z_j}  & if \rho \_j > 0.5 \lambda \\\\
\end{cases}
$$

### Log likelihood and log loss

对于样本\`vec x, vec y\`，实际上我们就需要学习参数 $\vec w$ 以最大化likelihood：

\begin{aligned}
ll(\vec w) &= \prod P(y_i | x_i, \vec w)  \\\
&= \prod P(y_i == h(x_i, \vec w))  \\\
&= \prod y_i * h(x_i, \vec w) + (1-y_i)*(1-h(x_i, \vec w)) \\\
& , where \ y_i \in \\{0, 1\\} ; 0 \le h(x_i, \vec w) \le 1
\end{aligned}

实际上如果$\vec w$使得每个样本的$y_i = h(x_i, \vec w)$ ,实际上我们的likelihood 就为1 。对上面式子求log 即可得log likelihood

而实际上求解max likelihood 还是不方便（最大值没有上界），不如求解 min loss(最小值就0) 。则将上式变换得

$$
ls(\vec w)= \prod y_i *(1-h(x_i, \vec w)) + (1-y_i) * h(x_i, \vec w)
$$

对上式求log 就得到了常见的log loss

partial derivative ?

## Classification


###  Tree 
Tree Early stopping 注意

-   树深度多大；
-   叶子的节点数量太小；
-   每次split 带来的增益得有一个阀值；
    > do not consider any split that does not cause a sufficient decrease in classification error

如果有missing value，处理重点还是看覆盖度:

1. 有missing value 就去掉该样本，别去太多
2. 对于missing value 太多的特征，去掉。也别去太多特征。


**pruning** 自底向上，保证去掉每个node 后整体cost 变小。

### Ensemble classifier

对于每个分类器$f_t(\vec x)$ 都对应一个权重 $\hat w_t$ ，从而求和得结果为正负例结果。
\`hat y = sign (sum_(t=1)^T hat w_t f_t(x))\`

**AdaBoost** 其实步骤就如后，然后按上式预估。

- 初始化每个样本的权重 \`alpha _i = 1 / N\`
- for t = 1 to T:
    - learn $f_t(x)$ with data weights $\alpha _i$
    - compute coefficients \`\hat w _t = 0.5 ln ((1-weightederro\r(f_t))/(weightederro\r(f_t)))\`
    - recompute weights \`\alpha _i *= e^( (-1)^(P(f_t(x_i) -= y_i)) hat w_t) \`, where \`P(f_t(x_i) -= y_i) = 0 or 1\`
    - 每一轮归一化保证\`sum alpha_i -= 1\`    
      其中weighted error 就是分类分错的比例。


其实整个过程中，样本的权重变化就是这样的：

- 模型经常预估错这个样本，则其权重渐渐变大
- 模型经常预估对这个样本，则其权重渐渐变小


分类指标：F1, AUC； 排序有precision at K, MAP 

SGD 过程中，权重一定要用过去T 份数据迭代的平均，而不是当轮当前这份数据迭代的结果。

## Clustering for IR

### nearest neighbour search

- KD-tree 低纬度，精确度高。k-NN 时通常表现好，但维度超过2 就不太理想了。（KD-Tree 的每个节点会记录分裂的特征及数值，以及其子节点的值域范围）
- LSH 高纬度，会损失一定精确度。

**K-means 思路**

1. 初始化各类centroids
2. 把每个新的点放到最近的centroid
3. 完成所有点的分配后，重新计算centroid
4. 重复迭代

**LDA** 中，每个word 都会在其topic 得到一个score；每个topic 在document 上也有不同分布。

- 输入：corpus 中每个doc 对应的words 集合。


- 输出：corpus-wide 的topic 分布；每个word 的topic；每个doc 的topic 占比。



**EM 算法**

- E-step: estimate cluster responsibilities $$\hat r_{ik} = \frac{\hat \pi_k N(x_i | \hat \mu_k, \hat \Sigma _k)}{\sum _{j=1}^K\hat \pi_j N(x_i | \hat \mu_j, \hat \Sigma _j}$$
- M-step: maximize likelihood over parameters $$  \hat \pi_k , \hat \mu_k, \hat \Sigma _k | {\hat r_{ik}, x_i} $$



**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: false}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

