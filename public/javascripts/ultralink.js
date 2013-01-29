/*!
ultralink.js 0.8.29
Copyright 2012-2013 Aoren LLC All rights reserved.
*/

(function(){

if( window.top != window ){ return; }

var Ultralink = {}

var ulVersion = "26";
var ulVersionString = "0.8.29";

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(i,m){var p={},h=p.lib={},n=h.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;b&&c.mixIn(b);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),o=h.WordArray=n.extend({init:function(a,b){a=
this.words=a||[];this.sigBytes=b!=m?b:4*a.length},toString:function(a){return(a||e).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,a=a.sigBytes;this.clamp();if(d%4)for(var f=0;f<a;f++)b[d+f>>>2]|=(c[f>>>2]>>>24-8*(f%4)&255)<<24-8*((d+f)%4);else if(65535<c.length)for(f=0;f<a;f+=4)b[d+f>>>2]=c[f>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=i.ceil(b/4)},clone:function(){var a=
n.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*i.random()|0);return o.create(b,a)}}),q=p.enc={},e=q.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;d<a;d++){var f=b[d>>>2]>>>24-8*(d%4)&255;c.push((f>>>4).toString(16));c.push((f&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return o.create(c,b/2)}},g=q.Latin1={stringify:function(a){for(var b=
a.words,a=a.sigBytes,c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return o.create(c,b)}},j=q.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},k=h.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=o.create();
this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,f=this.blockSize,e=d/(4*f),e=a?i.ceil(e):i.max((e|0)-this._minBufferSize,0),a=e*f,d=i.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(c,g);g=c.splice(0,a);b.sigBytes-=d}return o.create(g,d)},clone:function(){var a=n.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});h.Hasher=k.extend({init:function(){this.reset()},
reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=k.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}});var l=p.algo={};return p}(Math);
(function(){var i=CryptoJS,m=i.lib,p=m.WordArray,m=m.Hasher,h=[],n=i.algo.SHA1=m.extend({_doReset:function(){this._hash=p.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(o,i){for(var e=this._hash.words,g=e[0],j=e[1],k=e[2],l=e[3],a=e[4],b=0;80>b;b++){if(16>b)h[b]=o[i+b]|0;else{var c=h[b-3]^h[b-8]^h[b-14]^h[b-16];h[b]=c<<1|c>>>31}c=(g<<5|g>>>27)+a+h[b];c=20>b?c+((j&k|~j&l)+1518500249):40>b?c+((j^k^l)+1859775393):60>b?c+((j&k|j&l|k&l)-1894007588):c+((j^k^l)-
899497514);a=l;l=k;k=j<<30|j>>>2;j=g;g=c}e[0]=e[0]+g|0;e[1]=e[1]+j|0;e[2]=e[2]+k|0;e[3]=e[3]+l|0;e[4]=e[4]+a|0},_doFinalize:function(){var i=this._data,h=i.words,e=8*this._nDataBytes,g=8*i.sigBytes;h[g>>>5]|=128<<24-g%32;h[(g+64>>>9<<4)+15]=e;i.sigBytes=4*h.length;this._process()}});i.SHA1=m._createHelper(n);i.HmacSHA1=m._createHmacHelper(n)})();

// JSON-js
var realJSON;if(!realJSON){realJSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof realJSON.stringify!=="function"){realJSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("realJSON.stringify")}return str("",{"":value})}}if(typeof realJSON.parse!=="function"){realJSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("realJSON.parse")}}}());

function isVersion(left, oper, right)
{
    if( left )
    {
        var pre = /pre/i, replace = /[^\d]+/g, oper = oper || "==", right = right || jQuery().jquery, l = left.replace(replace, ''), r = right.replace(replace, ''), l_len = l.length, r_len = r.length, l_pre = pre.test(left), r_pre = pre.test(right);

        l = (r_len > l_len ? parseInt(l) * ((r_len - l_len) * 10) : parseInt(l));
        r = (l_len > r_len ? parseInt(r) * ((l_len - r_len) * 10) : parseInt(r));

        switch( oper )
        {
            case "==": { return (true == (l == r && (l_pre == r_pre))); }
            case ">=": { return (true == (l >= r && (!l_pre || l_pre == r_pre))); }
            case "<=": { return (true == (l <= r && (!r_pre || r_pre == l_pre))); }
            case  ">": { return (true == (l > r || (l == r && r_pre))); }
            case  "<": { return (true == (l < r || (l == r && l_pre))); }
        }
    }

    return false;
}

var passedOptions = undefined;
var alreadyStarted = false;

var basePath = "";

var pageProtocol = ('https:' == document.location.protocol ? 'https://' : 'http://');

var jQ = undefined;
var oldJQuery = undefined;

function loadCallback( scriptURL )
{
    if( typeof jQuery != "undefined" )
    {
        jQuery.isVersion = isVersion;
        if( !jQuery.isVersion("1.7", ">") )
        {
            jQ = jQuery;

            if( oldJQuery != undefined )
            {
                jQuery.noConflict();

                window.jQuery = oldJQuery;
                oldJQuery = undefined;
            }
        }
    }

    if( (typeof jQ != "undefined") && (typeof Raphael != "undefined") && (passedOptions != undefined) ){ reallyStartUltralink(passedOptions); }
}

function fallbackLoadScript( scriptURL, successCallback )
{
         if( scriptURL == basePath + 'ultralinkLibraries/jquery-min.js'        ){ loadScript( pageProtocol + 'ultralink.me/ultralinkLibraries/jquery-min.js',        successCallback ); }
    else if( scriptURL == basePath + 'ultralinkLibraries/raphael+patch-min.js' ){ loadScript( pageProtocol + 'ultralink.me/ultralinkLibraries/raphael+patch-min.js', successCallback ); }
}

function loadScript( scriptURL, successCallback )
{
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = scriptURL;
    s.onreadystatechange = function()
    {
        if( s.readyState == "loaded" || s.readyState == "complete" )
        {
            if( successCallback ){ successCallback(scriptURL); }
        }
        else if( s.readyState == "uninitialized" )
        {
            fallbackLoadScript(scriptURL, successCallback);
        }
    };
    s.onload  = function(){ if( successCallback ){ successCallback(scriptURL); } }
    s.onerror = function(){ fallbackLoadScript(scriptURL, successCallback); };

    head.appendChild(s);
}

if( !Ultralink.sendExtensionMessage )
{
    Ultralink.sendExtensionMessage = function( type, query )
    {
        var theCommand = document.createElement('command');
        theCommand.setAttribute( 'type', type );
        theCommand.textContent = realJSON.stringify( query );

        var loadedEl = document.getElementsByTagName('ultralinkloaded');
        if( loadedEl.length > 0 ){ loadedEl[0].appendChild(theCommand); }
    }
}

function testCSS(prop){ return prop in document.documentElement.style; }
var isOpera = !!(window.opera && window.opera.version);
var isFirefox = testCSS('MozBoxSizing');
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !isSafari && testCSS('WebkitTransform');
var isIE = /*@cc_on!@*/false || testCSS('msTransform');

// Link Types
var ULLinkTypes = { 'href' : 'Link',
                   'href2' : 'Link 2',
                   'href3' : 'Link 3',
                     'buy' : 'Buy',
                   'video' : 'Video',
            'videoyoutube' : 'YouTube',
               'wikipedia' : 'Wikipedia',
               'mediawiki' : 'MediaWiki',
                'freebase' : 'Freebase',
                     'map' : 'Map',
               'mapgoogle' : 'Google Map',
       'buylinkshareapple' : 'Buy',
               'buyamazon' : 'Buy',
                 'buyebay' : 'Buy',
                    'imdb' : 'IMDB',
                 'manpage' : 'Man Page',
                  'appios' : 'iOS App',
                  'appmac' : 'Mac App',
                'appwebos' : 'webOS App',
              'appandroid' : 'Android App',
              'appwindows' : 'Windows App',
                'facebook' : 'Facebook',
                 'twitter' : 'Twitter',
                'linkedin' : 'LinkedIn',
                  'github' : 'GitHub',
            'searchgoogle' : 'Google Search',
             'searchyahoo' : 'Yahoo Search',
              'searchbing' : 'Bing Search',
                  'search' : 'Search' };

var linkDetectors = Array()
linkDetectors["(\.png|\.jpeg|\.jpg|\.gif|\.tiff|\.svg)$"]         = "image";
linkDetectors["http://gravatar\.com/avatar/"]                     = "image";
linkDetectors["http://.*wikipedia\.org/wiki/(?!(User|Wikipedia|File|MediaWiki|Template|Help|Category|Portal|Book|Education_Program|TimedText)(_talk)?:)"] = "wikipedia";
linkDetectors[".*freebase\.com"]                                  = "freebase";
linkDetectors["http://www\.amazon\.com"]                          = "buyamazon";
linkDetectors["http://.*ebay\.com"]                               = "buyebay";
linkDetectors["http://click\.linksynergy\.com.*partnerId%253D30"] = "buylinkshareapple";
linkDetectors["http://click\.linksynergy\.com"]                   = "buy";
linkDetectors["http://www\.imdb\.com"]                            = "imdb";
linkDetectors["developer\.apple\.com.*/Manpages/"]                = "manpage";
linkDetectors["opengl\.org.*/docs/man/"]                          = "manpage";
linkDetectors["developer\.palm\.com/appredirect"]                 = "appwebos";
linkDetectors["http.*linkedin\.com"]                              = "linkedin";
linkDetectors["http.*facebook\.com"]                              = "facebook";
linkDetectors["http.*twitter\.com"]                               = "twitter";
linkDetectors["http.*maps\.google\.com"]                          = "mapgoogle";
linkDetectors["http.*youtube\.com"]                               = "videoyoutube";

// Options
var options = { 'failsafe' : 'true',
             'environment' : 'native',
                'imagesOn' : 'true',
      'searchoneveryuword' : 'true',
              'search_URL' : 'http://www.google.com/search?q=',
          'seperateSearch' : 'false',
              'newWindows' : 'false',
           'proximityFade' : 'true',
               'imagesURL' : pageProtocol + 'ultralink.me/ultralinkImages/',
             'notlivepage' : 'false',
                 'noHover' : 'false',
             'UMAnalytics' : 'true',
       'replaceHyperlinks' : 'false',
               'scanFirst' : 'true',
                 'scanTag' : '.ultralink',
         'previewCallback' : undefined,
                'database' : '',
      'ultralinkMeAccount' : '',
          'ultralinkMeKey' : '',
       'associatedWebsite' : window.location.protocol + "//" + window.location.host,
      'combineLikeButtons' : 'true',
            'inlinePopups' : 'true',
                'iconSide' : 'right',
               'hoverTime' : 100000,
        'hoverRecoverTime' : 0,
             'editorStyle' : 'false',
       'userLanguageOrder' : [],
        'userCountryOrder' : [] };

//
var analyticsInterface = pageProtocol + 'ultralink.me/API/current/analytics/';
var APIInterface = 'https://ultralink.me/API/current/';

var touchInterface = "ontouchstart" in window;

var sections = [];

var mouseDown = 0;
var shiftDown = 0;

var currentUword = undefined;
var pendingPopup;

var ulInlineOut = false;

var currentTimeout;

var currentHoveringLink;

var inlineContentCache = {};

var supportedInlineTypes = ['wikipedia', 'mediawiki', 'twitter', 'videoyoutube', 'mapgoogle', 'ultralinkme'];

var hoverRecover              = false;

var inlineFullX               =       500;
var inlineFullY               =       250;
var inlinePreviewX            =        75;
var inlinePreviewY            =        75;
var inlineArrowX              =        15;
var inlineArrowY              =        30;
var inlineOffsetX             =         3;
var inlineBackColor           =   'black';
var inlineStrokeWidth         =         3;
var inlineStrokeColor         =    '#ddd';
var inlineStrokeOpacity       =       1.0;
var inlinePreviewSpinnerInset =        20;
var inlineFullInset           =        15;
var inlinePopupCorners        =        10;

var iconPreviewStrokeColor    =     'black';
var iconNoPreviewStrokeColor  =   '#33f';
var iconPreviewOutlineOpacity   =      0.45;
var iconNoPreviewOutlineOpacity =      0.5;
var iconOutlineGlowWidth; 

var lowerBoundSize              =       20;
var lowerBoundFontSize          =   '20px';

var generalOpacity            =      0.60; // Opacity of popup and buttons

var rectTopColor              =    '#ccc';
var rectBottomColor           =    '#eee';
var rectStrokeWidth;
var rectStrokeColor           =    '#000';
var rectPaddingX;
var rectPaddingY;
var rectRoundedCorner;
var rectHoleOutsetX;
var rectHoleOutsetY;
var rectPopupOffsetX;
var rectPopupOffsetY;
var rectGlowColor              =    '#000';
var rectGlowOpacity            =      0.12;
var rectGlowWidth;
var rectGlowOffsetY;

var nextStrokeWidth;
var nextStrokeColor           =    '#aaa';
var nextArrowStrokeColor      =    '#fff';

var imageRoundedCorner        =        10;

var fSize;

var buttonTopColor             =    '#bbb';
var buttonTopHighlightColor    =    '#ccc';
var buttonUpperColor           =    '#777';
var buttonUpperHighlightColor  =    '#77b';
var buttonUpperPercentage      =      '45';
var buttonLowerColor           =    '#777';
var buttonLowerHighlightColor  =    '#77b';
var buttonLowerPercentage      =      '55';
var buttonBottomColor          =    '#ccc';
var buttonBottomHighlightColor =    '#ddd';
var buttonStrokeColor          =    '#000';
var buttonStrokeColorHighlight =    '#005';
var buttonStrokeWidth;
var buttonStrokeWidthHighlight;
var buttonRoundedCorner;
var buttonLabelWidth;
var buttonWidth;
var buttonHeight;
var buttonSpacing;
var buttonIconSpacing;

var buttonLabelColor           =    '#fff';
var buttonLabelHighlightColor  =    '#fff';

var fontShrinkage              =       0.9;

function resetConstants()
{
    iconOutlineGlowWidth =            2.48;

	rectStrokeWidth =                    1; // (px)
	rectPaddingX =                       3;
	rectPaddingY =                       3;
	rectRoundedCorner =                 12; // Rounded corner of the popup and hole outset (px)
	rectHoleOutsetX =                  4.5; // How much bigger in X the hole surrouding the word should be (px)
	rectHoleOutsetY =                  4.5; // How much bigger in Y the hole surrouding the word should be (px)
	rectPopupOffsetX =                 5.5; // How much in X the popup should be offset from the word it is surrounding (px)
	rectPopupOffsetY =                 5.5; // How much in Y the popup should be offset from the word it is surrounding (px)
	rectGlowWidth =                      2;
	rectGlowOffsetY =                    1;

	nextStrokeWidth =                  2.5; // (px)

	buttonStrokeWidth =               0.75; // (px)
	buttonStrokeWidthHighlight =      1.75; // (px)
	buttonRoundedCorner =                7; // Rounded corner of the buttons (px)
    buttonLabelWidth =                  45;
	buttonWidth =                       45; // Default button width (px)
	buttonHeight =                      25; // Default button height (px)
	buttonSpacing =                      5; // Spacing between the highlight hole and buttons (px)
	buttonIconSpacing =                  6;
}

function sizeConstants( rS )
{
    iconOutlineGlowWidth       *= rS;
    
    rectStrokeWidth            *= rS;
    rectPaddingX               *= rS;
    rectPaddingY               *= rS;
    rectRoundedCorner          *= rS;
    rectHoleOutsetX            *= rS;
    rectHoleOutsetY            *= rS;
    rectPopupOffsetX           *= rS;
    rectPopupOffsetY           *= rS;
    rectGlowWidth              *= rS;
    rectGlowOffsetY            *= rS;
    
    nextStrokeWidth            *= rS;
    
    buttonStrokeWidth          *= rS;
    buttonStrokeWidthHighlight *= rS;
    buttonRoundedCorner        *= rS;
    buttonLabelWidth           *= rS;
    buttonHeight               *= rS;
    buttonSpacing              *= rS;
    buttonIconSpacing          *= rS;
}

resetConstants();

// General Utilities

function sleep(milliSeconds){ var startTime = new Date().getTime(); while( new Date().getTime() < startTime + milliSeconds ){}; }

function getDomain(url)                 { var result = url.match(RegExp(":\/\/(www[0-9]?\.)?(.[^/:]+)")); if( (result != null) && (result.length >= 2) ){ return result[2]; } return url; }
function getFullDomain(url)             { var result = url.match(RegExp("\:\/\/(.[^/:]+)"));              if( (result != null) && (result.length >= 2) ){ return result[1]  } return url; }
function getFullDomainWithTransport(url){ var result = url.match(RegExp("(.*)\:\/\/(.[^/:]+)"));          if( (result != null) && (result.length >= 2) ){ return result[1] + "://" + result[2]; } return url; }

var getIERE = RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

function getInternetExplorerVersion()
{
    var rv = -1;
    if( navigator.appName == 'Microsoft Internet Explorer' ){ if( getIERE.exec(navigator.userAgent) != null ){ rv = parseFloat( RegExp.$1 ); } }
    return rv;
}

function overrideSettings( userOptions )
{
    if( alreadyStarted == true ){ Ultralink.setOptions( userOptions ); }
                            else{ setTimeout(function(){ overrideSettings( userOptions ); }, 2000 ); }
}

function getStyle(el, cssprop)
{
    var s;
    
    var now = new Date().getTime();
    
    var theStyle = 'style-' + cssprop;
    
    if( (el[theStyle] == undefined) || ((now - el[theStyle + "_ts"]) > 5000) )
    {
        var dv = document.defaultView;
    
             if( dv && dv.getComputedStyle ){ s = dv.getComputedStyle(el, "")[cssprop]; }
        else if( el.currentStyle           ){ s = el.currentStyle[cssprop];             }
                                        else{ s = el.style[cssprop];                    } //try and get inline style

        if( (cssprop == 'fontSize') || (cssprop == 'color') )
        {
            el[theStyle]         = s;
            el[theStyle + "_ts"] = now;
        }
    }
    else
    {
        s = el[theStyle];
    }
    
    return s;
}

