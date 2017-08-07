# Ring Dashboard class
#Created by Jordan Barkin -- Ring Inc.

Framer.Extras.Hints.disable()
#favorite button class


#params
class Favorite extends Layer
	constructor: (options) ->
		super(options)
		@on Events.Click, @clicked

	clicked: () =>
		j = (((@parent.id - 11)/5))-1
		@parent.parent.parent.parent.parent.searchForPresses(j)
class module.exports extends Layer
	slideTime = .3
	constructor: () ->
		super(opacity: 1, width: 0, height: 0)
		sideBar = new Layer
			width: 540
			height: 1334
			parent: this
			image: "modules/dashboard-images/sidebar main.png"
		@sideBar = sideBar
		background = new Layer
			parent: this
			width: 750
			height: 1334
			image: "modules/dashboard-images/RingApp_Dashboard.png"
		@background = background
		list = new ScrollComponent
			y: 535
			x: 33
			parent: @background
			width: 682
			height: 763
		@list = list
		@list.scrollHorizontal = false

		entryPhotos = ["modules/dashboard-images/2_0000s_0000_Accepted.png",
					  "modules/dashboard-images/2_0000s_0001_Missed.png",
					  "modules/dashboard-images/2_0000s_0003_Motion.png",
					  "modules/dashboard-images/2_0000s_0004_Missed.png",
					  "modules/dashboard-images/2_0000s_0005_Missed.png",
					  "modules/dashboard-images/2_0000s_0006_Accepted.png",
					  "modules/dashboard-images/2_0000s_0007_Missed.png",
					  "modules/dashboard-images/2_0000s_0008_Missed.png",
					  "modules/dashboard-images/2_0000s_0009_Ellipse-1.png",
					  "modules/dashboard-images/2_0000s_0010_Missed.png"]

		layerList = []
		for entry in entryPhotos
			image = new Layer
				image: entry
				width: 747
				height: 107
			layerList.push image

		whatToDo = "open"
		parents = []
		buttons = []
		iconList = []

		constraintWidth = 400
		constraintHeight = 107
		for j in [0..layerList.length-1]
			entryParent = new Layer
				favorited: false
				width: 747
				identifier: "1"
				image: "modules/dashboard-images/blank.png"
				parent: @list.content
				y:j*107
				height: 107
			parents.push entryParent
			entryParent.favorited = false
			constraints = new Layer
				opacity: 0
				parent: entryParent
				width: entryParent.width+constraintWidth
				height: constraintHeight
				x:-constraintWidth
			icons = new Layer
				parent: entryParent
				width: 358
				image: "modules/dashboard-images/new three icons.png"
				height: constraintHeight
				x: 324
			icons.states.add
				on:
					image: "modules/dashboard-images/new three icons on.png"
				off:
					image: "modules/dashboard-images/new three icons.png"
			iconList.push icons
			favoriteButton = new Favorite
				superLayer: entryParent
				width: 105
				height: 95
				opacity: 0
				x: 374
			buttons.push favoriteButton
			layerList[j].parent = entryParent

			favoritedIcon = new Layer
				parent: layerList[j]
				width: 47
				height: 47
				opacity: 0
				image: "modules/dashboard-images/golden star.png"
				x: 44
				y: 30
			entryParent.type = entryParent.children[3].image.substring(38, entryParent.children[3].image.indexOf("."))

			layerList[j].onSwipeLeft ->
				list.scrollVertical = false
				Utils.delay slideTime, ->
					list.scrollVertical = true
				for i in [0..layerList.length-1]
					layerList[i].animate
						properties:
							x: 0
						time: slideTime
				@animate
					properties:
						x: -1*constraintWidth
					time: slideTime

			layerList[j].onSwipeRight ->
				list.scrollVertical = false
				Utils.delay slideTime, ->
					list.scrollVertical = true
				@animate
					properties:
						x: 0
					time: slideTime

		@searchForPresses = (l) ->
			buttons[l].parent.favorited = not buttons[l].parent.favorited
			iconList[l].states.next("on","off")
			buttons[l].parent.children[3].children[0].opacity = if buttons[l].parent.favorited is true then 1 else 0
			layerList[l].animate
				properties:
					x: 0
				time: slideTime

