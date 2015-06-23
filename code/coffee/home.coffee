define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Home 
    constructor: () ->
      @user_list = main.user_list
      return

    Adduser_Button: (d,e) =>
      main.Open_Adduser()

    Sunburn_Button: (d,e) =>
      main.Open_Sunburn()