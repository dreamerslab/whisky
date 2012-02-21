/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Instance of $$.Trunk. Place to store app configs.
 */

$$.Config = new $$.Trunk({
  $ : jQuery === undefined ? 'zepto' : 'jquery',
  cookie : root.navigator.cookieEnabled,
  env : $( '#whisky-config' ).attr( 'env' )
});