define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Home 
    constructor: () ->
      @user_list = main.user_list
      return

    Update_Button: (index,d,e) =>
      # console.log d
      # console.log e
      console.log index()
      main.current_user = index
      main.Open_Adduser()

    Adduser_Button: (d,e) =>
      main.Open_Adduser()

    Sunburn_Button: (d,e) =>
      main.Open_Sunburn()