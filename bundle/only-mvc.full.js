(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("EventEmitterModule"), require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["EventEmitterModule", "React", "ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("EventEmitterModule"), require("React"), require("ReactDOM")) : factory(root["EventEmitterModule"], root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_events__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
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
const Meta_1 = __webpack_require__("./lib/Meta.ts");
class Controller {
    constructor(model) {
        this.modelListeners = [];
        this.dynamicListeners = [];
        this.model = model;
        this.initModelEvents();
    }
    initModelEvents() {
        const listeners = Meta_1.getListeners(this);
        const modelListeners = listeners.filter(listener => Meta_1.isModelListener(listener));
        for (const listener of modelListeners) {
            const eventType = listener.eventType;
            const handler = (...args) => {
                listener.handler(...args);
            };
            this.modelListeners.push({
                eventType,
                handler
            });
            this.model.on(eventType, handler);
        }
    }
    /**
     * Attach handler to View DOM events like are click, or model events.
     * @param eventType any DOM Event type
     * @param selector "model" or simple class selector like are: ".my-class".
     * Selectors like are ".a .b .c" does not supported.
     */
    on(eventType, selector, handler) {
        const handlerArgs = Meta_1.findHandlerArguments(this, handler.name);
        handler = handler.bind(this);
        this.dynamicListeners.push({
            eventType,
            selector,
            handler,
            handlerArgs
        });
    }
    /**
     * Destroy controller and clear memory.
     * Detach all listeners.
     */
    destroy() {
        this.onDestroy();
        for (const modelListener of this.modelListeners) {
            this.model.removeListener(modelListener.eventType, modelListener.handler);
        }
        delete this.model;
    }
    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     * This method will be called from before .destroy()
     */
    onDestroy() {
        // redefine me
    }
}
exports.Controller = Controller;


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
        this.realEventType = fixFocusAndBlur(params.eventType);
        this.selector = params.selector;
        this.handlerArgs = params.handlerArgs;
        this.handler = params.handler;
        this.view = params.view;
    }
    listen() {
        this.domHandler = (event) => {
            this.onDOMEvent(event);
        };
        window.addEventListener(this.realEventType, this.domHandler);
    }
    destroy() {
        window.removeEventListener(this.realEventType, this.domHandler);
        delete this.view;
        delete this.handler;
        delete this.domHandler;
        delete this.handlerArgs;
    }
    onDOMEvent(event) {
        const componentEl = ReactDOM.findDOMNode(this.view);
        if (this.isValidEvent(event, componentEl)) {
            const currentTarget = this.getCurrentTarget(event, componentEl);
            const args = this.getHandlerArgs(event, currentTarget);
            this.handler(...args);
        }
    }
    isValidEvent(event, componentEl) {
        const thisIsValidTarget = isValidTarget_1.isValidTarget({
            componentEl,
            selector: this.selector,
            target: event.target,
        });
        return thisIsValidTarget;
    }
    getHandlerArgs(event, currentTarget) {
        const args = this.handlerArgs.map((eventPropertyPath) => this.getHandlerArgument(event, currentTarget, eventPropertyPath));
        return args;
    }
    getHandlerArgument(event, currentTarget, eventPropertyPath) {
        if (typeof eventPropertyPath === "function") {
            const ModelConstructor = eventPropertyPath;
            const model = this.getHandlerArgumentByModel(event, ModelConstructor);
            return model;
        }
        else {
            const argValue = getPropertyFromEvent_1.getPropertyFromEvent(event, currentTarget, eventPropertyPath);
            return argValue;
        }
    }
    getHandlerArgumentByModel(event, ModelConstructor) {
        const model = getNearestModelByEvent_1.getNearestModelByEvent(event, ModelConstructor);
        if (!model) {
            throw new Error("cannot find model: " + ModelConstructor.name);
        }
        return model;
    }
    getCurrentTarget(event, componentEl) {
        if (typeof this.selector === "function") {
            const currentTarget = componentEl;
            return currentTarget;
        }
        let elem = event.target;
        const currentTargetClassName = this.selector.slice(1);
        while (elem) {
            const isCurrentTarget = (elem.classList &&
                elem.classList.contains(currentTargetClassName));
            if (isCurrentTarget) {
                return elem;
            }
            elem = elem.parentNode;
        }
    }
}
exports.DOMListener = DOMListener;
// blur and focus do not bubbling
function fixFocusAndBlur(eventType) {
    if (eventType === "blur") {
        return "focusout";
    }
    if (eventType === "focus") {
        return "focusin";
    }
    return eventType;
}