function bodyCheck()
{
    var theBody = jQ('body')[0];
    if( theBody != undefined )
    {
        var csp = getStyle(theBody, 'position');
        if( csp != null )
        {                
            if( csp == 'relative' ){ theBody.style.setProperty('position', 'static'); }
        }
    }
}

function linkImageSize( fSize )
{
    var imgSize = 128;
    if( !touchInterface )
    {
        var adjustedFSize = fSize;
        
             if( jQ.browser.webkit  ){ adjustedFSize *= (document.width / jQ(document).width()) * window.devicePixelRatio; }
        else if( jQ.browser.msie    ){ adjustedFSize *= screen.deviceXDPI / screen.logicalXDPI; }
//        else if( jQ.browser.mozilla ){ }
        
             if( adjustedFSize <= 16 ){ imgSize = 16; }
        else if( adjustedFSize <= 32 ){ imgSize = 32; }
        else if( adjustedFSize <= 64 ){ imgSize = 64; }
    }
    else{ imgSize = 64; }

    return imgSize;
}

function setDataUl( el, key, value )
{
    el[key] = value;
    
    var a = el.attributes[key];
    if( a ){ el.attributes[key].value = realJSON.stringify(value); }
}

function getDataUl( el, key )
{
    if( el[key] ){ return el[key]; }
    else
    {
        var a = el.attributes[key];
        if( a )
        {
            var value = realJSON.parse(a.value);
            setDataUl( el, key, value );
            return value;
        }
    }
    
    return undefined;
}

function cumulativeOffset(element)
{
    if( element.getBoundingClientRect )
    {
        var box = element.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        var scrollTop  = window.pageYOffset || docElem.scrollTop  || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        var clientTop  = docElem.clientTop  || body.clientTop  || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        var top  = box.top  + scrollTop  - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return [Math.round(left), Math.round(top)];
    }
    
    var top  = 0;
    var left = 0;

    while( element )
    {
        top  = top  + parseInt(element.offsetTop,  10);
        left = left + parseInt(element.offsetLeft, 10);
        element = element.offsetParent;
    }

    return [left, top];
}

function getElementOffset( el )
{    
    var os;
    
    if( el.umoffset == undefined )
    {
        var uw = jQ(el);

        el.umoffset = uw.offset();
        el.umoffset.width  = uw.width();
        el.umoffset.height = uw.height();
    }
    
    os = el.umoffset;
    
    return os;
}

function elementInView(elem)
{
    var jqw = jQ(window);

    var os = getElementOffset(elem);
    
    var docViewTop = jqw.scrollTop();
        
    if( os.top + os.height < docViewTop                ){ return false; }
    if( os.top             > docViewTop + jqw.height() ){ return false; }

    return true;
}

// Graphics/UI Construction Routines

function rrectPath(x, y, w, h, c) { return "M " + (x + w) + "," + (y + c) + "L " + (x + w) + "," + (y + h - c) + "Q " + (x + w) + "," + (y + h) + "," + (x + w - c) + "," + (y + h) + "L " + (x + c) + "," + (y + h) + "Q " + x + "," + (y + h) + "," + x + "," + (y + h - c) + "L " + x + "," + (y + c) + "Q " + x + "," + y + "," + (x + c) + "," + y + "L " + (x + w - c) + "," + y + "Q " + (x + w) + "," + y + "," + (x + w) + "," + (y + c) +"z"; }
function rrectPath2(x, y, w, h, c){ return "M " + (x + w) + "," + (y + c) + "Q " + (x + w) + "," + y + "," + (x + w - c) + "," + y + "L " + (x + c) + "," + y + "Q " + x + "," + y + "," + x + "," + (y + c) + "L " + x + "," + (y + h - c) + "Q " + x + "," + (y + h) + "," + (x + c) + "," + (y + h) + "L " + (x + w - c) + "," + (y + h) + "Q " + (x + w) + "," + (y + h) + "," + (x + w) + "," + (y + h - c) + "L " + (x + w) + "," + (y + c) +"z"; }

function rrectPathArrowRight(x, y, w, h, c, aX, aY){ return "M" + (x + w) + "," + (y + c) + " L" + (x + w) + "," + (y + h/2 - aY/2) + " L" + (x + w + aX) + "," + (y + h/2) + " L" + (x + w) + "," + (y + h/2 + aY/2) + " L" + (x + w) + "," + (y + h - c) + " Q" + (x + w) + "," + (y + h) + "," + (x + w - c) + "," + (y + h) + " L" + (x + c) + "," + (y + h) + " Q" + x + "," + (y + h) + "," + x + "," + (y + h - c) + " L" + x + "," + (y + c) + " Q" + x + "," + y + "," + (x + c) + "," + y + " L" + (x + w - c) + "," + y + " Q" + (x + w) + "," + y + "," + (x + w) + "," + (y + c) +" z"; }
function  rrectPathArrowLeft(x, y, w, h, c, aX, aY){ return "M" + (x + w) + "," + (y + c) + " L" + (x + w) + "," + (y + h - c) + " Q" + (x + w) + "," + (y + h) + "," + (x + w - c) + "," + (y + h) + " L" + (x + c) + "," + (y + h) + " Q" + x + "," + (y + h) + "," + x + "," + (y + h - c) + " L" + x + "," + (y + h/2 + aY/2) + " L" + (x - aX) + "," + (y + h/2) + " L" + x + "," + (y + h/2 - aY/2) + " L" + x + "," + (y + c) + " Q" + x + "," + y + "," + (x + c) + "," + y + " L" + (x + w - c) + "," + y + " Q" + (x + w) + "," + y + "," + (x + w) + "," + (y + c) +"z"; }
function    rrectPathArrowUp(x, y, w, h, c, aX, aY){ return "M" + (x + w) + "," + (y + c) + " L" + (x + w) + "," + (y + h - c) + " Q" + (x + w) + "," + (y + h) + "," + (x + w - c) + "," + (y + h) + " L" + (x + c) + "," + (y + h) + " Q" + x + "," + (y + h) + "," + x + "," + (y + h - c) + " L" + x + "," + (y + c) + " Q" + x + "," + y + "," + (x + c) + "," + y + " L" + (x + w/2 - aX/2) + "," + y + " L" + (x + w/2) + "," + (y - aY) + " L" + (x + w/2 + aX/2) + "," + y + " L" + " L" + (x + w - c) + "," + y + " Q" + (x + w) + "," + y + "," + (x + w) + "," + (y + c) +" z"; }

function highlightULButton( ulButton )
{
	if( ulButton != undefined )
	{
		ulButton.attr("fill", "90-"+buttonTopHighlightColor+"-"+buttonUpperHighlightColor+":"+buttonUpperPercentage+"-"+buttonLowerHighlightColor+":"+buttonLowerPercentage+"-"+buttonBottomHighlightColor);
		ulButton.attr("stroke-width", buttonStrokeWidthHighlight);
		ulButton.attr("stroke", buttonStrokeColorHighlight);
        
        ulButton.ulLabel.attr("fill", buttonLabelHighlightColor);
	}
}

function unHighlightULButton( ulButton )
{
	if( ulButton != undefined )
	{
		ulButton.attr("fill", "90-"+buttonTopColor+"-"+buttonUpperColor+":"+buttonUpperPercentage+"-"+buttonLowerColor+":"+buttonLowerPercentage+"-"+buttonBottomColor);
		ulButton.attr("stroke-width", buttonStrokeWidth);
		ulButton.attr("stroke", buttonStrokeColor);

        ulButton.ulLabel.attr("fill", buttonLabelColor);
	}
}

function hoverBehavior( nuButton )
{
    if( (currentHoveringLink != undefined) && (currentHoveringLink != nuButton) )
    {
        unHighlightULButton(currentHoveringLink);
    }
    
    currentHoveringLink = nuButton; highlightULButton(currentHoveringLink);
}

function setHoverBehavior(theULImage, nuButton)
{
    theULImage.hover
    (
        function()
        {
            hoverBehavior( nuButton );
        },

        function()
        {

        }
    );
}

function setAsLink( theEl, URL, type, category, word )
{
    theEl.attr("href", URL);
	theEl.attr("cursor", "pointer");
    
    if( options.newWindows == 'true' ){ theEl.node.parentNode.setAttribute("target", "_blank"); }    
    theEl.node.parentNode.setAttribute("type", type);
    theEl.node.parentNode.setAttribute("URL", URL);
    theEl.node.parentNode.setAttribute("category", category);
    theEl.node.parentNode.setAttribute("word", word);
}

function removeOldPopup()
{
    if( currentUword != undefined )
	{
        var uword = currentUword;
        
        if( uword.paper != undefined )
        {
            var P = uword.paper;
            
            checkNewUltralink();
            
            P.myRrect.stop();
            
            var i;
            for( i = 0; i < P.ULButtons.length;    i++ ){ P.ULButtons[i].stop();    jQ.cleanData([ P.ULButtons[i].node.parentNode    ]); }
            for( i = 0; i < P.ULLabels.length;     i++ ){ P.ULLabels[i].stop();     jQ.cleanData([ P.ULLabels[i].node.parentNode     ]); }
            for( i = 0; i < P.ULImages.length;     i++ ){ P.ULImages[i].stop();     jQ.cleanData([ P.ULImages[i].node.parentNode     ]); }
            for( i = 0; i < P.ULImageBacks.length; i++ ){ P.ULImageBacks[i].stop(); jQ.cleanData([ P.ULImageBacks[i].node.parentNode ]); }
            
            if( P.ULthumbnail ){ P.ULthumbnail.stop(); jQ.cleanData([ P.ULthumbnail.node.parentNode ]); }
            
            removeOldInlinePopup();

            P.remove();

            delete uword.paper;
            delete uword.autoPopup;
            
            currentUword = undefined;
            currentHoveringLink = undefined;
            
            ulInlineOut = false;
        }

        if( (uword.baseMatches != undefined) && (uword.baseParents != undefined) )
        {
            for( var matchIndex = 0; matchIndex < uword.baseMatches.length; matchIndex++ )
            {
                uword.baseParents[matchIndex].appendChild(uword.baseMatches[matchIndex]);
            }
            
            delete uword.baseMatches;
            delete uword.baseParents;
        }
	}
}

function removeOldInlinePopup()
{
    if( currentUword != undefined )
    {
        var uword = currentUword;
        
        if( uword.inlinePaper != undefined )
        {
            var iP = uword.inlinePaper;
            
            if( iP.type == 'ultralinkme' ){ checkNewUltralink(); }

            if( iP.inlineDiv != undefined )
            {
                jQ("iframe", iP.inlineDiv).each(function(){ this.setAttribute('src', 'about:blank'); } );
                jQ("iframe", iP.inlineDiv).remove();
                jQ(iP.inlineDiv).remove();
            }
        
            iP.remove();
            delete uword.inlinePaper;

            ulInlineOut = false;
        }
    }
}

function setInlineULImage( theULImage )
{
    if( theULImage != undefined )
    {
        if( currentUword != undefined )
        {
            var uword = currentUword;
            var iP = uword.inlinePaper;
            
            if( (iP != undefined) && (iP.ULImage == theULImage) )
            {
            
            }
            else
            {
                if( (iP != undefined) && (iP.ULImage != undefined) )
                {
                    if( iP.ULImage.outline.previewAvailable == true )
                    {
                        delete iP.ULImage.node.parentNode.removeAttribute("href");
                        if( options.UMAnalytics == 'true' ){ detachClickRecorder(jQ(iP.ULImage.node.parentNode)); }
                        iP.ULImage.outline.attr("stroke", iconPreviewStrokeColor);
                        if( iP.ULImage.outline.outerGlow != undefined ){ iP.ULImage.outline.outerGlow.remove(); }
                        iP.ULImage.outline.outerGlow = iP.ULImage.outline.glow({ color : iconPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconPreviewOutlineOpacity });
                        iP.ULImage.outline.outerGlow.attr("cursor", "pointer");
                    }
                }

                theULImage.outline.attr("stroke", iconNoPreviewStrokeColor);
                if( theULImage.outline.outerGlow != undefined ){ theULImage.outline.outerGlow.remove(); }
                theULImage.outline.outerGlow = theULImage.outline.glow({ color : iconNoPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconNoPreviewOutlineOpacity });
                theULImage.outline.outerGlow.attr("cursor", "pointer");
                                    
                createInlinePopup( theULImage.type, theULImage.URL, theULImage );
            }
        }
    }
}

function removeTextShadowCallout(thisUword)
{
    thisUword.style.textShadow = 'none';
    
    if( (jQ.browser.msie) && (getInternetExplorerVersion() < 10) )
    {
        var ss = thisUword.ieSpan;
        
        ss.style.setProperty('filter', '');
        ss.style.setProperty('display', 'none');
    }
}

function addTextShadowCallout(thisUword, alpha)
{
    var ul = getDataUl( thisUword, 'data-ul' );

    var status = "hit"; if( ul && ul.status ){ status = ul.status; }

    if( (status == "hit") || (options.editorStyle == 'true') )
    {
        var hoverBlurSize   = 7;
        var hoverBlurOffset = 1;

        var fontSize = getStyle(thisUword, 'fontSize');
        var fSize = parseFloat(fontSize); if( fSize < lowerBoundSize ){ fSize = lowerBoundSize; fontSize = lowerBoundFontSize; }
        var relativeSize = fSize/16;

        var thisBlurColor = '51, 51, 255';
        
        if( status != "hit" )
        {
            thisBlurColor = '255, 51, 51';
        }
        else
        {
            var theTextColor = getStyle(thisUword, 'color');
            
            var tc = Raphael.color(theTextColor);
            if( (tc.r * 299 + tc.g * 587 + tc.b * 114)/1000 >= 150 ){ thisBlurColor = '255, 255, 255'; }
        }

        thisUword.style.textShadow = '0px ' + hoverBlurOffset * relativeSize + 'px ' + hoverBlurSize * relativeSize + 'px ' + 'rgba(' + thisBlurColor + ', ' + alpha + ')';
        
        // IE sucks
        if( (jQ.browser.msie) && (getInternetExplorerVersion() < 10) )
        {
            var ss = thisUword.ieSpan;

            if( alpha > 0.99 ){ alpha = 1.0; } // Stupid weird IE bug
        
            ss.style.setProperty('filter', "progid:DXImageTransform.Microsoft.Blur(makeshadow='true', ShadowOpacity=" + alpha + ", pixelradius=" + (10 * alpha) + ")");
            ss.style.setProperty('display', 'inline-block');

            ss.style.setProperty('margin-top',  (-10 * alpha) + 'px');
            ss.style.setProperty('margin-left', (-10 * alpha) + 'px');

            thisUword.style.setProperty('display', 'inline-block');
        }
    }
}

function setShadowCallout( uword, event )
{
    if( uword != pendingPopup )
    {
        var distanceSquared      = 40000.0;
        var distanceCutoffFactor = 1.0; // 1.5

        var os = getElementOffset(uword);

        var dX = event.pageX - (os.left + os.width/2.0);
        var dY = event.pageY - (os.top  + os.height/2.0);

        var d2 = dX*dX + dY*dY;
        
        if( d2 < distanceSquared ){ addTextShadowCallout(uword, (distanceSquared - d2)/(distanceSquared * distanceCutoffFactor)); }
                              else{ removeTextShadowCallout(uword); }
    }
}

function setShadowRipple( uword, event )
{
    if( uword != pendingPopup )
    {
        var distanceRippleSquared      = 80000.0;
        var distanceRippleCutoffFactor = 1.0;
        var rippleFadeRate             = 0.75;

        var os = getElementOffset(uword);

        var dX = event.pageX - (os.left + os.width/2.0);
        var dY = event.pageY - (os.top  + os.height/2.0);

        var d2 = dX*dX + dY*dY;

        if( d2 < distanceRippleSquared )
        {
            var alpha = (distanceRippleSquared - d2)/(distanceRippleSquared * distanceRippleCutoffFactor);
            
            var prefix = '-webkit'; if( jQ.browser.mozilla ){ prefix = '-moz'; }
            
            uword.style.setProperty(prefix + '-transition', '');
            addTextShadowCallout(uword, alpha);

            var thisUword = uword;
            setTimeout(function()
            {
                thisUword.style.setProperty(prefix + '-transition', 'text-shadow ' + rippleFadeRate + 's ease-in');
                addTextShadowCallout(thisUword, 0.0);
            }, 1000);
        }
        else{ removeTextShadowCallout(uword); }
    }
}

function clearAllHighlights()
{
    jQ("uword").each
    (
        function()
        {
            var ul = getDataUl( this, "data-ul" );
            
            if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
            {
                removeTextShadowCallout(this);
            }
        }
    );
}

function highlightVisibleUltralinks()
{
	if( sections.length > 0 )
	{
		for( var s = 0; s < sections.length; s++ )
		{
			if( elementInView(sections[s]) )
			{
				jQ("uword", sections[s]).each( function()
				{
                    var ul = getDataUl( this, "data-ul" );
                    
					if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
					{
						addTextShadowCallout(this, 1.0);
					}
				} );
			}
		}
	}
	else
	{
		var lastHighlightHit = false;
		var firstHighlightHit = false;
							
		jQ("uword").each( function()
		{
			if( lastHighlightHit == false )
			{
                var ul = getDataUl( this, "data-ul" );
				if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
				{
					if( elementInView(this) )
					{
						addTextShadowCallout(this, 1.0);
						firstHighlightHit = true;
					}
					else if( firstHighlightHit == true )
					{
						lastHighlightHit = true;
					}
				}
			}
		} );
	}
}

