// ==UserScript==
// @name           test domch.js
// @namespace      *
// @description    test my domch.js library
// @include        *
// @include        file://*
// @require        file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js
// ==/UserScript==


//IMPORTANT: in 'about:config' set greasemonkey.fileIsGreaseable = true


  var $ = make$(document);

	//test some methods
	$('a').css('border: 1px solid red;').debug(1);
	$().debug('html');

