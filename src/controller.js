/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Global events class.
 */

var Action = $$.Class.extend({

/**
 * Setup an event trunk.
 * @constructor
 * @this {$$.Event}
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var actions = new $$.Action();
 */
  init : function ( name, model, lang ){
    name = $$.demodulize( name );

    if( name.length === 1 ){
      this._class = name[ 0 ];
    }

    if( name.length === 2 ){
      this._module = name[ 0 ];
      this._class  = name[ 1 ];
    }

    this._uid  = $$.uid( 32 );
    this._type = 'action';
    this.model = model;
    this.lang  = lang;

    return this;
  }
});


$$.Action = function ( name, methods ){
  var action, extend;

  if( methods.extend ){
    extend = methods.extend;
    delete methods.extend;
    action = Action.extend( trunk.get( extend ))
  }

};
