/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * User OS detection. Modified from Zepto.js
 * Copyright(c) 2012 Thomas Fuchs Zepto.js
 * MIT Licensed.
 */
$$.Config.set( 'os', function ( ua ){
  var match = {
    windows    : ua.match( /(Windows)[a-zA-Z\s]+([\d.]+)/ ),
    mac        : ua.match( /(Mac)[a-zA-Z\s]+([\d._]+)/ ),
    linux      : ua.match( /(Linux)\s([a-zA-Z][\d._]+)/ ),
    android    : ua.match( /(Android)\s+([\d.]+)/ ),
    ipad       : ua.match( /(iPad).*OS\s([\d_]+)/ ),
    iphone     : !match.ipad && ua.match( /(iPhone\sOS)\s([\d_]+)/ ),
    webos      : ua.match( /(webOS|hpwOS)[\s\/]([\d.]+)/ ),
    touchpad   : match.webos && ua.match( /TouchPad/ ),
    blackberry : ua.match( /(BlackBerry).*Version\/([\d.]+)/ )
  };

  var os = {};
  var t  = true;
  var key;

  for( key in match ){
    if( match[ key ]){
      os[ key ] = t;

      if( match[ key ].version ){
        os.version = match[ key ][ 2 ].replace( /_/g, '.' );
      }

      return os;
    }
  }

  return 'Unknown';
}( window.navigator.userAgent ));
