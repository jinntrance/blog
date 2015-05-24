---
layout: post
title: Spark笔记
tags: [TECHNICAL, 数据挖掘, SPARK, SCALA]
date: 2014-06-18T17:30:34+0800

---

Spark入门使用文档多可参考：

中文（淘宝技术部译）： [http://rdc.taobao.org/?p=2024][http_rdc.taobao.org_p_2024]

英文（Spark官方）：[https://spark.apache.org/docs/latest/quick-start.html][https_spark.apache.org_docs_latest_quick-start.html]

虽然Scala、Java、Python都可使用Spark，但毕竟Spark原生就支持Scala，

1.  若学习可用此书《**Programming in Scala**》 by Martin Odersky，
2.  而sbt（java中的ant或maven）可参考  [http://www.scala-sbt.org/documentation.html][http_www.scala-sbt.org_documentation.html]

如果熟悉Python，平常的programming还是很流畅的，官方的Python文档也比较全，也就不必花太多精力学习Scala。虽然Scala学习有一定的难度，学习这个前期投入也是完全值得的。“[为什么时Scala？][Scala]” 也粗略列出了Scala这门语言本身的优势。  


配置及基本使用请参考中、英文文档，在此不再赘述，本文主要讲讲Spark中涉及到的主要概念和为涉及到的点。数据处理基本的流程就是读取、map、reduce、存。Spark里有两个概念**Transformations、Actions**。

1.  Transformations涵盖了map这个过程及其他中间数据转换方法（）。但这些方法的调用，都只是存下来一个链式调用，并未真正处理数据。
2.  Actions包含reduce及其他方法（包括存储数据），这些方法调用则会出发集群上真正的数据操作。

[RDD ][RDD]提供了两个方法存储中间结果： persist(), cache()。cache是绝对的存在内存中，persist可以根据你自己配置仅存内存或硬盘，或两者兼存（这种模式当然会自动偏向存在内存，如果内存不够很多时候会抛OOM的）。当然persist()的具体配置就要看你司需求在速度和硬件资源中做一个平衡了。

Spark读取本地文本和HDFS都很方便，但**读Hbase**却麻烦好些，可参考《[Lighting a Spark With HBase][]》 ，而且现在Spark还不能使用HBase 0.96及以上（[见此][Link 1]），Spark支持的HBase 0.94又只支持Hadoop 1 （看看"[Table 2.1. Hadoop version support matrix][]"弄清楚HBase支持的Hadoop的版本信息）。所以各位看官在使用Spark读取HBase时得留心了。而且Spark通过zookeeper连接HBase时，hbase-site.xml中zookeeper的设置也得加上。

 

    val conf = HBaseConfiguration.create()
        conf.set("hbase.zookeeper.quorum", "HOSTNAMES")
        conf.set("hbase.master", "HOST:PORT")

 

另外，**sbt使用Spark**的过程中，也得特别注意必须在SparkContext里加上依赖的函数包（而不仅仅只是在build.sbt里加上依赖），以便每个slave node能从master处获取到这些jar；此外sbt本项目生成的jar也得加到SparkContext里。

 

    new SparkConf().setJars(
      SparkContext.jarOfClass(
          classOf[org.apache.hadoop.hbase.HBaseConfiguration])++
      Seq("target/scala-2.10/PROJECT_NAME_2.10-1.0.jar")
    )

 

References:

《Programming in Scala》 :  http://book.douban.com/subject/6050104/  


Spark作者: @hashjoin @李浩源HY  


国内Spark在Intel、阿里、网易、腾讯、优酷等都有使用，大家也可以关注微博@连城404 @Andrew-Xia @尹绪森 @明风Andy @CrazyJvm @BigData大数据 获取相关信息。


[http_rdc.taobao.org_p_2024]: http://rdc.taobao.org/?p=2024
[https_spark.apache.org_docs_latest_quick-start.html]: https://spark.apache.org/docs/latest/quick-start.html
[http_www.scala-sbt.org_documentation.html]: http://www.scala-sbt.org/documentation.html
[Scala]: http://crazyadam.diandian.com/post/2012-02-19/15477027
[RDD]: http://shiyanjun.cn/archives/744.html
[Lighting a Spark With HBase]: http://www.vidyasource.com/blog/Programming/Scala/Java/Data/Hadoop/Analytics/2014/01/25/lighting-a-spark-with-hbase
[Link 1]: http://apache-spark-user-list.1001560.n3.nabble.com/IllegelAccessError-when-writing-to-HBase-td5987.html
[Table 2.1. Hadoop version support matrix]: http://hbase.apache.org/book/configuration.html