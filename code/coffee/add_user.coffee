define (require) ->
  ko = require 'knockout'
  main = require 'main'
  slider = require 'slider'

  class Main_VM
    constructor: ->
      @age = ko.observable "0"
      @name = ko.observable "Name"
      @name.subscribe (nV) -> console.log nV
      @skin_type = ko.observable "5"
      @sunblock = ko.observable "Sunblock"
      @spf = ko.observable "30" 

      @current_user_local = main.current_user
      # console.log main.current_user()

      if @current_user_local() >=0
        # console.log 'updating'
        curr_user = main.user_list()[main.current_user()]
        console.log curr_user
        @age curr_user.age
        @name curr_user.name
        @skin_type curr_user.skin_type
        @sunblock curr_user.sunblock
        @spf curr_user.spf

      # @name.subscribe (nV) -> console.log nV
      return

    make_user: (d,e) =>
      this_user = 
        # console.log "name"
        name: @name()
        age: @age()
        skin_type: @skin_type()
        sunblock: @sunblock()
        spf: @spf()
        reapply_time: 23

      if main.current_user() < 0
        main.Add_User(this_user)
        main.Open_Home()
      else
        main.Update_User(main.current_user(),this_user)
        main.current_user -1
        main.Open_Home()

    delete_user: (d,e) =>
      main.Delete_User(main.current_user())
      main.current_user -1
      main.Open_Home()

    cancel_button: (d,e) =>
      main.current_user -1
      main.Open_Home()


