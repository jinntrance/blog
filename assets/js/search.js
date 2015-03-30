---
layout: null
---
   function str_sim (a, b) {
    	if (!a || !b || a.length ==0 || b.length ==0 ) {
    		return 0.0
    	}
    	a = a.toUpperCase()
    	b = b.toUpperCase()
    	if (a.indexOf(b)>=0 || b.indexOf(a)>=0) {
    		return 1.0;
    	}
    	var min = a.length>b.length ? b.length: a.length
    	var intersect = 0.0
    	for(var i = 0; i < a.length - 1; i++ ){
    		for(var j = 0; j < b.length - 1 ; j++ )
    			if (a.substr(i,2) == b.substr(j,2))
    				intersect +=1
    	}
    	return intersect / min;
    }
    $(function(){
    	var today = "{{ site.time | date: "%Y%d" }}"
    	var feed_url = "{{ site.url }}/feed.json?date=" + today
    	var query_search = window.location.search.split('&').filter(function(arg) {
    		return arg.indexOf('q=') >= 0;
    	})[0]
    	if( query_search ) {
    	  var query = decodeURI(query_search.split('=')[1])
    	  $.getJSON(feed_url, function(posts) {
    		$.each(posts,function(idx, post) {
    			if( str_sim (query, post.title) >= 0.9 ){
    				var li='<li class="entry-title"><a href="' + post.url +'">' + post.title+ '</a></li>'
    				$('#search-ul').append(li)
    			}
    		})
    		switch($('#search-ul li').size()){
    			case 0 : window.location.href="{{site.url}}/posts/"
    			case 1 : $('#search-ul li a')[0].click();
    			default: 
    		}
    	})
    	}

    })
