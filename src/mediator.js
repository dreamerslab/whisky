/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Loose coupling cross module communication.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Event = require( 'Event' );

/**
 * Exports module.
 */
  exports( 'mediator', new Event( 'WHISKY:mediator' ));
});