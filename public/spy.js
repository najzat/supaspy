
  window.addEvent('domready',function(){

			var linksToSave  = [],
			    linksToShow  = [],
			    linksHtml    = $('spy').get('html');

			$$('#spy p').each(function(_p,_linksIndex){

        var visited = false;
        _p.getElements('a').each(function(_a, _index) {

          if(visited) return;
          
          if(_a.getStyle('color') == '#fffffe') {
            linksToSave.push(_linksIndex);
            linksToShow[_linksIndex] = _a;
            visited = true;
            return;
          }

          if(_index == 0) {
            linksToShow[_linksIndex] = _a;
          }

        })
			})

      $('spy').empty().adopt(linksToShow);

			new Request({
				'url' : '/spy/'+document.title,
				'method' : 'post',
				'data' : 'visited=' + linksToSave.join(','),
				'onSuccess' : function() { 
          //alert(linksHtml);
          //window.parent.$('results').grab(linksToShow);
          window.parent.document.getElementById('results').innerHTML = $('spy').innerHTML;

          window.parent.$$('iframe')[0].dispose(); 
        }
			}).send();
			
  })