function repositionPopup( uword )
{
    if( (typeof uword != "undefined") && (uword.paper != undefined) )
    {                
        var nuPosition = cumulativeOffset(uword);
        var deltaLeft = nuPosition[0] - uword.trueOffsetLeft;
        var deltaTop  = nuPosition[1] - uword.trueOffsetTop;

        if( ((nuPosition[0] == 0) || (nuPosition[1] == 0)) && ((deltaLeft != 0) || (deltaTop != 0)) )
        {
            removeOldPopup();
        }
        else
        {
            if( deltaLeft || deltaTop )
            {
                var P  = uword.paper;
                var iP = uword.inlinePaper;
            
                P.canvas.style.setProperty('left', (parseFloat(P.canvas.style['left']) + (deltaLeft)) + 'px');
                P.canvas.style.setProperty('top',  (parseFloat(P.canvas.style['top'])  + (deltaTop )) + 'px');
                
                if( iP != undefined )
                {
                    iP.canvas.style.setProperty('left', (parseFloat(iP.canvas.style['left']) + (deltaLeft)) + 'px');
                    iP.canvas.style.setProperty('top',  (parseFloat(iP.canvas.style['top'])  + (deltaTop )) + 'px');
                    
                    if( iP.inlineDiv != undefined )
                    {
                        iP.inlineDiv.style.setProperty('left', (parseFloat(iP.inlineDiv.style['left']) + (deltaLeft)) + 'px');
                        iP.inlineDiv.style.setProperty('top',  (parseFloat(iP.inlineDiv.style['top'])  + (deltaTop )) + 'px');
                    }
                }
                
                uword.trueOffsetLeft += deltaLeft;
                uword.trueOffsetTop  += deltaTop;
                
                uword.popupX = uword.trueOffsetLeft - rectPopupOffsetX - rectHoleOutsetX - rectPaddingX;
                uword.popupY = uword.trueOffsetTop  - rectPopupOffsetY - rectHoleOutsetY - rectPaddingY - uword.thumbnailH;
            }
        }
    }
}

function checkReposition( uword, time )
{
    if( (currentUword != undefined) && (currentUword == uword) )
    {
        setTimeout( function()
        {
            repositionPopup( uword );
            checkReposition( uword, time + 250 );
        }, time);
    }
}

function createPopup( uword, cm )
{
    if( typeof cm == "undefined" ){ cm = 0; }

    if( options.previewCallback != undefined ){ options.previewCallback(uword, cm); }

    if( (pendingPopup == uword) && (typeof uword != "undefined") )
    {
        clearAllHighlights();

        pendingPopup = undefined;
		
		removeOldPopup();
        
		currentUword = uword;
        
        if( options.hoverRecoverTime > 0 ){ hoverRecover = true; }
		
		uword.baseMatches = document.querySelectorAll("base[href]");
		uword.baseParents = [];
		for( var matchIndex = 0; matchIndex < uword.baseMatches.length; matchIndex++ )
		{
			baseParents[matchIndex] = uword.baseMatches[matchIndex].parentNode;
			baseParents[matchIndex].removeChild(uword.baseMatches[matchIndex]);
		}

		resetConstants();
        
        var cmID = ""; if( cm > 0 ){ cmID = "_" + cm; }
        
        var ul = getDataUl( uword, "data-ul" + cmID);

        if( options.searchoneveryuword == 'true' )
        {
            if( !((ul['nosearch']) && (ul['nosearch'] == 'true')) )
            {
                delete ul['URLS']['searchgoogle'];
                delete ul['URLS']['searchyahoo'];
                delete ul['URLS']['searchbing'];
                delete ul['URLS']['search'];

                if( options.seperateSearch == 'true' )
                {
                    ul['URLS']['searchgoogle'] = [{ 'URL' : 'http://www.google.com/search?q='   + uword.textContent }];
                    ul['URLS']['searchyahoo']  = [{ 'URL' : 'http://search.yahoo.com/search?p=' + uword.textContent }];
                    ul['URLS']['searchbing']   = [{ 'URL' : 'http://www.bing.com/search?q='     + uword.textContent }];
                }
                else
                {                        
                    ul['URLS']['search']       = [{ 'URL' : options.search_URL                  + uword.textContent }];
                }
            }
        }

        var numOfImageLinks  = 0;
        var numOfNormalLinks = 0;
        var numOfAppLinks    = 0;
        var numOfBuyLinks    = 0;
        var numOfSocialLinks = 0;
        var numOfRefLinks    = 0;
        var numOfVideoLinks  = 0;
        var numOfSearchLinks = 0;
                
        var imageLinks  = {};
        var normalLinks = {};
        var appLinks    = {};
        var buyLinks    = {};
        var socialLinks = {};
        var refLinks    = {};
        var videoLinks  = {};
        var searchLinks = {};

        var numOfButtons = 0;
        var maxNumOfLikeButtons = 0;
    
        for( var type in ul['URLS'] )
        {
            var typeURLS = ul['URLS'][type];

            var url = undefined;

            for( var l = 0; l < options.userLanguageOrder.length; l++ )
            {
                var language = options.userLanguageOrder[l];
                for( var u = 0; u < typeURLS.length; u++ ){ if( language == typeURLS[u].language ){ url = typeURLS[u]; break; } }
                if( url != undefined ){ break; }
            }

            if( url == undefined )
            {
                for( var l = 0; l < options.userCountryOrder.length; l++ )
                {
                    var country = options.userCountryOrder[l];
                    for( var u = 0; u < typeURLS.length; u++ ){ if( country == typeURLS[u].country ){ url = typeURLS[u]; break; } }
                    if( url != undefined ){ break; }
                }
            }
            
            if( url == undefined )
            {
                for( var u = 0; u < typeURLS.length; u++ ){ if( !typeURLS[u].language && !typeURLS[u].country ){ url = typeURLS[u]; break; } }
                
                if( (url == undefined) && (typeURLS.length > 0) ){ url = typeURLS[0]; }
            }

            if( url != undefined )
            {
                if( window.location.href != url.URL )
                {
                    switch( type )
                    {
                        case 'image':        { imageLinks[type]  = url.URL; numOfImageLinks++; } break;
                        
                        case 'href':
                        case 'href2':
                        case 'href3':        { normalLinks[type] = url.URL; numOfNormalLinks++; numOfButtons++; } break;
                        
                        case 'appios':
                        case 'appmac':
                        case 'appwebos':
                        case 'appandroid':
                        case 'appwindows':   { appLinks[type]    = url.URL; numOfAppLinks++;    numOfButtons++; } break;
                        
                        case 'buy':
                        case 'buylinkshareapple':
                        case 'buyamazon':
                        case 'buyebay':      { buyLinks[type]    = url.URL; numOfBuyLinks++;    numOfButtons++; } break;
                        
                        case 'twitter':
                        case 'linkedin':
                        case 'facebook':     { socialLinks[type] = url.URL; numOfSocialLinks++; numOfButtons++; } break;
                        
                        case 'wikipedia':
                        case 'mediawiki':
                        case 'imdb':
                        case 'github':
                        case 'freebase':
                        case 'manpage':
                        case 'map':
                        case 'mapgoogle':    { refLinks[type]    = url.URL; numOfRefLinks++;    numOfButtons++; } break;
                        
                        case 'video':
                        case 'videoyoutube': { videoLinks[type]  = url.URL; numOfVideoLinks++;  numOfButtons++; } break;
                        
                        case 'search':
                        case 'searchgoogle':
                        case 'searchyahoo':
                        case 'searchbing':   { searchLinks[type] = url.URL; numOfSearchLinks++; numOfButtons++; } break;
                    }
                }
            }
        }

        if( options.combineLikeButtons == 'true' )
        {
            if( numOfNormalLinks > 1 ){ numOfButtons -= numOfNormalLinks - 1; }
            if( numOfAppLinks    > 1 ){ numOfButtons -= numOfAppLinks    - 1; }
            if( numOfBuyLinks    > 1 ){ numOfButtons -= numOfBuyLinks    - 1; }
            if( numOfSocialLinks > 1 ){ numOfButtons -= numOfSocialLinks - 1; }
            if( numOfRefLinks    > 1 ){ numOfButtons -= numOfRefLinks    - 1; }
            if( numOfVideoLinks  > 1 ){ numOfButtons -= numOfVideoLinks  - 1; }
            if( numOfSearchLinks > 1 ){ numOfButtons -= numOfSearchLinks - 1; }
        }
        
        if( numOfNormalLinks > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfNormalLinks; }
        if( numOfAppLinks    > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfAppLinks;    }
        if( numOfBuyLinks    > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfBuyLinks;    }
        if( numOfSocialLinks > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfSocialLinks; }
        if( numOfRefLinks    > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfRefLinks;    }
        if( numOfVideoLinks  > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfVideoLinks;  }
        if( numOfSearchLinks > maxNumOfLikeButtons ){ maxNumOfLikeButtons = numOfSearchLinks; }

        if( numOfButtons )
        {
			var fontSize = getStyle(uword, 'fontSize');
			fSize = parseFloat(fontSize); if( fSize < lowerBoundSize ){ fSize = lowerBoundSize; fontSize = lowerBoundFontSize; }
			var relativeSize = fSize/16;

            sizeConstants( relativeSize )
            buttonWidth = buttonLabelWidth;

            var iconSpace = fSize + buttonIconSpacing + buttonIconSpacing; //if( (options.combineLikeButtons == 'true') && (maxNumOfLikeButtons > 1) ){ iconSpace *= maxNumOfLikeButtons; }
			if( options.imagesURL != "" ){ buttonWidth += iconSpace; }
			
            uword.multipleUltralinks = false;
            
            var wordLineWidth = uword.offsetWidth;

            if( (options.imagesOn == 'true') && getDataUl( uword, "data-ul" + cmID ) )
            {
                wordLineWidth += iconSpace;
                
                if( getDataUl( uword, "data-ul_1" ) )
                {
                    wordLineWidth += fSize + buttonIconSpacing;
                    uword.multipleUltralinks = true;
                }
            }
            
            var popupWidth  = buttonWidth; if( wordLineWidth + rectHoleOutsetX*2 > popupWidth ){ buttonWidth = wordLineWidth + rectHoleOutsetX*2; popupWidth = wordLineWidth + rectHoleOutsetX*2;  } popupWidth += rectPopupOffsetX*2;
            var popupHeight = rectPopupOffsetY + uword.offsetHeight + (rectHoleOutsetY*2) + buttonSpacing + (buttonHeight + buttonSpacing) * numOfButtons;

            uword.thumbnailH = 0;
            uword.actualThumbnailH = 0;
			if( (options.imagesOn == 'true') && (numOfImageLinks > 0) ){ uword.thumbnailH = (buttonWidth+rectPopupOffsetY+rectPaddingY/2.0); }
			
            var truePosition = cumulativeOffset(uword);
            uword.trueOffsetLeft = truePosition[0];
            uword.trueOffsetTop  = truePosition[1];
            uword.popupX = uword.trueOffsetLeft - rectPopupOffsetX - rectHoleOutsetX - rectPaddingX;
            uword.popupY = uword.trueOffsetTop  - rectPopupOffsetY - rectHoleOutsetY - rectPaddingY - uword.thumbnailH;
                        
            if( !uword.paper ){ uword.paper = new Raphael( uword.popupX, uword.popupY, popupWidth + rectPaddingX*2, popupHeight + rectPaddingY + uword.thumbnailH + rectPaddingX ); }
            var P = uword.paper;
            
            P.myRrect = P.path(rrectPath(rectPaddingX, rectPaddingY+uword.thumbnailH, popupWidth, popupHeight, rectRoundedCorner) + rrectPath2(rectPopupOffsetX+rectPaddingX, rectPopupOffsetY+rectPaddingY+uword.thumbnailH, uword.offsetWidth+(rectHoleOutsetX*2), uword.offsetHeight+(rectHoleOutsetY*2), rectRoundedCorner));
            P.myRrect.attr("opacity", generalOpacity);
            P.myRrect.attr("stroke-opacity", generalOpacity);
            P.myRrect.attr("fill", "90-" + rectTopColor + ":" + ((numOfButtons-0.5)/(numOfButtons+1.0)*100) + "-" + rectBottomColor);
            P.myRrect.attr("stroke-width", rectStrokeWidth);
            P.myRrect.attr("stroke", rectStrokeColor);
			
            P.myRrect.node.parentNode.style.setProperty('-webkit-font-smoothing', "subpixel-antialiased");
            P.myRrect.node.parentNode.style.zIndex = "2147483645";
            
            P.ULButtons      = [];
            P.ULLabels       = [];
            P.ULImages       = [];
            P.ULImageBacks   = [];
            P.ULImageNumbers = [];
            
            var widestButton = buttonWidth;

            var xButtonOffset = rectPopupOffsetX + rectPaddingX;
            
            var yButtonOffset = rectPopupOffsetY + uword.offsetHeight + (rectHoleOutsetY*2) + rectPaddingY + uword.thumbnailH + buttonSpacing;
            var yLabelOffset  = yButtonOffset + buttonHeight/2;

            function makeTypeButtons( theLinks, numLinks, labelName )
            {
                var interiorWidth = 0;

                function makeULButton( actualLinks )
                {
                    var nuButton = P.path(rrectPath(xButtonOffset, yButtonOffset, buttonWidth, buttonHeight, buttonRoundedCorner));
                    nuButton.attr("opacity", generalOpacity);
                    nuButton.attr("stroke-opacity", generalOpacity);
                    nuButton.attr("fill", "90-" + buttonTopColor + "-" + buttonUpperColor + ":" + buttonUpperPercentage + "-" + buttonLowerColor + ":" + buttonLowerPercentage + "-" + buttonBottomColor);
                    nuButton.attr("stroke", buttonStrokeColor);
                    nuButton.attr("stroke-width", buttonStrokeWidth);
                    
                    nuButton.bX = xButtonOffset;
                    nuButton.bY = yButtonOffset;
                    nuButton.bW = buttonWidth;
                    nuButton.bH = buttonHeight;
                    
                    var firstType;
                    var firstURL;
                    
                    for( var fType in actualLinks ){ firstType = fType; firstURL = actualLinks[firstType]; break; }

                    if( !touchInterface )
                    {
                        nuButton.hover
                        (
                            function()
                            {
                                hoverBehavior( nuButton );
                            },
                            
                            function( event )
                            {
                                var pX = parseFloat(P.canvas.style['left']);
                                var pY = parseFloat(P.canvas.style['top']);

                                if( (event.pageX <= pX + this.bX )           ||
                                    (event.pageX >  pX + this.bX + this.bW ) ||
                                    (event.pageY <= pY + this.bY )           ||
                                    (event.pageY >  pY + this.bY + this.bH) )
                                {
                                    unHighlightULButton( currentHoveringLink );
                                }
                            }
                        );
                    }
                        
                    setAsLink(nuButton, firstURL, firstType, ul.category, uword.textContent);
                    attachClickRecorder(nuButton.node.parentNode);
                    
                    function makeULLabel(x, textAnchor)
                    {
                        var nuLabel = P.text(x, yLabelOffset, labelName);
                        nuLabel.attr({'text-anchor': textAnchor});
                        nuLabel.attr("fill", buttonLabelColor);
                            
                        var tspans = nuLabel.node.getElementsByTagNameNS("http://www.w3.org/2000/svg", "tspan");

                        for( var i = 0; i < tspans.length; i++ )
                        {
                            var tspan = tspans.item(i);

                            tspan.style.setProperty('font-family', 'Arial');
                            tspan.style.setProperty('font-size', (fSize*fontShrinkage) + 'px');
                        }

                        nuLabel.attr("font-size", (fSize*fontShrinkage) + 'px' );

                        if( !touchInterface )
                        {
                            nuLabel.hover
                            (
                                function()
                                {
                                    if( (currentHoveringLink != undefined) && (currentHoveringLink != nuButton) )
                                    {
                                        unHighlightULButton(currentHoveringLink);
                                    }
                                    
                                    currentHoveringLink = nuButton;
                                    highlightULButton(currentHoveringLink);
                                }
                            );
                        }

                        return nuLabel;
                    }
                    
                    if( options.imagesURL != "" )
                    {
                        var totalIconSpace = buttonIconSpacing;
                        
                        var imagek = P.ULImages.length;
                        var imageNumber = 0;
                        
                        for( var type in actualLinks )
                        {
                            var actualType = type;
                            var URL = actualLinks[actualType];
                            
                            var theRR = P.rect(xButtonOffset + totalIconSpace, yLabelOffset - (fSize/2.0), fSize, fSize, fSize * .17742);
                            theRR.attr("cursor", "pointer");

                            var theULImage = P.image(options.imagesURL + actualType.replace(RegExp("[0-9]$", "g"), "") + "Link" + linkImageSize(fSize) + ".png", xButtonOffset + totalIconSpace, yLabelOffset - (fSize/2.0), fSize, fSize);
                            
                            theULImage.outline = theRR;
                            
                            theULImage.type     = type;
                            theULImage.URL      = URL;
                            theULImage.nuButton = nuButton;
                            
                            setAsLink(theULImage, URL, actualType, ul.category, uword.textContent);

                            if( !touchInterface ){ setHoverBehavior(theULImage, nuButton); }

                            if( (jQ.inArray( theULImage.type, supportedInlineTypes ) != -1) && (options.inlinePopups == 'true') )
                            {
                                theRR.previewAvailable = true;

                                delete theULImage.node.parentNode.removeAttribute("href");
                                                
                                theULImage.mouseup( function( event ){ setInlineULImage( this ); });
                                
                                if( uword.autoPopup == theULImage.type )
                                {
                                    var autoType = theULImage.type;
                                    var autoURL  = theULImage.URL;
                                    var auto     = theULImage;
                                    
                                    setTimeout( function(){ createInlinePopup( autoType, autoURL, auto ); }, 100);
                                }
                            }
                            else
                            {
                                theRR.previewAvailable = false;

                                attachClickRecorder(theULImage.node.parentNode);
                            }

                            P.ULImages[imagek]     = theULImage;
                            P.ULImageBacks[imagek] = theRR;

                            imagek++;
                            imageNumber++;
                            
                            totalIconSpace += fSize + buttonIconSpacing;
                        }
                        
                        P.ULImageNumbers.push(imageNumber);

                             if( options.iconSide == 'left'  ){ nuButton.ulLabel = makeULLabel(xButtonOffset + totalIconSpace,    'start'); }
                        else if( options.iconSide == 'right' ){ nuButton.ulLabel = makeULLabel(xButtonOffset + buttonIconSpacing, 'start'); }
                    }
                    else
                    {
                        nuButton.ulLabel = makeULLabel(xButtonOffset + buttonWidth/2, 'middle');
                    }

                    var theULLabel = nuButton.ulLabel;
                        
                    setAsLink(theULLabel, firstURL, firstType, ul.category, uword.textContent);
                    if( !touchInterface ){ setHoverBehavior(theULLabel, nuButton); }
                    
                    attachClickRecorder(theULLabel.node.parentNode);
                    theULLabel.node.parentNode.setAttribute("style", "text-decoration: none;");

                    P.ULLabels.push(theULLabel);
                    
                    interiorWidth = (buttonIconSpacing*2) + theULLabel.getBBox().width;
                    if( options.imagesURL != "" ){ interiorWidth += (fSize + buttonIconSpacing) * numLinks; }
                    if( interiorWidth > widestButton ){ widestButton = interiorWidth; }
                    
                    yButtonOffset += buttonHeight + buttonSpacing;
                    yLabelOffset = yButtonOffset + buttonHeight/2;

                    return nuButton;
                }

                if( (numLinks > 1) && (options.combineLikeButtons == 'true') )
                {
                    P.ULButtons.push( makeULButton(theLinks) );
                }
                else
                {
                    for( type in theLinks )
                    {
                        if( type in ULLinkTypes )
                        {
                            var url = theLinks[type]; 
                            var actualLinks = {}; actualLinks[type] = url;
                            
                            labelName = ULLinkTypes[type]; if( (type == 'href') || (type == 'href2') || (type == 'href3') ){ labelName = getDomain( url ); }

                            P.ULButtons.push( makeULButton(actualLinks) );
                        }
                    }
                }
            }

            makeTypeButtons( normalLinks, numOfNormalLinks,     'Links' );
            makeTypeButtons(    appLinks,    numOfAppLinks,       'App' );
            makeTypeButtons(    buyLinks,    numOfBuyLinks,       'Buy' );
            makeTypeButtons( socialLinks, numOfSocialLinks,    'Social' );
            makeTypeButtons(    refLinks,    numOfRefLinks, 'Reference' );
            makeTypeButtons(  videoLinks,  numOfVideoLinks,     'Video' );
            makeTypeButtons( searchLinks, numOfSearchLinks,    'Search' );
            
            // We need to do a reposition
            if( widestButton > buttonWidth )
            {
                var thumbnailDelta = uword.thumbnailH;
                
                buttonWidth = widestButton;
                popupWidth = widestButton+rectPopupOffsetX*2;
                if( (options.imagesOn == 'true') && (numOfImageLinks > 0) ){ uword.thumbnailH = (buttonWidth+rectPopupOffsetY+rectPaddingY/2.0); }else{ uword.thumbnailH = 0; }

                thumbnailDelta = uword.thumbnailH - thumbnailDelta;

                P.canvas.style.setProperty('top', (parseFloat(P.canvas.style['top']) - thumbnailDelta) + 'px');
                P.setSize( popupWidth + rectPaddingX*2, popupHeight + rectPaddingY + uword.thumbnailH + rectPaddingX);
                
                uword.popupX = uword.trueOffsetLeft - rectPopupOffsetX - rectHoleOutsetX - rectPaddingX;
                uword.popupY = uword.trueOffsetTop  - rectPopupOffsetY - rectHoleOutsetY - rectPaddingY - uword.thumbnailH;

                P.myRrect.attr("path", rrectPath(rectPaddingX, rectPaddingY+uword.thumbnailH, popupWidth, popupHeight, rectRoundedCorner) + rrectPath2(rectPopupOffsetX+rectPaddingX, rectPopupOffsetY+rectPaddingY+uword.thumbnailH, uword.offsetWidth+(rectHoleOutsetX*2), uword.offsetHeight+(rectHoleOutsetY*2), rectRoundedCorner) );
                
                var k;
                var imagek = 0;
                for( k = 0; k < P.ULButtons.length; k++ )
                {
                    var yBO = rectPopupOffsetY + uword.offsetHeight + (rectHoleOutsetY*2) + rectPaddingY+uword.thumbnailH + buttonSpacing + (buttonHeight + buttonSpacing) * k;

                    P.ULButtons[k].attr('path', rrectPath(rectPopupOffsetX+rectPaddingX, yBO, buttonWidth, buttonHeight, buttonRoundedCorner));
                    P.ULButtons[k].bX = rectPopupOffsetX+rectPaddingX;
                    P.ULButtons[k].bY = yBO;
                    P.ULButtons[k].bW = buttonWidth;
                    P.ULButtons[k].bH = buttonHeight;

                    P.ULLabels[k].attr('y', P.ULLabels[k].attr('y') + thumbnailDelta);
                    
                    if( options.imagesURL != "" )
                    {
                        for( var ik = 0; ik < P.ULImageNumbers[k]; ik++ )
                        {
                            P.ULImages[imagek].attr(    'y', P.ULImages[imagek].attr('y')     + thumbnailDelta);
                            P.ULImageBacks[imagek].attr('y', P.ULImageBacks[imagek].attr('y') + thumbnailDelta);
                                                        
                            imagek++;
                        }
                    }
                }
            }
            
            if( options.iconSide == 'right' )
            {
                var k;
                var imagek = 0;
                for( k = 0; k < P.ULButtons.length; k++ )
                {
                    if( options.imagesURL != "" )
                    {
                        for( var ik = 0; ik < P.ULImageNumbers[k]; ik++ )
                        {
                            P.ULImages[imagek].attr(    'x', P.ULImages[imagek].attr('x')     + buttonWidth - (P.ULImageNumbers[k] * (fSize + buttonIconSpacing)) - buttonIconSpacing);
                            P.ULImageBacks[imagek].attr('x', P.ULImageBacks[imagek].attr('x') + buttonWidth - (P.ULImageNumbers[k] * (fSize + buttonIconSpacing)) - buttonIconSpacing);
                            
                            imagek++;
                        }
                    }
                }
            }
            
            var k;
            var imagek = 0;
            for( k = 0; k < P.ULButtons.length; k++ )
            {
                if( options.imagesURL != "" )
                {
                    for( var ik = 0; ik < P.ULImageNumbers[k]; ik++ )
                    {
                        if( P.ULImageBacks[imagek].previewAvailable == true )
                        {
                            P.ULImageBacks[imagek].attr("stroke", iconPreviewStrokeColor);
                            P.ULImageBacks[imagek].outerGlow = P.ULImageBacks[imagek].glow({ color : iconPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconPreviewOutlineOpacity });
                        }
                        else
                        {
                            P.ULImageBacks[imagek].attr("stroke", iconNoPreviewStrokeColor);
                            P.ULImageBacks[imagek].outerGlow = P.ULImageBacks[imagek].glow({ color : iconNoPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconNoPreviewOutlineOpacity });
                        }
                        
                        P.ULImageBacks[imagek].outerGlow.attr("cursor", "pointer");
                        
                        imagek++;
                    }
                }
            }
                        
            if( (options.imagesURL != "") && (ul.ID) )
            {
                var theRR = P.rect(popupWidth - fSize - buttonSpacing/2.0 - buttonIconSpacing, rectPopupOffsetY+rectPaddingY+uword.thumbnailH + (uword.offsetHeight+(rectHoleOutsetY*2) - fSize)/2.0, fSize, fSize, fSize * .17742);
                theRR.attr("cursor", "pointer");

                P.umLink = P.image(options.imagesURL + "ultralinkmeLink" + linkImageSize(fSize) + ".png", popupWidth - fSize - buttonSpacing/2.0 - buttonIconSpacing, rectPopupOffsetY+rectPaddingY+uword.thumbnailH + (uword.offsetHeight+(rectHoleOutsetY*2) - fSize)/2.0, fSize, fSize);

                P.umLink.outline = theRR;

                P.umLink.type = 'ultralinkme';
                var theDatabase = ""; if( ul.database ){ theDatabase = ul.database + "/"; }
                var umURL = "https://ultralink.me/description/" + theDatabase + ul.ID + "?word=" + uword.textContent;
                P.umLink.URL = umURL;

                setAsLink(P.umLink, umURL, 'ultralinkme', ul.category, uword.textContent);
                                
                if( options.inlinePopups == 'true' )
                {
                    theRR.attr("stroke", iconPreviewStrokeColor);
                    theRR.outerGlow = theRR.glow({ color : iconPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconPreviewOutlineOpacity });

                    theRR.previewAvailable = true;

                    P.umLink.node.parentNode.removeAttribute("href");
                    
                    P.umLink.mouseup( function( event ){ setInlineULImage( this ); });
                }
                else
                {
                    theRR.attr("stroke", iconNoPreviewStrokeColor);
                    theRR.outerGlow = theRR.glow({ color : iconNoPreviewStrokeColor, width: iconOutlineGlowWidth, opacity: iconNoPreviewOutlineOpacity });

                    theRR.previewAvailable = false;

                    attachClickRecorder(P.umLink.node.parentNode);
                }

                if( uword.multipleUltralinks == true )
                {
                    var circleX = rectPopupOffsetX+rectPaddingX + uword.offsetWidth+(rectHoleOutsetX*2) + fSize/2.0 + buttonIconSpacing * 0.87;
                    var circleY = rectPopupOffsetY+rectPaddingY+uword.thumbnailH + (uword.offsetHeight+(rectHoleOutsetY*2))/2.0;
                
                    P.nextUltralink = P.circle( circleX, circleY, fSize/2.0);
                    P.nextUltralink.attr("opacity", generalOpacity);
                    P.nextUltralink.attr("stroke-width", nextStrokeWidth);
                    P.nextUltralink.attr("stroke", nextStrokeColor);
                    P.nextUltralink.attr("fill", "90-" + rectTopColor + ":" + ((numOfButtons-0.5)/(numOfButtons+1.0)*100) + "-" + rectBottomColor);
                    P.nextUltralink.glow({color: rectGlowColor, width: rectGlowWidth, opacity: rectGlowOpacity, offsety: rectGlowOffsetY});
                    P.nextUltralink.attr("cursor", "pointer");
                    P.nextUltralink.mouseup( function( event ){ alternatePopup( uword, cm ); });
                
                    P.nextArrow = P.path( "M" + (circleX - fSize/4.0 + fSize/8.0) + "," + (circleY - fSize/4.0) + " L" + (circleX + fSize/8.0) + "," + circleY + " L" + (circleX - fSize/4.0 + fSize/8.0) + "," + (circleY + fSize/4.0) );
                    P.nextArrow.attr("stroke-width", nextStrokeWidth);
                    P.nextArrow.attr("stroke", nextArrowStrokeColor);
                    P.nextArrow.attr("cursor", "pointer");
                    P.nextArrow.mouseup( function( event ){ alternatePopup( uword, cm ); });
                }
            }
            
            P.myRrect.glow({color: rectGlowColor, width: rectGlowWidth, opacity: rectGlowOpacity, offsety: rectGlowOffsetY});

			if( (options.imagesOn == 'true') && (numOfImageLinks > 0) )
			{                
				var imageURL = imageLinks['image'];
				var thumbnail = new Image();
                
				thumbnail.onload = function()
				{
                    if( uword == currentUword )
                    {
						var baseMatches2 = document.querySelectorAll("base[href]");
						var baseParents2 = [];
						for( var matchIndex = 0; matchIndex < baseMatches2.length; matchIndex++ )
						{
							baseParents2[matchIndex] = baseMatches2[matchIndex].parentNode;
							baseParents2[matchIndex].removeChild(baseMatches2[matchIndex]);
						}
					
							var wOffset = 0;
							var hOffset = 0;
							var nuWidth = thumbnail.width;
							var nuHeight = thumbnail.height;
                            uword.actualThumbnailH = uword.thumbnailH;
							if( nuWidth > nuHeight ){ nuHeight *= buttonWidth/nuWidth;   nuWidth = buttonWidth; hOffset = (buttonWidth - nuHeight);     uword.actualThumbnailH = nuHeight+rectPopupOffsetY+rectPaddingY/2.0; }
												else{ nuWidth  *= buttonWidth/nuHeight; nuHeight = buttonWidth; wOffset = (buttonWidth -  nuWidth)/2.0; }

							// For images with alpha it looks better to add a radial alpha gradient elipse the same color as the top of the popup
							P.ULback = P.ellipse(rectPopupOffsetX+rectPaddingX+wOffset + nuWidth/2, rectPopupOffsetY+rectPaddingY+hOffset + nuHeight/2, nuWidth/2, nuHeight/2 );
							P.ULback.attr("fill", "r" + rectBottomColor + "-" + rectBottomColor + "-" + rectBottomColor + "-" + rectBottomColor);
							P.ULback.attr("opacity", 0);
							P.ULback.attr("stroke-opacity", 0);

							P.ULthumbnail = P.image(imageURL, rectPopupOffsetX+rectPaddingX+wOffset, rectPopupOffsetY+rectPaddingY+hOffset, nuWidth, nuHeight );
							P.myRrect.attr("path", rrectPath(rectPaddingX, rectPaddingY+(uword.thumbnailH-uword.actualThumbnailH), popupWidth, popupHeight+uword.actualThumbnailH, rectRoundedCorner) + rrectPath2(rectPopupOffsetX+rectPaddingX, rectPopupOffsetY+rectPaddingY+uword.thumbnailH, uword.offsetWidth+(rectHoleOutsetX*2), uword.offsetHeight+(rectHoleOutsetY*2), rectRoundedCorner) );
							var popupPercent = (numOfButtons-0.5)/(numOfButtons+1.0);
							var fullToPopupRatio = (popupHeight+uword.actualThumbnailH)/(popupHeight);
							var gradientPercent = (popupPercent/fullToPopupRatio)*100;
							P.myRrect.attr("fill", "90-" + rectTopColor + ":" + gradientPercent + "-" + rectBottomColor);
							
							var SVG_NS = "http://www.w3.org/2000/svg";
							var cpe = document.createElementNS(SVG_NS, 'clipPath');
							cpe.setAttribute('id', 'imageClippath');

								P.theR = document.createElementNS(SVG_NS, 'rect');
								P.theR.setAttribute('x', rectPopupOffsetX+rectPaddingX+wOffset);
								P.theR.setAttribute('y', rectPopupOffsetY+rectPaddingY+hOffset);
								P.theR.setAttribute('rx', imageRoundedCorner);
								P.theR.setAttribute('ry', imageRoundedCorner);
								P.theR.setAttribute('width', nuWidth);
								P.theR.setAttribute('height', nuHeight);

							cpe.appendChild(P.theR);
							P.canvas.appendChild(cpe);
							P.ULthumbnail.node.setAttribute('clip-path', 'url(#imageClippath)');
                            P.ULthumbnail.attr("href", imageURL);

						for( var matchIndex = 0; matchIndex < baseMatches2.length; matchIndex++ )
						{
							baseParents2[matchIndex].appendChild(baseMatches2[matchIndex]);
						}
                    }
				};
				
				thumbnail.onerror = function()
				{
					uword.thumbnailH = 0;
				};

                thumbnail.src = imageURL;
			}

            setTimeout( function()
            {
                if( (ul.ID && (ul.ID == -1)) || (uword.autoPopup == 'ultralinkme') ){ setInlineULImage( P.umLink ); }
            }, 100);
            
            checkReposition( uword, 250 );
        }
        else
        {
            currentUword = undefined;
        }		
    }
}

