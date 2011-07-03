var highlight_color = '#ddd';
var urls = {};

urls.max = 10;

urls.more = function() {
	if (urls.form.getElements('p.url').length >= urls.max ) {
    return;
  }
	var lastUrl = urls.form.getLast('p.url');
	lastUrl.clone().inject(lastUrl, 'after').getFirst('input').set('value', 'http://').addEvents(urls.events).focus();
};

urls.less = function(_input) {
	if (urls.form.getElements('p.url').length > 1) {
		_input.getParent().dispose();
		urls.form.getLast('p.url input').focus();
	} else {
		_input.highlight(highlight_color)
	}
};

urls.events = {
	keyup: function(ev) {
		if (ev.key == 'enter' && ev.target.value.trim() != '') {
			urls.more();
		} else if (ev.key == 'backspace' && ev.target.value.trim() == '') {
			urls.less(ev.target);
		}
	}
};

urls.submit = function() {
	urls.form.set('send', {
		onSuccess: function(_res) {
			$('content-1').set('html','<p><a href="/" class="button">Once again?</a></p>')
        .getParent('div.content-floor').removeClass('content-floor-active');
			$('content-2').set('html', _res).getParent('div.content-floor').addClass('content-floor-active');
		}
	});
	urls.form.send();
};

window.addEvent('domready', function() {

	if (urls.form = $('content-1').getElement('form')) {
    
		urls.form.getElements('p.url input').addEvents(urls.events);
		$('done').addEvent('click', function(ev) {
			ev.stop();

      var m = urls.form.getElement('input[name=mail]');
      var u = urls.form.getElements('p.url input');

      if(!u.some(function(_u){return (_u.value.trim() != '' && _u.value.trim() != 'http://') })) {
        u[0].highlight(highlight_color);
      } else if(!m.value.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        m.highlight(highlight_color);
      } else {
        $('done').getParent('p').set('html','<img src="/spinner.gif" />');
        urls.submit();
      }
		})
	}

})

