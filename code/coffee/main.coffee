define (require) ->
  ko = require 'knockout'
  require 'kox_lawnchair'
  # http = require 'httpjs'
  # request = require 'request'


  PAGE = 
    ADDUSER: "add_user"
    SUNBURN: "sunburn"
    HOME: "home"


  class Main_App
    constructor: ->
      @page = ko.observable PAGE.HOME
      @current_user = ko.observable -1
      # @current_user.subscribe (nV) -> console.log nV
      @user_list = ko.observableArray []
      .extend
        store_locally:
          key: "user_list"
      @current_uv_index = ko.observable 5
      @current_uv_index.subscribe (nV) -> console.log nV

      # @user_list.subscribe (nV) -> console.log nV
      # @current_user.subscribe (nV) -> console.log nV
      return
      
    Open_Adduser: (d,e) =>
      # console.log d
      # console.log e
      @page PAGE.ADDUSER

    Open_Sunburn: (d,e) =>
      @page PAGE.SUNBURN

    Open_Home: (d,e) =>
      @page PAGE.HOME

    Add_User: (user) =>
      @user_list.push user

    Edit_User: (index) =>
      @current_user index
      @page PAGE.ADDUSER

    Update_User: (index,user) =>
      @user_list()[index] = user

    Delete_User: (index) =>
      @user_list.remove @user_list()[index]

    Get_Uvindex: (zipcode) =>
      request.get { uri:' http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/'+zipcode+'/JSON ', json: true }, (err, r, body) -> results = body
      body = ko.mapping.fromJS(body)
      console.log body

    Update_Uvindex: () =>
      @Get_Uvindex('35811')

  return new Main_App()