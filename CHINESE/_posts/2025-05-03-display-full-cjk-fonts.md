---
layout: post
title: "显示所有的生僻汉字"
modified: 2025-05-03 08:56:40 +0800
tags: [LANGUAGE]
categories: [奇技淫巧]
mathjax: false
mermaid: false
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---
中日韩越包含很多生僻汉字，一般系统显示的都是常规汉字，网页显示不全，需要引入字体。而当前相对较全的字体有：
- [遍黑体](https://github.com/Fitzgerald-Porthmouth-Koenigsegg/Plangothic_Project) 开源且更新较为及时。
- [天珩全字库](http://cheonhyeong.com/Simplified/download.html) 闭源但会随着 Unicode 版本更新而更新 。而且还有对应输入法解决方案。

**电脑**：下载对应字体，并安装到系统，即可展示生僻字。

**Safari**：MacOS或iOS的 Safari，可以安装`Userscripts` 插件然后添加以下CSS 样式即可展示。

**网页**：在网页中添加以下 CSS 样式即可展示。

## CSS 样式
```css
@import url("https://fontsapi.zeoseven.com/150/main/result.css");
@import url("https://fontsapi.zeoseven.com/152/main/result.css");

html body *{
  font-family: system-ui, sans-serif, 'Plangothic P1', 'Plangothic P2';
}
```

## 测试汉字集


| 规范 | 典型汉字 | 样例汉字集 |
|-----|-----|-----|
| GB18030-2022，包含 8 万多汉字   | [biangbiang 面的：𰻝、𰻞](https://baike.baidu.com/item/biangbiang%E9%9D%A2/2502712)   |  [四川方言字](https://zh.wikipedia.org/wiki/%E5%9B%9B%E5%B7%9D%E6%96%B9%E8%A8%80%E5%AD%97)  |
| Unicode 16，包含 14 多万汉字   | [川渝地区的贼：𱟛](https://zh.wikipedia.org/wiki/%F0%B1%9F%9B)   | [所有汉字](http://yedict.com/zsts.htm) , [CJK I 区](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%97%A5%E9%9F%A9%E7%BB%9F%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97%E6%89%A9%E5%B1%95%E5%8C%BAI)  |

