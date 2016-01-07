( function() {

'use strict';

// @param {string} name of the app

function App( name ) {
  var self = this;

  this.store = new app.Store();
  this.store.fetch( function( photos ) {
    self.model = new app.Model( self.store );
    self.view = new app.View();
    self.controller = new app.Controller( self.model, self.view );
    self.controller.showAll();
  } );
}

var myApp = new App('exercise');

} )();