'use strict'

var Template = {
  renderLightboxPhoto: function( title, imgUrl ) {
    return (
      '<div class="thumbnail-caption">' + title + '</div>' +
      '<img class="lightbox-img respect-ratio-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>'
    );
  },
  renderPhoto: function() {

  }
}

// var PhotoView = {
//   handlePhotoClick: function(event) {
//     var el = event.target;

//     while(el && el.className !== "thumbnail"){
//       el = el.parentNode;
//     }

//     var index = el.id.match(/\d+/)[0];

//     this.currentPhotoIndex = parseInt(index);
//     this.renderLightbox();
//   }

// }

function PhotoView( el, photos ) {
  this.el = document.querySelector( el );
  this.photos = photos;
  this.currentIndex = 0;
}

PhotoView.prototype.getCurrentPhoto = function() {
  return this.photos[this.currentIndex];
}

PhotoView.prototype.renderPhoto = function( id, title, imgUrl ) {
  var el = document.createElement('div')

  el.id = 'thumbnail-' + id
  el.className = 'thumbnail';
  el.innerHTML = (
    '<div class="thumbnail-caption">' + title + '</div>' +
    '<img class="thumbnail-img respect-ratio-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>'
  );

  return el;
}

PhotoView.prototype.render = function() {
  var that = this;
  var container = document.createElement( 'div' );

  container.className = 'clearfix';

  this.photos.forEach(function( photo, index ) {
    var el = that.renderPhoto( index, photo.title, photo.imgUrl );
    container.appendChild( el );
  });

  this.el.innerHTML = '';
  this.el.appendChild( container );
}



function LightboxView( el ) {
  this.el = document.querySelector( el );
}

LightboxView.prototype.render = function() {
  var body = document.querySelector('body');
  var lightbox = document.createElement('div');
}

  // var photo = this.photos[this.currentPhotoIndex];
  var body = document.querySelector('body');
  var lightbox = document.createElement('div');

  lightbox.classList.add('lightbox');

  lightbox.innerHTML = (
    '<div class="btn btn-left">Prev</div>' +
    '<div class="btn btn-right">Next</div>' +
    '<div id="lightbox-photo"></div>'
  );

  var overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.classList.add('overlay-opened');

  overlay.appendChild(lightbox);
  body.appendChild(overlay);

  this.renderLightboxPhoto();
  lightbox.addEventListener('click', this.handleLightboxClick.bind(this));

}

var App = {
  el: document.getElementById( 'photos' ),
  photos: [],

  initialize: function() {
    var that = this;

    this.lightboxView = new LightboxView( '#lightbox' )


    Flickr.getRecentPhotos().then(function( photos ) {
      that.photos = photos;
      that.photoView = new PhotoView( '#photos', photos );
      that.render();
    });

    this.el.addEventListener( 'click', that.handlePhotoClick.bind(this) )
  },

  render: function() {
    this.photoView.render()
  },


  // renderPhoto: function( id, title, imgUrl ) {
  //   var el = document.createElement('div')
  //   el.className = "thumbnail";

  //   return (
  //     '<div id="thumbnail-' + id + '" class="thumbnail">' +
  //       '<div class="thumbnail-caption">' + title + '</div>' +
  //       '<img class="thumbnail-img respect-ratio-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>' +
  //     '</div>'
  //   )
  // },
  // renderPhotos: function() {
  //   var that = this;

  //   var photos = this.photos.map(function( photo, index ) {
  //     return that.renderPhoto( index, photo.title, photo.imgUrl );
  //   }).join( '' );

  //   var html = '<div class="clearfix">' + photos + '<div>';

  //   this.el.innerHTML = html;
  // },
  renderLightbox: function() {
    var photo = this.photos[this.currentPhotoIndex];
    var body = document.querySelector('body');
    var lightbox = document.createElement('div');

    lightbox.classList.add('lightbox');

    lightbox.innerHTML = (
      '<div class="btn btn-left">Prev</div>' +
      '<div class="btn btn-right">Next</div>' +
      '<div id="lightbox-photo"></div>'
    );

    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('overlay-opened');

    overlay.appendChild(lightbox);
    body.appendChild(overlay);

    this.renderLightboxPhoto();
    lightbox.addEventListener('click', this.handleLightboxClick.bind(this));
  },
  renderLightboxPhoto: function() {
    var photo = this.getCurrentPhoto();
    var el = document.getElementById('lightbox-photo');
    el.innerHTML = Template.renderLightboxPhoto( photo.title, photo.imgUrl );
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
    this.renderLightboxPhoto();
  },
  handlePhotoClick: function(event) {
    var el = event.target;

    while(el && !el.classList.contains( "thumbnail" )) {
      el = el.parentNode;
    }

    var index = el.id.match(/\d+/)[0];
    this.photoView.currentIndex = parseInt(index);

    this.currentPhotoIndex = parseInt(index);
    this.renderLightbox();
  },
  getCurrentPhoto: function() {
    return this.photos[this.currentPhotoIndex];
  }
}

App.initialize();