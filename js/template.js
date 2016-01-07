( function( window ) {

'use strict';

// Simple template engine
function Template( template ) {
  this.template = template;
}

Template.prototype.render = function ( data ) {
  var tpl = this.template;

  for ( var key in data ) {
    var val = data[ key ];
    var match = new RegExp( "{{\\s*" + key + "\\s*}}" );


    var html = tpl.replace( match, val );
    tpl = html;
  }

  return tpl;
};


window.app = window.app || {};
window.app.Template = Template;

} )( window );