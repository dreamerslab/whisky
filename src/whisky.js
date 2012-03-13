/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Initialize WHISKY with some helper functions.
 */

/**
 * Setup WHISKY in a closure
 * @this {window|global}
 * @param {Object} root The global object, window or global.
 */
( function ( root ){

  root.WHISKY = {

/**
 * Array Remove - By John Resig (MIT Licensed)
 * Remove an item or a group of items from an array
 * @this {WHISKY}
 * @param {Array} arr The target array.
 * @param {Number} from Start point.
 * @param {Number} to End point.
 * @returns {Array} Return a new array.
 * @example
 *
 *     var arr = [ 'fish', 'fishes', 'fish', '1', 'fishes' ];
 *     var new_arr;
 *     // remove the second item from the array
 *     new_arr = $$.arr_remove( arr, 1 );
 *     // remove the second-to-last item from the array
 *     new_arr = $$.arr_remove( arr, -2 );
 *     // remove the second and third items from the array
 *     new_arr = $$.arr_remove( arr, 1, 2 );
 *     // remove the last and second-to-last items from the array
 *     new_arr = $$.arr_remove( arr, -2, -1 );
 */
    arr_remove : function ( arr, from, to ){
      var rest = arr.slice(( to || from ) + 1 || arr.length );
      arr.length = from < 0 ? arr.length + from : from;

      return arr.push.apply( arr, rest );
    },

/**
 * http://dreaminginjavascript.wordpress.com/2008/08/22/eliminating-duplicates/
 * Remove duplicates in an array
 * @this {WHISKY}
 * @param {Array} arr The target array.
 * @returns {Array} Return a new array.
 * @example
 *
 *     var clean = $$.arr_remove_dups([ 'fish', 'fishes', 'fish', '1', 'fishes' ]);
 *     console.log( clean ); // [ 'fish', 'fishes', '1' ]
 */
    arr_remove_dups : function ( arr ){
      var len = arr.length;
      var out = [];
      var obj = {};
      var i   = 0;
      var key;

      for( ; i < len; i++ ) obj[ arr[ i ]] = 0;
      for( key in obj ) out.push( key );

      return out;
    },

/**
 * Get the String bytes length
 * @this {WHISKY}
 * @param {String} arr The target string.
 * @returns {Number} Return the string bytes length.
 * @example
 *
 *     var len = $$.bytes( '什麼東東' );
 */
    bytes : function ( str ){
      var arr = str.match( /[^\x00-\xff]/ig );
      return  arr === null ?
        str.length : str.length + arr.length;
    },

/**
 * Check if its an empty object
 * @this {WHISKY}
 * @param {Object} obj The target string.
 * @returns {Bool} Return true|false.
 * @example
 *
 *     var has_prop = $$.has_prop({ empty : 'not' });
 */
    has_prop : function( obj ){
      var has_prop = false;
      var prop;

      for( prop in obj ){
        has_prop = true;
        break;
      }

      return has_prop;
    },

/**
 * Use this instead of the untrusted typeof
 * @this {WHISKY}
 * @param {Object} obj The target string.
 * @returns {String} Return the capitalized type name.
 * @example
 *
 *     var type = $$.is( 'i\'m a string' );
 */
    is : function ( obj ){
      return {}.toString.call( obj ).replace( /(\[object)|\]/g, '' );
    },

/**
 * Clone a object
 * @this {WHISKY}
 * @param {Object} parent The target object.
 * @returns {Object} Return the new object.
 * @example
 *
 *     var ben = {
 *       name : 'ben',
 *       age : 17
 *     };
 *     var robo = $$.obj_clone( ben );
 */
    obj_clone : function( parent ){
      var child = {};
      var prop;

      for ( prop in parent ){
        child[ prop ] = parent[ prop ];
      }

      return child;
    },

/**
 * Object inheritance. This method uses less memory but be careful when dealing with nested objects.
 * @this {WHISKY}
 * @param {Object} parent The target object.
 * @returns {Object} Return the new object.
 * @example
 *
 *     var ben = {
 *       name : 'ben',
 *       age : 17
 *     };
 *     var babe = $$.obj_inherit( ben );
 */
    obj_inherit : function( parent ){
      function Child(){}

      Child.prototype = parent;

      return new Child;
    },

/**
 * Generate random number by the given range.
 * @this {WHISKY}
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number} Return the random number.
 * @example
 *
 *     var ran = $$.ran_no( 10, 100 );
 */
    ran_no : function ( min, max ){
      return Math.floor( Math.random() * ( max - min + 1 )) + min;
    },

/**
 * Truncate long string to the given byte length.
 * @this {WHISKY}
 * @param {String} str The target string.
 * @param {Number} len Allowed byte length.
 * @returns {String} Return the Truncated string.
 * @example
 *
 *     var long_str = 'blah blah blah blah .... whatever'
 *     var str = $$.truncate( long_str, 10 );
 */
    truncate : function( str, len ){
      len = len === undefined ?
        20 : len;

      var tmp = str.length > len ?
        str.substr( 0, len ) + '...' :
        str;

      return ( this.bytes( tmp ) - 3 ) > len ?
        tmp.substr( 0,  len / ( this.bytes( tmp ) / len )) + '...' : tmp;
    },

/**
 * Generate a unic ID string.
 * @this {WHISKY}
 * @param {Number} len ID length.
 * @returns {String} Return the unic ID.
 * @example
 *
 *     var id = $$.uid( 32 );
 */
    uid : function ( len ){
      var str     = '';
      var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var src_len = src.length;
      var i       = len;

      for( ; i-- ; ){
        str += src.charAt( this.ran_no( 0, src_len - 1 ));
      }

      return str;
    }
  };
})( this );


