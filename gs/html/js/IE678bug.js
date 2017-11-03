// JavaScript Document
var AllElement=document.getElementsByTagName('*');
var AllElement_length=AllElement.length;
if(document.getElementById('lteIE8')){
	document.createElement("opacity");
	for(var i=0;i<AllElement_length;i++)
	{	
		var arr = AllElement[i].className.split(' ');
		for (var j=0;j<arr.length;j++)
		{
			if(arr[j] == 'opacity') AllElement[i].innerHTML='<opacity>'+AllElement[i].innerHTML+'</opacity>';
		}
	}
}

if(document.getElementById('lteIE7')){
	for(var i=0;i<AllElement_length;i++)
	{	
		var arr = AllElement[i].className.split(' ');
		for (var j=0;j<arr.length;j++)
		{
			if(arr[j] == 'vertical'){
			AllElement[i].appendChild(document.createElement("vafter"));
			}
			if(arr[j] == 'float_clear'){
			AllElement[i].appendChild(document.createElement("fafter"));
			}
		}
	}
}

if(document.getElementById('lteIE6')){
	for(var i=0;i<AllElement_length;i++)
	{	
		var arr = AllElement[i].className.split(' ');
		for (var j=0;j<arr.length;j++)
		{
			if(arr[j] == 'vertical'){
				var children=AllElement[i].children;
				for(var k=0;k<children.length;k++){
					children[k].className = children[k].className + ' vertical_children';
				}
			}
			if(arr[j] == 'center'){
				var children=AllElement[i].children;
				for(var k=0;k<children.length;k++){
					children[k].className = children[k].className + ' center_children';
				}
			}
		}
	}
}
