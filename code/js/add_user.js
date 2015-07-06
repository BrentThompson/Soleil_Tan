(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Main_VM, ToHMM, ko, main, slider;
    ko = require('knockout');
    main = require('main');
    require('slider');
    slider = require('ko_slider');
    ToHMM = function(minutes) {
      var h, m;
      h = Math.floor(minutes / 60);
      m = Math.floor(minutes % 60);
      if (m < 10) {
        m = '0' + m;
      }
      return h + ":" + m;
    };
    return Main_VM = (function() {
      function Main_VM() {
        this.cancel_button = bind(this.cancel_button, this);
        this.delete_user = bind(this.delete_user, this);
        this.make_user = bind(this.make_user, this);
        var curr_user;
        this.age = ko.observable(12);
        this.name = ko.observable("Name");
        this.skin_type = ko.observable("5");
        this.sunblock = ko.observable("Sunblock");
        this.spf = ko.observable("30");
        this.current_user_local = main.current_user;
        if (this.current_user_local() >= 0) {
          curr_user = main.user_list()[main.current_user()];
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
          timer_going: false,
          reapply_time: ko.observable(0),
          active: ko.observable(false),
          duration: 120 - (30 - this.skin_type() * 3) - (Number(this.age()) < 12 || Number(this.age()) > 55 ? 30 : 0),
          dname: ko.observable(this.name()),
          display_name: function() {
            if (this.reapply_time() - Date.now() > 0) {
              return this.dname(this.name + ' ' + ToHMM((this.reapply_time() - Date.now()) / 60000));
            } else {
              this.dname(this.name + ' ' + ToHMM(0));
              return this.timer_going = false;
            }
          },
          name_updater: function() {
            return setInterval((function(_this) {
              return function() {
                if (_this.timer_going) {
                  return _this.display_name();
                } else {
                  return _this.dname(_this.name);
                }
              };
            })(this), 10000);
          },
          start_timer: function() {
            this.reapply_time(Date.now() + this.duration * 60000);
            this.timer_going = true;
            this.dname(this.name + ' ' + ToHMM((this.reapply_time() - Date.now()) / 60000));
            this.display_name();
            return this.name_updater();
          },
          stop_timer: function() {
            return this.timer_going = false;
          },
          toggle_active: function() {
            if (this.active()) {
              this.reapply_time(Math.floor(this.reapply_time() + (this.reapply_time() - Date.now())));
              this.display_name();
              return this.active(false);
            } else {
              this.reapply_time(Math.floor(this.reapply_time() - (this.reapply_time() - Date.now()) / 2));
              this.display_name();
              return this.active(true);
            }
          }
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
