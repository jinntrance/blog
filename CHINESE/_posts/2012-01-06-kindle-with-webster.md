---
layout: post
title: kindle之多看webster词典修成记
tags: [KINDLE, LINUX]
date: 2012-01-06T19:02:27+0800

---

有了kindle，常用“[多看][Link 1]”看书、看paper。一直苦于多看下没有像样的英英字典。索性自己整理了用得着的英英、法法字典，以慰己操之计算机业。这里的两字典 [Merriam Webster Collegiate][] 或 [Dictionnaire de l’Académie française][Dictionnaire de l_Acad_mie fran_aise] 若需要，下载解压将ifo、idx、dict文件放到多看DK\_System下某一个叫dict的文件夹即可使用。

后面为整理过程，有意整理其他字典的如法炮制。

1.  上 [http://xdxf.revdanica.com/down/index.php][http_xdxf.revdanica.com_down_index.php]  找字典，符合startdict格式的均可（这些字典可以用，但里面的xml tag是多看上无法解析的，显得很凌乱），下载并解压得ifo、idx、dict.dz仨文件，再将dict.dz用7z解压为dict文件。
2.  用linux下的stardict-editor去decompile对应字典的ifo文件得一个txt把这个txt改名成你乐意的任何名字如“Merriam Webster Collegiate”的名字，因为这个会是多看里显示的字典名。
3.  主要是去掉或替換字典文件里面的诸如`<k></k>`、`&apos;`等。vi编辑那个txt文件，vi中用正則“**`<.\{-}>`**”表示最近的倆<、>之內的匹配。  
    vi中，使用“:%s/A/B/g”即替换所有A字符串为B字符串。可参照[Substitude Command][]。
     *  去除尖括号内容 :
        
            :%s/<.\{-}>//g
        
        替換特殊符号（參照 [Special Entities][] ）例将("-->",&-->&)(其中&代表前面正则匹配的全部內容，需用\\&转义，可用“/&\\.\{-\};”搜索看是否还有未替换的特殊符号)：
        
            :%s/"/"/g
            :%s/&/\&/g
4.  用stardict-editor去compile刚刚编辑的txt文件，所得ifo、idx、dict文件放到多看DK\_System下某一个叫dict的文件夹即可使用。


[Link 1]: http://www.duokan.com/
[Merriam Webster Collegiate]: http://dl.dropbox.com/u/6019028/dictionaries/Merriam-Webster%27s%20Collegiate%C2%AE%20Dictionary.zip
[Dictionnaire de l_Acad_mie fran_aise]: http://dl.dropbox.com/u/6019028/dictionaries/Dictionnaire%20de%20l%E2%80%99Acad%C3%A9mie%20fran%C3%A7aise%2C%208%C3%A8me%20%C3%A9dition%20%281935%29.zip
[http_xdxf.revdanica.com_down_index.php]: http://xdxf.revdanica.com/down/index.php
[Substitude Command]: http://vimregex.com/#substitute
[Special Entities]: http://htmlhelp.com/reference/html40/entities/special.html