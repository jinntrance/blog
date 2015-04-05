---
layout: post
title: "竖排及显示小语种蒙满"
tags: [Font, font-face]
date: 2015-04-05T00:32:30+08:00
---

### 遗留问题

最近突然想到，之前发的一篇博文[显示小语种字体]({{ site.baseurl }}{% post_url 2014-11-01-ethic-scripts %})，还有未竟之事：

* 要是读者电脑里没有装相应字体，岂不都看不到这些字了？
* 文章中的蒙文、满文没有竖排。


### font-face load 本机未装字体

问题一就用css的font-face动态加载Web fonts字体就可以了。 使用[font-face generator]，比如上传已有的如TTF字体，并生成对应的字体和CSS。

- 生成的字体，而=仔细看了看，大小也是WOFF2 < WOFF < TTF = OET < SVG的。所以最好还是把WOFF2写在CSS 加载资源的最前面。
- 生成的CSS，还不够全面，可以参考 [CSS Tricks] 里对font-face的详细阐述。

暂时使用的是`Mongolian Baiti`，生成字体和CSS后稍加注释和修改如后：

{% highlight css %}
@ font-face {
font-family: 'Mongolian';
    src: url('../fonts/MongolianBaiti.eot'); /* IE9 Compat Modes */
    src: 
     url('../fonts/MongolianBaiti.eot?#iefix') format('embedded-opentype'),/* IE6-IE8 */         
     local('Mongolian Baiti'), 
     local('Mongolian White'), /* load local fonts already installed*/
     url('../fonts/MongolianBaiti.woff2') format('woff2'),
     url('../fonts/MongolianBaiti.woff') format('woff'),
     url('../fonts/MongolianBaiti.ttf') format('truetype'),
     url('../fonts/MongolianBaiti.svg#MongolianBaiti') format('svg');
    font-weight: normal;
    font-style: normal;
}
{% endhighlight %}


本来也不想对IE做适配，这些字体占用这么多空间。不想[浏览器市场份额]里面一看，IE还有35+%的市场份额😂 

### 竖排字体

竖排不难，加上css的竖排就可以了：

{% highlight css %}
.lang-mn {
  font-family: "Mongolian Baiti", "Mongolian White", 'Mongolian', sans-serif;
  -moz-writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -o-writing-mode: vertical-lr;
  -ms-writing-mode: tb-lr;
  writing-mode: tb-lr;
  layout-flow:vertical-ideographic;
}
{% endhighlight %}

后面有些中文的资料，也需要竖排，这也能用得着。

### 检查与分享

大家也可以看看如下的字体是否是竖排，且满语、蒙语是否可见了。

滿

>ᠮᠠᠨᠵᡠ ᡤᡳᠰᡠᠨ 
{:.lang-mnc}

蒙

>ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ᠌ 
{:.lang-mn}

正常显示后应该是这样的： ![demo]
如果还是不能正常显示，那还是下载对应字体吧（比如我这儿的[蒙文字体]），或者更新浏览器到Google Chrome吧。

这个[CSS]，我也加了中文的竖排样式，大家可以下载使用。
大家也可以到`Mongolian White`的[官网](http://www.mongolfont.com/cn/font/mnglwhiteotf.html) 看看蒙文的优美显示。


[浏览器市场份额]: http://tongji.baidu.com/data/browser
[CSS]: {{ site.baseurl }}/assets/css/lang.css
[font-face generator]: https://everythingfonts.com/font-face
[CSS Tricks]: https://css-tricks.com/snippets/css/using-font-face/
[demo]: {{site.baseurl}}/assets/images/2015-04-04.mongolian.png
[蒙文字体]: {{site.baseurl}}/assets/fonts/MongolianBaiti.ttf