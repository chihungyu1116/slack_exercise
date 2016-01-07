( function ( window ) {

'use strict';

var API_KEY = '69b27790ca5dbdd8d69859ea5793a017';
var PER_PAGE = 20;
var RECENT_PHOTO_API = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&nojsoncallback=1&api_key=' +
  API_KEY + '&per_page=' + PER_PAGE;

function buildImgObj( photo ) {
  // Example
  // @result = [{
  //   farm: 2,
  //   id: "23556008274",
  //   isfamily: 0,
  //   isfriend: 0,
  //   ispublic: 1,
  //   owner: "119744273@N02",
  //   secret: "533d199fd9",
  //   server: "1504",
  //   title: ""
  // }, ...]
  photo.imgUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + 
    photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
  
  return photo;
}

var Flickr = {
  getRecentPhotos: function() {
    return $ajax.get( RECENT_PHOTO_API )
      .then( JSON.parse )
      .then( function( response ) {
        return response.photos.photo.map( buildImgObj );
      } );
  }
};
  
window.app = window.app || {};
window.app.Flickr = Flickr;

} )( window );