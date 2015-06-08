define (require) ->
  ko = require 'knockout'

  PAGE = 
    ADDUSER: "add_user"
    SUNBURN: "sunburn"
    HOME: "home"


  class Main_App
    constructor: ->
      @page = ko.observable PAGE.HOME
      @user_list = ko.observableArray []
      return
      
    Open_Adduser: (d,e) =>
      @page PAGE.ADDUSER

    Open_Sunburn: (d,e) =>
      @page PAGE.SUNBURN

    Open_Home: (d,e) =>
      @page PAGE.HOME

    Add_user: (user) =>
      @user_list.push user

  return new Main_App()