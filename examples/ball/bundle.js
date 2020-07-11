/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/ball/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__("react"));
const ReactDOM = __importStar(__webpack_require__("react-dom"));
const scene_1 = __webpack_require__("./examples/ball/scene/index.ts");
const sceneModel = new scene_1.SceneModel();
ReactDOM.render(React.createElement(scene_1.SceneView, { model: sceneModel }), document.getElementById("root"));


/***/ }),

/***/ "./examples/ball/scene/Scene.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/ball/scene/Scene.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./examples/ball/scene/SceneModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const ball_1 = __webpack_require__("./examples/ball/scene/ball/index.ts");
class SceneModel extends mvc_tsx_1.Model {
    constructor() {
        super(...arguments);
        this.width = 0;
        this.height = 0;
        this.ball = new ball_1.BallModel();
    }
}
exports.SceneModel = SceneModel;


/***/ }),

/***/ "./examples/ball/scene/SceneView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneView = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const react_1 = __importDefault(__webpack_require__("react"));
const ball_1 = __webpack_require__("./examples/ball/scene/ball/index.ts");
__webpack_require__("./examples/ball/scene/Scene.css");
class SceneView extends mvc_tsx_1.View {
    template(scene) {
        return react_1.default.createElement("div", { className: "Scene", style: {
                width: scene.width + "px",
                height: scene.height + "px"
            } },
            react_1.default.createElement(ball_1.BallView, { model: scene.ball }));
    }
}
exports.SceneView = SceneView;


/***/ }),

/***/ "./examples/ball/scene/ball/Ball.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/ball/scene/ball/Ball.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./examples/ball/scene/ball/BallModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BallModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class BallModel extends mvc_tsx_1.Model {
    constructor() {
        super(...arguments);
        this.color = "red";
        this.radius = 30;
        this.x = 0;
        this.y = 0;
        this.captured = false;
    }
    setCapture(newCapturedState) {
        const ball = this;
        ball.set({
            captured: newCapturedState
        });
    }
    setPosition(x, y) {
        const ball = this;
        ball.set({
            x, y
        });
    }
    getDiameter() {
        return this.radius * 2;
    }
}
exports.BallModel = BallModel;


/***/ }),

/***/ "./examples/ball/scene/ball/BallView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallView = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const react_1 = __importDefault(__webpack_require__("react"));
__webpack_require__("./examples/ball/scene/ball/Ball.css");
class BallView extends mvc_tsx_1.View {
    template(ball) {
        return react_1.default.createElement("div", { className: "Ball", style: {
                backgroundColor: ball.color,
                width: ball.radius * 2 + "px",
                height: ball.radius * 2 + "px",
                left: ball.x + "px",
                top: ball.y + "px"
            } });
    }
}
exports.BallView = BallView;


/***/ }),

/***/ "./examples/ball/scene/ball/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BallView = exports.BallModel = void 0;
const BallModel_1 = __webpack_require__("./examples/ball/scene/ball/BallModel.ts");
Object.defineProperty(exports, "BallModel", { enumerable: true, get: function () { return BallModel_1.BallModel; } });
const BallView_1 = __webpack_require__("./examples/ball/scene/ball/BallView.tsx");
Object.defineProperty(exports, "BallView", { enumerable: true, get: function () { return BallView_1.BallView; } });


/***/ }),

