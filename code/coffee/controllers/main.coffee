define (require) ->
  ko = require 'knockout'

  PAGE = 
    SETTINGS: 
      name: "controllers/settings"
      template: "settings"
    TIMERS: "timer"

  class Main_App
    constructor: ->
      @page = ko.observable PAGE.SETTINGS
      return
      