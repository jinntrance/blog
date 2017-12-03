---
layout: post
title: "Mac OSX 常用安装"
modified: 2017-12-02 23:17:54 +0800
tags: [LANGUAGE]
categories: [奇技淫巧]
mathjax: 
mermaid: 
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

## 字体

Mac 系统中的字体缺失，带来不少困扰，我也搜罗了一下解决方法。

1. 汉字十来万[^Hanzi]，字体缺失，网页上的字直接就成方框了。目前是[花园明朝字体](http://fonts.jp/hanazono/)收录最全，近十万。安装成功后可在[字体试验页](http://ctext.org/font-test-page/zhs)检验。iOS 要安装完整字体需用 [AllFonts](https://itunes.apple.com/en/app/allfonts/id288031829?mt=8) 这个应用。Android 参照[显示小语种字体]({{ site.url }}{% post_url 2014-11-01-ethic-scripts %})。
2. Windows 系统下的常见中文字体，在 Mac 显示时虽然可以有替代字体，但是如果跟其他用 Windows 的人协作编辑文档，这些字体缺失就会带来很多不必要的麻烦。这就得特别的安装这些字体了。

我这面就整理了Windows 下常用字体的宋体、书宋、黑体、雅黑，方便方便安装。

1. 首先装上 [brew](https://brew.sh/) 

2. 然后选择性地执行如后命令即可：

   ```bash
   brew tap jinntrance/homebrew-fonts
   #花园明朝字体
   brew cask install font-hanamina
   #常用简体字字体
   brew cask install font-fzshusong-z01 font-fzshusong-z01s font-simhei font-simsun font-microsoft-yahei
   #繁体字常用字体正黑体和细明体
   brew cask install font-microsoft-jhenghei font-mingliu
   #Noto Sans CJK 的思源黑体
   brew cask install font-noto-sans-cjk font-noto-serif-cjk
   ```



[^Hanzi]: https://www.zhihu.com/question/22792302