'use strict'

var App = {
  el: document.getElementById( 'photos' ),
  photos: [],

  initialize: function() {
    var that = this;

    Flickr.getRecentPhotos().then(function( photos ) {
      that.photos = photos;
      that.renderPhotos();
    });

    this.el.addEventListener( 'click', that.handlePhotoClick.bind(this) )
  },
  renderPhoto: function( id, title, imgUrl ) {
    var el = document.createElement('div')
    el.className = "thumbnail";

    return (
      '<div id="thumbnail-' + id + '" class="thumbnail">' +
        '<div class="thumbnail-caption">' + title + '</div>' +
        '<img class="thumbnail-img respect-ratio-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>' +
      '</div>'
    )
  },
  renderPhotos: function() {
    var that = this;

    var photos = this.photos.map(function( photo, index ) {
      return that.renderPhoto( index, photo.title, photo.imgUrl );
    }).join( '' );

    var html = '<div class="clearfix">' + photos + '<div>';

    this.el.innerHTML = html;
  },
  renderLightbox: function() {
    var photo = this.photos[this.currentPhotoIndex];
    var body = document.querySelector('body');
    var lightbox = document.createElement('div');

    lightbox.classList.add('lightbox');

    lightbox.innerHTML = (
      '<div class="btn btn-left">Prev</div>' +
      '<div class="btn btn-right">Next</div>' +
      '<div id="lightbox-photo">' +
        '<div class="thumbnail-caption">' + photo.title + '</div>' +
        '<img class="lightbox-img respect-ratio-img" src="' + photo.imgUrl + '" ' + 'alt="' + photo.title + '"/>' +
      '</div>'
    );

    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('overlay-opened');

    overlay.appendChild(lightbox);

    body.appendChild(overlay);

    lightbox.addEventListener('click', this.handleLightboxClick.bind(this));
  },

  handleLightboxClick: function(event) {
    var el = event.target;

    if(el.classList.contains('btn-left')) {
      this.handleLightboxBtnClick( -1 )
    } else if(el.classList.contains('btn-right')) {
      this.handleLightboxBtnClick( 1 )
    }
  },
  handleLightboxBtnClick: function(direction) {
    var noMorePrev = (this.currentPhotoIndex === 0  && direction === -1);
    var noMoreNext = (this.currentPhotoIndex === (this.photos.length - 1) && direction === 1);

    if(noMorePrev || noMoreNext) {
      return;
    }

    this.currentPhotoIndex += direction;

    var photo = this.photos[this.currentPhotoIndex];
    var el = document.getElementById('lightbox-photo');

    el.innerHTML = (
      '<div class="thumbnail-caption">' + photo.title + '</div>' +
      '<img class="lightbox-img respect-ratio-img" src="' + photo.imgUrl + '" ' + 'alt="' + photo.title + '"/>'
    )
  },
  handlePhotoClick: function(event) {
    var el = event.target;

    while(el && el.className !== "thumbnail"){
      el = el.parentNode;
    }

    var index = el.id.match(/\d+/)[0];

    this.currentPhotoIndex = parseInt(index);
    this.renderLightbox();
  }
}

App.initialize();