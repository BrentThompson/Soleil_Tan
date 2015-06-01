define (require) ->
  ko = require 'knockout'

  PAGE = 
    ADDUSER: 
      name: "controllers/add_user"
      template: "add_user"
    TIMERS: "timer"


  class Main_App
    constructor: ->
      @page = ko.observable PAGE.ADDUSER
      return
      