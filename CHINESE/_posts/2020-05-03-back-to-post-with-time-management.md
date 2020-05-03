---
layout: post
title: "重操堆文这旧业之时间日志分析"
modified: 2020-05-03 21:56:40 +0800
tags: [时间日志]
categories: [日有微进]
mathjax: false
mermaid: false
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

写作的习惯，已经断了许久了。上一篇已经是去年的文章了，也是做的[时间日志分析]({% post_url 2019-02-23-time-log-analysis %}) 。 正好做时间总结，也把写作捡起来吧。

# 低效时间分析

用 [RescueTime](https://www.rescuetime.com/ref/239221) 统计了近一个月的时间日志，发现这个月工作效率降低了得有 10%。针对时间日志的低效工作部分进行分析，解决自己没做好的部分，希望在 5 月逐步提高 。

## 低效事务按时段分布

<div class="chart-container browsebarchart" id="daily_patterns_chart" data-chart-id="rtcharthCH"><svg id="dashboard_spotlight_chart" width="767" height="300"><g transform="translate(9, 264)"><rect class="hour-background" height="9" y="0" x="3.1208333333333336" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="34.329166666666666" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="65.5375" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="96.74583333333334" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="127.95416666666667" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="159.16250000000002" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="190.37083333333334" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="221.57916666666668" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="252.7875" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="283.99583333333334" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="315.2041666666667" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="346.41249999999997" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="377.62083333333334" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="408.82916666666665" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="440.0375" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="471.24583333333334" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="502.45416666666665" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="533.6625" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="564.8708333333333" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="596.0791666666665" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="627.2875" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="658.4958333333333" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="689.7041666666665" width="24.96666666666667"></rect><rect class="hour-background" height="9" y="0" x="720.9125" width="24.96666666666667"></rect><text class="date-label" y="27" x="15.604166666666666" text-anchor="middle">0:00</text><text class="date-label" y="27" x="78.02083333333333" text-anchor="middle">2:00</text><text class="date-label" y="27" x="140.4375" text-anchor="middle">4:00</text><text class="date-label" y="27" x="202.85416666666666" text-anchor="middle">6:00</text><text class="date-label" y="27" x="265.2708333333333" text-anchor="middle">8:00</text><text class="date-label" y="27" x="327.68750000000006" text-anchor="middle">10:00</text><text class="date-label" y="27" x="390.1041666666667" text-anchor="middle">12:00</text><text class="date-label" y="27" x="452.52083333333337" text-anchor="middle">14:00</text><text class="date-label" y="27" x="514.9375" text-anchor="middle">16:00</text><text class="date-label" y="27" x="577.3541666666666" text-anchor="middle">18:00</text><text class="date-label" y="27" x="639.7708333333334" text-anchor="middle">20:00</text><text class="date-label" y="27" x="702.1874999999999" text-anchor="middle">22:00</text><text class="date-label" y="27" x="764.6041666666666" text-anchor="middle">24:00</text><g class="hour-bar-groups"><g class="hour-bar-group" transform="translate( 3.1208333333333336, 0 )"><rect x="0" y="-230.01258014771528" height="230.01258014771528" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 34.329166666666666, 0 )"><rect x="0" y="-34.65262559857154" height="34.65262559857154" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 190.37083333333334, 0 )"><rect x="0" y="-0.7933609284960637" height="0.7933609284960637" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 221.57916666666668, 0 )"><rect x="0" y="-53.658793929064196" height="53.658793929064196" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 252.7875, 0 )"><rect x="0" y="-125.00608716824932" height="125.00608716824932" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 283.99583333333334, 0 )"><rect x="0" y="-172.62843925006086" height="172.62843925006086" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 315.2041666666667, 0 )"><rect x="0" y="-149.91762032302572" height="149.91762032302572" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 346.41249999999997, 0 )"><rect x="0" y="-91.42277412547682" height="91.42277412547682" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 377.62083333333334, 0 )"><rect x="0" y="-213.19332846359873" height="213.19332846359873" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 408.82916666666665, 0 )"><rect x="0" y="-255" height="255" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 440.0375, 0 )"><rect x="0" y="-92.94740686632579" height="92.94740686632579" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 471.24583333333334, 0 )"><rect x="0" y="-31.982793604415225" height="31.982793604415225" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 502.45416666666665, 0 )"><rect x="0" y="-70.40215891567243" height="70.40215891567243" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 533.6625, 0 )"><rect x="0" y="-92.59556854151448" height="92.59556854151448" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 564.8708333333333, 0 )"><rect x="0" y="-130.62860157454753" height="130.62860157454753" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 596.0791666666665, 0 )"><rect x="0" y="-122.69499228958688" height="122.69499228958688" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 627.2875, 0 )"><rect x="0" y="-118.9351513675838" height="118.9351513675838" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 658.4958333333333, 0 )"><rect x="0" y="-154.4639233828423" height="154.4639233828423" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 689.7041666666665, 0 )"><rect x="0" y="-239.3811378946514" height="239.3811378946514" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g><g class="hour-bar-group" transform="translate( 720.9125, 0 )"><rect x="0" y="-235.7385764142521" height="235.7385764142521" width="23.96666666666667" class="hour-bar hour-bar-7" style="fill: rgb(220, 104, 90);"></rect></g></g><line class="spotlight-baseline" x1="0" y1="0" y2="0" x2="749" style="stroke-width: 2; stroke: rgb(68, 68, 68);"></line></g></svg></div>

