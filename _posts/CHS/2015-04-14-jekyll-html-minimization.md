---
layout: post
title: "Jekyll 页面加载优化"
modified: 2015-04-14 20:41:16 +0800
tags: [Jekyll, Optimisation]

---

之前建博客的时候已经[使用GitHub 和GitCafe ]({{site.baseurl}}{%post_url CHS/2015-03-22-github %}) 对国内外访问加速了。但是自己的[个人主页]({{site.domain}})在手机只开2G的情况下居然需要10+s才能打开，着实让人头疼。

### 优化方案

细想有几个方面可以优化：

+ 减少传输内容大小：可以让服务器开启gzip ，压缩html/css/js，对移动端使用小图片等。
+ 减少请求次数（毕竟HTTP headers都占大小，而且每次请求建立连接都得使用几百ms；遇到IE 每个页面限制同时最多5个请求，或移动浏览器同时请求数的限制就哭了）：可以开启服务端SPDY，合并css、js或者使用外部常用js 以便命中用户浏览器缓存。
+ CSS 放页面头部，js 放页面底部，并且可以异步加载JS 就异步加载，不影响页面渲染。

网上看了其他人的建议，也可参考：

- [10 Ways to Speed Up Your Website] 
- [15 Tips to Speed Up Your Website]
- [PageSpeed Insights (by Google)] 这个很好用的Chrome Extension，也可以快速给我们优化建议。

针对前面列的几个方面，SPDY本来可以将HTML 里面所有的资源打包传给客户端，也就没有很多合并的优化了。不过如今Nginx上的SPDY 还是beta阶段，而且放在GitHub/GitCafe Pages上，也没办法要求他们加了。后面可先作如下优化。

#### gzip 压缩
GitHub Pages 默认支持gzip。GitCafe Pages 前几日也劳烦他家员工加上了[GitCafe Pages添加http gzip 支持]。加了的结果就是，原来的Profile 页面整个`142KB` 的css直接变成 `31.3KB`了，现在差不多手机2G 网络也能2-3s 开Profile页面，甚是欣慰。

#### CSS 合并压缩
Jekyll 默认支持SCSS ([相关学习资料](http://sass-lang.com/guide))，可以简单的合并和压缩CSS 文件。只需配置`_config.yml`，添加如后配置，
{% highlight yaml %}
sass:
  style: compressed
{% endhighlight %}

并在合并的单一css 文件中import 其他位置的scss 就行；scss 默认支持所有的css文件，改后缀后，放入`_sass` 即可简单引入。 比如我`_sass`下有如下两个文件，文件名以下划线开头：

```
_sass
-- _page.scss
-- _lang.scss
```
{:.highlight}

合并后的文件，记得在头部加上两行`---`，表示让Jekyll 识别为需要解析的文件，而此时不需要下划线，比如我合并后的`main.css`为：

```
---
---
@ import "page";
@ import "lang";
```
{:.highlight}

当然，[main.css]里也可再加入其他的CSS 定义，最后结果同样会被压缩。

#### JS 合并压缩
如果把第三方库的JS放在自己的服务器上，最好使用压缩版本。别人定制或自己写好不怎么改动的JS，也可以通过[YUI Compressor] 进行压缩。

而如上CSS，同样使用两行`---`，可以通过Jekyll 解析，从而引入其他js文件进行合并，比如我把所有js都放在同一个目录下， 如下我为同目录下[all.js]的全部内容。

```
---
---
{ % include_relative jquery.min.js %}
{ % include_relative jquery.easing.min.js %}
{ % include_relative bootstrap.min.js %}
{ % include_relative grayscale.min.js %}
```
{:.highlight}

#### html 压缩
找了好一段时间，终于找到在Jekyll 中可压缩HTML的方法[Compress HTML in Jekyll](http://jch.penibelst.de/)。实际上它就是使用Jekyll 默认的Liquid 模板，对输出HTML字符串就行处理，去除注释、空字符、冗余的HTML tag等。这个的好处是，不用存储压缩的HTML，平常修改也方便很多。
应用起来也非常简单，下载`compress.html`到`_layout`中，我就在`default.html`的头部添加：

```
---
---
layout: compress
```
{:.highlight}
并且在`_config.yml`中添加对配置，去除所有评论、空字符和HTML tag 的结束符：

{% highlight yaml %}
compress_html:
  clippings: all 
  comments: ["<!-- "," -->"]
  endings: all 
  ignore:
    envs: []
{% endhighlight %}

HTML tag 的结束符endings配置需要慎用`all`，比如`<p></p><a></a>`去掉`</p>`后浏览器通常会解析成`<p><a></a></p>`，如此样式也会差距比较大。而把`all` 替换成`[li, td]` 则会安全很多。我使用后Chrome 观察，HTML 压缩为原来的90-%了。
另外，因为此种方式会删掉换行符，所以嵌入的JS 不能有`//`的注释。

#### 图片适应

例如背景图片，需要主要是针对不同屏幕大小，生成并选择不同大小的图片。不然手机上下载电脑上的大图就不合理了。
比如我找了一下600px（也有使用768px）以下基本也就是移动设备的屏幕了。

~~~ css
@ media (max-width: 600px){
 .intro {
  background: url(/img/intro-bg-600.jpg) no-repeat bottom center scroll;
 }
}
~~~

#### 异步加载

如果你觉着CSS也可以异步加载，可以使用[loadCSS]异步加载，不过这种方式基本都会闪屏。

根据业务需求，不必阻塞的JS 则完全可以使用 [async&defer] 进行异步加载：`async`保证异步不保证顺序但会阻塞HTML 解析（但如果放在body末尾其实就没什么解析的了）；`defer`是在HTML 解析完成后按照顺序执行的，但是IE 9 以下的浏览器比较奇葩，貌似defer 表现得跟async 一样。



[async&defer]: http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
[10 Ways to Speed Up Your Website]: http://blog.crazyegg.com/2013/12/11/speed-up-your-website/
[15 Tips to Speed Up Your Website]: http://moz.com/blog/15-tips-to-speed-up-your-website
[PageSpeed Insights (by Google)]: https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli
[GitCafe Pages添加http gzip 支持]: https://gitcafe.com/GitCafe/Help/tickets/820
[YUI Compressor]: http://yui.github.io/yuicompressor/
[main.css]: {{site.baseurl}}/assets/css/main.css
[all.js]: {{site.baseurl}}/assets/js/all.js
[loadCSS]:https://github.com/filamentgroup/loadCSS
