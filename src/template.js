/*!
 * WHISKY
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Template management module. Instance of trunk class.
 */

$$( function ( require, exports ){

/**
 * Module dependencies.
 * @private
 */
  var Trunk = require( 'Trunk' );

/**
 * Exports module.
 */
  exports( 'template', new Trunk( 'WHISKY:template' ));
});