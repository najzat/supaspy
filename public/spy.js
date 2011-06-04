
  window.addEvent('domready',function(){
		if($('spy')) {

			var linksVisited = [];
			$$('#spy a').each(function(_link,_index){
				if(_link.getStyle('color') == '#fffffe') {
					linksVisited.push(_index);
				}
				_link.dispose();
			})

			new Request({
				'url' : '/spy/'+document.title,
				'method' : 'post',
				'data' : 'visited=' + linksVisited.join(','),
				'onSuccess' : function() { window.parent.$$('iframe')[0].dispose(); }
			}).send();
			
		}
  })

