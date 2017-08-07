#Setup
# Dash           = require "RingDashboard"
Status         = require "StatusBar"
ViewController = require "ViewController"
shortcuts = require "shortcuts"
AppleToggle    = require "AppleStyleToggle"
Primer = require 'Primer' 
ringBlue    = "#1997d5" #the lighter blue
targetScale = 1         #legacy support

Framer.Device.orientationName = "portrait"
Framer.Extras.Hints.disable()

#------------------------------
#useful classes
#Parent class
class Parent extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 0
		height: 0
		x: 0
		width: 0


#Checkmark class
class Checkmark extends Layer
	constructor: (options) ->
		super _.defaults options,
			width: 64/2
			height: 64/2
			image: "images/checkedImage.png"
			image: null
			backgroundColor: null
			currentIcon: "arrow"
		@trigger = new Layer
			parent: @
			opacity: 0
		@onClick ->
			@check()
	check: ->
		if(@image == "images/checkedImage.png")
			@image = null
		else
			@image = "images/checkedImage.png"		
	uncheck: ->
		if(@image == "images/checkedImage.png")
			@image = null

#FlipIcon class
class FlipTriangle extends Layer
	constructor: (options) ->
		super _.defaults options,
			width: 20/2
			height: 12/2
			image: "images/flipIcon2.png"
			backgroundColor: null
			currentIcon: "arrow"

# 		@onClick ->
# 			@flip()
	flip: ->
		if(@image == "images/flipIcon2.png")
			@image = "images/flipIconFlipped.png"
		else
			@image = "images/flipIcon2.png"


#ThanksSwitch class (for thanks buttons) 
class ThanksSwitch extends Layer
	constructor: (options) ->
		super _.defaults options,
			width: 140/2
			height: 28/2
			image: "images/thanks.png"
			image: null
			backgroundColor: null
			currentIcon: "arrow"
		@trigger = new Layer
			parent: @
			opacity: 0
		@onClick ->
			@check()
	check: ->
		if(@image == "images/thanks.png")
			@image = null
		else
			@image = "images/thanks.png"		
	uncheck: ->
		if(@image == "images/thanks.png")
			@image = null

#ShareButton class
class ShareButton extends Layer
	constructor: (options) ->
		super _.defaults options,
			width: 90
			height: 40
			opacity: 0
		@trigger = new Layer
			parent: @
			opacity: 0
		@onClick ->
			@open()
	open: ->
		sharingOverlay.visible = true
		sharingOverlay.animate
			opacity: 1
			options:
				time: .5
				curve: Bezier.ease

#NextAndFinishButton class 
class NextAndFinishButton extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 709
		height: 102	
		image: "images/fnn_0001_Vector-Smart-Object.png"	
		currentState: "next"
	switchToFinish: ->
		@image = "images/fnn_0000_Vector-Smart-Object.png"			
	switchToNext: ->
		@image = "images/fnn_0001_Vector-Smart-Object.png"		

#FourWayPanelIcon class 
class FourWayPanelIcon extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 709
		height: 102	
		image: "images/fnn_0001_Vector-Smart-Object.png"	
		currentState: "next"
	switchToFinish: ->
		@image = "images/fnn_0000_Vector-Smart-Object.png"			
	switchToNext: ->
		@image = "images/fnn_0001_Vector-Smart-Object.png"		

#ConnectCheck class 
class ConnectCheck extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 235
		height: 71
		image: "images/connectbutton.png"
		currentIcon: "arrow"
	check: ->
		@image = "images/prelim__0005_Checkmark.png"			
		@width = 33
		@height = 29
		@y = @y+20
		@x = @x+100
		
	switch: ->
		if(@image is "images/prelim__0004_Arrow-icon.png")
			@check()
		else
			@image = "images/prelim__0004_Arrow-icon.png"
			@width = 235
			@height = 71

#TwoDotToggle class 
class TwoDotToggle extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 14
		height: 5
		image: "images/swipe dots (left position).png"
	check: ->
		@image = "images/swipe dots (right position).png"
	switch: ->
		if(@image is "images/swipe dots (left position).png")
			@check()
		else
			@image = "images/swipe dots (left position).png"

#formatLength() method
formatLength = (input) ->
# 	if input > 60
	minutes = "" + Math.round((input%60)/60)
	seconds = "" + Math.round(input-(minutes*60))
	if(minutes.length == 1)
		minutes = "0" + minutes
	if(seconds.length == 1)
		seconds = "0" + seconds
	return (minutes + ":" + seconds)