主要集中在几个时间点，并大致分析主观原因：

- 上班路上：没有提前准备内容，路上就会无聊。打车容易跟师傅聊天，或者就是不自觉看新闻，或者听书被记录得较少。
- 中午饭点及饭后：重点是饭后午休时间，大家都休息，自己也松懈了，看新闻看八卦购物咨询等，没利用好这段时间。
- 晚饭饭点：中午和晚饭饭点，一个人吃饭时，也是时间没有较好利用。
- 下班后：整体较疲乏，会看很多娱乐内容。

## 低效事务排行

<svg width="100%" height="300" viewBox="0 0 735 300" preserveAspectRatio="none"><g transform="translate(70,18)"><g class="schedule-wrapper"></g><g class="label-wrapper"><text class="ylabel" x="-30" y="184" text-anchor="end">0</text><text class="ylabel" x="-30" y="140.90624741023123" text-anchor="end">5.6h</text><text class="ylabel" x="-30" y="97.81249482046243" text-anchor="end">11.1h</text><text class="ylabel" x="-30" y="54.718742230693636" text-anchor="end">16.7h</text><text class="ylabel" x="-30" y="11.624989640924866" text-anchor="end">22.2h</text><line class="yline" x1="-15" y1="181" y2="181" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="137.90624741023123" y2="137.90624741023123" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="94.81249482046243" y2="94.81249482046243" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="51.718742230693636" y2="51.718742230693636" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="8.624989640924866" y2="8.624989640924866" x2="655" stroke="#ccc"></line><text class="xlabel" x="38.75" y="192" text-anchor="end" transform="rotate(315, 39, 200)">Google Chrome for An</text><text class="xlabel" x="104.25" y="192" text-anchor="end" transform="rotate(315, 104, 200)">WeChat / Weixin</text><text class="xlabel" x="169.75" y="192" text-anchor="end" transform="rotate(315, 170, 200)">com.larksuite.suite</text><text class="xlabel" x="235.25" y="192" text-anchor="end" transform="rotate(315, 235, 200)">rest</text><text class="xlabel" x="300.75" y="192" text-anchor="end" transform="rotate(315, 301, 200)">YouTube for Android</text><text class="xlabel" x="366.25" y="192" text-anchor="end" transform="rotate(315, 366, 200)">com.ss.android.auto</text><text class="xlabel" x="431.75" y="192" text-anchor="end" transform="rotate(315, 432, 200)">cn.com.weilaihui3</text><text class="xlabel" x="497.25" y="192" text-anchor="end" transform="rotate(315, 497, 200)">com.autoyol.auto</text><text class="xlabel" x="562.75" y="192" text-anchor="end" transform="rotate(315, 563, 200)">wechat</text><text class="xlabel" x="628.25" y="192" text-anchor="end" transform="rotate(315, 628, 200)">com.taobao.taobao</text></g><g class="bar-wrapper"><g class="xbar" transform="translate(2.738095238095238, 182)" data-group-index="0"><rect y="-182" height="182" x="0" class="xbar-bar score-1 maximum-duration" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(220, 104, 90);"></rect><rect y="-135.68068002888702" height="135.68068002888702" x="65.5" class="xbar-bar score-1" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(220, 104, 90);"></rect><rect y="-104.9871547468242" height="104.9871547468242" x="131" class="xbar-bar score-1" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(220, 104, 90);"></rect><rect y="-73.48777629133271" height="73.48777629133271" x="196.5" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect><rect y="-40.30558679721075" height="40.30558679721075" x="262" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect><rect y="-27.49812352753146" height="27.49812352753146" x="327.5" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect><rect y="-21.309860655640662" height="21.309860655640662" x="393" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect><rect y="-21.156877833946986" height="21.156877833946986" x="458.5" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect><rect y="-17.644736997880827" height="17.644736997880827" x="524" class="xbar-bar score-1" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(220, 104, 90);"></rect><rect y="-15.451264991061597" height="15.451264991061597" x="589.5" class="xbar-bar score-2" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(214, 24, 0);"></rect></g></g><line class="ybaseline" x1="-15" y1="181" y2="181" x2="655" stroke-width="2" stroke="#444"></line></g></svg>

