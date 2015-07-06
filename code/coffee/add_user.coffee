define (require) ->
  ko = require 'knockout'
  main = require 'main'
  require 'slider'
  slider = require 'ko_slider'

  ToHMM = (minutes) ->
    h = minutes // 60
    m = Math.floor(minutes % 60)
    m = '0'+m if m < 10
    h+":"+m

  class Main_VM
    constructor: ->
      @age = ko.observable 12
      @name = ko.observable "Name"
      # @name.subscribe (nV) -> console.log nV
      @skin_type = ko.observable "5"
      # @skin_type.subscribe (nV) -> console.log nV
      @sunblock = ko.observable "Sunblock"
      @spf = ko.observable "30" 

      @current_user_local = main.current_user
      # console.log main.current_user()

      if @current_user_local() >=0
        # console.log 'updating'
        curr_user = main.user_list()[main.current_user()]
        # console.log curr_user
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
        timer_going: false
        reapply_time: ko.observable 0
        active: ko.observable false
        # this formula is not real, I just made it up
        duration: 120-(30-this.skin_type()*3) - (if Number(this.age()) < 12 or Number(this.age()) > 55 then 30 else 0)
        # duration: 120
        dname: ko.observable @name()
        display_name: () ->
          if this.reapply_time()-Date.now() > 0
            this.dname this.name+' '+ToHMM((this.reapply_time()-Date.now())/60000)
          else
            this.dname this.name+' '+ToHMM(0)
            this.timer_going = false
        name_updater: () ->
          setInterval =>
            if this.timer_going
              this.display_name() 
            else
              this.dname this.name
          , 10000
        start_timer: () ->
          # console.log this
          this.reapply_time Date.now()+this.duration*60000
          this.timer_going = true
          this.dname this.name+' '+ToHMM((this.reapply_time()-Date.now())/60000)
          this.display_name()
          this.name_updater()
          # Clear any local notifications
          # set a new notification
          # console.log Date.now()
          # console.log this.reapply_time()
          # console.log this.timer_going()
          # console.log this.display_name()
          # console.log this.dname()
        stop_timer: () ->
          this.timer_going = false
        toggle_active: ()->
          if this.active()
            this.reapply_time Math.floor(this.reapply_time()+(this.reapply_time()-Date.now()))
            this.display_name()
            this.active false
          else
            this.reapply_time Math.floor(this.reapply_time()-(this.reapply_time()-Date.now())/2)
            this.display_name()
            this.active true

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


