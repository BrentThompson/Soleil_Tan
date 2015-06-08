define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Home 
    constructor: () ->
      @dummy = ko.observable "dummy"
      return

    Adduser_Button: (d,e) =>
      main.Open_Adduser()

    Sunburn_Button: (d,e) =>
      main.Open_Sunburn()