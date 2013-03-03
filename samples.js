

(function() {

    
  //load "domch.js"
	var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
	var js = "file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js?1"+(Math.random().toString().replace(".",""));
	//alert(js);
    //var scope = {};
	loader.loadSubScript(js/*, scope*/);

    let $ = make$(content.document);

	//Event Registration on window object
	_().$win().on('load', fn); // === window.addEventListener('load', fn, false)

	//Static Methods demos:
		//$.addCss('body {margin:25% !important;}');
		//$('body').prepend( $.create('div', {text:'cooler than cool'}) );
		//$('body').prepend( $.parse('<div>cooooooooooool!</div>') );
		//$.addJs('alert(window.location)');
		//alert($.now());
		//$.insTop( $.newText('xxx') );
		//$.insTop( $.newText( $.now() ) );
		//$.clipCopy('cooler than cool');

		/*
		//XmlHttpRequest
		function xhrCallBack(ev){
			var req=ev.originalTarget;
		    if(req.readyState == 4){
		        var xox=(req.responseText);
		        if(req.status == 200){
		            var s = req.responseText;
		            alert(s);
		        }else{
					alert('XmlHttpRequest returned STATUS: '+req.status+'\n And RESPONSE TEXT:\n\n'+req.responseText)
		        }
		    }
		
		}
		$.xhr('https://developer.mozilla.org/en-US/docs/JavaScript/Reference', xhrCallBack);
		$.xhr('file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/test.htm', xhrCallBack);
		*/
		
		/*
		alert( $.url );
		$.url ='https://developer.mozilla.org/en-US/docs/JavaScript/Reference';
		*/
		
		/*
		$.counter = 100; //any number
		//for(var i=0; i<10; i++) $.insTop( $.create('div', {text: $.counter} ) );
		$('a').fx( function(n){n.textContent='link #'+$.counter; } );
		*/

		//alert( $.props(window) );
		
		/*
		alert($.head.outerHTML);
		alert($.root.outerHTML);
		alert($.html);
		*/
		



    /*
    //using $ as a constructor to create a namespace:
	;typeof $; //function
	let M = new $();
	;typeof M; //object
    M.$('a').debug(0);
    M.images.debug(0);
    */

    /*
    //using $ as a function
    $().images.debug(0);

    //using the static methods
    $.images.debug(0); // == $().images
    $.links.debug(0);  // == $().links
    $.addCSS('* {color:red}'); // == $().addCSS
    $.HTML; // === $().HTML;
    $.body; //[object HTMLBodyElement]
    */

    /*
    //prototype methods
    $().linkImages.debug(0);
    $().imageLinks.debug(0);
    $().comments.debug(0);
    $().texts.debug(0);
    $().scripts.debug(0);
    $().styles.debug(0);
    $().linkedStyles.debug(0);

    //static methods
    $.linkImages.debug(0);
    $.imageLinks.debug(0);
    $.comments.debug(0);
    $.texts.debug(0);
    $.scripts.debug(0);
    $.styles.debug(0);
    $.linkedStyles.debug(0);
    */

    //$('p').html('XXX').debug(0);
    //$('p').only().html();
    //$().HTML;
    
    //link text = link href
    //$("a").fx(function(n){n.text=n.href.replace(/https?\:\/\/(www\.)?/,'')});
    //_('div').reverse();
    //;_().url;
    //;_().url='about:blank';
    //;_().win;
	//alert($().body.outerHTML);
	//alert($.body.outerHTML);


// IntPorn Total Cleanup
	// remove divs with no images
	// $().$img().$filter(function(x){return (x.src.indexOf("gif")>-1);}).debug(0).remove();
	// var nav = $('.pagenav').only(0).debug(0).cut();
	// var navbar = $('.navbar').debug(1).only(-1).cut();
	// var navbar = $('.navbar').cut();
	// var url = $('#_x_topurl_x_').only(0).debug(0).cut();
	// $('table').fx(function(n){if($(n).$('img').length==0) $(n).remove();});
	// $('div').fx(function(n){if($(n).$('img').length==0) $(n).remove();});
	// $('body').prepend(nav);
	// $('body').prepend(navbar);
	// $('body').prepend(url);

// 
// 	/*
//	$(".install-button").$('a').debug(0).fx(function(n){
//		//let a=n.parentNode.appendChild(a);
//		})
//	*/

	//$('.concealed').debug().css('display:block !important;hidden:false !important; visibility:visible !important;');
	//$('.concealed').debug().remAttr('class');

/*
	
	let gLog1 = Logger("c:\\base64.log");
	
	$('a').debug(0).fx(function(n){
		var h;
		try{
			h = n.href;
			h = decodeURIComponent(h);
			h = h.replace(/^.*?aHR/,'aHR').replace(/=.*?$/,'').replace(/#.*?$/,'');
			if(/^aHR/.test(h)){
				h = atob(h);
				gLog1.log(h);
				n.href = h;
			}
		}catch(err){
			gLog1.log('ERROR: ' + err + '\t' + h);
		}
	})
	.debug(0);
	
	gLog1.close();
	
*/
	
	//$().$id('#ratig-layer').debug().remove();
	
	//$('td').fx(function(x){x.removeAttribute('bgcolor')});
	
	/*
	$('a').$filter(function f(n){
					if(n.href.indexOf('marketgid.com')>-1) return true;}
				 ).remove();
	*/
	

	//reWalls.com
	/*
	var a=[];
	var i = 0;
	$('.verh').debug(0).fx(function(n){var x=$(n).$('a').only(1);if(x.node().href.indexOf('marketgid.com')==-1) a.push(x.node().href);x.replace('/girls/','/download/').replace(/(\d+)\-.*
	/gi,'$1/1920x1080/');});
	alert(a.length+a.join('\n'));
	//$('.verh').debug().$('.razmer').update(function(n){n.textContent = Math.random()})
	$('.razmer').debug().update(function(n){
									var s = n.textContent;
									var href = a[i++];
									href = href.replace('/girls/','/download/').replace(/(\d+)\-.*
									/gi,'$1/'+s+'/');
									n.innerHTML = '<a href="' + href + '">'+s+'</a>';
								});
	*/


	//fritchy.com
	//$().$img().debug(0).$filter(function(x){return (x.src.indexOf("gif")>-1);}).debug(0).remove();
	
	//asredas.com
	//$('//img[@src="/images/anchor_icon.gif"]').remove();

    //<link rel="shortcut icon" href="https://developer.cdn.mozilla.net/media/img/favicon.ico">
    //$("//link[@rel='shortcut icon']").debug(1);
    //$("//link[@rel='icon']").debug('html');

    //$('.install-button').remAttr('class');
    //$('.action').remAttr('class');
    //$('.info').remAttr('class');

//rip-prod reverse
	//$('.postcontent').debug(0).reverse();
	//$('.postcontent div').debug(0).reverse();

/*
//https://addons.mozilla.org/
    $('.item').css('border:1px solid green !important; padding:5px !important;margin:5px !important;');
    $('.item a').css('font-size: 20pt !important;');
    $('.item').remAttr('class');
*/

/*
	//remove broken images
	$("img").fx( function(img){if(img.naturalWidth==0) $(img).remove()} )
*/

/*
//Supernatural Wiki
    $('a').remove();
    $("#toc").remove();
    $("#mw-content-text").isolate();
    $().$css().remove();
    $().doc.title=$().doc.title.replace("(transcript) - Super-wiki","");
*/

/*
//save scripts and styles
    //$('script').fx(function(n){(n.src)});
    var scripts = $('script').getAttrs('src');
    var styles  = $('link[rel="stylesheet"]').getAttrs('href');
    
    //alert([scripts,styles].join('\n'));
    var files = scripts.concat(styles);
    files.push(content.location.href);
    alert(files.join('\n'))
    files.forEach(function(url){
        saveURL(url, "", null, true, false, null);
    });
*/    
    
    

/*
function saveURL(aURL, aFileName, aFilePickerTitleKey, aShouldBypassCache, aSkipPrompt, aReferrer) {
    internalSave(aURL, null, aFileName, null, null, aShouldBypassCache, aFilePickerTitleKey, null, aReferrer, aSkipPrompt, null);
}
*/



//maf
    //$('img').replace('urn:download-error:','');

/*    
    var img = $('img').node();
    //img.width=img.naturalWidth;
    //img.height=img.naturalHeight;
    //alert(window.innerHeight);

function getSize(window) {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return { width: myWidth, height: myHeight}
}

img.width = getSize(content.window).width;
//img.height = getSize(content.window).height;
*/


//about:support
    //show 'Reset Firefox to its default state' button
    //$('#reset-box').node().style.visibility='visible'


    
    //$('html').debug(1);

//remove matched nodes with no child images!
    //$('.alt1 div').fn(function(n) {var k=$(n).$('img').length; if(k==0)$(n).remove();});


/*
//http://www.tweakguides.com/Firefox_1.html
    $('#sidebar').remove();
    $('table').debug(0).remove();
    $('#guide').isolate();
*/



/*
//http://dmitrysoshnikov.com
	$('.mr_social_sharing_wrapper').remove();
	$('#sidebar').remove();
	$().$script().remove();
*/


//http://stackoverflow.com
    //$('#noscript-warning').remove();


	//alert(content.window.location.href);
	//$().debug('html',true);


	/*
	range = $().doc.createRange();
	//range.selectNode($().doc.getElementsByTagName("div").item(1));
	range.setStart($().doc.getElementsByTagName("div").item(2),0);
	range.setEnd($().doc.getElementsByTagName("div").item(3), $().doc.getElementsByTagName("div").item(3).childNodes.length);
	documentFragment = range.cloneContents();
	//alert(documentFragment);
	$().doc.body.appendChild(documentFragment);
	*/


	
/*
//http://forum.mozilla-russia.org	
	//$().addJs('function toggleSpoiler(obj) { obj.className = obj.className == "spoiler-plus" ? "spoiler-minus" : "spoiler-plus"; for (i = 0; i < obj.parentNode.childNodes.length; i++) { var item = obj.parentNode.childNodes[i]; if (item.className == "spoiler-body") { item.style.display = item.style.display == "block" ? "none" : "block"; break; } } };');
	$("#brdtitle").update( $().create('button',{text:'Expand All',onclick:'var d=document.querySelectorAll(".spoiler-plus");for(var i=0;i<d.length;i++)toggleSpoiler(d[i]);'}) );
	
	//var toggleSpoiler=function(obj){obj.className=obj.className == "spoiler-plus" ? "spoiler-minus" : "spoiler-plus"; for (i = 0; i < obj.parentNode.childNodes.length; i++) { var item = obj.parentNode.childNodes[i]; if (item.className == "spoiler-body") { item.style.display = item.style.display == "block" ? "none" : "block";break;}}};
	//$('?.spoiler-minus').debug();
	//$('?.spoiler-plus').debug(0).fx( function(n){toggleSpoiler(n)} );
*/	


	
/************** Selector Functionality *********/

	//ID
		//$('#sub2').debug(1).isolate().css('border: 5px solid silver;');

	//Partial ID		
		//$().$id('#sub').debug(1).css('border: 5px solid gold;');

	//Tag Name
		//$('p').debug(1);

	//Class Name
		//$(".subdiv").css('border: 5px solid teal;');

	//Partial Class Name
		//$().$class("sub").css('border: 5px solid teal;');

	//XPath
		//$("//img").css('border: 5px solid red;');
		//$("//a[@href]").css('border: 5px solid green;');
		//$("//a[@href]//img").debug(1).css('border: 5px dotted red;');
		//$("//img").css('border: 5px solid #FF8811; padding:4px; background:black;');
		//$('div').only(2).$(".//img").css('border: 5px solid #FF8811; padding:4px; background:black;');

	//Attribute
		//$('@id=sub').debug(1);

	//Object (Node List)
		//var divs = content.document.getElementsByTagName('div');
		//$(divs).debug(0).css('border: 5px solid gold;');

	//Select using a parent element
		//var div = content.document.getElementById('sub2');  $(div).debug(0).$('a').debug(1);
		//$('div').only(2).$(".//img").css('border: 5px solid #FF8811; padding:4px; background:black;');

	//Query Selector All
		//$('*').debug(1);				//all nodes
		//$('a,p').debug(1);			// <a> and <p> elements
		//$('p a').debug(1);			// <a> elements that are descendants of <p> elements
		//$('p>a').debug(1);			// <a> elements that are children (direct descendants) of <p> elements
		//$('a>img').debug(1);			// linked images
		//$('p+a').debug(1);			// <a> elements that are adjacent to <p> elements
		//$('a[href]').debug(1);		// <a> elements that have 'href' attribute

	//Query Selector (returns only first matched node)
		//$('?div').debug(1);
		//$('?div').$('?div').debug(1);	//first <div> inside the first <div>
		//$('?div').$('?*').debug(1);	//first node inside the first <div>



    //querySelector and querySelectorAll
    	//$().$q('.subdiv').debug(1);
    	//$().$q('#subimgs').debug(1);
    	//$('#main').$q('div').debug(1);
    	//$('').$q("style[type='text/css'], style:not([type])").debug(1);
    	//$('').$q("style:not([type])").debug(1);
    	//$('div').$qall(":not(div)").debug(1);
    	//$('body').$qall(":not(div)").debug(1);
    	//$().$qall("a:not([href])").debug(1);	//get anchors not links
    	//$('?div').only(2).debug(1).$('?a').debug(1);
    	//$('? #sub2').debug(1).$('?p').debug(1);
    	//$('? .subdiv').debug(2).$('#b2').debug(1);

    //using a function to match nodes
        //function getRome(node){ if(node.tagName.toLowerCase()=='img' && node.src.indexOf('Rome.gif')>-1) return true; }
        //function getA(node){ if (node.tagName.toLowerCase() == 'a') return true; }
        //$().$fn(getRome).debug(1);
        //$('#sub2').$fn(getRome).debug(1);
        //$().$fn(getA).debug(1);

    //filter selected nodes using function
	    //$().imageLinks.$filter(function(n){if(n.href.containsAny('.jpg', '.jpeg')) return true;}).isolate();
	    //$('img').$filter(function(n){if(n.src.containsAny('rome')) return true;}).debug(1);



//misc
	//$('a[href]').debug(1);
	//$('@src=foo').debug(1);
	//$('a[href]').debug(1);
	//$('a').debug(1);
	//$('?a>img').debug(1);
	//$('#sub2,#sub1').debug(1);
	//$('#b').debug(1);
	//$().$id('sub').debug(1);
	//$().$class('silv').debug(1);
	//$().$("#sub").debug(1);
	//$('div').only(2).$('img').debug(1);

// querySelectorAll
	//$().$q('.subdiv').debug(1);
	//$('#sub2').debug(0).$q('img').debug(1);
	//$().$q('#sub2').$q('a,img').debug(1);

/* select certain tags:
	$root	<html> object
	$head
	$body
	$script
	$img
	$link	<a href> not <link>
	$text
	$css	<style> and <link rel=stylesheet>

// <meta> tags
	//$().$meta().debug(1);
	//$().$meta('originalurl').debug(1);
	//$().$meta('name').debug(1);

*/

//remove all stylesheets <style> and <link rel=stylesheet>
	//$().$css().debug(1).remove();

//select image with a certain string in src, links with string in href
	//$('#sub2').$link('htm').debug(1);
	//$().$link('fastpic.ru').debug(1);
	//$().$img('f').debug(0).css('border:4px solid gold');
	//$().$link().debug(1).html('Zzz').debug(1);

//get images on webpage
	//alert($().doc.images);	//standard element collection
	//$().$img().debug(1);
	//$().$('img').debug(1);
	//$().images.debug(1);
	//$().linkImages.debug(1);

//get stylesheets
	//$().styles.debug(1);			//<style>
	//$().linkedStyles.debug(1);	//<link rel=stylesheet>


/*******************************************************************/


//$DOM Static Methods and Properties:
//do not use nodes, do not return node list, are not definded for $()

	//alert($().win.location.href)	//content.window
	//alert($().url)					//content.window.location.href
	//$().url='http://www.google.com';
	//$().url='';	//about:blank
	//$().doc.title = 'cool!';		//content.document
	//alert($().root) 				//content.document.documentElement (<html> node )
	//alert($().head)				//<head> node
	//alert($().body)				//content.document.body
	

//List object properties
	//alert($().props($DOM));
	//alert($().props(String.prototype));

//create element
	//alert($().create('p',{text:'coooool'}).innerHTML);

//counter functionality
	//$().counter = 33; alert($().counter); alert($().counter);
	//$().counter = 1;
	//$().links.debug().fx(function(x){x.href='http://foo.net/' + $().counter});

//Add style to elements:
	//method 1: use the '$DOM' namespace to access the methods:
	//$().$('img').css('border: 3px solid gold').debug(0).cssAdd('opacity:0.4;').debug(1);

	//method 2: use the '$$' method directly:
	//$('img').css('border: 5px solid gold').debug(0).cssAdd('opacity:0.4;').debug();

//Change link text to url and set style:
	//$('a').link2url('wall').debug().css('opacity:0.1;').debug();
	//$().$('a').debug().link2url('wall').css('border: 3px solid gold');							

//Add Global Stylesheet
	//$().addCss('img {border: 5px solid gold !important;}');
	//$().addCSS('img {background: silver !important;}');

//Insert at Top and Bottom of Page
	//$().insTop($().create('div',{text:'cool'}));
	//$().insBottom($().create('p',{text:'********************************'}));

//inner & outer HTML
	//alert($('div').only(1).debug().ohtml);
	//alert($('div').only(1).ihtml);


//<HTML> tag inner & outer HTML
	//alert($().root.innerHTML);
	//alert($().$root().ohtml);
	//alert($().html);
	//$().debug('html');

//<HEAD> & <BODY>
	//alert($().$head().ohtml);	
	//alert($('head').ihtml);
	//alert($().$body().ohtml);	
	//alert($('body').ohtml);


//Remove <script>
	//$().$script().debug(1).remove().debug();
	//$().scripts.debug(1).remove().debug();

//remove matched nodes
	//$().$('img').debug(1).remove();

//<img> to text
	//$().$('img').e2txt('xxxxxx').debug(1);

//replace in link href:
	//$().$('a').replace('google','yahoo').css('border: 3px solid gold');
	//$().$link().replace('google','yahoo').css('border: 3px solid gold');
	//$().links.replace('google','yahoo').css('border: 3px solid gold');

//remove all nodes
	//$('*').debug().remove();

//get number of <a> tags
	//alert($().$('a').length);

//remove style attribute
	//$('img').deCss();

//Execute a string of Javascript for Every Matched Node (n is a predefined variable):
	//$().links.exec("n.textContent=n.href");
	//$('p').exec("n.innerHTML='*****'");

//Execute Function for Every Matched Node:
	//set image title to image src
	//$('img').fx(function(n){n.title=n.src; return n;}).css('border: 2px solid gold;');
	//set image title to parent link href
	//$().$img().fx(function(n){if(n.parentNode.href)n.title=n.parentNode.href; return n;}).css('border: 2px solid gold;');

//Difference betwen fn() and fx()
    //fx: ignores the return of function
        //$('p').fx(function(n){n.textContent='***'; return n.parentNode;}).debug(1);
    //fn: selected nodes are now the parents!
        //$('p').fn(function(n){n.textContent='***'; return n.parentNode;}).debug(1);


	/*
	//number images:
	//using variable
	var i=1;
	$('img').fx(function(n){
		       		var newElement = content.document.createTextNode(i++);
	        		n.parentNode.insertBefore(newElement, n);
	        		return n;});
	
	//using property
	$().counter=1;
	$('img').fx(function(n){
		       		var newElement = content.document.createTextNode($().counter);
	        		n.parentNode.insertBefore(newElement, n);
	        		return n;});
	*/

//remove nodes that have 'Avatar' in their alt attribute
	//$('@alt=Avatar').debug(0).remove();

//set textContent
	//$('p').text('***');

//set innerHTML
	//$('div').only(2).$('p').html('xxx');
	//$('body').html('<b>abc</b>');
	//$().$body().html('123');

//clear innerHTML
	//$('#sub').html();

//replace in innerHTML
	//$('*').replaceHTML(/<div/gi,'<p').replaceHTML(/<\/div/gi,'</p');


//get one element or element array for manipulating using standard dom methods
	//alert($('img').nodes().length);
	//$('a').node(1).textContent = 'Cool Link!';

//insert before/after
	//var e = $().create('div',{html:'======|1|======='});
	//$(".subdiv").only(2).insBefore(e).insAfter($().create('div',{html:'======|2|======='}));
	//$(".subdiv").only(1).insBefore(e).insAfter(e.cloneNode(true));


//truncate node array to one node only
	//$('a').only(0).html('xxx').debug(1);

//if none found no erors occur
	//$('#xxx').debug(1).only().debug(1);

//remove hashes from links
	//$().links.replace(/#.*/,'');


//append and prepend to an element
	//$('#sub1').debug(0).append('<b>one!</b>');
	//$('#sub1').debug(0).append($().create('p',{html:'<b>two!</b>'}));
	//$('#sub1').debug(0).prepend('<b>three!</b>');
	//$('#sub1').debug(0).prepend($().create('p',{html:'<b>four</b>'}));
	//alert($().body.innerHTML);
	//$('p').only(0).debug(0).prepend($().create('span',{text:'cool span! ', style:'background:gold;'}));

//Append and Prepend to/from multiple elements
	//var xxx=$('a').clone();
	//$('div').only(1).before(xxx);
	//$('div').only(1).appch(xxx);
	//$('div').append(xxx);
	//$('div').append("<b>booooooo!!!</b>");

	//$('div').prepend(xxx);
	//$('div').prepend("<b>booooooo!!!</b>");

//append text & html
	//var txt = $().newText('*plain text*');
	//var htm = '<b>HTML!</b>';
	//$('button').after(txt);
	//$('div').before(htm);
	//$('div').append(htm);
	//$('div').append(txt);


//Set and Remove Attributes
	//$('a').setAttr('href','xxx').debug(1);
	//$().$a().debug(1).remAttr('title').debug(1);
	//$().$img().debug(1).remAttr('alt', 'border', 'width', 'height').debug(1);
//Remove All Attributes
	//$('#main').remAttr(true);


//isolate selected nodes
	//$('#sub2').isolate().debug(1);	//one node
	//$('img').isolate();				//multiple nodes


//replace matched nodes with something node, html, or function!
	//$('a').only().update($().create('hr')).debug(1);
	//$('a').update($().create('hr')).debug(1);
	//$('a').update('<div><p>SO COOL!</o></div>').debug('html');
	//$('a').update(function(n){n.textContent = Math.random()})


//add StyleSheet	
	//addCSS==addCss
	//$().addCSS('body {margin:0% !important;}');
	//$().addCss('body {padding:20px !important;}');


//how many selected nodes:
	//alert($().$('a').length);


//remove failed or unloaded images
	//$("img").fx( function(img){if(img.naturalWidth==0) img.parentNode.removeChild(img);});


	/*
	$().debug(0).$q(".subdiv,.silver-back").debug(0); //class OR class
	$().debug(1);
	$().debug(0).$class("silver-back subdiv").debug(1); //class AND class
	*/


//tag name
	//alert($('div').tagName);
	//alert($().$text().tagName);

//Replace 
	//$().$text().replace('o','@@@@@@');
	//$().links.replace('o','@@@@@@@');
	//$('button').debug(0).replace('o','@@@@@@');
	//$('#sub1').debug(0).replace(/button/g,'p');


//Node Name: #text #comment or tagname: p,div,...
	//alert($().$text().only(2).nodeName);
	//alert($().$comment().nodeName);
	//alert($('div').nodeName);


//Add one node
	//var a1=$().links.only(0).debug(0).node();
	//$('p').debug(1).push(a1).debug(1);
	
//Add many nodes
	//var a1=$().links.debug(0).nodes();
	//$('p').debug(1).push(a1).debug(1);


//Traverse
	//$('div').only(1).debug(1).up().debug(1);
	//$('div').only(1).debug(1).next().debug(1);
	//$('div').only(1).debug(1).prev().prev().debug(1);
	//$('div').only(1).debug(1).prev().debug(1);
	//$('html').debug().up().debug().up().debug();
	

//Event Registration
	//function cool(e) { alert(this.id); e.stopPropagation();}
	//$('div').only(1).on('click', cool);
	//$('div').only(1).off('click', cool);
	//$('div').on('click', cool);	//register for all div's
	//$('div').only(1).off('click', cool);	//exclude second div
	//function foo(e) {alert(this.href); e.preventDefault();}
	//$('a').on('click', foo);

//Add <script>
	//$().addJs('alert("x")');
	//$().scripts.debug(1);
	//$().debug('html');
	//var js = $().addJs('var x=7>3;');
	//alert(js.innerHTML);
	//alert(js.textContent);

//HTML string to DOM object
	//var s = '<div><b>I am a div node</b> with a <a href="http://x.tv">link</a></div>\n';
	//$('body').append($().parse(s));

//clipboard functions
	//alert($().clipPaste());
	//$().clipCopy('*******');
//Copy entire html source
	//$().debug('html', true);


/*
//XmlHttpRequest
	function demo(ev){
		var req=ev.originalTarget;
	    if(req.readyState == 4){
	        var xox=(req.responseText);
	        if(req.status == 200){
	            var s = req.responseText;
	            alert(s);
	        }else{
				alert('XmlHttpRequest returned STATUS: '+req.status+'\n And RESPONSE TEXT:\n\n'+req.responseText)
	        }
	    }
	
	}
	//$().xhr('http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml',demo);
	$().xhr(content.location.href,demo);
*/


//cut & extract nodes
	//var x=$('img').extract();
	//$('body').append(x);
	//$('div').prepend(x).debug();

	//var x=$('img').cut();
	//$('body').prepend(x);


//Find nodes by partial id and remove them if they contain no images
	//$().$id('post').fx(function(n){if($(n).$('img').length==0) $(n).remove();});


//Go Up 1 or more nodes:
    //$('a').only(1).up().up().debug(1);
    //$('a').only(1).up(2).debug(1);













	//visibility
	//$('a').hide();
	//$('a').unhide();

	//$('img').css('border: 5px solid gold');
	//$('div').only(5).reverse();
	//$('#post_message_2329654').debug();
	//$('img').isolate().debug().css('border: 5px solid gold');
	//$('.container_12').isolate().reverse();
	//$('img').toggle().cssAdd('border: 4px solid gold');
	//$('img').toggle();

	
	//var divNode = content.document.getElementById('post_message_').getElementsByTagName('div')[0];
	//$(divNode).reverse();
	//$('#post_message_').debug().x1x('div').debug();
	//alert($('#post_message_').x1x('div').outerHTML());
	//$('#post_message_').x1x('div').reverse();
	//$().$('#main').$('div').only(0).html('********');
	//$('#main').$('div').only(0).html('xxx');
	//$('div').debug('id').only(-1).html('xxx'); //last node
	///$('div').$('div').only().debug();
	//$('#main').$('div').only(0).reverse();
	//$('#main').$('#sub').debug().only(1).reverse();
	//$('#main').$('.subdiv').debug().reverse();
	//$('#main').debug().$('.//div').debug().reverse();
	//$('#main').debug().$('#sub').debug().reverse();
	//$('div').debug(0,'id').$('#sub').debug(1,'html');
	//$('div').debug(0,'id').$('#sub').debug(1); //1=html
	//$('#sub').debug();
	
	//alert($('@id=sub').debug(0).ihtml);
	//$('@id=sub').debug(0).ihtml='<i>xxx</i>';

	//outerHTML get/set
	//alert($('@id=sub').debug(0).ohtml);
	//$('@id=sub').debug(0).ohtml='<div><p>xxx</p></div>';
	//alert($('body').ohtml);

	
	//alert($('html').ihtml);
	//alert($('html').ohtml);
	//alert($('div').length);
	
	//$().$('div').debug('html');
	
	//$('div').debug('textContent');
	//$('div').debug('id');
	//$('div').debug().debug('class');
	//$('div').debug().debug('text');
	//$('div').debug().debug(1);
	//$('@class=sub').debug().debug(1);
	//$('html').debug();
	//$('@title').debug('title');
	//$('@href').debug('href');

	//$('div').child().html('xxx'); //1st child
	//$('div').$('div').children().debug('id');
	//$('div').only(2).child().debug('html').children().debug('html');
	//$('#post_message').isolate().debug('html');
	//$('.postcontent').isolate();
	//$('@align=center').reverse();
	
	//get first div and add a paragraph before and after it:
	//$('div').only(0).insAfter($().create('p',{text:'*****'})).insBefore($().create('p',{text:'------'}));

	//$(".wallpaper-resolutions").isolate().$('a').unlink('db.php').replace('view-','http://www.sexyhotwallpapers.com/download/').replace('.html','.jpg').debug();
	//$('a').unlink('db.php').replace('view-','/download/').replace('.html','.jpg').debug();

	//$('style').remove();
	//$('link').remove();
	//$('.wallpaper-resolutions').isolate().$('a').unlink('db.php').replace('view-','download/').replace('.html','.jpg');
	//$('a').fx(function(x){if(x.href.indexOf('1920')>-1) content.window.location=x.href;});
	

	


	


	//replace in link href
	//$().links.replace(/\.jpg\?\d+/,'.jpg');

	//$().links.debug(1).remove();
	//$().images.debug(1).remove();
	//$("//a[@href]//img").debug(1).remove();
	//$().linkImages.debug(1).remove();

	//equivalent
	//$().$img().debug();
	//$().images.debug();
	
	//$().imageLinks.debug(1);
	//$().linkImages.debug(1);
	
	//$().comments.debug(1);
	//$().texts.debug(1).remove();

	/*
	$('div').only(0).$('#sub').only(1).debug(0).$text().debug(1);
	$().$text().debug(1);
	*/

	/*
	$('div').only(2).debug(0).$img().debug(1);
	$('div').only(2).debug(0).$('img').debug(1);
	$('div').only(2).debug(0).$('.//img').debug(1);
	$('div').only(2).debug(0).$('//img').debug(1);
	*/
	
	/*
	$('div').only(2).debug(0).$('a').debug(1);	//find in 3rd <div>
	$('div').only(2).debug(0).$a().debug(1);	//find in 3rd <div>
	$('div').only(2).debug(0).$(".//a[@href]").debug(1); 	//find in 3rd <div>
	$('div').only(2).debug(0).$("//a[@href]").debug(1);	//find in all document
	*/
	
	//equivalent
	//$().$body().debug(1);
	//$('body').debug(1);
	//$().$().$body().debug(1);

	/*var x=$('div');
	x.only(1).debug(1);
	$().body.innerHTML='';
	x.fx(function(n){$().body.appendChild(n)});*/
	
	
	//$().insTop($().create('hr'));


})();
