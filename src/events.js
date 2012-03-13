/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Application events control.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Class = require( 'Class' );
  var log   = require( 'logger' );
  var is    = require( 'utils' ).is;

/**
 * Store events in a private array in the closure.
 * @private
 */
  var trunk = [];

/**
 * Push an event to the trunk( queue ) if `Event` is an object. Otherwise flush the event queue.
 * @public
 * @this {Events}
 * @param {Object} Event The event to be pushed to the trunk( optional ).
 * @example
 *
 *     // push an event
 *     Events({
 *       init : function(){},
 *       render : function(){}
 *     });
 *
 *     // trigger events
 *     Events();
 */
  var Events = function ( Event ){
    // push event to the queue
    if( is( Event ) === 'object' ){
      trunk.push( Class.extend( Event ));
      return;
    }

    // flush the queue
    if( Event === undefined ){
      var i = 0;
      var j = trunk.length;

      for( ; i < j; i++ ){
        new trunk.shift();
      }

      return;
    }

    log( 'WHISKY::Events( Event ) argument `Event` must be an object', {
      Event : Event
    });
  };

/**
 * Exports module.
 */
  exports( 'Events', Events );
});