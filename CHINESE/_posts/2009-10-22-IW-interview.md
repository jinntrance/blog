---
layout: post
title: IW 笔试....
tags: [LIFE]
date: 2009-10-22T22:19:00+0800

---

  
才参加[innovation works]的笔试,十个选择题,一道编程题.

杯具啊,第一个选择题就卡住咯. 问输出

{% highlight cpp %}
int func(x) {
   count=0;
   while(x!=0){
     count+=1;
     x=x&(x-1);
   }
   return count;
}
printf("%d", func(200909)); 
{% endhighlight %}
 
不过整体上考得还是比较基础,c++两道题,java一题,两道组成原理,两道网络,两道数据结构,还有一道RegExp(是`/a\*(a|ba+)/`匹配的字符串).. 最后编程题是二叉排序树(任意熟悉语言,用的python写,不知道可不可以直接写汉语哈). 不知道今儿下午会不会通知面试哈... God bless me.


[innovation works]: http://www.innovation-works.com/