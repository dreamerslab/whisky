/*!
 * WHISKY
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * In memory data store
 */

/**
 * Setup Trunk module in a closure
 * @this {window|global}
 * @param {Object} root The global object, window or global.
 * @param {Object} $$ WHISKY object.
 * @param {Object} $ jQuery or Zepto object.
 */
( function ( root, $$, $ ){
  $$.Trunk = $$.Class.extend({

/**
 * Class constructor. Setup the default values.
 * @this {$$.Trunk}
 * @param {String|Object} key Data key if arg is sting || Data set if arg is an object.
 * @param {String|Number|Array|Object|Function|null} val Data value.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new $$.Trunk({
 *       age : 17,
 *       name : 'ben',
 *       'do-some-thing' : function( arg1, arg2, arg3 ){
 *         // do something here
 *       }
 *     });
 */
    init : function ( key, val ){
      var is     = $$.is( key );
      this.trunk = {};

      if( is === 'string' ){
        this.set( key, val );
        return this;
      }

      if( is === 'object' ){
        this.trunk = key;
        return this;
      }

      $$.Log.err( 'Trunk', 'First argument must a string or an object' );
    },




/**
 * Store data in a closure to be called or withdraw later.
 * @this {$$.Trunk}
 * @param {String} key Data key.
 * @param {String|Number|Array|Object|Function} val Data value.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new $$.Trunk();
 *     cache.set( 'age', 17 );
 *     cache.set( 'name', 'ben' );
 *     cache.set( 'do-some-thing', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
    set : function( key, val ){
      // data can be overwritten
      this.trunk[ key ] = va;

      return this;
    },



/**
 * Get stored data.
 * @this {$$.Trunk}
 * @param {String} key Data key.
 * @returns {data|false} Return the stored data if available.
 * @example
 *
 *     var cache = new $$.Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     var age = cache.get( 'age' );
 */
    get : function( key ){
      // make sure the calling out name exist
      if( this.trunk[ key ] !== undefined ){
        return this.trunk[ key ];
      }
      return false;
    },



/**
 * Calling a stored function.
 * @this {$$.Trunk}
 * @param {String} arguments[ 0 ] Data key.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] Arguments to be passed to the stored function.
 * @returns {Result} Return the executed function result.
 * @example
 *
 *     var cache = new $$.Trunk({
 *       'do-some-thing' : function( arg1, arg2, arg3 ){
 *         // do something here
 *       }
 *     });
 *     // You can pass as many arguments as you wish
 *     cache.execute( 'do-some-thing', arg1, arg2, arg3 ... );
 */
    execute : function(){
      var key, tmp;

      key = [].shift.call( arguments );
      // make sure the calling function exist
      if( this.trunk[ key ] !== undefined ){

        // execute store function
        tmp = this.trunk[ key ];
        if( $$.is( tmp ) === 'function' ){
          // do we need to turn `arguments` to an `array` in ecma-262?
          return tmp.apply( this, [].slice.call( arguments ));
        }else{
          $$.Log.err( 'Trunk', 'method "execute" - "' + key + '" is not a function' );
        }
      }
    },



/**
 * Remove stored data.
 * @this {$$.Trunk}
 * @param {String} key Data key.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new $$.Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.remove( 'age' );
 */
    remove : function( key ){
      delete this.trunk[ key ];

      return this;
    },



/**
 * Clear trunk.
 * @this {$$.Trunk}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new $$.Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.clear();
 */
    clear : function (){
      this.trunk = {};

      return this;
    }
  });
})( this, WHISKY, jQuery || Zepto );