// Events Routines

function recordClick(event, target)
{
    var type     = target.parentNode.getAttribute('type');     if(     !type ){ type     = target.parentNode.parentNode.getAttribute('type');     }
    var category = target.parentNode.getAttribute('category'); if( !category ){ category = target.parentNode.parentNode.getAttribute('category'); }
    
    var URL  = target.parentNode.getAttribute('URL');  if(  (URL == undefined) ||  (URL == null) ){  URL = target.parentNode.parentNode.getAttribute('URL');  } if(   (URL == undefined) ||  (URL == null) ){  URL = target.getAttribute('URL');  }
    var word = target.parentNode.getAttribute('word'); if( (word == undefined) || (word == null) ){ word = target.parentNode.parentNode.getAttribute('word'); } if(  (word == undefined) || (word == null) ){ word = target.getAttribute('word'); }

    var clickType = "addClickHyperlink"; if( type ){ clickType = "addClick"; }
    var sendString = "ULWord=" + encodeURIComponent(word) + "&ULLink=" + encodeURIComponent(URL) + "&ULReferrer=" + encodeURIComponent(window.location.href) + "&ULReferrerTitle=" + encodeURIComponent(document.title);
    if(     type ){ sendString += "&ULType="     + encodeURIComponent(type);     }
    if(	category ){ sendString += "&ULCategory=" + encodeURIComponent(category); }
    sendString += "&ultralinkMeAccount=" + encodeURIComponent(options.ultralinkMeAccount);
    sendString += "&ultralinkMeKey=" + encodeURIComponent(options.ultralinkMeKey);
    sendString += "&associatedWebsite=" + encodeURIComponent(options.associatedWebsite);

    var result = false;

    if( jQ.browser.mozilla || touchInterface )
    {
        target.alreadyTracked = 'true';
        jQ.ajax({ async:false, type: 'GET', url: analyticsInterface + clickType, data: sendString, dataType: 'json', success: function(){ result = true; }, error: function(){ result = true; } });
    }
    else if( jQ.browser.msie )
    {
        jQ.ajax({ async:false, type: 'GET', url: analyticsInterface + clickType, data: sendString, dataType: 'jsonp', success: function(){ result = true; }, error: function(){ result = true; } });

        sleep(300);
    }
    else
    {
        target.alreadyTracked = 'true';
        jQ.ajax({ async:false, type: 'GET', url: analyticsInterface + clickType, data: sendString, dataType: 'jsonp', success: function(){ result = true; }, error: function(){ result = true; } });
        setTimeout(function()
        {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent(event.type, event.bubbles, event.cancelable, event.view, event.detail, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, event.relatedTarget);
            target.dispatchEvent(evt);
        }, 100);
    }
}