#Point class
class Point extends Layer
	constructor: (options) ->
		super _.defaults options,
		width: 0
		width: 50  /2 
		height: 70 /2 
		image: "images/event copy.png"
		lat: 0
		long: 0

#--------------------------------------
#screens and hierarchy
Framer.Device.contentScale = .5
mainBackground = new Layer
	backgroundColor: ringBlue
	width: 1600
	height: 1019
	borderRadius: 0
	y: 188

phoneAsset = new Layer
	width: 478
	parent: mainBackground
	height: 1016
	image: "images/phoneAsset.png"
	x: 98
	y: -2

mainBackground.centerX()
mainBackground.centerY()
	

portraitParent = new Parent
	width: 750/2
	x: 150
	height: 1334/2
	parent: mainBackground
portraitParent.centerY()

portraitParent.clip = true

landscapeParent = new Parent
	height: 750/2
	visible: false
	width: 1334/2
	backgroundColor: null

landscapeParent.clip = true

lockscreenParent = new Parent
	width: 750/2
	height: 1334/2

backgroundScreen = new Layer
	width: 750/2
	parent: portraitParent
	height: 1334/2
	image: "images/background screen.png"

uiParent = new Parent
	width: 750/2
	parent: portraitParent

lowerUILiveView = new Parent
	width: 750/2
	parent: uiParent

lowerUIRecorded = new Parent
	parent: uiParent
	width: 750/2

plusButtonClosedUIParent = new Parent
	parent: lowerUILiveView

plusButtonOpenUIParent = new Parent
	parent: lowerUILiveView
recordedVideoButtons = new Layer
	width: 368/2
	height: 100/2
	y: 472
	image: "images/recordedVideoButtons.png"
	parent: lowerUIRecorded
recordedVideoButtons.centerX()


#--------------------------------------
#lower UI
blackBoxPortrait = new Layer
	parent: lowerUIRecorded
	backgroundColor: "#000000"
	x: 64
	y: 472
	height: 50
	width: 237


plusButton = new Layer
	width: 100/2
	parent: lowerUILiveView
	height: 100/2
	image: "images/plusButton.png"
	y: 472
	x: 163

plusButton.states.add
	closed:
		rotationZ: 0
	open:
		rotationZ: 45

plusButton.stateSwitch("closed")

mic = new Layer
	width: 80/2
	parent: plusButtonClosedUIParent
	x: 167
	y: 477
	height: 80/2
	image: "images/micOff.png"

sound = new Layer
	width: 80/2
	parent: plusButtonClosedUIParent
	height: 80/2
	y: 477
	x: 167
	image: "images/soundOff.png"

mic.currentlyOn = false
sound.currentlyOn = false

mic.states.add
	closed:
		opacity: 0
		x: 167
	open:
		x: 95
		opacity: 1

mic.stateSwitch("open")

sound.states.add
	closed:
		opacity: 0
		x: 167
	open:
		x: 241
		opacity: 1
sound.stateSwitch("open")

mic.onClick ->
	@image = if @currentlyOn then "images/micOff.png" else "images/micOn.png"
	@currentlyOn = !@currentlyOn

sound.onClick ->
	@image = if @currentlyOn then "images/soundOff.png" else "images/soundOn.png"
	@currentlyOn = !@currentlyOn


#live view button mode switching, 1st row
plusButton.onClick ->
	if plusButton.states.current.name is "closed"
		openLowerUI()
	else
		closeLowerUI()

openLowerUI = () ->
	plusButton.animate("open")
	mic.animate("closed")
	sound.animate("closed")
	openLowestUI()

closeLowerUI = () ->
	plusButton.animate("closed")
	mic.animate("open")
	sound.animate("open")
	closeLowestUI()

#live view second row buttons
lightsButton = new Layer
	width: 80/2
	y: 477
	x: 167
	parent: plusButtonOpenUIParent
	opacity: 0
	height: 80/2
	image: "images/lighbulbUnchecked.png"

lightsButton.states.add
	off:
		image: "images/lighbulbUnchecked.png"
	on:
		image: "images/lightEnabled.png"

nightVisionButton = new Layer
	width: 80/2
	y: 477
	x: 167
	opacity: 0
	parent: plusButtonOpenUIParent
	height: 80/2
	image: "images/nightVisionUnchecked.png"

nightVisionButton.states.add
	off:
		image: "images/nightVisionUnchecked.png"
	on:
		image: "images/nightEnabled.png"

