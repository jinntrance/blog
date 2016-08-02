---
layout: post
title: "PRML Chapter 1"
modified: 2015-04-16 19:50:34 +0800
tags: [DM, ML, MACHINE LEARNING, 机器学习, TECHNICAL]

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

> Regularisation Term 中：
>
- \` L0= lamda * size(vec w) = lamda M\`
- \` L1 = lamda sum_1^M |w_i| \`
- \` L2 = lamda sum_1^M w_i^2\`

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

> The probability that x lies in the interval \`(− oo,z) \` is given by the *cumulative distribution function* defined by\` P (z) = int_(- oo)^z p(x) dx \` which satisfies P′(x) = p(x).
> If x is a discrete variable, then p(x) is sometimes called a *probability mass function* because it can be regarded as a set of ‘probability masses’ concentrated at the allowed values of x.


### Expectations and covariances

针对离散值和连续值，期望可以表示成：

> \` bbb E [f] = sum_x p(x)f(x) \`

>  \`bbb E [f]= int p(x)f(x)dx. \`

*conditional expectation* \` bbb E_x[f|y] = sum_x p(x|y)f(x) \`The *variance* of f(x) is defined by
 \` var[f] = bbb E[(f(x)− bbb E[f(x)])^2] = bbb E[f(x)^2] − bbb E[f(x)]^2\`
 
> covariance expresses the extent to which *x* and *y* vary together


- 单一变量 \`cov[x, y] = bbb E_(x,y) [{x − bbb E[x]} {y − bbb E[y]}] = E\_(x,y) [xy] − E[x]E[y] \`
- 向量 \`cov[vec x, vec y] = E\_(x,y){x − E[x]}{y^T − E[y^T]}= E\_(x,y)[xy^T] − E[x]E[y^T].\`

### Bayesian probablities

since \`p(w|D) = (p(D|w)p(w))/(p(D))\`

> The quantity `p(D|w)` on the right-hand side of Bayes’ theorem is evaluated for the observed data set D and can be viewed as a function of the parameter vector \`vec w\`, in which case it is called the __likelihood function__. It expresses how probable the observed data set is for different settings of the parameter vector \`vec w\`


> A widely used frequentist estimator is maximum likelihood, in which w is set to the value that maximizes the likelihood function `p(D|w)`


### The Gaussian distribution 


Normal/Gaussian distribution
: \` cc N(x|mu, delta^2 ) =  1 / sqrt(2 pi delta^2)  e^(-(x-mu)^2 / (2 delta^2))\`
: μ, called the mean, and σ<sup>2</sup>, called the variance. β = 1/σ<sup>2</sup>, is called the precision.

此外，高斯分布满足(p25)：

- \`int_(- oo)^(oo) cc N(x| mu, delta^2) dx = 1\`
- \`E[x] = int_(- oo)^(oo) cc N(x| mu, delta^2) x dx = mu\`
- \`E[x^2] = int_(- oo)^(oo) cc N(x| mu, delta^2) x^2 dx = mu^2 + delta^2\`
- \`var[x] = E[x^2] - E[x]^2 = delta ^2\`

设对于D 维变量\`vec x\` 有：
\` cc N(x|mu, Sigma ) =  1 / ((2 pi)^(D/2) Sigma^(1/2))  e^(-0.5 * (vec x- vec mu)^T Sigma^-1  (vec x - vec mu))\`
where the D-dimensional vector μ is called the mean, the D × D matrix Σ is called the covariance, and |Σ| denotes the [determinant](http://www.mathsisfun.com/algebra/matrix-determinant.html) of Σ.

likelihood function for the Gaussian: 
\`
p(bb x | mu, delta ^2) = prod _(n=1)^N cc N (x_n | mu, delta ^2)
\`


### Information Theory

单个人获得的新的信息可以叫做degree of surprise：比如一个绝对会发生的事情，即使发生了，对你来说没有新的信息；相反如果一个不太可能的事情发生了，那么你当时获取到的信息就更多。

而熵(entropy) 则是传输这个随机变量所需的平均信息的量(bits)：

\`H[x] = - sum_x p(x) log p(x)\`

> the average amount of information needed to specify the state of a random variable


Kullback-Leibler divergence: 

\` KL (p \|\| q) = - int p(x) ln ((q(x))/(p(x))) dx \`


mutual information: 

$$I[x, y] = H[x] − H[x|y] = H[y] − H[y|x]$$


[^RMSE]: Root Mean Square Error

*MathJax was not loaded successfully.*{:.mathjax_alt}
{% comment %}
<script type="text/x-mathjax-config"> MathJax.Hub.Config({ asciimath2jax: { delimiters: [ ['`','`'],['$', '$']] }}); </script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML" async="async"></script>
{% endcomment %}