/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Logger for debugging. Use console.log if avaliable instead of alert.
 */

/**
 * Setup Logger module in a closure
 * @this {window|global}
 * @param {Object} root The global object, window or global.
 * @param {Object} $$ WHISKY object.
 * @param {Object} $ jQuery or Zepto object.
 */
( function ( root, $$, $ ){
  var log = console && console.log ?
    console.log : alert;

  var json = root.JSON.stringify;

  if( $( '#whisky-config' ).attr( 'env' ) === 'prod' ){
    log  = function (){};
    json = function (){};
  }

/**
 * Log debugging msg and args.
 * @this {$$.Log}
 * @param {String} module Module name.
 * @param {String} msg A message to be logged.
 * @param {Object} args An Object to be logged if it exists.
 * @example
 *
 *     $$.Log( 'Trunk', 'Class constructor first argument must a string or an object', {
 *       key : key,
 *       val : val
 *     });
 */
  $$.Log = function ( module, msg, args ){
    var args = args === undefined ?
      '' : '\nargs: ' + json( args );

    log( '[WHISKY][' + module + ']\nmsg: ' + msg + args );
  };
})( this, WHISKY, jQuery || Zepto );
