CloudFlare.define("cfapp_ultralink", ["cfapp_ultralink/config", "ultralink"], function( config, Ultralink )
{
    var database = ""; if( (config.database != null) && (config.database != "") ){ database = config.database; }

    if( Ultralink.loaded )
    {
        var pageProtocol = ("https:" == document.location.protocol ? "https://" : "http://");
        var cdnPath = pageProtocol + "ajax.cloudflare.com/cdn-cgi/nexp/apps/ultralink/";
    
        Ultralink.startUltralink( { 'basePath' : cdnPath + "javascripts/", 'imagesURL' : cdnPath + "images/ultralinkImages/", 'database' : database } );
    }
} );
