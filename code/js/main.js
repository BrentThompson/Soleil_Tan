(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Main_App, PAGE, ko;
    ko = require('knockout');
    require('kox_lawnchair');
    PAGE = {
      ADDUSER: "add_user",
      SUNBURN: "sunburn",
      HOME: "home"
    };
    Main_App = (function() {
      function Main_App() {
        this.Delete_User = bind(this.Delete_User, this);
        this.Update_User = bind(this.Update_User, this);
        this.Edit_User = bind(this.Edit_User, this);
        this.Add_User = bind(this.Add_User, this);
        this.Open_Home = bind(this.Open_Home, this);
        this.Open_Sunburn = bind(this.Open_Sunburn, this);
        this.Open_Adduser = bind(this.Open_Adduser, this);
        this.page = ko.observable(PAGE.HOME);
        this.current_user = ko.observable(-1);
        this.current_user.subscribe(function(nV) {
          return console.log(nV);
        });
        this.user_list = ko.observableArray([]).extend({
          store_locally: {
            key: "user_list"
          }
        });
        return;
      }

      Main_App.prototype.Open_Adduser = function(d, e) {
        return this.page(PAGE.ADDUSER);
      };

      Main_App.prototype.Open_Sunburn = function(d, e) {
        return this.page(PAGE.SUNBURN);
      };

      Main_App.prototype.Open_Home = function(d, e) {
        return this.page(PAGE.HOME);
      };

      Main_App.prototype.Add_User = function(user) {
        return this.user_list.push(user);
      };

      Main_App.prototype.Edit_User = function(index) {
        this.current_user(index);
        return this.page(PAGE.ADDUSER);
      };

      Main_App.prototype.Update_User = function(index, user) {
        return this.user_list()[index] = user;
      };

      Main_App.prototype.Delete_User = function(index) {
        return this.user_list.remove(this.user_list()[index]);
      };

      return Main_App;

    })();
    return new Main_App();
  });

}).call(this);
