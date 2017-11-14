---
layout: post
title: "Kaggle 经验总结"
modified: 2017-11-14 19:59:13 +0800
tags: [机器学习]
categories: [机器学习]
mathjax: 
mermaid: 
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

之前种种原因，也没能在 Kaggle 上开始打比赛。这次在公司组织的 [MDD Cup 2017](https://www.kaggle.com/c/mdd-cup-2017/leaderboard) 侥幸获得第四。这真得感谢领导支持允许在工作时间参与公司内部这个赛事，感觉这个最重要还是时间投入。

自己也是新手，遇到种种问题，总结一下以为前车之鉴：

1. 熟悉模型工具各参数，自动模型调参，调到最优；
2. train/val/pred 特征数据分布、缺失比例要一致，( train 覆盖较多的数据，考虑比如处理置空跟 test/pred 一致），特征数据覆盖率尽量高（从过去一周变过去所有）；
3. 使用稳定的 val set，保证 val set 的分布跟 pred 一致，loss 变化也一致并能对应线上 Public Leaderboard 表现；
4. 各种 magic feature、穿越特征、组合特征的尝试及使用（太多后可以用特征选择处理）；
5. 差异化的模型融合：特征差异、数据采样差异、数据分布修改（线性/非线性、lightgbm/xgboost 融合等）；
6. 不要有 bugs，产生特征数据都肉眼看看防止不出错（比如我quater/time 计算原来就计算成 UTC 的了）；
7. EDA 看数据问题、分布、loss 较大的 case 等。

自己遇到的效率问题：数据生产跟 trainning 各中间环节没有解耦开，导致中间数据生成过程延迟而影响最后模型训练，耗费关键的最后两天的太多时间。

听前几名分享的感觉重要的几点值得借鉴的经验：

- label 变换 log, log shift 等
- 融合：特征、label、模型的差异化



其他小伙伴网上分享的也很值得借鉴：

[Kaggle 数据挖掘比赛经验分享](https://zhuanlan.zhihu.com/p/26820998)

[分分钟带你杀入Kaggle Top 1%](https://www.leiphone.com/news/201710/YoMbUNqRlasrpgle.html)

[Kaggle 经验小结](http://community.bittiger.io/topic/168/%E6%95%B0%E6%8D%AE%E7%A7%91%E5%AD%A6-kaggle-%E7%BB%8F%E9%AA%8C%E5%B0%8F%E7%BB%93)