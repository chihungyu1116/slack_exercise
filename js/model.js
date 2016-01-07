( function( window ) {

'use strict';

function Model( store ) {
  this.store = store;
}

Model.prototype.read = function( query, callback ) {
  var queryType = typeof query;

  if ( queryType === 'function' ) {
    callback = query;
    return this.store.findAll( callback );
  } else if ( query === 'next' ) {
    return this.store.next( callback );
  } else if ( query === 'prev' ) {
    return this.store.prev( callback );
  } else {
    this.store.find( query, callback );
  }
}

window.app = window.app || {};
window.app.Model = Model;

} )( window );