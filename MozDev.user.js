// ==UserScript==
// @name           MozDev
// @namespace      *
// @include        https://developer.mozilla.org/*
// @require        file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js
// ==/UserScript==

  var _ = make$(content.document); //cannot use $ on this page!

	var css = [
		"body{margin:0px 3% 3% 3%;",
		"font:14px/1.286 'Lucida Sans Unicode',Lucida,Arial,Helvetica,sans-serif;}color:rgb(30,30,30);",
		"p,td,span,div {font-size:15px; font-family:Arial;} ",
		"h2 {color:darkblue;} ",
		"strong {font-family:Arial;} ",
		"pre {background:#F6F6F2; border:1px dotted silver; padding:8px; font:15px Courier New, Lucida Console ;} ",
		".standardNote1 {color:#6E6765; border-bottom:1px dotted #6E6765;} ",
		".page-title {color:rgb(0,60,120); font:26px Tahoma,Georgia,Times,'Times New Roman',Serif; padding:3px;text-align:center;}",
		/*"border:0px dotted silver;  background:rgb(240,240,250);",*/
		".inlineIndicator, .geckoMinVer {border-width:1px; border:1px solid gold; font:italic 10px Verdana; white-space:nowrap; padding:2px; margin:2px; }",
		"pre, .eval {width:98%; overflow:auto;}",
		/*"td{padding:2px;}",*/
		"h6{font:1em Tahoma; color:darkblue;}",
		/*".compat-table,td{border:1px dotted silver; margin:5px;}",*/
		"p, pre, blockquote, dl, ul, ol {margin:0px 0px 1.286em; padding:0px;}",
		"section.boxed, div.boxed, form.boxed {background-color:#FFF;padding:18px;margin:0px 4px 26px 0px;border:1px solid rgb(236,236,231);}",
		/*".syntaxhighlighter table {border:1px solid rgb(240, 240, 240) !important; padding:1%!important; width:95%!important;}",*/
		"div.note, div.warning.review-technical, div.warning.review-editorial{margin-bottom: 1.286em;border-style: solid;border-color: rgb(221, 218, 170);border-width: 1px 0px;padding: 0.75em 15px;background-color:rgb(250, 249, 226);color: rgb(93, 86, 54);line-height: 1.5em;}",
		":link {color: rgb(51, 102, 153);text-decoration: none; border-bottom:1px dotted rgb(51, 102, 153);}",
		".page-content h1, .page-content h2, .page-content h3, .page-content h4, .page-content h5, .page-content h6 {font-family: Georgia,Times,'Times New Roman',serif;}",
		".page-content h2 {font-size: 1.2em;}",
		".page-content ul {list-style: disc outside none; padding-left: 22px;}",
		".page-content code, .pageText tt {font-weight: bold; font-family:'Courier New',monospace;}",
		".overheadIndicator, .standardNoteHeader, .standardNoteBlock .standardNote .nonStandard .obsolete{border:1px;overflow:hidden;margin:10px 0px;padding:0px 10px;text-align:center;}",
		".obsolete{background-color:rgb(255,190,190);border:1px solid rgb(255,0,0);}",
		".nonStandard {background-color:rgb(255,205,100);border:1px solid rgb(150,100,0);}",
		".standardNote {background-color:rgb(255,245,155);border:1px solid maroon;}",
		"pre.syntaxbox{border:1px solid rgb(204,204,204);margin-bottom:1em;background-color:rgb(255,255,238);border-radius:5px;padding:8px;}",
		"table,table.standard-table{border:1px solid rgb(187,187,187);border-collapse:collapse;}",
		"table.standard-table td.header, table.standard-table th{border:1px solid rgb(187,187,187);padding:0px 5px;background:none repeat scroll 0% 0% rgb(238, 238, 238);text-align:left;font-weight:bold;}",
		"td,table.standard-table td{padding:5px;border:1px solid rgb(204,204,204);text-align:left;vertical-align:top;}",
		"p {line-height: 1.5em;}",
		"table{margin-bottom:10px;}",
		".page-content dt{font-weight:bold;float:left;text-align:right;}",
		".page-content dd{margin-bottom:0.5em;padding-left:15px;}",
		""
	].join('\n');
	         
	var syn = [
		".syntaxhighlighter a, .syntaxhighlighter div, .syntaxhighlighter code, .syntaxhighlighter table, .syntaxhighlighter table td, .syntaxhighlighter table tr, .syntaxhighlighter table tbody, .syntaxhighlighter table thead, .syntaxhighlighter table caption, .syntaxhighlighter textarea{",
		"border:0;",
		"bottom:auto;",
		"float:none;",
		"height:auto;",
		"left:auto;",
		"line-height:1.1em;",
		"margin:0;",
		"outline:0;",
		"overflow:visible;",
		"padding:0;",
		"position:static;",
		"right:auto;",
		"text-align:left;",
		"top:auto;",
		"vertical-align:baseline;",
		"width:auto;",
		"box-sizing:content-box;",
		"font-family:'Consolas', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace;",
		"font-weight:normal;font-style:normal;font-size:1em;",
		"min-height:inherit;min-height:auto;}",
		".syntaxhighlighter{width:100%;margin:1em 0 1em 0;position:relative;overflow:auto;font-size:1em;}",
		".syntaxhighlighter.source{overflow:hidden;}",
		".syntaxhighlighter .bold{font-weight:bold;}",
		".syntaxhighlighter .italic{font-style:italic;}",
		".syntaxhighlighter .line{white-space:pre;}",
		".syntaxhighlighter table{width:100%;}",
		".syntaxhighlighter table caption{text-align:left;padding:.5em 0 .5em 1em;}",
		".syntaxhighlighter table td.code{width:100%;}",
		".syntaxhighlighter table td.code .container{position:relative;}",
		".syntaxhighlighter table td.code .container textarea{box-sizing:border-box;position:absolute;left:0;top:0;width:100%;height:100%;border:none;background:white;padding-left:1em;overflow:hidden;white-space:pre;}",
		".syntaxhighlighter table td.gutter .line{text-align:right;padding:0 .5em 0 1em;}.syntaxhighlighter table td.code .line{padding:0 1em;}",
		".syntaxhighlighter.nogutter td.code .container textarea, .syntaxhighlighter.nogutter td.code .line{padding-left:0;}",
		".syntaxhighlighter.show{display:block;}",
		".syntaxhighlighter.collapsed table{display:none;}",
		".syntaxhighlighter.collapsed .toolbar{padding:.1em .8em 0 .8em;font-size:1em;position:static;width:auto;height:auto;}",
		".syntaxhighlighter.collapsed .toolbar span{display:inline;margin-right:1em;}",
		".syntaxhighlighter.collapsed .toolbar span a{padding:0;display:none;}",
		".syntaxhighlighter.collapsed .toolbar span a.expandSource{display:inline;}",
		".syntaxhighlighter .toolbar{position:absolute;right:1px;top:1px;width:11px;height:11px;font-size:10px;z-index:10;}",
		".syntaxhighlighter .toolbar span.title{display:inline;}",
		".syntaxhighlighter .toolbar a{display:block;text-align:center;text-decoration:none;padding-top:1px;}",
		".syntaxhighlighter .toolbar a.expandSource{display:none;}",
		".syntaxhighlighter.ie{font-size:.9em;padding:1px 0 1px 0;}",
		".syntaxhighlighter.ie .toolbar{line-height:8px;}",
		".syntaxhighlighter.ie .toolbar a{padding-top:0;}",
		".syntaxhighlighter.printing .line.alt1 .content, .syntaxhighlighter.printing .line.alt2 .content, .syntaxhighlighter.printing .line.highlighted .number, .syntaxhighlighter.printing .line.highlighted.alt1 .content, .syntaxhighlighter.printing .line.highlighted.alt2 .content{background:none;}",
		".syntaxhighlighter.printing .line .number{color:#bbb;}",
		".syntaxhighlighter.printing .line .content{color:black;}",
		".syntaxhighlighter.printing .toolbar{display:none;}",
		".syntaxhighlighter.printing a{text-decoration:none;}",
		".syntaxhighlighter.printing .plain, .syntaxhighlighter.printing .plain a{color:black;}",
		".syntaxhighlighter.printing .comments, .syntaxhighlighter.printing .comments a{color:#008200;}",
		".syntaxhighlighter.printing .string, .syntaxhighlighter.printing .string a{color:blue;}",
		".syntaxhighlighter.printing .keyword{color:#069;font-weight:bold;}",
		".syntaxhighlighter.printing .preprocessor{color:gray;}",
		".syntaxhighlighter.printing .variable{color:#a70;}",
		".syntaxhighlighter.printing .value{color:#090;}",
		".syntaxhighlighter.printing .functions{color:#ff1493;}",
		".syntaxhighlighter.printing .constants{color:#06c;}",
		".syntaxhighlighter.printing .script{font-weight:bold;}",
		".syntaxhighlighter.printing .color1, .syntaxhighlighter.printing .color1 a{color:gray;}",
		".syntaxhighlighter.printing .color2, .syntaxhighlighter.printing .color2 a{color:#ff1493;}",
		".syntaxhighlighter.printing .color3, .syntaxhighlighter.printing .color3 a{color:red;}",
		".syntaxhighlighter.printing .break, .syntaxhighlighter.printing .break a{color:black;}",
		".syntaxhighlighter{background-color:white;}",
		".syntaxhighlighter .line.alt1{background-color:white;}",
		".syntaxhighlighter .line.alt2{background-color:white;}",
		".syntaxhighlighter .line.highlighted.alt1, .syntaxhighlighter .line.highlighted.alt2{background-color:#e0e0e0;}",
		".syntaxhighlighter .line.highlighted.number{color:black;}",
		".syntaxhighlighter table caption{color:black;}",
		".syntaxhighlighter .gutter{color:#afafaf;}",
		".syntaxhighlighter .gutter .line{border-right:3px solid #6ce26c;}",
		".syntaxhighlighter .gutter .line.highlighted{background-color:#6ce26c;color:white;}",
		".syntaxhighlighter.printing .line .content{border:none;}",
		".syntaxhighlighter.collapsed{overflow:visible;}",
		".syntaxhighlighter.collapsed .toolbar{color:blue;background:white;border:1px solid #6ce26c;}",
		".syntaxhighlighter.collapsed .toolbar a{color:blue;}",
		".syntaxhighlighter.collapsed .toolbar a:hover{color:red;}",
		".syntaxhighlighter .toolbar{color:white;background:#6ce26c;border:none;}",
		".syntaxhighlighter .toolbar a{color:white;}",
		".syntaxhighlighter .toolbar a:hover{color:black;}",
		".syntaxhighlighter .plain, .syntaxhighlighter .plain a{color:black;}",
		".syntaxhighlighter .comments, .syntaxhighlighter .comments a{color:#008200;}",
		".syntaxhighlighter .string, .syntaxhighlighter .string a{color:blue;}",
		".syntaxhighlighter .keyword{color:#069;}",
		".syntaxhighlighter .preprocessor{color:gray;}",
		".syntaxhighlighter .variable{color:#a70;}",
		".syntaxhighlighter .value{color:#090;}",
		".syntaxhighlighter .functions{color:#ff1493;}",
		".syntaxhighlighter .constants{color:#06c;}",
		".syntaxhighlighter .script{font-weight:bold;color:#069;background-color:none;}",
		".syntaxhighlighter .color1, .syntaxhighlighter .color1 a{color:gray;}",
		".syntaxhighlighter .color2, .syntaxhighlighter .color2 a{color:#ff1493;}",
		".syntaxhighlighter .color3, .syntaxhighlighter .color3 a{color:red;}",
		".syntaxhighlighter .keyword{font-weight:bold;}"
	].join('\n');


	//_().$script().remove();
	_().$img().remove();
	_('iframe').remove();
	_("#page-buttons").remove();
	//_(".overheadIndicator").remove();
	_("#article-nav").remove();
	_('link').remove();
	_().comments.remove();
	_.addCss(css);
	_.addCss(syn);
	_(".page-title").setAttr('title', _.doc.title); //set original title as a tooltip
	_.doc.title = _(".page-title").node().textContent;//get title from <h1 class="page-title>
	
	_("//meta[@name]").remove();
	_("//meta[@property]").remove();
	
	var fn = function(){
		/*alert('load event');*/
		//now that the highlighter has finished
		_("#tabzilla-contents").remove();
		_().$script().remove();
		_("//div[@id='content-main']").isolate();
		_.insBottom(_.create('hr', {style: 'background-color:inherit;border:silver 1px solid;border-style: none none solid;color:silver;'}));
		_.insBottom(_.create('a',{text:_.url, href:_.url, style:'font:12px Verdana'}));
		_('head').$('./text()').remove();
	};
	_().$win().on('load', fn); // === window.addEventListener('load', fn, false)

	//_().doc.title = _().doc.title.replace(/\s*\|.*$/,"").replace(/\s*\-\s*[^\-]+/,"");

