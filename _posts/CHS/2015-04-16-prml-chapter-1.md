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

实际上常用的RMS[^RMS] 可以表示为 \` E_(RMS) = sqrt ((2E(vec w))/N) \`

所以这样RMS 越小，也就拟合得越好。可是在迭代过程中，实际上M 越大也就会对拟合得越好，可是这样就越容易过拟合。所以我们加入修正项，防止M 变得过大而过拟合。得到新的 error function 

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
- **p(B|F)** we shall call the *posterior probability* because it is the probability obtained after we have observed F .


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


**Mathjax was not loaded successfully**{:.mathjax_alt}

[^RMS]: Root Mean Square Error

<script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        config: ["TeX-MML-AM_HTMLorMML.js"],      
        tex2jax: {
          inlineMath: [ ['$', '$'] ]
        },  
        asciimath2jax: {
          delimiters: [ ['`','`']]
        }
      }); 
</script>
<script src="http://www.josephjctang.com/mathjax/MathJax.js"></script>