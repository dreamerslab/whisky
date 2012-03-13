/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * WHISKY Core | `require`, `exports`, `extend` and `list`.
 */

( function ( root, $ ){

/**
 * Store modules in a private object in the closure.
 * @private
 */
  var trunk = {};

/**
 * Because zepto's `extend` does not do deep copy,
 * we have to take the code from jQuery and remove the ie parts for mobile browsers only.
 * @public
 * @this {root} window | global
 * @param {jQuery|Zepto} $ jQuery or Zepto object.
 * @returns {Function} Returns the extend function.
 */
  var extend = root.Zepto !== undefined ? function ( $ ){

/**
 * Check if it is a plain object.
 * @private
 * @this {root} window | global
 * @param {Any} obj Any object to be checked.
 * @returns {Boolean|undefined}
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
    var is_plain_obj = function ( obj ){
       if( !obj ||
           {}.toString.call( obj ) !== '[object Object]' ||
           obj.nodeType ||
           obj.setInterval ){
         return false;
       }

       var has_own                   = {}.hasOwnProperty;
       var has_own_constructor       = has_own.call( obj, 'constructor' );
       var has_is_property_of_method = has_own.call( obj.constructor.prototype, 'isPrototypeOf' );

       // Not own constructor property must be Object
       if( obj.constructor &&
           !has_own_constructor &&
           !has_is_property_of_method ){
         return false;
       }

       // Own properties are enumerated firstly, so to speed up,
       // if last one is own, then all properties are own.
       var key;
       for( key in obj ){}

       return key === undefined || has_own.call( obj, key );
    };

/**
 * The real extend method to be exported later.
 * @public
 * @this {utils} window | global
 * @param {Boolean} arguments[0] Whether to do a deep clone.
 * @param {Object} arguments[1] The target object.
 * @param {Object} arguments[n] The objects to merge in.
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
    var extend = function (){
      var target = arguments[ 0 ] || {};
      var i      = 1;
      var length = arguments.length;
      var deep   = false;
      var options, name, src, copy, copy_is_array, clone;

      // Handle a deep copy situation
      if( typeof target === 'boolean' ){
        deep   = target;
        target = arguments[ 1 ] || {};
        // skip the boolean and the target
        i = 2;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if( typeof target !== 'object' && !$.isFunction( target )){
        target = {};
      }

      for( ; i < length; i++ ){
        // Only deal with non-null/undefined values
        if(( options = arguments[ i ]) != null ){
          // Extend the base object
          for( name in options ){
            src  = target[ name ];
            copy = options[ name ];

            // Prevent never-ending loop
            if( target === copy ){
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if( deep && copy && ( is_plain_obj( copy ) || ( copy_is_array = $.isArray( copy )))){
              if( copy_is_array ){
                copy_is_array = false;
                clone = src && $.isArray( src ) ? src : [];

              }else{
                clone = src && is_plain_obj( src)  ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = extend( deep, clone, copy );

            // Don't bring in undefined values
            }else if( copy !== undefined ){
              target[ name ] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };

    return extend;
  }( $ ) : $.extend;

  trunk.utils = {
    extend : extend
  };

/**
 * Importsthe desired module.
 * @public
 * @this {root} window | global
 * @param {String} name Module name.
 * @returns {Any} Returns the matching module.
 */
  var require = function ( name ){
    if( name === undefined ){
      throw new Error(
        'WHISKY::require( name ) must have a `name` as its argument.'
      );
    }

    if( trunk[ name ] === undefined ){
      throw new Error(
        'WHISKY::require( name ) module `' + name + '` does not exist.'
      );
    }

    return extend( true, {}, trunk[ name ]);
  };

/**
 * Export module with the given name.
 * @public
 * @this {root} window | global
 * @param {String} name Module name.
 * @param {Any} val Module content.
 * @param {Boolean} force Overwrite the existing module( optional ).
 */
  var exports = function ( name, val, force ){
    if( name === undefined || val === undefined ){
      throw new Error(
        'WHISKY::exports( name, val, force ) must have both `name` and `val` as its arguments.'
      );
    }

    if( trunk[ name ] !== undefined && force !== true ){
      throw new Error(
        'WHISKY::exports( name, val, force ) module name `' + name + '` already exists.'
      );
    }

    trunk[ name ] = val;
  };

/**
 * Global WHISKY object, a function for module control.
 * @public
 * @this {root} window | global
 * @param {Function} callback Callback function, has `require` and `exports` function.
 */
  var $$ = function ( callback ){
    if( !$.isFunction( callback )){
      throw new Error(
        'WHISKY::Core `$$( callback )` `callback` is not defined or is not a function.'
      );
    }

    callback( require, exports );
  };

/**
 * Print out all modules.
 * @public
 * @this {WHISKY}
 * @param {Boolean} print Whether to print out the module list or returns as array
 * @returns {Any} Returns the the module list or print them out in the console.
 */
  $$.list = function ( print ){
    var log  = require( 'logger' );
    var list = [];
    var name;

    for( name in trunk ){
      list.push( name );
    }

    return print === true ?
      log( 'WHISKY::list()', list ) :
      list;
  };

/**
 * Exports module to global.
 */
  root.WHISKY = WHISKY;
  '$$' in root || ( root.$$ = WHISKY );
})( this, jQuery || Zepto );

