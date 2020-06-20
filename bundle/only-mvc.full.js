(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("ReactDOM")) : factory(root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/Controller.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ControllerMeta_1 = __webpack_require__("./lib/ControllerMeta.ts");
class Controller {
    constructor(model) {
        this.model = model;
        this.initModelEvents();
    }
    initModelEvents() {
        const listeners = ControllerMeta_1.getListeners(this);
        const modelListeners = listeners.filter(listener => ControllerMeta_1.isModelListener(listener));
        for (const listener of modelListeners) {
            const eventType = listener.eventType;
            this.model.on(eventType, (...args) => {
                listener.handler(...args);
            });
        }
    }
}
exports.Controller = Controller;


/***/ }),

/***/ "./lib/ControllerMeta.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isDomListener = exports.isModelListener = exports.getListeners = exports.arg = exports.on = void 0;
function on(eventType, selector) {
    return (target, methodName, descriptor) => {
        if (!target._listenersMeta) {
            target._listenersMeta = [];
        }
        const meta = {
            eventType,
            selector,
            methodName
        };
        target._listenersMeta.push(meta);
    };
}
exports.on = on;
function arg(firstKey, secondKey, ...otherPropertyPath) {
    return (target, methodName, argumentIndex) => {
        if (!target._handlersArguments) {
            target._handlersArguments = [];
        }
        const handlerArgs = {
            methodName,
            argumentIndex,
            eventPropertyPath: []
        };
        if (typeof firstKey === "string") {
            const propertyPath = [
                firstKey
            ];
            if (secondKey) {
                propertyPath.push(secondKey);
            }
            if (otherPropertyPath.length) {
                propertyPath.push(...otherPropertyPath);
            }
            handlerArgs.eventPropertyPath = propertyPath;
        }
        else {
            const ModelConstructor = firstKey;
            handlerArgs.eventPropertyPath = ModelConstructor;
        }
        target._handlersArguments.push(handlerArgs);
    };
}
exports.arg = arg;
function getListeners(controller) {
    const proto = controller.constructor.prototype;
    const listenersMeta = (proto._listenersMeta || []);
    const listeners = [];
    for (const listenerMeta of listenersMeta) {
        const handler = controller[listenerMeta.methodName].bind(controller);
        const handlerArgs = findHandlerArguments(controller, listenerMeta.methodName);
        const listener = {
            eventType: listenerMeta.eventType,
            selector: listenerMeta.selector,
            handlerArgs,
            handler
        };
        listeners.push(listener);
    }
    return listeners;
}
exports.getListeners = getListeners;
function findHandlerArguments(controller, methodName) {
    const proto = controller.constructor.prototype;
    const handlersArguments = proto._handlersArguments || [];
    const handlerArgs = handlersArguments
        .filter(someArgs => someArgs.methodName === methodName)
        .sort((a, b) => a.argumentIndex - b.argumentIndex)
        .map(someArgs => someArgs.eventPropertyPath);
    return handlerArgs;
}
function isModelListener(listener) {
    return (listener.eventType === "change" &&
        listener.selector === "model");
}
exports.isModelListener = isModelListener;
function isDomListener(listener) {
    return !isModelListener(listener);
}
exports.isDomListener = isDomListener;


/***/ }),

/***/ "./lib/DOMEvents.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMEvents = void 0;
const DOMListener_1 = __webpack_require__("./lib/DOMListener.ts");
const ControllerMeta_1 = __webpack_require__("./lib/ControllerMeta.ts");
class DOMEvents {
    addController(controller, view) {
        const listeners = ControllerMeta_1.getListeners(controller);
        for (const listener of listeners) {
            this.addListener(listener, view);
        }
    }
    addListener(listener, view) {
        if (!ControllerMeta_1.isDomListener(listener)) {
            return;
        }
        const domListener = new DOMListener_1.DOMListener({
            eventType: listener.eventType,
            selector: listener.selector,
            handlerArgs: listener.handlerArgs,
            handler: listener.handler,
            view
        });
        domListener.listen();
    }
}
exports.DOMEvents = DOMEvents;


/***/ }),