sirenButton = new Layer
	y: 477
	x: 167
	opacity: 0
	parent: plusButtonOpenUIParent
	height: 80/2
	width: 80/2
	image: "images/sirenUnchecked.png"

sirenButton.states.add
	off:
		image: "images/sirenUnchecked.png"
	on:
		image: "images/sirenEnabled3.png"

sosButton = new Layer
	width: 80/2
	y: 477
	x: 167
	parent: plusButtonOpenUIParent
	opacity: 0
	height: 80/2
	image: "images/sosButtonUnchecked.png"

sosButton.states.add
	off:
		image: "images/sosButtonUnchecked.png"
	on:
		image: "images/sosEnabled.png"

lowestButtons = [lightsButton,sirenButton,nightVisionButton,sosButton]

for entry in lowestButtons
	entry.onClick ->
		if @states.current.name is "on"
			@stateSwitch("off")
		else
			@stateSwitch("on")
# 		Utils.delay 2, -> closeLowerUI()


# sosButtonUnchecked = new Layer
# 	width: 96
# 	height: 96
# 	image: "images/sosButtonUnchecked.png"
# 
# nightVisionUnchecked = new Layer
# 	width: 96
# 	height: 96
# 	image: "images/nightVisionUnchecked.png"
# 
# sirenUnchecked = new Layer
# 	width: 96
# 	height: 96
# 	image: "images/sirenUnchecked.png"
# 
# lighbulbUnchecked = new Layer
# 	width: 96
# 	height: 96
# 	image: "images/lighbulbUnchecked.png"


#live view button mode switching, 2nd row
openLowestUI = () ->
	for i in [0...lowestButtons.length]
		lowestButtons[i].animate
			y: 544
			x: 72 + 64*i
			opacity: 1
			options:
				time: .3
				curve: Bezier.ease

closeLowestUI = () ->
	for i in [0...lowestButtons.length]
		lowestButtons[i].animate
			y: 477
			x: 167
			opacity: 0
			options:
				time: .3
				curve: Bezier.ease

#recorded video UI

openRecordedLowerUI = () ->
	potraitRecordedPlusButton.animate("open")
	nextButton.animate("closed")
	previousButton.animate("closed")
	openRecordedLowestUI()

closeRecordedLowerUI = () ->
	potraitRecordedPlusButton.animate("closed")
	nextButton.animate("open")
	previousButton.animate("open")
	closeRecordedLowestUI()


# shareButton = new Layer
# 	parent: lowerUIRecorded
# 	x: 163
# 	y: 469
# 	width: 52
# 	opacity: 0
# 	height: 55
# 
# 
# shareSheet = new Layer
# 	width: 750/2
# 	height: 362/2
# 	parent: portraitParent
# 	visible: false
# 	image: "images/shareSheet.png"
# 	y: 497
# 
# shareSheet.states.add
# 	closed:
# 		y: 750
# 	open:
# 		y: 497
# 
# shareSheetTrigger = new Layer
# 	parent: shareSheet
# 	y: -497
# 	width: 375
# 	height: 1334/2
# 	opacity: 0
# 
# shareSheet.stateSwitch("closed")
# 
# shareButton.onClick -> 
# 	shareSheet.visible = true
# 	shareSheet.animate("open")
# 	video.player.pause()
# 
# shareSheetTrigger.onClick ->
# 	shareSheet.animate("closed")
# 	video.player.play()
# 	Utils.delay .2, ->
# 		shareSheet.visible = false

#recorded video lowest buttons


recordedVideoLowestButtonsParent = new Parent


sharePortraitRecordedButton = new Layer
	width: 40
	height: 40
	y: 477
	x: 167
	opacity: 0
	parent: recordedVideoLowestButtonsParent
	image: "images/shareUnchecked.png"

starPortraitRecordedButton = new Layer
	width: 40
	height: 40
	y: 477
	x: 181
	opacity: 0
	parent: recordedVideoLowestButtonsParent
	image: "images/starUnchecked.png"

trashPortraitRecordedButton = new Layer
	width: 40
	y: 477
	x: 167
	opacity: 0
	parent: recordedVideoLowestButtonsParent
	height: 40
	image: "images/trashUnchecked.png"

recordedVideoLowestButtons = [starPortraitRecordedButton,sharePortraitRecordedButton,trashPortraitRecordedButton]


