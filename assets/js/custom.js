 $(function(){
  $('.entry-content a').attr('target','_blank'); 
  var headers = $('.entry-content :header').map(function (idx, h){
    var a = $('<a href="#">');
    a.attr('data-id',h.id);
    a.attr('href', '#' + h.id);
    a.attr('class', h.nodeName.toLowerCase());
    a.html(h.textContent)
    return $('<li>').append(a)[0].outerHTML;
  }).toArray().join("");
  $('body').append($('<div id="headers">').html($('<ul>').append(headers)));
  $('#headers a').click(function (){
    console.info("scrollTo #" + $(this).attr('data-id'));
    //$('#'+$(this).attr('data-id')).scrollTo(600);
  })
 })
