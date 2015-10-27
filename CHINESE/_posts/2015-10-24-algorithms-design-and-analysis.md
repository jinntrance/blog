---
layout: post
title: "Algorithms: Design and Analysis, Part 1"
modified: 2015-10-24 17:58:40 +0800
tags: [Algorithms]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

重学Coursera 上的[Algorithms: Design and Analysis, Part 1](https://www.coursera.org/course/algo) 以期巩固Algorithms 相关知识。如后为课程笔记。

## Week 1

推介了一些[算法书籍](http://www.douban.com/doulist/42749758/)

然后重点是介绍一些基本概念：

- $T(n) = O(f(n))$ if and only if there exist constants $c,n_0$ such that $T(n) \le c* f(n),  \forall n \ge n_0$
- $T(n) = o(f(n))$ if and only if for all $c>0$, there exist constant $n_0$ such that $T(n) \le c* f(n),  \forall n \ge n_0$
- $T(n) = \Omega(f(n))$ if and only if there exist constants $c,n_0$ such that $T(n) \ge c* f(n),  \forall n \ge n_0$
- $T(n) = \theta(f(n))$ if and only if $T(n) = O(f(n))$ and $T(n) = \Omega(f(n))$ 
    - that is, there exist constants $c_1, c_2, n_0$ such that $ c_1 * f(n) \le T(n) \le c_2 * f(n),  \forall n \ge n_0$

然后是Divide&Conquer 的例子，比如MergeSort 以及大数相乘等的解决方案。

**大整数相乘** 对求$x*y$ 的值可以分解为

\`x=10^(n/2)a+b, y=10^(n/2)c+d\`

则：\`x*y=(10^n * ac + 10^(n/2) * (ad+bc) + bd)\`，此式需要4次乘法，那么再简化一下得

\`x*y=(10^n * ac + 10^(n/2) * ((a+b) * (c+d) -ac - bd) + bd)\`

那么就可以只有三次乘法。而且这完全也可以实现大数相成结果的计算。

**矩阵相乘** 这个跟上面类似，可以把一个矩阵四分，然后相乘；接着也可以把乘法次数减少，需要提前构造子矩阵的加减然后再乘：

\`X * Y = ((A, B), (C, D)) * ((E, F), (G, H)) = ((AE+BG, AF+BH), (CE+DG, CF+DH))\`

**Counting Inversions** 假设有长数组A，对于所有的索引i<j 如果 A[i]>A[j] 则构成一个inversion。找数组A中的inversions count 跟mergeSort 类似（$n log n$ 的复杂度）

1. 假设方法是invCount()
2. divide A 成两个小数组a, b
3. 最后invCount(A) = invCount(a)+invCount(b)+invSplitCount(a,b)，其中invSplitCount 代表i 再a 中，j 在b 中构成的inversions 数量。

我们发现，当a, b有序时，invSplitCount 就非常好数（即A[i]>A[j] 时，a 中比A[i] 大的都能跟A[j]构成inversion ）

所以以上步骤再做优化即为：

- invCount 需要sort 数组a，b
- invSplitCount 里额外进行mergeSort

**Closest Pair** 
找数组中最相近的两个数（排序n log n，找相近 log n）。找平面中最接近的两个点等(D&C)。

Make copies of points sorted by x-coordinate (Px) and by y-coordinate (Py)[O(nlog(n)) Time]

1. Let Q=le] half of P, R=right half of P. Form Qx, Qy, Rx, Ry [takes O(n) time]2. (p1,q1)=ClosestPair(Qx,Qy) 一部分最近点3. (p2,q2)=ClosestPair(Rx,Ry) 另一部分得到的最近点
4. let $\delta = min ({d(p1,q1), d(p2,q2)})$5. (p3,q3)=$ClosestSplitPair(Px,Py, \delta)$ 如果最近点一个落在Q 内，一个落在R 内，通过均值的$\delta $ 范围内 $[\bar x-\delta, \bar x + \delta]$ 找最近点6. Return best of(p1,q1),(p2,q2),(p3,q3)  




**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

