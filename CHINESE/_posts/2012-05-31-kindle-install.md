---
layout: post
title: 【kindle上“多看”安装失败后，另类安装方法】
tags: [KINDLE, TECHNICAL]
date: 2012-05-29T00:40:20+0800

---

“多看”的安装教程还是比较简单明了的了。不过，要是你将Kindle原生系统[jailbreak][]过(详情点击前面链接），不能正常安裝多看，却可以安装jailbreak后的屏保、字体等。可以试试下面的方法安装多看。

1. 确定jailbreak过，安装[launchpad][]，成功后会重启。

2. 下载多看最新系统压缩包，解压后将DK\_System文件夹拷至kindle根目录。

3. 成功安装launchpad后，kindle根目录下有launchpad文件夹，进去后找到servicecmds.ini文件，在文件末尾添加`Shift L = !sh /mnt/us/DK_System/install/DuoKanInstallK4.sh &`（注意能要在`DK_System`文件夹下找到liteinstall.sh这个文件，后续版本可能变动名字。）

4. **重启后**，在home界面按shift、shift、L ，若屏幕下端显示“Success”,表示已执行安装脚本，可以扔那儿先不管它，安装多看成功后就会自动重启完成余下步骤。


PS：补遗，解读`Shift L = !sh /mnt/us/DK_System/install/DuoKanInstallK4.sh &`：  


Shift L，是快捷键，大写L需要shift+l，所以最后有俩shift；

因kindle系统还是linux文件结构，并采用java开发。!sh即表示执行shell脚本，&表示后台运行。

多看安装过程也是执行shell脚本安装的，DK\_System/install/即为安装、卸载是所需脚本。而我们平常见着的kindle盘都是挂载在/mnt/us/下的， `/mnt/us/DK_System/install/DuoKanInstallK4.sh`即告诉kindle系统执行脚本位置。


[jailbreak]: http://www.mobileread.com/forums/showthread.php?t=88004
[launchpad]: http://www.mobileread.com/forums/showthread.php?t=97636