openRecordedLowestUI = () ->
	for i in [0...recordedVideoLowestButtons.length]
		recordedVideoLowestButtons[i].animate
			y: 544
			x: 103.5 + 64*i
			opacity: 1
			options:
				time: .3
				curve: Bezier.ease

closeRecordedLowestUI = () ->
	for i in [0...recordedVideoLowestButtons.length]
		recordedVideoLowestButtons[i].animate
			y: 477
			x: 167
			opacity: 0
			options:
				time: .3
				curve: Bezier.ease

#--------------------------------------
#timeline setup
timelineParent = new Parent
	width: 750/2
	parent: portraitParent

timelineAdjustment = new Layer
	parent: timelineParent
	height: 72
	width: 375
	y: 340
	backgroundColor: "424242"

timeline = new Layer
	height: 72
	parent: timelineParent
	width: 1000/2
	y: 340
	backgroundColor: "424242"
	x: -173

liveViewIcon = new Layer
	width: 96/2
	height: 144/2
	y: 340
	x: 327
	parent: timelineParent
	image: "images/goLive4.png"

liveViewIcon.states.add
	closed:
		width: 96/2
		height: 144/2
		image: "images/goLive4.png"
	open: 
		image: "images/Live2.png"
		width: 256/2
		height: 144/2

timelineConstraints = new Layer
	parent: timelineParent
	y: timeline.y
	height: timeline.height + 20
	x: -1*timeline.width + 335 - 145
	width: timeline.width + 160 + 320
	opacity: 0

timeline.draggable.enabled = true
timeline.draggable.constraints = timelineConstraints
timeline.draggable.vertical = false

timelineLabel = new Layer
	width: 1032/2
	height: 22/2
	y: 87
	parent: timeline
	image: "images/timelineLabel.png"
	x: 0

portraitRedDot = new Layer
	parent: liveViewIcon
	height: 12
	width: 12
	visible: false
	borderRadius: 12
	backgroundColor: "D0021B"
	x: 36
	y: 28

portraitRedDot.bringToFront()

#live view logic
liveViewOpened = false

liveViewIcon.onClick ->
	if(!liveViewOpened)
		openLiveView()

timeline.onClick ->
	if(liveViewOpened)
		leaveLiveView()


animateTime = .2
openLiveView = () ->
# 	dayLabel.text = " Live"
# 	dayLabel.stateSwitch("on")
	videoTimeline.visible = false
	portraitOnVideoUI.visible = false
	video.player.loop = true
	video.visible = true
	video.video = "images/cam_1.mp4"
	video.player.play()
	timeline.draggable.enabled = false
	timelineAdjustment.visible = false
	lowerUILiveView.visible = true
	lowerUILiveView.animate 
		opacity: 1
		options:
			time: animateTime
			curve: Bezier.ease
	lowerUIRecorded.animate
		opacity: 0
		options:
			time: animateTime
			curve: Bezier.ease	
	Utils.delay animateTime, ->
		lowerUIRecorded.visible = false
	liveViewOpened = true
	liveViewIcon.stateSwitch("open")
	portraitRedDot.visible = true
	liveViewIcon.animate
		x:189
		options:
			time: animateTime
			curve: Bezier.ease
	timeline.animate
		x: (-1*timeline.width) + (375 - liveViewIcon.width) - 50
		options:
			time: animateTime
			curve: Bezier.ease

timeline.onSwipeRight -> 
	if liveViewOpened
		leaveLiveView()

# timeline.onSwipeLeft ->
# 	if(timeline.x < -150)
# 		openLiveView()

leaveLiveView = () ->
# 	dayLabel.text = "Thursday"
# 	dayLabel.stateSwitch("off")
	videoTimeline.visible = true
	video.player.loop = false
	timeline.draggable.enabled = true
	timelineAdjustment.visible = true 
	lowerUIRecorded.visible = true
	portraitPlayPauseButton.stateSwitch("playing")
	portraitOnVideoUI.visible = true
	lowerUILiveView.animate
		opacity: 0
		options:
			time: animateTime
			curve: Bezier.ease
	lowerUIRecorded.animate
		opacity: 1
		options:
			time: animateTime
			curve: Bezier.ease	
	Utils.delay animateTime, ->
		liveViewOpened = false
	
	liveViewOpened = false
	Utils.delay animateTime-.07, ->
		liveViewIcon.stateSwitch("closed")
		portraitRedDot.visible = false
	liveViewIcon.animate
		x:327
		options:
			time: animateTime
			curve: Bezier.ease
	timeline.animate
		x: -303
		options:
			time: animateTime
			curve: Bezier.ease