#devices
		devicesMask = new Layer
			parent: @background
			x: 7
			y: 145
			width: 774
			backgroundColor: "ececec"
			height: 305

		deviceConstraints = new Layer
			opacity: 0
			parent: @background
			y: 163
			x: -167
			height: 287
			width: 1075

		devices = new Layer
			image: "modules/dashboard-images/device list.png"
			parent: @background
			y: 150
			width: 892
			height: 313

		devices.draggable.constraints = deviceConstraints
		devices.draggable.enabled = true
		devices.draggable.vertical = false

#filters
		shiftTime = .2


		positions = new Layer
			width: 750
			parent: @background
			height: 1334
			image: "modules/dashboard-images/all_activity.png"
			y: 1

		positions.states.add
			all:
				image: "modules/dashboard-images/all_activity.png"
			rings:
				image: "modules/dashboard-images/rings.png"
			motion:
				image: "modules/dashboard-images/motion.png"

		ringFilter = new Layer
			parent: @background
			x: 312
			y: 467
			height: 68
			opacity: 0

		motionFilter = new Layer
			parent: @background
			x: 512
			y: 467
			height: 68
			opacity: 0

		allFilter = new Layer
			parent: @background
			x: 61
			y: 467
			height: 68
			opacity: 0
			width: 264

		ringFilter.onClick ->
			filteredParents = parents.filter (x) -> x.type is "Accepted" or x.type is "Missed"
			redrawList(filteredParents, "rings")
			Utils.delay .1, ->
				positions.states.switch("rings")
			filterSlider.states.switch("rings")

		motionFilter.onClick ->
			filteredParents = parents.filter (x) -> x.type is "Motion"
			redrawList(filteredParents, "motion")
			Utils.delay .1, ->
				positions.states.switch("motion")
			filterSlider.states.switch("motion")

		allFilter.onClick ->
			filteredParents = parents
			redrawList(filteredParents, "all")
			Utils.delay .1, ->
				positions.states.switch("all")
			filterSlider.states.switch("all")

		redrawList = (input, type) ->
			if filterSlider.states.current isnt type
				startFrom = 0
				if filterSlider.states.current is "all"
					startFrom = 750
				else if filterSlider.states.current is "motion"
					startFrom = -750
				else
					startFrom = if type is "all" then -750 else 750
				@list2 = list.copy()
				@list2.animate
					properties:
						x: -1*startFrom
					time: shiftTime
				Utils.delay shiftTime, -> @list2.destroy()
				list.x = startFrom
				list.animate
					properties:
						x: 33
					time: shiftTime

				for i in list.content.children
					i.visible = false if input.indexOf(i) is -1
					i.visible = true if input.indexOf(i) isnt -1

				for i in [0...input.length]
					input[i].parent = list.content
					input[i].y = 107*i
				list.scrollToPoint(
				    x: 0, y: 0
				    true
				    time: .5
			)
				size = input.length*107
				list.scrollVertical = if size<list.height then false else true
				list.updateContent()


		filterSlider = new Layer
			parent: @background
			x: 75
			y: 529
			width: 244
			height: 6
			backgroundColor: "1998d5"

		filterSlider.states.add
			all:
				width: 244
				x: 75
			rings:
				x: 339
				width: 151
			motion:
				x: 504
				width: 165

		filterSlider.states.animationOptions =
			time: .4




		#sidebar
		sideBarIcon = new Layer
			width: 124
			height: 121
			opacity: 0
			parent: @background
		@sideBarIcon = sideBarIcon
		@sideBarIcon.onClick -> dashboardSliding()
		dashBoardClickOff = new Layer
			width: 207
			height: 1334
			opacity: 0
			parent: @background
			visible: false
		@dashBoardClickOff = dashBoardClickOff
		dashboardSliding = () ->
			if background.x is 0
				background.animate
					properties:
						x: 540
					time: .3
				dashBoardClickOff.visible = true
				devices.animate
					properties:
						x: 0
					time: .1
			else
				background.animate
					properties:
						x: 0
					time: .3
				dashBoardClickOff.visible = false

		Screen.onEdgeSwipeLeft -> dashboardSliding() if background.x is 0

		@dashBoardClickOff.onClick -> dashboardSliding()

		sidebarScrollable = new ScrollComponent
			parent: @sideBar
			y: 176
			height: 1158
			width: 540

		sidebarScrollable.onSwipeLeft -> dashboardSliding()
		sidebarScrollable.content.image ="modules/dashboard-images/scrollable_sidebar.png"

		sidebarScrollable.scrollHorizontal = false
