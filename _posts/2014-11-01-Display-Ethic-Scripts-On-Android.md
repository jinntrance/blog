---
layout: post
title: 如何让Android显示及输入各小语种如藏蒙满维缅？
---


## 缘起

- [知乎：如何在電腦或手機的系統/瀏覽器上同時正確顯示 Unicode 的多語種文字？](http://www.zhihu.com/question/25162041/answer/30223818)
- [polyhedron微博: 有沒有顯示各種文字都能按該文字最常見的字體正常顯示的字體？](http://weibo.com/1180557177/BlLDihBBB?type=comment)

正如知乎上“梁海”所说，Android也就使用的fallback方案。毕竟就算支持所有Unicode文字的字体存在，也不能保证每个字体的美观及后续维护。而且计算机上目前单字体文件也有字数上限65535$$(2^{16})$$。

言归正传，Android上首先会默认使用系统配置字体(`/system/etc/system_fonts.xml`)。当系统配置的字体无法解析一些字后就会使用fallback list(默认`/system/etc/fallback_fonts.xml`)中的字体，并且按照顺序依次地使用相应的字体解码显示。具体操作步骤如后：


## 资料准备

1. [Root](http://www.shuame.com/root/) 并装上[RE文件管理器](http://www.wandoujia.com/apps/com.speedsoftware.rootexplorer) 
    
2. 准备Android上使用的[字体](http://pan.baidu.com/s/1dDvkoKx)，下载解压，使用RE文件管理器将需要的字体（这个压缩包是包含近90个字体，30+ scripts，200+ languages，可参考此处找到[对应字体](http://www.babelstone.co.uk/Unicode/FontList.html)）拷贝至手机的`/system/fonts`下。并长按字体文件，弹出操作项后，将权限改成对所有人可读 ，同时所有者和群组都改成root。<img id="5D4DCB7CF3248606C58F9DAA206CA668" src="http://m1.img.srcdd.com/farm5/d/2014/1103/23/5D4DCB7CF3248606C58F9DAA206CA668_B500_900_500_888.jpeg" />

## 字体配置修改
 
   
3. 可以直接使用RE文件管理器修改`/system/etc/fallback_fonts.xml`中的配置。如后添加所需字体的配置（这里添加了中国及南亚等字体，因为Android默认是支持显示阿拉伯语和梵文的，也就没有将对应的字体加到下面配置里）。并且需要置于DroidSansFallback.ttf的配置前，不然将不能正常显示排在DroidSansFallback.ttf之后的字体。
{% highlight xml%}
<family>
    <fileset>
    <file>NotoSansMyanmar-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansMongolian-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansYi-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>Qomolangma-UchenSarchung.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansKhmer-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>MiaoUnicode-Regular.ttf</file>
    </fileset>
</family>
{% endhighlight %}
4. 或者使用这个[配置文件](http://pan.baidu.com/s/1mgGAKzQ)，并拷贝merge到`/system/vendor/etc/fallback_fonts.xml`中。 其内容如后。 其中第一个family加了order=0（计算机中的1），意思就是最后的fallback list，先由`/system/etc/fallback_fonts.xml`顺序生成，然后将`/system/vendor/etc/fallback_fonts.xml`中所有的fonts， 从fallback list中的第1个位置插入。 order也可以改成其他数字，但要保证插入DroidSansFallback.ttf所在位置的之前。
{% highlight xml%}
<?xml version="1.0" encoding="utf-8"?>
<familyset>
<family order="0">
    <fileset>
    <file>NotoSans-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansMyanmar-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansMongolian-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansYi-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>Qomolangma-UchenSarchung.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>NotoSansKhmer-Regular.ttf</file>
    </fileset>
</family>
<family>
    <fileset>
    <file>MiaoUnicode-Regular.ttf</file>
    </fileset>
</family>
</familyset>
{% endhighlight %}

## 使用与测试

5. 安装相应输入法
	- [触宝国际版](http://www.coolapk.com/apk/com.cootek.smartinputv5)    [TouchalPal X Keyboard](https://play.google.com/store/apps/details?id=com.cootek.smartinputv5)
	- [Multiling O Keyboard](https://play.google.com/store/apps/details?id=kl.ime.oh)
    
6. 最后测试一下手机能否正常显示相关的字吧

> 國際音標tɕi̯ᴀ˥˥  維吾爾 ئۇيغۇرچە 藏བོད་སྐད།  緬မြန်  彝ꑳ  滿ᠰᠠᡳᠨ 蒙 ᠮᠤᠩᠭᠤᠯ 泰ไทย  梵संस्कृत  希臘ἄ Punjabi ਪੰਜਾਬੀ پنجابى Arabic العربية Telugu తెలుగు Sundanese ᮘᮞ ᮞᮥᮔ᮪ᮓ Oriya ଓଡ଼ିଆ Khmer ភាសាខ្មែរ Canadian Aboriginal Syllabics ᓀᐦᐃᔭᐍᐏᐣ Cherokee ᎠᏂᏴᏫᏯ Coptic ⲙⲛⲧⲣⲙⲛⲕⲏⲙⲉ Deseret 𐐔𐐯𐑅𐐨𐑉𐐯𐐻 𐐈𐑊𐑁𐐩𐐺𐐯𐐻 Ethiopic ኢትዮጵያ Old Persian cuneiform 𐎣𐎲𐎢𐎪𐎡𐎹 Balinese ᬩᬮᬶ᭞᭑᭞ᬚᬸᬮᬶ᭞᭑᭙᭘᭒᭟ Javanese ꧋ꦱꦸꦒꦼꦁꦫꦮꦸꦃꦮꦺꦴꦤ꧀ꦠꦼꦤ꧀ꦲꦶꦁꦮꦶꦏꦶꦥꦺꦝꦶꦪꦃꦗꦮꦶ꧉

    
<img id="D3215E9CEA642FEF0F4B55B5F42BD73A" src="http://m3.img.srcdd.com/farm5/d/2014/1103/23/D3215E9CEA642FEF0F4B55B5F42BD73A_B500_900_500_888.jpeg" />
    
## 字体使用情况

* [Google Noto](http://www.google.com/get/noto/)
* 藏文字体：[Yalasoo Tibetan Font Software Book Music](http://www.yalasoo.com/English/docs/yalasoo_en_font.html)
* 苗语字体：[phjamr/MiaoUnicode · GitHub](https://github.com/phjamr/MiaoUnicode)