function attachClickRecorder(thing)
{
    if( options.UMAnalytics == 'true' )
    {
        var theHREF = thing.getAttribute("href");

        if( (theHREF == undefined) || (!theHREF.match(/^#/)) )
        {
            thing = jQ(thing);
        
            var clickAction = 'click'; if( jQ.browser.msie ){ clickAction = 'mouseup'; } //if( touchInterface ){ clickAction = 'touchend'; }
            
            thing.bind(clickAction, function(e)
            {
                if( e.alreadySeen != 'true' )
                {
                    e.alreadySeen = 'true';
                    
                    if( e.target.alreadyTracked == 'true' )
                    {
                        delete e.target.alreadyTracked;
                    }
                    else
                    {
                        e.target.setAttribute('URL', e.target.href);
                        e.target.setAttribute('word', e.target.textContent);
                        recordClick(e, e.target);
                        if( !(jQ.browser.mozilla || jQ.browser.msie || touchInterface) ){ return false; }
                    }
                }
            });
        }
    }
}

function detachClickRecorder(thing)
{
    var clickAction = 'click'; if( jQ.browser.msie ){ clickAction = 'mouseup'; } //if( touchInterface ){ clickAction = 'touchend'; }
    thing.unbind(clickAction);
}

function checkNewUltralink()
{
    if( currentUword != undefined )
	{    
        var uword = currentUword;
        
        var eul = getDataUl( uword, "data-ul" );
        
        if( eul && (eul.ID < 0) )
        {
            var cnURL = APIInterface + 'extension/getMostRecentDescription' + '?word=' + encodeURIComponent(uword.textContent);

            if( options.database != '' ){ cnURL += '&database=' + encodeURIComponent(options.database); }
        
            jQ.ajax({ type: 'GET', url: cnURL, dataType: "json", success: function( data, textStatus, jqXHR )
            {
                if( data > 0 )
                {
                    eul.ID = data;
                    setDataUl( uword, "data-ul", eul );
                }
            } });
        }
    }
}

function alternatePopup( uword, cm )
{
    var nuInlineType = undefined; if( uword.inlinePaper ){ nuInlineType = uword.inlinePaper.type; };
    removeOldPopup();
    uword.autoPopup = nuInlineType;
    
    cm++;

    if( getDataUl( uword, "data-ul_" + cm ) ){ pendingPopup = uword; createPopup( uword, cm ); }
                                         else{ pendingPopup = uword; createPopup( uword );     }
}

Ultralink.fragmentCallback = function( data )
{
    jQ('head script[src="https://ultralink.me' + data.URI + '"]').remove();
    
    var sURLHash = CryptoJS.SHA1('https://ultralink.me' + data.URI);
    if( Ultralink[sURLHash] != undefined )
    {
        Ultralink[sURLHash]( data );
        delete Ultralink[sURLHash];
    }
}

// Allows browser to cache the result if the URL is consistant. Browser never caches XHR results.
function jsonpLoad( scriptURL, callback )
{
    var sURLHash = CryptoJS.SHA1(scriptURL);
    Ultralink[sURLHash] = callback;

    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = scriptURL;
    head.appendChild(s);
}

function getPageContentSelectors()
{
    var tagParagraphCounts = {};

    var scanMatchNumber = 0;
    var scanMatchVolume = 0;     var scanMatchVolumeNumber = 0;
    var scanMatchParagraphs = 0;

    var scanForNumber = "";
    var scanForVolume = "";
    var scanForParagraphs = "";
    
    var scanFor = "";

    var ulMatches = document.querySelectorAll(".ultralink");
    if( ulMatches.length > 0 )
    {
        scanFor = ".ultralink";
    }
    else
    {
        var hardcodedSites = { ".*wikipedia\.org" : "div.mw-content-ltr p, div.mw-content-ltr ul",
                               ".*economist\.com" : "div.ec-blog-body p",
                               "news\.yahoo\.com" : "div.entry-content p",
                                ".*blogspot\.com" : "div.entry-content",
                           "news\.google\.com/?$" : "div.esc-lead-snippet-wrapper"
                             };

        for( var site in hardcodedSites )
        {
            if( window.location.href.match(RegExp(site, "i")) )
            {                    
                scanFor = hardcodedSites[site];
                break;
            }
        }

        if( scanFor == "" )
        {
            var tagTypes = ["div.article",
                            "div.articleBody",
                            "div.articlePage",
                            "div.articleText",
                            "div.article-content",
                            "div.article-container",
                            "div.article-main",
                            "div.article-main-text",
                            "div.body",
                            "div.body-copy",
                            "div.content",
                            "div.contentBody",
                            "div.content-text",
                            "div.content-section",
                            "div.entry",
                            "div.entry-content",
                            "div.entry_body_text",
                            "div.mainWrapper",
                            "div.main_col",
                            "div.media-story",
                            "div.mw-content-ltr",
                            "div.post",
                            "div.post-body",
                            "div.post_body",
                            "div.post-text",
                            "div.primary",
                            "div.story",
                            "div.story-text",
                            "div.storyText",
                            "div.wsh_expCol_Content",
                            "div#inner_content_left",
                            "div#articleText",
                            "div#articleBody",
                            "div#article_body",
                            "div#article_story_body",
                            "div#bodyContent",
                            "div#content",
                            "div.apple-rss-article-body",
                            "td.bod",
                            "td.text"];

            var matches;
            for( var tag in tagTypes )
            {
                var matches = document.querySelectorAll(tagTypes[tag]);
                for( var sectionIndex = 0; sectionIndex < matches.length; sectionIndex++ )
                {
                    var section = matches[sectionIndex];
                    var sectionVolume = section.offsetHeight * section.offsetWidth;
                    
    //                console.log(section);
    //                console.log("type: " + tagTypes[tag] + " volume: " + sectionVolume);

                    if( sectionVolume > scanMatchVolume )
                    {
                        scanMatchVolume = sectionVolume;
                        scanMatchVolumeNumber = matches.length;
                        scanForVolume = tagTypes[tag];
                    }
                    
                    var paragraphMatches = document.querySelectorAll(tagTypes[tag] + " p");
                    
                    if( paragraphMatches.length > scanMatchParagraphs )
                    {
                        scanMatchParagraphs = paragraphMatches.length;
                        scanForParagraphs = tagTypes[tag];
                        
                        tagParagraphCounts[tagTypes[tag]] = scanMatchParagraphs;
                    }

                }

                if( matches.length > scanMatchNumber )
                {
                    scanMatchNumber = matches.length;
                    scanForNumber = tagTypes[tag];
                }
            }

//                console.log("scanMatchVolume: "     + scanMatchVolume     + " scanForVolume: "     + scanForVolume + " scanMatchVolumeNumber: " + scanMatchVolumeNumber);
//                console.log("scanMatchNumber: "     + scanMatchNumber     + " scanForNumber: "     + scanForNumber);
//                console.log("scanMatchParagraphs: " + scanMatchParagraphs + " scanForParagraphs: " + scanForParagraphs);

                 if( scanForVolume == scanForParagraphs ){ scanFor = scanForVolume; }
//                else if( scanForNumber == scanForParagraphs ){ scanFor = scanForNumber; }
            else if( scanForVolume == scanForNumber ){ scanFor = scanForVolume; }
            else if( (scanForVolume != "") && (scanMatchNumber == 0) ){ scanFor = scanForVolume; }
            else if( (scanForNumber != "") && (scanMatchVolume == 0) ){ scanFor = scanForNumber; }
            else if( (scanMatchVolumeNumber == scanMatchNumber) && (scanMatchVolumeNumber != 0) ){ scanFor = scanForVolume; }
            else if( (scanMatchVolumeNumber == 1) && (scanMatchNumber > scanMatchVolumeNumber) ){ scanFor = scanForNumber; }
            else if( scanForVolume != "" ){ scanFor = scanForVolume; }
            
            if( scanFor != "" )
            {                    
                var winnerPCount = tagParagraphCounts[scanFor];
//                    console.log("winnerPCount: " + winnerPCount);
                if( (winnerPCount != undefined) && (winnerPCount > 2) )
                {
                    scanFor = scanFor + " p, " + scanFor + " ul, " + scanFor + " dl";
                }
            }
        }
    }

    if( scanFor == "" ){ scanFor = "p"; }

//    console.log("scanFor: " + scanFor);

    return scanFor;
}

function replaceAnchor( section, word )
{
    var child = section.childNodes[0];
    
    if( child.nodeType == 3 )
    {
        var alreadyHasLink = false;
        if( word != undefined )
        {
            for( var type in word['ul']['URLS'] )
            {
                var typeURLS = word['ul']['URLS'][type];
                
                for( var m = 0; m < typeURLS.length; m++ )
                {
                    var urlEntry = typeURLS[m];
                    
                    var thisLink = document.createElement("a");
                    thisLink.href = urlEntry['URL'];
                                
        //            if( thisLink.href == section.href ) // Even after using the browsers fully-qualified URL conversion routines there can still be a lot of variation.
                    if( getDomain(thisLink.href) == getDomain(section.href) ) // For right now we are just going to assume that if it is to the same domain that it is the same link (pretty aggreessve)
                    {
                        alreadyHasLink = true; break;
                    }
                }
            }

            if( alreadyHasLink == false )
            {
                if( !word['ul']['URLS']['href2'] ){ word['ul']['URLS']['href2'] = []; }
                word['ul']['URLS']['href2'].push({ 'URL' : section.href });
            }

            var caseSensitive = "i"; if( word.caseSensitive == 1 ){ caseSensitive = ""; }
        
            var regex = new RegExp('^(' + word.quotedWord + ')$', 'g' + caseSensitive);

            var gotHit = false;
            var newText = child.nodeValue.replace(regex, function(match, p1, offset, string){ gotHit = true; return "<uword>" + p1 + "</uword>"; } );
            
            if( gotHit == true )
            {
                var frag = document.createElement('htmlfragment');
                frag.innerHTML = newText;

                var nuUword = frag.childNodes.item(0);
                
                section.parentNode.replaceChild(nuUword, section);
                
                setDataUl( nuUword, "data-ul", word['ul'] );
            }
        }
        else
        {
            var flyWord = { 'URLS' : {} };
            
            var linkType = 'href'; for( var detector in linkDetectors ){ if( section.href.match(RegExp(detector, "i")) ){ linkType = linkDetectors[detector]; break; } }
            flyWord['URLS'][linkType] = [];
            flyWord['URLS'][linkType].push({ 'URL' : section.href });

            if( options.editorStyle == 'true' ){ flyWord['ID'] = '-2'; }

            var frag = document.createElement('htmlfragment');
            frag.innerHTML = "<uword>" + child.nodeValue + "</uword>";

            var nuUword = frag.childNodes.item(0);

            section.parentNode.replaceChild(nuUword, section);
            
            setDataUl( nuUword, "data-ul", flyWord );
        }
    }
}

function replaceInTextNode( section, word )
{
    var caseSensitive = "i"; if( word.caseSensitive == 1 ){ caseSensitive = ""; }

    var children = section.childNodes;
    
    if( children )
    {
//        var regex  = new RegExp('(\\b)'   + word.notgreedy + '('   + word.quotedWord + ')(\\b)'   + word.notgreedy, 'g' + caseSensitive);
//        var regex2 = new RegExp('(?:\\b)' + word.notgreedy + '(?:' + word.quotedWord + ')(?:\\b)' + word.notgreedy, 'g' + caseSensitive);
        var regex  = new RegExp('(\\b|\\s|\\.|\\+|\\*|\\?|\\[|\\^|\\]|\\$|\\(|\\)|\\{|\\}|\\=|\\!|\\<|\\>|\\||\\:|\\-|^)'   + word.notgreedy + '('   + word.quotedWord + ')(\\b|\\s|\\.|\\+|\\*|\\?|\\[|\\^|\\]|\\$|\\(|\\)|\\{|\\}|\\=|\\!|\\<|\\>|\\||\\:|\\-|$)'   + word.notgreedy, 'g' + caseSensitive);
//        var regex2 = new RegExp('(?:\\b|\\s|\\.|\\+|\\*|\\?|\\[|\\^|\\]|\\$|\\(|\\)|\\{|\\}|\\=|\\!|\\<|\\>|\\||\\:|\\-|^)' + word.notgreedy + '(?:' + word.quotedWord + ')(?:\\b|\\s|\\.|\\+|\\*|\\?|\\[|\\^|\\]|\\$|\\(|\\)|\\{|\\}|\\=|\\!|\\<|\\>|\\||\\:|\\-|$)' + word.notgreedy, 'g' + caseSensitive);
    
        var index = children.length;
        
        while( --index >= 0 )
        {
            var child = children[index];
            
            if( child.nodeType == 3 )
            {
            // I CAN'T REMEMBER WHY I OPTED FOR THIS MORE EXPENSIVE/COMPLEX ROUTINE AS OPPOSED TO THE ONE BELOW
//                var hitArray = [];
//
//                console.log(regex);
//                console.log(regex2);
//                console.log(child.nodeValue);
//                
//                var newText = child.nodeValue.replace(regex, function(match, p1, p2, p3, offset, string)
//                {
//                    var dollarOne   = ""; if( p1 != undefined ){ dollarOne   = p1; }
//                    var dollarThree = ""; if( p3 != undefined ){ dollarThree = p3; }
//                    
//                    hitArray.push( dollarOne + "<uword>" + p2 + "</uword>" + dollarThree );
//                } );
//
////                console.log(newText);
//
//                if( hitArray.length > 0 )
//                {
//                    var subStrs = child.nodeValue.split(regex2);
//
////                    console.log(hitArray.length);
////                    console.log(hitArray);
////                    console.log(subStrs.length);
////                    console.log(subStrs);
//
//                    for( var s = 0; s < subStrs.length; s++ )
//                    {
//                        section.insertBefore(document.createTextNode(subStrs[s]), child);
//                        
//                        if( s < hitArray.length )
//                        {
//                            var frag = document.createElement('htmlfragment');
//                            frag.innerHTML = hitArray[s];
//
//                            while( frag.childNodes.length )
//                            {
//                                section.insertBefore(frag.childNodes.item(0), child);
//                            }
//                        }
//                    }
//                    
//                    section.removeChild(child);
//                }

                var gotHit = false;
                var newText = child.nodeValue.replace(regex, function(match, p1, p2, p3, offset, string)
                {
                    gotHit = true;
                    
                    var dollarOne   = ""; if( p1 != undefined ){ dollarOne   = p1; }
                    var dollarThree = ""; if( p3 != undefined ){ dollarThree = p3; }
                    
                    return dollarOne + "<uword>" + p2 + "</uword>" + dollarThree;
                } );
                
                if( gotHit == true )
                {
                    var frag = document.createElement('htmlfragment');
                    frag.innerHTML = newText;

                    while( frag.childNodes.length ){ section.insertBefore(frag.childNodes.item(0), child); }

                    section.removeChild(child);
                }
            }
        }
    }
}

var wikipediaURLRE = RegExp("http://.*wikipedia\.org/wiki", "i");

function injectUltralinks( section, data )
{
    if( data.words != undefined )
    {
        if( data.words.length > 0 )
        {
            for( var w = 0; w < data.words.length; w++ )
            {
                var caseSensitive = "i"; if( data.words[w].caseSensitive == 1 ){ caseSensitive = ""; }

                replaceInTextNode(section, data.words[w]);

                // Do search for occurrences in plain text
                jQ(':not(uword,nouword,iframe,a):not(uword *):not(nouword *):not(iframe *):not(a *):' + caseSensitive + 'contains(' + data.words[w].word + ')', section).each( function()
                {
                    replaceInTextNode(this, data.words[w]);
                } );

                // If we have duplicates then add this ultralink if it isn't already on there
                jQ('uword:' + caseSensitive + 'contains(' + data.words[w].word + ')', section).each(function()
                {
                    var uword = jQ(this)[0];

                    if( uword.textContent.toLowerCase() == data.words[w].word.toLowerCase() )
                    {
                        var ul = getDataUl( uword, "data-ul" );

                        if( ul == undefined )
                        {
                            setDataUl( uword, "data-ul", data.words[w]['ul'] );
                        }
                        else
                        {
                            var cID = 0;

                            while( ul != undefined )
                            {
                                if( ul.ID == data.words[w].ID ){ cID = -1; break; } cID++;
                                ul = getDataUl( uword, "data-ul_" + cID );
                            }

                            if( cID > 0 ){ setDataUl( uword, "data-ul_" + cID, data.words[w]['ul'] ); }
                        }
                    }
                } );

                // If replace hyperlinks is turned on then replacethose
                if( options.replaceHyperlinks == 'true' )
                {
                    jQ('a:' + caseSensitive + 'contains(' + data.words[w].word + ')', section).each( function()
                    {
                        replaceAnchor(this, data.words[w]);
                    } );
                }
            }

            Ultralink.uwordScanPage(section);
        }
    }
    
    if( options.replaceHyperlinks == 'true' )
    {
        if( window.location.href.match(wikipediaURLRE) )
        {
            setTimeout( function()
            {
                // Clean Mode
                jQ('a:not(.autonumber)', section).each( function()
                {
                    replaceAnchor(this);
                } );
                
                Ultralink.uwordScanPage(section);
            }, 100 );
        }
    }
}

function makeNetworkRequest( thisSection )
{
    var dbPostfix = options.database; if( (dbPostfix != undefined) && (dbPostfix != "undefined") && dbPostfix ){ dbPostfix = "/" + dbPostfix; }else{ dbPostfix = ""; }
    var fragmentInterface = "fragment"; if( options.editorStyle == 'true' ){ fragmentInterface = "fragmentBypass"; }

    var theSectionHTML = thisSection.innerHTML;

    if( theSectionHTML != "" )
    {
        var fragmentHash = CryptoJS.SHA1(theSectionHTML + options.replaceHyperlinks, { asString: true }); // Interestingly IE9 slightly munges the order of element attributes inside innerHTML so the hash in IE can be distinct from the one computed by web browsers
        
        if( fragmentHash != 'da39a3ee5e6b4b0d3255bfef95601890afd80709' ) // sha1 for null string. < IE9 browsers are incompitant and can't display ultralinks anyway
        {
            var urlHash = CryptoJS.SHA1(window.location.href, { asString: true });
            
            if( jQ.browser.msie ) // By default IE9 only allows cross-domain communication through JSONP
            {
                var callURL = APIInterface + 'extension/' + fragmentInterface + '/' + urlHash + '/' + fragmentHash + dbPostfix + '?callback=Ultralink.fragmentCallback';
                
                jsonpLoad(callURL, function( data )
                {
                    if( data.type == "hit" )
                    {
                        if( elementInView(thisSection) ){ injectUltralinks(thisSection, data); }else{ thisSection['fragmentData'] = data; }
                    }
                    else if( data.type == "miss" )
                    {
                        var sendString2 = "fragment=" + encodeURIComponent(theSectionHTML);
                        sendString2 += "&URL=" + encodeURIComponent(window.location.href);
                        sendString2 += "&associatedWebsite=" + encodeURIComponent(options.associatedWebsite);
                        sendString2 += "&replaceHyperlinks=" + encodeURIComponent(options.replaceHyperlinks);
    //                    sendString2 += "&XDEBUG_PROFILE=" + encodeURIComponent("yes"); // DEBUG
                        
                        jQ.ajax({ type: 'POST', url: APIInterface + 'extension/fragmentFilter/' + urlHash + '/' + fragmentHash + dbPostfix, data: sendString2, dataType: "jsonp", success: function( data )
                        {
                            if( elementInView(thisSection) ){ injectUltralinks(thisSection, data); }else{ thisSection['fragmentData'] = data; }
                        } });
                    }
                } );
            }
            else
            {
                var callURL = APIInterface + 'extension/' + fragmentInterface + '/' + urlHash + '/' + fragmentHash + dbPostfix;
                
                jQ.ajax({ type: 'GET', url: callURL, dataType: "json", success: function( data, textStatus, jqXHR )
                {
                    if( data.type == "hit" )
                    {
                        if( (options.environment == 'extension') && (options.extension != 'IE') && (parseInt(ulVersion) < parseInt(data.ultralinkMinVersion)) )
                        {
                            Ultralink.sendExtensionMessage('extensionOutOfDate', { currentVersion: data.ultralinkMinVersion, currentVersionString: data.ultralinkVersionString } );
                        }
                        else
                        {
                            if( elementInView(thisSection) ){ injectUltralinks(thisSection, data); }else{ thisSection['fragmentData'] = data; }
                        }
                    }
                    else if( data.type == "miss" )
                    {
                        var sendStructure = { 'fragment' : encodeURIComponent(theSectionHTML),
                                                   'URL' : encodeURIComponent(window.location.href),
                                     'associatedWebsite' : encodeURIComponent(options.associatedWebsite),
                                     'replaceHyperlinks' : encodeURIComponent(options.replaceHyperlinks) }
    //                    sendStructure['XDEBUG_PROFILE'] = 'yes'; // DEBUG
        
                        jQ.ajax({ type: 'POST', url: APIInterface + 'extension/fragmentFilter/' + urlHash + '/' + fragmentHash + dbPostfix, data: sendStructure,
                                                    
                            complete: function(jqXHR, textStatus)
                            {
                                if( jqXHR.status == 200 )
                                {
                                    var data = realJSON.parse(jqXHR.responseText);
                                    
                                    if( (options.environment == 'extension') && (options.extension != 'IE') && (parseInt(ulVersion) < parseInt(data.ultralinkMinVersion)) )
                                    {
                                        Ultralink.sendExtensionMessage('extensionOutOfDate', { currentVersion: data.ultralinkMinVersion, currentVersionString: data.ultralinkVersionString } );
                                    }
                                    else
                                    {
                                        if( elementInView(thisSection) ){ injectUltralinks(thisSection, data); }else{ thisSection['fragmentData'] = data; }
                                    }
                                }
                                else if( jqXHR.status != 400 )
                                {
                                    scanSection(thisSection);
                                }
                            }
                        });
                    }
                } });
            }
        }
    }
}

function scanSection( thisSection )
{
    if( !jQ.inArray( thisSection, sections ) != -1 ){ sections.push(thisSection); }

    if( elementInView(thisSection) ){ makeNetworkRequest( thisSection ); }else{ thisSection['notScanned'] = 'true'; }
}

Ultralink.uwordScanPage = function( context )
{
    jQ("uword", context).each( function()
    {
        var thisUword = jQ(this);
        
        if( this['alreadyScanned'] != 'true' )
        {
            this['alreadyScanned'] = 'true';
            
            var ul = getDataUl( this, "data-ul" );

            if( ul )
            {
                if( (ul['callout']) && (ul['callout'] == 'normal') ){ addTextShadowCallout(this, 1.0); }
                if( (ul['status'])  && (ul['status']  != 'hit') && (options.editorStyle == "true") ){ this.setAttribute('title', ul['status'] ); }
            }

            if( (jQ.browser.msie) && (getInternetExplorerVersion() < 10) )
            {
                var s = document.createElement('span');
                s.style.setProperty('position', 'absolute');
                s.style.setProperty('display', 'none');
                s.textContent = this.textContent;
                
                this.ieSpan = s;
                this.parentNode.insertBefore( s, this );
            }

            thisUword.click( function(){ if( (options.failsafe == 'true') && (hoverRecover == false) ){ pendingPopup = this; createPopup(this); } } );

            if( options.noHover != 'true' )
            {
                if( !touchInterface )
                {
                    thisUword.hover( function()
                    {
                        if( options.failsafe == 'true' )
                        {
                            if( !mouseDown )
                            {
                                if( hoverRecover == false )
                                {
                                    if( ulInlineOut != true )
                                    {
                                        addTextShadowCallout(this, 1.0);
                                        
                                        if( currentUword != this ){ removeOldPopup(); }
                                        pendingPopup = this;
                                        var nuThing = this;
                                        currentTimeout = setTimeout( function(){ createPopup(nuThing); }, options.hoverTime, nuThing );
                                    }
                                }
                            }
                        }
                    },
                
                    function()
                    {
                        clearTimeout(currentTimeout); currentTimeout = undefined;
                        if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) ){ removeTextShadowCallout(this); }
                        
                        pendingPopup = undefined;
                    } );
                }
            }
        }
    } );

// TAKING THIS OUT FOR NOW BECAUSE IT IS MAKING US NOT A GOOD HOUSEGUEST        
//    if( (options.notlivepage != 'true') && (options.UMAnalytics == 'true') )
//    {
//        jQ("a", context).each( function(){ attachClickRecorder(this); } );
//    }
}

function eventBoundsCheck( event )
{
    if( currentUword != undefined )
    {
        var uword = currentUword;

        if( uword.paper != undefined )
        {
            var P = uword.paper;
            
            var tOL = parseFloat(P.myRrect.node.parentNode.style['left']);
            var tOT = parseFloat(P.myRrect.node.parentNode.style['top']);

            if( (event.pageX <= tOL ) ||
                (event.pageX >  tOL + P.width) ||
                (event.pageY <= tOT + (uword.thumbnailH - uword.actualThumbnailH)) ||
                (event.pageY >  tOT + P.height) )
            {
                var iP = uword.inlinePaper;
            
                if( iP != undefined )
                {
                    tOL = parseFloat(iP.back.node.parentNode.style['left']);
                    tOT = parseFloat(iP.back.node.parentNode.style['top']);

                    if( (event.pageX <= tOL) ||
                        (event.pageX >  tOL + iP.width ) ||
                        (event.pageY <= tOT ) ||
                        (event.pageY >  tOT + iP.height) )
                    {
                        if( options.hoverRecoverTime > 0 ){ hoverRecover = true; setTimeout( function(){ hoverRecover = false; }, options.hoverRecoverTime ); }else{ hoverRecover = false; }
                        removeOldPopup();
                    }
                }
                else
                {
                    if( options.hoverRecoverTime > 0 ){ hoverRecover = true; setTimeout( function(){ hoverRecover = false; }, options.hoverRecoverTime ); }else{ hoverRecover = false; }
                    removeOldPopup();
                }
            }
        }
    }
}

var twitterAPIResult = {};

Ultralink.handleExtensionMessage = function( type, result )
{
    switch( type )
    {
        case 'overrideSettings':    { overrideSettings( result ); } break;
        case 'Authenticated Types': { supportedInlineTypes = ['wikipedia', 'mediawiki', 'twitter', 'videoyoutube', 'mapgoogle', 'ultralinkme']; for( i = 0; i < result.length; i++ ){ supportedInlineTypes.push(result[i]); } } break;
        case 'Cache Clear':         { delete inlineContentCache[result.service + result.URL]; } break;

        case 'twitterResult':
        case 'linkedinResult':
        case 'facebookResult':
        case 'wikipediaResult':
        case 'mediawikiResult':
        {
            if( currentUword != undefined )
            {
                var uword = currentUword;
                
                if( (uword.inlinePaper != undefined) && (uword.inlinePaper.type == result.type) && (uword.inlinePaper.URL == result.URL)  )
                {
                    if( result.status == 'success' )
                    {
                        switch( type )
                        {
                            case 'twitterResult':
                            {
                                switch( result.command )
                                {
                                    case 'profile':
                                    {
                                        var profile = result.data;
                                        if( result.data.text != undefined ){ profile = realJSON.parse(result.data.text); }

                                        twitterAPIResult = {};
                                        
                                        twitterAPIResult['screen_name']             = profile['screen_name'];
                                        twitterAPIResult['name']                    = profile['name'];
                                        twitterAPIResult['location']                = profile['location'];
                                        twitterAPIResult['description']             = profile['description'];
                                        twitterAPIResult['profile_image_url']       = profile['profile_image_url'];
                                        twitterAPIResult['profile_image_url_https'] = profile['profile_image_url_https'];
                                        twitterAPIResult['following']               = profile['following'];
                                        twitterAPIResult['profileURL']              = result.URL;
                                    
                                        if( profile['protected'] == false )
                                        {
                                            setTimeout(function()
                                            {
                                                Ultralink.sendExtensionMessage('twitterQuery', { "command" : "timeline", "URL" : result.URL, "profile" : profile['screen_name'] });
                                            }, 10);
                                        }
                                    } break;

                                    case 'timeline':
                                    {
                                        var timeline = result.data;
                                        if( result.data.text != undefined ){ timeline = realJSON.parse(result.data.text); }

                                        twitterAPIResult['timeline'] = timeline;
                                        inlineContentCache[result.type + result.URL] = twitterAPIResult;
                                        
                                        expandInlinePane(twitterAPIResult, result.type);
                                        
                                        twitterAPIResult = {};
                                    } break;
                                }
                            } break;
                            
                            case 'linkedinResult':
                            {
                                if( result.command == 'invite' )
                                {
                                    jQ("#inlineIframe_linkedin").contents().find('html body #linkedinConnect').hide();
                                    jQ("#inlineIframe_linkedin").contents().find('html body #LIconnectButton').hide();
                                    jQ("#inlineIframe_linkedin").contents().find('html body #LIcancelButton').hide();
                                }
                                else
                                {
                                    var theContent = result;
                                    theContent['profileURL'] = result.URL;
                                    inlineContentCache[result.type + result.URL] = theContent;
                                    
                                    expandInlinePane(theContent, result.type);
                                }
                            } break;
                            
                            case 'facebookResult':
                            {
                                var theContent = result;
                                inlineContentCache[result.type + result.URL] = theContent;
                                
                                expandInlinePane(theContent, result.type);
                            } break;
                            
                            case 'wikipediaResult':
                            case 'mediawikiResult':
                            {                    
                                switch( result.command )
                                {
                                    case 'page':
                                    {
                                        var theContent = result.data;
                                        theContent['pageURL'] = result.URL;
                                        inlineContentCache[result.type + result.URL] = theContent;
                                        
                                        expandInlinePane(theContent, result.type);
                                    } break;
                                }
                            } break;
                        }
                    }
                    else
                    {
                        removeOldInlinePopup();
                    }
                }
            }
        } break;

        default: { return false; } break;
    }

    return true;
}

Ultralink.createInlineUltralink = function( CS, CDSnode )
{
    var regexTheP = new RegExp('[\\.|\\+|\\*|\\?|\\[|\\^|\\]|\\$|\\(|\\)|\\{|\\}|\\=|\\!|\\<|\\>|\\||\\:|\\-]');
    var regexTheC = /[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]+/;

    var ng = ''; if( CS.match(regexTheP) || CS.match(regexTheC) ){ ng = '?'; }

    injectUltralinks(CDSnode, {'words' : [{ 'caseSensitive' : 0, 'notgreedy' : ng, 'word' : CS, 'quotedWord' : CS, 'ul' : { 'ID' : -1, 'URLS' : [] } }] });
    jQ("uword:contains(" + CS + ")", CDSnode).each(function()
    {
        var uword = jQ(this);
        uword.click();
        ulInlineOut = true;
    } );
}

function consumeDOMQueue( q )
{
    setTimeout(function()
    {
        jQ('command', q).each( function()
        {
            if( Ultralink.handleExtensionMessage( this.attributes['type'].value, realJSON.parse(this.textContent) ) ){ jQ(this).remove(); }
        } );
    }, 10);
}

function takeCareOfSection( s )
{
    var gotSomething = false;

    var ns = s['notScanned'];   if( ns ){ makeNetworkRequest( s );   delete s['notScanned'];   gotSomething = true; }
    var fd = s['fragmentData']; if( fd ){ injectUltralinks( s, fd ); delete s['fragmentData']; gotSomething = true; }
    
    return gotSomething;
}

function incrementalWork()
{
    var gotSomething = false;
    
    for( var s = 0; s < sections.length; s++ )
    {
        gotSomething = takeCareOfSection( sections[s] );
        if( gotSomething ){ break; }
    }

    var incrementTime = 200; if( jQ.browser.mozilla ){ incrementTime = 500; }

    if( gotSomething ){ setTimeout( incrementalWork, incrementTime ); }
}

function doScan( theSelector )
{
    var qr = jQ( theSelector + ':not(a *)' )
    
    if( (qr.length == 0) && (theSelector == ".ultralink") )
    {
        doScan(getPageContentSelectors());
    }
    else
    {
        qr.each( function(){ scanSection(this); } );
        
        incrementalWork();
    }
}

function scanFirst()
{
    jQ(document).ready( function()
    {
        if( typeof options.scanTag == 'string' )
        {
            doScan(options.scanTag);
        }
        else
        {
            for( var t = 0; t < options.scanTag.length; t++ ){ doScan(options.scanTag[t]); }
        }
    } );
}

// Inline Content Routines
function noOffset(s)
{
    var day= s.slice(0,-5).split(/\D/).map(function(itm){ return parseInt(itm, 10) || 0; });
    day[1]-= 1;
    day= new Date(Date.UTC.apply(Date, day));  
    var offsetString = s.slice(-5)
    var offset = parseInt(offsetString,10)/100;
    if (offsetString.slice(0,1)=="+") offset*=-1;
    day.setHours(day.getHours()+offset);
    return day.getTime();
}

function parseFacebookDate(text){ var ts = noOffset(text); var date = new Date(ts).toLocaleDateString(); var time = new Date(ts).toLocaleTimeString(); return date + " " + time; }
function parseTwitterDate(text){ var newtext = text.replace(/(\d{1,2}[:]\d{2}[:]\d{2}) (.*)/, '$2 $1'); newtext = newtext.replace(/(\+\S+) (.*)/, '$2 $1'); var date = new Date(Date.parse(newtext)).toLocaleDateString(); var time = new Date(Date.parse(newtext)).toLocaleTimeString(); return date + " " + time; }

function expandInlinePane(content, type)
{
    Ultralink.currentInlineContent = content;
    var uword = currentUword;
    
    var fullWidth  = inlineFullX;
    var fullHeight = inlineFullY;

    switch( type )
    {
        case 'videoyoutube': { fullHeight *= 1.5; } break;
        case    'mapgoogle': { fullHeight *= 2.0; } break;
        case  'ultralinkme': { fullHeight *= 1.5; fullWidth *= 1.2; } break;
    }

    ulInlineOut = true;

    var iP = uword.inlinePaper;

    iP.setSize(fullWidth + inlineArrowX + (inlineStrokeWidth*2), fullHeight + (inlineStrokeWidth*2));
    
    iP.back.node.parentNode.style.setProperty('top', (parseFloat(iP.back.node.parentNode.style['top'])  - ((fullHeight - inlinePreviewY)/2.0)) + 'px');
    
    iP.inlineDiv = document.createElement("div");
	iP.inlineDiv.id = 'inlineContent';
    iP.inlineDiv.style.setProperty('position', 'absolute');
    iP.inlineDiv.style.setProperty('top', (parseFloat(iP.back.node.parentNode.style['top'])  + inlineFullInset) + 'px');
    iP.inlineDiv.style.setProperty('width', (fullWidth  + (inlineStrokeWidth*2) - (inlineFullInset*2)) + 'px');
    iP.inlineDiv.style.setProperty('height', (fullHeight + (inlineStrokeWidth*2) - (inlineFullInset*2)) + 'px');
    iP.inlineDiv.style.zIndex = "2147483647";
    iP.inlineDiv.style.setProperty('border', "none");
    iP.inlineDiv.style.setProperty('padding', "0px");

    var buttonBBox = uword.paper.myRrect.getBBox();

    var theInlinePopupCorners = inlinePopupCorners;
    if( type == 'ultralinkme' )
    {
        theInlinePopupCorners = 20;
        iP.outline.attr("stroke-width", 5);
    }

    if( uword.popupX + (buttonBBox.width/2.0) > document.body.offsetWidth/2.0 )
    {
        iP.back.node.parentNode.style.setProperty('left', (parseFloat(iP.back.node.parentNode.style['left']) - (fullWidth - inlinePreviewX)) + 'px');
    
        iP.back.attr("path",    rrectPathArrowRight(inlineStrokeWidth, inlineStrokeWidth, fullWidth, fullHeight, theInlinePopupCorners, inlineArrowX, inlineArrowY));
        iP.outline.attr("path", rrectPathArrowRight(inlineStrokeWidth, inlineStrokeWidth, fullWidth, fullHeight, theInlinePopupCorners, inlineArrowX, inlineArrowY));

        iP.inlineDiv.style.setProperty('left', (parseFloat(iP.back.node.parentNode.style['left']) + inlineFullInset) + 'px');
    }
    else
    {
        iP.back.attr("path",    rrectPathArrowLeft(inlineStrokeWidth + inlineArrowX, inlineStrokeWidth, fullWidth, fullHeight, theInlinePopupCorners, inlineArrowX, inlineArrowY));
        iP.outline.attr("path", rrectPathArrowLeft(inlineStrokeWidth + inlineArrowX, inlineStrokeWidth, fullWidth, fullHeight, theInlinePopupCorners, inlineArrowX, inlineArrowY));

        iP.inlineDiv.style.setProperty('left', (parseFloat(iP.back.node.parentNode.style['left']) + inlineFullInset + inlineArrowX) + 'px');
    }

    if( jQ.browser.mozilla ) // bug in Firefox when using a non 1.0 scale factor
    {
        iP.back.attr("opacity", 1.0);
    }
    else
    {
        if( type == 'ultralinkme' ){ iP.back.attr("opacity", 0.95); }
                               else{ iP.back.attr("opacity", 0.80); }
    }

    iP.spinner.remove();

	var theIframe = jQ("<iframe id='inlineIframe_" + type + "' frameBorder=0 width='" + iP.inlineDiv.style['width'] + "' height='" + iP.inlineDiv.style['height'] + "' />");
	jQ(iP.inlineDiv).append(theIframe);

	switch( type )
	{
		case 'wikipedia':
		case 'mediawiki':
		{
			var mwDiv = document.createElement("div");
//			mwDiv.style.setProperty('width', iP.inlineDiv.style['width']);
//			mwDiv.style.setProperty('height', iP.inlineDiv.style['height']);

			if( touchInterface )
			{
				mwDiv.style.setProperty('height', (parseFloat(iP.inlineDiv.style['height']) - 16.0) + 'px');
				mwDiv.style.setProperty('overflow', "auto");
			}

			mwDiv.style.setProperty('word-wrap', "break-word");
			mwDiv.style.setProperty('color', "white");
			mwDiv.style.setProperty('font-family', "Helvetica");
			mwDiv.innerHTML = content.parse.text['*'];

			jQ("table.infobox",         mwDiv).remove();
			jQ("table.infobox_v2",      mwDiv).remove();
			jQ("table.metadata",        mwDiv).remove();
			jQ("table.vertical-navbox", mwDiv).remove();
			jQ("table.toccolours",      mwDiv).remove();
//			jQ("strong.error",          mwDiv).parent().remove();
			jQ("strong.error",          mwDiv).remove();
			jQ("sup",                   mwDiv).remove();
			jQ("span#coordinates",      mwDiv).remove();
			jQ("div.noprint",           mwDiv).remove();
			jQ("div.dablink",           mwDiv).remove();
			jQ("div.thumb",             mwDiv).remove();
			jQ("div.floatright",        mwDiv).remove();
			jQ("object",                mwDiv).remove();
			jQ("img",                   mwDiv).remove();

			jQ("table",                 mwDiv).css('color', "white");
			jQ("#toc",                  mwDiv).remove();
            			
			jQ("a", mwDiv).each( function(){ jQ(this).replaceWith( jQ(this).html() ); } );

			jQ(theIframe).load(function() 
			{
                if( type == 'mediawiki' )
                {
                    mwDiv.style.setProperty('margin-top', "16px");
                
                    var theSourceSpan = document.createElement("div");
                    theSourceSpan.style.setProperty('color', "white");
                    theSourceSpan.style.setProperty('font-family', "Helvetica");
                    theSourceSpan.style.setProperty('font-size', "0.75em");
                    theSourceSpan.style.setProperty('text-align', "center");
                    theSourceSpan.style.setProperty('margin-bottom', "-10px");
                    theSourceSpan.innerHTML = "(Source: <a target='_blank' style='color: #77f' href='" + getFullDomainWithTransport(content.pageURL) + "'>" + getFullDomain(content.pageURL) + "</a>)";

                    jQ(this).contents().find('html body').append(theSourceSpan);
                }

				jQ(this).contents().find('html body').append(mwDiv);
			});

		} break;
		
		case 'twitter':
		{
            var profileImageURL = content['profile_image_url'];
            if( pageProtocol == "https://" ){ profileImageURL = content['profile_image_url_https']; }

            var tweetLines = "";

			if( touchInterface ){ tweetLines += "<div style='height: " + (parseFloat(iP.inlineDiv.style['height']) - 16.0) + "px; overflow: auto;'>"; }

            var following = "";
            if( content.following != undefined ){ following = "<iframe id='twitterFollow' frameBorder=0 width='90' height='38' style='display: none;' src='" + basePath + "oauth/twitterFollow.html?profile=" + content['screen_name'] + "&profileURL=" + content['profileURL'] + "&following=" + content['following'] + "' />"; }
        
            tweetLines += "<table style='width: 100%;'><tr><td style='width: 48px; padding-right: 10px; padding-left: 0px;'><img width=48 height=48 src='" + profileImageURL + "' style='border-radius: 7px; -moz-border-radius: 7px;' /></td><td style='color: white;'><span style='font-size: 1.5em; font-weight: bold;'>" + content['name'] + "</span><br><span style='font-size: 0.8em; color: #bbb'>" + content['location'] + "</span></td><td style='text-align: right; padding-right: 10px; width: 99px;'>" + following + "</td></tr></table>";
            
            var tweets = content['timeline'];
            
            if( tweets )
            {
                tweetLines += "<div style='overflow: auto; font-family: Helvetica;'><center><table style='width: 100%;'>";
                for( var index = 0; index < tweets.length; index++ )
                {
                    var tweet = tweets[index];
                    var tt = tweet.text;

                    tt = tt.replace(/@(\w+)(?![^<]*(\<\/a\>|\>))/gm, '<a href="http://twitter.com/$1" rel="nofollow" target="_blank" style="color: #99a">@$1</a>');
                    tt = tt.replace(/\#(\w+)(?![^<]*(\<\/a\>|\>))/gm, ' <a href="http://search.twitter.com/search?q=%23$1" rel="nofollow" target="_blank" style="color: #888">#$1</a>' );
                    tt = tt.replace(RegExp('((https?|ftp)://[^\\s/$.?#].[^\\s]*)(?![^<]*(\<\/a\>|\>))', 'gm'), '<a href="$1" target="_blank" style="color: #aac">$1</a>' );
                    
                    tweetLines += "<tr><td><small><small> </small></small></td></tr>";
                    tweetLines += "<tr><td style='color: #fff; font-size: 0.9em;'>" + tt + "</td></tr>";
                    tweetLines += "<tr><td style='color: #bbb;'><small><small>" + parseTwitterDate(tweet.created_at) + "</small></small></td></tr>";
                    tweetLines += "<tr><td><small><small> </small></small></td></tr>";
                }
                tweetLines += "</table></center></div>";
            }

			if( touchInterface ){ tweetLines += "</div>"; }

			jQ(theIframe).load(function() 
			{
                if( content.following != undefined )
                {
                    var theIF = document.getElementById("inlineIframe_" + type);
                    var ifDoc = theIF.contentDocument || theIF.contentWindow.document;
                
                    var jqueryScript = ifDoc.createElement('script');
                    jqueryScript.type = 'text/javascript';
                    jqueryScript.src = basePath + 'ultralinkLibraries/jquery-min.js';

                    var docScript = ifDoc.createElement('script');
                    docScript.type = 'text/javascript';
                    docScript.textContent = 'setTimeout( function(){ jQuery(document).ready( function(){ jQuery("#twitterFollow").fadeIn(); } ); }, 500);';

                    ifDoc.head.appendChild(jqueryScript);
                    ifDoc.body.appendChild(docScript);
                }

				jQ(this).contents().find('html body').append(tweetLines);
            });			
		} break;
        
        case 'linkedin':
        {
            if( content.command == 'lookupPerson' )
            {
                var profile = realJSON.parse(content.data.text);
                var personDistance = profile.relationToViewer.distance;

                var connect = "";
                var linkedinConnect = "";
                if( (personDistance == -1) || (personDistance == 2) || (personDistance == 3) )
//                || (personDistance == 1))
                {
                    connect = "<img id='LIconnectButton' src='" + basePath + "oauth/linkedinConnect1.png' style='cursor: pointer;' onclick='jQuery(\"#linkedinConnect\").slideDown(\"slow\"); jQuery(this).hide(); jQuery(\"#LIcancelButton\").show();' />";
                    connect += "<div id='LIcancelButton' style='display: none; cursor: pointer; width: 83px; text-align: center; -moz-border-radius: 10px; border-radius: 10px; background: #e55; color: white; border-style: solid; border-color: #833; border-width: 2.5px; padding: 5px;' onclick='jQuery(\"#linkedinConnect\").slideUp(\"slow\"); jQuery(this).hide(); jQuery(\"#LIconnectButton\").show();'>Cancel</div>";

                    var LIauth = profile.apiStandardProfileRequest.headers.values[0].value.split(":")[1];
                    linkedinConnect = "<iframe id='linkedinConnect' frameBorder=0 width='100%' height='143px' style='display: none; padding-top: 5px; padding-bottom: 5px;' src='" + basePath + "oauth/linkedinConnect.html?profile=" + profile.id + "&profileURL=" + content['profileURL'] + "&auth" + LIauth + "' />";                    
                }
                else if( personDistance == 1 )
                {
                    connect = "<div style='font-size: 0.8em; font-wight: bold; text-align: center; color: white; -moz-border-radius: 15px; border-radius: 15px; background: #aad; border-style: solid; border-color: #aac; border-width: 2.5px; padding: 3px;'>Connected</div>";
                }
                
                var picture = ""; if( (profile.pictureUrl != undefined) && (profile.pictureUrl != "") ){ picture = "<td style='width: 48px; padding-right: 10px; padding-left: 0px;'><img width=48 height=48 src='" + profile.pictureUrl + "' style='border-radius: 7px; -moz-border-radius: 7px;' /></td>"; }
                var profileHTML = "<table style='width: 100%;'><tr>" + picture + "<td style='color: white;'><span style='font-size: 1.5em; font-weight: bold;'>" + profile.firstName + " " + profile.lastName + "</span><br><span style='font-size: 0.8em; color: #bbb'>" + profile.headline + "</span></td><td style='text-align: right; padding-right: 10px;'>" + connect + "</td></tr></table>";

                profileHTML += linkedinConnect;
                
                if( personDistance >= 2 )
                {
                    var rc = profile.relationToViewer.relatedConnections.values;
                    var connections = "";
                                        
                    for( var i = 0; (i < rc.length) && (i < 5); i++ )
                    {
                        if( i == 0 ){ connections += "<center><table style='font-size: 0.6em; color: white;'><tr style='text-align: center;'><td>"; }
                        connections += rc[i].firstName + " " + rc[i].lastName + "<br>";
                        if( (i == 2) && (rc.length != 4) ){ connections += "</td><td>"; }
                    }
                    
                    var excess = profile.relationToViewer.relatedConnections._total - 5;
                    if( excess > 0 ){ connections += "(+" + excess + " more)"; }
                    connections += "</td></tr></table></center>";
                    
                    var third = ""; if( personDistance == 3 ){ third = "<td style='padding-top: 4px; font-size: 1.2em;'>&#x27a1;</td><td style='font-size: 0.8em; color: #99a;'>(Their connections)</td>"; }
                    
                    profileHTML += "<table style='color: white; width: 100%;'><tr style='text-align: center;'><td style='font-weight: bold; color: #dbb;'>You</td><td style='padding-top: 4px; font-size: 1.2em;'>&#x27a1;</td><td>" + connections + "</td>" + third + "<td style='padding-top: 4px; font-size: 1.2em;'>&#x27a1;</td><td style='font-weight: bold;'>" + profile.firstName + " " + profile.lastName + "</td></tr></table>";
                }
                
                     if( profile.summary     != undefined ){ profileHTML += "<div style='font-size: 1.2em;'>" + profile.summary     + "</div>"; }
                else if( profile.specialties != undefined ){ profileHTML += "<div style='font-size: 1.2em;'>" + profile.specialties + "</div>"; }
                        
                jQ(theIframe).load(function() 
                {
                    if( connect != "" )
                    {
                        var theIF = document.getElementById("inlineIframe_" + type);
                        var ifDoc = theIF.contentDocument || theIF.contentWindow.document;
                        
                        var jqueryScript = ifDoc.createElement('script');
                        jqueryScript.type = 'text/javascript';
                        jqueryScript.src = basePath + 'ultralinkLibraries/jquery-min.js';

                        var docScript = ifDoc.createElement('script');
                        docScript.type = 'text/javascript';
                        docScript.textContent = 'setTimeout( function(){ var connectButton = document.getElementById("LIconnectButton"); jQuery("#LIconnectButton").hover( function(){ connectButton.src = "' + basePath + 'oauth/linkedinConnect2.png"; }, function(){ connectButton.src = "' + basePath + 'oauth/linkedinConnect1.png"; } ); }, 500);';

                        ifDoc.head.appendChild(jqueryScript);
                        ifDoc.body.appendChild(docScript);
                    }
                
                    jQ(this).contents().find('html body').append(profileHTML);
                });
            }
            else if( content.command == 'lookupCompany' )
            {
                var profile = realJSON.parse(content.data.text);
            
                var profileHTML = "<div style='color: white;'>";
            
                profileHTML += "<span style='font-size: 1.5em;'>" + profile.name + "</span><br>";
                if( profile.companyType != undefined ){ profileHTML += "<span style='font-size: 1.0em; color: #bbb;'>" + profile.companyType.name + "</span><br><br>"; }
                
                     if( profile.description != undefined ){ profileHTML += "<span style='font-size: 1.2em;'>" + profile.description + "</span><br>"; }
                else if( profile.specialties != undefined ){ profileHTML += "<span style='font-size: 1.2em;'>" + profile.specialties + "</span><br>"; }
            
                profileHTML += "</div>";
            
                jQ(theIframe).load(function() 
                {
                    jQ(this).contents().find('html body').append(profileHTML);
                });
            }
        } break;
        
        case 'facebook':
		{
            var posts = content.data.data;
            
			var postLines = "<div style='overflow: auto; font-family: Helvetica;'><center><table style='width: 98%;'>";
            if( posts )
            {
                for( var index = 0; index < posts.length; index++ )
                {
                    var post = posts[index];

                    if( post.story != undefined )
                    {
                        postLines += "<tr><td><small><small> </small></small></td></tr>";
                        postLines += "<tr><td style='color: #fff; font-size: 0.9em;'>" + post.story + "</td></tr>";
                        postLines += "<tr><td style='color: #bbb;'><small><small>" + parseFacebookDate(post.created_time) + "</small></small></td></tr>";
                        postLines += "<tr><td><small><small> </small></small></td></tr>";
                    }
                    else if( post.message != undefined )
                    {
                        postLines += "<tr><td><small><small> </small></small></td></tr>";
                        postLines += "<tr><td style='color: #fff; font-size: 0.9em;'>" + post.message + "</td></tr>";
                        postLines += "<tr><td style='color: #bbb;'><small><small>" + parseFacebookDate(post.created_time) + "</small></small></td></tr>";
                        postLines += "<tr><td><small><small> </small></small></td></tr>";
                    }
                }
            }
			postLines += "</table></center></div>";
						
			jQ(theIframe).load(function(){ jQ(this).contents().find('html body').append(postLines); });
		} break;
        
        case 'videoyoutube': { jQ(theIframe).load(function(){ var tif = document.getElementById("inlineIframe_" + type); if( (tif.src == undefined) || (tif.src == '') ){ tif.src = content; } }); } break;
        case 'mapgoogle':    { jQ(theIframe).load(function(){ var tif = document.getElementById("inlineIframe_" + type); if( (tif.src == undefined) || (tif.src == '') ){ tif.src = content; } }); } break;
        case 'ultralinkme':  { jQ(theIframe).load(function(){ var tif = document.getElementById("inlineIframe_" + type); if( (tif.src == undefined) || (tif.src == '') ){ tif.src = content; } }); } break;
    }	
    
    document.body.appendChild(iP.inlineDiv);
}

function createInlinePopup( type, URL, el )
{
    if( jQ.inArray( type, supportedInlineTypes ) != -1 )
    {
        if( (currentUword != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") )
        {
            var uword = currentUword;
            
            removeOldInlinePopup();

            var buttonBBox = uword.paper.myRrect.getBBox();

            var iP;

            if( uword.popupX + (buttonBBox.width/2.0) > document.body.offsetWidth/2.0 )
            {
                iP = new Raphael( uword.popupX + rectPopupOffsetX + rectPaddingX - inlinePreviewX - inlineArrowX + inlineOffsetX - inlineStrokeWidth, uword.popupY + el.attr('y') + el.attr('height')/2 - inlinePreviewY/2 - inlineStrokeWidth, inlinePreviewX + inlineArrowX + (inlineStrokeWidth*2), inlinePreviewY + (inlineStrokeWidth*2) );
                
                iP.back    = iP.path( rrectPathArrowRight(inlineStrokeWidth, inlineStrokeWidth, inlinePreviewX, inlinePreviewY, inlinePopupCorners, inlineArrowX, inlineArrowY) );
                iP.outline = iP.path( rrectPathArrowRight(inlineStrokeWidth, inlineStrokeWidth, inlinePreviewX, inlinePreviewY, inlinePopupCorners, inlineArrowX, inlineArrowY) );

                iP.spinner = iP.image(options.imagesURL + "inlineLoading.gif", inlineStrokeWidth + inlinePreviewSpinnerInset, inlineStrokeWidth + inlinePreviewSpinnerInset, inlinePreviewX - (inlinePreviewSpinnerInset*2), inlinePreviewY - (inlinePreviewSpinnerInset*2));
            }
            else
            {
                iP = new Raphael( uword.popupX + rectPopupOffsetX + rectPaddingX + buttonBBox.width - inlineOffsetX - inlineArrowX, uword.popupY + el.attr('y') + el.attr('height')/2 - inlinePreviewY/2 - inlineStrokeWidth, inlinePreviewX + inlineArrowX + (inlineStrokeWidth*2), inlinePreviewY + (inlineStrokeWidth*2) );
                
                iP.back    = iP.path( rrectPathArrowLeft(inlineStrokeWidth + inlineArrowX, inlineStrokeWidth, inlinePreviewX, inlinePreviewY, inlinePopupCorners, inlineArrowX, inlineArrowY) );
                iP.outline = iP.path( rrectPathArrowLeft(inlineStrokeWidth + inlineArrowX, inlineStrokeWidth, inlinePreviewX, inlinePreviewY, inlinePopupCorners, inlineArrowX, inlineArrowY) );

                iP.spinner = iP.image(options.imagesURL + "inlineLoading.gif", inlineStrokeWidth + inlinePreviewSpinnerInset + inlineArrowX, inlineStrokeWidth + inlinePreviewSpinnerInset, inlinePreviewX - (inlinePreviewSpinnerInset*2), inlinePreviewY - (inlinePreviewSpinnerInset*2));
            }
            uword.inlinePaper = iP;
            
            iP.ULImage = el;

            iP.type = type;
            iP.URL  = URL;

            iP.outline.attr("stroke-width",   inlineStrokeWidth);
            iP.outline.attr("stroke-opacity", inlineStrokeOpacity);
            
            if( type == 'ultralinkme' )
            {
                iP.back.attr("fill", '#eee');
                if( jQ.browser.mozilla ){ iP.back.attr("opacity", '1.0'); }else{ iP.back.attr("opacity", '0.95'); } // bug in Firefox when using a non 1.0 scale factor
                iP.outline.attr("stroke", '#aab');
            }
            else
            {
                iP.back.attr("fill", inlineBackColor);
                if( jQ.browser.mozilla ){ iP.back.attr("opacity", '1.0'); }else{ iP.back.attr("opacity", generalOpacity); } // bug in Firefox when using a non 1.0 scale factor
                iP.outline.attr("stroke", inlineStrokeColor);
            }
            
            iP.back.node.parentNode.style.zIndex = "2147483646";

			var theContent = inlineContentCache[type + URL];
			
			if( theContent )
			{
				expandInlinePane(theContent, type);
			}
			else
			{
                switch( type )
                {                
                    case 'linkedin':
                    {
                             if( URL.match(RegExp(".*linkedin\.com\/(in|pub)")) ){ Ultralink.sendExtensionMessage('linkedinQuery', { "command" : "lookupPerson",  "URL" : URL }); } // Person
                        else if( URL.match(RegExp(".*linkedin\.com\/company"))  ){ Ultralink.sendExtensionMessage('linkedinQuery', { "command" : "lookupCompany", "URL" : URL }); } // Company
                        else{ removeOldInlinePopup(); }
                    } break;

                    case 'facebook':
                    {
                        Ultralink.sendExtensionMessage('facebookQuery', { "command" : "pagePosts", "URL" : URL });
                    } break;
                    
                    case 'videoyoutube':
                    {
                        if( URL.match(RegExp(".*youtube\.com")) )
                        {
                                 if( URL.match(RegExp(".*youtube\.com\/embed\/")) ){ expandInlinePane(URL, type); }
                            else if( URL.match(RegExp(".*youtube\.com\/watch"))   ){ var componentMatches = /.*youtube\.com\/watch\?.*v=(.+?)($|&)/.exec(URL); expandInlinePane(pageProtocol + "www.youtube.com/embed/" + componentMatches[1], type); }
                            else{ removeOldInlinePopup(); }
                        }
                        else{ removeOldInlinePopup(); }
                    } break;

                    case 'mapgoogle':
                    {
                        if( URL.match(RegExp(".*maps\.google\.com")) ){ var componentMatches = /.*maps\.google\.com(.*)/.exec(URL); expandInlinePane(pageProtocol + "maps.google.com" + componentMatches[1] + "&output=embed", type); }
                        else{ removeOldInlinePopup(); }
                    } break;

                    case 'ultralinkme':
                    {
                        var componentMatches = /.*ultralink\.me.*\/description\/((.*)\/)?(.+?)($|\?)/.exec(URL);

                        var database = componentMatches[2];
                        var wordID   = componentMatches[3];
                        
                        var dvURL = 'https://ultralink.me/extension/descriptionView.php?ID=' + encodeURIComponent(wordID) + '&pageTitle=' + encodeURIComponent(document.title) + '&pageURL=' + encodeURIComponent(location.href);

                        if( uword.multipleUltralinks )
                        {
                            var dul = getDataUl( uword, "data-ul" );
                            dvURL += '&dominantUltralink=' + encodeURIComponent(dul.ID);
                        }
                        
                        if( database )
                        {
                            dvURL += '&database=' + encodeURIComponent(database);
                        }
                        
                        if( wordID < 0 )
                        {
                            dvURL += '&word=' + encodeURIComponent(uword.textContent);
                            if( options.database != '' ){ dvURL += '&database=' + encodeURIComponent(options.database); }
                        }

                        expandInlinePane(dvURL, type);
                    } break;

                    case 'twitter':
                    {
                        var componentMatches = /.*twitter\.com.*\/(.+?)$/.exec(URL);
                        var account = componentMatches[1].replace('/', '');
                    
                        if( (jQ.inArray( 'twitter-auth', supportedInlineTypes ) != -1) || ((options.environment == 'extension') && (options.extension != 'IE')) )
                        {
                            Ultralink.sendExtensionMessage('twitterQuery', { "command" : "profile", "URL" : URL, "profile" : account });                            
                        }
                        else
                        {
                            var queryURL;
                            
                            queryURL = pageProtocol + "api.twitter.com/1/users/show.json?screen_name=" + encodeURIComponent(account);

                            jQ.ajax({ type: 'GET', dataType: 'jsonp', url: queryURL,
                                success: function(data)
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        theContent = { };
                                        
                                        theContent['screen_name']             = account;
                                        theContent['name']                    = data['name'];
                                        theContent['location']                = data['location'];
                                        theContent['description']             = data['description'];
                                        theContent['profile_image_url']       = data['profile_image_url'];
                                        theContent['profile_image_url_https'] = data['profile_image_url_https'];
                                    
                                        if( data['protected'] == false )
                                        {
                                            jQ.ajax({ type: 'GET', dataType: 'jsonp', url: pageProtocol + "api.twitter.com/1/statuses/user_timeline.json?trim_user=1&screen_name=" + encodeURIComponent(account),
                                                success: function(data2)
                                                {
                                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                                    {
                                                        theContent['timeline'] = data2;
                                                        
                                                        inlineContentCache[type + URL] = theContent;
                                                        
                                                        expandInlinePane(theContent, type);
                                                    }
                                                },
                                                error: function()
                                                {
                                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                                    {
                                                        removeOldInlinePopup();
                                                    }
                                                }
                                            });
                                        }
                                        else
                                        {
                                            inlineContentCache[type + URL] = theContent;

                                            expandInlinePane(theContent, type);
                                        }
                                    }
                                },
                                error: function()
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        removeOldInlinePopup();
                                    }
                                }
                            });
                        }
                    } break;
                    
                    case 'wikipedia':
                    {
                        if( (options.environment == 'extension') && (options.extension != 'IE') )
                        {
                            Ultralink.sendExtensionMessage('wikipediaQuery', { "command" : "page", "URL" : URL });                            
                        }
                        else
                        {
                            var componentMatches = /(.*)\:\/\/(.*)\/wiki\/(.*)/.exec(URL);
                            var queryURL = pageProtocol + componentMatches[2] + "/w/api.php?action=parse&format=json&redirects=&prop=text&section=0&page=" + encodeURIComponent(componentMatches[3]);

                            jQ.ajax({ type: 'GET', dataType: 'jsonp', url: queryURL,
                                success: function(data)
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        theContent = data;
                                        inlineContentCache[type + URL] = theContent;
                                        
                                        expandInlinePane(theContent, type);
                                    }
                                },
                                error: function()
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        removeOldInlinePopup();
                                    }
                                }
                            });
                        }
                    } break;

                    case 'mediawiki':
                    {
                        if( (options.environment == 'extension') && (options.extension != 'IE') && (!isChrome) )
                        {
                            Ultralink.sendExtensionMessage('mediawikiQuery', { "command" : "page", "URL" : URL });                            
                        }
                        else
                        {
                            var componentMatches = /(.*)\:\/\/(.*?)\/(wiki\/index\.php\/)?(wiki\/)?(.*)/.exec(URL);
                            var queryURL = componentMatches[1] + "://" + componentMatches[2] + "/wiki/api.php?action=parse&format=json&redirects=&prop=text&section=0&page=" + encodeURIComponent(componentMatches[5]);

                            var dType = 'jsonp'; if( isChrome ){ dType = 'json' }

                            jQ.ajax({ type: 'GET', dataType: dType, url: queryURL,
                                success: function(data)
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        theContent = data;
                                        theContent.pageURL = URL;
                                        inlineContentCache[type + URL] = theContent;
                                        
                                        expandInlinePane(theContent, type);
                                    }
                                },
                                error: function()
                                {
                                    if( (currentUword != undefined) && (currentUword.inlinePaper != undefined) && (typeof type != "undefined") && (typeof URL != "undefined") && (currentUword.inlinePaper.type == type) && (currentUword.inlinePaper.URL == URL)  )
                                    {
                                        removeOldInlinePopup();
                                    }
                                }
                            });
                        }
                    } break;

                    default:
                    {
                        
                    }
                }
			}
            
            var rehookTimer = 10; if( touchInterface ){ rehookTimer = 1000; }
            
            setTimeout( function()
            {
                if( uword.inlinePaper.ULImage != undefined )
                {
                    uword.inlinePaper.ULImage.attr("href", uword.inlinePaper.ULImage.attr("href"));
                    attachClickRecorder(uword.inlinePaper.ULImage.node.parentNode);
                }
            }, rehookTimer );
        }
    }
}

