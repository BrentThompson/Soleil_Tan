(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Main_VM, ko, main, slider;
    ko = require('knockout');
    main = require('main');
    slider = require('slider');
    return Main_VM = (function() {
      function Main_VM() {
        this.cancel_button = bind(this.cancel_button, this);
        this.delete_user = bind(this.delete_user, this);
        this.make_user = bind(this.make_user, this);
        var curr_user;
        this.age = ko.observable("0");
        this.name = ko.observable("Name");
        this.name.subscribe(function(nV) {
          return console.log(nV);
        });
        this.skin_type = ko.observable("5");
        this.sunblock = ko.observable("Sunblock");
        this.spf = ko.observable("30");
        this.current_user_local = main.current_user;
        if (this.current_user_local() >= 0) {
          curr_user = main.user_list()[main.current_user()];
          console.log(curr_user);
          this.age(curr_user.age);
          this.name(curr_user.name);
          this.skin_type(curr_user.skin_type);
          this.sunblock(curr_user.sunblock);
          this.spf(curr_user.spf);
        }
        return;
      }

      Main_VM.prototype.make_user = function(d, e) {
        var this_user;
        this_user = {
          name: this.name(),
          age: this.age(),
          skin_type: this.skin_type(),
          sunblock: this.sunblock(),
          spf: this.spf(),
          reapply_time: 23
        };
        if (main.current_user() < 0) {
          main.Add_User(this_user);
          return main.Open_Home();
        } else {
          main.Update_User(main.current_user(), this_user);
          main.current_user(-1);
          return main.Open_Home();
        }
      };

      Main_VM.prototype.delete_user = function(d, e) {
        main.Delete_User(main.current_user());
        main.current_user(-1);
        return main.Open_Home();
      };

      Main_VM.prototype.cancel_button = function(d, e) {
        main.current_user(-1);
        return main.Open_Home();
      };

      return Main_VM;

    })();
  });

}).call(this);
