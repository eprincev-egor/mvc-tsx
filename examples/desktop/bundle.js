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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/desktop/desktop/Desktop.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/desktop/desktop/Desktop.css");

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

/***/ "./examples/desktop/desktop/DesktopModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class DesktopModel extends mvc_tsx_1.Model {
    constructor(items) {
        super();
        this.rect = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        this.items = [];
        this.items = items;
    }
    add(items) {
        const desktop = this;
        const newItems = [...desktop.items, ...items];
        desktop.set({
            items: newItems
        });
    }
}
exports.DesktopModel = DesktopModel;


/***/ }),

/***/ "./examples/desktop/desktop/DesktopView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const react_dom_1 = __importDefault(__webpack_require__("react-dom"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const ItemView_1 = __webpack_require__("./examples/desktop/desktop/item/ItemView.tsx");
__webpack_require__("./examples/desktop/desktop/Desktop.css");
class DesktopView extends mvc_tsx_1.View {
    template(desktop) {
        return (react_1.default.createElement("div", { className: "Desktop" }, desktop.items.map(item => react_1.default.createElement(ItemView_1.ItemView, { model: item, key: item.id }))));
    }
    componentDidMount() {
        super.componentDidMount();
        const desktopEl = react_dom_1.default.findDOMNode(this);
        const desktopRect = desktopEl.getBoundingClientRect();
        const desktopModel = this.model;
        desktopModel.set({
            rect: {
                left: desktopRect.left,
                top: desktopRect.top,
                width: desktopRect.width,
                height: desktopRect.height
            }
        });
    }
}
exports.DesktopView = DesktopView;
DesktopView.ui = {
    desktop: ".Desktop",
    item: ".Item"
};


/***/ }),

/***/ "./examples/desktop/desktop/controllers/DragController.ts":
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
exports.DragController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const DesktopView_1 = __webpack_require__("./examples/desktop/desktop/DesktopView.tsx");
const item_1 = __webpack_require__("./examples/desktop/desktop/item/index.ts");
let DragController = class DragController extends mvc_tsx_1.Controller {
    constructor() {
        super(...arguments);
        this.startItemPosition = {
            x: 0,
            y: 0
        };
        this.startMousePosition = {
            x: 0,
            y: 0
        };
    }
    onDragStart(item, mouseX, mouseY) {
        this.target = item;
        this.startMousePosition = {
            x: mouseX,
            y: mouseY
        };
        this.startItemPosition = {
            x: item.x,
            y: item.y
        };
    }
    onMove(currentMouseX, currentMouseY) {
        if (!this.target) {
            return;
        }
        const desktop = this.model;
        const mouseDeltaX = currentMouseX - this.startMousePosition.x;
        const mouseDeltaY = currentMouseY - this.startMousePosition.y;
        let x = this.startItemPosition.x + mouseDeltaX;
        x = fixBounds(x, desktop.rect.width, this.target.width);
        let y = this.startItemPosition.y + mouseDeltaY;
        y = fixBounds(y, desktop.rect.height, this.target.height);
        this.target.setPosition(x, y);
    }
    onDrop() {
        this.target = undefined;
    }
};
__decorate([
    mvc_tsx_1.on("mousedown", DesktopView_1.DesktopView.ui.item),
    __param(0, mvc_tsx_1.arg(item_1.ItemModel)),
    __param(1, mvc_tsx_1.arg("clientX")),
    __param(2, mvc_tsx_1.arg("clientY")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_1.ItemModel, Number, Number]),
    __metadata("design:returntype", void 0)
], DragController.prototype, "onDragStart", null);
__decorate([
    mvc_tsx_1.on("mousemove", "window"),
    __param(0, mvc_tsx_1.arg("clientX")),
    __param(1, mvc_tsx_1.arg("clientY")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DragController.prototype, "onMove", null);
__decorate([
    mvc_tsx_1.on("mouseup", "window"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DragController.prototype, "onDrop", null);
DragController = __decorate([
    mvc_tsx_1.forView(DesktopView_1.DesktopView)
], DragController);
exports.DragController = DragController;
function fixBounds(coordinate, desktopSize, itemSize) {
    coordinate = Math.max(0, coordinate);
    coordinate = Math.min(coordinate, desktopSize - itemSize);
    return coordinate;
}


/***/ }),

/***/ "./examples/desktop/desktop/controllers/DropController.ts":
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
exports.DropController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const DesktopView_1 = __webpack_require__("./examples/desktop/desktop/DesktopView.tsx");
const item_1 = __webpack_require__("./examples/desktop/desktop/item/index.ts");
let DropController = class DropController extends mvc_tsx_1.Controller {
    onDragEvents(preventDefault) {
        preventDefault();
    }
    onDropFiles(files, mouseX, mouseY) {
        const desktop = this.model;
        const x = mouseX - desktop.rect.left;
        const y = mouseY - desktop.rect.top;
        const items = [];
        for (const file of files) {
            const item = new item_1.ItemModel({
                x,
                y,
                name: file.name
            });
            items.push(item);
        }
        desktop.add(items);
    }
};
__decorate([
    mvc_tsx_1.on("drop", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragstart", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragend", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragover", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragenter", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragenter", DesktopView_1.DesktopView.ui.desktop),
    mvc_tsx_1.on("dragleave", DesktopView_1.DesktopView.ui.desktop),
    __param(0, mvc_tsx_1.arg("preventDefault")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], DropController.prototype, "onDragEvents", null);
__decorate([
    mvc_tsx_1.on("drop", DesktopView_1.DesktopView.ui.desktop),
    __param(0, mvc_tsx_1.arg("dataTransfer", "files")),
    __param(1, mvc_tsx_1.arg("clientX")),
    __param(2, mvc_tsx_1.arg("clientY")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileList, Number, Number]),
    __metadata("design:returntype", void 0)
], DropController.prototype, "onDropFiles", null);
DropController = __decorate([
    mvc_tsx_1.forView(DesktopView_1.DesktopView)
], DropController);
exports.DropController = DropController;


/***/ }),

/***/ "./examples/desktop/desktop/controllers/SelectController.ts":
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
exports.SelectController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const DesktopView_1 = __webpack_require__("./examples/desktop/desktop/DesktopView.tsx");
const item_1 = __webpack_require__("./examples/desktop/desktop/item/index.ts");
let SelectController = class SelectController extends mvc_tsx_1.Controller {
    onClickItem(item) {
        item.select();
    }
};
__decorate([
    mvc_tsx_1.on("click", DesktopView_1.DesktopView.ui.item),
    __param(0, mvc_tsx_1.arg(item_1.ItemModel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_1.ItemModel]),
    __metadata("design:returntype", void 0)
], SelectController.prototype, "onClickItem", null);
SelectController = __decorate([
    mvc_tsx_1.forView(DesktopView_1.DesktopView)
], SelectController);
exports.SelectController = SelectController;


/***/ }),

