( function( window ) {

'use strict';

function View() {
  this.$photoList = $qs( '#photo-list' );
  this.$overlay = $qs( '#overlay' )
  this.$lightbox = $qs( '#lightbox' );
  this.$lightboxThumbnail = $qs( '#lightbox-thumbnail' );
  this.$lightboxBtnNext = $qs( '#lightbox-btn-next' );
  this.$lightboxBtnPrev = $qs( '#lightbox-btn-prev' );

  this.photoTpl = (
    "<div id='thumbnail-{{id}}' class='thumbnail'>" +
      "<div class='thumbnail-caption'>{{title}}</div>" +
      "<img class='thumbnail-img respect-ratio-img' src='{{imgUrl}}' alt='{{title}}' />" +
    "</div>"
  );

  this.listTpl = '<div class="clearfix">{{list}}</div>';
}

View.prototype.buildList = function( photos ) {
  var photoEngine = new app.Template( this.photoTpl );
  var listEngine = new app.Template( this.listTpl );
  var list = [];

  var list =  photos.map( function( photo ) {
    return photoEngine.render( photo );
  } );

  return listEngine.render( { list: list.join('') } );
};

View.prototype.buildPhoto = function( photo ) {
  var photoEngine = new app.Template( this.photoTpl );
  return photoEngine.render( photo );
};

// View.prototype.buildLight

View.prototype.render = function( viewCmd, param ) {
  var self = this;
  var viewComands = {
    showPhoto: function( photo ) {
      self.$overlay.classList.add( 'overlay-opened' );
      self.$lightboxThumbnail.innerHTML = self.buildPhoto( photo );
    },
    hidePhoto: function() {
      self.$overlay.classList.remove( 'overlay-opened' );
    },
    showAll: function( photos ) {
      self.$photoList.innerHTML = self.buildList( photos );
    },
    replacePhoto: function( photo ) {
      self.$lightboxThumbnail.innerHTML = self.buildPhoto( photo );
    }
  }

  viewComands[ viewCmd ]( param );
}

View.prototype.bind = function( event, handler ) {
  var self = this;

  if ( event === 'photoShow' ) {
    $delegate( this.$photoList, '.thumbnail', 'click', function( event ) {
      handler( this );
    } );
  } else if ( event === 'photoNext' ) {
    $on( this.$lightboxBtnNext, 'click', function( event ) {
      handler( this );
    } );
  } else if ( event === 'photoPrev' ) {
    $on( this.$lightboxBtnPrev, 'click', function( event ) {
      handler( this );
    } );
  } else if ( event === 'bindKeys' ) {
    $on( document, 'keyup', function( event ) {
      handler( event.keyCode );
    } );
  } else if ( event === 'bindOverlayClick' ) {
    $on( this.$overlay, 'click', function( event ) {
      if ( event.target.id === 'overlay' ) {
        handler();  
      }
    } );
  }
}

window.app = window.app || {};
window.app.View = View;

} )( window )