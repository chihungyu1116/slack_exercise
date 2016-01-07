( function ( window ) {

'use strict'

window.$ajax = (function(){
  var STATUS_OK = 200;
  var ERROR_MESSAGE = "Network Error";

  function request( method, url ) {
    return new Promise( function( resolve, reject ) {
      var req = new XMLHttpRequest();
      req.open( method, url );

      req.onload = function() {
        if (req.status === STATUS_OK) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject( Error( ERROR_MESSAGE ) );
      };
      req.send();
    } );
  }

  return {
    get: function( url ){
      return request( 'GET', url );
    },
    post: function( url ) {
      return request( 'POST', url );
    }
  }
} )();

window.$qs = function( selector ) {
  return document.querySelector( selector );
}

window.$qsa = function( selector ) {
  return document.querySelectorAll( selector );
}
  
window.$on = function( target, type, callback ) {
  target.addEventListener( type, callback );
}

window.$hasClass = function( element, className ) {
  if( !element.classList ) {
    return;
  }

  className = className.replace(/^\./, '');
  return element.classList.contains( className );
}

window.$hasTag = function( element, tagName ) {
  return element.tagName.toLowerCase() === tagName.toLowerCase();
}

window.$hasId = function( element, id ) {
  return element.id.toLowerCase() = id.toLowerCase();
}

window.$hasMatch = function( element, selector ) {
  var reId = /#\w+/;
  var reTag = /^\w+/;
  var reClass = /\.\w+/;

  if( reId.test( selector ) ) {
    return $hasId( element, selector );
  }

  if( reTag.test( selector ) ) {
    return $hasTag( element, selector );
  }

  if ( reClass.test( selector ) ) {
    return $hasClass( element, selector );
  }
  
  return false;  
}

// Find the closest Dom node
window.$closest = function( element, selector ) {
  while( element && !$hasMatch( element, selector) ) {
    element = element.parentNode;
  }

  return element
}

} )( window )

window.$delegate = function ( target, selector, type, handler ) {
  function dispatchEvent(event) {
    var target = $closest( event.target, '.thumbnail' );
    var suspects = window.$qsa( selector, target );
    var hasMatch = Array.prototype.indexOf.call( suspects, target ) >= 0;

    if (hasMatch) {
      handler.call( target, event );
    }
  }

  window.$on( target, type, dispatchEvent );
};