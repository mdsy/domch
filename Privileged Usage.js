
(function() {


   var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js");

	//with content document:
	var $ = make$(content.document);

	//with an arbitrary document:
	//var $ = make$(doc);

	//test some methods...
	$('a').css('border: 1px solid red;').debug(1);


})();
