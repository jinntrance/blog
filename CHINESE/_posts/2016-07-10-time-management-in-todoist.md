---
layout: post
title: "使用Todoist 进行时间/任务管理"
modified: 2016-07-10 11:56:53 +0800
tags: [GTD,番茄钟,Todoist]
categories: [时间管理]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

时间管理、任务管理的效果有两个方面的提高：

1. effectiveness 减少用时，保证产出。
2. productivity 增加产出。

实际上就是，effectiveness 做好了，在有限的时间下内又想多做一些事情productivity 也就能提高了。

## 时间日志

其实为了提高effectiveness，就需要找到哪些时间不该花从而耽误了真正该做的事情，以及找找哪些任务可以以在更短的时间内完成。那么这就免不了做详细的时间日志：

- 事无巨细的记录activity log。电子产品可使用[Rescuetime] 、[Moment] 。
- 分析activity log，找出低效任务，分析原因。
- 做出改变。

比如当你分析完成后，发现你每天都会花2 小时以上刷微博、看各类资讯而没有任何增量收益时，或者只是打开手机无聊得翻各个应用都能花上1 个小时。那么就得做时间日志详细的分析分析了。分析之后说不定你发现你上下班时间在路上也有一个小时，也没有好好利用起来。


## 目标设定

更长期的计划和回顾此处就不再赘述了。这里主要着眼于短期及当日计划安排，且主要使用四象限确定工作优先级： P1 > P2 > P3 > P4 == 0。而这高优先级当然是你最想要的产出，保证了这个完成才能保证effectiveness。

|   Priority    | Urgent | not Urgent |
| :-----------: | :----: | :--------: |
|   Important   | **P1** |    *P2*    |
| not important |   P3   |   ~~P4~~   |

实际上，目标设定阶段也许要关注[SMART]: Specific, Measurable, Achievable, Relevant, Time-bound。

设定目标阶段主要关注MART，而将目标拆分成任务时更注重Specific。将目标转化为任务[^TM] ：

1. 把目标和项目细分为SMART 类型的任务；
2. 指定任务优先级；
3. 按照优先级别排序；
4. 对P1/P2 任务估时，对整体时间的20%-40% 留空。

对应上述几项，可以使用Todoist：

1. 任意级别的子任务拆分，拆分到做一个task 在一个小时以内即可；
2. 可以在编写Task Title 直接输入优先级别如`p1` ；
3. Todoist 当日任务，默认就是按照优先级别排列的，所以只要安排好任务，接着按照这个列表做事情即可。
4. 结合第一条，使用番茄钟[^PD] 的个数来估时，可以给每个任务打一个label，比如`pd1`、`pd2`等。而且当天任务最好不要超过10 个番茄钟。

**TIPS**

> 其实个人觉着Todoist 最好的一点是可以做语言解析从而设定对应的时间，只需要在添加任务是一并写入任务中即可。
>
> - 比如设定具体的时间：`tomorrow after noon` 或 `7/11 at 12` 即可。
> - 或者是固定时间重复的事情比如`read a book every three workdays`

## 任务执行

前面做好规划了，那么按照__优先级__做即可。但是执行前得注意检查当天任务规划是否合理：

- 每天p1 的任务不要超过3 件为好。其他任务可以拖延，但是p1 任务不能拖延。
- 每天规划的任务最好不要超过10 件，最好不要超过10 个番茄钟的任务。

执行时最好也是结合**番茄工作法**进行，这样能使当天任务有条不紊的进行。

我个人还会针对做的事情花的时间进行统计，比如我花在生活、工作、学习提高等各个方面的时间分别是多少从而做到较好的平衡。读过《[异类](https://book.douban.com/subject/25863621/)》的朋友都知道，你在一件事情上花的时间越多，比如达到10000 小时，你就越可能成为专家。对于我个人来说，也至少需要使用所有时间的20% 学习提高，不然逆水行舟。

- 使用[Toggl](https://www.toggl.com/app/timer) 记录时间，每个任务都会对应一个project（比如工作、学习提高）。
- 使用其Chrome 扩展[Toggl Button](https://chrome.google.com/webstore/detail/oejgccbfbmkkpaidnkphaiaecficdnfn) 跟Todoist 结合，这样只要在todoist.com 上，鼠标放到某个task 上时就会有`start timer` 的提示记录这个task 的时间了。并且一会儿会弹出提示选择对应的一个Project
- 如果你在执行任务时还不喜欢干扰，可以使用[Zapier](https://zapier.com/) 把Toggl 和Rescuetime 结合起来。当你在使用Toggle 计时时，会触发Rescuetime 的FocusTime，从而在这段时间禁止你访问在Rescuetime 标记的低效率的Distracting websites。


**TIPS**

> 对于付费用户，Todoist 还可以增加基于地理位置的提醒。比如到家后提醒，到办公室提醒。

## 结语 
Effectiveness 其实就是要个人做“正确的事情”、做“最值得期待最重要的事情”，并且尽量保证完成。在这个基础上，找出哪些没有必要做的事情，或者不太值得做的事情；把这一部分省下来的时间用来做“最值得期待最重要的事情”，也就productivity 的提高了。


[^TM]: 《时间管理：高效率人士的成功利器》，商务印书馆
[^PD]: 《番茄工作法图解》，人民邮电出版社
[SMART]: https://en.wikipedia.org/wiki/SMART_criteria
[Rescuetime]: https://www.rescuetime.com/get_rescuetime
[Moment]: https://inthemoment.io/



