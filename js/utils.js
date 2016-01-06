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