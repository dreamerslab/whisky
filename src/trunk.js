/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * In memory data store class.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Class = require( 'Class' );
  var is    = require( 'utils' ).is;
  var log   = require( 'logger' );

/**
 * Trunk class.
 * @public
 * @class
 */
  var Trunk = Class.extend({

/**
 * Setup the default values.
 * @constructor
 * @this {Trunk}
 * @param {String|Object} key Data key if arg is sting || Data set if arg is an object.
 * @param {String|Number|Array|Object|Function|null} val Data value.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new Trunk({
 *       age : 17,
 *       name : 'ben',
 *       'do-some-thing' : function( arg1, arg2, arg3 ){
 *         // do something here
 *       }
 *     });
 */
    init : function ( name ){
      this._name = name;
      this.reset();

      return this;
    },

/**
 * Store data in a closure to be called or withdraw later.
 * @public
 * @this {Trunk}
 * @param {String} key Data key.
 * @param {String|Number|Array|Object|Function} val Data value.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new Trunk();
 *     cache.set( 'age', 17 );
 *     cache.set( 'name', 'ben' );
 *     cache.set( 'do-some-thing', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
    set : function( key, val ){
      if( is( key ) !== 'String' ){
        return log( this._name + '.set( key, val ) argument `key` must be a string', {
          key : key,
          val : val
        });
      }

      // data can be overwritten
      this.trunk[ key ] = val;

      return this;
    },

/**
 * Get stored data.
 * @public
 * @this {Trunk}
 * @param {String} key Data key.
 * @returns {data|false} Return the stored data if available.
 * @example
 *
 *     var cache = new Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     var age = cache.get( 'age' );
 */
    get : function( key ){
      if( is( key ) !== 'String' ){
        return log( this._name + '.get( key ) argument `key` must be a string', {
          key : key
        });
      }

      // make sure the calling out name exist
      return this.trunk[ key ] !== undefined ?
        this.trunk[ key ] : false;
    },

/**
 * Calling a stored function.
 * @public
 * @this {Trunk}
 * @param {String} arguments[ 0 ] Data key.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] Arguments to be passed to the stored function.
 * @returns {Result} Return the triggerd function result.
 * @example
 *
 *     var cache = new Trunk({
 *       'do-some-thing' : function( arg1, arg2, arg3 ){
 *         // do something here
 *       }
 *     });
 *     // You can pass as many arguments as you wish
 *     cache.trigger( 'do-some-thing', arg1, arg2, arg3 ... );
 */
    trigger : function(){
      var key = [].shift.call( arguments );
      // make sure the calling function exist
      if( this.trunk[ key ] !== undefined ){

        // trigger stored function
        var tmp = this.trunk[ key ];

        if( is( tmp ) === 'Function' ){
          return tmp.apply( this, arguments );
        }else{
          return log( this._name + '.trigger() first argument `' + key + '` is not a function', {
            name : name,
            fn : fn
          });
        }
      }
    },

/**
 * Remove stored data.
 * @public
 * @this {Trunk}
 * @param {String} key Data key.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.remove( 'age' );
 */
    remove : function( key ){
      if( is( key ) === 'String' ){
        delete this.trunk[ key ];
      }

      return this;
    },

/**
 * Reset trunk.
 * @public
 * @this {Trunk}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.reset();
 */
    reset : function (){
      this.trunk = {};

      return this;
    },

/**
 * List trunk items.
 * @public
 * @this {Trunk}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.reset();
 */
    list : function (){
      var list = [];
      var name;

      for( name in this.trunk ){
        list.push( name );
      }

      log( this._name + 'list()', list );

      return this;
    }
  });

/**
 * Exports module.
 */
  exports( 'Trunk', Trunk );
});
