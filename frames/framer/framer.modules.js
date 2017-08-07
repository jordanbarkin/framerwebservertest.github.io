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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hY3VzZXIvRGVza3RvcC9SaW5nIFRlbXAvV2ViIHRlc3QvZnJhbWVzL2NoYW5nZS1kYXRlLmZyYW1lci9tb2R1bGVzL3Nob3J0Y3V0cy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9jaGFuZ2UtZGF0ZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9jaGFuZ2UtZGF0ZS5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9jaGFuZ2UtZGF0ZS5mcmFtZXIvbW9kdWxlcy9WaWV3Q29udHJvbGxlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9jaGFuZ2UtZGF0ZS5mcmFtZXIvbW9kdWxlcy9TdGF0dXNCYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFjdXNlci9EZXNrdG9wL1JpbmcgVGVtcC9XZWIgdGVzdC9mcmFtZXMvY2hhbmdlLWRhdGUuZnJhbWVyL21vZHVsZXMvUmluZ0Rhc2hib2FyZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYWN1c2VyL0Rlc2t0b3AvUmluZyBUZW1wL1dlYiB0ZXN0L2ZyYW1lcy9jaGFuZ2UtZGF0ZS5mcmFtZXIvbW9kdWxlcy9QcmltZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFjdXNlci9EZXNrdG9wL1JpbmcgVGVtcC9XZWIgdGVzdC9mcmFtZXMvY2hhbmdlLWRhdGUuZnJhbWVyL21vZHVsZXMvQXBwbGVTdHlsZVRvZ2dsZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMjI1xuICBTaG9ydGN1dHMgZm9yIEZyYW1lciAxLjBcbiAgaHR0cDovL2dpdGh1Yi5jb20vZmFjZWJvb2svc2hvcnRjdXRzLWZvci1mcmFtZXJcblxuICBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cbiAgUmVhZG1lOlxuICBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svc2hvcnRjdXRzLWZvci1mcmFtZXJcblxuICBMaWNlbnNlOlxuICBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svc2hvcnRjdXRzLWZvci1mcmFtZXIvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuIyMjXG5cblxuXG5cbiMjI1xuICBDT05GSUdVUkFUSU9OXG4jIyNcblxuc2hvcnRjdXRzID0ge31cblxuRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb24gPVxuICBjdXJ2ZTogXCJiZXppZXItY3VydmVcIlxuICB0aW1lOiAwLjJcblxuRnJhbWVyLkRlZmF1bHRzLlNsaWRlQW5pbWF0aW9uID1cbiAgY3VydmU6IFwic3ByaW5nKDQwMCw0MCwwKVwiXG5cblxuXG4jIyNcbiAgTE9PUCBPTiBFVkVSWSBMQVlFUlxuXG4gIFNob3J0aGFuZCBmb3IgYXBwbHlpbmcgYSBmdW5jdGlvbiB0byBldmVyeSBsYXllciBpbiB0aGUgZG9jdW1lbnQuXG5cbiAgRXhhbXBsZTpcbiAgYGBgc2hvcnRjdXRzLmV2ZXJ5TGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICBsYXllci52aXNpYmxlID0gZmFsc2U7XG4gIH0pO2BgYFxuIyMjXG5zaG9ydGN1dHMuZXZlcnlMYXllciA9IChmbikgLT5cbiAgZm9yIGxheWVyTmFtZSBvZiB3aW5kb3cuTGF5ZXJzXG4gICAgX2xheWVyID0gd2luZG93LkxheWVyc1tsYXllck5hbWVdXG4gICAgZm4gX2xheWVyXG5cblxuIyMjXG4gIFNIT1JUSEFORCBGT1IgQUNDRVNTSU5HIExBWUVSU1xuXG4gIENvbnZlcnQgZWFjaCBsYXllciBjb21pbmcgZnJvbSB0aGUgZXhwb3J0ZXIgaW50byBhIEphdmFzY3JpcHQgb2JqZWN0IGZvciBzaG9ydGhhbmQgYWNjZXNzLlxuXG4gIFRoaXMgaGFzIHRvIGJlIGNhbGxlZCBtYW51YWxseSBpbiBGcmFtZXIzIGFmdGVyIHlvdSd2ZSByYW4gdGhlIGltcG9ydGVyLlxuXG4gIG15TGF5ZXJzID0gRnJhbWVyLkltcG9ydGVyLmxvYWQoXCIuLi5cIilcbiAgc2hvcnRjdXRzLmluaXRpYWxpemUobXlMYXllcnMpXG5cbiAgSWYgeW91IGhhdmUgYSBsYXllciBpbiB5b3VyIFBTRC9Ta2V0Y2ggY2FsbGVkIFwiTmV3c0ZlZWRcIiwgdGhpcyB3aWxsIGNyZWF0ZSBhIGdsb2JhbCBKYXZhc2NyaXB0IHZhcmlhYmxlIGNhbGxlZCBcIk5ld3NGZWVkXCIgdGhhdCB5b3UgY2FuIG1hbmlwdWxhdGUgd2l0aCBGcmFtZXIuXG5cbiAgRXhhbXBsZTpcbiAgYE5ld3NGZWVkLnZpc2libGUgPSBmYWxzZTtgXG5cbiAgTm90ZXM6XG4gIEphdmFzY3JpcHQgaGFzIHNvbWUgbmFtZXMgcmVzZXJ2ZWQgZm9yIGludGVybmFsIGZ1bmN0aW9uIHRoYXQgeW91IGNhbid0IG92ZXJyaWRlIChmb3IgZXguIClcbiAgSWYgeW91IGNhbGwgaW5pdGlhbGl6ZSB3aXRob3V0IGFueXRoaW5nLCBpdCB3aWxsIHVzZSBhbGwgY3VycmVudGx5IGF2YWlsYWJsZSBsYXllcnMuXG4jIyNcbnNob3J0Y3V0cy5pbml0aWFsaXplID0gKGxheWVycykgLT5cblxuICBsYXllciA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJMaXN0IGlmIG5vdCBsYXllcnNcblxuICB3aW5kb3cuTGF5ZXJzID0gbGF5ZXJzXG5cbiAgc2hvcnRjdXRzLmV2ZXJ5TGF5ZXIgKGxheWVyKSAtPlxuICAgIHNhbml0aXplZExheWVyTmFtZSA9IGxheWVyLm5hbWUucmVwbGFjZSgvWy0rIT86KlxcW1xcXVxcKFxcKVxcL10vZywgJycpLnRyaW0oKS5yZXBsYWNlKC9cXHMvZywgJ18nKVxuICAgIHdpbmRvd1tzYW5pdGl6ZWRMYXllck5hbWVdID0gbGF5ZXJcbiAgICBzaG9ydGN1dHMuc2F2ZU9yaWdpbmFsRnJhbWUgbGF5ZXJcbiAgICBzaG9ydGN1dHMuaW5pdGlhbGl6ZVRvdWNoU3RhdGVzIGxheWVyXG5cblxuIyMjXG4gIEZJTkQgQ0hJTEQgTEFZRVJTIEJZIE5BTUVcblxuICBSZXRyaWV2ZXMgc3ViTGF5ZXJzIG9mIHNlbGVjdGVkIGxheWVyIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIG5hbWUuXG5cbiAgZ2V0Q2hpbGQ6IHJldHVybiB0aGUgZmlyc3Qgc3VibGF5ZXIgd2hvc2UgbmFtZSBpbmNsdWRlcyB0aGUgZ2l2ZW4gc3RyaW5nXG4gIGdldENoaWxkcmVuOiByZXR1cm4gYWxsIHN1YkxheWVycyB0aGF0IG1hdGNoXG5cbiAgVXNlZnVsIHdoZW4gZWcuIGl0ZXJhdGluZyBvdmVyIHRhYmxlIGNlbGxzLiBVc2UgZ2V0Q2hpbGQgdG8gYWNjZXNzIHRoZSBidXR0b24gZm91bmQgaW4gZWFjaCBjZWxsLiBUaGlzIGlzICoqY2FzZSBpbnNlbnNpdGl2ZSoqLlxuXG4gIEV4YW1wbGU6XG4gIGB0b3BMYXllciA9IE5ld3NGZWVkLmdldENoaWxkKFwiVG9wXCIpYCBMb29rcyBmb3IgbGF5ZXJzIHdob3NlIG5hbWUgbWF0Y2hlcyBUb3AuIFJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIGxheWVyLlxuXG4gIGBjaGlsZExheWVycyA9IFRhYmxlLmdldENoaWxkcmVuKFwiQ2VsbFwiKWAgUmV0dXJucyBhbGwgY2hpbGRyZW4gd2hvc2UgbmFtZSBtYXRjaCBDZWxsIGluIGFuIGFycmF5LlxuIyMjXG5MYXllcjo6Z2V0Q2hpbGQgPSAobmVlZGxlLCByZWN1cnNpdmUgPSBmYWxzZSkgLT5cbiAgIyBTZWFyY2ggZGlyZWN0IGNoaWxkcmVuXG4gIGZvciBzdWJMYXllciBpbiBAc3ViTGF5ZXJzXG4gICAgcmV0dXJuIHN1YkxheWVyIGlmIHN1YkxheWVyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSBpc250IC0xIFxuXG4gICMgUmVjdXJzaXZlbHkgc2VhcmNoIGNoaWxkcmVuIG9mIGNoaWxkcmVuXG4gIGlmIHJlY3Vyc2l2ZVxuICAgIGZvciBzdWJMYXllciBpbiBAc3ViTGF5ZXJzXG4gICAgICByZXR1cm4gc3ViTGF5ZXIuZ2V0Q2hpbGQobmVlZGxlLCByZWN1cnNpdmUpIGlmIHN1YkxheWVyLmdldENoaWxkKG5lZWRsZSwgcmVjdXJzaXZlKSBcblxuXG5MYXllcjo6Z2V0Q2hpbGRyZW4gPSAobmVlZGxlLCByZWN1cnNpdmUgPSBmYWxzZSkgLT5cbiAgcmVzdWx0cyA9IFtdXG5cbiAgaWYgcmVjdXJzaXZlXG4gICAgZm9yIHN1YkxheWVyIGluIEBzdWJMYXllcnNcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCBzdWJMYXllci5nZXRDaGlsZHJlbihuZWVkbGUsIHJlY3Vyc2l2ZSlcbiAgICByZXN1bHRzLnB1c2ggQCBpZiBAbmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpIGlzbnQgLTFcbiAgICByZXR1cm4gcmVzdWx0c1xuXG4gIGVsc2VcbiAgICBmb3Igc3ViTGF5ZXIgaW4gQHN1YkxheWVyc1xuICAgICAgaWYgc3ViTGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpIGlzbnQgLTEgXG4gICAgICAgIHJlc3VsdHMucHVzaCBzdWJMYXllciBcbiAgICByZXR1cm4gcmVzdWx0c1xuXG5cblxuIyMjXG4gIENPTlZFUlQgQSBOVU1CRVIgUkFOR0UgVE8gQU5PVEhFUlxuXG4gIENvbnZlcnRzIGEgbnVtYmVyIHdpdGhpbiBvbmUgcmFuZ2UgdG8gYW5vdGhlciByYW5nZVxuXG4gIEV4YW1wbGU6XG4gIFdlIHdhbnQgdG8gbWFwIHRoZSBvcGFjaXR5IG9mIGEgbGF5ZXIgdG8gaXRzIHggbG9jYXRpb24uXG5cbiAgVGhlIG9wYWNpdHkgd2lsbCBiZSAwIGlmIHRoZSBYIGNvb3JkaW5hdGUgaXMgMCwgYW5kIGl0IHdpbGwgYmUgMSBpZiB0aGUgWCBjb29yZGluYXRlIGlzIDY0MC4gQWxsIHRoZSBYIGNvb3JkaW5hdGVzIGluIGJldHdlZW4gd2lsbCByZXN1bHQgaW4gaW50ZXJtZWRpYXRlIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEuXG5cbiAgYG15TGF5ZXIub3BhY2l0eSA9IGNvbnZlcnRSYW5nZSgwLCA2NDAsIG15TGF5ZXIueCwgMCwgMSlgXG5cbiAgQnkgZGVmYXVsdCwgdGhpcyB2YWx1ZSBtaWdodCBiZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgTmV3TWluIGFuZCBOZXdNYXggaWYgdGhlIE9sZFZhbHVlIGlzIG91dHNpZGUgT2xkTWluIGFuZCBPbGRNYXguIElmIHlvdSB3YW50IHRvIGNhcCB0aGUgZmluYWwgdmFsdWUgdG8gTmV3TWluIGFuZCBOZXdNYXgsIHNldCBjYXBwZWQgdG8gdHJ1ZS5cbiAgTWFrZSBzdXJlIE5ld01pbiBpcyBzbWFsbGVyIHRoYW4gTmV3TWF4IGlmIHlvdSdyZSB1c2luZyB0aGlzLiBJZiB5b3UgbmVlZCBhbiBpbnZlcnNlIHByb3BvcnRpb24sIHRyeSBzd2FwcGluZyBPbGRNaW4gYW5kIE9sZE1heC5cbiMjI1xuc2hvcnRjdXRzLmNvbnZlcnRSYW5nZSA9IChPbGRNaW4sIE9sZE1heCwgT2xkVmFsdWUsIE5ld01pbiwgTmV3TWF4LCBjYXBwZWQpIC0+XG4gIE9sZFJhbmdlID0gKE9sZE1heCAtIE9sZE1pbilcbiAgTmV3UmFuZ2UgPSAoTmV3TWF4IC0gTmV3TWluKVxuICBOZXdWYWx1ZSA9ICgoKE9sZFZhbHVlIC0gT2xkTWluKSAqIE5ld1JhbmdlKSAvIE9sZFJhbmdlKSArIE5ld01pblxuXG4gIGlmIGNhcHBlZFxuICAgIGlmIE5ld1ZhbHVlID4gTmV3TWF4XG4gICAgICBOZXdNYXhcbiAgICBlbHNlIGlmIE5ld1ZhbHVlIDwgTmV3TWluXG4gICAgICBOZXdNaW5cbiAgICBlbHNlXG4gICAgICBOZXdWYWx1ZVxuICBlbHNlXG4gICAgTmV3VmFsdWVcblxuXG4jIyNcbiAgT1JJR0lOQUwgRlJBTUVcblxuICBTdG9yZXMgdGhlIGluaXRpYWwgbG9jYXRpb24gYW5kIHNpemUgb2YgYSBsYXllciBpbiB0aGUgXCJvcmlnaW5hbEZyYW1lXCIgYXR0cmlidXRlLCBzbyB5b3UgY2FuIHJldmVydCB0byBpdCBsYXRlciBvbi5cblxuICBFeGFtcGxlOlxuICBUaGUgeCBjb29yZGluYXRlIG9mIE15TGF5ZXIgaXMgaW5pdGlhbGx5IDQwMCAoZnJvbSB0aGUgUFNEKVxuXG4gIGBgYE15TGF5ZXIueCA9IDIwMDsgLy8gbm93IHdlIHNldCBpdCB0byAyMDAuXG4gIE15TGF5ZXIueCA9IE15TGF5ZXIub3JpZ2luYWxGcmFtZS54IC8vIG5vdyB3ZSBzZXQgaXQgYmFjayB0byBpdHMgb3JpZ2luYWwgdmFsdWUsIDQwMC5gYGBcbiMjI1xuc2hvcnRjdXRzLnNhdmVPcmlnaW5hbEZyYW1lID0gKGxheWVyKSAtPlxuICBsYXllci5vcmlnaW5hbEZyYW1lID0gbGF5ZXIuZnJhbWVcblxuIyMjXG4gIFNIT1JUSEFORCBIT1ZFUiBTWU5UQVhcblxuICBRdWlja2x5IGRlZmluZSBmdW5jdGlvbnMgdGhhdCBzaG91bGQgcnVuIHdoZW4gSSBob3ZlciBvdmVyIGEgbGF5ZXIsIGFuZCBob3ZlciBvdXQuXG5cbiAgRXhhbXBsZTpcbiAgYE15TGF5ZXIuaG92ZXIoZnVuY3Rpb24oKSB7IE90aGVyTGF5ZXIuc2hvdygpIH0sIGZ1bmN0aW9uKCkgeyBPdGhlckxheWVyLmhpZGUoKSB9KTtgXG4jIyNcbkxheWVyOjpob3ZlciA9IChlbnRlckZ1bmN0aW9uLCBsZWF2ZUZ1bmN0aW9uKSAtPlxuICB0aGlzLm9uICdtb3VzZWVudGVyJywgZW50ZXJGdW5jdGlvblxuICB0aGlzLm9uICdtb3VzZWxlYXZlJywgbGVhdmVGdW5jdGlvblxuXG5cbiMjI1xuICBTSE9SVEhBTkQgVEFQIFNZTlRBWFxuXG4gIEluc3RlYWQgb2YgYE15TGF5ZXIub24oRXZlbnRzLlRvdWNoRW5kLCBoYW5kbGVyKWAsIHVzZSBgTXlMYXllci50YXAoaGFuZGxlcilgXG4jIyNcblxuTGF5ZXI6OnRhcCA9IChoYW5kbGVyKSAtPlxuICB0aGlzLm9uIEV2ZW50cy5Ub3VjaEVuZCwgaGFuZGxlclxuXG5cbiMjI1xuICBTSE9SVEhBTkQgQ0xJQ0sgU1lOVEFYXG5cbiAgSW5zdGVhZCBvZiBgTXlMYXllci5vbihFdmVudHMuQ2xpY2ssIGhhbmRsZXIpYCwgdXNlIGBNeUxheWVyLmNsaWNrKGhhbmRsZXIpYFxuIyMjXG5cbkxheWVyOjpjbGljayA9IChoYW5kbGVyKSAtPlxuICB0aGlzLm9uIEV2ZW50cy5DbGljaywgaGFuZGxlclxuXG5cblxuIyMjXG4gIFNIT1JUSEFORCBBTklNQVRJT04gU1lOVEFYXG5cbiAgQSBzaG9ydGVyIGFuaW1hdGlvbiBzeW50YXggdGhhdCBtaXJyb3JzIHRoZSBqUXVlcnkgc3ludGF4OlxuICBsYXllci5hbmltYXRlKHByb3BlcnRpZXMsIFt0aW1lXSwgW2N1cnZlXSwgW2NhbGxiYWNrXSlcblxuICBBbGwgcGFyYW1ldGVycyBleGNlcHQgcHJvcGVydGllcyBhcmUgb3B0aW9uYWwgYW5kIGNhbiBiZSBvbWl0dGVkLlxuXG4gIE9sZDpcbiAgYGBgTXlMYXllci5hbmltYXRlKHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB4OiA1MDBcbiAgICB9LFxuICAgIHRpbWU6IDUwMCxcbiAgICBjdXJ2ZTogJ2Jlemllci1jdXJ2ZSdcbiAgfSlgYGBcblxuICBOZXc6XG4gIGBgYE15TGF5ZXIuYW5pbWF0ZVRvKHtcbiAgICB4OiA1MDBcbiAgfSlgYGBcblxuICBPcHRpb25hbGx5ICh3aXRoIDEwMDBtcyBkdXJhdGlvbiBhbmQgc3ByaW5nKTpcbiAgICBgYGBNeUxheWVyLmFuaW1hdGVUbyh7XG4gICAgeDogNTAwXG4gIH0sIDEwMDAsIFwic3ByaW5nKDEwMCwxMCwwKVwiKVxuIyMjXG5cblxuXG5MYXllcjo6YW5pbWF0ZVRvID0gKHByb3BlcnRpZXMsIGZpcnN0LCBzZWNvbmQsIHRoaXJkKSAtPlxuICB0aGlzTGF5ZXIgPSB0aGlzXG4gIHRpbWUgPSBjdXJ2ZSA9IGNhbGxiYWNrID0gbnVsbFxuXG4gIGlmIHR5cGVvZihmaXJzdCkgPT0gXCJudW1iZXJcIlxuICAgIHRpbWUgPSBmaXJzdFxuICAgIGlmIHR5cGVvZihzZWNvbmQpID09IFwic3RyaW5nXCJcbiAgICAgIGN1cnZlID0gc2Vjb25kXG4gICAgICBjYWxsYmFjayA9IHRoaXJkXG4gICAgY2FsbGJhY2sgPSBzZWNvbmQgaWYgdHlwZW9mKHNlY29uZCkgPT0gXCJmdW5jdGlvblwiXG4gIGVsc2UgaWYgdHlwZW9mKGZpcnN0KSA9PSBcInN0cmluZ1wiXG4gICAgY3VydmUgPSBmaXJzdFxuICAgIGNhbGxiYWNrID0gc2Vjb25kIGlmIHR5cGVvZihzZWNvbmQpID09IFwiZnVuY3Rpb25cIlxuICBlbHNlIGlmIHR5cGVvZihmaXJzdCkgPT0gXCJmdW5jdGlvblwiXG4gICAgY2FsbGJhY2sgPSBmaXJzdFxuXG4gIGlmIHRpbWU/ICYmICFjdXJ2ZT9cbiAgICBjdXJ2ZSA9ICdiZXppZXItY3VydmUnXG4gIFxuICBjdXJ2ZSA9IEZyYW1lci5EZWZhdWx0cy5BbmltYXRpb24uY3VydmUgaWYgIWN1cnZlP1xuICB0aW1lID0gRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbi50aW1lIGlmICF0aW1lP1xuXG4gIHRoaXNMYXllci5hbmltYXRpb25UbyA9IG5ldyBBbmltYXRpb25cbiAgICBsYXllcjogdGhpc0xheWVyXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1xuICAgIGN1cnZlOiBjdXJ2ZVxuICAgIHRpbWU6IHRpbWVcblxuICB0aGlzTGF5ZXIuYW5pbWF0aW9uVG8ub24gJ3N0YXJ0JywgLT5cbiAgICB0aGlzTGF5ZXIuaXNBbmltYXRpbmcgPSB0cnVlXG5cbiAgdGhpc0xheWVyLmFuaW1hdGlvblRvLm9uICdlbmQnLCAtPlxuICAgIHRoaXNMYXllci5pc0FuaW1hdGluZyA9IG51bGxcbiAgICBpZiBjYWxsYmFjaz9cbiAgICAgIGNhbGxiYWNrKClcblxuICB0aGlzTGF5ZXIuYW5pbWF0aW9uVG8uc3RhcnQoKVxuXG4jIyNcbiAgQU5JTUFURSBNT0JJTEUgTEFZRVJTIElOIEFORCBPVVQgT0YgVEhFIFZJRVdQT1JUXG5cbiAgU2hvcnRoYW5kIHN5bnRheCBmb3IgYW5pbWF0aW5nIGxheWVycyBpbiBhbmQgb3V0IG9mIHRoZSB2aWV3cG9ydC4gQXNzdW1lcyB0aGF0IHRoZSBsYXllciB5b3UgYXJlIGFuaW1hdGluZyBpcyBhIHdob2xlIHNjcmVlbiBhbmQgaGFzIHRoZSBzYW1lIGRpbWVuc2lvbnMgYXMgeW91ciBjb250YWluZXIuXG5cbiAgRW5hYmxlIHRoZSBkZXZpY2UgcHJldmlldyBpbiBGcmFtZXIgU3R1ZGlvIHRvIHVzZSB0aGlzIOKAk8KgaXQgbGV0cyB0aGlzIHNjcmlwdCBmaWd1cmUgb3V0IHdoYXQgdGhlIGJvdW5kcyBvZiB5b3VyIHNjcmVlbiBhcmUuXG5cbiAgRXhhbXBsZTpcbiAgKiBgTXlMYXllci5zbGlkZVRvTGVmdCgpYCB3aWxsIGFuaW1hdGUgdGhlIGxheWVyICoqdG8qKiB0aGUgbGVmdCBjb3JuZXIgb2YgdGhlIHNjcmVlbiAoZnJvbSBpdHMgY3VycmVudCBwb3NpdGlvbilcblxuICAqIGBNeUxheWVyLnNsaWRlRnJvbUxlZnQoKWAgd2lsbCBhbmltYXRlIHRoZSBsYXllciBpbnRvIHRoZSB2aWV3cG9ydCAqKmZyb20qKiB0aGUgbGVmdCBjb3JuZXIgKGZyb20geD0td2lkdGgpXG5cbiAgQ29uZmlndXJhdGlvbjpcbiAgKiAoQnkgZGVmYXVsdCB3ZSB1c2UgYSBzcHJpbmcgY3VydmUgdGhhdCBhcHByb3hpbWF0ZXMgaU9TLiBUbyB1c2UgYSB0aW1lIGR1cmF0aW9uLCBjaGFuZ2UgdGhlIGN1cnZlIHRvIGJlemllci1jdXJ2ZS4pXG4gICogRnJhbWVyLkRlZmF1bHRzLlNsaWRlQW5pbWF0aW9uLnRpbWVcbiAgKiBGcmFtZXIuRGVmYXVsdHMuU2xpZGVBbmltYXRpb24uY3VydmVcblxuXG4gIEhvdyB0byByZWFkIHRoZSBjb25maWd1cmF0aW9uOlxuICBgYGBzbGlkZUZyb21MZWZ0OlxuICAgIHByb3BlcnR5OiBcInhcIiAgICAgLy8gYW5pbWF0ZSBhbG9uZyB0aGUgWCBheGlzXG4gICAgZmFjdG9yOiBcIndpZHRoXCJcbiAgICBmcm9tOiAtMSAgICAgICAgICAvLyBzdGFydCB2YWx1ZTogb3V0c2lkZSB0aGUgbGVmdCBjb3JuZXIgKCB4ID0gLXdpZHRoX3Bob25lIClcbiAgICB0bzogMCAgICAgICAgICAgICAvLyBlbmQgdmFsdWU6IGluc2lkZSB0aGUgbGVmdCBjb3JuZXIgKCB4ID0gd2lkdGhfbGF5ZXIgKVxuICBgYGBcbiMjI1xuXG5cbnNob3J0Y3V0cy5zbGlkZUFuaW1hdGlvbnMgPVxuICBzbGlkZUZyb21MZWZ0OlxuICAgIHByb3BlcnR5OiBcInhcIlxuICAgIGZhY3RvcjogXCJ3aWR0aFwiXG4gICAgZnJvbTogLTFcbiAgICB0bzogMFxuXG4gIHNsaWRlVG9MZWZ0OlxuICAgIHByb3BlcnR5OiBcInhcIlxuICAgIGZhY3RvcjogXCJ3aWR0aFwiXG4gICAgdG86IC0xXG5cbiAgc2xpZGVGcm9tUmlnaHQ6XG4gICAgcHJvcGVydHk6IFwieFwiXG4gICAgZmFjdG9yOiBcIndpZHRoXCJcbiAgICBmcm9tOiAxXG4gICAgdG86IDBcblxuICBzbGlkZVRvUmlnaHQ6XG4gICAgcHJvcGVydHk6IFwieFwiXG4gICAgZmFjdG9yOiBcIndpZHRoXCJcbiAgICB0bzogMVxuXG4gIHNsaWRlRnJvbVRvcDpcbiAgICBwcm9wZXJ0eTogXCJ5XCJcbiAgICBmYWN0b3I6IFwiaGVpZ2h0XCJcbiAgICBmcm9tOiAtMVxuICAgIHRvOiAwXG5cbiAgc2xpZGVUb1RvcDpcbiAgICBwcm9wZXJ0eTogXCJ5XCJcbiAgICBmYWN0b3I6IFwiaGVpZ2h0XCJcbiAgICB0bzogLTFcblxuICBzbGlkZUZyb21Cb3R0b206XG4gICAgcHJvcGVydHk6IFwieVwiXG4gICAgZmFjdG9yOiBcImhlaWdodFwiXG4gICAgZnJvbTogMVxuICAgIHRvOiAwXG5cbiAgc2xpZGVUb0JvdHRvbTpcbiAgICBwcm9wZXJ0eTogXCJ5XCJcbiAgICBmYWN0b3I6IFwiaGVpZ2h0XCJcbiAgICB0bzogMVxuXG5cblxuXy5lYWNoIHNob3J0Y3V0cy5zbGlkZUFuaW1hdGlvbnMsIChvcHRzLCBuYW1lKSAtPlxuICBMYXllci5wcm90b3R5cGVbbmFtZV0gPSAodGltZSkgLT5cbiAgICBfcGhvbmUgPSBGcmFtZXIuRGV2aWNlPy5zY3JlZW4/LmZyYW1lXG5cbiAgICB1bmxlc3MgX3Bob25lXG4gICAgICBlcnIgPSBcIlBsZWFzZSBzZWxlY3QgYSBkZXZpY2UgcHJldmlldyBpbiBGcmFtZXIgU3R1ZGlvIHRvIHVzZSB0aGUgc2xpZGUgcHJlc2V0IGFuaW1hdGlvbnMuXCJcbiAgICAgIHByaW50IGVyclxuICAgICAgY29uc29sZS5sb2cgZXJyXG4gICAgICByZXR1cm5cblxuICAgIF9wcm9wZXJ0eSA9IG9wdHMucHJvcGVydHlcbiAgICBfZmFjdG9yID0gX3Bob25lW29wdHMuZmFjdG9yXVxuXG4gICAgaWYgb3B0cy5mcm9tP1xuICAgICAgIyBJbml0aWF0ZSB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIGFuaW1hdGlvbiAoaS5lLiBvZmYgc2NyZWVuIG9uIHRoZSBsZWZ0IGNvcm5lcilcbiAgICAgIHRoaXNbX3Byb3BlcnR5XSA9IG9wdHMuZnJvbSAqIF9mYWN0b3JcblxuICAgICMgRGVmYXVsdCBhbmltYXRpb24gc3ludGF4IGxheWVyLmFuaW1hdGUoe19wcm9wZXJ0eTogMH0pIHdvdWxkIHRyeSB0byBhbmltYXRlICdfcHJvcGVydHknIGxpdGVyYWxseSwgaW4gb3JkZXIgZm9yIGl0IHRvIGJsb3cgdXAgdG8gd2hhdCdzIGluIGl0IChlZyB4KSwgd2UgdXNlIHRoaXMgc3ludGF4XG4gICAgX2FuaW1hdGlvbkNvbmZpZyA9IHt9XG4gICAgX2FuaW1hdGlvbkNvbmZpZ1tfcHJvcGVydHldID0gb3B0cy50byAqIF9mYWN0b3JcblxuICAgIGlmIHRpbWVcbiAgICAgIF90aW1lID0gdGltZVxuICAgICAgX2N1cnZlID0gXCJiZXppZXItY3VydmVcIlxuICAgIGVsc2VcbiAgICAgIF90aW1lID0gRnJhbWVyLkRlZmF1bHRzLlNsaWRlQW5pbWF0aW9uLnRpbWVcbiAgICAgIF9jdXJ2ZSA9IEZyYW1lci5EZWZhdWx0cy5TbGlkZUFuaW1hdGlvbi5jdXJ2ZVxuXG4gICAgdGhpcy5hbmltYXRlXG4gICAgICBwcm9wZXJ0aWVzOiBfYW5pbWF0aW9uQ29uZmlnXG4gICAgICB0aW1lOiBfdGltZVxuICAgICAgY3VydmU6IF9jdXJ2ZVxuXG5cblxuIyMjXG4gIEVBU1kgRkFERSBJTiAvIEZBREUgT1VUXG5cbiAgLnNob3coKSBhbmQgLmhpZGUoKSBhcmUgc2hvcnRjdXRzIHRvIGFmZmVjdCBvcGFjaXR5IGFuZCBwb2ludGVyIGV2ZW50cy4gVGhpcyBpcyBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyBoaWRpbmcgd2l0aCBgdmlzaWJsZSA9IGZhbHNlYCBidXQgY2FuIGJlIGFuaW1hdGVkLlxuXG4gIC5mYWRlSW4oKSBhbmQgLmZhZGVPdXQoKSBhcmUgc2hvcnRjdXRzIHRvIGZhZGUgaW4gYSBoaWRkZW4gbGF5ZXIsIG9yIGZhZGUgb3V0IGEgdmlzaWJsZSBsYXllci5cblxuICBUaGVzZSBzaG9ydGN1dHMgd29yayBvbiBpbmRpdmlkdWFsIGxheWVyIG9iamVjdHMgYXMgd2VsbCBhcyBhbiBhcnJheSBvZiBsYXllcnMuXG5cbiAgRXhhbXBsZTpcbiAgKiBgTXlMYXllci5mYWRlSW4oKWAgd2lsbCBmYWRlIGluIE15TGF5ZXIgdXNpbmcgZGVmYXVsdCB0aW1pbmcuXG4gICogYFtNeUxheWVyLCBPdGhlckxheWVyXS5mYWRlT3V0KDQpYCB3aWxsIGZhZGUgb3V0IGJvdGggTXlMYXllciBhbmQgT3RoZXJMYXllciBvdmVyIDQgc2Vjb25kcy5cblxuICBUbyBjdXN0b21pemUgdGhlIGZhZGUgYW5pbWF0aW9uLCBjaGFuZ2UgdGhlIHZhcmlhYmxlcyB0aW1lIGFuZCBjdXJ2ZSBpbnNpZGUgYEZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uYC5cbiMjI1xuTGF5ZXI6OnNob3cgPSAtPlxuICBAb3BhY2l0eSA9IDFcbiAgQHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0bydcbiAgQFxuXG5MYXllcjo6aGlkZSA9IC0+XG4gIEBvcGFjaXR5ID0gMFxuICBAc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuICBAXG5cbkxheWVyOjpmYWRlSW4gPSAodGltZSA9IEZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uLnRpbWUpIC0+XG4gIHJldHVybiBpZiBAb3BhY2l0eSA9PSAxXG5cbiAgdW5sZXNzIEB2aXNpYmxlXG4gICAgQG9wYWNpdHkgPSAwXG4gICAgQHZpc2libGUgPSB0cnVlXG5cbiAgQGFuaW1hdGVUbyBvcGFjaXR5OiAxLCB0aW1lLCBGcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbi5jdXJ2ZVxuXG5MYXllcjo6ZmFkZU91dCA9ICh0aW1lID0gRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb24udGltZSkgLT5cbiAgcmV0dXJuIGlmIEBvcGFjaXR5ID09IDBcblxuICB0aGF0ID0gQFxuICBAYW5pbWF0ZVRvIG9wYWNpdHk6IDAsIHRpbWUsIEZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uLmN1cnZlLCAtPiB0aGF0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSdcblxuIyBhbGwgb2YgdGhlIGVhc3kgaW4vb3V0IGhlbHBlcnMgd29yayBvbiBhbiBhcnJheSBvZiB2aWV3cyBhcyB3ZWxsIGFzIGluZGl2aWR1YWwgdmlld3Ncbl8uZWFjaCBbJ3Nob3cnLCAnaGlkZScsICdmYWRlSW4nLCAnZmFkZU91dCddLCAoZm5TdHJpbmcpLT4gIFxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgQXJyYXkucHJvdG90eXBlLCBmblN0cmluZywgXG4gICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB2YWx1ZTogKHRpbWUpIC0+XG4gICAgICBfLmVhY2ggQCwgKGxheWVyKSAtPlxuICAgICAgICBMYXllci5wcm90b3R5cGVbZm5TdHJpbmddLmNhbGwobGF5ZXIsIHRpbWUpIGlmIGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcbiAgICAgIEBcblxuXG4jIyNcbiAgRUFTWSBIT1ZFUiBBTkQgVE9VQ0gvQ0xJQ0sgU1RBVEVTIEZPUiBMQVlFUlNcblxuICBCeSBuYW1pbmcgeW91ciBsYXllciBoaWVyYXJjaHkgaW4gdGhlIGZvbGxvd2luZyB3YXksIHlvdSBjYW4gYXV0b21hdGljYWxseSBoYXZlIHlvdXIgbGF5ZXJzIHJlYWN0IHRvIGhvdmVycywgY2xpY2tzIG9yIHRhcHMuXG5cbiAgQnV0dG9uX3RvdWNoYWJsZVxuICAtIEJ1dHRvbl9kZWZhdWx0IChkZWZhdWx0IHN0YXRlKVxuICAtIEJ1dHRvbl9kb3duICh0b3VjaC9jbGljayBzdGF0ZSlcbiAgLSBCdXR0b25faG92ZXIgKGhvdmVyKVxuIyMjXG5cbnNob3J0Y3V0cy5pbml0aWFsaXplVG91Y2hTdGF0ZXMgPSAobGF5ZXIpIC0+XG4gIF9kZWZhdWx0ID0gbGF5ZXIuZ2V0Q2hpbGQoJ2RlZmF1bHQnKVxuXG4gIGlmIGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd0b3VjaGFibGUnKSBhbmQgX2RlZmF1bHRcblxuICAgIHVubGVzcyBGcmFtZXIuVXRpbHMuaXNNb2JpbGUoKVxuICAgICAgX2hvdmVyID0gbGF5ZXIuZ2V0Q2hpbGQoJ2hvdmVyJylcbiAgICBfZG93biA9IGxheWVyLmdldENoaWxkKCdkb3duJylcblxuICAgICMgVGhlc2UgbGF5ZXJzIHNob3VsZCBiZSBoaWRkZW4gYnkgZGVmYXVsdFxuICAgIF9ob3Zlcj8uaGlkZSgpXG4gICAgX2Rvd24/LmhpZGUoKVxuXG4gICAgIyBDcmVhdGUgZmFrZSBoaXQgdGFyZ2V0IChzbyB3ZSBkb24ndCByZS1maXJlIGV2ZW50cylcbiAgICBpZiBfaG92ZXIgb3IgX2Rvd25cbiAgICAgIGhpdFRhcmdldCA9IG5ldyBMYXllclxuICAgICAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnXG4gICAgICAgIGZyYW1lOiBfZGVmYXVsdC5mcmFtZVxuXG4gICAgICBoaXRUYXJnZXQuc3VwZXJMYXllciA9IGxheWVyXG4gICAgICBoaXRUYXJnZXQuYnJpbmdUb0Zyb250KClcblxuICAgICMgVGhlcmUgaXMgYSBob3ZlciBzdGF0ZSwgc28gZGVmaW5lIGhvdmVyIGV2ZW50cyAobm90IGZvciBtb2JpbGUpXG4gICAgaWYgX2hvdmVyXG4gICAgICBsYXllci5ob3ZlciAtPlxuICAgICAgICBfZGVmYXVsdC5oaWRlKClcbiAgICAgICAgX2hvdmVyLnNob3coKVxuICAgICAgLCAtPlxuICAgICAgICBfZGVmYXVsdC5zaG93KClcbiAgICAgICAgX2hvdmVyLmhpZGUoKVxuXG4gICAgIyBUaGVyZSBpcyBhIGRvd24gc3RhdGUsIHNvIGRlZmluZSBkb3duIGV2ZW50c1xuICAgIGlmIF9kb3duXG4gICAgICBsYXllci5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cbiAgICAgICAgX2RlZmF1bHQuaGlkZSgpXG4gICAgICAgIF9ob3Zlcj8uaGlkZSgpICMgdG91Y2ggZG93biBzdGF0ZSBvdmVycmlkZXMgaG92ZXIgc3RhdGVcbiAgICAgICAgX2Rvd24uc2hvdygpXG5cbiAgICAgIGxheWVyLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgX2Rvd24uaGlkZSgpXG5cbiAgICAgICAgaWYgX2hvdmVyXG4gICAgICAgICAgIyBJZiB0aGVyZSB3YXMgYSBob3ZlciBzdGF0ZSwgZ28gYmFjayB0byB0aGUgaG92ZXIgc3RhdGVcbiAgICAgICAgICBfaG92ZXIuc2hvdygpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBfZGVmYXVsdC5zaG93KClcblxuXG5fLmV4dGVuZChleHBvcnRzLCBzaG9ydGN1dHMpXG5cbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJleHBvcnRzLmtleWJvYXJkTGF5ZXIgPSBuZXcgTGF5ZXJcblx0eDowLCB5OlNjcmVlbi5oZWlnaHQsIHdpZHRoOlNjcmVlbi53aWR0aCwgaGVpZ2h0OjQzMlxuXHRodG1sOlwiPGltZyBzdHlsZT0nd2lkdGg6IDEwMCU7JyBzcmM9J21vZHVsZXMva2V5Ym9hcmQucG5nJy8+XCJcblxuI3NjcmVlbiB3aWR0aCB2cy4gc2l6ZSBvZiBpbWFnZSB3aWR0aFxuZ3Jvd3RoUmF0aW8gPSBTY3JlZW4ud2lkdGggLyA3MzJcbmltYWdlSGVpZ2h0ID0gZ3Jvd3RoUmF0aW8gKiA0MzJcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOiBcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAzMFxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAzMFxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2Vcblx0XHRvcHRpb25zLmF1dG9Db3JyZWN0ID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NvbXBsZXRlID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NhcGl0YWxpemUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5zcGVsbENoZWNrID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b2ZvY3VzID89IGZhbHNlXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3I/XG5cdFx0QGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImlucHV0XCJcblx0XHRAaW5wdXQuaWQgPSBcImlucHV0LSN7Xy5ub3coKX1cIlxuXHRcdEBpbnB1dC5zdHlsZS5jc3NUZXh0ID0gXCJvdXRsaW5lOiBub25lOyBmb250LXNpemU6ICN7b3B0aW9ucy5mb250U2l6ZX1weDsgbGluZS1oZWlnaHQ6ICN7b3B0aW9ucy5saW5lSGVpZ2h0fXB4OyBwYWRkaW5nOiAje29wdGlvbnMucGFkZGluZ31weDsgd2lkdGg6ICN7b3B0aW9ucy53aWR0aH1weDsgaGVpZ2h0OiAje29wdGlvbnMuaGVpZ2h0fXB4OyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQtaW1hZ2U6IHVybChhYm91dDpibGFuayk7IGJhY2tncm91bmQtY29sb3I6ICN7b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3J9O1wiXG5cdFx0QGlucHV0LnZhbHVlID0gb3B0aW9ucy50ZXh0XG5cdFx0QGlucHV0LnR5cGUgPSBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb3JyZWN0XCIsIG9wdGlvbnMuYXV0b0NvcnJlY3Rcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvbXBsZXRlXCIsIG9wdGlvbnMuYXV0b0NvbXBsZXRlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jYXBpdGFsaXplXCIsIG9wdGlvbnMuYXV0b0NhcGl0YWxpemVcblx0XHRpZiBvcHRpb25zLmF1dG9mb2N1cyA9PSB0cnVlXG5cdFx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2ZvY3VzXCIsIHRydWVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwic3BlbGxjaGVja1wiLCBvcHRpb25zLnNwZWxsQ2hlY2tcblx0XHRAZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJmb3JtXCJcblxuXHRcdGlmIG9wdGlvbnMuZ29CdXR0b25cblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA/PSBTY3JlZW4uaGVpZ2h0XG5cdFx0b3B0aW9ucy5jbGlwID89IHRydWVcblx0XHRvcHRpb25zLmluaXRpYWxWaWV3TmFtZSA/PSAnaW5pdGlhbFZpZXcnXG5cdFx0b3B0aW9ucy5iYWNrQnV0dG9uTmFtZSA/PSAnYmFja0J1dHRvbidcblx0XHRvcHRpb25zLmFuaW1hdGlvbk9wdGlvbnMgPz0geyBjdXJ2ZTogXCJjdWJpYy1iZXppZXIoMC4xOSwgMSwgMC4yMiwgMSlcIiwgdGltZTogLjcgfVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwiYmxhY2tcIlxuXHRcdG9wdGlvbnMuc2Nyb2xsID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvTGluayA/PSB0cnVlXG5cblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QGhpc3RvcnkgPSBbXVxuXG5cdFx0QG9uQ2hhbmdlIFwic3ViTGF5ZXJzXCIsIChjaGFuZ2VMaXN0KSA9PlxuXHRcdFx0dmlldyA9IGNoYW5nZUxpc3QuYWRkZWRbMF1cblx0XHRcdGlmIHZpZXc/XG5cdFx0XHRcdCMgZGVmYXVsdCBiZWhhdmlvcnMgZm9yIHZpZXdzXG5cdFx0XHRcdHZpZXcuY2xpcCA9IHRydWVcblx0XHRcdFx0dmlldy5vbiBFdmVudHMuQ2xpY2ssIC0+IHJldHVybiAjIHByZXZlbnQgY2xpY2stdGhyb3VnaC9idWJibGluZ1xuXHRcdFx0XHQjIGFkZCBzY3JvbGxjb21wb25lbnRcblx0XHRcdFx0aWYgQHNjcm9sbFxuXHRcdFx0XHRcdGNoaWxkcmVuID0gdmlldy5jaGlsZHJlblxuXHRcdFx0XHRcdHNjcm9sbENvbXBvbmVudCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdFx0XHRcdG5hbWU6IFwic2Nyb2xsQ29tcG9uZW50XCJcblx0XHRcdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0XHRcdFx0cGFyZW50OiB2aWV3XG5cdFx0XHRcdFx0c2Nyb2xsQ29tcG9uZW50LmNvbnRlbnQuYmFja2dyb3VuZENvbG9yID0gXCJcIlxuXHRcdFx0XHRcdGlmIHZpZXcud2lkdGggPD0gQHdpZHRoXG5cdFx0XHRcdFx0XHRzY3JvbGxDb21wb25lbnQuc2Nyb2xsSG9yaXpvbnRhbCA9IGZhbHNlXG5cdFx0XHRcdFx0aWYgdmlldy5oZWlnaHQgPD0gQGhlaWdodFxuXHRcdFx0XHRcdFx0c2Nyb2xsQ29tcG9uZW50LnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRcdFx0XHRmb3IgYyBpbiBjaGlsZHJlblxuXHRcdFx0XHRcdFx0Yy5wYXJlbnQgPSBzY3JvbGxDb21wb25lbnQuY29udGVudFxuXHRcdFx0XHRcdHZpZXcuc2Nyb2xsQ29tcG9uZW50ID0gc2Nyb2xsQ29tcG9uZW50ICMgbWFrZSBpdCBhY2Nlc3NpYmxlIGFzIGEgcHJvcGVydHlcblx0XHRcdFx0XHQjIHJlc2V0IHNpemUgc2luY2UgY29udGVudCBtb3ZlZCB0byBzY3JvbGxDb21wb25lbnQuIHByZXZlbnRzIHNjcm9sbCBidWcgd2hlbiBkcmFnZ2luZyBvdXRzaWRlLlxuXHRcdFx0XHRcdHZpZXcuc2l6ZSA9IHt3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHR9XG5cblx0XHR0cmFuc2l0aW9ucyA9XG5cdFx0XHRzd2l0Y2hJbnN0YW50OlxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdHRvOiB7eDogMCwgeTogMH1cblx0XHRcdGZhZGVJbjpcblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7b3BhY2l0eTogMH1cblx0XHRcdFx0XHR0bzoge29wYWNpdHk6IDF9XG5cdFx0XHR6b29tSW46XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3NjYWxlOiAwLjgsIG9wYWNpdHk6IDB9XG5cdFx0XHRcdFx0dG86IHtzY2FsZTogMSwgb3BhY2l0eTogMX1cblx0XHRcdHpvb21PdXQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHtzY2FsZTogMC44LCBvcGFjaXR5OiAwfVxuXHRcdFx0c2xpZGVJblVwOlxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHt5OiBAaGVpZ2h0fVxuXHRcdFx0XHRcdHRvOiB7eTogMH1cblx0XHRcdHNsaWRlSW5SaWdodDpcblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7eDogQHdpZHRofVxuXHRcdFx0XHRcdHRvOiB7eDogMH1cblx0XHRcdHNsaWRlSW5Eb3duOlxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHttYXhZOiAwfVxuXHRcdFx0XHRcdHRvOiB7eTogMH1cblx0XHRcdG1vdmVJblJpZ2h0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7bWF4WDogMH1cblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7eDogQHdpZHRofVxuXHRcdFx0XHRcdHRvOiB7eDogMH1cblx0XHRcdG1vdmVJbkxlZnQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHt4OiBAd2lkdGh9XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge21heFg6IDB9XG5cdFx0XHRcdFx0dG86IHt4OiAwfVxuXHRcdFx0c2xpZGVJbkxlZnQ6XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge21heFg6IDB9XG5cdFx0XHRcdFx0dG86IHttYXhYOiBAd2lkdGh9XG5cdFx0XHRwdXNoSW5SaWdodDpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge3g6IC0oQHdpZHRoLzUpLCBicmlnaHRuZXNzOiA3MH1cblx0XHRcdFx0bmV3Vmlldzpcblx0XHRcdFx0XHRmcm9tOiB7eDogQHdpZHRofVxuXHRcdFx0XHRcdHRvOiB7eDogMH1cblx0XHRcdHB1c2hJbkxlZnQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHt4OiBAd2lkdGgvNSwgYnJpZ2h0bmVzczogNzB9XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3g6IC1Ad2lkdGh9XG5cdFx0XHRcdFx0dG86IHt4OiAwfVxuXHRcdFx0cHVzaE91dFJpZ2h0OlxuXHRcdFx0XHRvbGRWaWV3OlxuXHRcdFx0XHRcdHRvOiB7eDogQHdpZHRofVxuXHRcdFx0XHRuZXdWaWV3OlxuXHRcdFx0XHRcdGZyb206IHt4OiAtKEB3aWR0aC81KSwgYnJpZ2h0bmVzczogNzB9XG5cdFx0XHRcdFx0dG86IHt4OiAwLCBicmlnaHRuZXNzOiAxMDB9XG5cdFx0XHRwdXNoT3V0TGVmdDpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge21heFg6IDB9XG5cdFx0XHRcdG5ld1ZpZXc6XG5cdFx0XHRcdFx0ZnJvbToge3g6IEB3aWR0aC81LCBicmlnaHRuZXNzOiA3MH1cblx0XHRcdFx0XHR0bzoge3g6IDAsIGJyaWdodG5lc3M6IDEwMH1cblx0XHRcdHNsaWRlT3V0VXA6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHttYXhZOiAwfVxuXHRcdFx0c2xpZGVPdXRSaWdodDpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge3g6IEB3aWR0aH1cblx0XHRcdHNsaWRlT3V0RG93bjpcblx0XHRcdFx0b2xkVmlldzpcblx0XHRcdFx0XHR0bzoge3k6IEBoZWlnaHR9XG5cdFx0XHRzbGlkZU91dExlZnQ6XG5cdFx0XHRcdG9sZFZpZXc6XG5cdFx0XHRcdFx0dG86IHttYXhYOiAwfVxuXG5cdFx0IyBzaG9ydGN1dHNcblx0XHR0cmFuc2l0aW9ucy5zbGlkZUluID0gdHJhbnNpdGlvbnMuc2xpZGVJblJpZ2h0XG5cdFx0dHJhbnNpdGlvbnMuc2xpZGVPdXQgPSB0cmFuc2l0aW9ucy5zbGlkZU91dFJpZ2h0XG5cdFx0dHJhbnNpdGlvbnMucHVzaEluID0gdHJhbnNpdGlvbnMucHVzaEluUmlnaHRcblx0XHR0cmFuc2l0aW9ucy5wdXNoT3V0ID0gdHJhbnNpdGlvbnMucHVzaE91dFJpZ2h0XG5cblx0XHQjIGV2ZW50c1xuXHRcdEV2ZW50cy5WaWV3V2lsbFN3aXRjaCA9IFwidmlld1dpbGxTd2l0Y2hcIlxuXHRcdEV2ZW50cy5WaWV3RGlkU3dpdGNoID0gXCJ2aWV3RGlkU3dpdGNoXCJcblx0XHRMYXllcjo6b25WaWV3V2lsbFN3aXRjaCA9IChjYikgLT4gQG9uKEV2ZW50cy5WaWV3V2lsbFN3aXRjaCwgY2IpXG5cdFx0TGF5ZXI6Om9uVmlld0RpZFN3aXRjaCA9IChjYikgLT4gQG9uKEV2ZW50cy5WaWV3RGlkU3dpdGNoLCBjYilcdFx0XG5cblx0XHRfLmVhY2ggdHJhbnNpdGlvbnMsIChhbmltUHJvcHMsIG5hbWUpID0+XG5cblx0XHRcdGlmIG9wdGlvbnMuYXV0b0xpbmtcblx0XHRcdFx0bGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpXG5cdFx0XHRcdGZvciBidG4gaW4gbGF5ZXJzXG5cdFx0XHRcdFx0aWYgXy5pbmNsdWRlcyBidG4ubmFtZSwgbmFtZVxuXHRcdFx0XHRcdFx0dmlld0NvbnRyb2xsZXIgPSBAXG5cdFx0XHRcdFx0XHRidG4ub25DbGljayAtPlxuXHRcdFx0XHRcdFx0XHRhbmltID0gQG5hbWUuc3BsaXQoJ18nKVswXVxuXHRcdFx0XHRcdFx0XHRsaW5rTmFtZSA9IEBuYW1lLnJlcGxhY2UoYW5pbSsnXycsJycpXG5cdFx0XHRcdFx0XHRcdGxpbmtOYW1lID0gbGlua05hbWUucmVwbGFjZSgvXFxkKy9nLCAnJykgIyByZW1vdmUgbnVtYmVyc1xuXHRcdFx0XHRcdFx0XHR2aWV3Q29udHJvbGxlclthbmltXSBfLmZpbmQobGF5ZXJzLCAobCkgLT4gbC5uYW1lIGlzIGxpbmtOYW1lKVxuXG5cdFx0XHRAW25hbWVdID0gKG5ld1ZpZXcsIGFuaW1hdGlvbk9wdGlvbnMgPSBAYW5pbWF0aW9uT3B0aW9ucykgPT5cblxuXHRcdFx0XHRyZXR1cm4gaWYgbmV3VmlldyBpcyBAY3VycmVudFZpZXdcblxuXG5cblx0XHRcdFx0IyBtYWtlIHN1cmUgdGhlIG5ldyBsYXllciBpcyBpbnNpZGUgdGhlIHZpZXdjb250cm9sbGVyXG5cdFx0XHRcdG5ld1ZpZXcucGFyZW50ID0gQFxuXHRcdFx0XHRuZXdWaWV3LnNlbmRUb0JhY2soKVxuXG5cdFx0XHRcdCMgcmVzZXQgcHJvcHMgaW4gY2FzZSB0aGV5IHdlcmUgY2hhbmdlZCBieSBhIHByZXYgYW5pbWF0aW9uXG5cdFx0XHRcdG5ld1ZpZXcucG9pbnQgPSB7eDowLCB5OiAwfVxuXHRcdFx0XHRuZXdWaWV3Lm9wYWNpdHkgPSAxXG5cdFx0XHRcdG5ld1ZpZXcuc2NhbGUgPSAxXG5cdFx0XHRcdG5ld1ZpZXcuYnJpZ2h0bmVzcyA9IDEwMFxuXHRcdFx0XHRcblx0XHRcdFx0IyBvbGRWaWV3XG5cdFx0XHRcdEBjdXJyZW50Vmlldz8ucG9pbnQgPSB7eDogMCwgeTogMH0gIyBmaXhlcyBvZmZzZXQgaXNzdWUgd2hlbiBtb3ZpbmcgdG9vIGZhc3QgYmV0d2VlbiBzY3JlZW5zXG5cdFx0XHRcdEBjdXJyZW50Vmlldz8ucHJvcHMgPSBhbmltUHJvcHMub2xkVmlldz8uZnJvbVxuXHRcdFx0XHRhbmltT2JqID0gXy5leHRlbmQge3Byb3BlcnRpZXM6IGFuaW1Qcm9wcy5vbGRWaWV3Py50b30sIGFuaW1hdGlvbk9wdGlvbnNcblx0XHRcdFx0Xy5kZWZhdWx0cyhhbmltT2JqLCB7IHByb3BlcnRpZXM6IHt9IH0pXG5cdFx0XHRcdG91dGdvaW5nID0gQGN1cnJlbnRWaWV3Py5hbmltYXRlIGFuaW1PYmpcblxuXHRcdFx0XHQjIG5ld1ZpZXdcblx0XHRcdFx0bmV3Vmlldy5wcm9wcyA9IGFuaW1Qcm9wcy5uZXdWaWV3Py5mcm9tXG5cdFx0XHRcdGluY29taW5nID0gbmV3Vmlldy5hbmltYXRlIF8uZXh0ZW5kIHtwcm9wZXJ0aWVzOiBhbmltUHJvcHMubmV3Vmlldz8udG99LCBhbmltYXRpb25PcHRpb25zXG5cdFx0XHRcdFxuXHRcdFx0XHQjIGxheWVyIG9yZGVyXG5cdFx0XHRcdGlmIF8uaW5jbHVkZXMgbmFtZSwgJ091dCdcblx0XHRcdFx0XHRuZXdWaWV3LnBsYWNlQmVoaW5kKEBjdXJyZW50Vmlldylcblx0XHRcdFx0XHRvdXRnb2luZy5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBAY3VycmVudFZpZXcuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdG5ld1ZpZXcucGxhY2VCZWZvcmUoQGN1cnJlbnRWaWV3KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRAZW1pdChFdmVudHMuVmlld1dpbGxTd2l0Y2gsIEBjdXJyZW50VmlldywgbmV3Vmlldylcblx0XHRcdFx0XG5cdFx0XHRcdCMgY2hhbmdlIEN1cnJlbnRWaWV3IGJlZm9yZSBhbmltYXRpb24gaGFzIGZpbmlzaGVkIHNvIG9uZSBjb3VsZCBnbyBiYWNrIGluIGhpc3Rvcnlcblx0XHRcdFx0IyB3aXRob3V0IGhhdmluZyB0byB3YWl0IGZvciB0aGUgdHJhbnNpdGlvbiB0byBmaW5pc2hcblx0XHRcdFx0QHNhdmVDdXJyZW50Vmlld1RvSGlzdG9yeSBuYW1lLCBvdXRnb2luZywgaW5jb21pbmdcblx0XHRcdFx0QGN1cnJlbnRWaWV3ID0gbmV3Vmlld1xuXHRcdFx0XHRAZW1pdChcImNoYW5nZTpwcmV2aW91c1ZpZXdcIiwgQHByZXZpb3VzVmlldylcblx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6Y3VycmVudFZpZXdcIiwgQGN1cnJlbnRWaWV3KVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgaW5jb21pbmcuaXNBbmltYXRpbmdcblx0XHRcdFx0XHRob29rID0gaW5jb21pbmcgXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRob29rID0gb3V0Z29pbmdcblx0XHRcdFx0aG9vay5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0XHRcdEBlbWl0KEV2ZW50cy5WaWV3RGlkU3dpdGNoLCBAcHJldmlvdXNWaWV3LCBAY3VycmVudFZpZXcpXG5cdFx0XHRcdFxuXG5cdFx0aWYgb3B0aW9ucy5pbml0aWFsVmlld05hbWU/XG5cdFx0XHRhdXRvSW5pdGlhbCA9IF8uZmluZCBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKCksIChsKSAtPiBsLm5hbWUgaXMgb3B0aW9ucy5pbml0aWFsVmlld05hbWVcblx0XHRcdGlmIGF1dG9Jbml0aWFsPyB0aGVuIEBzd2l0Y2hJbnN0YW50IGF1dG9Jbml0aWFsXG5cblx0XHRpZiBvcHRpb25zLmluaXRpYWxWaWV3P1xuXHRcdFx0QHN3aXRjaEluc3RhbnQgb3B0aW9ucy5pbml0aWFsVmlld1xuXG5cdFx0aWYgb3B0aW9ucy5iYWNrQnV0dG9uTmFtZT9cblx0XHRcdGJhY2tCdXR0b25zID0gXy5maWx0ZXIgRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpLCAobCkgLT4gXy5pbmNsdWRlcyBsLm5hbWUsIG9wdGlvbnMuYmFja0J1dHRvbk5hbWVcblx0XHRcdGZvciBidG4gaW4gYmFja0J1dHRvbnNcblx0XHRcdFx0YnRuLm9uQ2xpY2sgPT4gQGJhY2soKVxuXG5cdEBkZWZpbmUgXCJwcmV2aW91c1ZpZXdcIixcblx0XHRcdGdldDogLT4gQGhpc3RvcnlbMF0udmlld1xuXG5cdHNhdmVDdXJyZW50Vmlld1RvSGlzdG9yeTogKG5hbWUsb3V0Z29pbmdBbmltYXRpb24saW5jb21pbmdBbmltYXRpb24pIC0+XG5cdFx0QGhpc3RvcnkudW5zaGlmdFxuXHRcdFx0dmlldzogQGN1cnJlbnRWaWV3XG5cdFx0XHRhbmltYXRpb25OYW1lOiBuYW1lXG5cdFx0XHRpbmNvbWluZ0FuaW1hdGlvbjogaW5jb21pbmdBbmltYXRpb25cblx0XHRcdG91dGdvaW5nQW5pbWF0aW9uOiBvdXRnb2luZ0FuaW1hdGlvblxuXG5cdGJhY2s6IC0+XG5cdFx0cHJldmlvdXMgPSBAaGlzdG9yeVswXVxuXHRcdGlmIHByZXZpb3VzLnZpZXc/XG5cblx0XHRcdGlmIF8uaW5jbHVkZXMgcHJldmlvdXMuYW5pbWF0aW9uTmFtZSwgJ091dCdcblx0XHRcdFx0cHJldmlvdXMudmlldy5icmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRiYWNrSW4gPSBwcmV2aW91cy5vdXRnb2luZ0FuaW1hdGlvbi5yZXZlcnNlKClcblx0XHRcdG1vdmVPdXQgPSBwcmV2aW91cy5pbmNvbWluZ0FuaW1hdGlvbi5yZXZlcnNlKClcblxuXHRcdFx0YmFja0luLnN0YXJ0KClcblx0XHRcdG1vdmVPdXQuc3RhcnQoKVxuXG5cdFx0XHRAY3VycmVudFZpZXcgPSBwcmV2aW91cy52aWV3XG5cdFx0XHRAaGlzdG9yeS5zaGlmdCgpXG5cdFx0XHRtb3ZlT3V0Lm9uIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IEBjdXJyZW50Vmlldy5icmluZ1RvRnJvbnQoKVxuIiwiZXhwb3J0cy5TdGF0dXNCYXIgPSBjbGFzcyBpT1NTdGF0dXNCYXIgZXh0ZW5kcyBMYXllclxuXG5cdEhFSUdIVCA9IDIwXG5cdFdJRFRIID0gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGhcblx0TElHSFQgPSBcImxpZ2h0XCJcblx0REFSSyAgPSBcImRhcmtcIlxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnMpIC0+XG5cdFx0QG9wdGlvbnMgPz0ge31cblx0XHRAb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRALmhlaWdodCA9IEhFSUdIVFxuXHRcdEAud2lkdGggID0gV0lEVEhcblxuXHRcdHJldHVybiBpZiBuYXZpZ2F0b3Iuc3RhbmRhbG9uZVxuXHRcdCMgVGhpcyBjb2RlIGJlbG93IHNob3VsZG4ndCBiZSB1c2VkIGlmIGluIHN0YW5kYWxvbmUgbW9kZSBzaW5jZSBpdCBnZXRzIGluY2x1ZGVkIGF1dG9tYXRpY2FsbHlcblxuXHRcdEBvcHRpb25zLnNoYWRlID89IExJR0hUXG5cdFx0QG9wdGlvbnMuc2hhZGUgID0gTElHSFQgaWYgQG9wdGlvbnMuc2hhZGUgaXNudCBMSUdIVCBhbmQgQG9wdGlvbnMuc2hhZGUgaXNudCBEQVJLXG5cblx0XHRpbWdMZWZ0ICAgPSBcIm1vZHVsZXMvU3RhdHVzQmFyLWFzc2V0cy9zdGF0dXMtI3tAb3B0aW9ucy5zaGFkZX0tbGVmdC5wbmdcIlxuXHRcdGltZ01pZGRsZSA9IFwibW9kdWxlcy9TdGF0dXNCYXItYXNzZXRzL3N0YXR1cy0je0BvcHRpb25zLnNoYWRlfS1taWRkbGUucG5nXCJcblx0XHRpbWdSaWdodCAgPSBcIm1vZHVsZXMvU3RhdHVzQmFyLWFzc2V0cy9zdGF0dXMtI3tAb3B0aW9ucy5zaGFkZX0tcmlnaHQucG5nXCJcblxuXHRcdEBzdGF0dXNMZWZ0ICAgPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjogQCwgaW1hZ2U6IGltZ0xlZnQsICAgd2lkdGg6IDEzMC8yLCBoZWlnaHQ6IEhFSUdIVFxuXHRcdEBzdGF0dXNNaWRkbGUgPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjogQCwgaW1hZ2U6IGltZ01pZGRsZSwgd2lkdGg6IDEwOC8yLCBoZWlnaHQ6IEhFSUdIVCwgeDogKFdJRFRILzItMTA4LzIpLzJcblx0XHRAc3RhdHVzUmlnaHQgID0gbmV3IExheWVyIHN1cGVyTGF5ZXI6IEAsIGltYWdlOiBpbWdSaWdodCwgIHdpZHRoOiAxMzAvMiwgaGVpZ2h0OiBIRUlHSFQsIHg6IChXSURUSC0xMzApLzJcbiIsIiMgUmluZyBEYXNoYm9hcmQgY2xhc3NcbiNDcmVhdGVkIGJ5IEpvcmRhbiBCYXJraW4gLS0gUmluZyBJbmMuXG5cbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG4jZmF2b3JpdGUgYnV0dG9uIGNsYXNzXG5cblxuI3BhcmFtc1xuY2xhc3MgRmF2b3JpdGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIob3B0aW9ucylcblx0XHRAb24gRXZlbnRzLkNsaWNrLCBAY2xpY2tlZFxuXG5cdGNsaWNrZWQ6ICgpID0+XG5cdFx0aiA9ICgoKEBwYXJlbnQuaWQgLSAxMSkvNSkpLTFcblx0XHRAcGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudC5zZWFyY2hGb3JQcmVzc2VzKGopXG5jbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdHNsaWRlVGltZSA9IC4zXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdHN1cGVyKG9wYWNpdHk6IDEsIHdpZHRoOiAwLCBoZWlnaHQ6IDApXG5cdFx0c2lkZUJhciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDU0MFxuXHRcdFx0aGVpZ2h0OiAxMzM0XG5cdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9zaWRlYmFyIG1haW4ucG5nXCJcblx0XHRAc2lkZUJhciA9IHNpZGVCYXJcblx0XHRiYWNrZ3JvdW5kID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdHdpZHRoOiA3NTBcblx0XHRcdGhlaWdodDogMTMzNFxuXHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL1JpbmdBcHBfRGFzaGJvYXJkLnBuZ1wiXG5cdFx0QGJhY2tncm91bmQgPSBiYWNrZ3JvdW5kXG5cdFx0bGlzdCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHk6IDUzNVxuXHRcdFx0eDogMzNcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHdpZHRoOiA2ODJcblx0XHRcdGhlaWdodDogNzYzXG5cdFx0QGxpc3QgPSBsaXN0XG5cdFx0QGxpc3Quc2Nyb2xsSG9yaXpvbnRhbCA9IGZhbHNlXG5cblx0XHRlbnRyeVBob3RvcyA9IFtcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDBfQWNjZXB0ZWQucG5nXCIsXG5cdFx0XHRcdFx0ICBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDFfTWlzc2VkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDAzX01vdGlvbi5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAwNF9NaXNzZWQucG5nXCIsXG5cdFx0XHRcdFx0ICBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDVfTWlzc2VkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDA2X0FjY2VwdGVkLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDA3X01pc3NlZC5wbmdcIixcblx0XHRcdFx0XHQgIFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzLzJfMDAwMHNfMDAwOF9NaXNzZWQucG5nXCIsXG5cdFx0XHRcdFx0ICBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy8yXzAwMDBzXzAwMDlfRWxsaXBzZS0xLnBuZ1wiLFxuXHRcdFx0XHRcdCAgXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvMl8wMDAwc18wMDEwX01pc3NlZC5wbmdcIl1cblxuXHRcdGxheWVyTGlzdCA9IFtdXG5cdFx0Zm9yIGVudHJ5IGluIGVudHJ5UGhvdG9zXG5cdFx0XHRpbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0XHRpbWFnZTogZW50cnlcblx0XHRcdFx0d2lkdGg6IDc0N1xuXHRcdFx0XHRoZWlnaHQ6IDEwN1xuXHRcdFx0bGF5ZXJMaXN0LnB1c2ggaW1hZ2VcblxuXHRcdHdoYXRUb0RvID0gXCJvcGVuXCJcblx0XHRwYXJlbnRzID0gW11cblx0XHRidXR0b25zID0gW11cblx0XHRpY29uTGlzdCA9IFtdXG5cblx0XHRjb25zdHJhaW50V2lkdGggPSA0MDBcblx0XHRjb25zdHJhaW50SGVpZ2h0ID0gMTA3XG5cdFx0Zm9yIGogaW4gWzAuLmxheWVyTGlzdC5sZW5ndGgtMV1cblx0XHRcdGVudHJ5UGFyZW50ID0gbmV3IExheWVyXG5cdFx0XHRcdGZhdm9yaXRlZDogZmFsc2Vcblx0XHRcdFx0d2lkdGg6IDc0N1xuXHRcdFx0XHRpZGVudGlmaWVyOiBcIjFcIlxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvYmxhbmsucG5nXCJcblx0XHRcdFx0cGFyZW50OiBAbGlzdC5jb250ZW50XG5cdFx0XHRcdHk6aioxMDdcblx0XHRcdFx0aGVpZ2h0OiAxMDdcblx0XHRcdHBhcmVudHMucHVzaCBlbnRyeVBhcmVudFxuXHRcdFx0ZW50cnlQYXJlbnQuZmF2b3JpdGVkID0gZmFsc2Vcblx0XHRcdGNvbnN0cmFpbnRzID0gbmV3IExheWVyXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0cGFyZW50OiBlbnRyeVBhcmVudFxuXHRcdFx0XHR3aWR0aDogZW50cnlQYXJlbnQud2lkdGgrY29uc3RyYWludFdpZHRoXG5cdFx0XHRcdGhlaWdodDogY29uc3RyYWludEhlaWdodFxuXHRcdFx0XHR4Oi1jb25zdHJhaW50V2lkdGhcblx0XHRcdGljb25zID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogZW50cnlQYXJlbnRcblx0XHRcdFx0d2lkdGg6IDM1OFxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvbmV3IHRocmVlIGljb25zLnBuZ1wiXG5cdFx0XHRcdGhlaWdodDogY29uc3RyYWludEhlaWdodFxuXHRcdFx0XHR4OiAzMjRcblx0XHRcdGljb25zLnN0YXRlcy5hZGRcblx0XHRcdFx0b246XG5cdFx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL25ldyB0aHJlZSBpY29ucyBvbi5wbmdcIlxuXHRcdFx0XHRvZmY6XG5cdFx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL25ldyB0aHJlZSBpY29ucy5wbmdcIlxuXHRcdFx0aWNvbkxpc3QucHVzaCBpY29uc1xuXHRcdFx0ZmF2b3JpdGVCdXR0b24gPSBuZXcgRmF2b3JpdGVcblx0XHRcdFx0c3VwZXJMYXllcjogZW50cnlQYXJlbnRcblx0XHRcdFx0d2lkdGg6IDEwNVxuXHRcdFx0XHRoZWlnaHQ6IDk1XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0eDogMzc0XG5cdFx0XHRidXR0b25zLnB1c2ggZmF2b3JpdGVCdXR0b25cblx0XHRcdGxheWVyTGlzdFtqXS5wYXJlbnQgPSBlbnRyeVBhcmVudFxuXG5cdFx0XHRmYXZvcml0ZWRJY29uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogbGF5ZXJMaXN0W2pdXG5cdFx0XHRcdHdpZHRoOiA0N1xuXHRcdFx0XHRoZWlnaHQ6IDQ3XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL2dvbGRlbiBzdGFyLnBuZ1wiXG5cdFx0XHRcdHg6IDQ0XG5cdFx0XHRcdHk6IDMwXG5cdFx0XHRlbnRyeVBhcmVudC50eXBlID0gZW50cnlQYXJlbnQuY2hpbGRyZW5bM10uaW1hZ2Uuc3Vic3RyaW5nKDM4LCBlbnRyeVBhcmVudC5jaGlsZHJlblszXS5pbWFnZS5pbmRleE9mKFwiLlwiKSlcblxuXHRcdFx0bGF5ZXJMaXN0W2pdLm9uU3dpcGVMZWZ0IC0+XG5cdFx0XHRcdGxpc3Quc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdFx0XHRVdGlscy5kZWxheSBzbGlkZVRpbWUsIC0+XG5cdFx0XHRcdFx0bGlzdC5zY3JvbGxWZXJ0aWNhbCA9IHRydWVcblx0XHRcdFx0Zm9yIGkgaW4gWzAuLmxheWVyTGlzdC5sZW5ndGgtMV1cblx0XHRcdFx0XHRsYXllckxpc3RbaV0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0eDogMFxuXHRcdFx0XHRcdFx0dGltZTogc2xpZGVUaW1lXG5cdFx0XHRcdEBhbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHg6IC0xKmNvbnN0cmFpbnRXaWR0aFxuXHRcdFx0XHRcdHRpbWU6IHNsaWRlVGltZVxuXG5cdFx0XHRsYXllckxpc3Rbal0ub25Td2lwZVJpZ2h0IC0+XG5cdFx0XHRcdGxpc3Quc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdFx0XHRVdGlscy5kZWxheSBzbGlkZVRpbWUsIC0+XG5cdFx0XHRcdFx0bGlzdC5zY3JvbGxWZXJ0aWNhbCA9IHRydWVcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eDogMFxuXHRcdFx0XHRcdHRpbWU6IHNsaWRlVGltZVxuXG5cdFx0QHNlYXJjaEZvclByZXNzZXMgPSAobCkgLT5cblx0XHRcdGJ1dHRvbnNbbF0ucGFyZW50LmZhdm9yaXRlZCA9IG5vdCBidXR0b25zW2xdLnBhcmVudC5mYXZvcml0ZWRcblx0XHRcdGljb25MaXN0W2xdLnN0YXRlcy5uZXh0KFwib25cIixcIm9mZlwiKVxuXHRcdFx0YnV0dG9uc1tsXS5wYXJlbnQuY2hpbGRyZW5bM10uY2hpbGRyZW5bMF0ub3BhY2l0eSA9IGlmIGJ1dHRvbnNbbF0ucGFyZW50LmZhdm9yaXRlZCBpcyB0cnVlIHRoZW4gMSBlbHNlIDBcblx0XHRcdGxheWVyTGlzdFtsXS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eDogMFxuXHRcdFx0XHR0aW1lOiBzbGlkZVRpbWVcblxuI2RldmljZXNcblx0XHRkZXZpY2VzTWFzayA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAYmFja2dyb3VuZFxuXHRcdFx0eDogN1xuXHRcdFx0eTogMTQ1XG5cdFx0XHR3aWR0aDogNzc0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiZWNlY2VjXCJcblx0XHRcdGhlaWdodDogMzA1XG5cblx0XHRkZXZpY2VDb25zdHJhaW50cyA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0cGFyZW50OiBAYmFja2dyb3VuZFxuXHRcdFx0eTogMTYzXG5cdFx0XHR4OiAtMTY3XG5cdFx0XHRoZWlnaHQ6IDI4N1xuXHRcdFx0d2lkdGg6IDEwNzVcblxuXHRcdGRldmljZXMgPSBuZXcgTGF5ZXJcblx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9kZXZpY2UgbGlzdC5wbmdcIlxuXHRcdFx0cGFyZW50OiBAYmFja2dyb3VuZFxuXHRcdFx0eTogMTUwXG5cdFx0XHR3aWR0aDogODkyXG5cdFx0XHRoZWlnaHQ6IDMxM1xuXG5cdFx0ZGV2aWNlcy5kcmFnZ2FibGUuY29uc3RyYWludHMgPSBkZXZpY2VDb25zdHJhaW50c1xuXHRcdGRldmljZXMuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG5cdFx0ZGV2aWNlcy5kcmFnZ2FibGUudmVydGljYWwgPSBmYWxzZVxuXG4jZmlsdGVyc1xuXHRcdHNoaWZ0VGltZSA9IC4yXG5cblxuXHRcdHBvc2l0aW9ucyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDc1MFxuXHRcdFx0cGFyZW50OiBAYmFja2dyb3VuZFxuXHRcdFx0aGVpZ2h0OiAxMzM0XG5cdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvYWxsX2FjdGl2aXR5LnBuZ1wiXG5cdFx0XHR5OiAxXG5cblx0XHRwb3NpdGlvbnMuc3RhdGVzLmFkZFxuXHRcdFx0YWxsOlxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL2Rhc2hib2FyZC1pbWFnZXMvYWxsX2FjdGl2aXR5LnBuZ1wiXG5cdFx0XHRyaW5nczpcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9kYXNoYm9hcmQtaW1hZ2VzL3JpbmdzLnBuZ1wiXG5cdFx0XHRtb3Rpb246XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9tb3Rpb24ucG5nXCJcblxuXHRcdHJpbmdGaWx0ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHg6IDMxMlxuXHRcdFx0eTogNDY3XG5cdFx0XHRoZWlnaHQ6IDY4XG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRtb3Rpb25GaWx0ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHg6IDUxMlxuXHRcdFx0eTogNDY3XG5cdFx0XHRoZWlnaHQ6IDY4XG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRhbGxGaWx0ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHg6IDYxXG5cdFx0XHR5OiA0Njdcblx0XHRcdGhlaWdodDogNjhcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHdpZHRoOiAyNjRcblxuXHRcdHJpbmdGaWx0ZXIub25DbGljayAtPlxuXHRcdFx0ZmlsdGVyZWRQYXJlbnRzID0gcGFyZW50cy5maWx0ZXIgKHgpIC0+IHgudHlwZSBpcyBcIkFjY2VwdGVkXCIgb3IgeC50eXBlIGlzIFwiTWlzc2VkXCJcblx0XHRcdHJlZHJhd0xpc3QoZmlsdGVyZWRQYXJlbnRzLCBcInJpbmdzXCIpXG5cdFx0XHRVdGlscy5kZWxheSAuMSwgLT5cblx0XHRcdFx0cG9zaXRpb25zLnN0YXRlcy5zd2l0Y2goXCJyaW5nc1wiKVxuXHRcdFx0ZmlsdGVyU2xpZGVyLnN0YXRlcy5zd2l0Y2goXCJyaW5nc1wiKVxuXG5cdFx0bW90aW9uRmlsdGVyLm9uQ2xpY2sgLT5cblx0XHRcdGZpbHRlcmVkUGFyZW50cyA9IHBhcmVudHMuZmlsdGVyICh4KSAtPiB4LnR5cGUgaXMgXCJNb3Rpb25cIlxuXHRcdFx0cmVkcmF3TGlzdChmaWx0ZXJlZFBhcmVudHMsIFwibW90aW9uXCIpXG5cdFx0XHRVdGlscy5kZWxheSAuMSwgLT5cblx0XHRcdFx0cG9zaXRpb25zLnN0YXRlcy5zd2l0Y2goXCJtb3Rpb25cIilcblx0XHRcdGZpbHRlclNsaWRlci5zdGF0ZXMuc3dpdGNoKFwibW90aW9uXCIpXG5cblx0XHRhbGxGaWx0ZXIub25DbGljayAtPlxuXHRcdFx0ZmlsdGVyZWRQYXJlbnRzID0gcGFyZW50c1xuXHRcdFx0cmVkcmF3TGlzdChmaWx0ZXJlZFBhcmVudHMsIFwiYWxsXCIpXG5cdFx0XHRVdGlscy5kZWxheSAuMSwgLT5cblx0XHRcdFx0cG9zaXRpb25zLnN0YXRlcy5zd2l0Y2goXCJhbGxcIilcblx0XHRcdGZpbHRlclNsaWRlci5zdGF0ZXMuc3dpdGNoKFwiYWxsXCIpXG5cblx0XHRyZWRyYXdMaXN0ID0gKGlucHV0LCB0eXBlKSAtPlxuXHRcdFx0aWYgZmlsdGVyU2xpZGVyLnN0YXRlcy5jdXJyZW50IGlzbnQgdHlwZVxuXHRcdFx0XHRzdGFydEZyb20gPSAwXG5cdFx0XHRcdGlmIGZpbHRlclNsaWRlci5zdGF0ZXMuY3VycmVudCBpcyBcImFsbFwiXG5cdFx0XHRcdFx0c3RhcnRGcm9tID0gNzUwXG5cdFx0XHRcdGVsc2UgaWYgZmlsdGVyU2xpZGVyLnN0YXRlcy5jdXJyZW50IGlzIFwibW90aW9uXCJcblx0XHRcdFx0XHRzdGFydEZyb20gPSAtNzUwXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRzdGFydEZyb20gPSBpZiB0eXBlIGlzIFwiYWxsXCIgdGhlbiAtNzUwIGVsc2UgNzUwXG5cdFx0XHRcdEBsaXN0MiA9IGxpc3QuY29weSgpXG5cdFx0XHRcdEBsaXN0Mi5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHg6IC0xKnN0YXJ0RnJvbVxuXHRcdFx0XHRcdHRpbWU6IHNoaWZ0VGltZVxuXHRcdFx0XHRVdGlscy5kZWxheSBzaGlmdFRpbWUsIC0+IEBsaXN0Mi5kZXN0cm95KClcblx0XHRcdFx0bGlzdC54ID0gc3RhcnRGcm9tXG5cdFx0XHRcdGxpc3QuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR4OiAzM1xuXHRcdFx0XHRcdHRpbWU6IHNoaWZ0VGltZVxuXG5cdFx0XHRcdGZvciBpIGluIGxpc3QuY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRcdGkudmlzaWJsZSA9IGZhbHNlIGlmIGlucHV0LmluZGV4T2YoaSkgaXMgLTFcblx0XHRcdFx0XHRpLnZpc2libGUgPSB0cnVlIGlmIGlucHV0LmluZGV4T2YoaSkgaXNudCAtMVxuXG5cdFx0XHRcdGZvciBpIGluIFswLi4uaW5wdXQubGVuZ3RoXVxuXHRcdFx0XHRcdGlucHV0W2ldLnBhcmVudCA9IGxpc3QuY29udGVudFxuXHRcdFx0XHRcdGlucHV0W2ldLnkgPSAxMDcqaVxuXHRcdFx0XHRsaXN0LnNjcm9sbFRvUG9pbnQoXG5cdFx0XHRcdCAgICB4OiAwLCB5OiAwXG5cdFx0XHRcdCAgICB0cnVlXG5cdFx0XHRcdCAgICB0aW1lOiAuNVxuXHRcdFx0KVxuXHRcdFx0XHRzaXplID0gaW5wdXQubGVuZ3RoKjEwN1xuXHRcdFx0XHRsaXN0LnNjcm9sbFZlcnRpY2FsID0gaWYgc2l6ZTxsaXN0LmhlaWdodCB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdFx0XHRsaXN0LnVwZGF0ZUNvbnRlbnQoKVxuXG5cblx0XHRmaWx0ZXJTbGlkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHg6IDc1XG5cdFx0XHR5OiA1Mjlcblx0XHRcdHdpZHRoOiAyNDRcblx0XHRcdGhlaWdodDogNlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjE5OThkNVwiXG5cblx0XHRmaWx0ZXJTbGlkZXIuc3RhdGVzLmFkZFxuXHRcdFx0YWxsOlxuXHRcdFx0XHR3aWR0aDogMjQ0XG5cdFx0XHRcdHg6IDc1XG5cdFx0XHRyaW5nczpcblx0XHRcdFx0eDogMzM5XG5cdFx0XHRcdHdpZHRoOiAxNTFcblx0XHRcdG1vdGlvbjpcblx0XHRcdFx0eDogNTA0XG5cdFx0XHRcdHdpZHRoOiAxNjVcblxuXHRcdGZpbHRlclNsaWRlci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAuNFxuXG5cblxuXG5cdFx0I3NpZGViYXJcblx0XHRzaWRlQmFySWNvbiA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDEyNFxuXHRcdFx0aGVpZ2h0OiAxMjFcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRAc2lkZUJhckljb24gPSBzaWRlQmFySWNvblxuXHRcdEBzaWRlQmFySWNvbi5vbkNsaWNrIC0+IGRhc2hib2FyZFNsaWRpbmcoKVxuXHRcdGRhc2hCb2FyZENsaWNrT2ZmID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMjA3XG5cdFx0XHRoZWlnaHQ6IDEzMzRcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQGJhY2tncm91bmRcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0QGRhc2hCb2FyZENsaWNrT2ZmID0gZGFzaEJvYXJkQ2xpY2tPZmZcblx0XHRkYXNoYm9hcmRTbGlkaW5nID0gKCkgLT5cblx0XHRcdGlmIGJhY2tncm91bmQueCBpcyAwXG5cdFx0XHRcdGJhY2tncm91bmQuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR4OiA1NDBcblx0XHRcdFx0XHR0aW1lOiAuM1xuXHRcdFx0XHRkYXNoQm9hcmRDbGlja09mZi52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRkZXZpY2VzLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eDogMFxuXHRcdFx0XHRcdHRpbWU6IC4xXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGJhY2tncm91bmQuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR4OiAwXG5cdFx0XHRcdFx0dGltZTogLjNcblx0XHRcdFx0ZGFzaEJvYXJkQ2xpY2tPZmYudmlzaWJsZSA9IGZhbHNlXG5cblx0XHRTY3JlZW4ub25FZGdlU3dpcGVMZWZ0IC0+IGRhc2hib2FyZFNsaWRpbmcoKSBpZiBiYWNrZ3JvdW5kLnggaXMgMFxuXG5cdFx0QGRhc2hCb2FyZENsaWNrT2ZmLm9uQ2xpY2sgLT4gZGFzaGJvYXJkU2xpZGluZygpXG5cblx0XHRzaWRlYmFyU2Nyb2xsYWJsZSA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHBhcmVudDogQHNpZGVCYXJcblx0XHRcdHk6IDE3NlxuXHRcdFx0aGVpZ2h0OiAxMTU4XG5cdFx0XHR3aWR0aDogNTQwXG5cblx0XHRzaWRlYmFyU2Nyb2xsYWJsZS5vblN3aXBlTGVmdCAtPiBkYXNoYm9hcmRTbGlkaW5nKClcblx0XHRzaWRlYmFyU2Nyb2xsYWJsZS5jb250ZW50LmltYWdlID1cIm1vZHVsZXMvZGFzaGJvYXJkLWltYWdlcy9zY3JvbGxhYmxlX3NpZGViYXIucG5nXCJcblxuXHRcdHNpZGViYXJTY3JvbGxhYmxlLnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuIiwiY2xhc3MgQ2lyY3VsYXJQcm9ncmVzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOihvcHRpb25zKSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRALnN0cm9rZVdpZHRoID0gM1xuXHRcdEAuY2lyY2xlU2l6ZSA9IDEwMFxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdEAuY3JlYXRlRWxlbWVudCgpXG5cdGNyZWF0ZUVsZW1lbnQ6KCkgLT5cblx0XHRALmlubmVyQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogQC5jaXJjbGVTaXplXG5cdFx0XHRoZWlnaHQ6IEAuY2lyY2xlU2l6ZVxuXHRcdFx0c3VwZXJMYXllcjogQFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0QC5vdXRlckNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0d2lkdGg6IEAuY2lyY2xlU2l6ZVxuXHRcdFx0aGVpZ2h0OiBALmNpcmNsZVNpemVcblx0XHRcdHN1cGVyTGF5ZXI6IEBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdEAuaW5uZXJDaXJjbGUuY2VudGVyKClcblx0XHRALm91dGVyQ2lyY2xlLmNlbnRlcigpXG5cdFx0aGVhZGVyID0gICc8c3ZnIHdpZHRoPVwiMTAwcHhcIiBoZWlnaHQ9XCIxMDBweFwiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuICAgIDxkZWZzPjwvZGVmcz4nXG4gXHRmb290ZXIgPSAnPC9zdmc+J1xuXHRcdEAuaW5uZXJDaXJjbGUuaHRtbCA9IGhlYWRlciArICc8Y2lyY2xlIGlkPVwiY1wiIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQ4XCIgc3Ryb2tlPVwiIzNGM0YzRlwiIHN0cm9rZS13aWR0aD1cIicgKyBALnN0cm9rZVdpZHRoICsgJ1wiIGZpbGw9XCJub25lXCI+PC9jaXJjbGU+JyArIGZvb3RlclxuXHRcdEAub3V0ZXJDaXJjbGUuaHRtbCA9IGhlYWRlciArICc8Y2lyY2xlIGlkPVwicHJvZ3Jlc3Mtb3V0ZXItY2lyY2xlXCIgdHJhbnNmb3JtPVwicm90YXRlKDI3MCw1MCw1MClcIiBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0OFwiIHN0cm9rZT1cIiNmZmZcIiBzdHJva2Utd2lkdGg9XCInICsgQC5zdHJva2VXaWR0aCArICdcIiBmaWxsPVwibm9uZVwiPjwvY2lyY2xlPicgKyBmb290ZXJcblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0c2V0OiAodikgLT5cblx0XHRcdHN2Z1BhdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3Mtb3V0ZXItY2lyY2xlJylcblx0XHRcdHIgPSAoQC53aWR0aCAvIDIpXG5cdFx0XHRjID0gTWF0aC5QSSoocioyKTtcblx0XHRcdHBjdCA9ICgxIC0gdikqYztcblx0XHRcdHN2Z1BhdGguc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY1xuXHRcdFx0c3ZnUGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGN0XG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6KG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdG9wdGlvbnMgPz0ge31cblx0XHRALndpZHRoID0gU2NyZWVuLndpZHRoXG5cdFx0QC5oZWlnaHQgPSAgU2NyZWVuLmhlaWdodFxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJibGFja1wiXG5cdFx0QC5pbWFnZXNMb2FkZWQgPSAwXG5cdFx0QC5vbmxvYWQgPSBvcHRpb25zLm9ubG9hZFxuXHRcdEAuaW1hZ2VzID0gW11cblx0XHRALnByb2dyZXNzID0gbmV3IENpcmN1bGFyUHJvZ3Jlc3Ncblx0XHRcdHdpZHRoOiAxMDBcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHRzdXBlckxheWVyOiBAXG5cdFx0QC5wcm9ncmVzcy5jZW50ZXIoKVxuXHRcdEAucHJvZ3Jlc3MudmFsdWUgPSAwXG5cdGFkZEltYWdlOihzcmMpIC0+XG5cdFx0QC5pbWFnZXMucHVzaChzcmMpXG5cdGFkZEZyYW1lckltYWdlczooKSAtPlxuXHRcdGZvciBsYXllciBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVyc1xuXHRcdFx0aWYgbGF5ZXIuaW1hZ2Vcblx0XHRcdFx0QC5pbWFnZXMucHVzaChsYXllci5pbWFnZSlcblx0bG9hZDooKSAtPlxuXHRcdEAuYWRkRnJhbWVySW1hZ2VzKClcblx0XHRmb3Igc3JjIGluIEAuaW1hZ2VzXG5cdFx0XHRpbWFnZSA9IG5ldyBJbWFnZSgpXG5cdFx0XHRpbWFnZS5vbmxvYWQgPSA9PiBALmltYWdlRGlkTG9hZCgpXG5cdFx0XHRpbWFnZS5vbmVycm9yID0gPT4gQC5pbWFnZURpZExvYWQoKVxuXHRcdFx0aW1hZ2Uuc3JjID0gc3JjXG5cdGltYWdlRGlkTG9hZDooKSAtPlxuXHRcdEAuaW1hZ2VzTG9hZGVkKytcblx0XHRALnByb2dyZXNzLnZhbHVlID0gQC5pbWFnZXNMb2FkZWQgLyBALmltYWdlcy5sZW5ndGhcblx0XHRpZiBALmltYWdlc0xvYWRlZCA+PSBALmltYWdlcy5sZW5ndGhcblx0XHRcdEAuZmluaXNoZWRMb2FkKClcblx0ZmluaXNoZWRMb2FkOigpIC0+XG5cdFx0QC5vbmxvYWQoKSBpZiBALm9ubG9hZFxuXHRcdEAuZGVzdHJveSgpXG4iLCJcbkZyYW1lci5EZWZhdWx0cy5BbmltYXRpb24gPSBjdXJ2ZTogXCJzcHJpbmcoMzAwLDMwLDApXCJcblxud2hpdGVcdD0gXCJGRkZGRkZcIlxuc2lsdmVyXHQ9IFwiRUVFRUVFXCJcbmFjdGl2ZVx0PSBcIjE2OThkNlwiXG50b2dnbGVTaXplID0gMTAwXG50b2dnbGVSYWRpdXMgPSB0b2dnbGVTaXplIC8gMlxudGh1bWJTaXplID0gdG9nZ2xlU2l6ZSAvIDEuNzVcbnRodW1iR3JvdyA9IHRodW1iU2l6ZSAqIDAuMlxuY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLndpZHRoID0gdG9nZ2xlU2l6ZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gdGh1bWJTaXplXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPSB0b2dnbGVSYWRpdXNcblx0XHRvcHRpb25zLnNoYWRvd1NwcmVhZCA9IHRvZ2dsZVNpemUgLyA1MFxuXHRcdG9wdGlvbnMuc2hhZG93Q29sb3IgPSBzaWx2ZXJcblx0XHRvcHRpb25zLmNsaXAgPSBmYWxzZVxuXHRcdHN1cGVyKG9wdGlvbnMpXG5cdFx0QGJhY2tncm91bmQgPSBuZXcgVG9nZ2xlQmFja2dyb3VuZFxuXHRcdEB0aHVtYiA9IG5ldyBUaHVtYlxuXHRcdEBzdGF0ZXMuYWRkXG5cdFx0XHRvZmY6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc2lsdmVyXG5cdFx0XHRcdHNoYWRvd0NvbG9yOiBzaWx2ZXJcblx0XHRcdG9uOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZVxuXHRcdFx0XHRzaGFkb3dDb2xvcjogYWN0aXZlXG5cdFx0XHRvZmZUb3VjaDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzaWx2ZXJcblx0XHRcdG9uVG91Y2g6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc2lsdmVyXG5cdFx0QHN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdGNvbG9yTW9kZWw6IFwicmdiXCJcblx0XHRcdGN1cnZlOiBcImxpbmVhclwiXG5cdFx0XHR0aW1lOiAwLjJcblx0XHRAc3RhdGVzLnN3aXRjaEluc3RhbnQoXCJvZmZcIilcblx0XHRAYWRkU3ViTGF5ZXIgQGJhY2tncm91bmRcblx0XHRAYWRkU3ViTGF5ZXIgQHRodW1iXG5cdFx0QG9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0aWYgQHRodW1iLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJvZmZcIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVzLnN3aXRjaChcIm9mZlRvdWNoXCIpXG5cdFx0XHRcdEBzdGF0ZXMuc3dpdGNoKFwib2ZmVG91Y2hcIilcblx0XHRcdFx0QGJhY2tncm91bmQuc3RhdGVzLnN3aXRjaChcIm9mZlwiKVxuXHRcdFx0aWYgQHRodW1iLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZXMuc3dpdGNoKFwib25Ub3VjaFwiKVxuXHRcdEBvbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRpZiBAdGh1bWIuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm9mZlRvdWNoXCJcblx0XHRcdFx0QHRodW1iLnN0YXRlcy5zd2l0Y2goXCJvblwiKVxuXHRcdFx0XHRAc3RhdGVzLnN3aXRjaChcIm9uXCIpXG5cdFx0XHRpZiBAdGh1bWIuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm9uVG91Y2hcIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVzLnN3aXRjaChcIm9mZlwiKVxuXHRcdFx0XHRAc3RhdGVzLnN3aXRjaChcIm9mZlwiKVxuXHRcdFx0XHRAYmFja2dyb3VuZC5zdGF0ZXMuc3dpdGNoKFwib25cIilcbmNsYXNzIFRvZ2dsZUJhY2tncm91bmQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLndpZHRoID0gdG9nZ2xlU2l6ZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID0gdGh1bWJTaXplXG5cdFx0b3B0aW9ucy5ib3JkZXJSYWRpdXMgPSB0b2dnbGVSYWRpdXNcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IHdoaXRlXG5cdFx0c3VwZXIob3B0aW9ucylcblx0XHRAc3RhdGVzLmFkZFxuXHRcdFx0b2ZmOlxuXHRcdFx0XHRzY2FsZTogMFxuXHRcdFx0b246XG5cdFx0XHRcdHNjYWxlOiAxXG5cdFx0QHN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdGNvbG9yTW9kZWw6IFwicmdiXCJcblx0XHRcdGN1cnZlOiBcImxpbmVhclwiXG5cdFx0XHR0aW1lOiAwLjJcbmNsYXNzIFRodW1iIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy54ID0gMFxuXHRcdG9wdGlvbnMueSA9IDBcblx0XHRvcHRpb25zLmJvcmRlclJhZGl1cyA9IHRvZ2dsZVJhZGl1c1xuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gd2hpdGVcblx0XHRvcHRpb25zLmhlaWdodCA9IHRodW1iU2l6ZVxuXHRcdG9wdGlvbnMuc2hhZG93WSA9IHRvZ2dsZVNpemUgLyA2MFxuXHRcdG9wdGlvbnMuc2hhZG93Qmx1ciA9IHRvZ2dsZVNpemUgLyA0MFxuXHRcdG9wdGlvbnMuc2hhZG93U3ByZWFkID0gdG9nZ2xlU2l6ZSAvIDEwMFxuXHRcdG9wdGlvbnMuc2hhZG93Q29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdFx0c3VwZXIob3B0aW9ucylcblx0XHRAc3RhdGVzLmFkZFxuXHRcdFx0b2ZmOlxuXHRcdFx0XHR3aWR0aDogdGh1bWJTaXplLCB4OiAwXG5cdFx0XHRvbjpcblx0XHRcdFx0d2lkdGg6IHRodW1iU2l6ZSwgeDogdG9nZ2xlU2l6ZSAtIHRodW1iU2l6ZVxuXHRcdFx0b2ZmVG91Y2g6XG5cdFx0XHRcdHdpZHRoOiB0aHVtYlNpemUgKyB0aHVtYkdyb3dcblx0XHRcdG9uVG91Y2g6XG5cdFx0XHRcdHdpZHRoOiB0aHVtYlNpemUgKyB0aHVtYkdyb3dcblx0XHRcdFx0eDogdG9nZ2xlU2l6ZSAtIHRodW1iU2l6ZSAtIHRodW1iR3Jvd1xuXHRcdEBzdGF0ZXMuc3dpdGNoSW5zdGFudChcIm9mZlwiKVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89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
