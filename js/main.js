'use strict'

var Flickr = (function(){
  var apiKey = '69b27790ca5dbdd8d69859ea5793a017';
  var perPage = 20;
  var recentPhotoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&nojsoncallback=1&api_key=' + apiKey + '&per_page=' + perPage;

  /*
    photo = {
      farm: 2,
      id: "23556008274",
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: "119744273@N02",
      secret: "533d199fd9",
      server: "1504",
      title: ""
    };
  */
  function buildImgObj( photo ) {
    var title = photo.title;
    var imgUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    
    return {
      title: title,
      imgUrl: imgUrl
    };
  }

  return {
    getRecentPhotos: function() {
      return Ajax.get( recentPhotoUrl ).then( JSON.parse ).then(function( response ){
        return response.photos.photo.map( buildImgObj );
      });
    }
  }
}());

var Template = {
  renderPhoto: function( title, imgUrl ) {
    return [
      '<div class="thumbnail">',
        '<img class="thumbnail-img" src="' + imgUrl + '" ' + 'alt="' + title + '"/>',
        '<div class="thumbnail-caption">' + title + '</div>',
      '</div>'
    ].join('');
  },
  renderPhotos: function( photos ) {
    var photoTplArr = this.photos.map(function( photo ) {
      return Template.renderPhoto( photo.title, photo.imgUrl );
    });

    return [
      '<div class="clearfix">',
        photoTplArr.join(''),
      '<div>'
    ]
  }
}


var App = {
  el: document.getElementById('photos'),
  photos: [],

  render: function() {
    var photosTpl = this.photos.map(function( photo ) {
      return Template.renderPhoto( photo.title, photo.imgUrl );
    }).join('');

    var html = [
      '<div class="clearfix">',
        photosTpl,
      '<div>'
    ].join('');

    this.el.innerHTML = html;
  },
  initialize: function() {
    var that = this;

    Flickr.getRecentPhotos().then(function( photos ) {
      that.photos = photos;
      that.render();
    });
  }
}

App.initialize();