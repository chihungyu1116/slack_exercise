( function( window ) {

'use strict';

function Store() {
  this.photos = [];
}

Store.prototype.fetch = function( handler ) {
  var self = this;

  return app.Flickr.getRecentPhotos().then( function( photos ) {
    self.curIndex = 0;
    self.photos = photos;
    handler();
  } );
}

Store.prototype.findAll = function( handler ) {
  handler( this.photos );
}

Store.prototype.find = function( id, handler ) {
  for ( var i = 0; i < this.photos.length; i++ ) {
    var photo = this.photos[ i ];

    if ( photo.id === id ) {
      this.curIndex = i;
      handler( photo );  
      return;
    }
  }

  handler( null );
}

Store.prototype.next = function( handler ) {
  if (this.curIndex === (this.photos.length - 1)) {
    return;
  }

  this.curIndex++;
  var photo = this.photos[ this.curIndex ];

  handler( photo );
}

Store.prototype.prev = function( handler ) {
  if ( this.curIndex === 0 ) {
    return;
  }

  this.curIndex--;
  var photo = this.photos[ this.curIndex ];

  handler( photo );
}



window.app = window.app || {};
window.app.Store = Store;

} )( window );