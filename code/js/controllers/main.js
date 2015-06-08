(function() {
  define(function(require) {
    var Main_App, PAGE, ko;
    ko = require('knockout');
    PAGE = {
      ADDUSER: {
        name: "controllers/add_user",
        template: "add_user"
      },
      TIMERS: "timer"
    };
    return Main_App = (function() {
      function Main_App() {
        this.page = ko.observable(PAGE.ADDUSER);
        return;
      }

      return Main_App;

    })();
  });

}).call(this);
