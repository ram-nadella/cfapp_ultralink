CloudFlare.define("cfapp_ultralink", ["cloudflare/dom", "cfapp_ultralink/config", "https://ultralink.me/ultralink.js"], function( dom, config, ultralink )
{
    var database = ""; if( (config.database != null) && (config.database != "") ){ database = config.database; }
    
    var head = document.getElementsByTagName('head', true)[0];
        var script = dom.createElement("script");
        dom.setAttribute(script, "type", "text/javascript");
        script.textContent = "startUltralink( { 'database' : '" + database + "' } );";
    head.appendChild(script);
} );
