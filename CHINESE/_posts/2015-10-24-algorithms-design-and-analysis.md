---
layout: post
title: "Algorithms: Design and Analysis, Part 1"
modified: 2015-10-24 17:58:40 +0800
tags: [勤学札记]
categories: [日有微进]
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

具体可参见[Julia 算法代码][CountingInvertions]

**Closest Pair** 
找数组中最相近的两个数（排序n log n，找相近 log n）。找平面中最接近的两个点等(D&C)。

Make copies of points sorted by x-coordinate (Px) and by y-coordinate (Py)[O(nlog(n)) Time]

1. Let Q=le] half of P, R=right half of P. Form Qx, Qy, Rx, Ry [takes O(n) time]
2. (p1,q1)=ClosestPair(Qx,Qy) 一部分最近点
3. (p2,q2)=ClosestPair(Rx,Ry) 另一部分得到的最近点
4. let $\delta = min ({d(p1,q1), d(p2,q2)})$
5. (p3,q3)=$ClosestSplitPair(Px,Py, \delta)$ 如果最近点一个落在Q 内，一个落在R 内，通过均值的$\delta $ 范围内 $[\bar x-\delta, \bar x + \delta]$ 找最近点
6. Return best of(p1,q1),(p2,q2),(p3,q3)  

## Week 2

### Master Method

总结如MergeSort 形式的递归问题的复杂度一般形式：

\`
T(n) = a T(n/b) + O(n^d)
\`

其中 a 为子问题个数，b 为子问题相形与原问题缩小的比例，d 为combine 步骤的复杂度。
考虑像MergeSort 这种算法，在第j 层时，有$a^j$ 个子问题，每个子问题大小为$n_j = \frac {n} {b^j}$ ，则单个子问题combine 复杂度为$n_j^d$ ,则单层总的算法复杂度就为：

\`
T(n_j) <= a^j * c * (n/(b^j))^d = c * n^d (a/b^d)^j
\`

而总的层数为$log_b n$。则：

\`
T(n) <= c * n^d sum_{j=0}^{log_b^n}(a/b^d)^j
\`

那这种问题的复杂度，就可以根据新的一层复杂度是否收敛（$\frac {a}{b^d}$ 与1 的大小关系，确定最复杂的是首层、还是最后一层、还是每层都一样），而归纳一般形式为：

$$
T(n)=
\begin{cases}
O(n^d log n),  & \text{if $a = b^d$}, \cr
O(n^d), & \text{if $a < b^d$}, \cr
O(a^{log_b^n}), & \text{if $a > b^d$} \cr
\end{cases}
$$


### QuickSort

基本思想：找到pivot，然后把小的放左面，大的放右面，从而迭代求解。

如果使用O(n) 的额外空间，可以非常方便的，在迭代过程中小的从左面开始存，大的从右边开始存，然后pivot 肯定在中间。而如果不使用额外的空间。设数组为A，则可用如后的具体步骤：

1. 把第一个数作为pivot
2. 从第二个数往后扫描，设j表示扫描到的新元素的索引，设A[i-1]<pivot,而A[i]>pivot
3. 若A[j]<pivot，则把A[i]、A[j] 两数交换
4. 继续向后扫描，重复2-4，指导结束。
5. 交换pivot 和 A[i-1] 两个数，再排左右两个子串

具体代码实现可见[Julia 代码][QuickSort]

快排，依赖选择的Pivot 的质量。所以通常随机选择pivot （然后再切换到第一个数，重复上面的步骤）效果会比一直选择首个、末尾数好。而选择首、尾、中间三数的median 会更好。

### Probability

-   设$\Omega$ 为可能的结果全集（Sample Space）
-   某个事件S，就可以是$\Omega$ 的子集
-   Randome Variable $X$：就是将$\Omega $映射到实数空间的函数
-   期望\`E[X] = sum_(i in Omega) X(i) * p(i)\`
-   Linearity of Expectation:
    > Let $X_1,...,X_n$ be random variables defined on $\Omega$ Then: \`E[sum\_{j=1}^n X_j] =  sum_{j=1}^n E[X_j]\`
-   Conditional Probability: \`P[X|Y] = (P[X nn Y]) / (P[Y])\`
-   if A,B are independent, then $E[AB] = E[A]*E[B]$



## Week 3

### Randomised Selection
假设一个算法，输入一个数组A，找出其第k 大的数。我们可以把该数组MergeSort 然后取第n 大就行。但是这$n log n$ 的算法不是最好。

我们可以用QuickSort 里的partition 思想。每次partition 之后，知道pivot 的位置后，也就知道该数在pivot 的左边还是右边，然后依次迭代下去。

当然pivot 的选择，依然是用median 比较好，不然最差的情况是$O(n^2)$ 的复杂度。假设随机选择，能达到median 的效果，如此便是

\`T(n) = T(n/2) + O(n)\` 

的问题，复杂度也就是$O(n)$

### Deterministic Selection

上面讲到的Media  的选择，可以使用 [median of medians] 算法选择pivot

> 
- logically break A into n/5 groups of size 5 each
- sort each group (e.g., using Merge Sort)
- copy n/5 medians (i.e., middle element of each sorted group)
  into new array C
- recursively compute median of C (!) 
- return this as pivot

如此，pivot 选择的复杂度是\`T(n)<= T(n/5) + O(n)\`，而因为上面的MoM 算法选择[median of medians]后，那么C 的小于或大于median 的数至少有\`3*n/5 * 1/2\` 则新的算法的复杂度：

\`T(n) <= T(n/5) + T((7n)/10) + O(n)\`

### Sorting Lower Bound

假设$n!$ 个数，我们需要k 次比较才能把他们排好，那么最多执行$2^k$ 次计算（比如MergeSort 形式的二叉树）。则

> By _the Pigeonhole Principle_ : if $2^k < n!$, execute identically on two distinct inputs => must get one of them incorrect.
> So, \`2^k >= n! >= (n/2)^(n/2)\`

所以 \`k>= Omega(n log n)\`



### Graphs

#### Cuts of Graphs

> a **cut** of a _graph (V, E)_ is a partition of V into two non-empty sets A and B.
>
> the **crossing edges** of a **cut(A, B)** are those with: 
>
- the one endpoint in each of (A, B) [undirected]
- tail in A, head in B [directed]

> **min cut** Compute a cut with fewest number of crossing edges.

**Adjacency Matrix** 使用矩阵A，用A[i][j] 表示\`i-j\` 这一条边:

- 无向图用0/1 表示有无此边，或设置边的权重值
- 有向图使用+1/-1 表示\`i->j\` 或 \`j->i\`

### Random Contraction
>
>While there are more than 2 vertices:
>
- pick a remaining edge (u,v) uniformly at random 
- merge (or “contract” ) u and v into a single vertex
- remove self-loops
> return cut represented by final 2 vertices.

设图G 有m 个边，n 个点，而MinCut 有k 个crossing edges（设为集合F ）。 而所在点的度的和\`sum_v degree(v) = 2m >=kn \`，那么F 被Radom contraction 选中的概率为\`k/m <= 2/n \`，

所以每次选中非F 中的点的概率为\`1-2/n = (n-2)/n\`， 则RC 得到MinCut 的概率为 \` p >= prod_(k=3)^n  (k-2)/k = 2/(n*(n-1))\`

# Week 4&5

介绍图的BFS 和 DFS 搜索。BFS再深入介绍的Dijkstra Algorithm 求最短路径，DFS 这是求强联通图。

强联通图的计算步骤：

- 有图G后， 计算每条边取反向得到的G_rev。
- 在G_rev 上调用DFS-Loop 算法，然后每个节点的结束时间存入ft。
- 在G 上，按照ft 中最晚结束的节点最先搜索的原则，调用DFS-Loop 算法。
- SCCs 就是有相同leader 的所有节点。 

DFS-Loop 算法：

```julia
for i = n:-1:1
    l = i
    DFS(Graph,i, l) 
    # 然后从i DFS直到结束，这词DFS 节点的leader 都为l。
