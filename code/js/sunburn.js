(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Main_VM, ko, main;
    ko = require('knockout');
    main = require('main');
    return Main_VM = (function() {
      function Main_VM() {
        this.cancel_button = bind(this.cancel_button, this);
        return;
      }

      Main_VM.prototype.cancel_button = function(d, e) {
        return main.Open_Home();
      };

      return Main_VM;

    })();
  });

}).call(this);