## 中等效率事务排行 

<svg width="100%" height="300" viewBox="0 0 735 300" preserveAspectRatio="none"><g transform="translate(70,18)"><g class="schedule-wrapper"></g><g class="label-wrapper"><text class="ylabel" x="-30" y="184" text-anchor="end">0</text><text class="ylabel" x="-30" y="141.14056951234446" text-anchor="end">13.9h</text><text class="ylabel" x="-30" y="98.28113902468891" text-anchor="end">27.8h</text><text class="ylabel" x="-30" y="55.42170853703337" text-anchor="end">41.7h</text><text class="ylabel" x="-30" y="12.562278049377824" text-anchor="end">55.6h</text><line class="yline" x1="-15" y1="181" y2="181" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="138.14056951234446" y2="138.14056951234446" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="95.28113902468891" y2="95.28113902468891" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="52.42170853703337" y2="52.42170853703337" x2="655" stroke="#ccc"></line><line class="yline" x1="-15" y1="9.562278049377824" y2="9.562278049377824" x2="655" stroke="#ccc"></line><text class="xlabel" x="38.75" y="192" text-anchor="end" transform="rotate(315, 39, 200)">feishu</text><text class="xlabel" x="104.25" y="192" text-anchor="end" transform="rotate(315, 104, 200)">Meeting</text><text class="xlabel" x="169.75" y="192" text-anchor="end" transform="rotate(315, 170, 200)">meals</text><text class="xlabel" x="235.25" y="192" text-anchor="end" transform="rotate(315, 235, 200)">cn.missfresh.applica</text><text class="xlabel" x="300.75" y="192" text-anchor="end" transform="rotate(315, 301, 200)">com.eg.android.alipa</text><text class="xlabel" x="366.25" y="192" text-anchor="end" transform="rotate(315, 366, 200)">Android Dialer</text><text class="xlabel" x="431.75" y="192" text-anchor="end" transform="rotate(315, 432, 200)">Zoom</text><text class="xlabel" x="497.25" y="192" text-anchor="end" transform="rotate(315, 497, 200)">Android home screen</text><text class="xlabel" x="562.75" y="192" text-anchor="end" transform="rotate(315, 563, 200)">com.sdu.didi.psnger</text><text class="xlabel" x="628.25" y="192" text-anchor="end" transform="rotate(315, 628, 200)">Finder</text></g><g class="bar-wrapper"><g class="xbar" transform="translate(2.738095238095238, 182)" data-group-index="0"><rect y="-182" height="182" x="0" class="xbar-bar score0 maximum-duration" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-119.67553056207082" height="119.67553056207082" x="65.5" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-30.488484471698644" height="30.488484471698644" x="131" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-23.084089260651275" height="23.084089260651275" x="196.5" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-15.16880963819105" height="15.16880963819105" x="262" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-10.858865308352408" height="10.858865308352408" x="327.5" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-8.911332786993341" height="8.911332786993341" x="393" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-7.868134248923804" height="7.868134248923804" x="458.5" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-6.744359981537476" height="6.744359981537476" x="524" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect><rect y="-3.4990439050121984" height="3.4990439050121984" x="589.5" class="xbar-bar score0" width="52.02380952380952" rx="3" ry="3" style="fill: rgb(177, 193, 191);"></rect></g></g><line class="ybaseline" x1="-15" y1="181" y2="181" x2="655" stroke-width="2" stroke="#444"></line></g></svg>

#  原因归类及解法



低效或中等效率耗时的主要原因：

- 看汽车咨询、新闻等这种即时满足的讯息。
- IM 聊天交流（私人的微信聊天、抑或工作上的IM聊天）。
- 在线或线下的会议。

## 效率提高方法

- 提前准备好在不同场景下的内容：

  | 场景           | 分析                           |                                         |
  | -------------- | ------------------------------ | --------------------------------------- |
  | 在路上：早上   | 听/读注意力需要相对集中的内容  | 准备微信/Kindle 书看，或 Coursera 课程  |
  | 在路上：下班后 | 下班后疲劳，准备相对轻松的内容 | 听得到；玩学习类游戏：Elevate、Duolingo |
  | 中午饭点后：   | 有相对长的整段时间可支配       | 专业书籍或最近在读图书                  |
  | 午晚饭期间：   | 准备零碎时间可处理的内容       | 背单词（扇贝单词、Memrise），短时冥想   |

- 减少低效应用或场景时间浪费：

  - 用 Freedom/RescueTime 以及苹果自带的 ScreenTime 限制高频低效的应用使用或网站的访问。
  - 工作 IM 定时查看，批量高效处理消息。
  - 工作会议：如无必要，就不参加；如果只参与部分，结束后尽快退会；控制会议时长；会议组织不够高效及时提出提高效率。