#event addition logic
events = []

createEvent = (position, type) ->
	event = new Layer
		parent: timeline 
		width: 64/2
		height: 144/2
		x: position
	if(type is "ring") 
		event.image = "images/ringEvent.png"
	else if (type is "double")
		event.image = "images/doubleEvent.png"
	else
		event.image = "images/motionEvent.png"
	events.push(event)
	event.name = type + "EventMarker" + (events.indexOf(event) + 1)
	
	event.onClick -> timelineFocus(@)

clearEvents = () ->
	for i in events
		i.destroy()
	events = []

#event initialization
# createEvent(30,"ring")
# createEvent(130,"motion")
# createEvent(275,"double")
# 
# createEvent(340,"ring")
# createEvent(400,"motion")

currentEventSet = []

defaultEventSet =  [[30,"ring"],
					[130,"motion"],
					[275,"double"],
					[340,"ring"],
					[400,"motion"]
					]

secondaryEventSet = [[40,"motion"],
					[150,"double"],
					[225,"ring"],
					[320,"ring"],
					[405,"motion"]
					]

loadEventSet = (inArray) ->
	clearEvents()
	currentEventSet = inArray
	for row in inArray
		createEvent(row[0],row[1])

loadEventSet(defaultEventSet)

#timeline focusing logic
currentEvent = events[events.length-1]
timelineFocus = (target) ->
	showScrubber()
	video.visible = true
	video.opacity = 1
	if liveViewOpened
		leaveLiveView()
	timeline.animate
		x: -1*(target.x-(750/4)) - (target.width/2)
	currentEvent = target
	updateVideo()
	Utils.interval .01, ->
		updateTime()
	#experimental
# 	timeline.draggable.enabled = false 
# 	phantomScrubber.visible = true


focusNearestPreviousEvent = () ->
	i = (timeline.x*-1 + 171.5)
	for n in [0...events.length]
		if events[n].x >= i and (n > 0)
			timelineFocus(events[n-1])
			return
	timelineFocus(events[0])

focusNearestUpcomingEvent = () ->
	i = (timeline.x*-1 + 171.5)
	for n in [(events.length-1)..0] by -1
		if events[n].x <= i and (n < events.length-1)
			timelineFocus(events[n+1])
			return
		else if events[n].x <= i
			Utils.delay .1, ->
				openLiveView()

# Utils.interval 1, -> print currentEvent



#timeline buttons
previousButton = new Layer
	parent: lowerUIRecorded
	y: 477
	x: 94
	width: 40
	height: 40
	image: "images/portraitLeftButton.png"

previousButton.onClick -> focusNearestPreviousEvent()

nextButton = new Layer
	parent: lowerUIRecorded
	y: 477
	x: 241
	width: 40
	height: 40
	image: "images/portraitRightLiveButton.png"

nextButton.states.add 
	open:
		opacity: 1
		x: 241
	closed:
		opacity: 0
		x: 167

previousButton.states.add 
	open:
		opacity: 1
		x: 94
	closed:
		opacity: 0
		x: 167
	

nextButton.onClick -> focusNearestUpcomingEvent()

potraitRecordedPlusButton = new Layer
	width: 100/2
	parent: lowerUIRecorded
	height: 100/2
	image: "images/plusButton.png"
	y: 472
	x: 163

potraitRecordedPlusButton.states.add
	closed:
		rotationZ: 0
	open:
		rotationZ: 45

potraitRecordedPlusButton.stateSwitch("closed")

potraitRecordedPlusButton.onClick ->
	if potraitRecordedPlusButton.states.current.name is "closed"
		openRecordedLowerUI()
	else
		closeRecordedLowerUI()






#video selection logic
videoBlur = new Layer
	parent: backgroundScreen
	width: 750/2
	height: 474/2
	y: 61
	backgroundColor: null
	image: "images/videoBlur.png"

video = new VideoLayer
	parent: backgroundScreen
	y: 65
	width: 750/2
	height: 211
	video: "images/cam_2.mp4"


videos = ["images/cam_1.mp4", "images/cam_2.mp4", "images/doorbell_1.mp4", "images/doorbell_2.mp4", "images/doorbell_3.mp4"]

# video.player.loop = true

updateVideo = () ->
	portraitPlayPauseButton.stateSwitch("playing")
	video.video = videos[events.indexOf(currentEvent)]
	video.player.play()

