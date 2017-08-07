require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AppleStyleToggle":[function(require,module,exports){
var Thumb, ToggleBackground, active, silver, thumbGrow, thumbSize, toggleRadius, toggleSize, white,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Defaults.Animation = {
  curve: "spring(300,30,0)"
};

white = "FFFFFF";

silver = "EEEEEE";

active = "1698d6";

toggleSize = 100;

toggleRadius = toggleSize / 2;

thumbSize = toggleSize / 1.75;

thumbGrow = thumbSize * 0.2;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    if (options == null) {
      options = {};
    }
    options.width = toggleSize;
    options.height = thumbSize;
    options.borderRadius = toggleRadius;
    options.shadowSpread = toggleSize / 50;
    options.shadowColor = silver;
    options.clip = false;
    exports.__super__.constructor.call(this, options);
    this.background = new ToggleBackground;
    this.thumb = new Thumb;
    this.states.add({
      off: {
        backgroundColor: silver,
        shadowColor: silver
      },
      on: {
        backgroundColor: active,
        shadowColor: active
      },
      offTouch: {
        backgroundColor: silver
      },
      onTouch: {
        backgroundColor: silver
      }
    });
    this.states.animationOptions = {
      colorModel: "rgb",
      curve: "linear",
      time: 0.2
    };
    this.states.switchInstant("off");
    this.addSubLayer(this.background);
    this.addSubLayer(this.thumb);
    this.on(Events.TouchStart, function() {
      if (this.thumb.states.current.name === "off") {
        this.thumb.states["switch"]("offTouch");
        this.states["switch"]("offTouch");
        this.background.states["switch"]("off");
      }
      if (this.thumb.states.current.name === "on") {
        return this.thumb.states["switch"]("onTouch");
      }
    });
    this.on(Events.TouchEnd, function() {
      if (this.thumb.states.current.name === "offTouch") {
        this.thumb.states["switch"]("on");
        this.states["switch"]("on");
      }
      if (this.thumb.states.current.name === "onTouch") {
        this.thumb.states["switch"]("off");
        this.states["switch"]("off");
        return this.background.states["switch"]("on");
      }
    });
  }

  return exports;

})(Layer);

ToggleBackground = (function(superClass) {
  extend(ToggleBackground, superClass);

  function ToggleBackground(options) {
    if (options == null) {
      options = {};
    }
    options.width = toggleSize;
    options.height = thumbSize;
    options.borderRadius = toggleRadius;
    options.backgroundColor = white;
    ToggleBackground.__super__.constructor.call(this, options);
    this.states.add({
      off: {
        scale: 0
      },
      on: {
        scale: 1
      }
    });
    this.states.animationOptions = {
      colorModel: "rgb",
      curve: "linear",
      time: 0.2
    };
  }

  return ToggleBackground;

})(Layer);