/***/ }),

/***/ "./lib/Meta.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.forView = exports.isDomListener = exports.isModelListener = exports.findHandlerArguments = exports.getListeners = exports.event = exports.on = void 0;
const Model_1 = __webpack_require__("./lib/Model.ts");
const mvcEvents_1 = __webpack_require__("./lib/mvcEvents.ts");
const DOMListener_1 = __webpack_require__("./lib/DOMListener.ts");
/**
 * Attach handler to View DOM events like are click, or model events.
 * ```js
 * class MyController extends Controller<MyModel> {
 *
 *     // listen dom event
 *     *@on("click", MyView.ui.button)
 *     onClickButton() {
 *         // some action
 *     }
 *
 * }
 * ```
 * @param eventTypeOrModel any DOM Event type or Model constructor
 * @param selectorOrViewOrModelEventType selector like are: ".my-class" or model eventType
 * Selectors like are ".a .b .c" does not supported.
 */
function on(eventTypeOrModel, selectorOrViewOrModelEventType) {
    let eventType;
    let selector;
    const isInvalidCall = (typeof eventTypeOrModel === "function" &&
        typeof selectorOrViewOrModelEventType === "function");
    if (isInvalidCall) {
        throw new Error("invalid call, first argument and second cannot be a function at the same time");
    }
    if (typeof eventTypeOrModel === "string") {
        eventType = eventTypeOrModel;
        selector = selectorOrViewOrModelEventType;
        if (typeof selector === "string") {
            const selectorIsJustClassName = /^\.[\w-]+$/.test(selector);
            const selectorIsWindow = selector === "window";
            const isValidSelector = (selectorIsJustClassName ||
                selectorIsWindow);
            if (!isValidSelector) {
                throw new Error(`invalid selector "${selector}", selector should be just className like are ".some-class" or "window"`);
            }
        }
    }
    else {
        eventType = selectorOrViewOrModelEventType;
        selector = eventTypeOrModel;
    }
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
/**
 * Get some value from event object or get nearest model from components
 * ```ts
 * class MyController extends Controller<MyModel> {
 *
 *     *@on("change", MyView.ui.input)
 *     onChangeInput(
 *         // get changed input value:
 *         // event.target.value
 *         *@event("target", "value") inputValue: string
 *     ) {
 *         // some action
 *     }
 *
 *     *@on("change", MyView.ui.input)
 *     onChangeInput(
 *         // get full event object:
 *         *@event() e: Event
 *     ) {
 *         // some action
 *     }
 *
 *     *@on("click", MyView.ui.childView)
 *      onClickChild(
 *         // get model from nearest view by event target
 *         *@event(ChildModel) child: ChildModel
 *      ) {
 *         // some action
 *      }
 *
 * }
 * ```
 * @param firstKey keyof dom event object
 * @param secondKey keyof Event[firstKey], next step in property path.
 * @param otherPropertyPath other keys
 */
function event(firstKey, secondKey, ...otherPropertyPath) {
    return (target, methodName, argumentIndex) => {
        if (!target._handlersArguments) {
            target._handlersArguments = [];
        }
        const handlerArgs = {
            methodName,
            argumentIndex,
            eventPropertyPath: []
        };
        if (!firstKey) {
            handlerArgs.eventPropertyPath = [];
        }
        else if (typeof firstKey === "string") {
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
exports.event = event;
function getListeners(controller) {
    const proto = controller.constructor.prototype;
    const listenersMeta = (proto._listenersMeta || []);
    const listeners = [];
    listenersMeta.push(...controller.dynamicListeners);
    for (const listenerMeta of listenersMeta) {
        let handler;
        let handlerArgs = [];
        if (listenerMeta.methodName) {
            handler = controller[listenerMeta.methodName].bind(controller);
            handlerArgs = findHandlerArguments(controller, listenerMeta.methodName);
        }
        else {
            handler = listenerMeta.handler;
            handlerArgs = listenerMeta.handlerArgs;
        }
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
exports.findHandlerArguments = findHandlerArguments;
function isModelListener(listener) {
    return (typeof listener.selector === "function" &&
        listener.selector.prototype instanceof Model_1.Model);
}
exports.isModelListener = isModelListener;
function isDomListener(listener) {
    return !isModelListener(listener);
}
exports.isDomListener = isDomListener;
/**
 * For every instance of ViewConstructor will created instance of CreateController
 * ```ts
 * // bind by classes
 * *@forView(MyView)
 * class MyController extends Controller<MyModel> {}
 *
 * // or create controller instance manually
 * *@forView(MyView, (model: MyModel) =>
 *    new MyController(model, ...someOptions)
 * )
 * class MyController extends Controller<MyModel> {}
 *
 * ````
 * @param ViewConstructor for every this View
 * @param CreateController create this Controller
 */
function forView(ViewConstructor, CreateController) {
    return (ControllerClass) => {
        mvcEvents_1.mvcEvents.on("initView", (domEvent) => {
            if (!(domEvent.view instanceof ViewConstructor)) {
                return;
            }
            createControllersForView(domEvent.view, domEvent.model);
        });
        function createControllersForView(view, model) {
            const originalEmit = model.emit;
            model.emit = (eventType) => {
                throw new Error(`${ControllerClass.name}: it is forbidden to emit any model event inside the controller constructor. Triggered "${eventType}"`);
            };
            const controller = CreateController ?
                CreateController(model) :
                new ControllerClass(model);
            const listenersMeta = getListeners(controller);
            const domListenersMeta = listenersMeta.filter(isDomListener);
            const domListeners = [];
            for (const meta of domListenersMeta) {
                const domListener = new DOMListener_1.DOMListener({
                    eventType: meta.eventType,
                    selector: meta.selector,
                    handlerArgs: meta.handlerArgs,
                    handler: meta.handler,
                    view
                });
                domListener.listen();
                domListeners.push(domListener);
            }
            mvcEvents_1.mvcEvents.once("destroyView", (domEvent) => {
                if (domEvent.view !== view) {
                    return;
                }
                for (const domListener of domListeners) {
                    domListener.destroy();
                }
                controller.destroy();
                domListeners.splice(0);
            });
            model.emit = originalEmit;
        }
    };
}
exports.forView = forView;


/***/ }),

/***/ "./lib/Model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const events_1 = __webpack_require__("events");
/**
 * Base Model layer
 * @extends EventEmitter
 */
class Model extends events_1.EventEmitter {
    /**
     * Apply changes to model and emit changes to listeners.
     * @param props changes to apply on model
     * @param options any options, who will transferred to all listeners
     * @fires change
     */
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
            /**
             * change event
             *
             * @event change
             * @type {Partial<this>} changes
             */
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
const mvcEvents_1 = __webpack_require__("./lib/mvcEvents.ts");
/**
 * Base View layer
 * @extends React.Component
 */
class View extends React.Component {
    constructor(props) {
        super(props);
        this.model = props.model;
        this.listenModelChanges();
        mvcEvents_1.mvcEvents.emit("initView", {
            view: this,
            model: this.model
        });
    }
    listenModelChanges() {
        this.model.on("change", (changes) => {
            this.setState({ changes });
        });
    }
    render() {
        return this.template(this.model);
    }
    componentDidMount() {
        const rootEl = ReactDOM.findDOMNode(this);
        rootEl._view = this;
    }
    componentWillUnmount() {
        // clear memory leaks
        this.onDestroy();
        mvcEvents_1.mvcEvents.emit("destroyView", {
            view: this,
            model: this.model
        });
        const rootEl = ReactDOM.findDOMNode(this);
        delete rootEl._view;
    }
    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     */
    onDestroy() {
        // redefine me
    }
}
exports.View = View;
View.ui = {};


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
exports.forView = exports.event = exports.on = exports.Controller = exports.View = exports.Model = exports.EventEmitter = exports.ReactDOM = exports.React = void 0;
const React = __importStar(__webpack_require__("react"));
exports.React = React;
const ReactDOM = __importStar(__webpack_require__("react-dom"));
exports.ReactDOM = ReactDOM;
const events_1 = __webpack_require__("events");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return events_1.EventEmitter; } });
const Meta_1 = __webpack_require__("./lib/Meta.ts");
Object.defineProperty(exports, "on", { enumerable: true, get: function () { return Meta_1.on; } });
Object.defineProperty(exports, "event", { enumerable: true, get: function () { return Meta_1.event; } });
Object.defineProperty(exports, "forView", { enumerable: true, get: function () { return Meta_1.forView; } });
const Model_1 = __webpack_require__("./lib/Model.ts");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return Model_1.Model; } });
const View_1 = __webpack_require__("./lib/View.ts");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return View_1.View; } });
const Controller_1 = __webpack_require__("./lib/Controller.ts");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return Controller_1.Controller; } });
if (typeof window !== "undefined") {
    const windowObj = window;
    windowObj.MVC = {
        React,
        ReactDOM,
        EventEmitter: events_1.EventEmitter,
        Model: Model_1.Model,
        View: View_1.View,
        Controller: Controller_1.Controller,
        on: Meta_1.on,
        event: Meta_1.event,
        forView: Meta_1.forView
    };
    if (!windowObj.React) {
        windowObj.React = React;
    }
    if (!windowObj.ReactDOM) {
        windowObj.ReactDOM = ReactDOM;
    }
    if (!windowObj.EventEmitter) {
        windowObj.EventEmitter = events_1.EventEmitter;
    }
}


