define (require) ->
	ko = require 'knockout'

	PAGE =
		SETTINGS: 
			name: "controllers/settings"
			template: "settings"
		TIMERS: "timers"

	class Main_App
		constructor: ->
			#Do stuff here
			@page = ko.observable PAGE.SETTINGS
			return