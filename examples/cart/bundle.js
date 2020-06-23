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

/***/ "./examples/cart/cart/Cart.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/cart/cart/Cart.css");

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

/***/ "./examples/cart/cart/CartModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const CartPositionModel_1 = __webpack_require__("./examples/cart/cart/position/CartPositionModel.ts");
class CartModel extends mvc_tsx_1.Model {
    constructor() {
        super(...arguments);
        this.positions = [];
        this.totalPrice = 0;
    }
    addProduct(product) {
        const existentPosition = this.getPositionByName(product.name);
        if (existentPosition) {
            existentPosition.incrementQuantity();
        }
        else {
            this.createNewPosition(product);
        }
        this.recalculateTotalPrice();
    }
    incrementPositionQuantity(position) {
        position.incrementQuantity();
        this.recalculateTotalPrice();
    }
    decrementPositionQuantity(position) {
        position.decrementQuantity();
        if (position.quantity === 0) {
            this.removePosition(position);
        }
        this.recalculateTotalPrice();
    }
    clear() {
        const cart = this;
        cart.set({
            positions: [],
            totalPrice: 0
        });
    }
    getPositionByName(productName) {
        const existentPosition = this.positions.find(position => position.product.name === productName);
        return existentPosition;
    }
    createNewPosition(product) {
        const cart = this;
        const newPosition = new CartPositionModel_1.CartPositionModel(product);
        const newPositions = [...cart.positions, newPosition];
        cart.set({
            positions: newPositions
        });
    }
    removePosition(position) {
        const cart = this;
        const positionIndex = cart.positions.indexOf(position);
        if (positionIndex !== -1) {
            const newPositions = [...cart.positions];
            newPositions.splice(positionIndex, 1);
            cart.set({
                positions: newPositions
            });
        }
    }
    recalculateTotalPrice() {
        const cart = this;
        const newTotalPrice = cart.positions.reduce((totalPrice, position) => totalPrice + position.total, 0);
        cart.set({
            totalPrice: newTotalPrice
        });
    }
}
exports.CartModel = CartModel;


/***/ }),

/***/ "./examples/cart/cart/CartView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const CartPositionView_1 = __webpack_require__("./examples/cart/cart/position/CartPositionView.tsx");
const QuantityController_1 = __webpack_require__("./examples/cart/cart/QuantityController.ts");
const ClearCartController_1 = __webpack_require__("./examples/cart/cart/ClearCartController.ts");
const formatPrice_1 = __webpack_require__("./examples/cart/utils/formatPrice.ts");
__webpack_require__("./examples/cart/cart/Cart.css");
class CartView extends mvc_tsx_1.View {
    controllers() {
        return [
            QuantityController_1.QuantityController,
            ClearCartController_1.ClearCartController
        ];
    }
    template(cart) {
        return react_1.default.createElement("div", { className: "Cart" },
            react_1.default.createElement("div", { className: "Cart--label" }, "Cart:"),
            react_1.default.createElement("div", { className: "Cart--positions" }, cart.positions.map(position => react_1.default.createElement(CartPositionView_1.CartPositionView, { model: position, key: position.product.name }))),
            react_1.default.createElement("div", { className: "Cart--total" },
                "Total: ",
                formatPrice_1.formatPrice(cart.totalPrice),
                " $"),
            react_1.default.createElement("button", { className: "Cart--clearBtn" }, "clear"));
    }
}
exports.CartView = CartView;


/***/ }),

/***/ "./examples/cart/cart/ClearCartController.ts":
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
exports.ClearCartController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class ClearCartController extends mvc_tsx_1.Controller {
    onClickClear() {
        const cart = this.model;
        cart.clear();
    }
}
__decorate([
    mvc_tsx_1.on("click", ".Cart--clearBtn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClearCartController.prototype, "onClickClear", null);
exports.ClearCartController = ClearCartController;


/***/ }),

/***/ "./examples/cart/cart/QuantityController.ts":
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
exports.QuantityController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const CartPositionModel_1 = __webpack_require__("./examples/cart/cart/position/CartPositionModel.ts");
class QuantityController extends mvc_tsx_1.Controller {
    onClickIncrement(position) {
        const cart = this.model;
        cart.incrementPositionQuantity(position);
    }
    onClickDecrement(position) {
        const cart = this.model;
        cart.decrementPositionQuantity(position);
    }
}
__decorate([
    mvc_tsx_1.on("click", ".CartPosition--incrementQuantityBtn"),
    __param(0, mvc_tsx_1.arg(CartPositionModel_1.CartPositionModel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartPositionModel_1.CartPositionModel]),
    __metadata("design:returntype", void 0)
], QuantityController.prototype, "onClickIncrement", null);
__decorate([
    mvc_tsx_1.on("click", ".CartPosition--decrementQuantityBtn"),
    __param(0, mvc_tsx_1.arg(CartPositionModel_1.CartPositionModel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartPositionModel_1.CartPositionModel]),
    __metadata("design:returntype", void 0)
], QuantityController.prototype, "onClickDecrement", null);
exports.QuantityController = QuantityController;


/***/ }),

