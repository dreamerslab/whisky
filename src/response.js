/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Action response Class.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Class = require( 'Class' );
  var view  = require( 'view' );
  var info  = require( 'utils' ).info;

/**
 * Response class.
 * @public
 * @class
 */
  var Response = Class.extend({

/**
 * Assign view name to class prop.
 * @constructor
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 */
    init : function ( name ){
      var info     = info( name );
      this._module = info.module;
      this._class  = info.klass;
    },

    _partial : function( name, args ){
      args = this._inject( args );

      return require( name )( args )
    },

    inject : function ( action, name, args ){
      // inject helper, partials here

    },

/**
 * Replace the target inner content with the given html.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.html( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-top'),
 *       title : 'blah'
 *     });
 */
    html : function ( name, args ){
      args.$target.html( view.render( name, args ));
    },

/**
 * Replace the target inner content with the given escaped html.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.text( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-top'),
 *       title : 'blah'
 *     });
 */
    text : function ( name, args ){
      args.$target.text( view.render( name, args ));
    },

/**
 * Insert the given content as the last child (inside)of the target.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.append( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-node'),
 *       title : 'blah'
 *     });
 */
    append : function ( name, args ){
      args.$target.append( view.render( name, args ));
    },

/**
 * Insert the given content as the first child (inside)of the target.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.prepend( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-top'),
 *       title : 'blah'
 *     });
 */
    prepend : function ( name, args ){
      args.$target.prepend( view.render( name, args ));
    },

/**
 * Insert the given content after the target.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.after( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-top'),
 *       title : 'blah'
 *     });
 */
    after : function ( name, args ){
      args.$target.after( view.render( name, args ));
    },

/**
 * Insert the given content before the target.
 * @public
 * @this {Response}
 * @example
 *
 *     var res = new Response( 'WHISKY::Tree' );
 *     res.before( 'WHISKY::Tree.index', {
 *       $target : $( '#tree-top'),
 *       title : 'blah'
 *     });
 */
    before : function ( name, args ){
      args.$target.before( view.render( name, args ));
    }
  });

/**
 * Exports module.
 */
  exports( 'Response', Response );
});