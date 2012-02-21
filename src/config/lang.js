$$.Config.set( 'lang', function (){
  var lang = 'Unknown';

  if( navigator.language ){
    lang = navigator.language;
  }else if( navigator.browserLanguage ){
    lang = navigator.browserLanguage;
  }
  return lang;
}());
