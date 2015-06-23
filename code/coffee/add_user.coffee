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

      # @name.subscribe (nV) -> console.log nV
      return

    make_user: (d,e) =>
      this_user = 
        name: @name()
        age: @age()
        skin_type: @skin_type()
        sunblock: @sunblock()
        spf: @spf()
        reapply_time: 23

      main.Add_User(this_user)
      main.Open_Home()



    cancel_button: (d,e) =>
      main.Open_Home()


