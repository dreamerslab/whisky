/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Logger for debugging. Use console.log instead of alert if it isavaliable.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var config = require( 'config' );

/**
 * Short cut functions.
 */
  var json = root.JSON.stringify;
  var log = console && console.log ?
    console.log : alert;

  if( config.env === 'prod' ){
    log  = function (){};
    json = function (){};
  }

/**
 * Log debugging msg and args.
 * @public
 * @this {logger}
 * @param {String} msg A message to be logged.
 * @param {Object} args An Object to be logged if it exists.
 * @example
 *
 *     log( 'WHISKY::Event.on( name, fn ) argument `name` must be a string', {
 *       key : key,
 *       val : val
 *     });
 */
  var logger = function ( msg, args ){
    var args = args === undefined ?
      '' : '\nargs: ' + json( args );

    log( msg + args );
  };

/**
 * Exports module.
 */
  exports( 'log', logger );
});