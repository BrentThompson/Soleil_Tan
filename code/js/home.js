(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Home, ko, main;
    ko = require('knockout');
    main = require('main');
    return Home = (function() {
      function Home() {
        this.Sunburn_Button = bind(this.Sunburn_Button, this);
        this.Adduser_Button = bind(this.Adduser_Button, this);
        this.Update_Button = bind(this.Update_Button, this);
        this.user_list = main.user_list;
        return;
      }

      Home.prototype.Update_Button = function(index, d, e) {
        console.log(index());
        main.current_user = index;
        return main.Open_Adduser();
      };

      Home.prototype.Adduser_Button = function(d, e) {
        return main.Open_Adduser();
      };

      Home.prototype.Sunburn_Button = function(d, e) {
        return main.Open_Sunburn();
      };

      return Home;

    })();
  });

}).call(this);
