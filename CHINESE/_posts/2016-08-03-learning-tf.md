---
layout: post
title: "TensorFlow 论文学习"
modified: 2016-08-03 20:17:15 +0800
tags: [深度学习]
categories: []
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

TensorFlow

tensors: 中间数据，常量不改变。

flow: 数据需要流转的图流程，而图中有nodes 和 edges

operation: tensor 之间的操作

session: 每个client 跟master 交互时的会话

variables: 对tensors 和operations 叠加的结果，而且在执行流程图中一直存在，比如模型参数。而tensor 只存在于图中每两个节点间。

执行过程中，每个node 依赖的数量作计数，计数为0 时，该node 可执行。该node 执行完后，依赖他的nodes 依赖数量减1


## Multiple-devices execution 

多设备时，两个主要问题：
1. 选哪个设备来执行该node 的任务？placement algorithm
2. 如何管理分布式设备中必须通信的数据？placement algorithm 完成后，即可拆解出子图，然后使用 send&receive 


cost model: 估算input/output tensors 的大小及对应计算时间
placement algorithm: 上面cost model 的开销及网络开销都算上，选出一个device 来执行当前node 的任务，使得整体时间消耗最小。

send&receive 保证单个设备只有一个receiver 并且其实多个users 发同一份数据，也只在receiver 里只占用一份内存。

使用send&receive 可以去中心化，也方便各workers 间，各devices 间的协作。


## Distributed execution

与上面多设备执行类似：placement 算法分配任务，拆子图，传输数据(send&receive) 。唯一不同的是使用TCP或RDMA(Remote direct memory access)

分布式容错只需注意两点：

1. Send&Receive 阶段网络出错
2. master 定期check workers 的存活情况

出错后，就重头开始计算当前这个图。但是因为Variables 记录了图中间一连串的tensors 和Operations 的结果（也可以理解为整个图执行到某些nodes 后的输出），而且Variables 都有定时（每过多少轮迭代或每过多少时间）保存，重新开始计算的过程是可以恢复之前的结果的。

### Partial Execution 

前面提到的容错就涉及部分执行。 重新执行给定的某个输入、输出的图后，图是可以简化的，并且把输入、输出nodes 命名为feed、fetch，从而构建一个最小的图进行计算。

### 梯度计算

实际上梯度计算，依赖当前输出及之前输入：

比如 $y = a*x + b$，一致y 值，还需要知道x 的值，才能计算出梯度$a$

所以梯度计算跟前面所说的，按照有向图执行的方向正好相反（并且会在对应位置加上求梯度的node），这也导致有梯度计算时，必须保留所有中间结果的tensors 从而占用很多的内存。


**Queues** 

Enqueue 只有空间空闲时方可用。
Dequeue 当且仅当队列中元素达到一定数量后才操作。


**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

