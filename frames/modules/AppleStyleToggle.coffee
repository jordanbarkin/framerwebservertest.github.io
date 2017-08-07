
Framer.Defaults.Animation = curve: "spring(300,30,0)"

white	= "FFFFFF"
silver	= "EEEEEE"
active	= "1698d6"
toggleSize = 100
toggleRadius = toggleSize / 2
thumbSize = toggleSize / 1.75
thumbGrow = thumbSize * 0.2
class module.exports extends Layer
	constructor: (options = {}) ->
		options.width = toggleSize
		options.height = thumbSize
		options.borderRadius = toggleRadius
		options.shadowSpread = toggleSize / 50
		options.shadowColor = silver
		options.clip = false
		super(options)
		@background = new ToggleBackground
		@thumb = new Thumb
		@states.add
			off:
				backgroundColor: silver
				shadowColor: silver
			on:
				backgroundColor: active
				shadowColor: active
			offTouch:
				backgroundColor: silver
			onTouch:
				backgroundColor: silver
		@states.animationOptions =
			colorModel: "rgb"
			curve: "linear"
			time: 0.2
		@states.switchInstant("off")
		@addSubLayer @background
		@addSubLayer @thumb
		@on Events.TouchStart, ->
			if @thumb.states.current.name == "off"
				@thumb.states.switch("offTouch")
				@states.switch("offTouch")
				@background.states.switch("off")
			if @thumb.states.current.name == "on"
				@thumb.states.switch("onTouch")
		@on Events.TouchEnd, ->
			if @thumb.states.current.name == "offTouch"
				@thumb.states.switch("on")
				@states.switch("on")
			if @thumb.states.current.name == "onTouch"
				@thumb.states.switch("off")
				@states.switch("off")
				@background.states.switch("on")
class ToggleBackground extends Layer
	constructor: (options = {}) ->
		options.width = toggleSize
		options.height = thumbSize
		options.borderRadius = toggleRadius
		options.backgroundColor = white
		super(options)
		@states.add
			off:
				scale: 0
			on:
				scale: 1
		@states.animationOptions =
			colorModel: "rgb"
			curve: "linear"
			time: 0.2
class Thumb extends Layer
	constructor: (options = {}) ->
		options.x = 0
		options.y = 0
		options.borderRadius = toggleRadius
		options.backgroundColor = white
		options.height = thumbSize
		options.shadowY = toggleSize / 60
		options.shadowBlur = toggleSize / 40
		options.shadowSpread = toggleSize / 100
		options.shadowColor = "rgba(0,0,0,0.2)"
		super(options)
		@states.add
			off:
				width: thumbSize, x: 0
			on:
				width: thumbSize, x: toggleSize - thumbSize
			offTouch:
				width: thumbSize + thumbGrow
			onTouch:
				width: thumbSize + thumbGrow
				x: toggleSize - thumbSize - thumbGrow
		@states.switchInstant("off")