/***/ "./examples/desktop/desktop/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DragController = exports.SelectController = exports.DropController = exports.DesktopView = exports.DesktopModel = void 0;
const DesktopModel_1 = __webpack_require__("./examples/desktop/desktop/DesktopModel.ts");
Object.defineProperty(exports, "DesktopModel", { enumerable: true, get: function () { return DesktopModel_1.DesktopModel; } });
const DesktopView_1 = __webpack_require__("./examples/desktop/desktop/DesktopView.tsx");
Object.defineProperty(exports, "DesktopView", { enumerable: true, get: function () { return DesktopView_1.DesktopView; } });
const DropController_1 = __webpack_require__("./examples/desktop/desktop/controllers/DropController.ts");
Object.defineProperty(exports, "DropController", { enumerable: true, get: function () { return DropController_1.DropController; } });
const SelectController_1 = __webpack_require__("./examples/desktop/desktop/controllers/SelectController.ts");
Object.defineProperty(exports, "SelectController", { enumerable: true, get: function () { return SelectController_1.SelectController; } });
const DragController_1 = __webpack_require__("./examples/desktop/desktop/controllers/DragController.ts");
Object.defineProperty(exports, "DragController", { enumerable: true, get: function () { return DragController_1.DragController; } });


/***/ }),

/***/ "./examples/desktop/desktop/item/Item.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/desktop/desktop/item/Item.css");

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

/***/ "./examples/desktop/desktop/item/ItemModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
let uid = 0;
class ItemModel extends mvc_tsx_1.Model {
    constructor(params) {
        super();
        this.id = ++uid;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.name = "";
        this.selected = false;
        this.editing = false;
        this.x = params.x;
        this.y = params.y;
        this.name = params.name;
    }
    setName(newName) {
        const item = this;
        item.set({ name: newName });
    }
    select() {
        const item = this;
        item.set({ selected: true });
    }
    enableEditing() {
        const item = this;
        item.set({ editing: true });
    }
    disableEditing() {
        const item = this;
        item.set({ editing: false });
    }
    setPosition(x, y) {
        const item = this;
        item.set({ x, y });
    }
}
exports.ItemModel = ItemModel;


/***/ }),

