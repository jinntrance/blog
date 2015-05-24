---
layout: post
title: "PRML Chapter 1"
modified: 2015-04-16 19:50:34 +0800
tags: [DM, ML, Machine Learning, 机器学习, Technical]

---


## Polynomial Curve Fitting

假如我们有 $ y = sin(2 \pi x)$ 上的数据点，想要找到一条曲线拟合所有数据， 假设使用拟合曲线：

\`
y( x, vec w) = sum_(j=0)^M w_j x^j = w_0 +w_1x+w_2x^2 +...+w_Mx^M
\`

其中\`vec m \`即为我们要学的系数，而`x`则为每个数据点。

待优化的 error function 为 \` E(vec w)= 1/2 sum_(n=1)^N[y(x_n, vec w) - t_n]^2 \`
其中 $t_n$ 为 实际值 target，y为预测值。不难看出$E(\vec w)$ 越小，预测值跟实际值就越接近。

实际上常用的RMS[^RMSE] 可以表示为 \` E_(RMSE) = sqrt ((2E(vec w))/N) \`

所以这样RMSE 越小，也就拟合得越好。可是在迭代过程中，实际上M 越大也就会对拟合得越好，可是这样就越容易过拟合。所以我们加入修正项，限制\`vec w\` 维度变得过大，也防止M 变得过大而过拟合。得到新的 error function 

\`
 hat E (vec w) = E(vec w) + lamda/2 ||vec w||^2 
\`

其中
\` ||vec w||^2 = vec w^T vec w = sum_(i=0)^M w_i^2\`

如此，我们便能找到合适的$\vec w$ ，最后让我们的拟合曲线在训练集合和测试集合上表现都比较好。


## Probability Theory

推论后得出两条规则:

> sum rule \`p(X) = sum_Y p(X, Y )\`

> product rule \`p(X,Y) = p(Y | X) p(X) = p(X | Y) p(Y) \`

也就很容易得到贝叶斯公式：

> \` p(Y |X) = (p(X|Y )p(Y )) / (p(X)) \`

假定在不同的盒子B 中挑不同的水果F:

- **p(B)** We call this the *prior probability* because it is the probability available before we observe the identity of the fruit.
- **p(B\|F)** we shall call the *posterior probability* because it is the probability obtained after we have observed F .


### Probability densities

x 落在(a, b) 区间内的概率为： 
\` p(x in (a, b)) =  int_a^b p(x) dx \`

> If the probability of a real-valued variable x falling in the interval (x, x + δx) is given by p(x)δx for δx → 0, then p(x) is called the *probability density* over x.

针对连续值的话：

> sum rule: \` p(x) = int p(x, y) dy \`

> product rule: \` p(x, y) = p(y|x)p(x) \`

> The probability that x lies in the interval \`(− oo,z) \` is given by the *cumulative distribution function* defined by



### Expectations and covariances

针对离散值和连续值，期望可以表示成：

> \` bbb E [f] = sum_x p(x)f(x) \`

>  \`bbb E [f]= int p(x)f(x)dx. \`

*conditional expectation* \` bbb E_x[f|y] = sum_x p(x|y)f(x) \`





- 单一变量 \`cov[x, y] = bbb E_(x,y) [{x − bbb E[x]} {y − bbb E[y]}] = E\_(x,y) [xy] − E[x]E[y] \`
- 向量 \`cov[vec x, vec y] = E\_(x,y){x − E[x]}{y^T − E[y^T]}

### Bayesian probabilities

since \`p(w|D) = (p(D|w)p(w))/(p(D))\`

> The quantity `p(D|w)` on the right-hand side of Bayes’ theorem is evaluated for the observed data set D and can be viewed as a function of the parameter vector \`vec w\`, in which case it is called the __likelihood function__. It expresses how probable the observed data set is for different settings of the parameter vector \`vec w\`


> A widely used frequentist estimator is maximum likelihood, in which w is set to the value that maximizes the likelihood function `p(D|w)`


### The Gaussian distribution 


Gaussian distribution
: \` N(x|mu, delta^2 ) =  1 / sqrt(2 pi delta^2)  e^(-(x-mu)^2 / (2 delta^2))\`
: μ, called the mean, and σ<sup>2</sup>, called the vari- ance. β = 1/σ<sup>2</sup>, is called the precision

[^RMSE]: Root Mean Square Error

<script type="text/x-mathjax-config"> MathJax.Hub.Config({ config: ["TeX-MML-AM_HTMLorMML.js"], tex2jax: { inlineMath: [ ['$', '$'] ], displayMath: [ ['$$', '$$'] ], processEscapes: true }, asciimath2jax: { delimiters: [ ['`','`']] }, displayAlign: "center`", displayIndent: "2em" }); </script>
<script src="http://www.josephjctang.com/mathjax/MathJax.js" async="async"></script>