/*!
 * WHISKY
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * In memory data store class
 */

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

    if( is === 'String' ){
      this.set( key, val );
      return this;
    }

    if( is === 'Object' ){
      this.trunk = key;
      return this;
    }

    $$.Log( 'Trunk', 'Class constructor first argument must a string or an object', {
      key : key,
      val : val
    });
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
    this.trunk[ key ] = val;

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
    return this.trunk[ key ] !== undefined ?
      this.trunk[ key ] : false;
  },

/**
 * Calling a stored function.
 * @this {$$.Trunk}
 * @param {String} arguments[ 0 ] Data key.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] Arguments to be passed to the stored function.
 * @returns {Result} Return the triggerd function result.
 * @example
 *
 *     var cache = new $$.Trunk({
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

      if( $$.is( tmp ) === 'Function' ){
        return tmp.apply( this, arguments );
      }else{
        $$.Log( 'Trunk', 'method `trigger` on - `' + key + '` is not a function' );
      }
    }

    return this;
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
 * Reset trunk.
 * @this {$$.Trunk}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var cache = new $$.Trunk();
 *     cache.set( 'age', 17 );
 *     // somewhere in another class or function
 *     cache.reset();
 */
  reset : function (){
    this.trunk = {};

    return this;
  }
});
