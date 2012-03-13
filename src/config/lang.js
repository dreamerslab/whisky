/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Browser language detection
 */
$$.Config.set( 'lang', function (){
  if( navigator.language ){
    return navigator.language;
  }

  if( navigator.browserLanguage ){
    return navigator.browserLanguage;
  }

  return 'Unknown';
}());