/***/ }),

/***/ "./lib/mvcEvents.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mvcEvents = void 0;
const events_1 = __webpack_require__("events");
exports.mvcEvents = new events_1.EventEmitter();


/***/ }),

/***/ "./lib/utils/getNearestModelByEvent.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearestModelByEvent = void 0;
function getNearestModelByEvent(event, ModelConstructor) {
    let parent = event.target;
    while (parent) {
        const model = parent._view.model;
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
function getPropertyFromEvent(event, currentTarget, propertyPath) {
    let eventPropertyValue = event;
    for (const key of propertyPath) {
        let nextValue = eventPropertyValue[key];
        if (key === "currentTarget") {
            nextValue = currentTarget;
        }
        else if (typeof nextValue === "function") {
            nextValue = nextValue.bind(eventPropertyValue);
        }
        eventPropertyValue = nextValue;
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
    if (params.selector === "window") {
        return true;
    }
    let parent = params.target;
    let insideComponent = false;
    let insideSelector = false;
    let elemMatchesSelector;
    if (typeof params.selector === "string") {
        const selectorClassName = params.selector.replace(".", "");
        elemMatchesSelector = (elem) => elem.classList.contains(selectorClassName);
    }
    else {
        const ChildView = params.selector;
        elemMatchesSelector = (elem) => elem._view instanceof ChildView;
    }
    while (parent) {
        if (elemMatchesSelector(parent)) {
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

/***/ "events":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_events__;

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