/***/ "./lib/DOMListener.ts":
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
exports.DOMListener = void 0;
const ReactDOM = __importStar(__webpack_require__("react-dom"));
const isValidTarget_1 = __webpack_require__("./lib/utils/isValidTarget.ts");
const getPropertyFromEvent_1 = __webpack_require__("./lib/utils/getPropertyFromEvent.ts");
const getNearestModelByEvent_1 = __webpack_require__("./lib/utils/getNearestModelByEvent.ts");
class DOMListener {
    constructor(params) {
        this.eventType = params.eventType;
        this.selector = params.selector;
        this.handlerArgs = params.handlerArgs;
        this.handler = params.handler;
        this.view = params.view;
    }
    listen() {
        document.addEventListener(this.eventType, (event) => {
            this.onDOMEvent(event);
        });
    }
    onDOMEvent(event) {
        if (this.isValidEvent(event)) {
            const args = this.getHandlerArgs(event);
            this.handler(...args);
        }
    }
    isValidEvent(event) {
        const componentEl = ReactDOM.findDOMNode(this.view);
        const thisIsValidTarget = isValidTarget_1.isValidTarget({
            componentEl,
            selector: this.selector,
            target: event.target,
        });
        return thisIsValidTarget;
    }
    getHandlerArgs(event) {
        const args = this.handlerArgs.map((eventPropertyPath) => {
            if (typeof eventPropertyPath === "function") {
                const ModelConstructor = eventPropertyPath;
                const model = getNearestModelByEvent_1.getNearestModelByEvent(event, ModelConstructor);
                if (!model) {
                    throw new Error("cannot find model: " + ModelConstructor.name);
                }
                return model;
            }
            else {
                const argValue = getPropertyFromEvent_1.getPropertyFromEvent(event, eventPropertyPath);
                return argValue;
            }
        });
        return args;
    }
}
exports.DOMListener = DOMListener;


/***/ }),

/***/ "./lib/Model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const events_1 = __webpack_require__("./node_modules/events/events.js");
class Model extends events_1.EventEmitter {
    set(props, options = {}) {
        const changes = {};
        let hasChanges = false;
        for (const key in props) {
            const newValue = props[key];
            const oldValue = this[key];
            if (newValue !== oldValue) {
                hasChanges = true;
                this[key] = newValue;
                changes[key] = newValue;
            }
        }
        if (hasChanges) {
            this.emit("change", changes, options);
        }
    }
    on(event, handler) {
        return super.on(event, handler);
    }
}
exports.Model = Model;


/***/ }),

/***/ "./lib/View.ts":
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
exports.View = void 0;
const React = __importStar(__webpack_require__("react"));
const ReactDOM = __importStar(__webpack_require__("react-dom"));
const DOMEvents_1 = __webpack_require__("./lib/DOMEvents.ts");
const domEvents = new DOMEvents_1.DOMEvents();
class View extends React.Component {
    constructor(props) {
        super(props);
        this.initModel(props.model);
        this.createControllers();
    }
    createControllers() {
        const Constructors = this.controllers();
        this.controllersInstances = [];
        for (const Constructor of Constructors) {
            const controller = this.createController(Constructor);
            this.controllersInstances.push(controller);
        }
    }
    createController(ControllerConstructor) {
        const controller = new ControllerConstructor(this.model);
        domEvents.addController(controller, this);
        return controller;
    }
    initModel(model) {
        this.model = model;
        this.model.on("change", (changes) => {
            this.setState({ changes });
        });
    }
    render() {
        return this.template(this.model);
    }
    componentDidMount() {
        const rootEl = ReactDOM.findDOMNode(this);
        rootEl._model = this.model;
    }
    controllers() {
        return [];
    }
}
exports.View = View;


/***/ }),

/***/ "./lib/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arg = exports.on = void 0;
const ControllerMeta_1 = __webpack_require__("./lib/ControllerMeta.ts");
Object.defineProperty(exports, "on", { enumerable: true, get: function () { return ControllerMeta_1.on; } });
Object.defineProperty(exports, "arg", { enumerable: true, get: function () { return ControllerMeta_1.arg; } });
__exportStar(__webpack_require__("./lib/Model.ts"), exports);
__exportStar(__webpack_require__("./lib/View.ts"), exports);
__exportStar(__webpack_require__("./lib/Controller.ts"), exports);


/***/ }),

/***/ "./lib/utils/getNearestModelByEvent.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearestModelByEvent = void 0;
function getNearestModelByEvent(event, ModelConstructor) {
    let parent = event.target;
    while (parent) {
        const model = parent._model;
        if (model instanceof ModelConstructor) {
            return model;
        }
        parent = parent.parentElement;
    }
    return null;
}
exports.getNearestModelByEvent = getNearestModelByEvent;


/***/ }),

/***/ "./lib/utils/getPropertyFromEvent.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyFromEvent = void 0;
function getPropertyFromEvent(event, propertyPath) {
    let eventPropertyValue = event;
    for (const key of propertyPath) {
        eventPropertyValue = eventPropertyValue[key];
    }
    return eventPropertyValue;
}
exports.getPropertyFromEvent = getPropertyFromEvent;


/***/ }),

/***/ "./lib/utils/isValidTarget.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTarget = void 0;
function isValidTarget(params) {
    let parent = params.target;
    let insideComponent = false;
    let insideSelector = false;
    while (parent) {
        if ("." + parent.className === params.selector) {
            insideSelector = true;
        }
        if (parent === params.componentEl) {
            insideComponent = true;
            break;
        }
        parent = parent.parentElement;
    }
    return (insideComponent &&
        insideSelector);
}
exports.isValidTarget = isValidTarget;


/***/ }),

/***/ "./node_modules/events/events.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ });
});
//# sourceMappingURL=only-mvc.full.js.map