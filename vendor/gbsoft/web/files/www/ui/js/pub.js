// JavaScript Document
Array.prototype.remove=function(dx)
{
	if(isNaN(dx)||dx>this.length){return false;}
	for(var i=0,n=0;i<this.length;i++)
	{
		if(this[i]!=this[dx])
		{
			this[n++]=this[i]
		}
	}
	this.length-=1;
}

var parseSubmitObj = function(f, basename, arr)
{
	for(var i=0; i< arr.length; i++)
	{
		var input = document.createElement("input"); 
		input.type = "hidden";
		input.id = basename+'_'+i;
		input.name = basename+'_'+i;
		input.value = arr[i].replace();
		f.appendChild(input);
	}
}

function formatSeconds(value) {  //19138
	var theTime = Number(value);  
	var theTime1 = 0;  
	var theTime2 = 0;  

	if(theTime > 60) {
	   theTime1 = Number(theTime/60);  
	   theTime = Number(theTime%60);  
	    if(theTime1 > 60) {  
	        theTime2 = Number(theTime1/60);  
	        theTime1 = Number(theTime1%60);  
	    }  
	}  
	var result = ""+theTime+"s";  
	if(theTime1 > 0) {  
	    result = ""+parseInt(theTime1)+"m "+result;  
	} else
		result = "0m "+result;
	if(theTime2 > 0) {  
	    result = ""+parseInt(theTime2)+"h "+result;  
	} else
		result = "0h "+result;
	return result;  
}  

function formatDate(nS){    
    return new Date((parseInt(nS)-8*3600) * 1000).toLocaleString().substr(0,20);  
}