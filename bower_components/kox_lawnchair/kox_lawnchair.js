// Generated by CoffeeScript 1.7.1

/*
  @author Curtis M. Humphrey, Ph.D.
  
  The files adds a KO extender that ties with Lawnchair
      
  Dependence (from global namespace):
    ko - knockoutjs
    Lawnchair - from https://github.com/brianleroux/lawnchair)=
      
  Public API, Fired Events, or Exports
    options {key: name of key, db_name: name of db}
 */

(function() {
  define(function(require) {
    var Lawnchair, ko;
    ko = require('knockout');
    Lawnchair = require('lawnchair');
    require('lawnchair_sqlite');
    return ko.extenders.store_locally = function(target, options) {
      var Save_Locally, _ref;
      if (options.key == null) {
        throw "KOX store_locally needs a key specified in its options";
      }
      target.key = "" + options.key;
      target.lawnchair = new Lawnchair({
        name: (_ref = options.db_name) != null ? _ref : false
      }, function() {});
      Save_Locally = function(new_value) {
        return target.lawnchair.save({
          key: target.key,
          value: new_value
        });
      };
      target.lawnchair.exists(target.key, function(exists) {
        if (exists) {
          return this.get(target.key, function(value) {
            return target(value.value);
          });
        } else {
          return Save_Locally(target());
        }
      });
      target.subscribe(Save_Locally);
      return target;
    };
  });

}).call(this);
