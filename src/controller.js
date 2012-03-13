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

    action : function ( action_name, params, query ){
      var controller = this.controller;
      var req = {
        params : params,
        query : query,
        session : session
      };

      if( controller[ action_name ] === undefined ){
        return log(
          'WHISKY::Controller.action( action_name, params, query ) `action_name` not defined', {
            action_name : action_name,
            params : params,
            query : query
          });
      }

      controller[ action ]( req, this.res );
    },

    get : function ( name , options ){
      var self       = this;
      var actions    = this._super( name );
      var Controller = Class.extend( actions );

      this.controller = new Controller( options );
      this.res        = new Response( name );

      // it's better to give it a wrapper to prevent `this` scope conflict
      return function ( action_name, params, query ){
        self.action( action_name, params, query );
      };
    }
  });

/**
 * Exports module.
 */
  exports( 'controller', new Controller( 'WHISKY::controller' ));
});

