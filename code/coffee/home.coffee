define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Home 
    constructor: () ->
      @user_list = main.user_list
      return

    Update_Button: (d,e) =>
      console.log d
      console.log e
      main.Open_adduser()

    Adduser_Button: (d,e) =>
      main.Open_Adduser()

    Sunburn_Button: (d,e) =>
      main.Open_Sunburn()