/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Controller class adaptor.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Trunk    = require( 'Trunk' );
  var Class    = require( 'Class' );
  var Response = require( 'Response' );
  var log      = require( 'logger' );

/**
 * Store session data in a private object in the closure.
 * Session can be used accross controllers and actions.
 * @private
 */
  var session = {};


/**
 * Controller class adaptor.
 * @public
 */
  var Controller = Trunk.extend({
    get : function ( name , options ){
      return ( function ( controller, res ){
        return function ( action, params, query ){
          var req = {
            params : params,
            query : query,
            session : session
          };

          if( controller[ action ] === undefined ){
            return log( 'WHISKY::controller.get( name, options )( action, params, query ) `action` not defined', {
              action : action,
              params : params,
              query : query
            });
          }

          controller[ action ]( req, res );
        };
      })( new Class.extend( this._super( name ))( options ), new Response( name ));
    }
  });

/**
 * Exports module.
 */
  exports( 'controller', new Controller( 'WHISKY::controller' ));
});