timeline.on Events.DragAnimationEnd, (offset, layer) ->
	if !onVideo()
		video.visible = false
	else
		video.visible = true
		updateVideo()

timeline.on Events.DragStart, (offset, layer) ->
	video.visible = false

onPause = false

onVideo = () ->
	position = (timeline.x*-1 + 171.5)
	for event in events
		lower = event.x - 12
		upper = event.x + 12
		if position > lower and position < upper
			timelineFocus(event)
			return true
	return false


video.player.play()
#--------------------------------------
#video player UI
portraitOnVideoUI = new Parent
	width: 750/2
	parent: portraitParent

switchToLandscapeButton = new Layer
	width: 40/2
	parent: portraitParent
	height: 40/2
	image: "images/fullScreenButton.png"
	y: 241
	visible: false
	x: 341

portraitPlayPauseButton = new Layer
	width: 56
	height: 56
	image: "images/pauseButton2.png"
	parent: portraitOnVideoUI
	x: 142
	opacity: .86
	y: 142

portraitPlayPauseButton.centerX()

portraitPlayPauseButton.states.add
	paused:
		image: "images/playButton2.png"
	playing:
		image: "images/pauseButton2.png"

portraitPlayPauseButton.stateSwitch("playing")

portraitPlayPauseButton.onClick ->
	togglePortraitVideoPlaying()

togglePortraitVideoPlaying = () ->
	if(!video.player.paused)
		video.player.pause()
		portraitPlayPauseButton.stateSwitch("paused")
	else
		video.player.play()
		portraitPlayPauseButton.stateSwitch("playing")

#video player scrubber

videoTimeline = new Layer
	width: 187
	height: 2
	borderRadius:10	
	backgroundColor:'#fff'
	clip:false
	parent: portraitOnVideoUI
	y: 251
	x: 72

scrubberTouched = false 

# videoTimeline.centerX()

# progress bar to indicate elapsed time
progress = new Layer
	width:0
	height:videoTimeline.height
	borderRadius:'10px'
	backgroundColor:'#1998D5'
	superLayer: videoTimeline

# scrubber to change current time
scrubber = new Layer
	width:12
	height:12
	y:-5
	borderRadius:40 
	backgroundColor:'1998D5'
	shadowBlur:10
	shadowColor:'rgba(0,0,0,0.75)'
	superLayer: videoTimeline
	x: 16

# make scrubber draggable
scrubber.draggable.enabled = true

# limit dragging along x-axis	
scrubber.draggable.speedY = 0

# prevent scrubber from dragging outside of timeline
scrubber.draggable.constraints =
	x:0
	y:videoTimeline.midY
	width:videoTimeline.width
	height:-10

# Disable dragging beyond constraints 
scrubber.draggable.overdrag = false

# Update the progress bar and scrubber as video plays
video.player.addEventListener "timeupdate", ->
	# Calculate progress bar position
	newPos = (videoTimeline.width / video.player.duration) * video.player.currentTime
	portraitVideoLength.text = formatLength(video.player.duration)
	portraitCurrentVideoTime.text = formatLength(video.player.currentTime)
	# Update progress bar and scrubber
	scrubber.x = newPos
	progress.width = newPos	+ 10

video.player.addEventListener "ended", ->
	focusNearestUpcomingEvent()

# Pause the video at start of drag
scrubber.on Events.DragStart, ->
	video.player.pause()

# Update Video Layer to current frame when scrubber is moved
scrubber.on Events.DragMove, ->
	progress.width = scrubber.x + 10
	scrubberTouched = true
	Utils.delay 4.5, -> scrubberTouched = false

Utils.interval 5, ->
	if !scrubberTouched
		portraitOnVideoUI.animate
			opacity: 0
			options:
				time: .3
				curve: Bezier.ease

showScrubber = () ->
	scrubberTouched = true
	Utils.delay 1, ->
		scrubberTouched = false
	portraitOnVideoUI.animate
		opacity: 1
		options:
			time: .3
			curve: Bezier.ease	

video.onClick ->
	if(portraitOnVideoUI.opacity is 0)
		showScrubber()
	else
		scrubberTouched = false
		portraitOnVideoUI.animate
			opacity: 0
			options:
				time: .3
				curve: Bezier.ease

# When finished dragging set currentTime
scrubber.on Events.DragEnd, ->
	newTime = Utils.round(video.player.duration * (scrubber.x / videoTimeline.width),0)
	video.player.currentTime = newTime
	video.player.play()

