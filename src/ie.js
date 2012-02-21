if( !Array.prototype.indexOf ){
 Array.prototype.indexOf = function( obj, start ){
  var i = ( start || 0 );
  var j = this.length;

  for( ; i < j; i++ ){
    if( this[ i ] === obj ) return i;
  }

  return -1;
 };
}