// Init
Ultralink.setOptions = function( userOptions )
{
    var attrname;
    for( attrname in userOptions )
    {
//        console.log(attrname + " - " + userOptions[attrname]);
        
        options[attrname] = userOptions[attrname];
        if( attrname == 'basePath' ){ basePath = options.basePath; }
    }

    if( options.failsafe == 'false' ){ clearAllHighlights(); }
}

function reallyStartUltralink( userOptions )
{
    if( alreadyStarted == false )
    {
        alreadyStarted = true;

        jQ.expr[':'].icontains = function(obj, index, meta, stack){ return (obj.textContent || obj.innerText || jQ(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0; };

        resetConstants();

        Ultralink.setOptions( userOptions );

        jQ('ultralinkloaded').bind('DOMSubtreeModified', function(e){ consumeDOMQueue( this ); });
        
        consumeDOMQueue( jQ('ultralinkloaded')[0] );

        if( touchInterface )
        {
            document.addEventListener("touchend", function( event )
            {
                var touches = event.changedTouches;

                if( touches.length == 1 )
                {
                    var first = touches[0];
                    switch(event.type)
                    {
                        case "touchend":
                        {
            //                clearAllHighlights();

                            setTimeout(function() // Takes advantage of a bug in iOS 6 that prevents setTimeout/setInterval from executing during pans
                            {
                                eventBoundsCheck( first );
                                
                                if( sections.length > 0 )
                                {
                                    for( var s = 0; s < sections.length; s++ )
                                    {
                                        if( elementInView(sections[s]) )
                                        {
                                            jQ("uword", sections[s]).each( function()
                                            {
                                                var ul = getDataUl( this, "data-ul" );
                                                
                                                if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
                                                {
                                                    if( elementInView(this) )
                                                    {
                                                        setShadowRipple(this, first);
                                                    }
                                                }
                                            } );
                                        }
                                    }
                                }
                                else
                                {
                                    var lastHighlightHit = false;
                                    var firstHighlightHit = false;
                                                        
                                    jQ("uword").each( function()
                                    {
                                        if( lastHighlightHit == false )
                                        {
                                            var ul = getDataUl( this, "data-ul" );
                                        
                                            if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
                                            {
                                                if( elementInView(this) )
                                                {
                                                    setShadowRipple(this, first);

                                                    firstHighlightHit = true;
                                                }
                                                else if( firstHighlightHit == true )
                                                {
                                                    lastHighlightHit = true;
                                                }
                                            }
                                        }
                                    } );
                                }
                            }, 10 );
                        } break;
                        default: return;
                    }
                }
            }, true);
        }
        else
        {
            jQ(document).mousemove(function(event)
            {
                if( ulInlineOut != true ){ eventBoundsCheck( event ); }
                
                if( currentUword == undefined )
                {
                    if( (options.failsafe == 'true') && (options.proximityFade == 'true') )
                    {
                        if( sections.length > 0 )
                        {
                            for( var s = 0; s < sections.length; s++ )
                            {
                                if( elementInView(sections[s]) )
                                {
                                    takeCareOfSection( sections[s] );
                                    
                                    jQ("uword", sections[s]).each( function()
                                    {
                                        setShadowCallout( this, event );
                                    } );
                                }
                            }
                        }
                        else
                        {
                            var lastHighlightHit = false;
                            var firstHighlightHit = false;

                            jQ("uword").each( function()
                            {
                                if( lastHighlightHit == false )
                                {
                                    var ul = getDataUl( this, "data-ul" );
                                    if( !(ul && (ul['callout']) && (ul['callout'] == 'normal')) )
                                    {
                                        if( elementInView(this) )
                                        {
                                            setShadowCallout( this, event );

                                            firstHighlightHit = true;
                                        }
                                        else if( firstHighlightHit == true )
                                        {
                                            lastHighlightHit = true;
                                        }
                                    }
                                }
                            } );
                        }
                    }
                }
            });
            
            jQ(document).click( function(event){ eventBoundsCheck( event ); });
            
            jQ(document).keydown(function(event)
            {
				if( (options.failsafe == 'true') && event.altKey )
				{
					highlightVisibleUltralinks();
				}
                
                if( event.shiftKey ){ shiftDown = 1; }
            } );

            jQ(document).keyup(function(event)
            {
                if( !(event.altKey) ){ clearAllHighlights(); }
            } );
        }

        jQ(window).scroll( function()
        {
            for( var s = 0; s < sections.length; s++ )
            {
                if( elementInView(sections[s]) )
                {
                    takeCareOfSection( sections[s] );
                }
            }
        } );

        jQ(document).ready( function()
        {
            bodyCheck();
            
            setTimeout( function()
            {
                bodyCheck();

                var checkTimes = 0;
                var bodyCheckInterval = setInterval(function(){ bodyCheck(); checkTimes++; if( checkTimes > 15 ){ clearInterval(bodyCheckInterval); } }, 2000);
            }, 1000 );

            document.body.onmousedown = function( e ){ mouseDown = 1; }
            document.body.onmouseup   = function( e ){ mouseDown = 0; }
        } );

        if( options.scanFirst == 'true' )
        {
            scanFirst();
// TAKING THIS OUT FOR NOW BECAUSE IT IS MAKING US NOT A GOOD HOUSEGUEST        
//            jQ("a", document).each( function(){ attachClickRecorder(this); } );
        }
        else
        {
            Ultralink.uwordScanPage(document);
        }
    }
    else
    {
        Ultralink.setOptions( userOptions );
    }
}

Ultralink.startUltralink = function( userOptions )
{
    if( !userOptions ){ userOptions = ""; }
    else if( userOptions.basePath ){ basePath = userOptions.basePath; }

    var reallyStart = false;

    if( (typeof jQuery != "undefined") && (typeof Raphael != "undefined") )
    {
        jQuery.isVersion = isVersion;
        if( !jQuery.isVersion("1.7", ">") ){ jQ = jQuery; }
        
        if( jQ != undefined ){ reallyStart = true; }
        else{ passedOptions = userOptions; }
    }
    else{ passedOptions = userOptions; }

    if( reallyStart )
    {
        reallyStartUltralink(userOptions);
    }
    else
    {
        if( typeof jQuery == "undefined" ){ loadScript(basePath + 'ultralinkLibraries/jquery-min.js', loadCallback); }
        else
        {
            jQuery.isVersion = isVersion;
            if( jQuery.isVersion("1.7", ">") )
            {
                oldJQuery = jQuery;
                loadScript(basePath + 'ultralinkLibraries/jquery-min.js', loadCallback);
            }
        }
        if( typeof Raphael == "undefined" ){ loadScript(basePath + 'ultralinkLibraries/raphael+patch-min.js', loadCallback); }
    }
}

Ultralink.loaded = true;

// Detect that another copy of ultralink has already loaded
var head = document.getElementsByTagName('head')[0];
if( head ){ for( var i = 0; i < head.children.length; i++ ){ if( head.children[i].tagName.toLowerCase() == "ultralinkloaded" ){ Ultralink.loaded = false; } } }else{ Ultralink.loaded = false; }

if( Ultralink.loaded )
{
    head.appendChild(document.createElement('ultralinkloaded'));
    var uwordStyle = document.createElement('style');
    uwordStyle.type = 'text/css';
    uwordStyle.textContent = 'uword { white-space: nowrap; cursor: pointer; }';
    head.appendChild(uwordStyle);

    if( typeof window.Ultralink == 'undefined' ){ window.Ultralink = Ultralink; }
}

var theDefine;

     if( typeof define == 'function' ){ theDefine = define; }
else if( (typeof CloudFlare != 'undefined') && (CloudFlare.define) ){ theDefine = CloudFlare.define; }

if( theDefine ){ theDefine( ['ultralinkLibraries/jquery-min.js', 'ultralinkLibraries/raphael+patch-min.js'], function(){ return Ultralink; } ); }

}());
