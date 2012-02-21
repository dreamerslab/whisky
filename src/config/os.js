$$.Config.set( 'os', function (){
  var os        = 'Unknown';
  var platform  = navigator.platform;
  var userAgent = navigator.userAgent;

  var oss = [
    { 'searchString' : platform, 'name' : 'Windows', 'subStr': 'Win' },
    { 'searchString' : platform, 'name' : 'Mac', 'subStr': 'Mac' },
    { 'searchString' : platform, 'name' : 'Linux', 'subStr': 'Linux' },
    { 'searchString' : userAgent, 'name' : 'iPhone', 'subStr': 'iPhone' },
    { 'searchString' : userAgent, 'name' : 'iPad', 'subStr': 'iPod' },
    { 'searchString' : userAgent, 'name' : 'Android', 'subStr': 'Android' }
  ];

  var i  = 0;
  var j  = oss.length;

  for( ; i < j; i++ ){
    if( oss[ i ].searchString.indexOf( oss[ i ].subStr ) != -1 ){
      os = oss[ i ].name;
      return os;
    }
  }

  return os;
}());
