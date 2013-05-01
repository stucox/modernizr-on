// Augment Modernizr with `Modernizr.on()`
var Modernizr = (function (Modernizr, undefined) {

  // Containers for all callbacks; stored as [prop, callback] pairs
  var callbacks = [];

  if((Modernizr._version.split('.')[0] > 2) && window.console) {
    console.warn('Modernizr.on prolly isn\'t needed from v3 onwards!');
  }

  // Function to loop through callbacks and call any which have been
  // resolved since the last iteration
  var doCallbacks = function () {
    var prop;

    for (var i = 0; i < callbacks.length; i++) {
      prop = callbacks[i][0];

      // Properties are `undefined` until resolved
      if (Modernizr[prop] !== undefined) {
        callbacks[i][1](Modernizr[prop]);

        // Remove the callback so it doesn't fire again
        callbacks.splice(i, 1);
        i--;
      }

      // If some haven't resolved yet, go round again
      if (callbacks.length) {
        setTimeout(doCallbacks, 100);
      }
    }
  };

  // Define ze function
  Modernizr.on = function (prop, callback) {
    callbacks.push([prop, callback]);

    // Do callbacks on next tick
    setTimeout(doCallbacks, 0);
  };

  return Modernizr;
}(Modernizr));
