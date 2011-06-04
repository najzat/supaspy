
  var urls = {};

  urls.more = function(){
    var li = ($$('#urls li')[0].clone())
    .inject($$('#urls ul')[0]);
    
    li.getFirst('input')
    .set('value','http://')
    .addEvents(urls.events)
    .focus();

  };

  urls.less = function(_input) {
    if($$('#urls li').length > 1) {
      _input.getParent().dispose();
      $$('#urls ul input').pop().focus();
    } else {
      _input.highlight()
    }
  };

  urls.events = {
    keyup : function(ev){
      if(ev.key=='enter' && ev.target.value.trim()!='') {
        urls.more();
      } else if(ev.key=='backspace' && ev.target.value.trim()=='') {
        urls.less(ev.target);
      }
    }
  };

  urls.submit = function(){
    $('urls').set('send',{onSuccess:function(_res){$('spyset').set('html',_res)}});
    $('urls').send();
  };

  window.addEvent('domready',function(){

		if($('urls')) {
			$$('#urls ul input')[0].addEvents(urls.events)

			$$('#urls a')[0].addEvents({
				'click' : function(ev){
					ev.stop();
					urls.submit();
				 }
			})
		}
  })

