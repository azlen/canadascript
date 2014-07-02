window.onload = function(){
    
	var list = document.querySelectorAll('script[type="text/canadian"]');

	for(var i = 0; i < list.length; i++){
		var inner = list[i].innerHTML;
		inner = inner.replace(/\t/g, '').split('\n');
		var variables = '';
		var script = '';
		for(var e = 0; e < inner.length; e++){
			if(inner[e].match(/.*=.* eh\?/)){
				//CREATES VARIABLE
				//bacon = 'hello world' eh?

				//var bacon = 'hello world';

				var varname = inner[e].match(/^[\w-]+/)[0]
				var t = varname+' = '+inner[e].match(/'.*'/)+';\n'; //FIX THIS... VARIABLES CURRENTLY ONLY CAN BE STRINGS
				if(variables.indexOf(varname) != -1){
					script+=t;
				}else{
					variables+=varname+' ';
					script+='var '+t;
				}
			}else if(inner[e].match(/whadda'yat .+\?/)){
				//CONSOLE LOG
				// whadda'yat bacon?

				// console.log(bacon);

				var t = 'console.log('+inner[e].match(/ [\w-]+.*\?/)[0].match(/[a-zA-Z0-9'].*/)[0].slice(0, - 1)+');\n';
				script += t;
			}else if(inner[e].match(/oot '.+ aboot .+:/)){
				var varname = inner[e].match(/'[\w-]+/)[0].match(/[\w-]+$/)[0];
				var t = 'for('+varname+' = 0; '+varname+' < '+inner[e].match(/[\w-]+:$/)[0].slice(0, - 1)+'; '+varname+'++){\n';
				script += t;
			}else if(inner[e].match(/sorry/)){
				//CLOSES FUNCTIONS, FORS, IFS, ETC..
				// sorry

				// }

				script += '}\n'
			}else if(inner[e].match(/O .+, .+:/)){
				//CREATES FUNCTION
				// O Canada, our home and native land:

				// function Canada(our, home, and native land){

				var t = 'function '+inner[e].match(/\s+[^\s]+/)[0].match(/[\w-]+/)[0]+'('+inner[e].match(/, .+:/)[0].match(/[a-zA-Z0-9][a-zA-Z0-9 ]+/)[0].split(' ').join(', ')+'){\n';
				script += t;
			}else if(inner[e].match(/O .+:/)){
				//CREATES FUNCTION
				// O Canada:

				// function Canada(){

				var t = 'function '+inner[e].match(/\s+[^\s]+/)[0].match(/[\w-]+/)[0]+'(){\n';
				script += t;
			}else if(inner[e].match(/O .+, .+[.|!]/)){
				//CALLS FUNCTION
				// O Canada, our home and native land!
				// O Canada, our home and native land.

				// Canada(our, home, and, native, land);

				var t = inner[e].match(/\s+[^\s]+/)[0].match(/[\w-]+/)[0]+'('+inner[e].match(/, .+[.|!]/)[0].match(/[a-zA-Z0-9'][a-zA-Z0-9 ']*/)[0].split(' ').join(', ')+');\n';
				script += t;
			}else if(inner[e].match(/O .+[.|!]/)){
				//CALLS FUNCTION
				// O Canada!
				// O Canada.

				// Canada();

				var t = inner[e].match(/\s+[^\s]+/)[0].match(/[\w-]+/)[0]+'();\n';
				script += t;
			}
		}
		//console.log(script);
		eval(script);
	}
}
