'use strict'

var Ajax = (function(){
  var OK = 200;

  function request( method, url ) {
    return new Promise(function( resolve, reject ) {
      var req = new XMLHttpRequest();
      req.open( method, url );

      req.onload = function() {
        if (req.status === OK) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.send();
    });
  }

  return {
    get: function( url ){
      return request( 'GET', url );
    },
    post: function( url ) {
      return request( 'POST', url );
    }
  }
}());

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
    var imgUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    
    return {
      title: photo.title,
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