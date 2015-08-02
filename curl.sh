find  _site | sed 's/_site/http:\/\/blog.josephjctang.com/g' | grep "ml$" | sed 's/index.html//g'  | tail -n 500 > url.txt
curl -H 'Content-Type:text/plain' --data-binary @url.txt "http://data.zz.baidu.com/urls?site=blog.josephjctang.com&token=q75fN10vbLmfLVFg"