/***/ "./examples/ball/scene/controllers/DragDropController.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDropController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const SceneView_1 = __webpack_require__("./examples/ball/scene/SceneView.tsx");
const ball_1 = __webpack_require__("./examples/ball/scene/ball/index.ts");
let DragDropController = class DragDropController extends mvc_tsx_1.Controller {
    constructor() {
        super(...arguments);
        this.startBallPosition = {
            x: 0,
            y: 0
        };
        this.startMousePosition = {
            x: 0,
            y: 0
        };
    }
    onDragStart(mouseX, mouseY) {
        this.startMousePosition = {
            x: mouseX,
            y: mouseY
        };
        const scene = this.model;
        const ball = scene.ball;
        this.startBallPosition = {
            x: ball.x,
            y: ball.y
        };
        ball.setCapture(true);
    }
    onMove(currentMouseX, currentMouseY) {
        const scene = this.model;
        const ball = scene.ball;
        if (!ball.captured) {
            return;
        }
        const mouseDeltaX = currentMouseX - this.startMousePosition.x;
        const mouseDeltaY = currentMouseY - this.startMousePosition.y;
        let x = this.startBallPosition.x + mouseDeltaX;
        x = fixBounds(x, scene.width, ball.getDiameter());
        let y = this.startBallPosition.y + mouseDeltaY;
        y = fixBounds(y, scene.height, ball.getDiameter());
        ball.setPosition(x, y);
    }
    onDrop() {
        const scene = this.model;
        const ball = scene.ball;
        ball.setCapture(false);
    }
};
__decorate([
    mvc_tsx_1.on("mousedown", ball_1.BallView),
    __param(0, mvc_tsx_1.event("clientX")),
    __param(1, mvc_tsx_1.event("clientY")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DragDropController.prototype, "onDragStart", null);
__decorate([
    mvc_tsx_1.on("mousemove", "window"),
    __param(0, mvc_tsx_1.event("clientX")),
    __param(1, mvc_tsx_1.event("clientY")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DragDropController.prototype, "onMove", null);
__decorate([
    mvc_tsx_1.on("mouseup", "window"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DragDropController.prototype, "onDrop", null);
DragDropController = __decorate([
    mvc_tsx_1.forView(SceneView_1.SceneView)
], DragDropController);
exports.DragDropController = DragDropController;
function fixBounds(coordinate, sceneSize, ballDiameter) {
    coordinate = Math.max(0, coordinate);
    coordinate = Math.min(coordinate, sceneSize - ballDiameter);
    return coordinate;
}


/***/ }),

/***/ "./examples/ball/scene/controllers/GravityController.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GravityController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const __1 = __webpack_require__("./examples/ball/scene/index.ts");
const SceneView_1 = __webpack_require__("./examples/ball/scene/SceneView.tsx");
let GravityController = class GravityController extends mvc_tsx_1.Controller {
    constructor(scene) {
        super(scene);
        this.createInterval();
    }
    createInterval() {
        setInterval(() => {
            this.processBallGravity();
        }, 30);
    }
    processBallGravity() {
        const scene = this.model;
        const ball = scene.ball;
        if (ball.captured) {
            return;
        }
        const maxY = scene.height - ball.getDiameter();
        const newY = Math.min(ball.y + 10, maxY);
        ball.setPosition(ball.x, newY);
    }
};
GravityController = __decorate([
    mvc_tsx_1.forView(SceneView_1.SceneView),
    __metadata("design:paramtypes", [__1.SceneModel])
], GravityController);
exports.GravityController = GravityController;


/***/ }),

/***/ "./examples/ball/scene/controllers/SceneSizeController.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneSizeController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const SceneView_1 = __webpack_require__("./examples/ball/scene/SceneView.tsx");
let SceneSizeController = class SceneSizeController extends mvc_tsx_1.Controller {
    onResizeWindow() {
        const scene = this.model;
        scene.set({
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        });
    }
};
__decorate([
    mvc_tsx_1.on("load", "window"),
    mvc_tsx_1.on("resize", "window"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SceneSizeController.prototype, "onResizeWindow", null);
SceneSizeController = __decorate([
    mvc_tsx_1.forView(SceneView_1.SceneView)
], SceneSizeController);
exports.SceneSizeController = SceneSizeController;


/***/ }),

/***/ "./examples/ball/scene/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GravityController = exports.DragDropController = exports.SceneSizeController = exports.SceneView = exports.SceneModel = void 0;
const SceneModel_1 = __webpack_require__("./examples/ball/scene/SceneModel.ts");
Object.defineProperty(exports, "SceneModel", { enumerable: true, get: function () { return SceneModel_1.SceneModel; } });
const SceneView_1 = __webpack_require__("./examples/ball/scene/SceneView.tsx");
Object.defineProperty(exports, "SceneView", { enumerable: true, get: function () { return SceneView_1.SceneView; } });
const SceneSizeController_1 = __webpack_require__("./examples/ball/scene/controllers/SceneSizeController.ts");
Object.defineProperty(exports, "SceneSizeController", { enumerable: true, get: function () { return SceneSizeController_1.SceneSizeController; } });
const DragDropController_1 = __webpack_require__("./examples/ball/scene/controllers/DragDropController.ts");
Object.defineProperty(exports, "DragDropController", { enumerable: true, get: function () { return DragDropController_1.DragDropController; } });
const GravityController_1 = __webpack_require__("./examples/ball/scene/controllers/GravityController.ts");
Object.defineProperty(exports, "GravityController", { enumerable: true, get: function () { return GravityController_1.GravityController; } });


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/ball/scene/Scene.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Scene {\n    position: fixed;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/ball/scene/ball/Ball.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Ball {\n    position: fixed;\n    border-radius: 100%;\n    cursor: pointer;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./examples/ball/index.tsx");


/***/ }),

/***/ "mvc-tsx":
/***/ (function(module, exports) {

module.exports = MVC;

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map