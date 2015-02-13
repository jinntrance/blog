---
layout: post
title: 通过IP获取各省分布
tags: [Technical, IP, 省市分布]
date: 2013-11-08T22:10:56+0800
---

数据是用的[http://php.js.cn/blog/ip-data/][http_php.js.cn_blog_ip-data]

它是精确到市的，我自己把它粗略整理成省份了。 [见此][Link 1]

原数据给的是ip范围，如果通过各段异或求结果，比较麻烦，自己把ip范围转换成4B的long，这样ip范围其实就对应一个long的范围。这样实时查询效果更佳。贴一下关键Scala和Python的代码吧，现在用FP着实用得不亦乐乎。

[Scala][]

    def ip2long(ip:String)=ip.split('.').foldLeft(0l){case (a,i)=>(a<<8) + i.toInt}

Python

    def ip2long(ip):
         return reduce(lambda sum, i: (sum << 8)+int(i), ip.split('.'), 0)

Scala好的一点就是，当你要对当前这个数据进行操作时，顺畅的往下写就行。Python呢，各种函数都得跑到整段最前面加，开发的时候真心影响效率。


[http_php.js.cn_blog_ip-data]: http://php.js.cn/blog/ip-data/
[Link 1]: https://github.com/jinntrance/algorithms/blob/master/resource/ip_mapping.csv
[Scala]: https://github.com/jinntrance/algorithms/blob/master/src/IP2Loc.scala