

function includeJS(fileUrl)
{
	var script = document.createElement('script');  
	script.setAttribute('src', fileUrl);  
	document.getElementsByTagName('head')[0].appendChild(script);
}
