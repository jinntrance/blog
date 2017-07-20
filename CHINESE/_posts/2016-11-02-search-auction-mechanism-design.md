---
layout: post
title: "搜索广告机制设计"
modified: 2016-11-02 14:15:38 +0800
tags: [竞价机制,Auction]
categories: [计算广告]
mathjax: true
mermaid: false
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

[TOC]



## 机制设计的目标

搜索广告中参与的三方主要是：广告主、平台、用户。那么我们机制设计的目标也主要是优化这三方的利益：

- Revenue 平台的广告收益
- Efficiency 带给广告主的价值（有时也称为广告主和平台的效用utilities）
- Relevance for users 用户的体验(这也能激励广告主按照Relevance 优化自己的广告质量)

而Efficiency 和Relevance 是平台跟竞对比拼的筹码。而如果没有竞对的情况下，平台自然是着意优化Revenue 了。



## 设计模型

### 基础模型

假设在单次搜索后的广告列表对某个广告位的Auction 中：

> $a_{ij}$  代表投排到第$i$  位的广告j的CTR。
>
> $b_j$ 代表这个广告的出价。
>
> $q_j$ 代表这个广告的质量分（比如相关性分数）。
>
> $v_j$ 代表这个广告如果被点击，后续能带给广告主的价值。

那么这个广告的得分应该为：$s_j = q_j * b_j$ ，而广告排序中则以这个分值进行排序。

#### 收费模型

**GSP**(Generalized Second Price mechanism) ：广告主出最少的钱即可赢得广告位，收费为 $\frac{s_{j+1}}{q_j} + 0.01$ 

- Overture 按照bid 排序则相当于 $q_j = 1$
- Google 按照Revenue 排序则相当于 $q_j = a_{ij}$ 

**GFP**(Generalized First Price mechanism) : 收费按照广告主出价收，即$b_j$ 。2004 年之前Yahoo 在用。波动较大，因为广告主会尝试调价到最低以赢得竞价。所以 GSP 解决了广告主调价的问题。

**VCG**(Vickrey-Clarke-Groves mechanism): 如果某个广告$j$赢得这个广告位后，对其他广告主带来了损失。那么就按照这个损失总和收广告主$j$ 的费用。这个实际上是最优化Efficiency 的方法也是激励兼容的（能刺激广告主提高出价以获取更大利润），但算出来的是通过广告主损失的估值计算的。（Facebook 是第一个使用VCG 计价的。）关于激励兼容如后的例子。

> 假设3个广告主的$v_i$ 值分别为10、4、2，而他们 CTR 相等且在广告位的第一、第二位分别为0.2、0.19。
>
> 则对第一个广告主，
>
> - 出价 4 能赢得第一个广告位，其收益为：*0.2\*(10-4) = 1.2*
> - 出价 3 只能赢得第二个广告位，其收益为：*0.19\*(10-2) = 1.52*
>
> 出价更低其利润（v 值减去 GSP 计价后的收费）实际上更高。



#### 排序模型

GSP 中广告排序有几种模型参数[^1][^2][^3][^4]：

1. s = q * bid 这又叫 Vanilla GSP
2. 在1 的基础上，bid 超过 reserve 才参与竞价，用1 的排序公式，这叫 GSP with unweighted reserves
3. s = q * (bid -reserve) 这叫 GSP with quality-weighted reserves
4. s = $q^\alpha * bid$ 这叫 GSP with quashing; 这也可以跟2或3 结合起来。当 q 值不稳定是，可以使用以提高 effeciency；但 q 值稳定时，则是以 effeciency 换 revenue。
5. s = $q * (bid - reserve)$  这叫 anchoring，简单场景中通常最优。



[^1]: Feldman, M., Meir, R., & Tennenholtz, M. (2011). Revenue Enhancement in Ad Auctions. In *Proceedings of the 7th international conference on Internet and Network Economics* (pp. 391–398). Springer-Verlag. https://doi.org/10.1007/978-3-642-25510-6_34
[^2]: Lahaie, S., & McAfee, R. P. (2011). Efficient ranking in sponsored search. In *Lecture Notes in Computer Science (including subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics)* (Vol. 7090 LNCS, pp. 254–265). https://doi.org/10.1007/978-3-642-25510-6-22
[^3]: Roberts, B., & Gunawardena, D. (2013). Ranking and tradeoffs in sponsored search auctions. *Proceedings of the …*, *1*(212), 751–766. https://doi.org/10.1145/2492002.2482568
[^4]: Thompson, D. R. M., & Leyton-Brown, K. (2013). Revenue optimization in the generalized second-price auction. *Proceedings of the ACM Conference on Electronic Commerce*, *X*(X), 837–852. Retrieved from http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.363.4962&rep=rep1&type=pdf



