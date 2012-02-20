/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Global events class.
 */

$$.Event = $$.Class.extend({

/**
 * Class constructor. Setup an evnet trunk.
 * @this {$$.Event}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 */
  init : function (){
    return this.reset();
  },

/**
 * Push a function to an event queue to be called later.
 * @this {$$.Event}
 * @param {String} name Event queue name.
 * @param {Function} fn Event function.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
  on : function ( name, fn ){
    if( $$.is( fn ) !== 'Function' ){
      return $$.Log( 'Event', 'Method `on` argument must a function', {
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
 * @this {$$.Event}
 * @param {String} name Event queue name.
 * @param {Function} fn Event function.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     event.once( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
  once : function ( name, fn ){
    if( $$.is( fn ) !== 'Function' ){
      return $$.Log( 'Event', 'Method `once` second argument must a function', {
        name : name,
        fn : fn
      });
    }

    var self = this;

    return this.on( name, function (){
      fn.apply( this, arguments );
      self.remove( name, tmp );
    });
  },

/**
 * Get an event queue by its name.
 * @this {$$.Event}
 * @param {String} name Event queue name.
 * @returns {Array|false} Return the queued functions if available.
 * @example
 *
 *     var event = new $$.Event();
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
 * @this {$$.Event}
 * @param {String} name Queue full name.
 * @param {Function} fn Function to be removed.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     var some_fn = function( arg1, arg2, arg3 ){
 *       // some code
 *     };
 *     event.on( 'something', some_fn );
 *     // somewhere in another class or function
 *     event.remove( 'something', some_fn );
 */
  remove : function ( name, fn ){
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
 * @this {$$.Event}
 * @param {String} arguments[ 0 ] Event name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.trigger( 'something', arg1, arg2, arg3 ... );
 */
  trigger : function (){
    // assign the first argument to var name and remove it
    var name = [].shift.call( arguments );

    // make sure the calling queue exist, otherwise do nothing
    if( this.trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      var tmp = this.trunk[ name ];
      var i   = 0;
      var j   = tmp.length;

      // calling queue functions
      for( ; i < j ; i++ ){
        tmp[ i ].apply( this, arguments );
      }
    }

    return this;
  },

/**
 * Calling functions in an event queue and remove them after calling.
 * @this {$$.Event}
 * @param {String} arguments[ 0 ] Event name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.flush( 'something', arg1, arg2, arg3 ... );
 */
  flush : function (){
    // assign the first argument to var name and remove it
    var name = [].shift.call( arguments );

    // make sure the calling queue exist, otherwise do nothing
    if( trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      var tmp = trunk[ name ];
      var i   = 0;
      var j   = tmp.length;

      // clear each queue function after calling
      for( ; i < j ; i++ ){
        tmp.shift().apply( this, arguments );
      }
    }

    return this;
  },

/**
 * Delete a event queue.
 * @this {$$.Event}
 * @param {String} name Event name.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
 *     event.on( 'something', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 *     // somewhere in another class or function
 *     event.clear( 'something' );
 */
  clear : function ( name ){
    delete this.trunk[ name ];

    return this;
  },

/**
 * Reset all events.
 * @this {$$.Event}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var event = new $$.Event();
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
