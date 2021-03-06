---
layout: post
title: "科學の上網的便捷方法"
modified: 2018-02-03 18:19:11 +0800
tags: [计算机, BBR, SS]
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

由于众所周知的不可抗拒因素，在大陆很多网站都不能访问。科学上网则能让我们从查资料而不得的苦海中脱离出来。

## VPS 准备

首推 Bandwagon 的两款 KVM 机子：

- [年付30刀，月500G 流量，延迟低](https://bwh1.net/aff.php?aff=10418&pid=56)

- [年付20刀，月1000G 流量](https://bwh1.net/aff.php?aff=10418&pid=53)

我自己整个家里成员自用，选择第一款月流量也完全够用。北京联通自测速度是可以到`200 Mb/s`，看 4K 视频也是完全没有问题。
上面两款很容易卖断货，可参看[搬瓦工](http://banwagong.cn/)上的更多选择。或选择其他VPS [2018 VPS 推荐](https://www.10besty.com/best-vps-hosting-services/)。

## 服务端配置

### 安装 BBR 加速

Bandwagon 上得选择 **KVM**，同时服务端系统需要选择带 BBR 的版本：

- 检测系统版本 `Client Area --> Services --> My Services --> KiwiVM Control --> Main Controls --> Operating System`）。
- 如果上述系统版本中不包含 `bbr` 字样，则到 `Install new OS` 处选择包含 `centos6***bbr` 字样的系统重装。需要注意的就是，只有`Centos 6`才支持后续 SS Server 的自动安装。

其他 VPS 可参照 [一键安装最新内核并开启 BBR 脚本](https://teddysun.com/489.html)。如果**不安装 BBR**，我测试速度是低于`10Mb/s` 的。

### 安装 SS 服务端
Bandwagon 上安装非常简单，只需要在刚刚的控制台选择 `KiwiVM Extras --> Shadowsocks Server` 自行安装，加密协议选择默认即可。

其他 VPS 安装参照 [SS 使用说明](https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E) 。如果想 DIY，协议选择上主要考虑[^Encrypt Method]：

- *aes-256-cfb* 首选，加密强度较高，且服务端客户端**广泛支持**。
- *chacha20-ietf-poly1305* 对 CPU 弱一些的路由做客户端的话，推荐选择。加密强度和加密能耗间的平衡，有些服务端、客户端不支持；也可退而求其次选择 chacha20。


## 客戶端配置
主要客户端：
- [Windows 客户端](https://github.com/shadowsocks/shadowsocks-windows/releases)

- iOS 搜索`Wingy`; Android 下载 [Shadowsocks](https://github.com/shadowsocks/shadowsocks-android/releases) 。

- Mac 使用 [ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG/releases) ，可使用如后方式打开 fast-open 加速：

  - ```bash 
    brew install shadowsocks-libev
    file=~/Library/Application\ Support/ShadowsocksX-NG/ss-local-latest/ss-local
    echo '#!/bin/bash
    ss-local --fast-open "$@"' > "$file"
    chmod a+x "$file"
    ```
- 路由器使用 [LEDE/OpwnWRT](https://openwrt.org/downloads) + ChinaDNS+ Shadowsocks ,参考[Lede 17.01 设置](http://phyer.click/zh/2017/08/28/lede-shadowsocks/)。

对于 PC/MAC 客户端，自动代理是通过域名列表选择哪些流量走本地代理客户端的，所以时常还是会出现有些网站打不开的方式。

更好的方式是使用 [Proxifier](https://www.proxifier.com/)， 国外 IP 都走代理。参照 [Proxifier 安装](https://github.com/jinntrance/ChinaDNS#install) `Mac` 一节。 同时也可使用 Proxifier 屏蔽广告，可使用[广告域名列表](https://github.com/jinntrance/hosts_to_block/blob/master/full_hosts)。

[^Encrypt Method]: https://github.com/shadowsocks/luci-app-shadowsocks/wiki/Bandwidth-of-encrypt-method

