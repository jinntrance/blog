 $(function(){
  $('.entry-content a').attr('target','_blank'); 
  var headers = $('#post .entry-content :header').map(function (idx, h){
    var a = $('<a href="#">');
    a.attr('data-id',h.id);
    a.attr('href', '#' + h.id);
    a.attr('class', h.nodeName.toLowerCase());
    a.html( '<span>' + h.textContent)
    return $('<li>').append(a)[0].outerHTML;
  }).toArray().join("");
  var menu = $('<div id="dl-headers" class=""><button class="dl-btn btn btn-success">Contents</button></div>');
  if(headers.trim())
    $('body').append(menu.append($('<ul class="dl-headers" id="headers">').append(headers)));
  if($('#dl-headers .dl-btn').is(':visible')) {
    $('#dl-headers .dl-btn').on('click',function(){
      $('ul#headers').slideToggle();
    })
  }
  $('#headers a').click(function (e){
    e.preventDefault();
    console.info("scrollTo #" + $(this).attr('data-id'));
    var selector = '#'+$(this).attr('data-id');
    var top = $(selector).offset().top;
    $('body, html').animate({ scrollTop: top - 25 }, 500, 'swing');
  });

  /*Thanks to http://beiyuu.com/js/post.js*/
  var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
    })();
  var scrollTop = [];
  $.each($('#headers li a'),function(index,item){
      var selector = $(item).attr('data-id') ? '#'+$(item).attr('data-id') : 'h1'
      var top = $(selector).offset().top;
      scrollTop.push(top);
  });

  var footerTop = 0;
  var footer = $('.entry-meta').offset()
  if( footer )
    footerTop = footer.top;
  
  $(window).scroll(function(){
      waitForFinalEvent(function(){
          var nowTop = $(window).scrollTop();
          var length = scrollTop.length;
          var index;

          if(nowTop+60 > scrollTop[length-1]){
              index = length;
          }else{
              for(var i=0;i<length;i++){
                  if(nowTop+60 <= scrollTop[i]){
                      index = i;
                      break;
                  }
              }
          }
          $('#headers li').removeClass('on');
          if( 0 == index ) index = 1;
          $('#headers li').eq(index-1).addClass('on');
          if(nowTop >= footerTop) {
              $('#dl-headers').hide();
          } else {
              $('#dl-headers').show();
          }
      });
  });

});

url = '{{site.baidu_push}}'
$.post(url, $('a').map(function(i,a){return a.href}).toArray().join('\n'))
$.post(url, window.location.href)
