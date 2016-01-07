( function( window ) {

'use strict';

// @constructor
// @param {object} model the model instance
// @param {object} view the view instance

function Controller( model, view ) {
  var self = this;
  self.model = model;
  self.view = view;

  self.view.bind( 'photoShow', function( element ) {
    var id = element.id.replace(/thumbnail-/, '');

    self.model.read( id, function( photo ) {
      self.view.render( 'showPhoto', photo )
    });
  } );

  self.view.bind( 'photoHide', function() {
    self.view.render( 'hidePhoto' );
  } );

  self.view.bind( 'photoNext', function() {
    self.model.read( 'next', function( photo ) {
      self.view.render( 'replacePhoto', photo )
    });
  } );

  self.view.bind( 'photoPrev', function() {
    self.model.read( 'prev', function( photo ) {
      self.view.render( 'replacePhoto', photo )
    });
  } );

  self.view.bind( 'bindOverlayClick', function() {
    self.view.render( 'hidePhoto' );
  } );

  self.view.bind( 'bindKeys', function( keyCode ) {
    var ESCAPE_KEY = 27;
    var LEFT_ARROW_KEY = 37;
    var RIGHT_ARROW_KEY = 39;

    if ( keyCode === ESCAPE_KEY ) {
      self.view.render( 'hidePhoto' );
    } else if ( keyCode === LEFT_ARROW_KEY ) {
      self.model.read( 'prev', function( photo ) {
        self.view.render( 'replacePhoto', photo )
      });
    } else if ( keyCode === RIGHT_ARROW_KEY ) {
      self.model.read( 'next', function( photo ) {
        self.view.render( 'replacePhoto', photo )
      });
    }
  } );
}

Controller.prototype.showAll = function() {
  var self = this;

  self.model.read( function( data ) {
    self.view.render( 'showAll', data );
  } );
}

window.app = window.app || {};
window.app.Controller = Controller;

} )( window )