end
```

强联通图的算法可参见[SCC.jl] 实现。

Dijkstra's Algorithm，BFS 的代表。假设需要计算s 到任意节点的最短路径。代码可参照[Dijkstra.scala],算法思想如后：

1. 用X 表示遍历过的节点，B、A分别记录每个节点的最短路径及其长度。初始化$X=[s], A[s]=0, B=[]$
2. 对于如后集合\`{(v,w)|v in X, w !in X}\` 的每个节点 $(v,w)$ 使得 \`{(v^\*\*, w^**)} = arg min _ (v,w) A[w]= arg min _ (v,w) A[v]+l_(vw)\`
3. 更新 \`A[w^\*\*] = A[v^\*\*] + l\_(v^\*\* w^\*\*)\` \`B[w^\*\*] = B[v^\*\*] + u_(v^\*\* w^\**)\`
4. 所有节点都被遍历后结束




[CountingInvertions]: https://github.com/jinntrance/MOOC/blob/master/coursera/algo-009/week1/countingInvertions.jl
[QuickSort]: https://github.com/jinntrance/MOOC/blob/master/coursera/algo-009/week2/quicksort.jl
[median of medians]: http://austinrochford.com/posts/2013-10-28-median-of-medians.html
[SCC.jl]: https://github.com/jinntrance/MOOC/blob/master/coursera/algo-009/week4/SCC.jl
[Dijkstra.scala]: https://github.com/jinntrance/MOOC/blob/master/coursera/algo-009/week5/Djk.scala

**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

