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

> $a_{j}$  代表投排到第$j$  位的广告的CTR。
>
> $b_j$ 代表这个广告的出价。
>
> $q_j$ 代表这个广告的质量分（比如相关性分数）。

那么这个广告的得分应该为：$s_j = q_j * b_j$ ，而广告排序中则以这个分值进行排序。

#### 收费模型

**GSP**(Generalized Second Price mechanism) ：广告主出最少的钱即可赢得广告位，收费为 $\frac{s_{j+1}}{q_j} + 0.01$ 

- Overture 按照bid 排序则相当于 $q_j = 1$
- Google 按照Revenue 排序则相当于 $q_j = a_j$ 

**GFP**(Generalized First Price mechanism) : 收费按照广告主出价收，即$b_j$ 。2004 年之前Yahoo 在用。

**VCG**(Vickrey-Clarke-Groves mechanism): 如果某个广告$j$赢得这个广告位后，对其他广告主带来了损失。那么就按照这个损失总和收广告主$j$ 的费用。这个实际上是最优化Efficiency 的方法。

- Facebook 是第一个使用VCG 计价的。