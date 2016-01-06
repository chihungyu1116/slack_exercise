'use strict'

var App = {
  el: document.getElementById( 'photos' ),
  photos: [],

  buildPhoto: function( title, imgUrl ) {
    return (
      '<div class="thumbnail">' +
        '<img class="thumbnail-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>' +
        '<div class="thumbnail-caption">' + title + '</div>' +
      '</div>'
    )
  },
  renderPhotos: function() {
    var that = this;

    var photos = this.photos.map(function( photo ) {
      return that.buildPhoto( photo.title, photo.imgUrl );
    }).join( '' );

    var html = '<div class="clearfix">' + photos + '<div>';

    this.el.innerHTML = html;
  },
  renderLightbox: function() {
    console.log('this', this)
  },
  initialize: function() {
    var that = this;

    Flickr.getRecentPhotos().then(function( photos ) {
      that.photos = photos;
      that.renderPhotos();
    });

    this.el.addEventListener( 'click', that.renderLightbox )
  }
}

App.initialize();