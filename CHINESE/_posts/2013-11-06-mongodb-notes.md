---
layout: post
title: group by hour in mongodb按小时聚集
tags: [困而知之]
categories: [日有微进]
date: 2013-11-06T22:17:49+0800

---

mongodb使用起来着实灰常蛋疼， 难怪都喜欢使用Hive、Shark。而且语法也各种怪异。

如下实现在st表中将基于timestamp(存的是s而不是ms)的列按小时聚集count：

    db.st.aggregate(
       [{'$match':{'type': "weibo"}},
        {'$group': {
            '_id': {'$subtract': ['$timestamp', {'$mod':'$timestamp', 3600]}]},
            'y': {'$sum': 1}}},
        {'$project': {'x': '$_id', 'y': '$y', '_id': 0}},
        {'$sort': {'x': 1}}])

等价于如下sql 伪代码

    select (timestamp-timestamp%3600) as x,count(*) as y from st
    where type='weibo'
    group by x 
    order by x asc

作作Technical笔记，以备后用。发现自己作的Technical笔记太少，倒了不少车轮子！ 做笔记一则加深自己理解，一则前车以鉴来者。