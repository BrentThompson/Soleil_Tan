define (require) ->
  ko = require 'knockout'
  main = require 'main'

  class Main_VM
    constructor: ->
      return

    cancel_button: (d,e) =>
      main.Open_Home()