/***/ "./examples/cart/cart/position/CartPosition.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/cart/cart/position/CartPosition.css");

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

/***/ "./examples/cart/cart/position/CartPositionModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPositionModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class CartPositionModel extends mvc_tsx_1.Model {
    constructor(product) {
        super();
        this.quantity = 1;
        this.product = product;
        this.total = product.price;
    }
    incrementQuantity() {
        const newQuantity = this.quantity + 1;
        this.setNewQuantity(newQuantity);
    }
    decrementQuantity() {
        const newQuantity = this.quantity - 1;
        this.setNewQuantity(newQuantity);
    }
    setNewQuantity(newQuantity) {
        const position = this;
        position.set({
            quantity: newQuantity,
            total: position.product.price * newQuantity
        });
    }
}
exports.CartPositionModel = CartPositionModel;


/***/ }),

/***/ "./examples/cart/cart/position/CartPositionView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPositionView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const formatPrice_1 = __webpack_require__("./examples/cart/utils/formatPrice.ts");
__webpack_require__("./examples/cart/cart/position/CartPosition.css");
class CartPositionView extends mvc_tsx_1.View {
    template(position) {
        return react_1.default.createElement("div", { className: "CartPosition" },
            react_1.default.createElement("div", { className: "CartPosition--name" }, position.product.name),
            react_1.default.createElement("div", { className: "CartPosition--price" },
                formatPrice_1.formatPrice(position.product.price),
                " $"),
            react_1.default.createElement("div", { className: "CartPosition--quantity" },
                "* ",
                position.quantity),
            react_1.default.createElement("div", { className: "CartPosition--total" },
                "= ",
                formatPrice_1.formatPrice(position.total),
                " $"),
            react_1.default.createElement("div", { className: "CartPosition--incrementQuantity" },
                react_1.default.createElement("button", { className: "CartPosition--incrementQuantityBtn" }, "+")),
            react_1.default.createElement("div", { className: "CartPosition--decrementQuantity" },
                react_1.default.createElement("button", { className: "CartPosition--decrementQuantityBtn" }, "-")));
    }
}
exports.CartPositionView = CartPositionView;


/***/ }),

/***/ "./examples/cart/index.tsx":
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
const products_1 = __webpack_require__("./examples/cart/products.ts");
const RootView_1 = __webpack_require__("./examples/cart/root/RootView.tsx");
const RootModel_1 = __webpack_require__("./examples/cart/root/RootModel.ts");
const rootModel = new RootModel_1.RootModel(products_1.products);
ReactDOM.render(React.createElement(RootView_1.RootView, { model: rootModel }), document.getElementById("root"));


/***/ }),

/***/ "./examples/cart/product/Product.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/cart/product/Product.css");

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

/***/ "./examples/cart/product/ProductModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class ProductModel extends mvc_tsx_1.Model {
    constructor(name, price) {
        super();
        this.name = name;
        this.price = price;
    }
}
exports.ProductModel = ProductModel;


/***/ }),

/***/ "./examples/cart/product/ProductView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const formatPrice_1 = __webpack_require__("./examples/cart/utils/formatPrice.ts");
__webpack_require__("./examples/cart/product/Product.css");
class ProductView extends mvc_tsx_1.View {
    template(product) {
        return react_1.default.createElement("div", { className: "Product" },
            react_1.default.createElement("div", { className: "Product--name" }, product.name),
            react_1.default.createElement("div", { className: "Product--price" },
                formatPrice_1.formatPrice(product.price),
                " $"),
            react_1.default.createElement("div", { className: "Product--toCart" },
                react_1.default.createElement("button", { className: "Product--addToCartBtn" }, "add to cart")));
    }
}
exports.ProductView = ProductView;


/***/ }),

/***/ "./examples/cart/products.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const ProductModel_1 = __webpack_require__("./examples/cart/product/ProductModel.ts");
exports.products = [
    new ProductModel_1.ProductModel("Milk", 3),
    new ProductModel_1.ProductModel("Eggs", 2),
    new ProductModel_1.ProductModel("Bread", 1),
    new ProductModel_1.ProductModel("Juice", 5)
];


/***/ }),