# phantomScrubber = new Layer
# 	opacity: 0
# 	visible: false 
# 	parent: scrubber
# 	y: 84
# 	width: 10000
# 	height: 72
# 	x: -685
# 
# phantomScrubber.draggable.enabled = true
# phantomScrubber.draggable.vertical = false

#portrait video time labels 
portraitCurrentVideoTime = new TextLayer
	fontFamily: "Equip-Medium"
	fontSize: 16
	color: "#FFFFFF"
	x: 12
	y: 243
	parent: portraitOnVideoUI
	text: "00:00"

portraitVideoLength = new TextLayer
	fontFamily: "Equip-Medium"
	fontSize: 16
	y: 243
	x: 279
	color: "#FFFFFF"
	parent: portraitOnVideoUI
	text: "00:00"

# #video delete button
# trashButton = new Layer
# 	width: 34/2
# 	height: 36/2
# 	parent: videoTimeline
# 	image: "images/trashButton.png"
# 	x: 65
# 	y: 292
# 
deleteVideo = () ->
# 	print events
	if events.length > 1
		focusNearestPreviousEvent()
	else
		openLiveView()
	events.pop(events.indexOf(currentEvent)-1).destroy()
#--------------------------------------
#day label
dayLabel = new TextLayer
	width: 100
	height: 18.86
	text: "Thursday"
	fontSize: 12
	backgroundColor: "656565"
	fontFamily: "Equip-regular"
	parent: portraitParent
	borderRadius: 100
	color: "FFFFFF"
	lineHeight: 1.5
	textAlign: "center"
	y: 288

dayLabel.states.add
	on:
		backgroundColor: "#1998D5"
	off:
		backgroundColor: "#656565"

dayLabel.centerX()
dayLabel.stateSwitch("off")

#day selector panel
daySelectorPane = new Layer
	backgroundColor: "FFFFFF"
	width: 375
	height: 75
	parent: portraitParent
	y: 591
	visible: false

daySelectorPane.states.add
	open:
		y: 591
	closed:
		y: 750

daySelectorPane.stateSwitch("closed")

monthLabel = new TextLayer
	parent: daySelectorPane
	fontFamily: "Equip-medium"
	fontSize: 12
	color: "#757575"
	x: 10
	y: 8
	text: "JULY"

dismissDayPanel = new Layer
	parent: daySelectorPane
	y: -591
	width: 375
	opacity: 0
	height: 587

dayLabel.onClick ->showDaySelector()
dismissDayPanel.onClick -> hideDaySelector()

showDaySelector = () ->
	video.player.pause()
	dayLabel.stateSwitch("on")
	daySelectorPane.visible = true
	daySelectorPane.animate("open")

hideDaySelector = () -> 
	video.player.play()
	if not liveViewOpened
		dayLabel.stateSwitch("off")
	daySelectorPane.animate("closed")
	Utils.delay .3, ->
		daySelectorPane.visible = false



#day panel entries 
dayButtons = []

dayEntries = new Parent
	parent: daySelectorPane
	width: 750/2
	height: daySelectorPane.height
	x: -1170
	width: 60*31
	backgroundColor: null

dayConstraints = new Layer
	parent: daySelectorPane
	opacity: 0
	x: dayEntries.x
	height: dayEntries.height
	width: 60*30+1240

updateWeekDay = (target) ->
	weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
# 	print weekdays[target%7]
	dayLabel.text = weekdays[target%7]

dayEntries.draggable.enabled = true
dayEntries.draggable.vertical = false
dayEntries.draggable.constraints = dayConstraints
for i in [0..30]
	dayEntry = new TextLayer
		parent: dayEntries
		height: 34.14
		width: 34.14
		y: 29.55
		borderRadius: 100
		borderWidth: 1
		borderColor: "#979797"
		fontFamily: "Equip-medium"
		fontSize: 14
		textAlign: "center"
		lineHeight: 2.4
		name: "dayEntry" + (i+1)
		color: "#757575"
		backgroundColor: "ffffff"
		x: i * (16+34)
		text: i + 1
	dayEntry.active = false 
	dayEntry.states.add
		selected:
			borderWidth: 0
			color: "#ffffff"
			backgroundColor: "#1998D5"
		deselected:
			borderWidth: 1
			color: "#757575"
			backgroundColor: "#ffffff"
	dayEntry.stateSwitch("deselected")
	if i is 30 
		dayEntry.stateSwitch("selected")
	dayButtons.push(dayEntry)
	dayEntry.onClick ->
		for j in dayButtons
			j.stateSwitch("deselected")
		@stateSwitch("selected")
		hideDaySelector()
		targetEventSet = if currentEventSet is defaultEventSet then secondaryEventSet else defaultEventSet
		loadEventSet(targetEventSet)
		timelineFocus(events[events.length-1])
		updateWeekDay(@text)


