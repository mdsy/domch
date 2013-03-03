/* 2013-03-03 03:41 am

GreaseMonkey:
  in about:config set greasemonkey.fileIsGreaseable = true
 	// @require		   file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js
	var $ = make$(document);

Chrome Scope:
 	var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("file:///D:/_VB%20Progs/_JavaScript/DOM%20Chained%20Mini%20Library/domch.js");
	//with content document:
	var $ = make$(content.document);
	//with an arbitrary document:
	var $ = make$(doc);

*/

function make$(docX){

	var sliceFn = Array.prototype.slice;
	var doc = doc || docX;

/********************************* prototype *********************************/
	
	//if(typeof String.prototype.trim==='undefined')
     
  	if(!String.prototype.startsWith)	String.prototype.startsWith		= function (pattern) { return this.lastIndexOf(pattern, 0) === 0; };
  	if(!String.prototype.endsWith)		String.prototype.endsWith		= function (pattern) { var d = this.length - pattern.length; return d >= 0 && this.indexOf(pattern, d) === d; };
	if(!String.prototype.isBlank)		String.prototype.isBlank		= function(){ return /^\s*$/.test(this); };
	if(!String.prototype.trim)			String.prototype.trim			= function(){ return this.replace(/^\s+|\s+$/g,'') };
	if(!String.prototype.contains)		String.prototype.contains		= function(subStr) { return this.toLowerCase().indexOf(subStr.toLowerCase()) >= 0 ? true : false };
	if(!String.prototype.containsAny)	String.prototype.containsAny	= function(){ var result = false; for(var i=0; i<arguments.length; i++){ result = (this.toLowerCase().indexOf(arguments[i].toLowerCase()) >= 0) ? true : false; if(result) return result;} return result; };
	if(!String.prototype.pad)			String.prototype.pad			= function(length, padStr){length=length||1; padStr=padStr||'0'; if(this.length >= length) return this; var a = []; a[length-this.length] = this; return a.join(padStr);};
	if(!Number.prototype.pad)			Number.prototype.pad			= function(length){var L=this.toString().length; length=length || L; length=(length<L ? L : length); return (this / Math.pow(10, length)).toFixed(length).substr(2);};


/********************************* Helper Functions *********************************/

	function isArray(object){
		//if('isArray' in Array)
		try{
			return Array.isArray(object);	
		}catch(ex){
			return object.constructor === Array;
		}
	}

	function getDocType(document){
	    var node = document.doctype;
	    var html='';
	    if(node){
		    html = "<!DOCTYPE "
		         + node.name
		         + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
		         + (!node.publicId && node.systemId ? ' SYSTEM' : '') 
		         + (node.systemId ? ' "' + node.systemId + '"' : '')
		         + '>\n';
		}
		return html;
	}

	function clipSetText(str){	//Warning! requires elevated privileges
		//netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].  
					getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(str);
		return str;
	}
	function clipGetText(){
		return readFromClipboard();  //from chrome://browser/content/browser.js
	}

	function xhr(url, fx){
		var req = new XMLHttpRequest();
		req.open('GET', url, true);  
		req.onreadystatechange = fx;
		req.send(null);
	}

	function props(obj){	//ToDo: needs improvement
		var p, a=[];
		for(p in obj){
			if(obj.hasOwnProperty(p)){
				a.push(p+" : "+obj[p]);
			}
		}
		return a.join('\n\n');
	}

	function date_time(){
		var a_p = "pm", d = new Date();
		var h = d.getHours();
		if (h < 12) a_p = "am";
		if (h == 0) h = 12;
		if (h > 12) h = h - 12;
		if((h+'').length==1) h='0'+h;
		var m=d.getMinutes();
		if((m+'').length==1) m='0'+m;
		var hhh = (h + ":" + m + " " + a_p);
		var ddd= (d.getDate()) + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear());
		return ddd + " " + hhh; //return sample 23-9-2012 04:17 am
	}

	function Html2DocFrag(html, doc){
		doc = doc || docX;
		var frag = doc.createDocumentFragment();
		var mydiv = doc.createElement('div');
		mydiv.innerHTML = html;
		while( mydiv.firstChild ) {
		    frag.appendChild( mydiv.firstChild );
		}
		return frag;
	}

	function Html2DocFrag2(html, doc){
		doc = doc || docX;
		var range = doc.createRange();
		//range.selectNode($().doc.getElementsByTagName("div").item(0));
		var frag = range.createContextualFragment(html);
		return frag;
	}

	function getOuterHTML(node, doc){
		if(node.outerHTML){
			return node.outerHTML;
		}
		doc = doc || docX;
		//return (new XMLSerializer().serializeToString(node)).replace(' xmlns="http://www.w3.org/1999/xhtml"','');
		var span = doc.createElement("span");
		span.appendChild(node.cloneNode(true));
	    return span.innerHTML;
	}

	function setOuterHTML(node, html) {
		if(node.outerHTML){
			node.outerHTML = html;
			return;
		}
		var r = node.ownerDocument.createRange();
		r.setStartBefore(node);
		var df = r.createContextualFragment(html);
		node.parentNode.replaceChild(df, node);
	}

	function $xpath(query, element, doc){//XPath query against a certain node
	    doc = doc || docX;
	    element = element || doc; //default node is document
	    //XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7
	    var result = doc.evaluate(query, element, null, 7, null);
	    var a = [];
	    a.length = result.snapshotLength;
	    for (var i = 0; i < a.length; i++) {
	        a[i] = result.snapshotItem(i);
	    }
	    return a;
	}
	function $tag(tag, doc){
		doc = doc || docX;
		return sliceFn.call(doc.getElementsByTagName(tag));
	}
	function $cls(clsName, context){
		context = context || docX;
	    return context.getElementsByClassName(clsName);
	}	
	function $id(id, doc){
		doc = doc || docX;
	    return doc.getElementById(id);
	}
	function $all(doc){
		doc = doc || docX;
	    return sliceFn.call(doc.getElementsByTagName("*"));
	}
	function $class(needle, doc){
		doc = doc || docX;
		//XPathResult.ANY_TYPE = 0
	    var result = doc.evaluate("//*[@class='" + needle + "']", doc, null, 0, null);
	    var a = new Array();
	    var element = "";
	    while (element = result.iterateNext()) a.push(element);
	    return a;
	}
	function $attrc(attr, str, tag, node, doc){ //Get Elements that have a certain string in the value of a certain attribute
	    doc = doc || docX;
	    node = node || doc;
	    tag = tag || "*";
	    var q = "//"+ tag +"[contains(@" + attr + ", '" + str + "')]";
	    if(node!==doc) q = ".//"+ tag +"[contains(@" + attr + ", '" + str + "')]";
	    return $xpath(q, node, doc);
	}
	function reverseChildren(n, doc){ //Reverse the order of the children of Node n
		doc = doc || docX;
	    var f = doc.createDocumentFragment();
	    while(n.lastChild) f.appendChild(n.lastChild);
	    n.appendChild(f);
	}
	function remElement(element){
	    if (element){
	        return element.parentNode.removeChild(element);
	    }
	}
	function removeAllExcept(nodes, doc){
		doc = doc || docX;
		if(nodes.length){
			doc.body.innerHTML="";
			nodes.forEach(function(n){doc.body.appendChild(n);})
		}
	}

	function removeAllAttrs(node, doc){
		doc = doc || docX;
		var a = node.attributes;
		while(a[0]){
			node.removeAttribute(a[0].name);
		}
	}

	function e2e(element,newElement){
		if (element){
		    element.parentNode.replaceChild(newElement,element);
		}
	}

	function element2Txt(element, text){
		if (element){
    		let doc = element.ownerDocument;
		    let t = doc.createTextNode(text);
		    element.parentNode.replaceChild(t, element);
		    return t;
		}
	}

	function insTxtBefore(element, newText){
	    if (element){
    		let doc = element.ownerDocument;
	        let newElement = doc.createTextNode(newText);
	        element.parentNode.insertBefore(newElement, element);
	        return newElement;
	    }
	}

	function addStyleSheet(css, doc){
		doc = doc || docX;
	    var head = doc.getElementsByTagName('head')[0];
	    if (head){
	        var style = doc.createElement('style');
	        style.type = 'text/css';
	        style.innerHTML = css;
	        head.appendChild(style);
	        return style;
	    }
	}
	function addJScript(js, doc){
	    doc = doc || docX;
	    var head = doc.getElementsByTagName('head')[0];
	    if (head){
	        var script = doc.createElement('script');
	        script.type = 'text/javascript';
	        script.innerHTML = js; //? script.textContent = js;
	        head.appendChild(script);
	        return script;
	    }
	}	
	function insAfter(element, newElement){
	    if (element){
	        element.parentNode.insertBefore(newElement, element.nextSibling);
	    }
	}
	function insBefore(element, newElement){
	    if (element){
	        element.parentNode.insertBefore(newElement, element);
	    }
	}
	function insTop(element, doc){
		doc = doc || docX;
	    var node1 = doc.body.firstChild;
	    /*while(node1.nodeType==3){
	    	node1 = node1.nextSibling;
	    }*/
	    doc.body.insertBefore(element, node1);
	}
	function insBottom(element, doc){
		doc = doc || docX;
	    var x = doc.body.lastChild;
	    x.parentNode.insertBefore(element, x.nextSibling);
	}

	function ceo(elem, oAttrs, doc){// Create Element and set Attributes and innerHTML/textContent
		var x, html = '', text = '';
		doc = doc || docX;
		var elem = doc.createElement(elem);
		if(oAttrs){
			for(x in oAttrs){
			  if(x=='textContent' || x=='text'){
			    text = oAttrs[x];
			  } else if(x=='innerHTML' || x=='html'){
			    html = oAttrs[x]
			  } else
			    elem.setAttribute(x, oAttrs[x]);
			}
			//if both innerHTML and textContent are supplied, innerHTML takes precedence
			if(text) elem.textContent = text;
			if(html) elem.innerHTML = html;
		}
		return elem;
	}

	function newText(s, doc) { // returns newly created text node
		doc = doc || docX;
	    s = s || '';
	    var node = doc.createTextNode(s);
	    return node;
	}

	/******************************* The Constructor ************************************/

    //created in a closure to make it private
    function DomCon(args){
    	this.allNodes = [];
		var q, context;
    	switch(args.length){
    		case 0:
    			//get no nodes, use this to execute globl methods?
    			break;

    		case 1:
    			q = args[0];
    			context = null;
    			//fall-thru
    		case 2:
 				q = args[0];
    			context = args[1];
    			if(typeof q=='object'){
    				if(q.length){	//node collection
    					//this.length = q.length;
    					this.allNodes.length = q.length;
    					for(var i=0; i<q.length; i++){
							this.allNodes[i] = q[i];    					
    					}
    				
    				} else { //single node
    					//this.length = 1;
    					//this.allNodes.length = 1;
    					//this.allNodes[0] = q;
    					this.allNodes = [q];
    				}
    			
    			} else { //string
    				var s = q;
    				if(/^[a-zA-Z]+$/.test(s)){		//alpha only --> single tag name
						//alert('tag');
    					//this.allNodes = sliceFn.call($tag(s, context));
    					this.allNodes = $tag(s, context);
    				
    				} else if(/^#[^ ,]+$/.test(s)){	//starts with '#' and no space or ',' --> single id
						//alert('#id');    				
	    				s=s.replace('#','');
				        var n = $id(s); //no context
				        if(n){
				        	this.allNodes = [n]; //.push(n) ???
				        /*} else {
				        	//this.allNodes = $attrc('id', s, "*", context); //search for partial ID
				        	this.allNodes = [];*/
				        }

					} else if(/^\.[^ ,\/]+$/.test(s)){	//starts with '.' and no space or ',' or '/' --> single class name
						//alert('.class');
						s = s.substr(1);
						this.allNodes = sliceFn.call($cls(s, context));

	    			/*} else if(s.substr(0,1)=='#'){  //get node by ID
	    				s=s.replace('#','');
				        var n = $id(s); //no context
				        if(n){
				        	this.allNodes.push(n);
				        } else {
				        	this.allNodes = $attrc('id', s, "*", context); //search for partial ID
				        }*/

	    			} else if(s.substr(0,1)=='/'){ //xpath
	    				this.allNodes = $xpath(s, context); //actually context is ignored here!

	    			} else if(s.substr(0,2)=='./'){ //xpath
	    				this.allNodes = $xpath(s, context);

	    			} else if(s.substr(0,1)=='?'){ //querySelector
	    				s=s.replace('? ','');
	    				s=s.replace('?','');
			        	var contextNode = context || docX;
			        	//this.allNodes = sliceFn.call(contextNode.querySelector(s));
			        	var n = contextNode.querySelector(s);
			        	if(n)
			        		this.allNodes = [n];
	    		
		    		/*} else if(s.substr(0,1)=='~'){ //xpath, in case it does not start with '/' or './'
		    			s=s.substr(1)
	    				this.allNodes = $xpath(s, context);*/

	    			/*} else if(s.substr(0,1)=='.'){ //class  <--------------------partial---------------------
	    				s = s.substr(1);
						//this.allNodes = $class(s);
						//why not use getElementsByClassName ???????
						//partial class names may cause errors!
						//e.g.  cool, coolStuff are 2 classes but 'cool' will match them both!
						this.allNodes = $attrc('class', s, "*", context); //this works for partial class names, or when more than one name exist*/

	    			} else if(s.substr(0,1)=='@'){ //attribute
	    				s = s.substr(1);
	    				var attr, val;
	    				if(/=/.test(s)){
	    					var attr_val=s.split('=');
	    					attr = attr_val[0];
	    					val =  attr_val[1];
	    				} else {
	    					attr = s; val='';
	    				}
	    				if(val){ //*[@attr=val]
					 		this.allNodes = $attrc(attr, val, "*", context); //works for partial attribte values
					 	} else { //*[@attr]
					 		this.allNodes = $xpath("//*[@" + attr + "]", context); //context doesn't work because of '//'
					 	}

	    			} else {
						//alert('default');
				        //this.allNodes = sliceFn.call($tag(s, context));//get nodes by tagName
			        	var contextNode = context || docX;
			        	this.allNodes = sliceFn.call(contextNode.querySelectorAll(s));				        
			        }
			    }
                break;											         

			default: //3 or more arguments
				//todo?
			}
		//this.length = this.allNodes.length;
		return this;
    }

	/*** Getters & Setters (used in multiple places) ***/
	function getForms(){
		return new DomCon(["form"]);
	}
	function getImages(){
		return new DomCon(["img"]);
	}
	function getLinks(){
		return new DomCon(["//a[@href]"]);
	}
	function getHtmlSource(){ //returns String, ergo unchainable!
		return getDocType(docX) + getOuterHTML(docX.documentElement);
	}
	function getHTML(){
		return new DomCon([docX.documentElement]);
	}
	function getLinkImages(){
		return new DomCon(["//a[@href]//img"]);
	}
	function getImageLinks(){
		return new DomCon(["//img/parent::a"]);
	}
	function getComments(){
		return new DomCon(["//comment()"]);
	}
	function getTexts(){
		return new DomCon(["//text()"]);
	}
    function getScripts(){
    	return new DomCon(["script"]);
    }
    function getStyles(){
    	return new DomCon(["style"]);
    }
    function getLinkedStyles(){
		return new DomCon(["//link[translate(@rel, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='stylesheet']"]);
    	//return new DomCon(["//link[@rel='stylesheet']"]);
    }
	function getDoc(){
		return new DomCon([docX]);
	}
	function getWin(){
		return new DomCon([docX.defaultView]);
	}
	function getHead(){
		//return $tag('head')[0];
		return new DomCon(["head"]);
	}
	function getBody(){
		return new DomCon(["body"]);
	}
	function getUrl(){
		return docX.defaultView.location.href;
	}
	function setUrl(newURL){
		newURL = newURL || 'about:blank';
		docX.defaultView.location.href = newURL;
	}

	var _counter = 0;	//for use with fx() for example!
	function getCounter(){
		return _counter++;
	}
	function setCounter(newValue){
		_counter = Number(newValue);
	}

    /********************** The Wrapper ********************/
    function DomConWrapper() {
    	//alert('WRAPPER');
        return new DomCon(arguments);
    }

    /********************** Prototype Methods **********************/
    DomCon.prototype = {

        //length : 0 ,
        
        /***************** HTML Get/Set Methods ************************/
        
        get length(){		//returns Number...ergo unchainable!
        	return this.allNodes.length;
        },

        get ihtml(){		//returns String...ergo unchainable!
            if(this.allNodes.length) return this.allNodes[0].innerHTML;
        },
        set ihtml(s){		//unchainable!
            if(this.allNodes.length) this.allNodes[0].innerHTML = s;
        },

        get ohtml(){		//returns String...ergo unchainable!
            if(this.allNodes.length) return getOuterHTML(this.allNodes[0]);
        },
        set ohtml(s){		//unchainable!
        	if(this.allNodes.length) setOuterHTML(this.allNodes[0], s);
        },

        get itext(){		//returns String...ergo unchainable!
            if(this.allNodes.length) return this.allNodes[0].textContent;
        },


		/***************** Node Selector Methods ************************/
      
        $ : function(s){
        	return new DomCon([s, this.allNodes[0]]);
        },
        
        $id : function(partialID){ //search for partial ID
        	partialID = partialID.replace('#','');
        	var context = this.allNodes[0] || docX;
        	this.allNodes = $attrc('id', partialID, "*", context);
        	return this;
        },

        $fn : function(fx){ //search using a function
        	var context = this.allNodes[0] || docX;
        	var a=[];
            var chekNode = function(node){
                //FILTER_ACCEPT==1; FILTER_REJECT==2; FILTER_SKIP==3
                if(fx(node)){
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_SKIP;
            };
            var iterator = docX.createNodeIterator(context, NodeFilter.SHOW_ELEMENT, {acceptNode:chekNode}, false);
            var node = iterator.nextNode();
            while (node) {
                a.push(node);
                node = iterator.nextNode();
            }
        	this.allNodes = a;
        	return this;
        },
        
        $filter : function(func){	//updates allNodes[]
        	var a = [];
            for(var i=0; i<this.allNodes.length; i++){
            	if(func(this.allNodes[i])) a.push(this.allNodes[i]);
            }
            this.allNodes = a;
            return this;
        },        

        $q : function(qs){			//querySelector
			var doc = this.allNodes[0] || docX;
			var n = doc.querySelector(qs);
			if(n)
				this.allNodes=[n];
			else
				this.allNodes=[];	
        	return this;
        },

        $qall : function(qs){		//querySelectorAll
        	var doc = this.allNodes[0] || docX;
        	this.allNodes = sliceFn.call(doc.querySelectorAll(qs));
        	return this;
        },
        
        $class : function(cls){ //search for partial className
			//e.g.  cool, coolStuff are 2 classes but 'cool' will match them both!
        	cls = cls.replace('.','');
        	var context = this.allNodes[0] || docX;
        	//this.allNodes = sliceFn.call(context.getElementsByClassName(names));//this would not get partial class names
			this.allNodes = $attrc('class', cls, "*", context);
			return this;
        },
        
        $doc : function(){
        	return new DomCon([docX]);
        },

        $win : function(){
        	return new DomCon([docX.defaultView]);
        },


        $html : function(){
        	return new DomCon(["html"]);
        },

        $head : function(){
        	return new DomCon(["head"]);
        },

        $body : function(){
        	return new DomCon(["body"]);
        },

        $script : function(){
        	return new DomCon(["script"]);
        },

        $meta : function(s){
        	s = s || '';
        	if(s){
        	    var a = $tag('meta');
        		var b = a.filter(function(m){if((getOuterHTML(m)).contains(s)) return true;});
        		this.allNodes = b;
        		return this;
        	} else {
        		return new DomCon(["meta"]);
        	}
        },

        $img : function(s){
        	s = s || '';
        	if(s){
        		this.allNodes = $attrc('src', s, "img", this.allNodes[0]);
        		return this;
        	} else {
        		return new DomCon(["img", this.allNodes[0]]);
        	}
        },

		$css : function(){
			var a1 = sliceFn.call($tag("style"));
			var a2 = $xpath("//link[@rel='stylesheet']"); //ToDo: handle upper or mixed case
			this.allNodes = a1.concat(a2);
			return this;
		},

        $link : function(s){
        	s = s || '';
        	if(s){
        		this.allNodes = $attrc('href', s, "a", this.allNodes[0]);
        		return this;
        	} else {
        		return new DomCon([".//a[@href]", this.allNodes[0]]);
        	}
        },

        $text : function(){	//ToDo: supply a match string or regexp
        	return new DomCon([".//text()", this.allNodes[0]]);
        },

		$comment : function(){
			return new DomCon([".//comment()", this.allNodes[0]]);
		},

		/*********** Collections Objects, used without '()', chainable *************/

		/*get images(){
			return new DomCon(["img"]);
		},*/
		
		/*
		get images(){
			return getImages();
		},
		get links(){
			return getLinks();
		},
		get linkImages(){   //returns <img> elements
			return getLinkImages();
		},		
		get imageLinks(){   //returns <a> elements
			return getImageLinks();
		},
		get comments(){
			return getComments();
		},
		get texts(){
			return getTexts();
		},
        get scripts(){
        	return getScripts();
        },
        get styles(){
        	return getStyles();
        },
        get linkedStyles(){
        	return getLinkedStyles();
        },
		*/

        /****************** Unchainable Properties & Methods ********************/
		/* these methods do not return `this`, ergo unchainable!		*/

		get nodeName(){
			if(this.allNodes[0]) return this.allNodes[0].nodeName.toLowerCase();
			//return this.allNodes[0].nodeName;
			//if(3==this.allNodes[0].nodeType) return '#text';
		},

        extract : function(){	//returns an array of nodes
        	var nodes=[];
            for(var i=0;i<this.allNodes.length;i++){
            	nodes.push(remElement(this.allNodes[i]));
            }
            //this.allNodes=[]; //not needed since this method is unchainable
            return nodes;
        },

        getAttrs : function(attr){	//returns an array of Attributes, unchainable
        	var attrs=[];
            for(var i=0;i<this.allNodes.length;i++){
                if(this.allNodes[i].hasAttribute(attr)){
            	    attrs.push(this.allNodes[i].getAttribute(attr));
            	}
            }
            return attrs;
        },

		clone : function(){	//returns a Document Fragment containing the nodes
			var docfrag = doc.createDocumentFragment();
			for(var i=0; i<this.allNodes.length; i++){
				docfrag.appendChild(this.allNodes[i].cloneNode(true));
			}
			return docfrag;
		},

		cut : function(){	//returns a Document Fragment containing the nodes, and removes then from the document
			var docfrag = doc.createDocumentFragment();
			for(var i=0; i<this.allNodes.length; i++){
				docfrag.appendChild(this.allNodes[i]);
			}
			return docfrag;
		},        

	/*********************** Node Traversal Methods *************************/

		up : function(count){
		    count = count || 1;
			if(this.allNodes.length){
				var n = this.allNodes[0];
				for(var i=0; i<count; i++)
				    n = n.parentNode;
				//alert(n.nodeName); //should abort if it is #document
				if(n) this.allNodes = [n]; else this.allNodes = [];
			}
			return this;
		},
		next : function(){
			if(this.allNodes.length){
				//var n = this.allNodes[0].nextSibling;
				var n = this.allNodes[0].nextElementSibling;
				if(n) this.allNodes = [n]; else this.allNodes = [];
			}
			return this;
		},
		prev : function(){
			if(this.allNodes.length){
				//var n = this.allNodes[0].previousSibling;
				var n = this.allNodes[0].previousElementSibling;
				if(n) this.allNodes = [n]; else this.allNodes = [];
			}
			return this;
		},
        child : function(index){
        	if(this.allNodes.length!==0){
	        	if(index===undefined) index=0;
	        	//alert(this.allNodes[0].hasChildNodes());
	        	//alert(this.allNodes[0].childNodes.length); 	 // all nodes (text, comment,...)
	        	var ch=this.allNodes[0].children;				 // element children only
	        	if(ch.length){
		        	if(index>=0)
		        		var n = ch[index];
		        	else
		        		var n = ch[ch.length + index];	//-1 gives the last node and so on...
		        }
	        	//this.length=1;
	        	this.allNodes.length=1;
	        	this.allNodes=[n];
	        }        
        	return this;
        },
        children : function(){
        	if(this.allNodes.length!==0){
	        	var ch=this.allNodes[0].children;
	        	if(ch.length){
					this.allNodes = sliceFn.call(ch);//convert element list to array
		        } else {
		        	//this.allNodes.length=0;
		        	this.allNodes=[];
		        }
	        }
        	return this;
        
        },

	/*********************** Event Registration Methods *************************/

        on : function (eve, func){
			for(var i=0; i<this.allNodes.length; i++){
        		this.allNodes[i].addEventListener(eve, func, false); 
        	}
        	return this;
        },
        off : function (eve, func){
			for(var i=0; i<this.allNodes.length; i++){
        		this.allNodes[i].removeEventListener(eve, func, false); 
        	}
        	return this;
        },
        
	/*********************** Node Handling Methods *************************/

        /*method : function (arg){
			for(var i=0; i<this.allNodes.length; i++){
        		this.allNodes[i];
        	}
        	return this;
        },*/


        insert : function (arg){ //ToDo what?
			/*for(var i=0; i<this.allNodes.length; i++){
        		this.allNodes[i];
        	}*/
        	return this;
        },

		push : function(arg){	//updates allNodes[]
			if(arg.length){
				var idx=this.allNodes.length;
				for(var i=0; i<arg.length; i++){
					this.allNodes[idx++]=arg[i];
				}
			} else {
				this.allNodes[this.allNodes.length] = arg;
			}
			return this;
		},

        fn : function(func){	//functionality of both map() OR forEach()
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i] = func(this.allNodes[i]) || this.allNodes[i];
            }
            return this;
        },
        
        fx : function(func){	//functionality of forEach()
            for(var i=0;i<this.allNodes.length;i++){
            	func(this.allNodes[i]);
            }
            return this;
        },

        exec : function(str){
            for(var i=0;i<this.allNodes.length;i++){
            	var n=this.allNodes[i];
            	eval(str);//n is defined within str
            }
            return this;
        },        
        remove : function(){
            for(var i=0;i<this.allNodes.length;i++){
            	remElement(this.allNodes[i]);
            }
            this.allNodes=[];	//is this necessary?
            return this;
        },

        remAttr : function(arg){	//remove Multiple or All attributes
        	if(arg===true){
        		for(var i=0; i<this.allNodes.length; i++){
        			removeAllAttrs(this.allNodes[i]);
        		}
        	} else {
	            for(var i=0; i<this.allNodes.length; i++){
	            	for(var j=0; j<arguments.length; j++)
	            		this.allNodes[i].removeAttribute(arguments[j]);
	            }
            }
            return this;
        },        

        attr : function(attr, val){ //setAttr
        	val = val || '';
            for(var i=0; i<this.allNodes.length; i++){
            	this.allNodes[i].setAttribute(attr, val);
            }
            return this;
        },        

        toText : function(s){
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i] = element2Txt(this.allNodes[i],s);
            }
            return this;
        },

        text : function(s){
            s = s || '';
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].textContent = s;
            }
            return this;
        },

        link2url : function(urlContains){
        	urlContains = urlContains || '';
            for(var i=0;i<this.allNodes.length;i++){
            	var x = this.allNodes[i];
            	if(x.href.indexOf(urlContains)>-1) {
            		x.title = "["+ x.textContent +"]";
            		x.textContent = x.href;
            	}
            }
            return this;
        },
        unlink : function(urlContains){ //only for hyperlinks <a href=''>
        	urlContains = urlContains || '';
            for(var i=0;i<this.allNodes.length; i++){
            	var x = this.allNodes[i];
            	if(x.href && x.href.indexOf(urlContains)>-1){
            		element2Txt(x,x.textContent);
            		//x.title = "["+ x.href +"]";
            		//x.removeAttribute('href');
            	}
            }
            return this;
        },        
        replace : function(findWhat, replaceWith){		//replace in <a>.href or <img>.src or <OtherTags>.innerHTML
			if(0==this.allNodes.length) return this;
        	var attrib='', attrVal='';
        	if(3==this.allNodes[0].nodeType){ //replace #text
	            for(var i=0;i<this.allNodes.length;i++){
	            	this.allNodes[i].nodeValue = this.allNodes[i].nodeValue.replace(findWhat, replaceWith);
	            }
        	} else { //<img src> or <a href>
	        	var tagn=this.allNodes[0].tagName.toLowerCase();
	        	if(tagn=='a') 
	        		attrib='href';
	        	else if(tagn=='img')
	        		attrib='src';
				if('href'==attrib || 'src'==attrib){
		            for(var i=0;i<this.allNodes.length;i++){
		            	//this.allNodes[i][attrib] = this.allNodes[i][attrib].replace(findWhat, replaceWith);
		            	attrVal = this.allNodes[i].getAttribute(attrib);
		            	if(attrVal) this.allNodes[i].setAttribute(attrib, attrVal.replace(findWhat, replaceWith));
		            }
	        	} else {	//innerHTML
		            for(var i=0;i<this.allNodes.length;i++){
						this.allNodes[i].innerHTML = this.allNodes[i].innerHTML.replace(findWhat, replaceWith);
		            }
	        	}
			}
            return this;
        },
        
        update : function(arg){
        	if(typeof arg == 'object'){
	            for(var i=0; i<this.allNodes.length; i++){
	            	e2e(this.allNodes[i], arg.cloneNode(true));
	            	//e2e(this.allNodes[i], arg);
	            }        	
        	} else if(typeof arg == 'string'){
	            for(var i=0; i<this.allNodes.length; i++){
	            	setOuterHTML(this.allNodes[i], arg);
	            }
        	} else if(typeof arg == 'function'){
	            for(var i=0; i<this.allNodes.length; i++){
	            	arg(this.allNodes[i]);
	            }        		
        	}
        	return this; //the same old allNodes[] unmodified, should we update it?
        },
        
        replaceHTML : function(findWhat, replaceWith){
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].innerHTML = this.allNodes[i].innerHTML.replace(findWhat, replaceWith);
            }
            return this;
        },

        setHtml : function(s){
            s = s || '';
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].innerHTML = s;
            }
            return this;
        },

        html : function(src){
        	if(src===undefined){		//this branch is unchainable!
        		//called with no args
        		if(this.allNodes.length){
        			return this.allNodes[0].innerHTML;
        		}
        	}else{						//this branch is chainable === setHtml()
	            for(var i=0; i<this.allNodes.length; i++){
	            	this.allNodes[i].innerHTML = src;
	            }
	            return this;
        	}
        },
        
        isolate : function(){
        	removeAllExcept(this.allNodes);
        	//no need to update allNodes[]
        	return this;
        },
        
        reverse : function(){ //works on first matched node, to work on another node use "only()"
        	if(this.allNodes.length){
        		reverseChildren(this.allNodes[0]);
        	}
        	return this;        
        },
        
        hide : function(){
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].style.visibility="hidden";
            }
            return this;
        },
        
        unhide : function(){
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].style.visibility="visible";
            }
            return this;
        },

        toggle : function(){
            for(var i=0;i<this.allNodes.length;i++){
			    if (this.allNodes[i].style.display != 'none'){
			        this.allNodes[i].style.display = 'none';
			    } else {
			        this.allNodes[i].style.display = '';
			    }            	
            }
            return this;
        },

        css : function(txtCss){ //cssReplace
            for(var i=0;i<this.allNodes.length;i++){
            	this.allNodes[i].setAttribute("style", txtCss);
            }
            return this;
        },
        
        cssAdd : function(txtCss){
        	var oldCss = '';
            for(var i=0;i<this.allNodes.length;i++){
            	oldCss = this.allNodes[i].getAttribute("style");
            	this.allNodes[i].setAttribute("style", oldCss + txtCss);
            }
            return this;
        },
        
        deCss : function(){
            for(var i=0;i<this.allNodes.length;i++){
            	//this.allNodes[i].setAttribute("style", "");
            	this.allNodes[i].removeAttribute("style");
            }
            return this;
        },

        nodes : function(){	//warning: unchainable method, returns array of selected nodes
        	return this.allNodes;
        },
        
        node : function(index){	//warning: unchainable method, returns single node
        	if(index===undefined) index=0;
        	return this.allNodes[index];
        },

        only : function(index){	//keep only one node in node-array
        	if(this.allNodes.length!==0){
	        	if(index===undefined) index=0;
	        	if(index>=0)
	        		var n = this.allNodes[index];
	        	else
	        		var n = this.allNodes[this.allNodes.length + index];	//-1 gives the last node and so on...
	        	//this.allNodes.length=1;
	        	this.allNodes=[n];
	        }
        	return this;
        },

        after : function(arg){	//arg could be a HTML string or a node
        	if(arg.cloneNode){
				for(var i=0; i<this.allNodes.length; i++)
	        	 	insAfter(this.allNodes[i], arg.cloneNode(true));
	        }else{
	        	for(var i=0; i<this.allNodes.length; i++){
	        		//insAfter(this.allNodes[i], doc.createTextNode(arg));
	        		var frag = Html2DocFrag(arg);
	        		insAfter(this.allNodes[i], frag);
	        	}
	        }
        	return this;
        },
        before : function(arg){	//arg could be a HTML string or a node
        	if(arg.cloneNode){
				for(var i=0; i<this.allNodes.length; i++)
	        	 	insBefore(this.allNodes[i], arg.cloneNode(true));
	        }else{
	        	for(var i=0; i<this.allNodes.length; i++){
	        		//insBefore(this.allNodes[i], doc.createTextNode(arg));
	        		var frag = Html2DocFrag(arg);
	        		insBefore(this.allNodes[i], frag);
	        	}
	        }
        	return this;
        },

		//for append() and prepend() arg can be a HTML string, an element,a DocFragment, or an array of elements
        append : function(arg){
        	 if((typeof arg)==='string'){
        	 	for(var i=0; i<this.allNodes.length; i++){
        	 		var frag = Html2DocFrag(arg);
        	 		this.allNodes[i].appendChild(frag);
        	 	}
        	 }else{
				for(var i=0; i<this.allNodes.length; i++){
	        		if(isArray(arg)){
	        			for(var j=0; j<arg.length; j++){
	        				this.allNodes[i].appendChild(arg[j].cloneNode(true));
	        			}
	        		}else{
	        			this.allNodes[i].appendChild(arg.cloneNode(true));
	        		}
	        	}        	 	
        	 }
        	 return this;
        },
        prepend : function(arg){
        	 if((typeof arg)==='string'){
        	 	for(var i=0; i<this.allNodes.length; i++){
        	 		var frag = Html2DocFrag(arg);
        	 		this.allNodes[i].insertBefore(frag, this.allNodes[i].firstChild);
        	 	}
        	 }else{
				for(var i=0; i<this.allNodes.length; i++){
	        		if(isArray(arg)){
	        			for(var j=0; j<arg.length; j++)
	        				this.allNodes[i].insertBefore(arg[j].cloneNode(true), this.allNodes[i].firstChild);
	        		}else{
	        			this.allNodes[i].insertBefore(arg.cloneNode(true), this.allNodes[i].firstChild);
	        		}
	        	}
        	 }
        	 return this;
        },        

        debug : function(attr, bCopy){
        	if(attr==0) {
        		//do nothing, use to temporarily disable the alerts!
        	} else if(attr=='html' || attr>10){
        		alert(getOuterHTML(docX.documentElement));
        		if(bCopy) clipSetText(getOuterHTML(docX.documentElement));
        	} else if(attr) {
        		if(attr=='class') attr='className';
        		if(attr=='i' || attr==2) attr='innerHTML';
        		if(attr=='text') attr='textContent';
				var a=[];
				for (var i=0; i<this.allNodes.length; i++){
					if(attr=='h' || attr==1)
						a.push(getOuterHTML(this.allNodes[i]));
					else
						a.push(this.allNodes[i][attr]);
				}
				var s = a.join('\n---------------\n');
				alert(this.allNodes.length + ' nodes ['+attr+']:\n\n' + s);
				if(bCopy) clipSetText(s);
        	} else {
	        	var s = this.allNodes.join('\n');
	        	alert(this.allNodes.length + ' nodes:\n\n' + s);
	        	if(bCopy) clipSetText(s);
	        }
	        return this;
        }
    };

	//--------------------------------------------------------------
	/* STATIC METHODS & GETTERS defined on the function not on its prototype */
	/* callable like this: 	$.goX()		not 	$().goX(); */

	//Properties /* TODO: should return object not node */
	//DomConWrapper.body     = docX.body;
	//DomConWrapper.doc      = docX; //alias
	//DomConWrapper.document = docX;
	//DomConWrapper.head     = getHead();
	//DomConWrapper.root     = docX.documentElement; // <html> node
	//DomConWrapper.win      = docX.defaultView; //alias
	//DomConWrapper.window   = docX.defaultView;


	//Methods
	DomConWrapper.addCSS    = addStyleSheet;
	DomConWrapper.addCss    = addStyleSheet; //alias
	DomConWrapper.addJS     = addJScript;
	DomConWrapper.addJs     = addJScript; //alias
	DomConWrapper.clipCopy  = clipSetText; //only usable from privileged code!
	DomConWrapper.clipPaste = clipGetText; //only usable from privileged code!
	DomConWrapper.create    = ceo; //(tagName, {properties})  //returns newly created element node
	DomConWrapper.insBottom = insBottom;
	DomConWrapper.insTop    = insTop;
	DomConWrapper.newText   = newText;
	DomConWrapper.now       = date_time; //formatted date-time string
	DomConWrapper.parse     = Html2DocFrag2;
	DomConWrapper.xhr       = xhr; //(url, fx)
	DomConWrapper.props     = props;
    DomConWrapper.ready     = function(fx){docX.addEventListener('DOMContentLoaded', fx, false);};

	//Properties (Getters & Setters)
	if('defineProperty' in Object){ //ECMAScript 5

		//DOM objects
		Object.defineProperty(DomConWrapper, "win",          { 'get' : getWin } );
		Object.defineProperty(DomConWrapper, "window",       { 'get' : getWin } ); //alias
		Object.defineProperty(DomConWrapper, "doc",          { 'get' : getDoc } );
		Object.defineProperty(DomConWrapper, "document",     { 'get' : getDoc } ); //alias
		Object.defineProperty(DomConWrapper, "html",         { 'get' : getHTML } );
		Object.defineProperty(DomConWrapper, "head",         { 'get' : getHead } );
		Object.defineProperty(DomConWrapper, "body",         { 'get' : getBody } );
		
		//document wide collections
		Object.defineProperty(DomConWrapper, "links",        { 'get' : getLinks } );
		Object.defineProperty(DomConWrapper, "images",       { 'get' : getImages } );
		Object.defineProperty(DomConWrapper, "forms",        { 'get' : getForms } );
		Object.defineProperty(DomConWrapper, "linkImages",   { 'get' : getLinkImages } );
		Object.defineProperty(DomConWrapper, "imageLinks",   { 'get' : getImageLinks } );
		Object.defineProperty(DomConWrapper, "comments",     { 'get' : getComments } );
		Object.defineProperty(DomConWrapper, "texts",        { 'get' : getTexts } );
		Object.defineProperty(DomConWrapper, "scripts",      { 'get' : getScripts } );
		Object.defineProperty(DomConWrapper, "styles",       { 'get' : getStyles } );
		Object.defineProperty(DomConWrapper, "linkedStyles", { 'get' : getLinkedStyles } );

		//String, ergo unchainable!
		//source of entire document <html>...</html>
		Object.defineProperty(DomConWrapper, "HTML",         { 'get' : getHtmlSource } ); //confusing?
		Object.defineProperty(DomConWrapper, "source",       { 'get' : getHtmlSource } );
		Object.defineProperty(DomConWrapper, "url",     { get: getUrl,     set: setUrl } );

		//Number, ergo unchainable!
		Object.defineProperty(DomConWrapper, "counter", { get: getCounter, set: setCounter } );

	}else{
		//older versions of firefox
		DomConWrapper.__defineGetter__('images', getImages);
		DomConWrapper.__defineGetter__('links' , getLinks);
		DomConWrapper.__defineGetter__('HTML'  , getHTML);
		//todo...
	}


	//--------------------------------------------------------------


    return DomConWrapper;


};