/***/ "./examples/cart/root/AddToCartController.ts":
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
exports.AddToCartController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const ProductModel_1 = __webpack_require__("./examples/cart/product/ProductModel.ts");
class AddToCartController extends mvc_tsx_1.Controller {
    // we can listen click to sub views
    onClickAddToCart(
    // and get nearest Model from event
    product) {
        // call cart business logic
        this.model.cart.addProduct(product);
    }
}
__decorate([
    mvc_tsx_1.on("click", ".Product--addToCartBtn"),
    __param(0, mvc_tsx_1.arg(ProductModel_1.ProductModel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductModel_1.ProductModel]),
    __metadata("design:returntype", void 0)
], AddToCartController.prototype, "onClickAddToCart", null);
exports.AddToCartController = AddToCartController;


/***/ }),

/***/ "./examples/cart/root/Root.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/cart/root/Root.css");

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

/***/ "./examples/cart/root/RootModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RootModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const CartModel_1 = __webpack_require__("./examples/cart/cart/CartModel.ts");
class RootModel extends mvc_tsx_1.Model {
    constructor(products) {
        super();
        this.cart = new CartModel_1.CartModel();
        this.products = products;
    }
}
exports.RootModel = RootModel;


/***/ }),

/***/ "./examples/cart/root/RootView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const ProductView_1 = __webpack_require__("./examples/cart/product/ProductView.tsx");
const CartView_1 = __webpack_require__("./examples/cart/cart/CartView.tsx");
const AddToCartController_1 = __webpack_require__("./examples/cart/root/AddToCartController.ts");
__webpack_require__("./examples/cart/root/Root.css");
class RootView extends mvc_tsx_1.View {
    controllers() {
        return [
            AddToCartController_1.AddToCartController
        ];
    }
    template(root) {
        return react_1.default.createElement("div", { className: "Root" },
            react_1.default.createElement("div", { className: "Root--products" }, root.products.map(product => react_1.default.createElement(ProductView_1.ProductView, { model: product, key: product.name }))),
            react_1.default.createElement("div", { className: "Root--cart" },
                react_1.default.createElement(CartView_1.CartView, { model: root.cart })));
    }
}
exports.RootView = RootView;


/***/ }),

/***/ "./examples/cart/utils/formatPrice.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = void 0;
function formatPrice(price) {
    let [intPart, floatPart] = price.toString().split(".");
    if (!floatPart) {
        floatPart = "00";
    }
    else if (floatPart.length === 1) {
        floatPart = floatPart + "0";
    }
    else if (floatPart.length > 2) {
        floatPart = floatPart.slice(0, 2);
    }
    const output = intPart + "." + floatPart;
    return output;
}
exports.formatPrice = formatPrice;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/cart/cart/Cart.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Cart {\n    border: 1px solid #ddd;\n    box-sizing: border-box;\n    padding: 6px 12px;\n}\n\n.Cart--positions {\n    display: table;\n}\n\n.Cart--label {\n    font-weight: bold;\n}\n\n.Cart--total {\n    margin-top: 6px;\n    font-weight: bold;\n}\n\n.Cart--clearBtn {\n    display: inline-block;\n    background: red;\n    font-size: 12px;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 5px;\n    cursor: pointer;\n    box-sizing: border-box;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/cart/cart/position/CartPosition.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".CartPosition {\n    display: table-row;\n}\n\n.CartPosition--name {\n    display: table-cell;\n    padding: 6px 12px;\n}\n\n.CartPosition--price {\n    display: table-cell;\n    font-weight: bold;\n}\n\n.CartPosition--quantity {\n    display: table-cell;\n    font-weight: bold;\n    padding-left: 6px;\n}\n\n.CartPosition--total {\n    display: table-cell;\n    font-weight: bold;\n}\n\n.CartPosition--incrementQuantity {\n    display: table-cell;\n}\n\n.CartPosition--incrementQuantityBtn {\n    background: green;\n    font-size: 12px;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 5px;\n    cursor: pointer;\n    box-sizing: border-box;\n}\n\n.CartPosition--decrementQuantity {\n    display: table-cell;\n}\n\n.CartPosition--decrementQuantityBtn {\n    background: red;\n    font-size: 12px;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 5px;\n    cursor: pointer;\n    box-sizing: border-box;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/cart/product/Product.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Product {\n    display: table-row;\n    width: 100%;\n}\n\n.Product--name {\n    display: table-cell;\n}\n\n.Product--price {\n    display: table-cell;\n    font-weight: bold;\n    margin-left: 6px;\n}\n\n.Product--toCart {\n    display: table-cell;\n}\n\n.Product--addToCartBtn {\n    display: inline-block;\n    background: green;\n    font-size: 12px;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 5px;\n    cursor: pointer;\n    box-sizing: border-box;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/cart/root/Root.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".Root--products {\n    display: table;\n    width: 400px;\n    float: left;\n    margin-right: 6px;;\n}\n\n.Root--cart {\n    width: 400px;\n    float: left;\n}", ""]);
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

module.exports = __webpack_require__("./examples/cart/index.tsx");


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