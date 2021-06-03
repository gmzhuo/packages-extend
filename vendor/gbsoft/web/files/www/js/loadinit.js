var lang;

(function () {
	lang = navigator.language||navigator.userLanguage;
	lang = lang.substr(0, 2);
	document.addEventListener('DOMContentLoaded', function (ev) {
		document.dispatchEvent(new CustomEvent('frame-loaded'));
	});
})();