# Utils.interval 10, -> print dayEntries.x

#time label
labelText = new TextLayer
	parent: dayLabel
	fontFamily: "Equip-medium"
	text: "10:00 AM"
	textAlign: "center"
	fontSize: 16
	color: "white"
# 	y: (38/2)+2
	x: 11
	width: 79
	y: 18.86+4
# Utils.interval 1, -> print timeline.x

timeline.on Events.Move, (offset, layer) ->
	updateTime()

updateTime = () ->
	decimalTime =  Utils.modulate(timeline.x, [170, -310], [4, 10])
	date = new Date(0,0)
	date.setSeconds(+decimalTime*60*60)
	result = date.toTimeString().slice(0,5) + "AM"
	result = if result.charAt(0) is "0" then result.substring(1) else result
	labelText.centerX()
	labelText.text = result

#--------------------------------------
#static top layer
videoBar = new Layer
	width: 4/2
	height: 176/2
	image: "images/videoBar.png"
	parent: timelineParent
	x: 187
	y: 332
#--------------------------------------
#--------------------------------------
#lockscreen
lockScreen = new Layer
	width: 750/2
	parent: lockscreenParent
	height: 1334/2
	image: "images/lockScreen.png"

notification = new Layer
	y: 405/2
	opacity: 1
	visible: false
	parent: lockScreen
	width: 1416/4
	height: 366/4
	opacity: 0
	image: "images/liveNotification.png"

notification.centerX()

Utils.delay 4, ->
	notification.visible = true
	notification.animate
		opacity: 1
		options: 
			time: .5
			curve: Bezier.ease

notification.onClick -> unlock()

unlock = () ->
# 	switchToLandscape()
	lockscreenParent.animate
		opacity: 0
		options:
			time: .5
			curve: Bezier.ease
# 	openLiveView()
	Utils.delay .5, ->
		lockscreenParent.visible = false
# notification = new Layer
# 	y: 405/2
# 	opacity: 1
# 	visible: false
# 	parent: lockScreen
# 
# 	opacity: 0
# 	width: 708/2
# 	height: 180/2
# 	image: "images/recordedNotification.png"
# 
# notification.centerX()
# 
# Utils.delay .1, ->
# 	notification.visible = true
# 	notification.animate
# 		opacity: 1
# 		options: 
# 			time: .5
# 			curve: Bezier.ease
# 
# notification.onClick -> unlock()
# 
# 
# unlock = () -> 
# 	lockscreenParent.animate
# 		opacity: 0
# 		options:
# 			time: .5
# 			curve: Bezier.ease
# 	Utils.delay .5, ->
# 		lockscreenParent.visible = false


# 	Utils.delay 20, ->
# 		switchToLandscape()
# 		Utils.delay 15, ->
# 			switchToPortrait()

#--------------------------------------
#initial state
onVideo()
unlock()
# focusNearestUpcomingEvent()
# openLiveView()	
# landscapeSwitchToLiveView()
# Utils.delay .02, ->
# switchToLandscape()


#preloader
primer = new Primer
primer.load()

#non prototype UI

webContentParent = new Parent
	parent: mainBackground

webContentParent.centerY()

sampleGoLiveButton = new TextLayer
	parent: webContentParent
	backgroundColor: "D0021B"
	y: -174
	color: "#FFFFFF"
	text: "Go Live"
	borderRadius: 12
	textAlign: "center"
	fontFamily: "Equip-medium"
	fontSize: 40
	lineHeight: 2
	x: 665
	width: 350
	height: 82

sampleGoLiveButton.onClick ->
	openLiveView()
	nowInLiveView.animate
		opacity: 1
		options:
			time: .5
			curve: Bezier.ease

nowInLiveView = new TextLayer
	parent: webContentParent
	backgroundColor: null
	y: -39
	color: "#FFFFFF"
	text: "Welcome to live view. It's pretty cool."
	borderRadius: 12
	textAlign: "left"
	opacity: 0
	fontFamily: "Equip-light"
	fontSize: 30
	x: 665
	width: 350
	height: 82