Thumb = (function(superClass) {
  extend(Thumb, superClass);

  function Thumb(options) {
    if (options == null) {
      options = {};
    }
    options.x = 0;
    options.y = 0;
    options.borderRadius = toggleRadius;
    options.backgroundColor = white;
    options.height = thumbSize;
    options.shadowY = toggleSize / 60;
    options.shadowBlur = toggleSize / 40;
    options.shadowSpread = toggleSize / 100;
    options.shadowColor = "rgba(0,0,0,0.2)";
    Thumb.__super__.constructor.call(this, options);
    this.states.add({
      off: {
        width: thumbSize,
        x: 0
      },
      on: {
        width: thumbSize,
        x: toggleSize - thumbSize
      },
      offTouch: {
        width: thumbSize + thumbGrow
      },
      onTouch: {
        width: thumbSize + thumbGrow,
        x: toggleSize - thumbSize - thumbGrow
      }
    });
    this.states.switchInstant("off");
  }

  return Thumb;

})(Layer);


},{}],"Primer":[function(require,module,exports){
var CircularProgress,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CircularProgress = (function(superClass) {
  extend(CircularProgress, superClass);

  function CircularProgress(options) {
    CircularProgress.__super__.constructor.call(this, options);
    this.strokeWidth = 3;
    this.circleSize = 100;
    this.backgroundColor = null;
    this.createElement();
  }

  CircularProgress.prototype.createElement = function() {
    var footer, header;
    this.innerCircle = new Layer({
      x: 0,
      y: 0,
      width: this.circleSize,
      height: this.circleSize,
      superLayer: this,
      backgroundColor: null
    });
    this.outerCircle = new Layer({
      x: 0,
      y: 0,
      width: this.circleSize,
      height: this.circleSize,
      superLayer: this,
      backgroundColor: null
    });
    this.innerCircle.center();
    this.outerCircle.center();
    header = '<svg width="100px" height="100px" x="0px" y="0px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs></defs>';
    footer = '</svg>';
    this.innerCircle.html = header + '<circle id="c" cx="50" cy="50" r="48" stroke="#3F3F3F" stroke-width="' + this.strokeWidth + '" fill="none"></circle>' + footer;
    return this.outerCircle.html = header + '<circle id="progress-outer-circle" transform="rotate(270,50,50)" cx="50" cy="50" r="48" stroke="#fff" stroke-width="' + this.strokeWidth + '" fill="none"></circle>' + footer;
  };

  CircularProgress.define("value", {
    set: function(v) {
      var c, pct, r, svgPath;
      svgPath = document.getElementById('progress-outer-circle');
      r = this.width / 2;
      c = Math.PI * (r * 2);
      pct = (1 - v) * c;
      svgPath.style.strokeDasharray = c;
      return svgPath.style.strokeDashoffset = pct;
    }
  });

  return CircularProgress;

})(Layer);

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    exports.__super__.constructor.call(this, options);
    if (options == null) {
      options = {};
    }
    this.width = Screen.width;
    this.height = Screen.height;
    this.backgroundColor = "black";
    this.imagesLoaded = 0;
    this.onload = options.onload;
    this.images = [];
    this.progress = new CircularProgress({
      width: 100,
      height: 100,
      superLayer: this
    });
    this.progress.center();
    this.progress.value = 0;
  }

  exports.prototype.addImage = function(src) {
    return this.images.push(src);
  };

  exports.prototype.addFramerImages = function() {
    var i, layer, len, ref, results;
    ref = Framer.CurrentContext._layers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.image) {
        results.push(this.images.push(layer.image));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  exports.prototype.load = function() {
    var i, image, len, ref, results, src;
    this.addFramerImages();
    ref = this.images;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      src = ref[i];
      image = new Image();
      image.onload = (function(_this) {
        return function() {
          return _this.imageDidLoad();
        };
      })(this);
      image.onerror = (function(_this) {
        return function() {
          return _this.imageDidLoad();
        };
      })(this);
      results.push(image.src = src);
    }
    return results;
  };

  exports.prototype.imageDidLoad = function() {
    this.imagesLoaded++;
    this.progress.value = this.imagesLoaded / this.images.length;
    if (this.imagesLoaded >= this.images.length) {
      return this.finishedLoad();
    }
  };

  exports.prototype.finishedLoad = function() {
    if (this.onload) {
      this.onload();
    }
    return this.destroy();
  };

  return exports;

})(Layer);


},{}],"RingDashboard":[function(require,module,exports){
var Favorite,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

Favorite = (function(superClass) {
  extend(Favorite, superClass);

  function Favorite(options) {
    this.clicked = bind(this.clicked, this);
    Favorite.__super__.constructor.call(this, options);
    this.on(Events.Click, this.clicked);
  }

  Favorite.prototype.clicked = function() {
    var j;
    j = ((this.parent.id - 11) / 5) - 1;
    return this.parent.parent.parent.parent.parent.searchForPresses(j);
  };

  return Favorite;

})(Layer);

module.exports = (function(superClass) {
  var slideTime;

  extend(exports, superClass);

  slideTime = .3;

  function exports() {
    var allFilter, background, buttons, constraintHeight, constraintWidth, constraints, dashBoardClickOff, dashboardSliding, deviceConstraints, devices, devicesMask, entry, entryParent, entryPhotos, favoriteButton, favoritedIcon, filterSlider, iconList, icons, image, j, k, layerList, len, list, m, motionFilter, parents, positions, redrawList, ref, ringFilter, shiftTime, sideBar, sideBarIcon, sidebarScrollable, whatToDo;
    exports.__super__.constructor.call(this, {
      opacity: 1,
      width: 0,
      height: 0
    });
    sideBar = new Layer({
      width: 540,
      height: 1334,
      parent: this,
      image: "modules/dashboard-images/sidebar main.png"
    });
    this.sideBar = sideBar;
    background = new Layer({
      parent: this,
      width: 750,
      height: 1334,
      image: "modules/dashboard-images/RingApp_Dashboard.png"
    });
    this.background = background;
    list = new ScrollComponent({
      y: 535,
      x: 33,
      parent: this.background,
      width: 682,
      height: 763
    });
    this.list = list;
    this.list.scrollHorizontal = false;
    entryPhotos = ["modules/dashboard-images/2_0000s_0000_Accepted.png", "modules/dashboard-images/2_0000s_0001_Missed.png", "modules/dashboard-images/2_0000s_0003_Motion.png", "modules/dashboard-images/2_0000s_0004_Missed.png", "modules/dashboard-images/2_0000s_0005_Missed.png", "modules/dashboard-images/2_0000s_0006_Accepted.png", "modules/dashboard-images/2_0000s_0007_Missed.png", "modules/dashboard-images/2_0000s_0008_Missed.png", "modules/dashboard-images/2_0000s_0009_Ellipse-1.png", "modules/dashboard-images/2_0000s_0010_Missed.png"];
    layerList = [];
    for (k = 0, len = entryPhotos.length; k < len; k++) {
      entry = entryPhotos[k];
      image = new Layer({
        image: entry,
        width: 747,
        height: 107
      });
      layerList.push(image);
    }
    whatToDo = "open";
    parents = [];
    buttons = [];
    iconList = [];
    constraintWidth = 400;
    constraintHeight = 107;
    for (j = m = 0, ref = layerList.length - 1; 0 <= ref ? m <= ref : m >= ref; j = 0 <= ref ? ++m : --m) {
      entryParent = new Layer({
        favorited: false,
        width: 747,
        identifier: "1",
        image: "modules/dashboard-images/blank.png",
        parent: this.list.content,
        y: j * 107,
        height: 107
      });
      parents.push(entryParent);
      entryParent.favorited = false;
      constraints = new Layer({
        opacity: 0,
        parent: entryParent,
        width: entryParent.width + constraintWidth,
        height: constraintHeight,
        x: -constraintWidth
      });
      icons = new Layer({
        parent: entryParent,
        width: 358,
        image: "modules/dashboard-images/new three icons.png",
        height: constraintHeight,
        x: 324
      });
      icons.states.add({
        on: {
          image: "modules/dashboard-images/new three icons on.png"
        },
        off: {
          image: "modules/dashboard-images/new three icons.png"
        }
      });
      iconList.push(icons);
      favoriteButton = new Favorite({
        superLayer: entryParent,
        width: 105,
        height: 95,
        opacity: 0,
        x: 374
      });
      buttons.push(favoriteButton);
      layerList[j].parent = entryParent;
      favoritedIcon = new Layer({
        parent: layerList[j],
        width: 47,
        height: 47,
        opacity: 0,
        image: "modules/dashboard-images/golden star.png",
        x: 44,
        y: 30
      });
      entryParent.type = entryParent.children[3].image.substring(38, entryParent.children[3].image.indexOf("."));
      layerList[j].onSwipeLeft(function() {
        var i, n, ref1;
        list.scrollVertical = false;
        Utils.delay(slideTime, function() {
          return list.scrollVertical = true;
        });
        for (i = n = 0, ref1 = layerList.length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; i = 0 <= ref1 ? ++n : --n) {
          layerList[i].animate({
            properties: {
              x: 0
            },
            time: slideTime
          });
        }
        return this.animate({
          properties: {
            x: -1 * constraintWidth
          },
          time: slideTime
        });
      });
      layerList[j].onSwipeRight(function() {
        list.scrollVertical = false;
        Utils.delay(slideTime, function() {
          return list.scrollVertical = true;
        });
        return this.animate({
          properties: {
            x: 0
          },
          time: slideTime
        });
      });
    }
    this.searchForPresses = function(l) {
      buttons[l].parent.favorited = !buttons[l].parent.favorited;
      iconList[l].states.next("on", "off");
      buttons[l].parent.children[3].children[0].opacity = buttons[l].parent.favorited === true ? 1 : 0;
      return layerList[l].animate({
        properties: {
          x: 0
        },
        time: slideTime
      });
    };
    devicesMask = new Layer({
      parent: this.background,
      x: 7,
      y: 145,
      width: 774,
      backgroundColor: "ececec",
      height: 305
    });
    deviceConstraints = new Layer({
      opacity: 0,
      parent: this.background,
      y: 163,
      x: -167,
      height: 287,
      width: 1075
    });
    devices = new Layer({
      image: "modules/dashboard-images/device list.png",
      parent: this.background,
      y: 150,
      width: 892,
      height: 313
    });
    devices.draggable.constraints = deviceConstraints;
    devices.draggable.enabled = true;
    devices.draggable.vertical = false;
    shiftTime = .2;
    positions = new Layer({
      width: 750,
      parent: this.background,
      height: 1334,
      image: "modules/dashboard-images/all_activity.png",
      y: 1
    });
    positions.states.add({
      all: {
        image: "modules/dashboard-images/all_activity.png"
      },
      rings: {
        image: "modules/dashboard-images/rings.png"
      },
      motion: {
        image: "modules/dashboard-images/motion.png"
      }
    });
    ringFilter = new Layer({
      parent: this.background,
      x: 312,
      y: 467,
      height: 68,
      opacity: 0
    });
    motionFilter = new Layer({
      parent: this.background,
      x: 512,
      y: 467,
      height: 68,
      opacity: 0
    });
    allFilter = new Layer({
      parent: this.background,
      x: 61,
      y: 467,
      height: 68,
      opacity: 0,
      width: 264
    });
    ringFilter.onClick(function() {
      var filteredParents;
      filteredParents = parents.filter(function(x) {
        return x.type === "Accepted" || x.type === "Missed";
      });
      redrawList(filteredParents, "rings");
      Utils.delay(.1, function() {
        return positions.states["switch"]("rings");
      });
      return filterSlider.states["switch"]("rings");
    });
    motionFilter.onClick(function() {
      var filteredParents;
      filteredParents = parents.filter(function(x) {
        return x.type === "Motion";
      });
      redrawList(filteredParents, "motion");
      Utils.delay(.1, function() {
        return positions.states["switch"]("motion");
      });
      return filterSlider.states["switch"]("motion");
    });
    allFilter.onClick(function() {
      var filteredParents;
      filteredParents = parents;
      redrawList(filteredParents, "all");
      Utils.delay(.1, function() {
        return positions.states["switch"]("all");
      });
      return filterSlider.states["switch"]("all");
    });
    redrawList = function(input, type) {
      var i, len1, n, o, ref1, ref2, size, startFrom;
      if (filterSlider.states.current !== type) {
        startFrom = 0;
        if (filterSlider.states.current === "all") {
          startFrom = 750;
        } else if (filterSlider.states.current === "motion") {
          startFrom = -750;
        } else {
          startFrom = type === "all" ? -750 : 750;
        }
        this.list2 = list.copy();
        this.list2.animate({
          properties: {
            x: -1 * startFrom
          },
          time: shiftTime
        });
        Utils.delay(shiftTime, function() {
          return this.list2.destroy();
        });
        list.x = startFrom;
        list.animate({
          properties: {
            x: 33
          },
          time: shiftTime
        });
        ref1 = list.content.children;
        for (n = 0, len1 = ref1.length; n < len1; n++) {
          i = ref1[n];
          if (input.indexOf(i) === -1) {
            i.visible = false;
          }
          if (input.indexOf(i) !== -1) {
            i.visible = true;
          }
        }
        for (i = o = 0, ref2 = input.length; 0 <= ref2 ? o < ref2 : o > ref2; i = 0 <= ref2 ? ++o : --o) {
          input[i].parent = list.content;
          input[i].y = 107 * i;
        }
        list.scrollToPoint({
          x: 0,
          y: 0
        }, true, {
          time: .5
        });
        size = input.length * 107;
        list.scrollVertical = size < list.height ? false : true;
        return list.updateContent();
      }
    };
    filterSlider = new Layer({
      parent: this.background,
      x: 75,
      y: 529,
      width: 244,
      height: 6,
      backgroundColor: "1998d5"
    });
    filterSlider.states.add({
      all: {
        width: 244,
        x: 75
      },
      rings: {
        x: 339,
        width: 151
      },
      motion: {
        x: 504,
        width: 165
      }
    });
    filterSlider.states.animationOptions = {
      time: .4
    };
    sideBarIcon = new Layer({
      width: 124,
      height: 121,
      opacity: 0,
      parent: this.background
    });
    this.sideBarIcon = sideBarIcon;
    this.sideBarIcon.onClick(function() {
      return dashboardSliding();
    });
    dashBoardClickOff = new Layer({
      width: 207,
      height: 1334,
      opacity: 0,
      parent: this.background,
      visible: false
    });
    this.dashBoardClickOff = dashBoardClickOff;
    dashboardSliding = function() {
      if (background.x === 0) {
        background.animate({
          properties: {
            x: 540
          },
          time: .3
        });
        dashBoardClickOff.visible = true;
        return devices.animate({
          properties: {
            x: 0
          },
          time: .1
        });
      } else {
        background.animate({
          properties: {
            x: 0
          },
          time: .3
        });
        return dashBoardClickOff.visible = false;
      }
    };
    Screen.onEdgeSwipeLeft(function() {
      if (background.x === 0) {
        return dashboardSliding();
      }
    });
    this.dashBoardClickOff.onClick(function() {
      return dashboardSliding();
    });
    sidebarScrollable = new ScrollComponent({
      parent: this.sideBar,
      y: 176,
      height: 1158,
      width: 540
    });
    sidebarScrollable.onSwipeLeft(function() {
      return dashboardSliding();
    });
    sidebarScrollable.content.image = "modules/dashboard-images/scrollable_sidebar.png";
    sidebarScrollable.scrollHorizontal = false;
  }

  return exports;

})(Layer);


},{}],"StatusBar":[function(require,module,exports){
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


},{}],"ViewController":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    var autoInitial, backButtons, btn, i, len, transitions;
    if (options == null) {
      options = {};
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.height == null) {
      options.height = Screen.height;
    }
    if (options.clip == null) {
      options.clip = true;
    }
    if (options.initialViewName == null) {
      options.initialViewName = 'initialView';
    }
    if (options.backButtonName == null) {
      options.backButtonName = 'backButton';
    }
    if (options.animationOptions == null) {
      options.animationOptions = {
        curve: "cubic-bezier(0.19, 1, 0.22, 1)",
        time: .7
      };
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "black";
    }
    if (options.scroll == null) {
      options.scroll = false;
    }
    if (options.autoLink == null) {
      options.autoLink = true;
    }
    exports.__super__.constructor.call(this, options);
    this.history = [];
    this.onChange("subLayers", (function(_this) {
      return function(changeList) {
        var c, children, i, len, scrollComponent, view;
        view = changeList.added[0];
        if (view != null) {
          view.clip = true;
          view.on(Events.Click, function() {});
          if (_this.scroll) {
            children = view.children;
            scrollComponent = new ScrollComponent({
              name: "scrollComponent",
              width: _this.width,
              height: _this.height,
              parent: view
            });
            scrollComponent.content.backgroundColor = "";
            if (view.width <= _this.width) {
              scrollComponent.scrollHorizontal = false;
            }
            if (view.height <= _this.height) {
              scrollComponent.scrollVertical = false;
            }
            for (i = 0, len = children.length; i < len; i++) {
              c = children[i];
              c.parent = scrollComponent.content;
            }
            view.scrollComponent = scrollComponent;
            return view.size = {
              width: _this.width,
              height: _this.height
            };
          }
        }
      };
    })(this));
    transitions = {
      switchInstant: {
        newView: {
          to: {
            x: 0,
            y: 0
          }
        }
      },
      fadeIn: {
        newView: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      },
      zoomIn: {
        newView: {
          from: {
            scale: 0.8,
            opacity: 0
          },
          to: {
            scale: 1,
            opacity: 1
          }
        }
      },
      zoomOut: {
        oldView: {
          to: {
            scale: 0.8,
            opacity: 0
          }
        }
      },
      slideInUp: {
        newView: {
          from: {
            y: this.height
          },
          to: {
            y: 0
          }
        }
      },
      slideInRight: {
        newView: {
          from: {
            x: this.width
          },
          to: {
            x: 0
          }
        }
      },
      slideInDown: {
        newView: {
          from: {
            maxY: 0
          },
          to: {
            y: 0
          }
        }
      },
      moveInRight: {
        oldView: {
          to: {
            maxX: 0
          }
        },
        newView: {
          from: {
            x: this.width
          },
          to: {
            x: 0
          }
        }
      },
      moveInLeft: {
        oldView: {
          to: {
            x: this.width
          }
        },
        newView: {
          from: {
            maxX: 0
          },
          to: {
            x: 0
          }
        }
      },
      slideInLeft: {
        newView: {
          from: {
            maxX: 0
          },
          to: {
            maxX: this.width
          }
        }
      },
      pushInRight: {
        oldView: {
          to: {
            x: -(this.width / 5),
            brightness: 70
          }
        },
        newView: {
          from: {
            x: this.width
          },
          to: {
            x: 0
          }
        }
      },
      pushInLeft: {
        oldView: {
          to: {
            x: this.width / 5,
            brightness: 70
          }
        },
        newView: {
          from: {
            x: -this.width
          },
          to: {
            x: 0
          }
        }
      },
      pushOutRight: {
        oldView: {
          to: {
            x: this.width
          }
        },
        newView: {
          from: {
            x: -(this.width / 5),
            brightness: 70
          },
          to: {
            x: 0,
            brightness: 100
          }
        }
      },
      pushOutLeft: {
        oldView: {
          to: {
            maxX: 0
          }
        },
        newView: {
          from: {
            x: this.width / 5,
            brightness: 70
          },
          to: {
            x: 0,
            brightness: 100
          }
        }
      },
      slideOutUp: {
        oldView: {
          to: {
            maxY: 0
          }
        }
      },
      slideOutRight: {
        oldView: {
          to: {
            x: this.width
          }
        }
      },
      slideOutDown: {
        oldView: {
          to: {
            y: this.height
          }
        }
      },
      slideOutLeft: {
        oldView: {
          to: {
            maxX: 0
          }
        }
      }
    };
    transitions.slideIn = transitions.slideInRight;
    transitions.slideOut = transitions.slideOutRight;
    transitions.pushIn = transitions.pushInRight;
    transitions.pushOut = transitions.pushOutRight;
    Events.ViewWillSwitch = "viewWillSwitch";
    Events.ViewDidSwitch = "viewDidSwitch";
    Layer.prototype.onViewWillSwitch = function(cb) {
      return this.on(Events.ViewWillSwitch, cb);
    };
    Layer.prototype.onViewDidSwitch = function(cb) {
      return this.on(Events.ViewDidSwitch, cb);
    };
    _.each(transitions, (function(_this) {
      return function(animProps, name) {
        var btn, i, layers, len, viewController;
        if (options.autoLink) {
          layers = Framer.CurrentContext.getLayers();
          for (i = 0, len = layers.length; i < len; i++) {
            btn = layers[i];
            if (_.includes(btn.name, name)) {
              viewController = _this;
              btn.onClick(function() {
                var anim, linkName;
                anim = this.name.split('_')[0];
                linkName = this.name.replace(anim + '_', '');
                linkName = linkName.replace(/\d+/g, '');
                return viewController[anim](_.find(layers, function(l) {
                  return l.name === linkName;
                }));
              });
            }
          }
        }
        return _this[name] = function(newView, animationOptions) {
          var animObj, hook, incoming, outgoing, ref, ref1, ref2, ref3, ref4, ref5, ref6;
          if (animationOptions == null) {
            animationOptions = _this.animationOptions;
          }
          if (newView === _this.currentView) {
            return;
          }
          newView.parent = _this;
          newView.sendToBack();
          newView.point = {
            x: 0,
            y: 0
          };
          newView.opacity = 1;
          newView.scale = 1;
          newView.brightness = 100;
          if ((ref = _this.currentView) != null) {
            ref.point = {
              x: 0,
              y: 0
            };
          }
          if ((ref1 = _this.currentView) != null) {
            ref1.props = (ref2 = animProps.oldView) != null ? ref2.from : void 0;
          }
          animObj = _.extend({
            properties: (ref3 = animProps.oldView) != null ? ref3.to : void 0
          }, animationOptions);
          _.defaults(animObj, {
            properties: {}
          });
          outgoing = (ref4 = _this.currentView) != null ? ref4.animate(animObj) : void 0;
          newView.props = (ref5 = animProps.newView) != null ? ref5.from : void 0;
          incoming = newView.animate(_.extend({
            properties: (ref6 = animProps.newView) != null ? ref6.to : void 0
          }, animationOptions));
          if (_.includes(name, 'Out')) {
            newView.placeBehind(_this.currentView);
            outgoing.on(Events.AnimationEnd, function() {
              return _this.currentView.bringToFront();
            });
          } else {
            newView.placeBefore(_this.currentView);
          }
          _this.emit(Events.ViewWillSwitch, _this.currentView, newView);
          _this.saveCurrentViewToHistory(name, outgoing, incoming);
          _this.currentView = newView;
          _this.emit("change:previousView", _this.previousView);
          _this.emit("change:currentView", _this.currentView);
          if (incoming.isAnimating) {
            hook = incoming;
          } else {
            hook = outgoing;
          }
          return hook.on(Events.AnimationEnd, function() {
            return _this.emit(Events.ViewDidSwitch, _this.previousView, _this.currentView);
          });
        };
      };
    })(this));
    if (options.initialViewName != null) {
      autoInitial = _.find(Framer.CurrentContext.getLayers(), function(l) {
        return l.name === options.initialViewName;
      });
      if (autoInitial != null) {
        this.switchInstant(autoInitial);
      }
    }
    if (options.initialView != null) {
      this.switchInstant(options.initialView);
    }
    if (options.backButtonName != null) {
      backButtons = _.filter(Framer.CurrentContext.getLayers(), function(l) {
        return _.includes(l.name, options.backButtonName);
      });
      for (i = 0, len = backButtons.length; i < len; i++) {
        btn = backButtons[i];
        btn.onClick((function(_this) {
          return function() {
            return _this.back();
          };
        })(this));
      }
    }
  }

  exports.define("previousView", {
    get: function() {
      return this.history[0].view;
    }
  });

  exports.prototype.saveCurrentViewToHistory = function(name, outgoingAnimation, incomingAnimation) {
    return this.history.unshift({
      view: this.currentView,
      animationName: name,
      incomingAnimation: incomingAnimation,
      outgoingAnimation: outgoingAnimation
    });
  };

  exports.prototype.back = function() {
    var backIn, moveOut, previous;
    previous = this.history[0];
    if (previous.view != null) {
      if (_.includes(previous.animationName, 'Out')) {
        previous.view.bringToFront();
      }
      backIn = previous.outgoingAnimation.reverse();
      moveOut = previous.incomingAnimation.reverse();
      backIn.start();
      moveOut.start();
      this.currentView = previous.view;
      this.history.shift();
      return moveOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.currentView.bringToFront();
        };
      })(this));
    }
  };

  return exports;

})(Layer);


},{}],"input":[function(require,module,exports){
var growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 30;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    Input.__super__.constructor.call(this, options);
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.cssText = "outline: none; font-size: " + options.fontSize + "px; line-height: " + options.lineHeight + "px; padding: " + options.padding + "px; width: " + options.width + "px; height: " + options.height + "px; border: none; background-image: url(about:blank); background-color: " + options.backgroundColor + ";";
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if (options.goButton) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"shortcuts":[function(require,module,exports){

/*
  Shortcuts for Framer 1.0
  http://github.com/facebook/shortcuts-for-framer

  Copyright (c) 2014, Facebook, Inc.
  All rights reserved.

  Readme:
  https://github.com/facebook/shortcuts-for-framer

  License:
  https://github.com/facebook/shortcuts-for-framer/blob/master/LICENSE.md
 */

/*
  CONFIGURATION
 */
var shortcuts;

shortcuts = {};

Framer.Defaults.FadeAnimation = {
  curve: "bezier-curve",
  time: 0.2
};

Framer.Defaults.SlideAnimation = {
  curve: "spring(400,40,0)"
};


/*
  LOOP ON EVERY LAYER

  Shorthand for applying a function to every layer in the document.

  Example:
  ```shortcuts.everyLayer(function(layer) {
    layer.visible = false;
  });```
 */

shortcuts.everyLayer = function(fn) {
  var _layer, layerName, results1;
  results1 = [];
  for (layerName in window.Layers) {
    _layer = window.Layers[layerName];
    results1.push(fn(_layer));
  }
  return results1;
};


/*
  SHORTHAND FOR ACCESSING LAYERS

  Convert each layer coming from the exporter into a Javascript object for shorthand access.

  This has to be called manually in Framer3 after you've ran the importer.

  myLayers = Framer.Importer.load("...")
  shortcuts.initialize(myLayers)

  If you have a layer in your PSD/Sketch called "NewsFeed", this will create a global Javascript variable called "NewsFeed" that you can manipulate with Framer.

  Example:
  `NewsFeed.visible = false;`

  Notes:
  Javascript has some names reserved for internal function that you can't override (for ex. )
  If you call initialize without anything, it will use all currently available layers.
 */

shortcuts.initialize = function(layers) {
  var layer;
  if (!layers) {
    layer = Framer.CurrentContext._layerList;
  }
  window.Layers = layers;
  return shortcuts.everyLayer(function(layer) {
    var sanitizedLayerName;
    sanitizedLayerName = layer.name.replace(/[-+!?:*\[\]\(\)\/]/g, '').trim().replace(/\s/g, '_');
    window[sanitizedLayerName] = layer;
    shortcuts.saveOriginalFrame(layer);
    return shortcuts.initializeTouchStates(layer);
  });
};


/*
  FIND CHILD LAYERS BY NAME

  Retrieves subLayers of selected layer that have a matching name.

  getChild: return the first sublayer whose name includes the given string
  getChildren: return all subLayers that match

  Useful when eg. iterating over table cells. Use getChild to access the button found in each cell. This is **case insensitive**.

  Example:
  `topLayer = NewsFeed.getChild("Top")` Looks for layers whose name matches Top. Returns the first matching layer.

  `childLayers = Table.getChildren("Cell")` Returns all children whose name match Cell in an array.
 */

Layer.prototype.getChild = function(needle, recursive) {
  var i, j, len, len1, ref, ref1, subLayer;
  if (recursive == null) {
    recursive = false;
  }
  ref = this.subLayers;
  for (i = 0, len = ref.length; i < len; i++) {
    subLayer = ref[i];
    if (subLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
      return subLayer;
    }
  }
  if (recursive) {
    ref1 = this.subLayers;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subLayer = ref1[j];
      if (subLayer.getChild(needle, recursive)) {
        return subLayer.getChild(needle, recursive);
      }
    }
  }
};

Layer.prototype.getChildren = function(needle, recursive) {
  var i, j, len, len1, ref, ref1, results, subLayer;
  if (recursive == null) {
    recursive = false;
  }
  results = [];
  if (recursive) {
    ref = this.subLayers;
    for (i = 0, len = ref.length; i < len; i++) {
      subLayer = ref[i];
      results = results.concat(subLayer.getChildren(needle, recursive));
    }
    if (this.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
      results.push(this);
    }
    return results;
  } else {
    ref1 = this.subLayers;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subLayer = ref1[j];
      if (subLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
        results.push(subLayer);
      }
    }
    return results;
  }
};


/*
  CONVERT A NUMBER RANGE TO ANOTHER

  Converts a number within one range to another range

  Example:
  We want to map the opacity of a layer to its x location.

  The opacity will be 0 if the X coordinate is 0, and it will be 1 if the X coordinate is 640. All the X coordinates in between will result in intermediate values between 0 and 1.

  `myLayer.opacity = convertRange(0, 640, myLayer.x, 0, 1)`

  By default, this value might be outside the bounds of NewMin and NewMax if the OldValue is outside OldMin and OldMax. If you want to cap the final value to NewMin and NewMax, set capped to true.
  Make sure NewMin is smaller than NewMax if you're using this. If you need an inverse proportion, try swapping OldMin and OldMax.
 */

shortcuts.convertRange = function(OldMin, OldMax, OldValue, NewMin, NewMax, capped) {
  var NewRange, NewValue, OldRange;
  OldRange = OldMax - OldMin;
  NewRange = NewMax - NewMin;
  NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
  if (capped) {
    if (NewValue > NewMax) {
      return NewMax;
    } else if (NewValue < NewMin) {
      return NewMin;
    } else {
      return NewValue;
    }
  } else {
    return NewValue;
  }
};


/*
  ORIGINAL FRAME

  Stores the initial location and size of a layer in the "originalFrame" attribute, so you can revert to it later on.

  Example:
  The x coordinate of MyLayer is initially 400 (from the PSD)

  ```MyLayer.x = 200; // now we set it to 200.
  MyLayer.x = MyLayer.originalFrame.x // now we set it back to its original value, 400.```
 */

shortcuts.saveOriginalFrame = function(layer) {
  return layer.originalFrame = layer.frame;
};


/*
  SHORTHAND HOVER SYNTAX

  Quickly define functions that should run when I hover over a layer, and hover out.

  Example:
  `MyLayer.hover(function() { OtherLayer.show() }, function() { OtherLayer.hide() });`
 */

Layer.prototype.hover = function(enterFunction, leaveFunction) {
  this.on('mouseenter', enterFunction);
  return this.on('mouseleave', leaveFunction);
};


/*
  SHORTHAND TAP SYNTAX

  Instead of `MyLayer.on(Events.TouchEnd, handler)`, use `MyLayer.tap(handler)`
 */

Layer.prototype.tap = function(handler) {
  return this.on(Events.TouchEnd, handler);
};


/*
  SHORTHAND CLICK SYNTAX

  Instead of `MyLayer.on(Events.Click, handler)`, use `MyLayer.click(handler)`
 */

Layer.prototype.click = function(handler) {
  return this.on(Events.Click, handler);
};


/*
  SHORTHAND ANIMATION SYNTAX

  A shorter animation syntax that mirrors the jQuery syntax:
  layer.animate(properties, [time], [curve], [callback])

  All parameters except properties are optional and can be omitted.

  Old:
  ```MyLayer.animate({
    properties: {
      x: 500
    },
    time: 500,
    curve: 'bezier-curve'
  })```

  New:
  ```MyLayer.animateTo({
    x: 500
  })```

  Optionally (with 1000ms duration and spring):
    ```MyLayer.animateTo({
    x: 500
  }, 1000, "spring(100,10,0)")
 */

Layer.prototype.animateTo = function(properties, first, second, third) {
  var callback, curve, thisLayer, time;
  thisLayer = this;
  time = curve = callback = null;
  if (typeof first === "number") {
    time = first;
    if (typeof second === "string") {
      curve = second;
      callback = third;
    }
    if (typeof second === "function") {
      callback = second;
    }
  } else if (typeof first === "string") {
    curve = first;
    if (typeof second === "function") {
      callback = second;
    }
  } else if (typeof first === "function") {
    callback = first;
  }
  if ((time != null) && (curve == null)) {
    curve = 'bezier-curve';
  }
  if (curve == null) {
    curve = Framer.Defaults.Animation.curve;
  }
  if (time == null) {
    time = Framer.Defaults.Animation.time;
  }
  thisLayer.animationTo = new Animation({
    layer: thisLayer,
    properties: properties,
    curve: curve,
    time: time
  });
  thisLayer.animationTo.on('start', function() {
    return thisLayer.isAnimating = true;
  });
  thisLayer.animationTo.on('end', function() {
    thisLayer.isAnimating = null;
    if (callback != null) {
      return callback();
    }
  });
  return thisLayer.animationTo.start();
};


/*
  ANIMATE MOBILE LAYERS IN AND OUT OF THE VIEWPORT

  Shorthand syntax for animating layers in and out of the viewport. Assumes that the layer you are animating is a whole screen and has the same dimensions as your container.

  Enable the device preview in Framer Studio to use this – it lets this script figure out what the bounds of your screen are.

  Example:
  * `MyLayer.slideToLeft()` will animate the layer **to** the left corner of the screen (from its current position)

  * `MyLayer.slideFromLeft()` will animate the layer into the viewport **from** the left corner (from x=-width)

  Configuration:
  * (By default we use a spring curve that approximates iOS. To use a time duration, change the curve to bezier-curve.)
  * Framer.Defaults.SlideAnimation.time
  * Framer.Defaults.SlideAnimation.curve


  How to read the configuration:
  ```slideFromLeft:
    property: "x"     // animate along the X axis
    factor: "width"
    from: -1          // start value: outside the left corner ( x = -width_phone )
    to: 0             // end value: inside the left corner ( x = width_layer )
  ```
 */

shortcuts.slideAnimations = {
  slideFromLeft: {
    property: "x",
    factor: "width",
    from: -1,
    to: 0
  },
  slideToLeft: {
    property: "x",
    factor: "width",
    to: -1
  },
  slideFromRight: {
    property: "x",
    factor: "width",
    from: 1,
    to: 0
  },
  slideToRight: {
    property: "x",
    factor: "width",
    to: 1
  },
  slideFromTop: {
    property: "y",
    factor: "height",
    from: -1,
    to: 0
  },
  slideToTop: {
    property: "y",
    factor: "height",
    to: -1
  },
  slideFromBottom: {
    property: "y",
    factor: "height",
    from: 1,
    to: 0
  },
  slideToBottom: {
    property: "y",
    factor: "height",
    to: 1
  }
};

_.each(shortcuts.slideAnimations, function(opts, name) {
  return Layer.prototype[name] = function(time) {
    var _animationConfig, _curve, _factor, _phone, _property, _time, err, ref, ref1;
    _phone = (ref = Framer.Device) != null ? (ref1 = ref.screen) != null ? ref1.frame : void 0 : void 0;
    if (!_phone) {
      err = "Please select a device preview in Framer Studio to use the slide preset animations.";
      print(err);
      console.log(err);
      return;
    }
    _property = opts.property;
    _factor = _phone[opts.factor];
    if (opts.from != null) {
      this[_property] = opts.from * _factor;
    }
    _animationConfig = {};
    _animationConfig[_property] = opts.to * _factor;
    if (time) {
      _time = time;
      _curve = "bezier-curve";
    } else {
      _time = Framer.Defaults.SlideAnimation.time;
      _curve = Framer.Defaults.SlideAnimation.curve;
    }
    return this.animate({
      properties: _animationConfig,
      time: _time,
      curve: _curve
    });
  };
});


/*
  EASY FADE IN / FADE OUT

  .show() and .hide() are shortcuts to affect opacity and pointer events. This is essentially the same as hiding with `visible = false` but can be animated.

  .fadeIn() and .fadeOut() are shortcuts to fade in a hidden layer, or fade out a visible layer.

  These shortcuts work on individual layer objects as well as an array of layers.

  Example:
  * `MyLayer.fadeIn()` will fade in MyLayer using default timing.
  * `[MyLayer, OtherLayer].fadeOut(4)` will fade out both MyLayer and OtherLayer over 4 seconds.

  To customize the fade animation, change the variables time and curve inside `Framer.Defaults.FadeAnimation`.
 */

Layer.prototype.show = function() {
  this.opacity = 1;
  this.style.pointerEvents = 'auto';
  return this;
};

Layer.prototype.hide = function() {
  this.opacity = 0;
  this.style.pointerEvents = 'none';
  return this;
};

Layer.prototype.fadeIn = function(time) {
  if (time == null) {
    time = Framer.Defaults.FadeAnimation.time;
  }
  if (this.opacity === 1) {
    return;
  }
  if (!this.visible) {
    this.opacity = 0;
    this.visible = true;
  }
  return this.animateTo({
    opacity: 1
  }, time, Framer.Defaults.FadeAnimation.curve);
};

Layer.prototype.fadeOut = function(time) {
  var that;
  if (time == null) {
    time = Framer.Defaults.FadeAnimation.time;
  }
  if (this.opacity === 0) {
    return;
  }
  that = this;
  return this.animateTo({
    opacity: 0
  }, time, Framer.Defaults.FadeAnimation.curve, function() {
    return that.style.pointerEvents = 'none';
  });
};

_.each(['show', 'hide', 'fadeIn', 'fadeOut'], function(fnString) {
  return Object.defineProperty(Array.prototype, fnString, {
    enumerable: false,
    value: function(time) {
      _.each(this, function(layer) {
        if (layer instanceof Layer) {
          return Layer.prototype[fnString].call(layer, time);
        }
      });
      return this;
    }
  });
});


/*
  EASY HOVER AND TOUCH/CLICK STATES FOR LAYERS

  By naming your layer hierarchy in the following way, you can automatically have your layers react to hovers, clicks or taps.

  Button_touchable
  - Button_default (default state)
  - Button_down (touch/click state)
  - Button_hover (hover)
 */

shortcuts.initializeTouchStates = function(layer) {
  var _default, _down, _hover, hitTarget;
  _default = layer.getChild('default');
  if (layer.name.toLowerCase().indexOf('touchable') && _default) {
    if (!Framer.Utils.isMobile()) {
      _hover = layer.getChild('hover');
    }
    _down = layer.getChild('down');
    if (_hover != null) {
      _hover.hide();
    }
    if (_down != null) {
      _down.hide();
    }
    if (_hover || _down) {
      hitTarget = new Layer({
        background: 'transparent',
        frame: _default.frame
      });
      hitTarget.superLayer = layer;
      hitTarget.bringToFront();
    }
    if (_hover) {
      layer.hover(function() {
        _default.hide();
        return _hover.show();
      }, function() {
        _default.show();
        return _hover.hide();
      });
    }
    if (_down) {
      layer.on(Events.TouchStart, function() {
        _default.hide();
        if (_hover != null) {
          _hover.hide();
        }
        return _down.show();
      });
      return layer.on(Events.TouchEnd, function() {
        _down.hide();
        if (_hover) {
          return _hover.show();
        } else {
          return _default.show();
        }
      });
    }
  }
};

_.extend(exports, shortcuts);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hY3VzZXIvRGVza3RvcC9SaW5nIFRlbXAvV2ViIHRlc3QvZnJhbWVzL2dvLWxpdmUuZnJhbWVyL21vZHVsZXMvc2hvcnRjdXRzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hY3VzZXIvRGVza3RvcC9SaW5nIFRlbXAvV2ViIHRlc3QvZnJhbWVzL2dvLWxpdmUuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFjdXNlci9EZXNrdG9wL1JpbmcgVGVtcC9XZWIgdGVzdC9mcmFtZXMvZ28tbGl2ZS5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9nby1saXZlLmZyYW1lci9tb2R1bGVzL1ZpZXdDb250cm9sbGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hY3VzZXIvRGVza3RvcC9SaW5nIFRlbXAvV2ViIHRlc3QvZnJhbWVzL2dvLWxpdmUuZnJhbWVyL21vZHVsZXMvU3RhdHVzQmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hY3VzZXIvRGVza3RvcC9SaW5nIFRlbXAvV2ViIHRlc3QvZnJhbWVzL2dvLWxpdmUuZnJhbWVyL21vZHVsZXMvUmluZ0Rhc2hib2FyZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9nby1saXZlLmZyYW1lci9tb2R1bGVzL1ByaW1lci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9nby1saXZlLmZyYW1lci9tb2R1bGVzL0FwcGxlU3R5bGVUb2dnbGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbiAgU2hvcnRjdXRzIGZvciBGcmFtZXIgMS4wXG4gIGh0dHA6Ly9naXRodWIuY29tL2ZhY2Vib29rL3Nob3J0Y3V0cy1mb3ItZnJhbWVyXG5cbiAgQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG4gIFJlYWRtZTpcbiAgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3Nob3J0Y3V0cy1mb3ItZnJhbWVyXG5cbiAgTGljZW5zZTpcbiAgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3Nob3J0Y3V0cy1mb3ItZnJhbWVyL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiMjI1xuXG5cblxuXG4jIyNcbiAgQ09ORklHVVJBVElPTlxuIyMjXG5cbnNob3J0Y3V0cyA9IHt9XG5cbkZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uID1cbiAgY3VydmU6IFwiYmV6aWVyLWN1cnZlXCJcbiAgdGltZTogMC4yXG5cbkZyYW1lci5EZWZhdWx0cy5TbGlkZUFuaW1hdGlvbiA9XG4gIGN1cnZlOiBcInNwcmluZyg0MDAsNDAsMClcIlxuXG5cblxuIyMjXG4gIExPT1AgT04gRVZFUlkgTEFZRVJcblxuICBTaG9ydGhhbmQgZm9yIGFwcGx5aW5nIGEgZnVuY3Rpb24gdG8gZXZlcnkgbGF5ZXIgaW4gdGhlIGRvY3VtZW50LlxuXG4gIEV4YW1wbGU6XG4gIGBgYHNob3J0Y3V0cy5ldmVyeUxheWVyKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgbGF5ZXIudmlzaWJsZSA9IGZhbHNlO1xuICB9KTtgYGBcbiMjI1xuc2hvcnRjdXRzLmV2ZXJ5TGF5ZXIgPSAoZm4pIC0+XG4gIGZvciBsYXllck5hbWUgb2Ygd2luZG93LkxheWVyc1xuICAgIF9sYXllciA9IHdpbmRvdy5MYXllcnNbbGF5ZXJOYW1lXVxuICAgIGZuIF9sYXllclxuXG5cbiMjI1xuICBTSE9SVEhBTkQgRk9SIEFDQ0VTU0lORyBMQVlFUlNcblxuICBDb252ZXJ0IGVhY2ggbGF5ZXIgY29taW5nIGZyb20gdGhlIGV4cG9ydGVyIGludG8gYSBKYXZhc2NyaXB0IG9iamVjdCBmb3Igc2hvcnRoYW5kIGFjY2Vzcy5cblxuICBUaGlzIGhhcyB0byBiZSBjYWxsZWQgbWFudWFsbHkgaW4gRnJhbWVyMyBhZnRlciB5b3UndmUgcmFuIHRoZSBpbXBvcnRlci5cblxuICBteUxheWVycyA9IEZyYW1lci5JbXBvcnRlci5sb2FkKFwiLi4uXCIpXG4gIHNob3J0Y3V0cy5pbml0aWFsaXplKG15TGF5ZXJzKVxuXG4gIElmIHlvdSBoYXZlIGEgbGF5ZXIgaW4geW91ciBQU0QvU2tldGNoIGNhbGxlZCBcIk5ld3NGZWVkXCIsIHRoaXMgd2lsbCBjcmVhdGUgYSBnbG9iYWwgSmF2YXNjcmlwdCB2YXJpYWJsZSBjYWxsZWQgXCJOZXdzRmVlZFwiIHRoYXQgeW91IGNhbiBtYW5pcHVsYXRlIHdpdGggRnJhbWVyLlxuXG4gIEV4YW1wbGU6XG4gIGBOZXdzRmVlZC52aXNpYmxlID0gZmFsc2U7YFxuXG4gIE5vdGVzOlxuICBKYXZhc2NyaXB0IGhhcyBzb21lIG5hbWVzIHJlc2VydmVkIGZvciBpbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHlvdSBjYW4ndCBvdmVycmlkZSAoZm9yIGV4LiApXG4gIElmIHlvdSBjYWxsIGluaXRpYWxpemUgd2l0aG91dCBhbnl0aGluZywgaXQgd2lsbCB1c2UgYWxsIGN1cnJlbnRseSBhdmFpbGFibGUgbGF5ZXJzLlxuIyMjXG5zaG9ydGN1dHMuaW5pdGlhbGl6ZSA9IChsYXllcnMpIC0+XG5cbiAgbGF5ZXIgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVyTGlzdCBpZiBub3QgbGF5ZXJzXG5cbiAgd2luZG93LkxheWVycyA9IGxheWVyc1xuXG4gIHNob3J0Y3V0cy5ldmVyeUxheWVyIChsYXllcikgLT5cbiAgICBzYW5pdGl6ZWRMYXllck5hbWUgPSBsYXllci5uYW1lLnJlcGxhY2UoL1stKyE/OipcXFtcXF1cXChcXClcXC9dL2csICcnKS50cmltKCkucmVwbGFjZSgvXFxzL2csICdfJylcbiAgICB3aW5kb3dbc2FuaXRpemVkTGF5ZXJOYW1lXSA9IGxheWVyXG4gICAgc2hvcnRjdXRzLnNhdmVPcmlnaW5hbEZyYW1lIGxheWVyXG4gICAgc2hvcnRjdXRzLmluaXRpYWxpemVUb3VjaFN0YXRlcyBsYXllclxuXG5cbiMjI1xuICBGSU5EIENISUxEIExBWUVSUyBCWSBOQU1FXG5cbiAgUmV0cmlldmVzIHN1YkxheWVycyBvZiBzZWxlY3RlZCBsYXllciB0aGF0IGhhdmUgYSBtYXRjaGluZyBuYW1lLlxuXG4gIGdldENoaWxkOiByZXR1cm4gdGhlIGZpcnN0IHN1YmxheWVyIHdob3NlIG5hbWUgaW5jbHVkZXMgdGhlIGdpdmVuIHN0cmluZ1xuICBnZXRDaGlsZHJlbjogcmV0dXJuIGFsbCBzdWJMYXllcnMgdGhhdCBtYXRjaFxuXG4gIFVzZWZ1bCB3aGVuIGVnLiBpdGVyYXRpbmcgb3ZlciB0YWJsZSBjZWxscy4gVXNlIGdldENoaWxkIHRvIGFjY2VzcyB0aGUgYnV0dG9uIGZvdW5kIGluIGVhY2ggY2VsbC4gVGhpcyBpcyAqKmNhc2UgaW5zZW5zaXRpdmUqKi5cblxuICBFeGFtcGxlOlxuICBgdG9wTGF5ZXIgPSBOZXdzRmVlZC5nZXRDaGlsZChcIlRvcFwiKWAgTG9va3MgZm9yIGxheWVycyB3aG9zZSBuYW1lIG1hdGNoZXMgVG9wLiBSZXR1cm5zIHRoZSBmaXJzdCBtYXRjaGluZyBsYXllci5cblxuICBgY2hpbGRMYXllcnMgPSBUYWJsZS5nZXRDaGlsZHJlbihcIkNlbGxcIilgIFJldHVybnMgYWxsIGNoaWxkcmVuIHdob3NlIG5hbWUgbWF0Y2ggQ2VsbCBpbiBhbiBhcnJheS5cbiMjI1xuTGF5ZXI6OmdldENoaWxkID0gKG5lZWRsZSwgcmVjdXJzaXZlID0gZmFsc2UpIC0+XG4gICMgU2VhcmNoIGRpcmVjdCBjaGlsZHJlblxuICBmb3Igc3ViTGF5ZXIgaW4gQHN1YkxheWVyc1xuICAgIHJldHVybiBzdWJMYXllciBpZiBzdWJMYXllci5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgaXNudCAtMSBcblxuICAjIFJlY3Vyc2l2ZWx5IHNlYXJjaCBjaGlsZHJlbiBvZiBjaGlsZHJlblxuICBpZiByZWN1cnNpdmVcbiAgICBmb3Igc3ViTGF5ZXIgaW4gQHN1YkxheWVyc1xuICAgICAgcmV0dXJuIHN1YkxheWVyLmdldENoaWxkKG5lZWRsZSwgcmVjdXJzaXZlKSBpZiBzdWJMYXllci5nZXRDaGlsZChuZWVkbGUsIHJlY3Vyc2l2ZSkgXG5cblxuTGF5ZXI6OmdldENoaWxkcmVuID0gKG5lZWRsZSwgcmVjdXJzaXZlID0gZmFsc2UpIC0+XG4gIHJlc3VsdHMgPSBbXVxuXG4gIGlmIHJlY3Vyc2l2ZVxuICAgIGZvciBzdWJMYXllciBpbiBAc3ViTGF5ZXJzXG4gICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQgc3ViTGF5ZXIuZ2V0Q2hpbGRyZW4obmVlZGxlLCByZWN1cnNpdmUpXG4gICAgcmVzdWx0cy5wdXNoIEAgaWYgQG5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSBpc250IC0xXG4gICAgcmV0dXJuIHJlc3VsdHNcblxuICBlbHNlXG4gICAgZm9yIHN1YkxheWVyIGluIEBzdWJMYXllcnNcbiAgICAgIGlmIHN1YkxheWVyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSBpc250IC0xIFxuICAgICAgICByZXN1bHRzLnB1c2ggc3ViTGF5ZXIgXG4gICAgcmV0dXJuIHJlc3VsdHNcblxuXG5cbiMjI1xuICBDT05WRVJUIEEgTlVNQkVSIFJBTkdFIFRPIEFOT1RIRVJcblxuICBDb252ZXJ0cyBhIG51bWJlciB3aXRoaW4gb25lIHJhbmdlIHRvIGFub3RoZXIgcmFuZ2VcblxuICBFeGFtcGxlOlxuICBXZSB3YW50IHRvIG1hcCB0aGUgb3BhY2l0eSBvZiBhIGxheWVyIHRvIGl0cyB4IGxvY2F0aW9uLlxuXG4gIFRoZSBvcGFjaXR5IHdpbGwgYmUgMCBpZiB0aGUgWCBjb29yZGluYXRlIGlzIDAsIGFuZCBpdCB3aWxsIGJlIDEgaWYgdGhlIFggY29vcmRpbmF0ZSBpcyA2NDAuIEFsbCB0aGUgWCBjb29yZGluYXRlcyBpbiBiZXR3ZWVuIHdpbGwgcmVzdWx0IGluIGludGVybWVkaWF0ZSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxLlxuXG4gIGBteUxheWVyLm9wYWNpdHkgPSBjb252ZXJ0UmFuZ2UoMCwgNjQwLCBteUxheWVyLngsIDAsIDEpYFxuXG4gIEJ5IGRlZmF1bHQsIHRoaXMgdmFsdWUgbWlnaHQgYmUgb3V0c2lkZSB0aGUgYm91bmRzIG9mIE5ld01pbiBhbmQgTmV3TWF4IGlmIHRoZSBPbGRWYWx1ZSBpcyBvdXRzaWRlIE9sZE1pbiBhbmQgT2xkTWF4LiBJZiB5b3Ugd2FudCB0byBjYXAgdGhlIGZpbmFsIHZhbHVlIHRvIE5ld01pbiBhbmQgTmV3TWF4LCBzZXQgY2FwcGVkIHRvIHRydWUuXG4gIE1ha2Ugc3VyZSBOZXdNaW4gaXMgc21hbGxlciB0aGFuIE5ld01heCBpZiB5b3UncmUgdXNpbmcgdGhpcy4gSWYgeW91IG5lZWQgYW4gaW52ZXJzZSBwcm9wb3J0aW9uLCB0cnkgc3dhcHBpbmcgT2xkTWluIGFuZCBPbGRNYXguXG4jIyNcbnNob3J0Y3V0cy5jb252ZXJ0UmFuZ2UgPSAoT2xkTWluLCBPbGRNYXgsIE9sZFZhbHVlLCBOZXdNaW4sIE5ld01heCwgY2FwcGVkKSAtPlxuICBPbGRSYW5nZSA9IChPbGRNYXggLSBPbGRNaW4pXG4gIE5ld1JhbmdlID0gKE5ld01heCAtIE5ld01pbilcbiAgTmV3VmFsdWUgPSAoKChPbGRWYWx1ZSAtIE9sZE1pbikgKiBOZXdSYW5nZSkgLyBPbGRSYW5nZSkgKyBOZXdNaW5cblxuICBpZiBjYXBwZWRcbiAgICBpZiBOZXdWYWx1ZSA+IE5ld01heFxuICAgICAgTmV3TWF4XG4gICAgZWxzZSBpZiBOZXdWYWx1ZSA8IE5ld01pblxuICAgICAgTmV3TWluXG4gICAgZWxzZVxuICAgICAgTmV3VmFsdWVcbiAgZWxzZVxuICAgIE5ld1ZhbHVlXG5cblxuIyMjXG4gIE9SSUdJTkFMIEZSQU1FXG5cbiAgU3RvcmVzIHRoZSBpbml0aWFsIGxvY2F0aW9uIGFuZCBzaXplIG9mIGEgbGF5ZXIgaW4gdGhlIFwib3JpZ2luYWxGcmFtZVwiIGF0dHJpYnV0ZSwgc28geW91IGNhbiByZXZlcnQgdG8gaXQgbGF0ZXIgb24uXG5cbiAgRXhhbXBsZTpcbiAgVGhlIHggY29vcmRpbmF0ZSBvZiBNeUxheWVyIGlzIGluaXRpYWxseSA0MDAgKGZyb20gdGhlIFBTRClcblxuICBgYGBNeUxheWVyLnggPSAyMDA7IC8vIG5vdyB3ZSBzZXQgaXQgdG8gMjAwLlxuICBNeUxheWVyLnggPSBNeUxheWVyLm9yaWdpbmFsRnJhbWUueCAvLyBub3cgd2Ugc2V0IGl0IGJhY2sgdG8gaXRzIG9yaWdpbmFsIHZhbHVlLCA0MDAuYGBgXG4jIyNcbnNob3J0Y3V0cy5zYXZlT3JpZ2luYWxGcmFtZSA9IChsYXllcikgLT5cbiAgbGF5ZXIub3JpZ2luYWxGcmFtZSA9IGxheWVyLmZyYW1lXG5cbiMjI1xuICBTSE9SVEhBTkQgSE9WRVIgU1lOVEFYXG5cbiAgUXVpY2tseSBkZWZpbmUgZnVuY3Rpb25zIHRoYXQgc2hvdWxkIHJ1biB3aGVuIEkgaG92ZXIgb3ZlciBhIGxheWVyLCBhbmQgaG92ZXIgb3V0LlxuXG4gIEV4YW1wbGU6XG4gIGBNeUxheWVyLmhvdmVyKGZ1bmN0aW9uKCkgeyBPdGhlckxheWVyLnNob3coKSB9LCBmdW5jdGlvbigpIHsgT3RoZXJMYXllci5oaWRlKCkgfSk7YFxuIyMjXG5MYXllcjo6aG92ZXIgPSAoZW50ZXJGdW5jdGlvbiwgbGVhdmVGdW5jdGlvbikgLT5cbiAgdGhpcy5vbiAnbW91c2VlbnRlcicsIGVudGVyRnVuY3Rpb25cbiAgdGhpcy5vbiAnbW91c2VsZWF2ZScsIGxlYXZlRnVuY3Rpb25cblxuXG4jIyNcbiAgU0hPUlRIQU5EIFRBUCBTWU5UQVhcblxuICBJbnN0ZWFkIG9mIGBNeUxheWVyLm9uKEV2ZW50cy5Ub3VjaEVuZCwgaGFuZGxlcilgLCB1c2UgYE15TGF5ZXIudGFwKGhhbmRsZXIpYFxuIyMjXG5cbkxheWVyOjp0YXAgPSAoaGFuZGxlcikgLT5cbiAgdGhpcy5vbiBFdmVudHMuVG91Y2hFbmQsIGhhbmRsZXJcblxuXG4jIyNcbiAgU0hPUlRIQU5EIENMSUNLIFNZTlRBWFxuXG4gIEluc3RlYWQgb2YgYE15TGF5ZXIub24oRXZlbnRzLkNsaWNrLCBoYW5kbGVyKWAsIHVzZSBgTXlMYXllci5jbGljayhoYW5kbGVyKWBcbiMjI1xuXG5MYXllcjo6Y2xpY2sgPSAoaGFuZGxlcikgLT5cbiAgdGhpcy5vbiBFdmVudHMuQ2xpY2ssIGhhbmRsZXJcblxuXG5cbiMjI1xuICBTSE9SVEhBTkQgQU5JTUFUSU9OIFNZTlRBWFxuXG4gIEEgc2hvcnRlciBhbmltYXRpb24gc3ludGF4IHRoYXQgbWlycm9ycyB0aGUgalF1ZXJ5IHN5bnRheDpcbiAgbGF5ZXIuYW5pbWF0ZShwcm9wZXJ0aWVzLCBbdGltZV0sIFtjdXJ2ZV0sIFtjYWxsYmFja10pXG5cbiAgQWxsIHBhcmFtZXRlcnMgZXhjZXB0IHByb3BlcnRpZXMgYXJlIG9wdGlvbmFsIGFuZCBjYW4gYmUgb21pdHRlZC5cblxuICBPbGQ6XG4gIGBgYE15TGF5ZXIuYW5pbWF0ZSh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgeDogNTAwXG4gICAgfSxcbiAgICB0aW1lOiA1MDAsXG4gICAgY3VydmU6ICdiZXppZXItY3VydmUnXG4gIH0pYGBgXG5cbiAgTmV3OlxuICBgYGBNeUxheWVyLmFuaW1hdGVUbyh7XG4gICAgeDogNTAwXG4gIH0pYGBgXG5cbiAgT3B0aW9uYWxseSAod2l0aCAxMDAwbXMgZHVyYXRpb24gYW5kIHNwcmluZyk6XG4gICAgYGBgTXlMYXllci5hbmltYXRlVG8oe1xuICAgIHg6IDUwMFxuICB9LCAxMDAwLCBcInNwcmluZygxMDAsMTAsMClcIilcbiMjI1xuXG5cblxuTGF5ZXI6OmFuaW1hdGVUbyA9IChwcm9wZXJ0aWVzLCBmaXJzdCwgc2Vjb25kLCB0aGlyZCkgLT5cbiAgdGhpc0xheWVyID0gdGhpc1xuICB0aW1lID0gY3VydmUgPSBjYWxsYmFjayA9IG51bGxcblxuICBpZiB0eXBlb2YoZmlyc3QpID09IFwibnVtYmVyXCJcbiAgICB0aW1lID0gZmlyc3RcbiAgICBpZiB0eXBlb2Yoc2Vjb25kKSA9PSBcInN0cmluZ1wiXG4gICAgICBjdXJ2ZSA9IHNlY29uZFxuICAgICAgY2FsbGJhY2sgPSB0aGlyZFxuICAgIGNhbGxiYWNrID0gc2Vjb25kIGlmIHR5cGVvZihzZWNvbmQpID09IFwiZnVuY3Rpb25cIlxuICBlbHNlIGlmIHR5cGVvZihmaXJzdCkgPT0gXCJzdHJpbmdcIlxuICAgIGN1cnZlID0gZmlyc3RcbiAgICBjYWxsYmFjayA9IHNlY29uZCBpZiB0eXBlb2Yoc2Vjb25kKSA9PSBcImZ1bmN0aW9uXCJcbiAgZWxzZSBpZiB0eXBlb2YoZmlyc3QpID09IFwiZnVuY3Rpb25cIlxuICAgIGNhbGxiYWNrID0gZmlyc3RcblxuICBpZiB0aW1lPyAmJiAhY3VydmU/XG4gICAgY3VydmUgPSAnYmV6aWVyLWN1cnZlJ1xuICBcbiAgY3VydmUgPSBGcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uLmN1cnZlIGlmICFjdXJ2ZT9cbiAgdGltZSA9IEZyYW1lci5EZWZhdWx0cy5BbmltYXRpb24udGltZSBpZiAhdGltZT9cblxuICB0aGlzTGF5ZXIuYW5pbWF0aW9uVG8gPSBuZXcgQW5pbWF0aW9uXG4gICAgbGF5ZXI6IHRoaXNMYXllclxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcbiAgICBjdXJ2ZTogY3VydmVcbiAgICB0aW1lOiB0aW1lXG5cbiAgdGhpc0xheWVyLmFuaW1hdGlvblRvLm9uICdzdGFydCcsIC0+XG4gICAgdGhpc0xheWVyLmlzQW5pbWF0aW5nID0gdHJ1ZVxuXG4gIHRoaXNMYXllci5hbmltYXRpb25Uby5vbiAnZW5kJywgLT5cbiAgICB0aGlzTGF5ZXIuaXNBbmltYXRpbmcgPSBudWxsXG4gICAgaWYgY2FsbGJhY2s/XG4gICAgICBjYWxsYmFjaygpXG5cbiAgdGhpc0xheWVyLmFuaW1hdGlvblRvLnN0YXJ0KClcblxuIyMjXG4gIEFOSU1BVEUgTU9CSUxFIExBWUVSUyBJTiBBTkQgT1VUIE9GIFRIRSBWSUVXUE9SVFxuXG4gIFNob3J0aGFuZCBzeW50YXggZm9yIGFuaW1hdGluZyBsYXllcnMgaW4gYW5kIG91dCBvZiB0aGUgdmlld3BvcnQuIEFzc3VtZXMgdGhhdCB0aGUgbGF5ZXIgeW91IGFyZSBhbmltYXRpbmcgaXMgYSB3aG9sZSBzY3JlZW4gYW5kIGhhcyB0aGUgc2FtZSBkaW1lbnNpb25zIGFzIHlvdXIgY29udGFpbmVyLlxuXG4gIEVuYWJsZSB0aGUgZGV2aWNlIHByZXZpZXcgaW4gRnJhbWVyIFN0dWRpbyB0byB1c2UgdGhpcyDigJPCoGl0IGxldHMgdGhpcyBzY3JpcHQgZmlndXJlIG91dCB3aGF0IHRoZSBib3VuZHMgb2YgeW91ciBzY3JlZW4gYXJlLlxuXG4gIEV4YW1wbGU6XG4gICogYE15TGF5ZXIuc2xpZGVUb0xlZnQoKWAgd2lsbCBhbmltYXRlIHRoZSBsYXllciAqKnRvKiogdGhlIGxlZnQgY29ybmVyIG9mIHRoZSBzY3JlZW4gKGZyb20gaXRzIGN1cnJlbnQgcG9zaXRpb24pXG5cbiAgKiBgTXlMYXllci5zbGlkZUZyb21MZWZ0KClgIHdpbGwgYW5pbWF0ZSB0aGUgbGF5ZXIgaW50byB0aGUgdmlld3BvcnQgKipmcm9tKiogdGhlIGxlZnQgY29ybmVyIChmcm9tIHg9LXdpZHRoKVxuXG4gIENvbmZpZ3VyYXRpb246XG4gICogKEJ5IGRlZmF1bHQgd2UgdXNlIGEgc3ByaW5nIGN1cnZlIHRoYXQgYXBwcm94aW1hdGVzIGlPUy4gVG8gdXNlIGEgdGltZSBkdXJhdGlvbiwgY2hhbmdlIHRoZSBjdXJ2ZSB0byBiZXppZXItY3VydmUuKVxuICAqIEZyYW1lci5EZWZhdWx0cy5TbGlkZUFuaW1hdGlvbi50aW1lXG4gICogRnJhbWVyLkRlZmF1bHRzLlNsaWRlQW5pbWF0aW9uLmN1cnZlXG5cblxuICBIb3cgdG8gcmVhZCB0aGUgY29uZmlndXJhdGlvbjpcbiAgYGBgc2xpZGVGcm9tTGVmdDpcbiAgICBwcm9wZXJ0eTogXCJ4XCIgICAgIC8vIGFuaW1hdGUgYWxvbmcgdGhlIFggYXhpc1xuICAgIGZhY3RvcjogXCJ3aWR0aFwiXG4gICAgZnJvbTogLTEgICAgICAgICAgLy8gc3RhcnQgdmFsdWU6IG91dHNpZGUgdGhlIGxlZnQgY29ybmVyICggeCA9IC13aWR0aF9waG9uZSApXG4gICAgdG86IDAgICAgICAgICAgICAgLy8gZW5kIHZhbHVlOiBpbnNpZGUgdGhlIGxlZnQgY29ybmVyICggeCA9IHdpZHRoX2xheWVyIClcbiAgYGBgXG4jIyNcblxuXG5zaG9ydGN1dHMuc2xpZGVBbmltYXRpb25zID1cbiAgc2xpZGVGcm9tTGVmdDpcbiAgICBwcm9wZXJ0eTogXCJ4XCJcbiAgICBmYWN0b3I6IFwid2lkdGhcIlxuICAgIGZyb206IC0xXG4gICAgdG86IDBcblxuICBzbGlkZVRvTGVmdDpcbiAgICBwcm9wZXJ0eTogXCJ4XCJcbiAgICBmYWN0b3I6IFwid2lkdGhcIlxuICAgIHRvOiAtMVxuXG4gIHNsaWRlRnJvbVJpZ2h0OlxuICAgIHByb3BlcnR5OiBcInhcIlxuICAgIGZhY3RvcjogXCJ3aWR0aFwiXG4gICAgZnJvbTogMVxuICAgIHRvOiAwXG5cbiAgc2xpZGVUb1JpZ2h0OlxuICAgIHByb3BlcnR5OiBcInhcIlxuICAgIGZhY3RvcjogXCJ3aWR0aFwiXG4gICAgdG86IDFcblxuICBzbGlkZUZyb21Ub3A6XG4gICAgcHJvcGVydHk6IFwieVwiXG4gICAgZmFjdG9yOiBcImhlaWdodFwiXG4gICAgZnJvbTogLTFcbiAgICB0bzogMFxuXG4gIHNsaWRlVG9Ub3A6XG4gICAgcHJvcGVydHk6IFwieVwiXG4gICAgZmFjdG9yOiBcImhlaWdodFwiXG4gICAgdG86IC0xXG5cbiAgc2xpZGVGcm9tQm90dG9tOlxuICAgIHByb3BlcnR5OiBcInlcIlxuICAgIGZhY3RvcjogXCJoZWlnaHRcIlxuICAgIGZyb206IDFcbiAgICB0bzogMFxuXG4gIHNsaWRlVG9Cb3R0b206XG4gICAgcHJvcGVydHk6IFwieVwiXG4gICAgZmFjdG9yOiBcImhlaWdodFwiXG4gICAgdG86IDFcblxuXG5cbl8uZWFjaCBzaG9ydGN1dHMuc2xpZGVBbmltYXRpb25zLCAob3B0cywgbmFtZSkgLT5cbiAgTGF5ZXIucHJvdG90eXBlW25hbWVdID0gKHRpbWUpIC0+XG4gICAgX3Bob25lID0gRnJhbWVyLkRldmljZT8uc2NyZWVuPy5mcmFtZVxuXG4gICAgdW5sZXNzIF9waG9uZVxuICAgICAgZXJyID0gXCJQbGVhc2Ugc2VsZWN0IGEgZGV2aWNlIHByZXZpZXcgaW4gRnJhbWVyIFN0dWRpbyB0byB1c2UgdGhlIHNsaWRlIHByZXNldCBhbmltYXRpb25zLlwiXG4gICAgICBwcmludCBlcnJcbiAgICAgIGNvbnNvbGUubG9nIGVyclxuICAgICAgcmV0dXJuXG5cbiAgICBfcHJvcGVydHkgPSBvcHRzLnByb3BlcnR5XG4gICAgX2ZhY3RvciA9IF9waG9uZVtvcHRzLmZhY3Rvcl1cblxuICAgIGlmIG9wdHMuZnJvbT9cbiAgICAgICMgSW5pdGlhdGUgdGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBhbmltYXRpb24gKGkuZS4gb2ZmIHNjcmVlbiBvbiB0aGUgbGVmdCBjb3JuZXIpXG4gICAgICB0aGlzW19wcm9wZXJ0eV0gPSBvcHRzLmZyb20gKiBfZmFjdG9yXG5cbiAgICAjIERlZmF1bHQgYW5pbWF0aW9uIHN5bnRheCBsYXllci5hbmltYXRlKHtfcHJvcGVydHk6IDB9KSB3b3VsZCB0cnkgdG8gYW5pbWF0ZSAnX3Byb3BlcnR5JyBsaXRlcmFsbHksIGluIG9yZGVyIGZvciBpdCB0byBibG93IHVwIHRvIHdoYXQncyBpbiBpdCAoZWcgeCksIHdlIHVzZSB0aGlzIHN5bnRheFxuICAgIF9hbmltYXRpb25Db25maWcgPSB7fVxuICAgIF9hbmltYXRpb25Db25maWdbX3Byb3BlcnR5XSA9IG9wdHMudG8gKiBfZmFjdG9yXG5cbiAgICBpZiB0aW1lXG4gICAgICBfdGltZSA9IHRpbWVcbiAgICAgIF9jdXJ2ZSA9IFwiYmV6aWVyLWN1cnZlXCJcbiAgICBlbHNlXG4gICAgICBfdGltZSA9IEZyYW1lci5EZWZhdWx0cy5TbGlkZUFuaW1hdGlvbi50aW1lXG4gICAgICBfY3VydmUgPSBGcmFtZXIuRGVmYXVsdHMuU2xpZGVBbmltYXRpb24uY3VydmVcblxuICAgIHRoaXMuYW5pbWF0ZVxuICAgICAgcHJvcGVydGllczogX2FuaW1hdGlvbkNvbmZpZ1xuICAgICAgdGltZTogX3RpbWVcbiAgICAgIGN1cnZlOiBfY3VydmVcblxuXG5cbiMjI1xuICBFQVNZIEZBREUgSU4gLyBGQURFIE9VVFxuXG4gIC5zaG93KCkgYW5kIC5oaWRlKCkgYXJlIHNob3J0Y3V0cyB0byBhZmZlY3Qgb3BhY2l0eSBhbmQgcG9pbnRlciBldmVudHMuIFRoaXMgaXMgZXNzZW50aWFsbHkgdGhlIHNhbWUgYXMgaGlkaW5nIHdpdGggYHZpc2libGUgPSBmYWxzZWAgYnV0IGNhbiBiZSBhbmltYXRlZC5cblxuICAuZmFkZUluKCkgYW5kIC5mYWRlT3V0KCkgYXJlIHNob3J0Y3V0cyB0byBmYWRlIGluIGEgaGlkZGVuIGxheWVyLCBvciBmYWRlIG91dCBhIHZpc2libGUgbGF5ZXIuXG5cbiAgVGhlc2Ugc2hvcnRjdXRzIHdvcmsgb24gaW5kaXZpZHVhbCBsYXllciBvYmplY3RzIGFzIHdlbGwgYXMgYW4gYXJyYXkgb2YgbGF5ZXJzLlxuXG4gIEV4YW1wbGU6XG4gICogYE15TGF5ZXIuZmFkZUluKClgIHdpbGwgZmFkZSBpbiBNeUxheWVyIHVzaW5nIGRlZmF1bHQgdGltaW5nLlxuICAqIGBbTXlMYXllciwgT3RoZXJMYXllcl0uZmFkZU91dCg0KWAgd2lsbCBmYWRlIG91dCBib3RoIE15TGF5ZXIgYW5kIE90aGVyTGF5ZXIgb3ZlciA0IHNlY29uZHMuXG5cbiAgVG8gY3VzdG9taXplIHRoZSBmYWRlIGFuaW1hdGlvbiwgY2hhbmdlIHRoZSB2YXJpYWJsZXMgdGltZSBhbmQgY3VydmUgaW5zaWRlIGBGcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbmAuXG4jIyNcbkxheWVyOjpzaG93ID0gLT5cbiAgQG9wYWNpdHkgPSAxXG4gIEBzdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nXG4gIEBcblxuTGF5ZXI6OmhpZGUgPSAtPlxuICBAb3BhY2l0eSA9IDBcbiAgQHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSdcbiAgQFxuXG5MYXllcjo6ZmFkZUluID0gKHRpbWUgPSBGcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbi50aW1lKSAtPlxuICByZXR1cm4gaWYgQG9wYWNpdHkgPT0gMVxuXG4gIHVubGVzcyBAdmlzaWJsZVxuICAgIEBvcGFjaXR5ID0gMFxuICAgIEB2aXNpYmxlID0gdHJ1ZVxuXG4gIEBhbmltYXRlVG8gb3BhY2l0eTogMSwgdGltZSwgRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb24uY3VydmVcblxuTGF5ZXI6OmZhZGVPdXQgPSAodGltZSA9IEZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uLnRpbWUpIC0+XG4gIHJldHVybiBpZiBAb3BhY2l0eSA9PSAwXG5cbiAgdGhhdCA9IEBcbiAgQGFuaW1hdGVUbyBvcGFjaXR5OiAwLCB0aW1lLCBGcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbi5jdXJ2ZSwgLT4gdGhhdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnXG5cbiMgYWxsIG9mIHRoZSBlYXN5IGluL291dCBoZWxwZXJzIHdvcmsgb24gYW4gYXJyYXkgb2Ygdmlld3MgYXMgd2VsbCBhcyBpbmRpdmlkdWFsIHZpZXdzXG5fLmVhY2ggWydzaG93JywgJ2hpZGUnLCAnZmFkZUluJywgJ2ZhZGVPdXQnXSwgKGZuU3RyaW5nKS0+ICBcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5IEFycmF5LnByb3RvdHlwZSwgZm5TdHJpbmcsIFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgdmFsdWU6ICh0aW1lKSAtPlxuICAgICAgXy5lYWNoIEAsIChsYXllcikgLT5cbiAgICAgICAgTGF5ZXIucHJvdG90eXBlW2ZuU3RyaW5nXS5jYWxsKGxheWVyLCB0aW1lKSBpZiBsYXllciBpbnN0YW5jZW9mIExheWVyXG4gICAgICBAXG5cblxuIyMjXG4gIEVBU1kgSE9WRVIgQU5EIFRPVUNIL0NMSUNLIFNUQVRFUyBGT1IgTEFZRVJTXG5cbiAgQnkgbmFtaW5nIHlvdXIgbGF5ZXIgaGllcmFyY2h5IGluIHRoZSBmb2xsb3dpbmcgd2F5LCB5b3UgY2FuIGF1dG9tYXRpY2FsbHkgaGF2ZSB5b3VyIGxheWVycyByZWFjdCB0byBob3ZlcnMsIGNsaWNrcyBvciB0YXBzLlxuXG4gIEJ1dHRvbl90b3VjaGFibGVcbiAgLSBCdXR0b25fZGVmYXVsdCAoZGVmYXVsdCBzdGF0ZSlcbiAgLSBCdXR0b25fZG93biAodG91Y2gvY2xpY2sgc3RhdGUpXG4gIC0gQnV0dG9uX2hvdmVyIChob3ZlcilcbiMjI1xuXG5zaG9ydGN1dHMuaW5pdGlhbGl6ZVRvdWNoU3RhdGVzID0gKGxheWVyKSAtPlxuICBfZGVmYXVsdCA9IGxheWVyLmdldENoaWxkKCdkZWZhdWx0JylcblxuICBpZiBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndG91Y2hhYmxlJykgYW5kIF9kZWZhdWx0XG5cbiAgICB1bmxlc3MgRnJhbWVyLlV0aWxzLmlzTW9iaWxlKClcbiAgICAgIF9ob3ZlciA9IGxheWVyLmdldENoaWxkKCdob3ZlcicpXG4gICAgX2Rvd24gPSBsYXllci5nZXRDaGlsZCgnZG93bicpXG5cbiAgICAjIFRoZXNlIGxheWVycyBzaG91bGQgYmUgaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICBfaG92ZXI/LmhpZGUoKVxuICAgIF9kb3duPy5oaWRlKClcblxuICAgICMgQ3JlYXRlIGZha2UgaGl0IHRhcmdldCAoc28gd2UgZG9uJ3QgcmUtZmlyZSBldmVudHMpXG4gICAgaWYgX2hvdmVyIG9yIF9kb3duXG4gICAgICBoaXRUYXJnZXQgPSBuZXcgTGF5ZXJcbiAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50J1xuICAgICAgICBmcmFtZTogX2RlZmF1bHQuZnJhbWVcblxuICAgICAgaGl0VGFyZ2V0LnN1cGVyTGF5ZXIgPSBsYXllclxuICAgICAgaGl0VGFyZ2V0LmJyaW5nVG9Gcm9udCgpXG5cbiAgICAjIFRoZXJlIGlzIGEgaG92ZXIgc3RhdGUsIHNvIGRlZmluZSBob3ZlciBldmVudHMgKG5vdCBmb3IgbW9iaWxlKVxuICAgIGlmIF9ob3ZlclxuICAgICAgbGF5ZXIuaG92ZXIgLT5cbiAgICAgICAgX2RlZmF1bHQuaGlkZSgpXG4gICAgICAgIF9ob3Zlci5zaG93KClcbiAgICAgICwgLT5cbiAgICAgICAgX2RlZmF1bHQuc2hvdygpXG4gICAgICAgIF9ob3Zlci5oaWRlKClcblxuICAgICMgVGhlcmUgaXMgYSBkb3duIHN0YXRlLCBzbyBkZWZpbmUgZG93biBldmVudHNcbiAgICBpZiBfZG93blxuICAgICAgbGF5ZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG4gICAgICAgIF9kZWZhdWx0LmhpZGUoKVxuICAgICAgICBfaG92ZXI/LmhpZGUoKSAjIHRvdWNoIGRvd24gc3RhdGUgb3ZlcnJpZGVzIGhvdmVyIHN0YXRlXG4gICAgICAgIF9kb3duLnNob3coKVxuXG4gICAgICBsYXllci5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICAgIF9kb3duLmhpZGUoKVxuXG4gICAgICAgIGlmIF9ob3ZlclxuICAgICAgICAgICMgSWYgdGhlcmUgd2FzIGEgaG92ZXIgc3RhdGUsIGdvIGJhY2sgdG8gdGhlIGhvdmVyIHN0YXRlXG4gICAgICAgICAgX2hvdmVyLnNob3coKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgX2RlZmF1bHQuc2hvdygpXG5cblxuXy5leHRlbmQoZXhwb3J0cywgc2hvcnRjdXRzKVxuXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiZXhwb3J0cy5rZXlib2FyZExheWVyID0gbmV3IExheWVyXG5cdHg6MCwgeTpTY3JlZW4uaGVpZ2h0LCB3aWR0aDpTY3JlZW4ud2lkdGgsIGhlaWdodDo0MzJcblx0aHRtbDpcIjxpbWcgc3R5bGU9J3dpZHRoOiAxMDAlOycgc3JjPSdtb2R1bGVzL2tleWJvYXJkLnBuZycvPlwiXG5cbiNzY3JlZW4gd2lkdGggdnMuIHNpemUgb2YgaW1hZ2Ugd2lkdGhcbmdyb3d0aFJhdGlvID0gU2NyZWVuLndpZHRoIC8gNzMyXG5pbWFnZUhlaWdodCA9IGdyb3d0aFJhdGlvICogNDMyXG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMgPVxuXHRzaG93bjogXG5cdFx0eTogU2NyZWVuLmhlaWdodCAtIGltYWdlSGVpZ2h0XG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMTUpXCJcblxuY2xhc3MgZXhwb3J0cy5JbnB1dCBleHRlbmRzIExheWVyXG5cdEBkZWZpbmUgXCJzdHlsZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRfLmV4dGVuZCBAaW5wdXQuc3R5bGUsIHZhbHVlXG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQudmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zZXR1cCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMud2lkdGggPz0gU2NyZWVuLndpZHRoXG5cdFx0b3B0aW9ucy5jbGlwID89IGZhbHNlXG5cdFx0b3B0aW9ucy5oZWlnaHQgPz0gNjBcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJyZ2JhKDI1NSwgNjAsIDQ3LCAuNSlcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMzBcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMzBcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yP1xuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0QGlucHV0LmlkID0gXCJpbnB1dC0je18ubm93KCl9XCJcblx0XHRAaW5wdXQuc3R5bGUuY3NzVGV4dCA9IFwib3V0bGluZTogbm9uZTsgZm9udC1zaXplOiAje29wdGlvbnMuZm9udFNpemV9cHg7IGxpbmUtaGVpZ2h0OiAje29wdGlvbnMubGluZUhlaWdodH1weDsgcGFkZGluZzogI3tvcHRpb25zLnBhZGRpbmd9cHg7IHdpZHRoOiAje29wdGlvbnMud2lkdGh9cHg7IGhlaWdodDogI3tvcHRpb25zLmhlaWdodH1weDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYWJvdXQ6YmxhbmspOyBiYWNrZ3JvdW5kLWNvbG9yOiAje29wdGlvbnMuYmFja2dyb3VuZENvbG9yfTtcIlxuXHRcdEBpbnB1dC52YWx1ZSA9IG9wdGlvbnMudGV4dFxuXHRcdEBpbnB1dC50eXBlID0gb3B0aW9ucy50eXBlXG5cdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlclxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5hdXRvZm9jdXMgPT0gdHJ1ZVxuXHRcdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9mb2N1c1wiLCB0cnVlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInNwZWxsY2hlY2tcIiwgb3B0aW9ucy5zcGVsbENoZWNrXG5cdFx0QGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZm9ybVwiXG5cblx0XHRpZiBvcHRpb25zLmdvQnV0dG9uXG5cdFx0XHRAZm9ybS5hY3Rpb24gPSBcIiNcIlxuXHRcdFx0QGZvcm0uYWRkRXZlbnRMaXN0ZW5lciBcInN1Ym1pdFwiLCAoZXZlbnQpIC0+XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdEBmb3JtLmFwcGVuZENoaWxkIEBpbnB1dFxuXHRcdEBfZWxlbWVudC5hcHBlbmRDaGlsZCBAZm9ybVxuXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdEB1cGRhdGVQbGFjZWhvbGRlckNvbG9yIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBAcGxhY2Vob2xkZXJDb2xvclxuXG5cdFx0I29ubHkgc2hvdyBob25vciB2aXJ0dWFsIGtleWJvYXJkIG9wdGlvbiB3aGVuIG5vdCBvbiBtb2JpbGUsXG5cdFx0I290aGVyd2lzZSBpZ25vcmVcblx0XHRpZiAhVXRpbHMuaXNNb2JpbGUoKSAmJiBvcHRpb25zLnZpcnR1YWxLZXlib2FyZCBpcyB0cnVlXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVDeWNsZSgpXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cblx0dXBkYXRlUGxhY2Vob2xkZXJDb2xvcjogKGNvbG9yKSAtPlxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gY29sb3Jcblx0XHRpZiBAcGFnZVN0eWxlP1xuXHRcdFx0ZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCBAcGFnZVN0eWxlXG5cdFx0QHBhZ2VTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzdHlsZVwiXG5cdFx0QHBhZ2VTdHlsZS50eXBlID0gXCJ0ZXh0L2Nzc1wiXG5cdFx0Y3NzID0gXCIjI3tAaW5wdXQuaWR9Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QHBsYWNlaG9sZGVyQ29sb3J9OyB9XCJcblx0XHRAcGFnZVN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlIGNzcylcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkIEBwYWdlU3R5bGVcblxuXHRmb2N1czogKCkgLT5cblx0XHRAaW5wdXQuZm9jdXMoKVxuXG5cdG9uRm9jdXM6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuXG5cdG9uQmx1cjogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcbiIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0XHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMud2lkdGggPz0gU2NyZWVuLndpZHRoXG5cdFx0b3B0aW9ucy5oZWlnaHQgPz0gU2NyZWVuLmhlaWdodFxuXHRcdG9wdGlvbnMuY2xpcCA/PSB0cnVlXG5cdFx0b3B0aW9ucy5pbml0aWFsVmlld05hbWUgPz0gJ2luaXRpYWxWaWV3J1xuXHRcdG9wdGlvbnMuYmFja0J1dHRvbk5hbWUgPz0gJ2JhY2tCdXR0b24nXG5cdFx0b3B0aW9ucy5hbmltYXRpb25PcHRpb25zID89IHsgY3VydmU6IFwiY3ViaWMtYmV6aWVyKDAuMTksIDEsIDAuMjIsIDEpXCIsIHRpbWU6IC43IH1cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcImJsYWNrXCJcblx0XHRvcHRpb25zLnNjcm9sbCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuYXV0b0xpbmsgPz0gdHJ1ZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBoaXN0b3J5ID0gW11cblxuXHRcdEBvbkNoYW5nZSBcInN1YkxheWVyc1wiLCAoY2hhbmdlTGlzdCkgPT5cblx0XHRcdHZpZXcgPSBjaGFuZ2VMaXN0LmFkZGVkWzBdXG5cdFx0XHRpZiB2aWV3P1xuXHRcdFx0XHQjIGRlZmF1bHQgYmVoYXZpb3JzIGZvciB2aWV3c1xuXHRcdFx0XHR2aWV3LmNsaXAgPSB0cnVlXG5cdFx0XHRcdHZpZXcub24gRXZlbnRzLkNsaWNrLCAtPiByZXR1cm4gIyBwcmV2ZW50IGNsaWNrLXRocm91Z2gvYnViYmxpbmdcblx0XHRcdFx0IyBhZGQgc2Nyb2xsY29tcG9uZW50XG5cdFx0XHRcdGlmIEBzY3JvbGxcblx0XHRcdFx0XHRjaGlsZHJlbiA9IHZpZXcuY2hpbGRyZW5cblx0XHRcdFx0XHRzY3JvbGxDb21wb25lbnQgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRcdFx0XHRuYW1lOiBcInNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdFx0XHRcdHBhcmVudDogdmlld1xuXHRcdFx0XHRcdHNjcm9sbENvbXBvbmVudC5jb250ZW50LmJhY2tncm91bmRDb2xvciA9IFwiXCJcblx0XHRcdFx0XHRpZiB2aWV3LndpZHRoIDw9IEB3aWR0aFxuXHRcdFx0XHRcdFx0c2Nyb2xsQ29tcG9uZW50LnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXHRcdFx0XHRcdGlmIHZpZXcuaGVpZ2h0IDw9IEBoZWlnaHRcblx0XHRcdFx0XHRcdHNjcm9sbENvbXBvbmVudC5zY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cdFx0XHRcdFx0Zm9yIGMgaW4gY2hpbGRyZW5cblx0XHRcdFx0XHRcdGMucGFyZW50ID0gc2Nyb2xsQ29tcG9uZW50LmNvbnRlbnRcblx0XHRcdFx0XHR2aWV3LnNjcm9sbENvbXBvbmVudCA9IHNjcm9sbENvbXBvbmVudCAjIG1ha2UgaXQgYWNjZXNzaWJsZSBhcyBhIHByb3BlcnR5XG5cdFx0XHRcdFx0IyByZXNldCBzaXplIHNpbmNlIGNvbnRlbnQgbW92ZWQgdG8gc2Nyb2xsQ29tcG9uZW50LiBwcmV2ZW50cyBzY3JvbGwgYnVnIHdoZW4gZHJhZ2dpbmcgb3V0c2lkZS5cblx0XHRcdFx0XHR2aWV3LnNpemUgPSB7d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0fVxuXG5cdFx0dHJhbnNpdGlvbnMgPVxuXHRcdFx0c3dpdGNoSW5zdGFudDpcblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHR0bzoge3g6IDAsIHk6IDB9XG5cdFx0XHRmYWRlSW46XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge29wYWNpdHk6IDB9XG5cdFx0XHRcdFx0dG86IHtvcGFjaXR5OiAxfVxuXHRcdFx0em9vbUluOlxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHtzY2FsZTogMC44LCBvcGFjaXR5OiAwfVxuXHRcdFx0XHRcdHRvOiB7c2NhbGU6IDEsIG9wYWNpdHk6IDF9XG5cdFx0XHR6b29tT3V0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7c2NhbGU6IDAuOCwgb3BhY2l0eTogMH1cblx0XHRcdHNsaWRlSW5VcDpcblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7eTogQGhlaWdodH1cblx0XHRcdFx0XHR0bzoge3k6IDB9XG5cdFx0XHRzbGlkZUluUmlnaHQ6XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3g6IEB3aWR0aH1cblx0XHRcdFx0XHR0bzoge3g6IDB9XG5cdFx0XHRzbGlkZUluRG93bjpcblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7bWF4WTogMH1cblx0XHRcdFx0XHR0bzoge3k6IDB9XG5cdFx0XHRtb3ZlSW5SaWdodDpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge21heFg6IDB9XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3g6IEB3aWR0aH1cblx0XHRcdFx0XHR0bzoge3g6IDB9XG5cdFx0XHRtb3ZlSW5MZWZ0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7eDogQHdpZHRofVxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHttYXhYOiAwfVxuXHRcdFx0XHRcdHRvOiB7eDogMH1cblx0XHRcdHNsaWRlSW5MZWZ0OlxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHttYXhYOiAwfVxuXHRcdFx0XHRcdHRvOiB7bWF4WDogQHdpZHRofVxuXHRcdFx0cHVzaEluUmlnaHQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHt4OiAtKEB3aWR0aC81KSwgYnJpZ2h0bmVzczogNzB9XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3g6IEB3aWR0aH1cblx0XHRcdFx0XHR0bzoge3g6IDB9XG5cdFx0XHRwdXNoSW5MZWZ0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7eDogQHdpZHRoLzUsIGJyaWdodG5lc3M6IDcwfVxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHt4OiAtQHdpZHRofVxuXHRcdFx0XHRcdHRvOiB7eDogMH1cblx0XHRcdHB1c2hPdXRSaWdodDpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge3g6IEB3aWR0aH1cblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7eDogLShAd2lkdGgvNSksIGJyaWdodG5lc3M6IDcwfVxuXHRcdFx0XHRcdHRvOiB7eDogMCwgYnJpZ2h0bmVzczogMTAwfVxuXHRcdFx0cHVzaE91dExlZnQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHttYXhYOiAwfVxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHt4OiBAd2lkdGgvNSwgYnJpZ2h0bmVzczogNzB9XG5cdFx0XHRcdFx0dG86IHt4OiAwLCBicmlnaHRuZXNzOiAxMDB9XG5cdFx0XHRzbGlkZU91dFVwOlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7bWF4WTogMH1cblx0XHRcdHNsaWRlT3V0UmlnaHQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHt4OiBAd2lkdGh9XG5cdFx0XHRzbGlkZU91dERvd246XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHt5OiBAaGVpZ2h0fVxuXHRcdFx0c2xpZGVPdXRMZWZ0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7bWF4WDogMH1cblxuXHRcdCMgc2hvcnRjdXRzXG5cdFx0dHJhbnNpdGlvbnMuc2xpZGVJbiA9IHRyYW5zaXRpb25zLnNsaWRlSW5SaWdodFxuXHRcdHRyYW5zaXRpb25zLnNsaWRlT3V0ID0gdHJhbnNpdGlvbnMuc2xpZGVPdXRSaWdodFxuXHRcdHRyYW5zaXRpb25zLnB1c2hJbiA9IHRyYW5zaXRpb25zLnB1c2hJblJpZ2h0XG5cdFx0dHJhbnNpdGlvbnMucHVzaE91dCA9IHRyYW5zaXRpb25zLnB1c2hPdXRSaWdodFxuXG5cdFx0IyBldmVudHNcblx0XHRFdmVudHMuVmlld1dpbGxTd2l0Y2ggPSBcInZpZXdXaWxsU3dpdGNoXCJcblx0XHRFdmVudHMuVmlld0RpZFN3aXRjaCA9IFwidmlld0RpZFN3aXRjaFwiXG5cdFx0TGF5ZXI6Om9uVmlld1dpbGxTd2l0Y2ggPSAoY2IpIC0+IEBvbihFdmVudHMuVmlld1dpbGxTd2l0Y2gsIGNiKVxuXHRcdExheWVyOjpvblZpZXdEaWRTd2l0Y2ggPSAoY2IpIC0+IEBvbihFdmVudHMuVmlld0RpZFN3aXRjaCwgY2IpXHRcdFxuXG5cdFx0Xy5lYWNoIHRyYW5zaXRpb25zLCAoYW5pbVByb3BzLCBuYW1lKSA9PlxuXG5cdFx0XHRpZiBvcHRpb25zLmF1dG9MaW5rXG5cdFx0XHRcdGxheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKVxuXHRcdFx0XHRmb3IgYnRuIGluIGxheWVyc1xuXHRcdFx0XHRcdGlmIF8uaW5jbHVkZXMgYnRuLm5hbWUsIG5hbWVcblx0XHRcdFx0XHRcdHZpZXdDb250cm9sbGVyID0gQFxuXHRcdFx0XHRcdFx0YnRuLm9uQ2xpY2sgLT5cblx0XHRcdFx0XHRcdFx0YW5pbSA9IEBuYW1lLnNwbGl0KCdfJylbMF1cblx0XHRcdFx0XHRcdFx0bGlua05hbWUgPSBAbmFtZS5yZXBsYWNlKGFuaW0rJ18nLCcnKVxuXHRcdFx0XHRcdFx0XHRsaW5rTmFtZSA9IGxpbmtOYW1lLnJlcGxhY2UoL1xcZCsvZywgJycpICMgcmVtb3ZlIG51bWJlcnNcblx0XHRcdFx0XHRcdFx0dmlld0NvbnRyb2xsZXJbYW5pbV0gXy5maW5kKGxheWVycywgKGwpIC0+IGwubmFtZSBpcyBsaW5rTmFtZSlcblxuXHRcdFx0QFtuYW1lXSA9IChuZXdWaWV3LCBhbmltYXRpb25PcHRpb25zID0gQGFuaW1hdGlvbk9wdGlvbnMpID0+XG5cblx0XHRcdFx0cmV0dXJuIGlmIG5ld1ZpZXcgaXMgQGN1cnJlbnRWaWV3XG5cblxuXG5cdFx0XHRcdCMgbWFrZSBzdXJlIHRoZSBuZXcgbGF5ZXIgaXMgaW5zaWRlIHRoZSB2aWV3Y29udHJvbGxlclxuXHRcdFx0XHRuZXdWaWV3LnBhcmVudCA9IEBcblx0XHRcdFx0bmV3Vmlldy5zZW5kVG9CYWNrKClcblxuXHRcdFx0XHQjIHJlc2V0IHByb3BzIGluIGNhc2UgdGhleSB3ZXJlIGNoYW5nZWQgYnkgYSBwcmV2IGFuaW1hdGlvblxuXHRcdFx0XHRuZXdWaWV3LnBvaW50ID0ge3g6MCwgeTogMH1cblx0XHRcdFx0bmV3Vmlldy5vcGFjaXR5ID0gMVxuXHRcdFx0XHRuZXdWaWV3LnNjYWxlID0gMVxuXHRcdFx0XHRuZXdWaWV3LmJyaWdodG5lc3MgPSAxMDBcblx0XHRcdFx0XG5cdFx0XHRcdCMgb2xkVmlld1xuXHRcdFx0XHRAY3VycmVudFZpZXc/LnBvaW50ID0ge3g6IDAsIHk6IDB9ICMgZml4ZXMgb2Zmc2V0IGlzc3VlIHdoZW4gbW92aW5nIHRvbyBmYXN0IGJldHdlZW4gc2NyZWVuc1xuXHRcdFx0XHRAY3VycmVudFZpZXc/LnByb3BzID0gYW5pbVByb3BzLm9sZFZpZXc/LmZyb21cblx0XHRcdFx0YW5pbU9iaiA9IF8uZXh0ZW5kIHtwcm9wZXJ0aWVzOiBhbmltUHJvcHMub2xkVmlldz8udG99LCBhbmltYXRpb25PcHRpb25zXG5cdFx0XHRcdF8uZGVmYXVsdHMoYW5pbU9iaiwgeyBwcm9wZXJ0aWVzOiB7fSB9KVxuXHRcdFx0XHRvdXRnb2luZyA9IEBjdXJyZW50Vmlldz8uYW5pbWF0ZSBhbmltT2JqXG5cblx0XHRcdFx0IyBuZXdWaWV3XG5cdFx0XHRcdG5ld1ZpZXcucHJvcHMgPSBhbmltUHJvcHMubmV3Vmlldz8uZnJvbVxuXHRcdFx0XHRpbmNvbWluZyA9IG5ld1ZpZXcuYW5pbWF0ZSBfLmV4dGVuZCB7cHJvcGVydGllczogYW5pbVByb3BzLm5ld1ZpZXc/LnRvfSwgYW5pbWF0aW9uT3B0aW9uc1xuXHRcdFx0XHRcblx0XHRcdFx0IyBsYXllciBvcmRlclxuXHRcdFx0XHRpZiBfLmluY2x1ZGVzIG5hbWUsICdPdXQnXG5cdFx0XHRcdFx0bmV3Vmlldy5wbGFjZUJlaGluZChAY3VycmVudFZpZXcpXG5cdFx0XHRcdFx0b3V0Z29pbmcub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT4gQGN1cnJlbnRWaWV3LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRuZXdWaWV3LnBsYWNlQmVmb3JlKEBjdXJyZW50Vmlldylcblx0XHRcdFx0XHRcblx0XHRcdFx0QGVtaXQoRXZlbnRzLlZpZXdXaWxsU3dpdGNoLCBAY3VycmVudFZpZXcsIG5ld1ZpZXcpXG5cdFx0XHRcdFxuXHRcdFx0XHQjIGNoYW5nZSBDdXJyZW50VmlldyBiZWZvcmUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZCBzbyBvbmUgY291bGQgZ28gYmFjayBpbiBoaXN0b3J5XG5cdFx0XHRcdCMgd2l0aG91dCBoYXZpbmcgdG8gd2FpdCBmb3IgdGhlIHRyYW5zaXRpb24gdG8gZmluaXNoXG5cdFx0XHRcdEBzYXZlQ3VycmVudFZpZXdUb0hpc3RvcnkgbmFtZSwgb3V0Z29pbmcsIGluY29taW5nXG5cdFx0XHRcdEBjdXJyZW50VmlldyA9IG5ld1ZpZXdcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6cHJldmlvdXNWaWV3XCIsIEBwcmV2aW91c1ZpZXcpXG5cdFx0XHRcdEBlbWl0KFwiY2hhbmdlOmN1cnJlbnRWaWV3XCIsIEBjdXJyZW50Vmlldylcblx0XHRcdFx0XG5cdFx0XHRcdGlmIGluY29taW5nLmlzQW5pbWF0aW5nXG5cdFx0XHRcdFx0aG9vayA9IGluY29taW5nIFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aG9vayA9IG91dGdvaW5nXG5cdFx0XHRcdGhvb2sub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdFx0XHRAZW1pdChFdmVudHMuVmlld0RpZFN3aXRjaCwgQHByZXZpb3VzVmlldywgQGN1cnJlbnRWaWV3KVxuXHRcdFx0XHRcblxuXHRcdGlmIG9wdGlvbnMuaW5pdGlhbFZpZXdOYW1lP1xuXHRcdFx0YXV0b0luaXRpYWwgPSBfLmZpbmQgRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpLCAobCkgLT4gbC5uYW1lIGlzIG9wdGlvbnMuaW5pdGlhbFZpZXdOYW1lXG5cdFx0XHRpZiBhdXRvSW5pdGlhbD8gdGhlbiBAc3dpdGNoSW5zdGFudCBhdXRvSW5pdGlhbFxuXG5cdFx0aWYgb3B0aW9ucy5pbml0aWFsVmlldz9cblx0XHRcdEBzd2l0Y2hJbnN0YW50IG9wdGlvbnMuaW5pdGlhbFZpZXdcblxuXHRcdGlmIG9wdGlvbnMuYmFja0J1dHRvbk5hbWU/XG5cdFx0XHRiYWNrQnV0dG9ucyA9IF8uZmlsdGVyIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSwgKGwpIC0+IF8uaW5jbHVkZXMgbC5uYW1lLCBvcHRpb25zLmJhY2tCdXR0b25OYW1lXG5cdFx0XHRmb3IgYnRuIGluIGJhY2tCdXR0b25zXG5cdFx0XHRcdGJ0bi5vbkNsaWNrID0+IEBiYWNrKClcblxuXHRAZGVmaW5lIFwicHJldmlvdXNWaWV3XCIsXG5cdFx0XHRnZXQ6IC0+IEBoaXN0b3J5WzBdLnZpZXdcblxuXHRzYXZlQ3VycmVudFZpZXdUb0hpc3Rvcnk6IChuYW1lLG91dGdvaW5nQW5pbWF0aW9uLGluY29taW5nQW5pbWF0aW9uKSAtPlxuXHRcdEBoaXN0b3J5LnVuc2hpZnRcblx0XHRcdHZpZXc6IEBjdXJyZW50Vmlld1xuXHRcdFx0YW5pbWF0aW9uTmFtZTogbmFtZVxuXHRcdFx0aW5jb21pbmdBbmltYXRpb246IGluY29taW5nQW5pbWF0aW9uXG5cdFx0XHRvdXRnb2luZ0FuaW1hdGlvbjogb3V0Z29pbmdBbmltYXRpb25cblxuXHRiYWNrOiAtPlxuXHRcdHByZXZpb3VzID0gQGhpc3RvcnlbMF1cblx0XHRpZiBwcmV2aW91cy52aWV3P1xuXG5cdFx0XHRpZiBfLmluY2x1ZGVzIHByZXZpb3VzLmFuaW1hdGlvbk5hbWUsICdPdXQnXG5cdFx0XHRcdHByZXZpb3VzLnZpZXcuYnJpbmdUb0Zyb250KClcblxuXHRcdFx0YmFja0luID0gcHJldmlvdXMub3V0Z29pbmdBbmltYXRpb24ucmV2ZXJzZSgpXG5cdFx0XHRtb3ZlT3V0ID0gcHJldmlvdXMuaW5jb21pbmdBbmltYXRpb24ucmV2ZXJzZSgpXG5cblx0XHRcdGJhY2tJbi5zdGFydCgpXG5cdFx0XHRtb3ZlT3V0LnN0YXJ0KClcblxuXHRcdFx0QGN1cnJlbnRWaWV3ID0gcHJldmlvdXMudmlld1xuXHRcdFx0QGhpc3Rvcnkuc2hpZnQoKVxuXHRcdFx0bW92ZU91dC5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBAY3VycmVudFZpZXcuYnJpbmdUb0Zyb250KClcbiIsImV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgaU9TU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblxuXHRIRUlHSFQgPSAyMFxuXHRXSURUSCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLndpZHRoXG5cdExJR0hUID0gXCJsaWdodFwiXG5cdERBUksgID0gXCJkYXJrXCJcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zKSAtPlxuXHRcdEBvcHRpb25zID89IHt9XG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwidHJhbnNwYXJlbnRcIlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QC5oZWlnaHQgPSBIRUlHSFRcblx0XHRALndpZHRoICA9IFdJRFRIXG5cblx0XHRyZXR1cm4gaWYgbmF2aWdhdG9yLnN0YW5kYWxvbmVcblx0XHQjIFRoaXMgY29kZSBiZWxvdyBzaG91bGRuJ3QgYmUgdXNlZCBpZiBpbiBzdGFuZGFsb25lIG1vZGUgc2luY2UgaXQgZ2V0cyBpbmNsdWRlZCBhdXRvbWF0aWNhbGx5XG5cblx0XHRAb3B0aW9ucy5zaGFkZSA/PSBMSUdIVFxuXHRcdEBvcHRpb25zLnNoYWRlICA9IExJR0hUIGlmIEBvcHRpb25zLnNoYWRlIGlzbnQgTElHSFQgYW5kIEBvcHRpb25zLnNoYWRlIGlzbnQgREFSS1xuXG5cdFx0aW1nTGVmdCAgID0gXCJtb2R1bGVzL1N0YXR1c0Jhci1hc3NldHMvc3RhdHVzLSN7QG9wdGlvbnMuc2hhZGV9LWxlZnQucG5nXCJcblx0XHRpbWdNaWRkbGUgPSBcIm1vZHVsZXMvU3RhdHVzQmFyLWFzc2V0cy9zdGF0dXMtI3tAb3B0aW9ucy5zaGFkZX0tbWlkZGxlLnBuZ1wiXG5cdFx0aW1nUmlnaHQgID0gXCJtb2R1bGVzL1N0YXR1c0Jhci1hc3NldHMvc3RhdHVzLSN7QG9wdGlvbnMuc2hhZGV9LXJpZ2h0LnBuZ1wiXG5cblx0XHRAc3RhdHVzTGVmdCAgID0gbmV3IExheWVyIHN1cGVyTGF5ZXI6IEAsIGltYWdlOiBpbWdMZWZ0LCAgIHdpZHRoOiAxMzAvMiwgaGVpZ2h0OiBIRUlHSFRcblx0XHRAc3RhdHVzTWlkZGxlID0gbmV3IExheWVyIHN1cGVyTGF5ZXI6IEAsIGltYWdlOiBpbWdNaWRkbGUsIHdpZHRoOiAxMDgvMiwgaGVpZ2h0OiBIRUlHSFQsIHg6IChXSURUSC8yLTEwOC8yKS8yXG5cdFx0QHN0YXR1c1JpZ2h0ICA9IG5ldyBMYXllciBzdXBlckxheWVyOiBALCBpbWFnZTogaW1nUmlnaHQsICB3aWR0aDogMTMwLzIsIGhlaWdodDogSEVJR0hULCB4OiAoV0lEVEgtMTMwKS8yXG4iLCIjIFJpbmcgRGFzaGJvYXJkIGNsYXNzXG4jQ3JlYXRlZCBieSBKb3JkYW4gQmFya2luIC0tIFJpbmcgSW5jLlxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuI2Zhdm9yaXRlIGJ1dHRvbiBjbGFzc1xuXG5cbiNwYXJhbXNcbmNsYXNzIEZhdm9yaXRlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyKG9wdGlvbnMpXG5cdFx0QG9uIEV2ZW50cy5DbGljaywgQGNsaWNrZWRcblxuXHRjbGlja2VkOiAoKSA9PlxuXHRcdGogPSAoKChAcGFyZW50LmlkIC0gMTEpLzUpKS0xXG5cdFx0QHBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQuc2VhcmNoRm9yUHJlc3NlcyhqKVxuY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclxuXHRzbGlkZVRpbWUgPSAuM1xuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHRzdXBlcihvcGFjaXR5OiAxLCB3aWR0aDogMCwgaGVpZ2h0OiAwKVxuXHRcdHNpZGVCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiA1NDBcblx0XHRcdGhlaWdodDogMTMzNFxuXHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvc2lkZWJhciBtYWluLnBuZ1wiXG5cdFx0QHNpZGVCYXIgPSBzaWRlQmFyXG5cdFx0YmFja2dyb3VuZCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHR3aWR0aDogNzUwXG5cdFx0XHRoZWlnaHQ6IDEzMzRcblx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9SaW5nQXBwX0Rhc2hib2FyZC5wbmdcIlxuXHRcdEBiYWNrZ3JvdW5kID0gYmFja2dyb3VuZFxuXHRcdGxpc3QgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR5OiA1MzVcblx0XHRcdHg6IDMzXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR3aWR0aDogNjgyXG5cdFx0XHRoZWlnaHQ6IDc2M1xuXHRcdEBsaXN0ID0gbGlzdFxuXHRcdEBsaXN0LnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXG5cdFx0ZW50cnlQaG90b3MgPSBbXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDAwX0FjY2VwdGVkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDAxX01pc3NlZC5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAwM19Nb3Rpb24ucG5nXCIsXG5cdFx0XHRcdFx0ICBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDRfTWlzc2VkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDA1X01pc3NlZC5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAwNl9BY2NlcHRlZC5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAwN19NaXNzZWQucG5nXCIsXG5cdFx0XHRcdFx0ICBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDhfTWlzc2VkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDA5X0VsbGlwc2UtMS5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAxMF9NaXNzZWQucG5nXCJdXG5cblx0XHRsYXllckxpc3QgPSBbXVxuXHRcdGZvciBlbnRyeSBpbiBlbnRyeVBob3Rvc1xuXHRcdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdFx0aW1hZ2U6IGVudHJ5XG5cdFx0XHRcdHdpZHRoOiA3NDdcblx0XHRcdFx0aGVpZ2h0OiAxMDdcblx0XHRcdGxheWVyTGlzdC5wdXNoIGltYWdlXG5cblx0XHR3aGF0VG9EbyA9IFwib3BlblwiXG5cdFx0cGFyZW50cyA9IFtdXG5cdFx0YnV0dG9ucyA9IFtdXG5cdFx0aWNvbkxpc3QgPSBbXVxuXG5cdFx0Y29uc3RyYWludFdpZHRoID0gNDAwXG5cdFx0Y29uc3RyYWludEhlaWdodCA9IDEwN1xuXHRcdGZvciBqIGluIFswLi5sYXllckxpc3QubGVuZ3RoLTFdXG5cdFx0XHRlbnRyeVBhcmVudCA9IG5ldyBMYXllclxuXHRcdFx0XHRmYXZvcml0ZWQ6IGZhbHNlXG5cdFx0XHRcdHdpZHRoOiA3NDdcblx0XHRcdFx0aWRlbnRpZmllcjogXCIxXCJcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL2JsYW5rLnBuZ1wiXG5cdFx0XHRcdHBhcmVudDogQGxpc3QuY29udGVudFxuXHRcdFx0XHR5OmoqMTA3XG5cdFx0XHRcdGhlaWdodDogMTA3XG5cdFx0XHRwYXJlbnRzLnB1c2ggZW50cnlQYXJlbnRcblx0XHRcdGVudHJ5UGFyZW50LmZhdm9yaXRlZCA9IGZhbHNlXG5cdFx0XHRjb25zdHJhaW50cyA9IG5ldyBMYXllclxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdHBhcmVudDogZW50cnlQYXJlbnRcblx0XHRcdFx0d2lkdGg6IGVudHJ5UGFyZW50LndpZHRoK2NvbnN0cmFpbnRXaWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGNvbnN0cmFpbnRIZWlnaHRcblx0XHRcdFx0eDotY29uc3RyYWludFdpZHRoXG5cdFx0XHRpY29ucyA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IGVudHJ5UGFyZW50XG5cdFx0XHRcdHdpZHRoOiAzNThcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL25ldyB0aHJlZSBpY29ucy5wbmdcIlxuXHRcdFx0XHRoZWlnaHQ6IGNvbnN0cmFpbnRIZWlnaHRcblx0XHRcdFx0eDogMzI0XG5cdFx0XHRpY29ucy5zdGF0ZXMuYWRkXG5cdFx0XHRcdG9uOlxuXHRcdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9uZXcgdGhyZWUgaWNvbnMgb24ucG5nXCJcblx0XHRcdFx0b2ZmOlxuXHRcdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9uZXcgdGhyZWUgaWNvbnMucG5nXCJcblx0XHRcdGljb25MaXN0LnB1c2ggaWNvbnNcblx0XHRcdGZhdm9yaXRlQnV0dG9uID0gbmV3IEZhdm9yaXRlXG5cdFx0XHRcdHN1cGVyTGF5ZXI6IGVudHJ5UGFyZW50XG5cdFx0XHRcdHdpZHRoOiAxMDVcblx0XHRcdFx0aGVpZ2h0OiA5NVxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdHg6IDM3NFxuXHRcdFx0YnV0dG9ucy5wdXNoIGZhdm9yaXRlQnV0dG9uXG5cdFx0XHRsYXllckxpc3Rbal0ucGFyZW50ID0gZW50cnlQYXJlbnRcblxuXHRcdFx0ZmF2b3JpdGVkSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IGxheWVyTGlzdFtqXVxuXHRcdFx0XHR3aWR0aDogNDdcblx0XHRcdFx0aGVpZ2h0OiA0N1xuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9nb2xkZW4gc3Rhci5wbmdcIlxuXHRcdFx0XHR4OiA0NFxuXHRcdFx0XHR5OiAzMFxuXHRcdFx0ZW50cnlQYXJlbnQudHlwZSA9IGVudHJ5UGFyZW50LmNoaWxkcmVuWzNdLmltYWdlLnN1YnN0cmluZygzOCwgZW50cnlQYXJlbnQuY2hpbGRyZW5bM10uaW1hZ2UuaW5kZXhPZihcIi5cIikpXG5cblx0XHRcdGxheWVyTGlzdFtqXS5vblN3aXBlTGVmdCAtPlxuXHRcdFx0XHRsaXN0LnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRcdFx0VXRpbHMuZGVsYXkgc2xpZGVUaW1lLCAtPlxuXHRcdFx0XHRcdGxpc3Quc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0XHRcdGZvciBpIGluIFswLi5sYXllckxpc3QubGVuZ3RoLTFdXG5cdFx0XHRcdFx0bGF5ZXJMaXN0W2ldLmFuaW1hdGVcblx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdHg6IDBcblx0XHRcdFx0XHRcdHRpbWU6IHNsaWRlVGltZVxuXHRcdFx0XHRAYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR4OiAtMSpjb25zdHJhaW50V2lkdGhcblx0XHRcdFx0XHR0aW1lOiBzbGlkZVRpbWVcblxuXHRcdFx0bGF5ZXJMaXN0W2pdLm9uU3dpcGVSaWdodCAtPlxuXHRcdFx0XHRsaXN0LnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRcdFx0VXRpbHMuZGVsYXkgc2xpZGVUaW1lLCAtPlxuXHRcdFx0XHRcdGxpc3Quc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0XHRcdEBhbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHg6IDBcblx0XHRcdFx0XHR0aW1lOiBzbGlkZVRpbWVcblxuXHRcdEBzZWFyY2hGb3JQcmVzc2VzID0gKGwpIC0+XG5cdFx0XHRidXR0b25zW2xdLnBhcmVudC5mYXZvcml0ZWQgPSBub3QgYnV0dG9uc1tsXS5wYXJlbnQuZmF2b3JpdGVkXG5cdFx0XHRpY29uTGlzdFtsXS5zdGF0ZXMubmV4dChcIm9uXCIsXCJvZmZcIilcblx0XHRcdGJ1dHRvbnNbbF0ucGFyZW50LmNoaWxkcmVuWzNdLmNoaWxkcmVuWzBdLm9wYWNpdHkgPSBpZiBidXR0b25zW2xdLnBhcmVudC5mYXZvcml0ZWQgaXMgdHJ1ZSB0aGVuIDEgZWxzZSAwXG5cdFx0XHRsYXllckxpc3RbbF0uYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHg6IDBcblx0XHRcdFx0dGltZTogc2xpZGVUaW1lXG5cbiNkZXZpY2VzXG5cdFx0ZGV2aWNlc01hc2sgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHg6IDdcblx0XHRcdHk6IDE0NVxuXHRcdFx0d2lkdGg6IDc3NFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImVjZWNlY1wiXG5cdFx0XHRoZWlnaHQ6IDMwNVxuXG5cdFx0ZGV2aWNlQ29uc3RyYWludHMgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHk6IDE2M1xuXHRcdFx0eDogLTE2N1xuXHRcdFx0aGVpZ2h0OiAyODdcblx0XHRcdHdpZHRoOiAxMDc1XG5cblx0XHRkZXZpY2VzID0gbmV3IExheWVyXG5cdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvZGV2aWNlIGxpc3QucG5nXCJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHk6IDE1MFxuXHRcdFx0d2lkdGg6IDg5MlxuXHRcdFx0aGVpZ2h0OiAzMTNcblxuXHRcdGRldmljZXMuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0gZGV2aWNlQ29uc3RyYWludHNcblx0XHRkZXZpY2VzLmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdGRldmljZXMuZHJhZ2dhYmxlLnZlcnRpY2FsID0gZmFsc2VcblxuI2ZpbHRlcnNcblx0XHRzaGlmdFRpbWUgPSAuMlxuXG5cblx0XHRwb3NpdGlvbnMgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiA3NTBcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdGhlaWdodDogMTMzNFxuXHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL2FsbF9hY3Rpdml0eS5wbmdcIlxuXHRcdFx0eTogMVxuXG5cdFx0cG9zaXRpb25zLnN0YXRlcy5hZGRcblx0XHRcdGFsbDpcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL2FsbF9hY3Rpdml0eS5wbmdcIlxuXHRcdFx0cmluZ3M6XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9yaW5ncy5wbmdcIlxuXHRcdFx0bW90aW9uOlxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvbW90aW9uLnBuZ1wiXG5cblx0XHRyaW5nRmlsdGVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR4OiAzMTJcblx0XHRcdHk6IDQ2N1xuXHRcdFx0aGVpZ2h0OiA2OFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0bW90aW9uRmlsdGVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR4OiA1MTJcblx0XHRcdHk6IDQ2N1xuXHRcdFx0aGVpZ2h0OiA2OFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0YWxsRmlsdGVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR4OiA2MVxuXHRcdFx0eTogNDY3XG5cdFx0XHRoZWlnaHQ6IDY4XG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR3aWR0aDogMjY0XG5cblx0XHRyaW5nRmlsdGVyLm9uQ2xpY2sgLT5cblx0XHRcdGZpbHRlcmVkUGFyZW50cyA9IHBhcmVudHMuZmlsdGVyICh4KSAtPiB4LnR5cGUgaXMgXCJBY2NlcHRlZFwiIG9yIHgudHlwZSBpcyBcIk1pc3NlZFwiXG5cdFx0XHRyZWRyYXdMaXN0KGZpbHRlcmVkUGFyZW50cywgXCJyaW5nc1wiKVxuXHRcdFx0VXRpbHMuZGVsYXkgLjEsIC0+XG5cdFx0XHRcdHBvc2l0aW9ucy5zdGF0ZXMuc3dpdGNoKFwicmluZ3NcIilcblx0XHRcdGZpbHRlclNsaWRlci5zdGF0ZXMuc3dpdGNoKFwicmluZ3NcIilcblxuXHRcdG1vdGlvbkZpbHRlci5vbkNsaWNrIC0+XG5cdFx0XHRmaWx0ZXJlZFBhcmVudHMgPSBwYXJlbnRzLmZpbHRlciAoeCkgLT4geC50eXBlIGlzIFwiTW90aW9uXCJcblx0XHRcdHJlZHJhd0xpc3QoZmlsdGVyZWRQYXJlbnRzLCBcIm1vdGlvblwiKVxuXHRcdFx0VXRpbHMuZGVsYXkgLjEsIC0+XG5cdFx0XHRcdHBvc2l0aW9ucy5zdGF0ZXMuc3dpdGNoKFwibW90aW9uXCIpXG5cdFx0XHRmaWx0ZXJTbGlkZXIuc3RhdGVzLnN3aXRjaChcIm1vdGlvblwiKVxuXG5cdFx0YWxsRmlsdGVyLm9uQ2xpY2sgLT5cblx0XHRcdGZpbHRlcmVkUGFyZW50cyA9IHBhcmVudHNcblx0XHRcdHJlZHJhd0xpc3QoZmlsdGVyZWRQYXJlbnRzLCBcImFsbFwiKVxuXHRcdFx0VXRpbHMuZGVsYXkgLjEsIC0+XG5cdFx0XHRcdHBvc2l0aW9ucy5zdGF0ZXMuc3dpdGNoKFwiYWxsXCIpXG5cdFx0XHRmaWx0ZXJTbGlkZXIuc3RhdGVzLnN3aXRjaChcImFsbFwiKVxuXG5cdFx0cmVkcmF3TGlzdCA9IChpbnB1dCwgdHlwZSkgLT5cblx0XHRcdGlmIGZpbHRlclNsaWRlci5zdGF0ZXMuY3VycmVudCBpc250IHR5cGVcblx0XHRcdFx0c3RhcnRGcm9tID0gMFxuXHRcdFx0XHRpZiBmaWx0ZXJTbGlkZXIuc3RhdGVzLmN1cnJlbnQgaXMgXCJhbGxcIlxuXHRcdFx0XHRcdHN0YXJ0RnJvbSA9IDc1MFxuXHRcdFx0XHRlbHNlIGlmIGZpbHRlclNsaWRlci5zdGF0ZXMuY3VycmVudCBpcyBcIm1vdGlvblwiXG5cdFx0XHRcdFx0c3RhcnRGcm9tID0gLTc1MFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0c3RhcnRGcm9tID0gaWYgdHlwZSBpcyBcImFsbFwiIHRoZW4gLTc1MCBlbHNlIDc1MFxuXHRcdFx0XHRAbGlzdDIgPSBsaXN0LmNvcHkoKVxuXHRcdFx0XHRAbGlzdDIuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR4OiAtMSpzdGFydEZyb21cblx0XHRcdFx0XHR0aW1lOiBzaGlmdFRpbWVcblx0XHRcdFx0VXRpbHMuZGVsYXkgc2hpZnRUaW1lLCAtPiBAbGlzdDIuZGVzdHJveSgpXG5cdFx0XHRcdGxpc3QueCA9IHN0YXJ0RnJvbVxuXHRcdFx0XHRsaXN0LmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eDogMzNcblx0XHRcdFx0XHR0aW1lOiBzaGlmdFRpbWVcblxuXHRcdFx0XHRmb3IgaSBpbiBsaXN0LmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0XHRpLnZpc2libGUgPSBmYWxzZSBpZiBpbnB1dC5pbmRleE9mKGkpIGlzIC0xXG5cdFx0XHRcdFx0aS52aXNpYmxlID0gdHJ1ZSBpZiBpbnB1dC5pbmRleE9mKGkpIGlzbnQgLTFcblxuXHRcdFx0XHRmb3IgaSBpbiBbMC4uLmlucHV0Lmxlbmd0aF1cblx0XHRcdFx0XHRpbnB1dFtpXS5wYXJlbnQgPSBsaXN0LmNvbnRlbnRcblx0XHRcdFx0XHRpbnB1dFtpXS55ID0gMTA3Kmlcblx0XHRcdFx0bGlzdC5zY3JvbGxUb1BvaW50KFxuXHRcdFx0XHQgICAgeDogMCwgeTogMFxuXHRcdFx0XHQgICAgdHJ1ZVxuXHRcdFx0XHQgICAgdGltZTogLjVcblx0XHRcdClcblx0XHRcdFx0c2l6ZSA9IGlucHV0Lmxlbmd0aCoxMDdcblx0XHRcdFx0bGlzdC5zY3JvbGxWZXJ0aWNhbCA9IGlmIHNpemU8bGlzdC5oZWlnaHQgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRcdFx0bGlzdC51cGRhdGVDb250ZW50KClcblxuXG5cdFx0ZmlsdGVyU2xpZGVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR4OiA3NVxuXHRcdFx0eTogNTI5XG5cdFx0XHR3aWR0aDogMjQ0XG5cdFx0XHRoZWlnaHQ6IDZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIxOTk4ZDVcIlxuXG5cdFx0ZmlsdGVyU2xpZGVyLnN0YXRlcy5hZGRcblx0XHRcdGFsbDpcblx0XHRcdFx0d2lkdGg6IDI0NFxuXHRcdFx0XHR4OiA3NVxuXHRcdFx0cmluZ3M6XG5cdFx0XHRcdHg6IDMzOVxuXHRcdFx0XHR3aWR0aDogMTUxXG5cdFx0XHRtb3Rpb246XG5cdFx0XHRcdHg6IDUwNFxuXHRcdFx0XHR3aWR0aDogMTY1XG5cblx0XHRmaWx0ZXJTbGlkZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogLjRcblxuXG5cblxuXHRcdCNzaWRlYmFyXG5cdFx0c2lkZUJhckljb24gPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAxMjRcblx0XHRcdGhlaWdodDogMTIxXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0QHNpZGVCYXJJY29uID0gc2lkZUJhckljb25cblx0XHRAc2lkZUJhckljb24ub25DbGljayAtPiBkYXNoYm9hcmRTbGlkaW5nKClcblx0XHRkYXNoQm9hcmRDbGlja09mZiA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDIwN1xuXHRcdFx0aGVpZ2h0OiAxMzM0XG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBiYWNrZ3JvdW5kXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdEBkYXNoQm9hcmRDbGlja09mZiA9IGRhc2hCb2FyZENsaWNrT2ZmXG5cdFx0ZGFzaGJvYXJkU2xpZGluZyA9ICgpIC0+XG5cdFx0XHRpZiBiYWNrZ3JvdW5kLnggaXMgMFxuXHRcdFx0XHRiYWNrZ3JvdW5kLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eDogNTQwXG5cdFx0XHRcdFx0dGltZTogLjNcblx0XHRcdFx0ZGFzaEJvYXJkQ2xpY2tPZmYudmlzaWJsZSA9IHRydWVcblx0XHRcdFx0ZGV2aWNlcy5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHg6IDBcblx0XHRcdFx0XHR0aW1lOiAuMVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRiYWNrZ3JvdW5kLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eDogMFxuXHRcdFx0XHRcdHRpbWU6IC4zXG5cdFx0XHRcdGRhc2hCb2FyZENsaWNrT2ZmLnZpc2libGUgPSBmYWxzZVxuXG5cdFx0U2NyZWVuLm9uRWRnZVN3aXBlTGVmdCAtPiBkYXNoYm9hcmRTbGlkaW5nKCkgaWYgYmFja2dyb3VuZC54IGlzIDBcblxuXHRcdEBkYXNoQm9hcmRDbGlja09mZi5vbkNsaWNrIC0+IGRhc2hib2FyZFNsaWRpbmcoKVxuXG5cdFx0c2lkZWJhclNjcm9sbGFibGUgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBzaWRlQmFyXG5cdFx0XHR5OiAxNzZcblx0XHRcdGhlaWdodDogMTE1OFxuXHRcdFx0d2lkdGg6IDU0MFxuXG5cdFx0c2lkZWJhclNjcm9sbGFibGUub25Td2lwZUxlZnQgLT4gZGFzaGJvYXJkU2xpZGluZygpXG5cdFx0c2lkZWJhclNjcm9sbGFibGUuY29udGVudC5pbWFnZSA9XCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvc2Nyb2xsYWJsZV9zaWRlYmFyLnBuZ1wiXG5cblx0XHRzaWRlYmFyU2Nyb2xsYWJsZS5zY3JvbGxIb3Jpem9udGFsID0gZmFsc2VcbiIsImNsYXNzIENpcmN1bGFyUHJvZ3Jlc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3Rvcjoob3B0aW9ucykgLT5cblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QC5zdHJva2VXaWR0aCA9IDNcblx0XHRALmNpcmNsZVNpemUgPSAxMDBcblx0XHRALmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRALmNyZWF0ZUVsZW1lbnQoKVxuXHRjcmVhdGVFbGVtZW50OigpIC0+XG5cdFx0QC5pbm5lckNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0d2lkdGg6IEAuY2lyY2xlU2l6ZVxuXHRcdFx0aGVpZ2h0OiBALmNpcmNsZVNpemVcblx0XHRcdHN1cGVyTGF5ZXI6IEBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdEAub3V0ZXJDaXJjbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBALmNpcmNsZVNpemVcblx0XHRcdGhlaWdodDogQC5jaXJjbGVTaXplXG5cdFx0XHRzdXBlckxheWVyOiBAXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRALmlubmVyQ2lyY2xlLmNlbnRlcigpXG5cdFx0QC5vdXRlckNpcmNsZS5jZW50ZXIoKVxuXHRcdGhlYWRlciA9ICAnPHN2ZyB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMTAwcHhcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIj5cbiAgICA8ZGVmcz48L2RlZnM+J1xuIFx0Zm9vdGVyID0gJzwvc3ZnPidcblx0XHRALmlubmVyQ2lyY2xlLmh0bWwgPSBoZWFkZXIgKyAnPGNpcmNsZSBpZD1cImNcIiBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0OFwiIHN0cm9rZT1cIiMzRjNGM0ZcIiBzdHJva2Utd2lkdGg9XCInICsgQC5zdHJva2VXaWR0aCArICdcIiBmaWxsPVwibm9uZVwiPjwvY2lyY2xlPicgKyBmb290ZXJcblx0XHRALm91dGVyQ2lyY2xlLmh0bWwgPSBoZWFkZXIgKyAnPGNpcmNsZSBpZD1cInByb2dyZXNzLW91dGVyLWNpcmNsZVwiIHRyYW5zZm9ybT1cInJvdGF0ZSgyNzAsNTAsNTApXCIgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDhcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlLXdpZHRoPVwiJyArIEAuc3Ryb2tlV2lkdGggKyAnXCIgZmlsbD1cIm5vbmVcIj48L2NpcmNsZT4nICsgZm9vdGVyXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdHNldDogKHYpIC0+XG5cdFx0XHRzdmdQYXRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLW91dGVyLWNpcmNsZScpXG5cdFx0XHRyID0gKEAud2lkdGggLyAyKVxuXHRcdFx0YyA9IE1hdGguUEkqKHIqMik7XG5cdFx0XHRwY3QgPSAoMSAtIHYpKmM7XG5cdFx0XHRzdmdQYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNcblx0XHRcdHN2Z1BhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBjdFxuXG5jbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOihvcHRpb25zKSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRvcHRpb25zID89IHt9XG5cdFx0QC53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdEAuaGVpZ2h0ID0gIFNjcmVlbi5oZWlnaHRcblx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIlxuXHRcdEAuaW1hZ2VzTG9hZGVkID0gMFxuXHRcdEAub25sb2FkID0gb3B0aW9ucy5vbmxvYWRcblx0XHRALmltYWdlcyA9IFtdXG5cdFx0QC5wcm9ncmVzcyA9IG5ldyBDaXJjdWxhclByb2dyZXNzXG5cdFx0XHR3aWR0aDogMTAwXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0c3VwZXJMYXllcjogQFxuXHRcdEAucHJvZ3Jlc3MuY2VudGVyKClcblx0XHRALnByb2dyZXNzLnZhbHVlID0gMFxuXHRhZGRJbWFnZTooc3JjKSAtPlxuXHRcdEAuaW1hZ2VzLnB1c2goc3JjKVxuXHRhZGRGcmFtZXJJbWFnZXM6KCkgLT5cblx0XHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnNcblx0XHRcdGlmIGxheWVyLmltYWdlXG5cdFx0XHRcdEAuaW1hZ2VzLnB1c2gobGF5ZXIuaW1hZ2UpXG5cdGxvYWQ6KCkgLT5cblx0XHRALmFkZEZyYW1lckltYWdlcygpXG5cdFx0Zm9yIHNyYyBpbiBALmltYWdlc1xuXHRcdFx0aW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdFx0aW1hZ2Uub25sb2FkID0gPT4gQC5pbWFnZURpZExvYWQoKVxuXHRcdFx0aW1hZ2Uub25lcnJvciA9ID0+IEAuaW1hZ2VEaWRMb2FkKClcblx0XHRcdGltYWdlLnNyYyA9IHNyY1xuXHRpbWFnZURpZExvYWQ6KCkgLT5cblx0XHRALmltYWdlc0xvYWRlZCsrXG5cdFx0QC5wcm9ncmVzcy52YWx1ZSA9IEAuaW1hZ2VzTG9hZGVkIC8gQC5pbWFnZXMubGVuZ3RoXG5cdFx0aWYgQC5pbWFnZXNMb2FkZWQgPj0gQC5pbWFnZXMubGVuZ3RoXG5cdFx0XHRALmZpbmlzaGVkTG9hZCgpXG5cdGZpbmlzaGVkTG9hZDooKSAtPlxuXHRcdEAub25sb2FkKCkgaWYgQC5vbmxvYWRcblx0XHRALmRlc3Ryb3koKVxuIiwiXG5GcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uID0gY3VydmU6IFwic3ByaW5nKDMwMCwzMCwwKVwiXG5cbndoaXRlXHQ9IFwiRkZGRkZGXCJcbnNpbHZlclx0PSBcIkVFRUVFRVwiXG5hY3RpdmVcdD0gXCIxNjk4ZDZcIlxudG9nZ2xlU2l6ZSA9IDEwMFxudG9nZ2xlUmFkaXVzID0gdG9nZ2xlU2l6ZSAvIDJcbnRodW1iU2l6ZSA9IHRvZ2dsZVNpemUgLyAxLjc1XG50aHVtYkdyb3cgPSB0aHVtYlNpemUgKiAwLjJcbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy53aWR0aCA9IHRvZ2dsZVNpemVcblx0XHRvcHRpb25zLmhlaWdodCA9IHRodW1iU2l6ZVxuXHRcdG9wdGlvbnMuYm9yZGVyUmFkaXVzID0gdG9nZ2xlUmFkaXVzXG5cdFx0b3B0aW9ucy5zaGFkb3dTcHJlYWQgPSB0b2dnbGVTaXplIC8gNTBcblx0XHRvcHRpb25zLnNoYWRvd0NvbG9yID0gc2lsdmVyXG5cdFx0b3B0aW9ucy5jbGlwID0gZmFsc2Vcblx0XHRzdXBlcihvcHRpb25zKVxuXHRcdEBiYWNrZ3JvdW5kID0gbmV3IFRvZ2dsZUJhY2tncm91bmRcblx0XHRAdGh1bWIgPSBuZXcgVGh1bWJcblx0XHRAc3RhdGVzLmFkZFxuXHRcdFx0b2ZmOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNpbHZlclxuXHRcdFx0XHRzaGFkb3dDb2xvcjogc2lsdmVyXG5cdFx0XHRvbjpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBhY3RpdmVcblx0XHRcdFx0c2hhZG93Q29sb3I6IGFjdGl2ZVxuXHRcdFx0b2ZmVG91Y2g6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc2lsdmVyXG5cdFx0XHRvblRvdWNoOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNpbHZlclxuXHRcdEBzdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHRjb2xvck1vZGVsOiBcInJnYlwiXG5cdFx0XHRjdXJ2ZTogXCJsaW5lYXJcIlxuXHRcdFx0dGltZTogMC4yXG5cdFx0QHN0YXRlcy5zd2l0Y2hJbnN0YW50KFwib2ZmXCIpXG5cdFx0QGFkZFN1YkxheWVyIEBiYWNrZ3JvdW5kXG5cdFx0QGFkZFN1YkxheWVyIEB0aHVtYlxuXHRcdEBvbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdGlmIEB0aHVtYi5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwib2ZmXCJcblx0XHRcdFx0QHRodW1iLnN0YXRlcy5zd2l0Y2goXCJvZmZUb3VjaFwiKVxuXHRcdFx0XHRAc3RhdGVzLnN3aXRjaChcIm9mZlRvdWNoXCIpXG5cdFx0XHRcdEBiYWNrZ3JvdW5kLnN0YXRlcy5zd2l0Y2goXCJvZmZcIilcblx0XHRcdGlmIEB0aHVtYi5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwib25cIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVzLnN3aXRjaChcIm9uVG91Y2hcIilcblx0XHRAb24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0aWYgQHRodW1iLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJvZmZUb3VjaFwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZXMuc3dpdGNoKFwib25cIilcblx0XHRcdFx0QHN0YXRlcy5zd2l0Y2goXCJvblwiKVxuXHRcdFx0aWYgQHRodW1iLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJvblRvdWNoXCJcblx0XHRcdFx0QHRodW1iLnN0YXRlcy5zd2l0Y2goXCJvZmZcIilcblx0XHRcdFx0QHN0YXRlcy5zd2l0Y2goXCJvZmZcIilcblx0XHRcdFx0QGJhY2tncm91bmQuc3RhdGVzLnN3aXRjaChcIm9uXCIpXG5jbGFzcyBUb2dnbGVCYWNrZ3JvdW5kIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy53aWR0aCA9IHRvZ2dsZVNpemVcblx0XHRvcHRpb25zLmhlaWdodCA9IHRodW1iU2l6ZVxuXHRcdG9wdGlvbnMuYm9yZGVyUmFkaXVzID0gdG9nZ2xlUmFkaXVzXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSB3aGl0ZVxuXHRcdHN1cGVyKG9wdGlvbnMpXG5cdFx0QHN0YXRlcy5hZGRcblx0XHRcdG9mZjpcblx0XHRcdFx0c2NhbGU6IDBcblx0XHRcdG9uOlxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdEBzdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHRjb2xvck1vZGVsOiBcInJnYlwiXG5cdFx0XHRjdXJ2ZTogXCJsaW5lYXJcIlxuXHRcdFx0dGltZTogMC4yXG5jbGFzcyBUaHVtYiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMueCA9IDBcblx0XHRvcHRpb25zLnkgPSAwXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPSB0b2dnbGVSYWRpdXNcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IHdoaXRlXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSB0aHVtYlNpemVcblx0XHRvcHRpb25zLnNoYWRvd1kgPSB0b2dnbGVTaXplIC8gNjBcblx0XHRvcHRpb25zLnNoYWRvd0JsdXIgPSB0b2dnbGVTaXplIC8gNDBcblx0XHRvcHRpb25zLnNoYWRvd1NwcmVhZCA9IHRvZ2dsZVNpemUgLyAxMDBcblx0XHRvcHRpb25zLnNoYWRvd0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXHRcdHN1cGVyKG9wdGlvbnMpXG5cdFx0QHN0YXRlcy5hZGRcblx0XHRcdG9mZjpcblx0XHRcdFx0d2lkdGg6IHRodW1iU2l6ZSwgeDogMFxuXHRcdFx0b246XG5cdFx0XHRcdHdpZHRoOiB0aHVtYlNpemUsIHg6IHRvZ2dsZVNpemUgLSB0aHVtYlNpemVcblx0XHRcdG9mZlRvdWNoOlxuXHRcdFx0XHR3aWR0aDogdGh1bWJTaXplICsgdGh1bWJHcm93XG5cdFx0XHRvblRvdWNoOlxuXHRcdFx0XHR3aWR0aDogdGh1bWJTaXplICsgdGh1bWJHcm93XG5cdFx0XHRcdHg6IHRvZ2dsZVNpemUgLSB0aHVtYlNpemUgLSB0aHVtYkdyb3dcblx0XHRAc3RhdGVzLnN3aXRjaEluc3RhbnQoXCJvZmZcIilcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBUUFBO0FEQ0EsSUFBQSw4RkFBQTtFQUFBOzs7QUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQWhCLEdBQTRCO0VBQUEsS0FBQSxFQUFPLGtCQUFQOzs7QUFFNUIsS0FBQSxHQUFROztBQUNSLE1BQUEsR0FBUzs7QUFDVCxNQUFBLEdBQVM7O0FBQ1QsVUFBQSxHQUFhOztBQUNiLFlBQUEsR0FBZSxVQUFBLEdBQWE7O0FBQzVCLFNBQUEsR0FBWSxVQUFBLEdBQWE7O0FBQ3pCLFNBQUEsR0FBWSxTQUFBLEdBQVk7O0FBQ2xCLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsT0FBRDs7TUFBQyxVQUFVOztJQUN2QixPQUFPLENBQUMsS0FBUixHQUFnQjtJQUNoQixPQUFPLENBQUMsTUFBUixHQUFpQjtJQUNqQixPQUFPLENBQUMsWUFBUixHQUF1QjtJQUN2QixPQUFPLENBQUMsWUFBUixHQUF1QixVQUFBLEdBQWE7SUFDcEMsT0FBTyxDQUFDLFdBQVIsR0FBc0I7SUFDdEIsT0FBTyxDQUFDLElBQVIsR0FBZTtJQUNmLHlDQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUk7SUFDbEIsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJO0lBQ2IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQ0M7TUFBQSxHQUFBLEVBQ0M7UUFBQSxlQUFBLEVBQWlCLE1BQWpCO1FBQ0EsV0FBQSxFQUFhLE1BRGI7T0FERDtNQUdBLEVBQUEsRUFDQztRQUFBLGVBQUEsRUFBaUIsTUFBakI7UUFDQSxXQUFBLEVBQWEsTUFEYjtPQUpEO01BTUEsUUFBQSxFQUNDO1FBQUEsZUFBQSxFQUFpQixNQUFqQjtPQVBEO01BUUEsT0FBQSxFQUNDO1FBQUEsZUFBQSxFQUFpQixNQUFqQjtPQVREO0tBREQ7SUFXQSxJQUFDLENBQUEsTUFBTSxDQUFDLGdCQUFSLEdBQ0M7TUFBQSxVQUFBLEVBQVksS0FBWjtNQUNBLEtBQUEsRUFBTyxRQURQO01BRUEsSUFBQSxFQUFNLEdBRk47O0lBR0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxhQUFSLENBQXNCLEtBQXRCO0lBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEsVUFBZDtJQUNBLElBQUMsQ0FBQSxXQUFELENBQWEsSUFBQyxDQUFBLEtBQWQ7SUFDQSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxVQUFYLEVBQXVCLFNBQUE7TUFDdEIsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBdEIsS0FBOEIsS0FBakM7UUFDQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQWIsQ0FBcUIsVUFBckI7UUFDQSxJQUFDLENBQUEsTUFBTSxFQUFDLE1BQUQsRUFBUCxDQUFlLFVBQWY7UUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQWxCLENBQTBCLEtBQTFCLEVBSEQ7O01BSUEsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBdEIsS0FBOEIsSUFBakM7ZUFDQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQWIsQ0FBcUIsU0FBckIsRUFERDs7SUFMc0IsQ0FBdkI7SUFPQSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxRQUFYLEVBQXFCLFNBQUE7TUFDcEIsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBdEIsS0FBOEIsVUFBakM7UUFDQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQWIsQ0FBcUIsSUFBckI7UUFDQSxJQUFDLENBQUEsTUFBTSxFQUFDLE1BQUQsRUFBUCxDQUFlLElBQWYsRUFGRDs7TUFHQSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF0QixLQUE4QixTQUFqQztRQUNDLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxFQUFDLE1BQUQsRUFBYixDQUFxQixLQUFyQjtRQUNBLElBQUMsQ0FBQSxNQUFNLEVBQUMsTUFBRCxFQUFQLENBQWUsS0FBZjtlQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxFQUFDLE1BQUQsRUFBbEIsQ0FBMEIsSUFBMUIsRUFIRDs7SUFKb0IsQ0FBckI7RUFuQ1k7Ozs7R0FEZTs7QUE0Q3ZCOzs7RUFDUSwwQkFBQyxPQUFEOztNQUFDLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCO0lBQ2hCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCO0lBQ2pCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCO0lBQ3ZCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCO0lBQzFCLGtEQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FDQztNQUFBLEdBQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxDQUFQO09BREQ7TUFFQSxFQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sQ0FBUDtPQUhEO0tBREQ7SUFLQSxJQUFDLENBQUEsTUFBTSxDQUFDLGdCQUFSLEdBQ0M7TUFBQSxVQUFBLEVBQVksS0FBWjtNQUNBLEtBQUEsRUFBTyxRQURQO01BRUEsSUFBQSxFQUFNLEdBRk47O0VBWlc7Ozs7R0FEaUI7O0FBZ0J6Qjs7O0VBQ1EsZUFBQyxPQUFEOztNQUFDLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxDQUFSLEdBQVk7SUFDWixPQUFPLENBQUMsQ0FBUixHQUFZO0lBQ1osT0FBTyxDQUFDLFlBQVIsR0FBdUI7SUFDdkIsT0FBTyxDQUFDLGVBQVIsR0FBMEI7SUFDMUIsT0FBTyxDQUFDLE1BQVIsR0FBaUI7SUFDakIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsVUFBQSxHQUFhO0lBQy9CLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFVBQUEsR0FBYTtJQUNsQyxPQUFPLENBQUMsWUFBUixHQUF1QixVQUFBLEdBQWE7SUFDcEMsT0FBTyxDQUFDLFdBQVIsR0FBc0I7SUFDdEIsdUNBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUNDO01BQUEsR0FBQSxFQUNDO1FBQUEsS0FBQSxFQUFPLFNBQVA7UUFBa0IsQ0FBQSxFQUFHLENBQXJCO09BREQ7TUFFQSxFQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sU0FBUDtRQUFrQixDQUFBLEVBQUcsVUFBQSxHQUFhLFNBQWxDO09BSEQ7TUFJQSxRQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sU0FBQSxHQUFZLFNBQW5CO09BTEQ7TUFNQSxPQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sU0FBQSxHQUFZLFNBQW5CO1FBQ0EsQ0FBQSxFQUFHLFVBQUEsR0FBYSxTQUFiLEdBQXlCLFNBRDVCO09BUEQ7S0FERDtJQVVBLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixLQUF0QjtFQXJCWTs7OztHQURNOzs7O0FEdEVwQixJQUFBLGdCQUFBO0VBQUE7OztBQUFNOzs7RUFDTywwQkFBQyxPQUFEO0lBQ1gsa0RBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQyxXQUFGLEdBQWdCO0lBQ2hCLElBQUMsQ0FBQyxVQUFGLEdBQWU7SUFDZixJQUFDLENBQUMsZUFBRixHQUFvQjtJQUNwQixJQUFDLENBQUMsYUFBRixDQUFBO0VBTFc7OzZCQU1aLGFBQUEsR0FBYyxTQUFBO0FBQ2IsUUFBQTtJQUFBLElBQUMsQ0FBQyxXQUFGLEdBQW9CLElBQUEsS0FBQSxDQUNuQjtNQUFBLENBQUEsRUFBRyxDQUFIO01BQ0EsQ0FBQSxFQUFHLENBREg7TUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFDLFVBRlQ7TUFHQSxNQUFBLEVBQVEsSUFBQyxDQUFDLFVBSFY7TUFJQSxVQUFBLEVBQVksSUFKWjtNQUtBLGVBQUEsRUFBaUIsSUFMakI7S0FEbUI7SUFPcEIsSUFBQyxDQUFDLFdBQUYsR0FBb0IsSUFBQSxLQUFBLENBQ25CO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFDQSxDQUFBLEVBQUcsQ0FESDtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUMsVUFGVDtNQUdBLE1BQUEsRUFBUSxJQUFDLENBQUMsVUFIVjtNQUlBLFVBQUEsRUFBWSxJQUpaO01BS0EsZUFBQSxFQUFpQixJQUxqQjtLQURtQjtJQU9wQixJQUFDLENBQUMsV0FBVyxDQUFDLE1BQWQsQ0FBQTtJQUNBLElBQUMsQ0FBQyxXQUFXLENBQUMsTUFBZCxDQUFBO0lBQ0EsTUFBQSxHQUFVO0lBRVYsTUFBQSxHQUFTO0lBQ1QsSUFBQyxDQUFDLFdBQVcsQ0FBQyxJQUFkLEdBQXFCLE1BQUEsR0FBUyx1RUFBVCxHQUFtRixJQUFDLENBQUMsV0FBckYsR0FBbUcseUJBQW5HLEdBQStIO1dBQ3BKLElBQUMsQ0FBQyxXQUFXLENBQUMsSUFBZCxHQUFxQixNQUFBLEdBQVMsc0hBQVQsR0FBa0ksSUFBQyxDQUFDLFdBQXBJLEdBQWtKLHlCQUFsSixHQUE4SztFQXJCdEw7O0VBc0JkLGdCQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLENBQUQ7QUFDSixVQUFBO01BQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLHVCQUF4QjtNQUNWLENBQUEsR0FBSyxJQUFDLENBQUMsS0FBRixHQUFVO01BQ2YsQ0FBQSxHQUFJLElBQUksQ0FBQyxFQUFMLEdBQVEsQ0FBQyxDQUFBLEdBQUUsQ0FBSDtNQUNaLEdBQUEsR0FBTSxDQUFDLENBQUEsR0FBSSxDQUFMLENBQUEsR0FBUTtNQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZCxHQUFnQzthQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFkLEdBQWlDO0lBTjdCLENBQUw7R0FERDs7OztHQTdCOEI7O0FBc0N6QixNQUFNLENBQUM7OztFQUNBLGlCQUFDLE9BQUQ7SUFDWCx5Q0FBTSxPQUFOOztNQUNBLFVBQVc7O0lBQ1gsSUFBQyxDQUFDLEtBQUYsR0FBVSxNQUFNLENBQUM7SUFDakIsSUFBQyxDQUFDLE1BQUYsR0FBWSxNQUFNLENBQUM7SUFDbkIsSUFBQyxDQUFDLGVBQUYsR0FBb0I7SUFDcEIsSUFBQyxDQUFDLFlBQUYsR0FBaUI7SUFDakIsSUFBQyxDQUFDLE1BQUYsR0FBVyxPQUFPLENBQUM7SUFDbkIsSUFBQyxDQUFDLE1BQUYsR0FBVztJQUNYLElBQUMsQ0FBQyxRQUFGLEdBQWlCLElBQUEsZ0JBQUEsQ0FDaEI7TUFBQSxLQUFBLEVBQU8sR0FBUDtNQUNBLE1BQUEsRUFBUSxHQURSO01BRUEsVUFBQSxFQUFZLElBRlo7S0FEZ0I7SUFJakIsSUFBQyxDQUFDLFFBQVEsQ0FBQyxNQUFYLENBQUE7SUFDQSxJQUFDLENBQUMsUUFBUSxDQUFDLEtBQVgsR0FBbUI7RUFkUjs7b0JBZVosUUFBQSxHQUFTLFNBQUMsR0FBRDtXQUNSLElBQUMsQ0FBQyxNQUFNLENBQUMsSUFBVCxDQUFjLEdBQWQ7RUFEUTs7b0JBRVQsZUFBQSxHQUFnQixTQUFBO0FBQ2YsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQUssQ0FBQyxLQUFUO3FCQUNDLElBQUMsQ0FBQyxNQUFNLENBQUMsSUFBVCxDQUFjLEtBQUssQ0FBQyxLQUFwQixHQUREO09BQUEsTUFBQTs2QkFBQTs7QUFERDs7RUFEZTs7b0JBSWhCLElBQUEsR0FBSyxTQUFBO0FBQ0osUUFBQTtJQUFBLElBQUMsQ0FBQyxlQUFGLENBQUE7QUFDQTtBQUFBO1NBQUEscUNBQUE7O01BQ0MsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFBO01BQ1osS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQUcsS0FBQyxDQUFDLFlBQUYsQ0FBQTtRQUFIO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtNQUNmLEtBQUssQ0FBQyxPQUFOLEdBQWdCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUMsWUFBRixDQUFBO1FBQUg7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO21CQUNoQixLQUFLLENBQUMsR0FBTixHQUFZO0FBSmI7O0VBRkk7O29CQU9MLFlBQUEsR0FBYSxTQUFBO0lBQ1osSUFBQyxDQUFDLFlBQUY7SUFDQSxJQUFDLENBQUMsUUFBUSxDQUFDLEtBQVgsR0FBbUIsSUFBQyxDQUFDLFlBQUYsR0FBaUIsSUFBQyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxJQUFHLElBQUMsQ0FBQyxZQUFGLElBQWtCLElBQUMsQ0FBQyxNQUFNLENBQUMsTUFBOUI7YUFDQyxJQUFDLENBQUMsWUFBRixDQUFBLEVBREQ7O0VBSFk7O29CQUtiLFlBQUEsR0FBYSxTQUFBO0lBQ1osSUFBYyxJQUFDLENBQUMsTUFBaEI7TUFBQSxJQUFDLENBQUMsTUFBRixDQUFBLEVBQUE7O1dBQ0EsSUFBQyxDQUFDLE9BQUYsQ0FBQTtFQUZZOzs7O0dBbENlOzs7O0FEbkM3QixJQUFBLFFBQUE7RUFBQTs7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBS007OztFQUNRLGtCQUFDLE9BQUQ7O0lBQ1osMENBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEtBQVgsRUFBa0IsSUFBQyxDQUFBLE9BQW5CO0VBRlk7O3FCQUliLE9BQUEsR0FBUyxTQUFBO0FBQ1IsUUFBQTtJQUFBLENBQUEsR0FBSyxDQUFDLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxFQUFSLEdBQWEsRUFBZCxDQUFBLEdBQWtCLENBQW5CLENBQUQsR0FBd0I7V0FDNUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQXBDLENBQXFELENBQXJEO0VBRlE7Ozs7R0FMYTs7QUFRakIsTUFBTSxDQUFDO0FBQ1osTUFBQTs7OztFQUFBLFNBQUEsR0FBWTs7RUFDQyxpQkFBQTtBQUNaLFFBQUE7SUFBQSx5Q0FBTTtNQUFBLE9BQUEsRUFBUyxDQUFUO01BQVksS0FBQSxFQUFPLENBQW5CO01BQXNCLE1BQUEsRUFBUSxDQUE5QjtLQUFOO0lBQ0EsT0FBQSxHQUFjLElBQUEsS0FBQSxDQUNiO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxJQUZSO01BR0EsS0FBQSxFQUFPLDJDQUhQO0tBRGE7SUFLZCxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsVUFBQSxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLEtBQUEsRUFBTyxHQURQO01BRUEsTUFBQSxFQUFRLElBRlI7TUFHQSxLQUFBLEVBQU8sZ0RBSFA7S0FEZ0I7SUFLakIsSUFBQyxDQUFBLFVBQUQsR0FBYztJQUNkLElBQUEsR0FBVyxJQUFBLGVBQUEsQ0FDVjtNQUFBLENBQUEsRUFBRyxHQUFIO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFFQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFVBRlQ7TUFHQSxLQUFBLEVBQU8sR0FIUDtNQUlBLE1BQUEsRUFBUSxHQUpSO0tBRFU7SUFNWCxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLElBQUksQ0FBQyxnQkFBTixHQUF5QjtJQUV6QixXQUFBLEdBQWMsQ0FBQyxvREFBRCxFQUNULGtEQURTLEVBRVQsa0RBRlMsRUFHVCxrREFIUyxFQUlULGtEQUpTLEVBS1Qsb0RBTFMsRUFNVCxrREFOUyxFQU9ULGtEQVBTLEVBUVQscURBUlMsRUFTVCxrREFUUztJQVdkLFNBQUEsR0FBWTtBQUNaLFNBQUEsNkNBQUE7O01BQ0MsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO1FBQUEsS0FBQSxFQUFPLEtBQVA7UUFDQSxLQUFBLEVBQU8sR0FEUDtRQUVBLE1BQUEsRUFBUSxHQUZSO09BRFc7TUFJWixTQUFTLENBQUMsSUFBVixDQUFlLEtBQWY7QUFMRDtJQU9BLFFBQUEsR0FBVztJQUNYLE9BQUEsR0FBVTtJQUNWLE9BQUEsR0FBVTtJQUNWLFFBQUEsR0FBVztJQUVYLGVBQUEsR0FBa0I7SUFDbEIsZ0JBQUEsR0FBbUI7QUFDbkIsU0FBUywrRkFBVDtNQUNDLFdBQUEsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO1FBQUEsU0FBQSxFQUFXLEtBQVg7UUFDQSxLQUFBLEVBQU8sR0FEUDtRQUVBLFVBQUEsRUFBWSxHQUZaO1FBR0EsS0FBQSxFQUFPLG9DQUhQO1FBSUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FKZDtRQUtBLENBQUEsRUFBRSxDQUFBLEdBQUUsR0FMSjtRQU1BLE1BQUEsRUFBUSxHQU5SO09BRGlCO01BUWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsV0FBYjtNQUNBLFdBQVcsQ0FBQyxTQUFaLEdBQXdCO01BQ3hCLFdBQUEsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO1FBQUEsT0FBQSxFQUFTLENBQVQ7UUFDQSxNQUFBLEVBQVEsV0FEUjtRQUVBLEtBQUEsRUFBTyxXQUFXLENBQUMsS0FBWixHQUFrQixlQUZ6QjtRQUdBLE1BQUEsRUFBUSxnQkFIUjtRQUlBLENBQUEsRUFBRSxDQUFDLGVBSkg7T0FEaUI7TUFNbEIsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO1FBQUEsTUFBQSxFQUFRLFdBQVI7UUFDQSxLQUFBLEVBQU8sR0FEUDtRQUVBLEtBQUEsRUFBTyw4Q0FGUDtRQUdBLE1BQUEsRUFBUSxnQkFIUjtRQUlBLENBQUEsRUFBRyxHQUpIO09BRFc7TUFNWixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQWIsQ0FDQztRQUFBLEVBQUEsRUFDQztVQUFBLEtBQUEsRUFBTyxpREFBUDtTQUREO1FBRUEsR0FBQSxFQUNDO1VBQUEsS0FBQSxFQUFPLDhDQUFQO1NBSEQ7T0FERDtNQUtBLFFBQVEsQ0FBQyxJQUFULENBQWMsS0FBZDtNQUNBLGNBQUEsR0FBcUIsSUFBQSxRQUFBLENBQ3BCO1FBQUEsVUFBQSxFQUFZLFdBQVo7UUFDQSxLQUFBLEVBQU8sR0FEUDtRQUVBLE1BQUEsRUFBUSxFQUZSO1FBR0EsT0FBQSxFQUFTLENBSFQ7UUFJQSxDQUFBLEVBQUcsR0FKSDtPQURvQjtNQU1yQixPQUFPLENBQUMsSUFBUixDQUFhLGNBQWI7TUFDQSxTQUFVLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBYixHQUFzQjtNQUV0QixhQUFBLEdBQW9CLElBQUEsS0FBQSxDQUNuQjtRQUFBLE1BQUEsRUFBUSxTQUFVLENBQUEsQ0FBQSxDQUFsQjtRQUNBLEtBQUEsRUFBTyxFQURQO1FBRUEsTUFBQSxFQUFRLEVBRlI7UUFHQSxPQUFBLEVBQVMsQ0FIVDtRQUlBLEtBQUEsRUFBTywwQ0FKUDtRQUtBLENBQUEsRUFBRyxFQUxIO1FBTUEsQ0FBQSxFQUFHLEVBTkg7T0FEbUI7TUFRcEIsV0FBVyxDQUFDLElBQVosR0FBbUIsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFLLENBQUMsU0FBOUIsQ0FBd0MsRUFBeEMsRUFBNEMsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFLLENBQUMsT0FBOUIsQ0FBc0MsR0FBdEMsQ0FBNUM7TUFFbkIsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQWIsQ0FBeUIsU0FBQTtBQUN4QixZQUFBO1FBQUEsSUFBSSxDQUFDLGNBQUwsR0FBc0I7UUFDdEIsS0FBSyxDQUFDLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLFNBQUE7aUJBQ3RCLElBQUksQ0FBQyxjQUFMLEdBQXNCO1FBREEsQ0FBdkI7QUFFQSxhQUFTLG9HQUFUO1VBQ0MsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWIsQ0FDQztZQUFBLFVBQUEsRUFDQztjQUFBLENBQUEsRUFBRyxDQUFIO2FBREQ7WUFFQSxJQUFBLEVBQU0sU0FGTjtXQUREO0FBREQ7ZUFLQSxJQUFDLENBQUEsT0FBRCxDQUNDO1VBQUEsVUFBQSxFQUNDO1lBQUEsQ0FBQSxFQUFHLENBQUMsQ0FBRCxHQUFHLGVBQU47V0FERDtVQUVBLElBQUEsRUFBTSxTQUZOO1NBREQ7TUFUd0IsQ0FBekI7TUFjQSxTQUFVLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBYixDQUEwQixTQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFMLEdBQXNCO1FBQ3RCLEtBQUssQ0FBQyxLQUFOLENBQVksU0FBWixFQUF1QixTQUFBO2lCQUN0QixJQUFJLENBQUMsY0FBTCxHQUFzQjtRQURBLENBQXZCO2VBRUEsSUFBQyxDQUFBLE9BQUQsQ0FDQztVQUFBLFVBQUEsRUFDQztZQUFBLENBQUEsRUFBRyxDQUFIO1dBREQ7VUFFQSxJQUFBLEVBQU0sU0FGTjtTQUREO01BSnlCLENBQTFCO0FBOUREO0lBdUVBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixTQUFDLENBQUQ7TUFDbkIsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxTQUFsQixHQUE4QixDQUFJLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUM7TUFDcEQsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUFuQixDQUF3QixJQUF4QixFQUE2QixLQUE3QjtNQUNBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUExQyxHQUF1RCxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBTSxDQUFDLFNBQWxCLEtBQStCLElBQWxDLEdBQTRDLENBQTVDLEdBQW1EO2FBQ3ZHLFNBQVUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFiLENBQ0M7UUFBQSxVQUFBLEVBQ0M7VUFBQSxDQUFBLEVBQUcsQ0FBSDtTQUREO1FBRUEsSUFBQSxFQUFNLFNBRk47T0FERDtJQUptQjtJQVVwQixXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUNqQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFBVDtNQUNBLENBQUEsRUFBRyxDQURIO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxLQUFBLEVBQU8sR0FIUDtNQUlBLGVBQUEsRUFBaUIsUUFKakI7TUFLQSxNQUFBLEVBQVEsR0FMUjtLQURpQjtJQVFsQixpQkFBQSxHQUF3QixJQUFBLEtBQUEsQ0FDdkI7TUFBQSxPQUFBLEVBQVMsQ0FBVDtNQUNBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFEVDtNQUVBLENBQUEsRUFBRyxHQUZIO01BR0EsQ0FBQSxFQUFHLENBQUMsR0FISjtNQUlBLE1BQUEsRUFBUSxHQUpSO01BS0EsS0FBQSxFQUFPLElBTFA7S0FEdUI7SUFReEIsT0FBQSxHQUFjLElBQUEsS0FBQSxDQUNiO01BQUEsS0FBQSxFQUFPLDBDQUFQO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQURUO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxLQUFBLEVBQU8sR0FIUDtNQUlBLE1BQUEsRUFBUSxHQUpSO0tBRGE7SUFPZCxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQWxCLEdBQWdDO0lBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBbEIsR0FBNEI7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFsQixHQUE2QjtJQUc3QixTQUFBLEdBQVk7SUFHWixTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNmO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFVBRFQ7TUFFQSxNQUFBLEVBQVEsSUFGUjtNQUdBLEtBQUEsRUFBTywyQ0FIUDtNQUlBLENBQUEsRUFBRyxDQUpIO0tBRGU7SUFPaEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFqQixDQUNDO01BQUEsR0FBQSxFQUNDO1FBQUEsS0FBQSxFQUFPLDJDQUFQO09BREQ7TUFFQSxLQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sb0NBQVA7T0FIRDtNQUlBLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxxQ0FBUDtPQUxEO0tBREQ7SUFRQSxVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFBVDtNQUNBLENBQUEsRUFBRyxHQURIO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxNQUFBLEVBQVEsRUFIUjtNQUlBLE9BQUEsRUFBUyxDQUpUO0tBRGdCO0lBT2pCLFlBQUEsR0FBbUIsSUFBQSxLQUFBLENBQ2xCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQ0EsQ0FBQSxFQUFHLEdBREg7TUFFQSxDQUFBLEVBQUcsR0FGSDtNQUdBLE1BQUEsRUFBUSxFQUhSO01BSUEsT0FBQSxFQUFTLENBSlQ7S0FEa0I7SUFPbkIsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFBVDtNQUNBLENBQUEsRUFBRyxFQURIO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxNQUFBLEVBQVEsRUFIUjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BS0EsS0FBQSxFQUFPLEdBTFA7S0FEZTtJQVFoQixVQUFVLENBQUMsT0FBWCxDQUFtQixTQUFBO0FBQ2xCLFVBQUE7TUFBQSxlQUFBLEdBQWtCLE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLElBQUYsS0FBVSxVQUFWLElBQXdCLENBQUMsQ0FBQyxJQUFGLEtBQVU7TUFBekMsQ0FBZjtNQUNsQixVQUFBLENBQVcsZUFBWCxFQUE0QixPQUE1QjtNQUNBLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixTQUFBO2VBQ2YsU0FBUyxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQWhCLENBQXdCLE9BQXhCO01BRGUsQ0FBaEI7YUFFQSxZQUFZLENBQUMsTUFBTSxFQUFDLE1BQUQsRUFBbkIsQ0FBMkIsT0FBM0I7SUFMa0IsQ0FBbkI7SUFPQSxZQUFZLENBQUMsT0FBYixDQUFxQixTQUFBO0FBQ3BCLFVBQUE7TUFBQSxlQUFBLEdBQWtCLE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLElBQUYsS0FBVTtNQUFqQixDQUFmO01BQ2xCLFVBQUEsQ0FBVyxlQUFYLEVBQTRCLFFBQTVCO01BQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLFNBQUE7ZUFDZixTQUFTLENBQUMsTUFBTSxFQUFDLE1BQUQsRUFBaEIsQ0FBd0IsUUFBeEI7TUFEZSxDQUFoQjthQUVBLFlBQVksQ0FBQyxNQUFNLEVBQUMsTUFBRCxFQUFuQixDQUEyQixRQUEzQjtJQUxvQixDQUFyQjtJQU9BLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFNBQUE7QUFDakIsVUFBQTtNQUFBLGVBQUEsR0FBa0I7TUFDbEIsVUFBQSxDQUFXLGVBQVgsRUFBNEIsS0FBNUI7TUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLEVBQVosRUFBZ0IsU0FBQTtlQUNmLFNBQVMsQ0FBQyxNQUFNLEVBQUMsTUFBRCxFQUFoQixDQUF3QixLQUF4QjtNQURlLENBQWhCO2FBRUEsWUFBWSxDQUFDLE1BQU0sRUFBQyxNQUFELEVBQW5CLENBQTJCLEtBQTNCO0lBTGlCLENBQWxCO0lBT0EsVUFBQSxHQUFhLFNBQUMsS0FBRCxFQUFRLElBQVI7QUFDWixVQUFBO01BQUEsSUFBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQXBCLEtBQWlDLElBQXBDO1FBQ0MsU0FBQSxHQUFZO1FBQ1osSUFBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQXBCLEtBQStCLEtBQWxDO1VBQ0MsU0FBQSxHQUFZLElBRGI7U0FBQSxNQUVLLElBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFwQixLQUErQixRQUFsQztVQUNKLFNBQUEsR0FBWSxDQUFDLElBRFQ7U0FBQSxNQUFBO1VBR0osU0FBQSxHQUFlLElBQUEsS0FBUSxLQUFYLEdBQXNCLENBQUMsR0FBdkIsR0FBZ0MsSUFIeEM7O1FBSUwsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsSUFBTCxDQUFBO1FBQ1QsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQ0M7VUFBQSxVQUFBLEVBQ0M7WUFBQSxDQUFBLEVBQUcsQ0FBQyxDQUFELEdBQUcsU0FBTjtXQUREO1VBRUEsSUFBQSxFQUFNLFNBRk47U0FERDtRQUlBLEtBQUssQ0FBQyxLQUFOLENBQVksU0FBWixFQUF1QixTQUFBO2lCQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBO1FBQUgsQ0FBdkI7UUFDQSxJQUFJLENBQUMsQ0FBTCxHQUFTO1FBQ1QsSUFBSSxDQUFDLE9BQUwsQ0FDQztVQUFBLFVBQUEsRUFDQztZQUFBLENBQUEsRUFBRyxFQUFIO1dBREQ7VUFFQSxJQUFBLEVBQU0sU0FGTjtTQUREO0FBS0E7QUFBQSxhQUFBLHdDQUFBOztVQUNDLElBQXFCLEtBQUssQ0FBQyxPQUFOLENBQWMsQ0FBZCxDQUFBLEtBQW9CLENBQUMsQ0FBMUM7WUFBQSxDQUFDLENBQUMsT0FBRixHQUFZLE1BQVo7O1VBQ0EsSUFBb0IsS0FBSyxDQUFDLE9BQU4sQ0FBYyxDQUFkLENBQUEsS0FBc0IsQ0FBQyxDQUEzQztZQUFBLENBQUMsQ0FBQyxPQUFGLEdBQVksS0FBWjs7QUFGRDtBQUlBLGFBQVMsMEZBQVQ7VUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBVCxHQUFrQixJQUFJLENBQUM7VUFDdkIsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLENBQVQsR0FBYSxHQUFBLEdBQUk7QUFGbEI7UUFHQSxJQUFJLENBQUMsYUFBTCxDQUNJO1VBQUEsQ0FBQSxFQUFHLENBQUg7VUFBTSxDQUFBLEVBQUcsQ0FBVDtTQURKLEVBRUksSUFGSixFQUdJO1VBQUEsSUFBQSxFQUFNLEVBQU47U0FISjtRQUtBLElBQUEsR0FBTyxLQUFLLENBQUMsTUFBTixHQUFhO1FBQ3BCLElBQUksQ0FBQyxjQUFMLEdBQXlCLElBQUEsR0FBSyxJQUFJLENBQUMsTUFBYixHQUF5QixLQUF6QixHQUFvQztlQUMxRCxJQUFJLENBQUMsYUFBTCxDQUFBLEVBbENEOztJQURZO0lBc0NiLFlBQUEsR0FBbUIsSUFBQSxLQUFBLENBQ2xCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFFQSxDQUFBLEVBQUcsR0FGSDtNQUdBLEtBQUEsRUFBTyxHQUhQO01BSUEsTUFBQSxFQUFRLENBSlI7TUFLQSxlQUFBLEVBQWlCLFFBTGpCO0tBRGtCO0lBUW5CLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBcEIsQ0FDQztNQUFBLEdBQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxHQUFQO1FBQ0EsQ0FBQSxFQUFHLEVBREg7T0FERDtNQUdBLEtBQUEsRUFDQztRQUFBLENBQUEsRUFBRyxHQUFIO1FBQ0EsS0FBQSxFQUFPLEdBRFA7T0FKRDtNQU1BLE1BQUEsRUFDQztRQUFBLENBQUEsRUFBRyxHQUFIO1FBQ0EsS0FBQSxFQUFPLEdBRFA7T0FQRDtLQUREO0lBV0EsWUFBWSxDQUFDLE1BQU0sQ0FBQyxnQkFBcEIsR0FDQztNQUFBLElBQUEsRUFBTSxFQUFOOztJQU1ELFdBQUEsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFDQSxNQUFBLEVBQVEsR0FEUjtNQUVBLE9BQUEsRUFBUyxDQUZUO01BR0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUhUO0tBRGlCO0lBS2xCLElBQUMsQ0FBQSxXQUFELEdBQWU7SUFDZixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBcUIsU0FBQTthQUFHLGdCQUFBLENBQUE7SUFBSCxDQUFyQjtJQUNBLGlCQUFBLEdBQXdCLElBQUEsS0FBQSxDQUN2QjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxPQUFBLEVBQVMsQ0FGVDtNQUdBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFIVDtNQUlBLE9BQUEsRUFBUyxLQUpUO0tBRHVCO0lBTXhCLElBQUMsQ0FBQSxpQkFBRCxHQUFxQjtJQUNyQixnQkFBQSxHQUFtQixTQUFBO01BQ2xCLElBQUcsVUFBVSxDQUFDLENBQVgsS0FBZ0IsQ0FBbkI7UUFDQyxVQUFVLENBQUMsT0FBWCxDQUNDO1VBQUEsVUFBQSxFQUNDO1lBQUEsQ0FBQSxFQUFHLEdBQUg7V0FERDtVQUVBLElBQUEsRUFBTSxFQUZOO1NBREQ7UUFJQSxpQkFBaUIsQ0FBQyxPQUFsQixHQUE0QjtlQUM1QixPQUFPLENBQUMsT0FBUixDQUNDO1VBQUEsVUFBQSxFQUNDO1lBQUEsQ0FBQSxFQUFHLENBQUg7V0FERDtVQUVBLElBQUEsRUFBTSxFQUZOO1NBREQsRUFORDtPQUFBLE1BQUE7UUFXQyxVQUFVLENBQUMsT0FBWCxDQUNDO1VBQUEsVUFBQSxFQUNDO1lBQUEsQ0FBQSxFQUFHLENBQUg7V0FERDtVQUVBLElBQUEsRUFBTSxFQUZOO1NBREQ7ZUFJQSxpQkFBaUIsQ0FBQyxPQUFsQixHQUE0QixNQWY3Qjs7SUFEa0I7SUFrQm5CLE1BQU0sQ0FBQyxlQUFQLENBQXVCLFNBQUE7TUFBRyxJQUFzQixVQUFVLENBQUMsQ0FBWCxLQUFnQixDQUF0QztlQUFBLGdCQUFBLENBQUEsRUFBQTs7SUFBSCxDQUF2QjtJQUVBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxPQUFuQixDQUEyQixTQUFBO2FBQUcsZ0JBQUEsQ0FBQTtJQUFILENBQTNCO0lBRUEsaUJBQUEsR0FBd0IsSUFBQSxlQUFBLENBQ3ZCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQUFUO01BQ0EsQ0FBQSxFQUFHLEdBREg7TUFFQSxNQUFBLEVBQVEsSUFGUjtNQUdBLEtBQUEsRUFBTyxHQUhQO0tBRHVCO0lBTXhCLGlCQUFpQixDQUFDLFdBQWxCLENBQThCLFNBQUE7YUFBRyxnQkFBQSxDQUFBO0lBQUgsQ0FBOUI7SUFDQSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBMUIsR0FBaUM7SUFFakMsaUJBQWlCLENBQUMsZ0JBQWxCLEdBQXFDO0VBeFV6Qjs7OztHQUZlOzs7O0FEaEI3QixJQUFBLFlBQUE7RUFBQTs7O0FBQUEsT0FBTyxDQUFDLFNBQVIsR0FBMEI7QUFFekIsTUFBQTs7OztFQUFBLE1BQUEsR0FBUzs7RUFDVCxLQUFBLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0VBQzdCLEtBQUEsR0FBUTs7RUFDUixJQUFBLEdBQVE7O0VBRUssc0JBQUMsT0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsVUFBRDs7TUFDYixJQUFDLENBQUEsVUFBVzs7O1VBQ0osQ0FBQyxrQkFBbUI7O0lBQzVCLDhDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFDLE1BQUYsR0FBVztJQUNYLElBQUMsQ0FBQyxLQUFGLEdBQVc7SUFFWCxJQUFVLFNBQVMsQ0FBQyxVQUFwQjtBQUFBLGFBQUE7OztXQUdRLENBQUMsUUFBUzs7SUFDbEIsSUFBMkIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEtBQW9CLEtBQXBCLElBQThCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxLQUFvQixJQUE3RTtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFrQixNQUFsQjs7SUFFQSxPQUFBLEdBQVksa0NBQUEsR0FBbUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUE1QyxHQUFrRDtJQUM5RCxTQUFBLEdBQVksa0NBQUEsR0FBbUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUE1QyxHQUFrRDtJQUM5RCxRQUFBLEdBQVksa0NBQUEsR0FBbUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUE1QyxHQUFrRDtJQUU5RCxJQUFDLENBQUEsVUFBRCxHQUFvQixJQUFBLEtBQUEsQ0FBTTtNQUFBLFVBQUEsRUFBWSxJQUFaO01BQWUsS0FBQSxFQUFPLE9BQXRCO01BQWlDLEtBQUEsRUFBTyxHQUFBLEdBQUksQ0FBNUM7TUFBK0MsTUFBQSxFQUFRLE1BQXZEO0tBQU47SUFDcEIsSUFBQyxDQUFBLFlBQUQsR0FBb0IsSUFBQSxLQUFBLENBQU07TUFBQSxVQUFBLEVBQVksSUFBWjtNQUFlLEtBQUEsRUFBTyxTQUF0QjtNQUFpQyxLQUFBLEVBQU8sR0FBQSxHQUFJLENBQTVDO01BQStDLE1BQUEsRUFBUSxNQUF2RDtNQUErRCxDQUFBLEVBQUcsQ0FBQyxLQUFBLEdBQU0sQ0FBTixHQUFRLEdBQUEsR0FBSSxDQUFiLENBQUEsR0FBZ0IsQ0FBbEY7S0FBTjtJQUNwQixJQUFDLENBQUEsV0FBRCxHQUFvQixJQUFBLEtBQUEsQ0FBTTtNQUFBLFVBQUEsRUFBWSxJQUFaO01BQWUsS0FBQSxFQUFPLFFBQXRCO01BQWlDLEtBQUEsRUFBTyxHQUFBLEdBQUksQ0FBNUM7TUFBK0MsTUFBQSxFQUFRLE1BQXZEO01BQStELENBQUEsRUFBRyxDQUFDLEtBQUEsR0FBTSxHQUFQLENBQUEsR0FBWSxDQUE5RTtLQUFOO0VBbkJSOzs7O0dBUGlDOzs7O0FEQS9DLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBRUMsaUJBQUMsT0FBRDtBQUNaLFFBQUE7O01BRGEsVUFBUTs7O01BQ3JCLE9BQU8sQ0FBQyxRQUFTLE1BQU0sQ0FBQzs7O01BQ3hCLE9BQU8sQ0FBQyxTQUFVLE1BQU0sQ0FBQzs7O01BQ3pCLE9BQU8sQ0FBQyxPQUFROzs7TUFDaEIsT0FBTyxDQUFDLGtCQUFtQjs7O01BQzNCLE9BQU8sQ0FBQyxpQkFBa0I7OztNQUMxQixPQUFPLENBQUMsbUJBQW9CO1FBQUUsS0FBQSxFQUFPLGdDQUFUO1FBQTJDLElBQUEsRUFBTSxFQUFqRDs7OztNQUM1QixPQUFPLENBQUMsa0JBQW1COzs7TUFDM0IsT0FBTyxDQUFDLFNBQVU7OztNQUNsQixPQUFPLENBQUMsV0FBWTs7SUFFcEIseUNBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFFWCxJQUFDLENBQUEsUUFBRCxDQUFVLFdBQVYsRUFBdUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFVBQUQ7QUFDdEIsWUFBQTtRQUFBLElBQUEsR0FBTyxVQUFVLENBQUMsS0FBTSxDQUFBLENBQUE7UUFDeEIsSUFBRyxZQUFIO1VBRUMsSUFBSSxDQUFDLElBQUwsR0FBWTtVQUNaLElBQUksQ0FBQyxFQUFMLENBQVEsTUFBTSxDQUFDLEtBQWYsRUFBc0IsU0FBQSxHQUFBLENBQXRCO1VBRUEsSUFBRyxLQUFDLENBQUEsTUFBSjtZQUNDLFFBQUEsR0FBVyxJQUFJLENBQUM7WUFDaEIsZUFBQSxHQUFzQixJQUFBLGVBQUEsQ0FDckI7Y0FBQSxJQUFBLEVBQU0saUJBQU47Y0FDQSxLQUFBLEVBQU8sS0FBQyxDQUFBLEtBRFI7Y0FFQSxNQUFBLEVBQVEsS0FBQyxDQUFBLE1BRlQ7Y0FHQSxNQUFBLEVBQVEsSUFIUjthQURxQjtZQUt0QixlQUFlLENBQUMsT0FBTyxDQUFDLGVBQXhCLEdBQTBDO1lBQzFDLElBQUcsSUFBSSxDQUFDLEtBQUwsSUFBYyxLQUFDLENBQUEsS0FBbEI7Y0FDQyxlQUFlLENBQUMsZ0JBQWhCLEdBQW1DLE1BRHBDOztZQUVBLElBQUcsSUFBSSxDQUFDLE1BQUwsSUFBZSxLQUFDLENBQUEsTUFBbkI7Y0FDQyxlQUFlLENBQUMsY0FBaEIsR0FBaUMsTUFEbEM7O0FBRUEsaUJBQUEsMENBQUE7O2NBQ0MsQ0FBQyxDQUFDLE1BQUYsR0FBVyxlQUFlLENBQUM7QUFENUI7WUFFQSxJQUFJLENBQUMsZUFBTCxHQUF1QjttQkFFdkIsSUFBSSxDQUFDLElBQUwsR0FBWTtjQUFDLEtBQUEsRUFBTyxLQUFDLENBQUEsS0FBVDtjQUFnQixNQUFBLEVBQVEsS0FBQyxDQUFBLE1BQXpCO2NBaEJiO1dBTEQ7O01BRnNCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtJQXlCQSxXQUFBLEdBQ0M7TUFBQSxhQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQ0M7VUFBQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsQ0FBSjtZQUFPLENBQUEsRUFBRyxDQUFWO1dBQUo7U0FERDtPQUREO01BR0EsTUFBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNO1lBQUMsT0FBQSxFQUFTLENBQVY7V0FBTjtVQUNBLEVBQUEsRUFBSTtZQUFDLE9BQUEsRUFBUyxDQUFWO1dBREo7U0FERDtPQUpEO01BT0EsTUFBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNO1lBQUMsS0FBQSxFQUFPLEdBQVI7WUFBYSxPQUFBLEVBQVMsQ0FBdEI7V0FBTjtVQUNBLEVBQUEsRUFBSTtZQUFDLEtBQUEsRUFBTyxDQUFSO1lBQVcsT0FBQSxFQUFTLENBQXBCO1dBREo7U0FERDtPQVJEO01BV0EsT0FBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsS0FBQSxFQUFPLEdBQVI7WUFBYSxPQUFBLEVBQVMsQ0FBdEI7V0FBSjtTQUREO09BWkQ7TUFjQSxTQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQ0M7VUFBQSxJQUFBLEVBQU07WUFBQyxDQUFBLEVBQUcsSUFBQyxDQUFBLE1BQUw7V0FBTjtVQUNBLEVBQUEsRUFBSTtZQUFDLENBQUEsRUFBRyxDQUFKO1dBREo7U0FERDtPQWZEO01Ba0JBLFlBQUEsRUFDQztRQUFBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBTTtZQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsS0FBTDtXQUFOO1VBQ0EsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLENBQUo7V0FESjtTQUREO09BbkJEO01Bc0JBLFdBQUEsRUFDQztRQUFBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBTTtZQUFDLElBQUEsRUFBTSxDQUFQO1dBQU47VUFDQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsQ0FBSjtXQURKO1NBREQ7T0F2QkQ7TUEwQkEsV0FBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsSUFBQSxFQUFNLENBQVA7V0FBSjtTQUREO1FBRUEsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNO1lBQUMsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFMO1dBQU47VUFDQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsQ0FBSjtXQURKO1NBSEQ7T0EzQkQ7TUFnQ0EsVUFBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFMO1dBQUo7U0FERDtRQUVBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBTTtZQUFDLElBQUEsRUFBTSxDQUFQO1dBQU47VUFDQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsQ0FBSjtXQURKO1NBSEQ7T0FqQ0Q7TUFzQ0EsV0FBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNO1lBQUMsSUFBQSxFQUFNLENBQVA7V0FBTjtVQUNBLEVBQUEsRUFBSTtZQUFDLElBQUEsRUFBTSxJQUFDLENBQUEsS0FBUjtXQURKO1NBREQ7T0F2Q0Q7TUEwQ0EsV0FBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLENBQUMsQ0FBQyxJQUFDLENBQUEsS0FBRCxHQUFPLENBQVIsQ0FBTDtZQUFpQixVQUFBLEVBQVksRUFBN0I7V0FBSjtTQUREO1FBRUEsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNO1lBQUMsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFMO1dBQU47VUFDQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsQ0FBSjtXQURKO1NBSEQ7T0EzQ0Q7TUFnREEsVUFBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFELEdBQU8sQ0FBWDtZQUFjLFVBQUEsRUFBWSxFQUExQjtXQUFKO1NBREQ7UUFFQSxPQUFBLEVBQ0M7VUFBQSxJQUFBLEVBQU07WUFBQyxDQUFBLEVBQUcsQ0FBQyxJQUFDLENBQUEsS0FBTjtXQUFOO1VBQ0EsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLENBQUo7V0FESjtTQUhEO09BakREO01Bc0RBLFlBQUEsRUFDQztRQUFBLE9BQUEsRUFDQztVQUFBLEVBQUEsRUFBSTtZQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsS0FBTDtXQUFKO1NBREQ7UUFFQSxPQUFBLEVBQ0M7VUFBQSxJQUFBLEVBQU07WUFBQyxDQUFBLEVBQUcsQ0FBQyxDQUFDLElBQUMsQ0FBQSxLQUFELEdBQU8sQ0FBUixDQUFMO1lBQWlCLFVBQUEsRUFBWSxFQUE3QjtXQUFOO1VBQ0EsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLENBQUo7WUFBTyxVQUFBLEVBQVksR0FBbkI7V0FESjtTQUhEO09BdkREO01BNERBLFdBQUEsRUFDQztRQUFBLE9BQUEsRUFDQztVQUFBLEVBQUEsRUFBSTtZQUFDLElBQUEsRUFBTSxDQUFQO1dBQUo7U0FERDtRQUVBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBTTtZQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsS0FBRCxHQUFPLENBQVg7WUFBYyxVQUFBLEVBQVksRUFBMUI7V0FBTjtVQUNBLEVBQUEsRUFBSTtZQUFDLENBQUEsRUFBRyxDQUFKO1lBQU8sVUFBQSxFQUFZLEdBQW5CO1dBREo7U0FIRDtPQTdERDtNQWtFQSxVQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQ0M7VUFBQSxFQUFBLEVBQUk7WUFBQyxJQUFBLEVBQU0sQ0FBUDtXQUFKO1NBREQ7T0FuRUQ7TUFxRUEsYUFBQSxFQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsRUFBQSxFQUFJO1lBQUMsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFMO1dBQUo7U0FERDtPQXRFRDtNQXdFQSxZQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQ0M7VUFBQSxFQUFBLEVBQUk7WUFBQyxDQUFBLEVBQUcsSUFBQyxDQUFBLE1BQUw7V0FBSjtTQUREO09BekVEO01BMkVBLFlBQUEsRUFDQztRQUFBLE9BQUEsRUFDQztVQUFBLEVBQUEsRUFBSTtZQUFDLElBQUEsRUFBTSxDQUFQO1dBQUo7U0FERDtPQTVFRDs7SUFnRkQsV0FBVyxDQUFDLE9BQVosR0FBc0IsV0FBVyxDQUFDO0lBQ2xDLFdBQVcsQ0FBQyxRQUFaLEdBQXVCLFdBQVcsQ0FBQztJQUNuQyxXQUFXLENBQUMsTUFBWixHQUFxQixXQUFXLENBQUM7SUFDakMsV0FBVyxDQUFDLE9BQVosR0FBc0IsV0FBVyxDQUFDO0lBR2xDLE1BQU0sQ0FBQyxjQUFQLEdBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxhQUFQLEdBQXVCO0lBQ3ZCLEtBQUssQ0FBQSxTQUFFLENBQUEsZ0JBQVAsR0FBMEIsU0FBQyxFQUFEO2FBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsY0FBWCxFQUEyQixFQUEzQjtJQUFSO0lBQzFCLEtBQUssQ0FBQSxTQUFFLENBQUEsZUFBUCxHQUF5QixTQUFDLEVBQUQ7YUFBUSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxhQUFYLEVBQTBCLEVBQTFCO0lBQVI7SUFFekIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxTQUFELEVBQVksSUFBWjtBQUVuQixZQUFBO1FBQUEsSUFBRyxPQUFPLENBQUMsUUFBWDtVQUNDLE1BQUEsR0FBUyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQXRCLENBQUE7QUFDVCxlQUFBLHdDQUFBOztZQUNDLElBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxHQUFHLENBQUMsSUFBZixFQUFxQixJQUFyQixDQUFIO2NBQ0MsY0FBQSxHQUFpQjtjQUNqQixHQUFHLENBQUMsT0FBSixDQUFZLFNBQUE7QUFDWCxvQkFBQTtnQkFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksR0FBWixDQUFpQixDQUFBLENBQUE7Z0JBQ3hCLFFBQUEsR0FBVyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFBLEdBQUssR0FBbkIsRUFBdUIsRUFBdkI7Z0JBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLEVBQXpCO3VCQUNYLGNBQWUsQ0FBQSxJQUFBLENBQWYsQ0FBcUIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFQLEVBQWUsU0FBQyxDQUFEO3lCQUFPLENBQUMsQ0FBQyxJQUFGLEtBQVU7Z0JBQWpCLENBQWYsQ0FBckI7Y0FKVyxDQUFaLEVBRkQ7O0FBREQsV0FGRDs7ZUFXQSxLQUFFLENBQUEsSUFBQSxDQUFGLEdBQVUsU0FBQyxPQUFELEVBQVUsZ0JBQVY7QUFFVCxjQUFBOztZQUZtQixtQkFBbUIsS0FBQyxDQUFBOztVQUV2QyxJQUFVLE9BQUEsS0FBVyxLQUFDLENBQUEsV0FBdEI7QUFBQSxtQkFBQTs7VUFLQSxPQUFPLENBQUMsTUFBUixHQUFpQjtVQUNqQixPQUFPLENBQUMsVUFBUixDQUFBO1VBR0EsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7WUFBQyxDQUFBLEVBQUUsQ0FBSDtZQUFNLENBQUEsRUFBRyxDQUFUOztVQUNoQixPQUFPLENBQUMsT0FBUixHQUFrQjtVQUNsQixPQUFPLENBQUMsS0FBUixHQUFnQjtVQUNoQixPQUFPLENBQUMsVUFBUixHQUFxQjs7ZUFHVCxDQUFFLEtBQWQsR0FBc0I7Y0FBQyxDQUFBLEVBQUcsQ0FBSjtjQUFPLENBQUEsRUFBRyxDQUFWOzs7O2dCQUNWLENBQUUsS0FBZCw0Q0FBdUMsQ0FBRTs7VUFDekMsT0FBQSxHQUFVLENBQUMsQ0FBQyxNQUFGLENBQVM7WUFBQyxVQUFBLDJDQUE2QixDQUFFLFdBQWhDO1dBQVQsRUFBOEMsZ0JBQTlDO1VBQ1YsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQW9CO1lBQUUsVUFBQSxFQUFZLEVBQWQ7V0FBcEI7VUFDQSxRQUFBLDRDQUF1QixDQUFFLE9BQWQsQ0FBc0IsT0FBdEI7VUFHWCxPQUFPLENBQUMsS0FBUiw0Q0FBaUMsQ0FBRTtVQUNuQyxRQUFBLEdBQVcsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLE1BQUYsQ0FBUztZQUFDLFVBQUEsMkNBQTZCLENBQUUsV0FBaEM7V0FBVCxFQUE4QyxnQkFBOUMsQ0FBaEI7VUFHWCxJQUFHLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBWCxFQUFpQixLQUFqQixDQUFIO1lBQ0MsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBQyxDQUFBLFdBQXJCO1lBQ0EsUUFBUSxDQUFDLEVBQVQsQ0FBWSxNQUFNLENBQUMsWUFBbkIsRUFBaUMsU0FBQTtxQkFBRyxLQUFDLENBQUEsV0FBVyxDQUFDLFlBQWIsQ0FBQTtZQUFILENBQWpDLEVBRkQ7V0FBQSxNQUFBO1lBSUMsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBQyxDQUFBLFdBQXJCLEVBSkQ7O1VBTUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsY0FBYixFQUE2QixLQUFDLENBQUEsV0FBOUIsRUFBMkMsT0FBM0M7VUFJQSxLQUFDLENBQUEsd0JBQUQsQ0FBMEIsSUFBMUIsRUFBZ0MsUUFBaEMsRUFBMEMsUUFBMUM7VUFDQSxLQUFDLENBQUEsV0FBRCxHQUFlO1VBQ2YsS0FBQyxDQUFBLElBQUQsQ0FBTSxxQkFBTixFQUE2QixLQUFDLENBQUEsWUFBOUI7VUFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLG9CQUFOLEVBQTRCLEtBQUMsQ0FBQSxXQUE3QjtVQUVBLElBQUcsUUFBUSxDQUFDLFdBQVo7WUFDQyxJQUFBLEdBQU8sU0FEUjtXQUFBLE1BQUE7WUFHQyxJQUFBLEdBQU8sU0FIUjs7aUJBSUEsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsWUFBZixFQUE2QixTQUFBO21CQUM1QixLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxhQUFiLEVBQTRCLEtBQUMsQ0FBQSxZQUE3QixFQUEyQyxLQUFDLENBQUEsV0FBNUM7VUFENEIsQ0FBN0I7UUEvQ1M7TUFiUztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7SUFnRUEsSUFBRywrQkFBSDtNQUNDLFdBQUEsR0FBYyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBdEIsQ0FBQSxDQUFQLEVBQTBDLFNBQUMsQ0FBRDtlQUFPLENBQUMsQ0FBQyxJQUFGLEtBQVUsT0FBTyxDQUFDO01BQXpCLENBQTFDO01BQ2QsSUFBRyxtQkFBSDtRQUFxQixJQUFDLENBQUEsYUFBRCxDQUFlLFdBQWYsRUFBckI7T0FGRDs7SUFJQSxJQUFHLDJCQUFIO01BQ0MsSUFBQyxDQUFBLGFBQUQsQ0FBZSxPQUFPLENBQUMsV0FBdkIsRUFERDs7SUFHQSxJQUFHLDhCQUFIO01BQ0MsV0FBQSxHQUFjLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0QixDQUFBLENBQVQsRUFBNEMsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFDLENBQUMsSUFBYixFQUFtQixPQUFPLENBQUMsY0FBM0I7TUFBUCxDQUE1QztBQUNkLFdBQUEsNkNBQUE7O1FBQ0MsR0FBRyxDQUFDLE9BQUosQ0FBWSxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUFHLEtBQUMsQ0FBQSxJQUFELENBQUE7VUFBSDtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWjtBQURELE9BRkQ7O0VBMU1ZOztFQStNYixPQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQztJQUFmLENBQUw7R0FERjs7b0JBR0Esd0JBQUEsR0FBMEIsU0FBQyxJQUFELEVBQU0saUJBQU4sRUFBd0IsaUJBQXhCO1dBQ3pCLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUNDO01BQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxXQUFQO01BQ0EsYUFBQSxFQUFlLElBRGY7TUFFQSxpQkFBQSxFQUFtQixpQkFGbkI7TUFHQSxpQkFBQSxFQUFtQixpQkFIbkI7S0FERDtFQUR5Qjs7b0JBTzFCLElBQUEsR0FBTSxTQUFBO0FBQ0wsUUFBQTtJQUFBLFFBQUEsR0FBVyxJQUFDLENBQUEsT0FBUSxDQUFBLENBQUE7SUFDcEIsSUFBRyxxQkFBSDtNQUVDLElBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxRQUFRLENBQUMsYUFBcEIsRUFBbUMsS0FBbkMsQ0FBSDtRQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBZCxDQUFBLEVBREQ7O01BR0EsTUFBQSxHQUFTLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxPQUEzQixDQUFBO01BQ1QsT0FBQSxHQUFVLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxPQUEzQixDQUFBO01BRVYsTUFBTSxDQUFDLEtBQVAsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxLQUFSLENBQUE7TUFFQSxJQUFDLENBQUEsV0FBRCxHQUFlLFFBQVEsQ0FBQztNQUN4QixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsQ0FBQTthQUNBLE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBTSxDQUFDLFlBQWxCLEVBQWdDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUEsV0FBVyxDQUFDLFlBQWIsQ0FBQTtRQUFIO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxFQWJEOztFQUZLOzs7O0dBM05zQjs7OztBREE3QixJQUFBLHdCQUFBO0VBQUE7OztBQUFBLE9BQU8sQ0FBQyxhQUFSLEdBQTRCLElBQUEsS0FBQSxDQUMzQjtFQUFBLENBQUEsRUFBRSxDQUFGO0VBQUssQ0FBQSxFQUFFLE1BQU0sQ0FBQyxNQUFkO0VBQXNCLEtBQUEsRUFBTSxNQUFNLENBQUMsS0FBbkM7RUFBMEMsTUFBQSxFQUFPLEdBQWpEO0VBQ0EsSUFBQSxFQUFLLHdEQURMO0NBRDJCOztBQUs1QixXQUFBLEdBQWMsTUFBTSxDQUFDLEtBQVAsR0FBZTs7QUFDN0IsV0FBQSxHQUFjLFdBQUEsR0FBYzs7QUFFNUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUF0QixHQUNDO0VBQUEsS0FBQSxFQUNDO0lBQUEsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFdBQW5CO0dBREQ7OztBQUdELE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGdCQUE3QixHQUNDO0VBQUEsS0FBQSxFQUFPLG1CQUFQOzs7QUFFSyxPQUFPLENBQUM7OztFQUNiLEtBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDO0lBQVYsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFDSixDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBaEIsRUFBdUIsS0FBdkI7SUFESSxDQURMO0dBREQ7O0VBS0EsS0FBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7SUFBVixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxHQUFlO0lBRFgsQ0FETDtHQUREOztFQUthLGVBQUMsT0FBRDs7TUFBQyxVQUFVOzs7TUFDdkIsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsUUFBUyxNQUFNLENBQUM7OztNQUN4QixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxTQUFVOzs7TUFDbEIsT0FBTyxDQUFDLGtCQUFzQixPQUFPLENBQUMsS0FBWCxHQUFzQix1QkFBdEIsR0FBbUQ7OztNQUM5RSxPQUFPLENBQUMsV0FBWTs7O01BQ3BCLE9BQU8sQ0FBQyxhQUFjOzs7TUFDdEIsT0FBTyxDQUFDLFVBQVc7OztNQUNuQixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxjQUFlOzs7TUFDdkIsT0FBTyxDQUFDLGtCQUFzQixLQUFLLENBQUMsUUFBTixDQUFBLENBQUgsR0FBeUIsS0FBekIsR0FBb0M7OztNQUMvRCxPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxXQUFZOzs7TUFDcEIsT0FBTyxDQUFDLGNBQWU7OztNQUN2QixPQUFPLENBQUMsZUFBZ0I7OztNQUN4QixPQUFPLENBQUMsaUJBQWtCOzs7TUFDMUIsT0FBTyxDQUFDLGFBQWM7OztNQUN0QixPQUFPLENBQUMsWUFBYTs7SUFFckIsdUNBQU0sT0FBTjtJQUVBLElBQWdELGdDQUFoRDtNQUFBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixPQUFPLENBQUMsaUJBQTVCOztJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7SUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsR0FBWSxRQUFBLEdBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRixDQUFBLENBQUQ7SUFDcEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBYixHQUF1Qiw0QkFBQSxHQUE2QixPQUFPLENBQUMsUUFBckMsR0FBOEMsbUJBQTlDLEdBQWlFLE9BQU8sQ0FBQyxVQUF6RSxHQUFvRixlQUFwRixHQUFtRyxPQUFPLENBQUMsT0FBM0csR0FBbUgsYUFBbkgsR0FBZ0ksT0FBTyxDQUFDLEtBQXhJLEdBQThJLGNBQTlJLEdBQTRKLE9BQU8sQ0FBQyxNQUFwSyxHQUEySywwRUFBM0ssR0FBcVAsT0FBTyxDQUFDLGVBQTdQLEdBQTZRO0lBQ3BTLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxHQUFlLE9BQU8sQ0FBQztJQUN2QixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsR0FBYyxPQUFPLENBQUM7SUFDdEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQztJQUM3QixJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsYUFBcEIsRUFBbUMsT0FBTyxDQUFDLFdBQTNDO0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLGNBQXBCLEVBQW9DLE9BQU8sQ0FBQyxZQUE1QztJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixnQkFBcEIsRUFBc0MsT0FBTyxDQUFDLGNBQTlDO0lBQ0EsSUFBRyxPQUFPLENBQUMsU0FBUixLQUFxQixJQUF4QjtNQUNDLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixXQUFwQixFQUFpQyxJQUFqQyxFQUREOztJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixZQUFwQixFQUFrQyxPQUFPLENBQUMsVUFBMUM7SUFDQSxJQUFDLENBQUEsSUFBRCxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCO0lBRVIsSUFBRyxPQUFPLENBQUMsUUFBWDtNQUNDLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlO01BQ2YsSUFBQyxDQUFBLElBQUksQ0FBQyxnQkFBTixDQUF1QixRQUF2QixFQUFpQyxTQUFDLEtBQUQ7ZUFDaEMsS0FBSyxDQUFDLGNBQU4sQ0FBQTtNQURnQyxDQUFqQyxFQUZEOztJQUtBLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixJQUFDLENBQUEsS0FBbkI7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLFdBQVYsQ0FBc0IsSUFBQyxDQUFBLElBQXZCO0lBRUEsSUFBQyxDQUFBLGVBQUQsR0FBbUI7SUFDbkIsSUFBb0QsSUFBQyxDQUFBLGdCQUFyRDtNQUFBLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixPQUFPLENBQUMsZ0JBQWhDLEVBQUE7O0lBSUEsSUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBRCxJQUFxQixPQUFPLENBQUMsZUFBUixLQUEyQixJQUFuRDtNQUNDLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsU0FBQTtRQUNoQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQXRCLENBQUE7ZUFDQSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQXRCLENBQUE7TUFGZ0MsQ0FBakM7TUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFNBQUE7ZUFDL0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUF0QixDQUE4QixTQUE5QjtNQUQrQixDQUFoQyxFQUpEOztFQWxEWTs7a0JBeURiLHNCQUFBLEdBQXdCLFNBQUMsS0FBRDtBQUN2QixRQUFBO0lBQUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CO0lBQ3BCLElBQUcsc0JBQUg7TUFDQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBQyxDQUFBLFNBQTNCLEVBREQ7O0lBRUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QjtJQUNiLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxHQUFrQjtJQUNsQixHQUFBLEdBQU0sR0FBQSxHQUFJLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBWCxHQUFjLHVDQUFkLEdBQXFELElBQUMsQ0FBQSxnQkFBdEQsR0FBdUU7SUFDN0UsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLFFBQVEsQ0FBQyxjQUFULENBQXdCLEdBQXhCLENBQXZCO1dBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLElBQUMsQ0FBQSxTQUEzQjtFQVJ1Qjs7a0JBVXhCLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUE7RUFETTs7a0JBR1AsT0FBQSxHQUFTLFNBQUMsRUFBRDtXQUNSLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsU0FBQTthQUNoQyxFQUFFLENBQUMsS0FBSCxDQUFTLElBQVQ7SUFEZ0MsQ0FBakM7RUFEUTs7a0JBSVQsTUFBQSxHQUFRLFNBQUMsRUFBRDtXQUNQLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsU0FBQTthQUMvQixFQUFFLENBQUMsS0FBSCxDQUFTLElBQVQ7SUFEK0IsQ0FBaEM7RUFETzs7OztHQXJGbUI7Ozs7QURYNUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDs7Ozs7QURUbEI7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOzs7QUFqQkEsSUFBQTs7QUFxQkEsU0FBQSxHQUFZOztBQUVaLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBaEIsR0FDRTtFQUFBLEtBQUEsRUFBTyxjQUFQO0VBQ0EsSUFBQSxFQUFNLEdBRE47OztBQUdGLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBaEIsR0FDRTtFQUFBLEtBQUEsRUFBTyxrQkFBUDs7OztBQUlGOzs7Ozs7Ozs7OztBQVVBLFNBQVMsQ0FBQyxVQUFWLEdBQXVCLFNBQUMsRUFBRDtBQUNyQixNQUFBO0FBQUE7T0FBQSwwQkFBQTtJQUNFLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFBTyxDQUFBLFNBQUE7a0JBQ3ZCLEVBQUEsQ0FBRyxNQUFIO0FBRkY7O0FBRHFCOzs7QUFNdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLFNBQVMsQ0FBQyxVQUFWLEdBQXVCLFNBQUMsTUFBRDtBQUVyQixNQUFBO0VBQUEsSUFBNEMsQ0FBSSxNQUFoRDtJQUFBLEtBQUEsR0FBUSxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQTlCOztFQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO1NBRWhCLFNBQVMsQ0FBQyxVQUFWLENBQXFCLFNBQUMsS0FBRDtBQUNuQixRQUFBO0lBQUEsa0JBQUEsR0FBcUIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFYLENBQW1CLHFCQUFuQixFQUEwQyxFQUExQyxDQUE2QyxDQUFDLElBQTlDLENBQUEsQ0FBb0QsQ0FBQyxPQUFyRCxDQUE2RCxLQUE3RCxFQUFvRSxHQUFwRTtJQUNyQixNQUFPLENBQUEsa0JBQUEsQ0FBUCxHQUE2QjtJQUM3QixTQUFTLENBQUMsaUJBQVYsQ0FBNEIsS0FBNUI7V0FDQSxTQUFTLENBQUMscUJBQVYsQ0FBZ0MsS0FBaEM7RUFKbUIsQ0FBckI7QUFOcUI7OztBQWF2Qjs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLEtBQUssQ0FBQSxTQUFFLENBQUEsUUFBUCxHQUFrQixTQUFDLE1BQUQsRUFBUyxTQUFUO0FBRWhCLE1BQUE7O0lBRnlCLFlBQVk7O0FBRXJDO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxJQUFtQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBQSxDQUEyQixDQUFDLE9BQTVCLENBQW9DLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBcEMsQ0FBQSxLQUErRCxDQUFDLENBQW5GO0FBQUEsYUFBTyxTQUFQOztBQURGO0VBSUEsSUFBRyxTQUFIO0FBQ0U7QUFBQSxTQUFBLHdDQUFBOztNQUNFLElBQStDLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLEVBQTBCLFNBQTFCLENBQS9DO0FBQUEsZUFBTyxRQUFRLENBQUMsUUFBVCxDQUFrQixNQUFsQixFQUEwQixTQUExQixFQUFQOztBQURGLEtBREY7O0FBTmdCOztBQVdsQixLQUFLLENBQUEsU0FBRSxDQUFBLFdBQVAsR0FBcUIsU0FBQyxNQUFELEVBQVMsU0FBVDtBQUNuQixNQUFBOztJQUQ0QixZQUFZOztFQUN4QyxPQUFBLEdBQVU7RUFFVixJQUFHLFNBQUg7QUFDRTtBQUFBLFNBQUEscUNBQUE7O01BQ0UsT0FBQSxHQUFVLE9BQU8sQ0FBQyxNQUFSLENBQWUsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkIsU0FBN0IsQ0FBZjtBQURaO0lBRUEsSUFBa0IsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQUEsQ0FBbUIsQ0FBQyxPQUFwQixDQUE0QixNQUFNLENBQUMsV0FBUCxDQUFBLENBQTVCLENBQUEsS0FBdUQsQ0FBQyxDQUExRTtNQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYixFQUFBOztBQUNBLFdBQU8sUUFKVDtHQUFBLE1BQUE7QUFPRTtBQUFBLFNBQUEsd0NBQUE7O01BQ0UsSUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBQSxDQUEyQixDQUFDLE9BQTVCLENBQW9DLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBcEMsQ0FBQSxLQUErRCxDQUFDLENBQW5FO1FBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiLEVBREY7O0FBREY7QUFHQSxXQUFPLFFBVlQ7O0FBSG1COzs7QUFpQnJCOzs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBUyxDQUFDLFlBQVYsR0FBeUIsU0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEyQixNQUEzQixFQUFtQyxNQUFuQyxFQUEyQyxNQUEzQztBQUN2QixNQUFBO0VBQUEsUUFBQSxHQUFZLE1BQUEsR0FBUztFQUNyQixRQUFBLEdBQVksTUFBQSxHQUFTO0VBQ3JCLFFBQUEsR0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFBLEdBQVcsTUFBWixDQUFBLEdBQXNCLFFBQXZCLENBQUEsR0FBbUMsUUFBcEMsQ0FBQSxHQUFnRDtFQUUzRCxJQUFHLE1BQUg7SUFDRSxJQUFHLFFBQUEsR0FBVyxNQUFkO2FBQ0UsT0FERjtLQUFBLE1BRUssSUFBRyxRQUFBLEdBQVcsTUFBZDthQUNILE9BREc7S0FBQSxNQUFBO2FBR0gsU0FIRztLQUhQO0dBQUEsTUFBQTtXQVFFLFNBUkY7O0FBTHVCOzs7QUFnQnpCOzs7Ozs7Ozs7Ozs7QUFXQSxTQUFTLENBQUMsaUJBQVYsR0FBOEIsU0FBQyxLQUFEO1NBQzVCLEtBQUssQ0FBQyxhQUFOLEdBQXNCLEtBQUssQ0FBQztBQURBOzs7QUFHOUI7Ozs7Ozs7OztBQVFBLEtBQUssQ0FBQSxTQUFFLENBQUEsS0FBUCxHQUFlLFNBQUMsYUFBRCxFQUFnQixhQUFoQjtFQUNiLElBQUksQ0FBQyxFQUFMLENBQVEsWUFBUixFQUFzQixhQUF0QjtTQUNBLElBQUksQ0FBQyxFQUFMLENBQVEsWUFBUixFQUFzQixhQUF0QjtBQUZhOzs7QUFLZjs7Ozs7O0FBTUEsS0FBSyxDQUFBLFNBQUUsQ0FBQSxHQUFQLEdBQWEsU0FBQyxPQUFEO1NBQ1gsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsUUFBZixFQUF5QixPQUF6QjtBQURXOzs7QUFJYjs7Ozs7O0FBTUEsS0FBSyxDQUFBLFNBQUUsQ0FBQSxLQUFQLEdBQWUsU0FBQyxPQUFEO1NBQ2IsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsS0FBZixFQUFzQixPQUF0QjtBQURhOzs7QUFLZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQSxLQUFLLENBQUEsU0FBRSxDQUFBLFNBQVAsR0FBbUIsU0FBQyxVQUFELEVBQWEsS0FBYixFQUFvQixNQUFwQixFQUE0QixLQUE1QjtBQUNqQixNQUFBO0VBQUEsU0FBQSxHQUFZO0VBQ1osSUFBQSxHQUFPLEtBQUEsR0FBUSxRQUFBLEdBQVc7RUFFMUIsSUFBRyxPQUFPLEtBQVAsS0FBaUIsUUFBcEI7SUFDRSxJQUFBLEdBQU87SUFDUCxJQUFHLE9BQU8sTUFBUCxLQUFrQixRQUFyQjtNQUNFLEtBQUEsR0FBUTtNQUNSLFFBQUEsR0FBVyxNQUZiOztJQUdBLElBQXFCLE9BQU8sTUFBUCxLQUFrQixVQUF2QztNQUFBLFFBQUEsR0FBVyxPQUFYO0tBTEY7R0FBQSxNQU1LLElBQUcsT0FBTyxLQUFQLEtBQWlCLFFBQXBCO0lBQ0gsS0FBQSxHQUFRO0lBQ1IsSUFBcUIsT0FBTyxNQUFQLEtBQWtCLFVBQXZDO01BQUEsUUFBQSxHQUFXLE9BQVg7S0FGRztHQUFBLE1BR0EsSUFBRyxPQUFPLEtBQVAsS0FBaUIsVUFBcEI7SUFDSCxRQUFBLEdBQVcsTUFEUjs7RUFHTCxJQUFHLGNBQUEsSUFBVSxlQUFiO0lBQ0UsS0FBQSxHQUFRLGVBRFY7O0VBR0EsSUFBNEMsYUFBNUM7SUFBQSxLQUFBLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBbEM7O0VBQ0EsSUFBMEMsWUFBMUM7SUFBQSxJQUFBLEdBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBakM7O0VBRUEsU0FBUyxDQUFDLFdBQVYsR0FBNEIsSUFBQSxTQUFBLENBQzFCO0lBQUEsS0FBQSxFQUFPLFNBQVA7SUFDQSxVQUFBLEVBQVksVUFEWjtJQUVBLEtBQUEsRUFBTyxLQUZQO0lBR0EsSUFBQSxFQUFNLElBSE47R0FEMEI7RUFNNUIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxTQUFBO1dBQ2hDLFNBQVMsQ0FBQyxXQUFWLEdBQXdCO0VBRFEsQ0FBbEM7RUFHQSxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQXRCLENBQXlCLEtBQXpCLEVBQWdDLFNBQUE7SUFDOUIsU0FBUyxDQUFDLFdBQVYsR0FBd0I7SUFDeEIsSUFBRyxnQkFBSDthQUNFLFFBQUEsQ0FBQSxFQURGOztFQUY4QixDQUFoQztTQUtBLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBdEIsQ0FBQTtBQXBDaUI7OztBQXNDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxTQUFTLENBQUMsZUFBVixHQUNFO0VBQUEsYUFBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsT0FEUjtJQUVBLElBQUEsRUFBTSxDQUFDLENBRlA7SUFHQSxFQUFBLEVBQUksQ0FISjtHQURGO0VBTUEsV0FBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsT0FEUjtJQUVBLEVBQUEsRUFBSSxDQUFDLENBRkw7R0FQRjtFQVdBLGNBQUEsRUFDRTtJQUFBLFFBQUEsRUFBVSxHQUFWO0lBQ0EsTUFBQSxFQUFRLE9BRFI7SUFFQSxJQUFBLEVBQU0sQ0FGTjtJQUdBLEVBQUEsRUFBSSxDQUhKO0dBWkY7RUFpQkEsWUFBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsT0FEUjtJQUVBLEVBQUEsRUFBSSxDQUZKO0dBbEJGO0VBc0JBLFlBQUEsRUFDRTtJQUFBLFFBQUEsRUFBVSxHQUFWO0lBQ0EsTUFBQSxFQUFRLFFBRFI7SUFFQSxJQUFBLEVBQU0sQ0FBQyxDQUZQO0lBR0EsRUFBQSxFQUFJLENBSEo7R0F2QkY7RUE0QkEsVUFBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsUUFEUjtJQUVBLEVBQUEsRUFBSSxDQUFDLENBRkw7R0E3QkY7RUFpQ0EsZUFBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsUUFEUjtJQUVBLElBQUEsRUFBTSxDQUZOO0lBR0EsRUFBQSxFQUFJLENBSEo7R0FsQ0Y7RUF1Q0EsYUFBQSxFQUNFO0lBQUEsUUFBQSxFQUFVLEdBQVY7SUFDQSxNQUFBLEVBQVEsUUFEUjtJQUVBLEVBQUEsRUFBSSxDQUZKO0dBeENGOzs7QUE4Q0YsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFTLENBQUMsZUFBakIsRUFBa0MsU0FBQyxJQUFELEVBQU8sSUFBUDtTQUNoQyxLQUFLLENBQUMsU0FBVSxDQUFBLElBQUEsQ0FBaEIsR0FBd0IsU0FBQyxJQUFEO0FBQ3RCLFFBQUE7SUFBQSxNQUFBLHFFQUE4QixDQUFFO0lBRWhDLElBQUEsQ0FBTyxNQUFQO01BQ0UsR0FBQSxHQUFNO01BQ04sS0FBQSxDQUFNLEdBQU47TUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLEdBQVo7QUFDQSxhQUpGOztJQU1BLFNBQUEsR0FBWSxJQUFJLENBQUM7SUFDakIsT0FBQSxHQUFVLE1BQU8sQ0FBQSxJQUFJLENBQUMsTUFBTDtJQUVqQixJQUFHLGlCQUFIO01BRUUsSUFBSyxDQUFBLFNBQUEsQ0FBTCxHQUFrQixJQUFJLENBQUMsSUFBTCxHQUFZLFFBRmhDOztJQUtBLGdCQUFBLEdBQW1CO0lBQ25CLGdCQUFpQixDQUFBLFNBQUEsQ0FBakIsR0FBOEIsSUFBSSxDQUFDLEVBQUwsR0FBVTtJQUV4QyxJQUFHLElBQUg7TUFDRSxLQUFBLEdBQVE7TUFDUixNQUFBLEdBQVMsZUFGWDtLQUFBLE1BQUE7TUFJRSxLQUFBLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7TUFDdkMsTUFBQSxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BTDFDOztXQU9BLElBQUksQ0FBQyxPQUFMLENBQ0U7TUFBQSxVQUFBLEVBQVksZ0JBQVo7TUFDQSxJQUFBLEVBQU0sS0FETjtNQUVBLEtBQUEsRUFBTyxNQUZQO0tBREY7RUEzQnNCO0FBRFEsQ0FBbEM7OztBQW1DQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLEtBQUssQ0FBQSxTQUFFLENBQUEsSUFBUCxHQUFjLFNBQUE7RUFDWixJQUFDLENBQUEsT0FBRCxHQUFXO0VBQ1gsSUFBQyxDQUFBLEtBQUssQ0FBQyxhQUFQLEdBQXVCO1NBQ3ZCO0FBSFk7O0FBS2QsS0FBSyxDQUFBLFNBQUUsQ0FBQSxJQUFQLEdBQWMsU0FBQTtFQUNaLElBQUMsQ0FBQSxPQUFELEdBQVc7RUFDWCxJQUFDLENBQUEsS0FBSyxDQUFDLGFBQVAsR0FBdUI7U0FDdkI7QUFIWTs7QUFLZCxLQUFLLENBQUEsU0FBRSxDQUFBLE1BQVAsR0FBZ0IsU0FBQyxJQUFEOztJQUFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7O0VBQ3BELElBQVUsSUFBQyxDQUFBLE9BQUQsS0FBWSxDQUF0QjtBQUFBLFdBQUE7O0VBRUEsSUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFSO0lBQ0UsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFELEdBQVcsS0FGYjs7U0FJQSxJQUFDLENBQUEsU0FBRCxDQUFXO0lBQUEsT0FBQSxFQUFTLENBQVQ7R0FBWCxFQUF1QixJQUF2QixFQUE2QixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUEzRDtBQVBjOztBQVNoQixLQUFLLENBQUEsU0FBRSxDQUFBLE9BQVAsR0FBaUIsU0FBQyxJQUFEO0FBQ2YsTUFBQTs7SUFEZ0IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQzs7RUFDckQsSUFBVSxJQUFDLENBQUEsT0FBRCxLQUFZLENBQXRCO0FBQUEsV0FBQTs7RUFFQSxJQUFBLEdBQU87U0FDUCxJQUFDLENBQUEsU0FBRCxDQUFXO0lBQUEsT0FBQSxFQUFTLENBQVQ7R0FBWCxFQUF1QixJQUF2QixFQUE2QixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUEzRCxFQUFrRSxTQUFBO1dBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFYLEdBQTJCO0VBQTlCLENBQWxFO0FBSmU7O0FBT2pCLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEyQixTQUEzQixDQUFQLEVBQThDLFNBQUMsUUFBRDtTQUM1QyxNQUFNLENBQUMsY0FBUCxDQUFzQixLQUFLLENBQUMsU0FBNUIsRUFBdUMsUUFBdkMsRUFDRTtJQUFBLFVBQUEsRUFBWSxLQUFaO0lBQ0EsS0FBQSxFQUFPLFNBQUMsSUFBRDtNQUNMLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBUCxFQUFVLFNBQUMsS0FBRDtRQUNSLElBQStDLEtBQUEsWUFBaUIsS0FBaEU7aUJBQUEsS0FBSyxDQUFDLFNBQVUsQ0FBQSxRQUFBLENBQVMsQ0FBQyxJQUExQixDQUErQixLQUEvQixFQUFzQyxJQUF0QyxFQUFBOztNQURRLENBQVY7YUFFQTtJQUhLLENBRFA7R0FERjtBQUQ0QyxDQUE5Qzs7O0FBU0E7Ozs7Ozs7Ozs7O0FBV0EsU0FBUyxDQUFDLHFCQUFWLEdBQWtDLFNBQUMsS0FBRDtBQUNoQyxNQUFBO0VBQUEsUUFBQSxHQUFXLEtBQUssQ0FBQyxRQUFOLENBQWUsU0FBZjtFQUVYLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFYLENBQUEsQ0FBd0IsQ0FBQyxPQUF6QixDQUFpQyxXQUFqQyxDQUFBLElBQWtELFFBQXJEO0lBRUUsSUFBQSxDQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBYixDQUFBLENBQVA7TUFDRSxNQUFBLEdBQVMsS0FBSyxDQUFDLFFBQU4sQ0FBZSxPQUFmLEVBRFg7O0lBRUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxRQUFOLENBQWUsTUFBZjs7TUFHUixNQUFNLENBQUUsSUFBUixDQUFBOzs7TUFDQSxLQUFLLENBQUUsSUFBUCxDQUFBOztJQUdBLElBQUcsTUFBQSxJQUFVLEtBQWI7TUFDRSxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNkO1FBQUEsVUFBQSxFQUFZLGFBQVo7UUFDQSxLQUFBLEVBQU8sUUFBUSxDQUFDLEtBRGhCO09BRGM7TUFJaEIsU0FBUyxDQUFDLFVBQVYsR0FBdUI7TUFDdkIsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQU5GOztJQVNBLElBQUcsTUFBSDtNQUNFLEtBQUssQ0FBQyxLQUFOLENBQVksU0FBQTtRQUNWLFFBQVEsQ0FBQyxJQUFULENBQUE7ZUFDQSxNQUFNLENBQUMsSUFBUCxDQUFBO01BRlUsQ0FBWixFQUdFLFNBQUE7UUFDQSxRQUFRLENBQUMsSUFBVCxDQUFBO2VBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBQTtNQUZBLENBSEYsRUFERjs7SUFTQSxJQUFHLEtBQUg7TUFDRSxLQUFLLENBQUMsRUFBTixDQUFTLE1BQU0sQ0FBQyxVQUFoQixFQUE0QixTQUFBO1FBQzFCLFFBQVEsQ0FBQyxJQUFULENBQUE7O1VBQ0EsTUFBTSxDQUFFLElBQVIsQ0FBQTs7ZUFDQSxLQUFLLENBQUMsSUFBTixDQUFBO01BSDBCLENBQTVCO2FBS0EsS0FBSyxDQUFDLEVBQU4sQ0FBUyxNQUFNLENBQUMsUUFBaEIsRUFBMEIsU0FBQTtRQUN4QixLQUFLLENBQUMsSUFBTixDQUFBO1FBRUEsSUFBRyxNQUFIO2lCQUVFLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFGRjtTQUFBLE1BQUE7aUJBSUUsUUFBUSxDQUFDLElBQVQsQ0FBQSxFQUpGOztNQUh3QixDQUExQixFQU5GO0tBN0JGOztBQUhnQzs7QUFnRGxDLENBQUMsQ0FBQyxNQUFGLENBQVMsT0FBVCxFQUFrQixTQUFsQiJ9
