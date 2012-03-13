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

    _controller : function ( controller, res ){
      var action = function ( action_name, params, query ){
        var req = {
          params : params,
          query : query,
          session : session
        };

        if( controller[ action_name ] === undefined ){
          return log(
            'WHISKY::controller.get( name, options )( action_name, params, query ) `action_name` not defined', {
              action_name : action_name,
              params : params,
              query : query
            });
        }

        controller[ action ]( req, res );
      };

      return action;
    },

    get : function ( name , options ){
      var actions    = this._super( name );
      var Controller = Class.extend( actions );
      var controller = new Controller( options );
      var res        = new Response( name );

      return this._controller( controller, res );
    }
  });

/**
 * Exports module.
 */
  exports( 'controller', new Controller( 'WHISKY::controller' ));
});

