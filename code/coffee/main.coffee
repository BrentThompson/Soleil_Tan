define (require) ->
  ko = require 'knockout'

  PAGE = 
    ADDUSER: "add_user"
    SUNBURN: "sunburn"
    HOME: "home"


  class Main_App
    constructor: ->
      @page = ko.observable PAGE.HOME
      return
      
    Open_Adduser: (d,e) =>
      @page PAGE.ADDUSER

    Open_Sunburn: (d,e) =>
      @page PAGE.SUNBURN

    Open_Home: (d,e) =>
      @page PAGE.HOME

  return new Main_App()