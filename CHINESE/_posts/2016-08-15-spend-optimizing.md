---
layout: post
title: "广告预算优化"
modified: 2016-08-15 17:12:52 +0800
tags: [竞价机制,Auction]
categories: [计算广告]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

Auction 机制设计本身是一门很深的学问，特别是对于移动互联网时代的原生广告来说。只有让广告主、用户、媒体三方都受益的的机制才是良性可持续发展的机制。

Google 在广告主预算受限的情况下，怎么在优化消耗同时权衡用户体验和广告主ROI。_Optimizing budget constrained spend in search advertising_ [^OBCS]



### Vanilla Probabilistic Throttling 

如果一个广告的预算受限，那么通常情况下，这天还没结束就花完预算了。这样没有完整一天的流量，也不便于广告主分析不同时段的转化率情况，进而进一步按时段优化自己的广告投放。那么一个能让**预算受限的广告，获得的流量更加均衡** 的算法就很有必要。

Google 提的VPT 这个算法比较简单，对于预算受限的广告，假设：

- $B_a$ 为广告主$a$ 当天剩余预算。
- $T_a$ 表示（假设预算无限制的情况下）广告主当天能有的最大的消耗。这个实际上应该还包括当天的流量预估等工作。

那么对于每次query，这个广告主以$\frac{B_a}  {T_a}$ 这样的概率参与Auction 投放即可。

### Optimized Throttling

前面VPT 算法，实际上对于没有参与Auction 的流量，没有衡量其对广告ROI 的优劣、用户体验的好坏。实际上按照前面的一个随机概率，很有可能不参加Auction 的流量，正好是这个广告转化率蛮高的流量。自然，我们最优的结果，当然还是在最好的流量上参与Auction 拍卖，差的流量就直接不参与Auction 了。这样流量也均衡了，相应的指标（比如广告主ROI）也得到了优化。

我们用 $\theta$ 表示我们要优化的指标。 假设对于广告$a$ ，每一次广告展现对应的指标为$\theta _i$ ，那么我们定义：

$F_{\theta, a}(\mu) $ 表示所有$ \theta_i \le \mu $ 的那些广告展现，消耗的总和占预算的比例。同时用 $R_{\theta, a}(\mu) = 1 - F_{\theta, a}(\mu) $ 表示对于$ \theta_i \le \mu $ 剩余预算占比，或者对于$ \theta_i \ge \mu $ 的消耗占比。

那么最后选择$\theta \ge \theta_t$ 其中 $R(\theta_t) = \frac{B_a}{T_a}$




[^OBCS]: Karande, C., Mehta, A., & Srikant, R. (2013). [Optimizing budget constrained spend in search advertising](http://rsrikant.com/papers/wsdm2013.pdf). Proceedings of the Sixth ACM International Conference on Web Search and Data Mining - WSDM ’13


**Mathjax was not loaded successfully**{:.mathjax_alt} 
