/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * WHISKY utility functions.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var utils = require( 'utils' );

/**
 * Store id in a private var in the closure.
 * @private
 */
  var id = 0;

/**
 * Array Remove - By John Resig (MIT Licensed)
 * Remove an item or a group of items from an array.
 * @public
 * @this {utils}
 * @param {Array} arr The target array.
 * @param {Number} from Start point.
 * @param {Number} to End point.
 * @returns {Array} Returns a new array.
 * @example
 *
 *     var arr = [ 'fish', 'fishes', 'fish', '1', 'fishes' ];
 *     var new_arr;
 *     // remove the second item from the array
 *     new_arr = utils.arr_remove( arr, 1 );
 *     // remove the second-to-last item from the array
 *     new_arr = utils.arr_remove( arr, -2 );
 *     // remove the second and third items from the array
 *     new_arr = utils.arr_remove( arr, 1, 2 );
 *     // remove the last and second-to-last items from the array
 *     new_arr = utils.arr_remove( arr, -2, -1 );
 */
  utils.arr_remove = function ( arr, from, to ){
    var rest = arr.slice(( to || from ) + 1 || arr.length );
    arr.length = from < 0 ? arr.length + from : from;

    return arr.push.apply( arr, rest );
  };

/**
 * http://dreaminginjavascript.wordpress.com/2008/08/22/eliminating-duplicates/
 * Remove duplicates in an array.
 * @public
 * @this {utils}
 * @param {Array} arr The target array.
 * @returns {Array} Returns a new array.
 * @example
 *
 *     var clean = utils.arr_remove_dups([ 'fish', 'fishes', 'fish', '1', 'fishes' ]);
 *     console.log( clean ); // [ 'fish', 'fishes', '1' ]
 */
  utils.arr_remove_dups = function ( arr ){
    var len = arr.length;
    var out = [];
    var obj = {};
    var i   = 0;
    var key;

    for( ; i < len; i++ ) obj[ arr[ i ]] = 0;
    for( key in obj ) out.push( key );

    return out;
  };

/**
 * Get the String bytes length.
 * @public
 * @this {utils}
 * @param {String} arr The target string.
 * @returns {Number} Returns the string bytes length.
 * @example
 *
 *     var len = utils.bytes( '什麼東東' );
 */
  utils.bytes = function ( str ){
    var arr = str.match( /[^\x00-\xff]/ig );
    return  arr === null ?
      str.length : str.length + arr.length;
  };

/**
 * Clone objects.
 * @public
 * @this {utils}
 * @param {String} arguments[n] Objects to clone.
 * @returns {Number} Returns the new cloned object.
 * @example
 *
 *     var child = utils.clone( mom, dad );
 */
  utils.clone = function (){
    var args  = [].slice.call( arguments );
    var i     = 0;
    var j     = args.length;
    var child = {};
    var prop;

    for( ; i < j; i++ ){
      for( prop in parent ){
        child[ prop ] = parent[ prop ];
      }
    }

    return child;
  },

/**
 * Check if its an empty object.
 * @public
 * @this {utils}
 * @param {Object} obj The target string.
 * @returns {Bool} Returns true|false.
 * @example
 *
 *     var has_prop = utils.has_prop({ empty : 'not' });
 */
  utils.has_prop = function( obj ){
    var has_prop = false;
    var prop;

    for( prop in obj ){
      has_prop = true;
      break;
    }

    return has_prop;
  };

/**
 * Generate an auto increment ID.
 * @public
 * @this {utils}
 * @returns {String} Returns th ID.
 * @example
 *
 *     var id = utils.id();
 */
  utils.id = function (){
    return id++;
  };

/**
 * Parse string to get module, class and method name.
 * @public
 * @this {utils}
 * @param {String} str The target string.
 * @returns {Object} Returns the info object.
 * @example
 *
 *     var len = utils.bytes( '什麼東東' );
 */
  utils.info = function ( str ){
    return {
      module : str.match( /(^\w*)(?=::)/ ),
      klass : str.match( /(?<=::)(\w*)/ ),
      method : str.match( /(?<=\.)(\w*)/ )
    };
  },

/**
 * Object inheritance.
 * This method uses less memory but be careful when dealing with nested objects.
 * @public
 * @this {utils}
 * @param {Object} parent The target object.
 * @returns {Object} Returns the new object.
 * @example
 *
 *     var ben = {
 *       name : 'ben',
 *       age : 17
 *     };
 *     var babe = utils.obj_inherit( ben );
 */
  utils.inherit = function( parent ){
    function Child(){}

    Child.prototype = parent;

    return new Child;
  };

/**
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target string.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = utils.is( 'i\'m a string' );
 */
  utils.is = function ( obj ){
    return {}.toString.call( obj ).replace( /(\[object )|\]/g, '' );
  };

/**
 * Generate random number by the given range.
 * @public
 * @this {utils}
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number} Returns the random number.
 * @example
 *
 *     var ran = utils.ran_no( 10, 100 );
 */
  utils.ran_no = function ( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 )) + min;
  };

/**
 * Truncate long string to the given byte length.
 * @public
 * @this {utils}
 * @param {String} str The target string.
 * @param {Number} len Allowed byte length.
 * @returns {String} Returns the Truncated string.
 * @example
 *
 *     var long_str = 'blah blah blah blah .... whatever'
 *     var str = utils.truncate( long_str, 10 );
 */
  utils.truncate = function( str, len ){
    len = len === undefined ?
      20 : len;

    var tmp = str.length > len ?
      str.substr( 0, len ) + '...' :
      str;

    return ( this.bytes( tmp ) - 3 ) > len ?
      tmp.substr( 0,  len / ( this.bytes( tmp ) / len )) + '...' : tmp;
  };

/**
 * Generate a unic ID string.
 * @public
 * @this {utils}
 * @param {Number} len ID length.
 * @returns {String} Returns the unic ID.
 * @example
 *
 *     var id = utils.uid( 32 );
 */
  utils.uid = function ( len ){
    var str     = '';
    var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var src_len = src.length;
    var i       = len;

    for( ; i-- ; ){
      str += src.charAt( this.ran_no( 0, src_len - 1 ));
    }

    return str;
  };

/**
 * Exports module and overwrites the original one.
 */
  exports( 'utils', utils, true );
});