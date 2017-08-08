// Generated by CoffeeScript 1.12.7
(function() {
  var iOSStatusBar,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  exports.StatusBar = iOSStatusBar = (function(superClass) {
    var DARK, HEIGHT, LIGHT, WIDTH;

    extend(iOSStatusBar, superClass);

    HEIGHT = 20;

    WIDTH = Framer.Device.screen.width;

    LIGHT = "light";

    DARK = "dark";

    function iOSStatusBar(options) {
      var base, base1, imgLeft, imgMiddle, imgRight;
      this.options = options;
      if (this.options == null) {
        this.options = {};
      }
      if ((base = this.options).backgroundColor == null) {
        base.backgroundColor = "transparent";
      }
      iOSStatusBar.__super__.constructor.call(this, this.options);
      this.height = HEIGHT;
      this.width = WIDTH;
      if (navigator.standalone) {
        return;
      }
      if ((base1 = this.options).shade == null) {
        base1.shade = LIGHT;
      }
      if (this.options.shade !== LIGHT && this.options.shade !== DARK) {
        this.options.shade = LIGHT;
      }
      imgLeft = "modules/StatusBar-assets/status-" + this.options.shade + "-left.png";
      imgMiddle = "modules/StatusBar-assets/status-" + this.options.shade + "-middle.png";
      imgRight = "modules/StatusBar-assets/status-" + this.options.shade + "-right.png";
      this.statusLeft = new Layer({
        superLayer: this,
        image: imgLeft,
        width: 130 / 2,
        height: HEIGHT
      });
      this.statusMiddle = new Layer({
        superLayer: this,
        image: imgMiddle,
        width: 108 / 2,
        height: HEIGHT,
        x: (WIDTH / 2 - 108 / 2) / 2
      });
      this.statusRight = new Layer({
        superLayer: this,
        image: imgRight,
        width: 130 / 2,
        height: HEIGHT,
        x: (WIDTH - 130) / 2
      });
    }

    return iOSStatusBar;

  })(Layer);

}).call(this);