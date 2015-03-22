---
layout: post
title: Linux或Mac下的并行(parallel)文本处理
tags: [Mac, Linux, parallel, Technical]
date: 2014-12-07T23:19:10+0800
---

平常数据处理时，有时并不直接用Spark或MR来做。一者是我司内部重编译打包提交任务还是蛮麻烦的。
二者若数据量不太大，简单的文本处理awk、sed等做着却更方便省事儿快捷。

但仅仅用awk和sed是不能并行，也就不能充分利用单台机子的CPU的，所以比如尴尬的文件如10G，处理起来就比较慢了。要是能利用单机的16CPU该是多好？

## GNU Parallel

接着我就发现了[GNU Parallel](http://www.gnu.org/software/parallel/)这货。

### 安装

Mac装起来比较简单

    brew install parallel
    
就可以了，其他系统可以参照上面的链接的`Downloading GNU Parallel`部分。

### 使用

使用可参照`parallel --help`，下面讲几个常用的。
    
`./parallel -k --no-notice -j 16 --pipe -q`

其中参数：
    `-k`表示输出与原有顺序，
    `-j`就是跑jobs的数量，也就是并行的数量，
    `-q`表示-quote，就是后面跟的命令中如果包含特殊字符，不必用转义符`\`，
    `--pipe`就是丛stdin里读取并分割处理，
    `--no-notice`就是为了让parallel不唠叨。
    
### 例子

现在给一个word count的例子吧

{% highlight bash %}
parallel <$FILE --no-notice -j 16 --pipe -q awk '{for(i=1;i<=NF;i++) words[$i]+=1}END{for(w in words) print w "\t" words[w]}' | awk '{words[$1]+=$2}END{for(w in words) print w "\t" words[w]}'
{% endhighlight %}

但其实这个例子不太好。因为这个wc的瓶颈在未并行的第二个awk，而且使用pipeline，会导致前面并行的awk阻塞。而如果只是对每一行做一些文本处理，用parallel并行提速，自然最好不过了。