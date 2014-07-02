window.onload = function(){
    
	var list = document.querySelectorAll('script[type="text/canadian"]');

	for(var i = 0; i < list.length; i++){
		var inner = list[i].innerHTML;
		inner = inner.replace(/\t/g, '').split('\n');
		var variables = '';
		var script = '';
		for(var e = 0; e < inner.length; e++){
			if(inner[e].match(/.*=.* eh\?/)){
				var varname = inner[e].match(/.+=/)[0].replace(/ |=/g,'');
				var t = varname+' = '+inner[e].match(/=.+ /)[0].replace(/ |=/g,'')+';\n';
				if(variables.contains(varname)){
					script+=t;
				}else{
					variables+=varname+' ';
					script+='var '+t;
				}
			}else if(inner[e].match(/whadda'yat .+\?/)){
				var t = 'console.log('+inner[e].match(/ .+\?/)[0].replace(/ |\?/g,'')+');\n';
				script += t;
			}else if(inner[e].match(/oot '.+ aboot .+/)){
				console.log(inner[e].match(/'.+ a/)[0]);
				var varname = inner[e].match(/'.+ a/)[0].replace(/'| |a/g, '');
				var t = 'for('+varname+' = 0; '+varname+' < '+inner[e].match(/boot .+/)[0].replace(/b|o|t| /g,'')+'; '+varname+'++){\n';
				script += t;
			}else if(inner[e].match(/sorry/)){
				script += '}\n'
			}
		}
		console.log(script);
		eval(script);
	}
}
