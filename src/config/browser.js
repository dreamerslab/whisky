/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * A browser detector. Modified from https://github.com/ded/bowser
 * Copyright(c) 2012 Dustin Diaz https://github.com/ded/bowser
 * MIT Licensed.
 */
$$.Config.set( 'browser', function ( ua ){
  function detect ( ua ){
    var ie            = /msie/i.test( ua );
    var chrome        = /chrome/i.test( ua );
    var safari        = /safari/i.test( ua ) && !chrome;
    var iphone        = /iphone/i.test( ua );
    var ipad          = /ipad/i.test( ua );
    var android       = /android/i.test( ua );
    var opera         = /opera/i.test( ua );
    var firefox       = /firefox/i.test( ua );
    var gecko         = /gecko\//i.test( ua );
    var seamonkey     = /seamonkey\//i.test( ua );
    var webkitVersion = /version\/(\d+(\.\d+)?)/i;
    var t             = true;
    var o;

    if( ie ) return {
      msie : t,
      version : ua.match( /msie (\d+(\.\d+)?);/i )[ 1 ]
    };

    if( chrome ) return {
      webkit: t,
      chrome: t,
      version: ua.match( /chrome\/(\d+(\.\d+)?)/i )[ 1 ]
    };

    if( iphone || ipad ){
      o = {
        webkit: t,
        mobile: t,
        ios: t,
        iphone: iphone,
        ipad: ipad,
      };
      // WTF: version is not part of user agent in web apps
      if( webkitVersion.test( ua )){
        o.version = ua.match( webkitVersion )[ 1 ];
      }

      return o;
    }

    if( android ) return {
      webkit : t,
      android : t,
      mobile : t,
      version : ua.match( webkitVersion )[ 1 ]
    };

    if( safari ) return {
      webkit : t,
      safari : t,
      version : ua.match( webkitVersion )[ 1 ]
    };

    if( opera ) return {
      opera: t,
      version : ua.match( webkitVersion )[ 1 ]
    };

    if( gecko ){
      o = {
        gecko : t,
        mozilla : t,
        version : ua.match( /firefox\/(\d+(\.\d+)?)/i )[ 1 ]
      };

      if( firefox ) o.firefox = t;

      return o;
    }

    if( seamonkey ) return {
      seamonkey : t,
      version : ua.match( /seamonkey\/(\d+(\.\d+)?)/i )[ 1 ]
    };

    return 'Unknown';
  }

  var bowser = detect( ua );
  var t      = true;

  // Graded Browser Support
  // http://developer.yahoo.com/yui/articles/gbs
  if(( bowser.msie && bowser.version >= 6 ) ||
     ( bowser.chrome && bowser.version >= 10 ) ||
     ( bowser.firefox && bowser.version >= 4.0 ) ||
     ( bowser.safari && bowser.version >= 5 ) ||
     ( bowser.opera && bowser.version >= 10.0 )){
    bowser.a = t;

  }else if(( bowser.msie && bowser.version < 6 ) ||
           ( bowser.chrome && bowser.version < 10 ) ||
           ( bowser.firefox && bowser.version < 4.0 ) ||
           ( bowser.safari && bowser.version < 5 ) ||
           ( bowser.opera && bowser.version < 10.0 )){
    bowser.c = t;

  }else bowser.x = t;

  return bowser;
}( window.navigator.userAgent ));
