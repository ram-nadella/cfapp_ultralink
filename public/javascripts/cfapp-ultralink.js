CloudFlare.define("cfapp_ultralink", ["cloudflare/dom", "cfapp_ultralink/config", "https://ultralink.me/ultralink.js"], function( dom, config, ultralink )
{
//    var head = document.getElementsByTagName('head', true)[0]
//        var script = dom.createElement("script");
//        dom.setAttribute(script, "type", "text/javascript");
//        dom.setAttribute(script, "src", "https://ultralink.me/ultralink.js");
//    head.appendChild(script);
        
    var arguments = {};

    if( config.database != "" ){ arguments['database'] = config.database; }

    window.startUltralink( arguments );
} );
