define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Main_VM
    constructor: ->
      @age = ko.observable "0"
      @name = ko.observable "Name"
      @skin_type = ko.observable "5"
      @sunblock = ko.observable "Sunblock"
      @spf = ko.observable "30"

      @name.subscribe (nV) -> console.log nV
      return

    make_user: () =>
      



    cancel_button: (d,e) =>
      main.Open_Home()