/***/ "./examples/desktop/desktop/item/ItemView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const react_dom_1 = __importDefault(__webpack_require__("react-dom"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
__webpack_require__("./examples/desktop/desktop/item/Item.css");
class ItemView extends mvc_tsx_1.View {
    template(item) {
        return (react_1.default.createElement("div", { className: this.className(), style: {
                left: item.x + "px",
                top: item.y + "px"
            } },
            react_1.default.createElement("div", { className: "Item--label" }, item.name),
            item.editing ? this.inputTemplate() : undefined));
    }
    componentDidUpdate() {
        const item = this.model;
        if (item.editing) {
            const inputEl = react_dom_1.default.findDOMNode(this.refs.EditNameInput);
            if (inputEl) {
                inputEl.focus();
            }
        }
    }
    componentDidMount() {
        super.componentDidMount();
        const itemEl = react_dom_1.default.findDOMNode(this);
        const itemRect = itemEl.getBoundingClientRect();
        const itemModel = this.model;
        itemModel.set({
            width: itemRect.width,
            height: itemRect.height
        });
    }
    className() {
        const item = this.model;
        const classes = ["Item"];
        if (item.selected) {
            classes.push("Item-selected");
        }
        if (item.editing) {
            classes.push("Item-editing");
        }
        return classes.join(" ");
    }
    inputTemplate() {
        const item = this.model;
        return react_1.default.createElement("input", { className: "Item--nameInput", defaultValue: item.name, ref: "EditNameInput" });
    }
}
exports.ItemView = ItemView;
ItemView.ui = {
    label: ".Item--label",
    nameInput: ".Item--nameInput"
};


/***/ }),

/***/ "./examples/desktop/desktop/item/controllers/EditNameController.ts":
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
exports.EditNameController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const ItemView_1 = __webpack_require__("./examples/desktop/desktop/item/ItemView.tsx");
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;
let EditNameController = class EditNameController extends mvc_tsx_1.Controller {
    onStartEdit() {
        const item = this.model;
        item.enableEditing();
    }
    onKeyupEditInput(keyCode, inputValue) {
        if (keyCode === ENTER_KEY_CODE) {
            this.onPressEnter(inputValue);
        }
        if (keyCode === ESCAPE_KEY_CODE) {
            this.onPressEscape();
        }
    }
    onBlurEditInput() {
        const item = this.model;
        item.disableEditing();
    }
    onPressEnter(inputValue) {
        const item = this.model;
        item.disableEditing();
        item.setName(inputValue);
    }
    onPressEscape() {
        const item = this.model;
        item.disableEditing();
    }
};
__decorate([
    mvc_tsx_1.on("dblclick", ItemView_1.ItemView.ui.label),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onStartEdit", null);
__decorate([
    mvc_tsx_1.on("keyup", ItemView_1.ItemView.ui.nameInput),
    __param(0, mvc_tsx_1.arg("keyCode")),
    __param(1, mvc_tsx_1.arg("target", "value")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onKeyupEditInput", null);
__decorate([
    mvc_tsx_1.on("blur", ItemView_1.ItemView.ui.nameInput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onBlurEditInput", null);
EditNameController = __decorate([
    mvc_tsx_1.forView(ItemView_1.ItemView)
], EditNameController);
exports.EditNameController = EditNameController;


/***/ }),

/***/ "./examples/desktop/desktop/item/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EditNameController = exports.ItemView = exports.ItemModel = void 0;
const ItemView_1 = __webpack_require__("./examples/desktop/desktop/item/ItemView.tsx");
Object.defineProperty(exports, "ItemView", { enumerable: true, get: function () { return ItemView_1.ItemView; } });
const ItemModel_1 = __webpack_require__("./examples/desktop/desktop/item/ItemModel.ts");
Object.defineProperty(exports, "ItemModel", { enumerable: true, get: function () { return ItemModel_1.ItemModel; } });
const EditNameController_1 = __webpack_require__("./examples/desktop/desktop/item/controllers/EditNameController.ts");
Object.defineProperty(exports, "EditNameController", { enumerable: true, get: function () { return EditNameController_1.EditNameController; } });


/***/ }),

/***/ "./examples/desktop/index.tsx":
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
const desktop_1 = __webpack_require__("./examples/desktop/desktop/index.ts");
const item_1 = __webpack_require__("./examples/desktop/desktop/item/index.ts");
const desktopModel = new desktop_1.DesktopModel([
    new item_1.ItemModel({ name: "File 1.pdf", x: 20, y: 20 }),
    new item_1.ItemModel({ name: "File 2.pdf", x: 60, y: 60 })
]);
ReactDOM.render(React.createElement(desktop_1.DesktopView, { model: desktopModel }), document.getElementById("root"));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/desktop/desktop/Desktop.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Desktop {\n    position: relative;\n\n    width: 50%;\n    height: 50%;\n\n    border: 1px solid grey;\n    border-radius: 1em;\n    background: repeating-linear-gradient(\n        -45deg, \n        transparent 0 10px,\n      grey 10px 10px,\n      grey 11px 11px\n    );\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/desktop/desktop/item/Item.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Item {\n    position: absolute;\n}\n\n.Item:before {\n    content: \"\";\n    display: block;\n    background: lightblue;\n    width: 64px;\n    height: 64px;\n}\n\n.Item--label {\n    font-weight: bold;\n}\n\n.Item-selected {\n    border: 2px solid hotpink;\n    border-radius: 0.25em;\n}\n\n.Item-editing .Item--label {\n    display: none;\n}", ""]);
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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./examples/desktop/index.tsx");


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