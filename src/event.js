/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Event class( pubsub ).
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Class = require( 'Class' );
  var log   = require( 'logger' );
  var is    = require( 'utils' ).is;

/**
 * Short cut functions.
 */
  var shift = [].shift;
  var slice = [].slice;

/**
 * Event class.
 * @public
 * @class
 */
  var Event = Class.extend({

/**
 * Setup an event trunk.
 * @constructor
 * @this {Event}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 */
    init : function ( name ){
      this._name = name;

      return this.reset();
    },

/**
 * Push a function to an event queue to be called later.
 * @public
 * @this {Event}
 * @param {String} name Event queue name.
 * @param {Function} fn Event function.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
    on : function ( name, fn ){
      if( is( name ) !== 'String' ){
        return log( this._name + '.on( name, fn ) argument `name` must be a string', {
          name : name,
          fn : fn
        });
      }

      if( is( fn ) !== 'Function' ){
        return log( this._name '.on( name, fn ) argument `fn` must be a function', {
          name : name,
          fn : fn
        });
      }

      // build new event queue if it does not exist
      if( this.trunk[ name ] === undefined ){
        this.trunk[ name ] = [];
      }

      // push function to an event queue
      this.trunk[ name ].push( fn );

      return this;
    },

/**
 * Push a function to an event queue to be called later and remove it after the call.
 * @public
 * @this {Event}
 * @param {String} name Event queue name.
 * @param {Function} fn Event function.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.once( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
    once : function ( name, fn ){
      if( is( name ) !== 'String' ){
        return log( this._name + '.once( name, fn ) argument `name` must be a string', {
          name : name,
          fn : fn
        });
      }

      if( is( fn ) !== 'Function' ){
        return log( this._name + '.once( name, fn ) argument `fn` must be a function', {
          name : name,
          fn : fn
        });
      }

      var self = this;

      return this.on( name, function tmp(){
        fn.apply( this, slice.call( arguments ));
        self.remove( name, tmp );
      });
    },

/**
 * Get an event queue by its name.
 * @public
 * @this {Event}
 * @param {String} name Event queue name.
 * @returns {Array|false} Return the queued functions if available.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.get( 'something' );
 */
    get : function ( name ){
      // make sure the calling out name exist
      return this.trunk[ name ] !== undefined ?
        this.trunk[ name ] : false;
    },

/**
 * Remove a function from a queue.
 * @public
 * @this {Event}
 * @param {String} name Queue full name.
 * @param {Function} fn Function to be removed.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     var some_fn = function( arg1, arg2, arg3 ){
 *       // some code
 *     };
 *     event.on( 'something', some_fn );
 *     // somewhere in another class or function
 *     event.remove( 'something', some_fn );
 */
    remove : function ( name, fn ){
      if( is( name ) !== 'String' ){
        return log( this._name + '.remove( name, fn ) argument `name` must be a string', {
          name : name,
          fn : fn
        });
      }

      if( is( fn ) !== 'Function' ){
        return log( this._name + '.remove( name, fn ) argument `fn` must be a function', {
          name : name,
          fn : fn
        });
      }

      // make sure the calling queue exist, otherwise do nothing
      if( this.trunk[ name ] !== undefined ){
        // cache to local var outside the loop
        var tmp = this.trunk[ name ];
        var i   = 0;
        var j   = tmp.length;

        // IMPORTANT: use splice instead of delete, see the following link for the resaon
        // http://stackoverflow.com/questions/500606/javascript-array-delete-elements
        for( ; i < j ; i++ ){
          if( tmp[ i ] === fn ){
            tmp.splice( i, 1 );
            break;
          }
        }
      }

      return this;
    },

/**
 * Calling functions in an event queue.
 * @public
 * @this {Event}
 * @param {String} arguments[ 0 ] Event name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.trigger( 'something', arg1, arg2, arg3 ... );
 */
    trigger : function (){
      // assign the first argument to var name and remove it
      var name = shift.call( arguments );

      // make sure the calling queue exist, otherwise do nothing
      if( this.trunk[ name ] !== undefined ){
        // cache to local var outside the loop
        var tmp = this.trunk[ name ];
        var i   = 0;
        var j   = tmp.length;

        // calling queue functions
        for( ; i < j ; i++ ){
          tmp[ i ].apply( this, slice.call( arguments ));
        }
      }

      return this;
    },

/**
 * Calling functions in an event queue and remove them after calling.
 * @public
 * @this {Event}
 * @param {String} arguments[ 0 ] Event name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.flush( 'something', arg1, arg2, arg3 ... );
 */
    flush : function (){
      // assign the first argument to var name and remove it
      var name = shift.call( arguments );

      // make sure the calling queue exist, otherwise do nothing
      if( trunk[ name ] !== undefined ){
        // cache to local var outside the loop
        var tmp = trunk[ name ];
        var i   = 0;
        var j   = tmp.length;

        // clear each queue function after calling
        for( ; i < j ; i++ ){
          tmp.shift().apply( this, slice.call( arguments ));
        }
      }

      return this;
    },

/**
 * Delete a event queue.
 * @public
 * @this {Event}
 * @param {String} name Event name.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.clear( 'something' );
 */
    clear : function ( name ){
      if( is( name ) !== 'String' ){
        return log( this._name + '.clear( name ) argument `name` must be a string', {
          name : name,
          fn : fn
        });
      }

      delete this.trunk[ name ];

      return this;
    },

/**
 * Reset all events.
 * @public
 * @this {Event}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.reset();
 */
    reset : function (){
      this.trunk = {};

      return this;
    }
  });

/**
 * Exports module.
 */
  exports( 'Event', Event );
});

