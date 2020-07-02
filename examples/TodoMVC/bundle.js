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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/TodoMVC/app/App.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/TodoMVC/app/App.css");

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

/***/ "./examples/TodoMVC/app/AppModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
class AppModel extends mvc_tsx_1.Model {
    constructor() {
        super(...arguments);
        this.statusFilter = "all";
        this.todos = [];
        this.activeTodosCount = 0;
    }
    createTodo(todoName, status = TodoModel_1.TodoStatus.active) {
        const app = this;
        const todo = new TodoModel_1.TodoModel(todoName, status);
        const newTodos = [...app.todos, todo];
        app.set({
            todos: newTodos
        });
        app.recalculateActiveTodosCount();
        app.emit("createTodo", todo);
    }
    removeTodo(todoId) {
        const app = this;
        const todo = app.todos.find(someTodo => someTodo.id === todoId);
        if (todo) {
            const newTodos = [...app.todos];
            const todoIndex = newTodos.indexOf(todo);
            newTodos.splice(todoIndex, 1);
            app.set({
                todos: newTodos
            });
            app.recalculateActiveTodosCount();
            app.emit("removeTodo", todo);
        }
    }
    setStatusFilter(newStatusFilter) {
        const app = this;
        app.set({
            statusFilter: newStatusFilter
        });
    }
    getFilteredTodos() {
        const app = this;
        const filteredTodos = app.todos.filter(todo => this.filterTodo(todo));
        return filteredTodos;
    }
    filterTodo(todo) {
        if (this.statusFilter === "active") {
            return todo.isActive();
        }
        if (this.statusFilter === "completed") {
            return todo.isCompleted();
        }
        return true;
    }
    setAllTodosStatus(newStatus) {
        const app = this;
        app.todos.forEach(todo => todo.setStatus(newStatus));
        app.recalculateActiveTodosCount();
    }
    isAllCompleted() {
        const app = this;
        const activeTodosCount = app.activeTodosCount;
        const allTodosCount = app.todos.length;
        const isAllCompleted = (allTodosCount > 0 &&
            activeTodosCount === 0);
        return isAllCompleted;
    }
    hasCompletedTodo() {
        const app = this;
        const hasCompletedTodo = app.todos.some(todo => todo.isCompleted());
        return hasCompletedTodo;
    }
    clearCompleted() {
        const app = this;
        const removedTodos = app.todos.filter(todo => todo.isCompleted());
        const newTodos = app.todos.filter(todo => todo.isActive());
        app.set({
            todos: newTodos
        });
        app.recalculateActiveTodosCount();
        for (const todo of removedTodos) {
            app.emit("removeTodo", todo);
        }
    }
    recalculateActiveTodosCount() {
        const app = this;
        const newActiveTodosCount = app.calculateActiveTodosCount();
        app.set({
            activeTodosCount: newActiveTodosCount
        });
    }
    calculateActiveTodosCount() {
        const app = this;
        const activeTodos = app.todos.filter(todo => todo.isActive());
        const activeTodosCount = activeTodos.length;
        return activeTodosCount;
    }
}
exports.AppModel = AppModel;


/***/ }),

/***/ "./examples/TodoMVC/app/AppView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoView_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoView.tsx");
__webpack_require__("./examples/TodoMVC/app/App.css");
class AppView extends mvc_tsx_1.View {
    template(app) {
        let footer;
        if (app.todos.length) {
            footer = (react_1.default.createElement("footer", { className: "footer" },
                react_1.default.createElement("span", { className: "todo-count" },
                    react_1.default.createElement("strong", null, app.activeTodosCount),
                    " ",
                    this.getItemsWord(),
                    " left"),
                react_1.default.createElement("ul", { className: "filters" },
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: app.statusFilter === "all" ? "selected" : "", href: "#/" }, "All")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: app.statusFilter === "active" ? "selected" : "", href: "#/active" }, "Active")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: app.statusFilter === "completed" ? "selected" : "", href: "#/completed" }, "Completed"))),
                app.hasCompletedTodo() ? (react_1.default.createElement("span", { className: "todo-clear" },
                    react_1.default.createElement("button", { className: "clear-completed ClearCompleted" }, "Clear completed"))) : null));
        }
        return (react_1.default.createElement("section", { className: "todoapp" },
            react_1.default.createElement("header", { className: "header" },
                react_1.default.createElement("h1", null, "todos"),
                react_1.default.createElement("input", { className: "new-todo AddTodo", placeholder: "What needs to be done?", autoFocus: true, defaultValue: "" })),
            react_1.default.createElement("section", { className: "main" },
                react_1.default.createElement("input", { className: "toggle-all ToggleAllStatus", id: "toggle-all", type: "checkbox", checked: app.isAllCompleted(), onChange: (e) => 1 }),
                react_1.default.createElement("label", { htmlFor: "toggle-all" }, "Mark all as complete"),
                react_1.default.createElement("ul", { className: "todo-list" }, app.getFilteredTodos().map(item => react_1.default.createElement(TodoView_1.TodoView, { model: item, key: item.id })))),
            footer));
    }
    getItemsWord() {
        const app = this.model;
        if (app.activeTodosCount === 1) {
            return "item";
        }
        else {
            return "items";
        }
    }
}
exports.AppView = AppView;
AppView.ui = {
    addTodo: ".AddTodo",
    clearCompleted: ".ClearCompleted",
    toggleAllStatus: ".ToggleAllStatus"
};


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/ActiveCountController.ts":
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
exports.ActiveCountController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const AppModel_1 = __webpack_require__("./examples/TodoMVC/app/AppModel.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
let ActiveCountController = class ActiveCountController extends mvc_tsx_1.Controller {
    constructor(app) {
        super(app);
        this.onChangeTodo = this.onChangeTodo.bind(this);
    }
    onCreateTodo(todo) {
        this.listenTodo(todo);
    }
    onRemoveTodo(todo) {
        this.stopListenTodo(todo);
    }
    onChangeTodo() {
        const app = this.model;
        app.recalculateActiveTodosCount();
    }
    listenTodo(todo) {
        todo.on("change", this.onChangeTodo);
    }
    stopListenTodo(todo) {
        todo.off("change", this.onChangeTodo);
    }
};
__decorate([
    mvc_tsx_1.on(AppModel_1.AppModel, "createTodo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoModel_1.TodoModel]),
    __metadata("design:returntype", void 0)
], ActiveCountController.prototype, "onCreateTodo", null);
__decorate([
    mvc_tsx_1.on(AppModel_1.AppModel, "removeTodo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoModel_1.TodoModel]),
    __metadata("design:returntype", void 0)
], ActiveCountController.prototype, "onRemoveTodo", null);
ActiveCountController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView),
    __metadata("design:paramtypes", [AppModel_1.AppModel])
], ActiveCountController);
exports.ActiveCountController = ActiveCountController;


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/AddTodoController.ts":
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
exports.AddTodoController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const keyCodes_1 = __webpack_require__("./examples/TodoMVC/app/keyCodes.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
let AddTodoController = class AddTodoController extends mvc_tsx_1.Controller {
    onKeyupInput(keyCode, input) {
        if (keyCode === keyCodes_1.ENTER_KEY_CODE) {
            this.onPressEnter(input);
        }
    }
    onPressEnter(input) {
        this.createTodo(input.value);
        this.clearInput(input);
    }
    createTodo(todoName) {
        const app = this.model;
        app.createTodo(todoName);
    }
    clearInput(input) {
        input.value = "";
    }
};
__decorate([
    mvc_tsx_1.on("keyup", AppView_1.AppView.ui.addTodo),
    __param(0, mvc_tsx_1.event("keyCode")),
    __param(1, mvc_tsx_1.event("target")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AddTodoController.prototype, "onKeyupInput", null);
AddTodoController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView)
], AddTodoController);
exports.AddTodoController = AddTodoController;


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/ClearCompletedController.ts":
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
exports.ClearCompletedController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
let ClearCompletedController = class ClearCompletedController extends mvc_tsx_1.Controller {
    onClickClearCompleted() {
        const app = this.model;
        app.clearCompleted();
    }
};
__decorate([
    mvc_tsx_1.on("click", AppView_1.AppView.ui.clearCompleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClearCompletedController.prototype, "onClickClearCompleted", null);
ClearCompletedController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView)
], ClearCompletedController);
exports.ClearCompletedController = ClearCompletedController;


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/LocalStorageController.ts":
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
exports.LocalStorageController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const AppModel_1 = __webpack_require__("./examples/TodoMVC/app/AppModel.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
let LocalStorageController = class LocalStorageController extends mvc_tsx_1.Controller {
    constructor(app) {
        super(app);
        this.loading = false;
        this.onChangeTodo = this.onChangeTodo.bind(this);
        setTimeout(() => {
            this.loadTodos();
        });
    }
    onCreateTodo(todo) {
        this.saveTodos();
        this.listenTodo(todo);
    }
    onRemoveTodo(todo) {
        this.saveTodos();
        this.stopListenTodo(todo);
    }
    onChangeTodo() {
        this.saveTodos();
    }
    loadTodos() {
        const todosJSON = localStorage.getItem("todos");
        if (!todosJSON) {
            return;
        }
        this.loading = true;
        try {
            const app = this.model;
            const todosRows = JSON.parse(todosJSON);
            for (const row of todosRows) {
                app.createTodo(row.name, row.status);
            }
        }
        catch (err) {
            // tslint:disable-next-line: no-console
            console.error("failed parse todos from localStorage", err);
        }
        this.loading = false;
    }
    saveTodos() {
        if (this.loading) {
            return;
        }
        const app = this.model;
        const todosRows = app.todos.map(todo => todo.toJSON());
        const todosJSON = JSON.stringify(todosRows);
        localStorage.setItem("todos", todosJSON);
    }
    listenTodo(todo) {
        todo.on("change", this.onChangeTodo);
    }
    stopListenTodo(todo) {
        todo.off("change", this.onChangeTodo);
    }
};
__decorate([
    mvc_tsx_1.on(AppModel_1.AppModel, "createTodo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoModel_1.TodoModel]),
    __metadata("design:returntype", void 0)
], LocalStorageController.prototype, "onCreateTodo", null);
__decorate([
    mvc_tsx_1.on(AppModel_1.AppModel, "removeTodo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoModel_1.TodoModel]),
    __metadata("design:returntype", void 0)
], LocalStorageController.prototype, "onRemoveTodo", null);
LocalStorageController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView),
    __metadata("design:paramtypes", [AppModel_1.AppModel])
], LocalStorageController);
exports.LocalStorageController = LocalStorageController;


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/RemoveTodoController.ts":
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
exports.RemoveTodoController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
const todo_1 = __webpack_require__("./examples/TodoMVC/app/todo/index.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
let RemoveTodoController = class RemoveTodoController extends mvc_tsx_1.Controller {
    onClickRemove(todo) {
        const app = this.model;
        app.removeTodo(todo.id);
    }
};
__decorate([
    mvc_tsx_1.on("click", todo_1.TodoView.ui.remove),
    __param(0, mvc_tsx_1.event(TodoModel_1.TodoModel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoModel_1.TodoModel]),
    __metadata("design:returntype", void 0)
], RemoveTodoController.prototype, "onClickRemove", null);
RemoveTodoController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView)
], RemoveTodoController);
exports.RemoveTodoController = RemoveTodoController;


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/RouterController.ts":
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
exports.RouterController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const AppModel_1 = __webpack_require__("./examples/TodoMVC/app/AppModel.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
let RouterController = class RouterController extends mvc_tsx_1.Controller {
    constructor(app) {
        super(app);
        this.onChangeHash = this.onChangeHash.bind(this);
        window.addEventListener("load", this.onChangeHash);
        window.addEventListener("hashchange", this.onChangeHash);
    }
    onChangeHash() {
        const app = this.model;
        const statusFilter = getStatusFilterFromLocationHash();
        app.setStatusFilter(statusFilter);
    }
};
RouterController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView),
    __metadata("design:paramtypes", [AppModel_1.AppModel])
], RouterController);
exports.RouterController = RouterController;
function getStatusFilterFromLocationHash() {
    const hash = location.hash;
    if (hash === "#/completed") {
        return "completed";
    }
    if (hash === "#/active") {
        return "active";
    }
    return "all";
}


/***/ }),

/***/ "./examples/TodoMVC/app/controllers/ToggleAllTodosStatusController.ts":
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
exports.ToggleAllTodosStatusController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
let ToggleAllTodosStatusController = class ToggleAllTodosStatusController extends mvc_tsx_1.Controller {
    onChangeToggleAll(checked) {
        const app = this.model;
        const newStatus = app.isAllCompleted() ? TodoModel_1.TodoStatus.active : TodoModel_1.TodoStatus.completed;
        app.setAllTodosStatus(newStatus);
    }
};
__decorate([
    mvc_tsx_1.on("change", AppView_1.AppView.ui.toggleAllStatus),
    __param(0, mvc_tsx_1.event("target", "checked")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], ToggleAllTodosStatusController.prototype, "onChangeToggleAll", null);
ToggleAllTodosStatusController = __decorate([
    mvc_tsx_1.forView(AppView_1.AppView)
], ToggleAllTodosStatusController);
exports.ToggleAllTodosStatusController = ToggleAllTodosStatusController;


/***/ }),

/***/ "./examples/TodoMVC/app/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterController = exports.ClearCompletedController = exports.ActiveCountController = exports.LocalStorageController = exports.ToggleAllTodosStatusController = exports.RemoveTodoController = exports.AddTodoController = exports.AppView = exports.AppModel = void 0;
const AppModel_1 = __webpack_require__("./examples/TodoMVC/app/AppModel.ts");
Object.defineProperty(exports, "AppModel", { enumerable: true, get: function () { return AppModel_1.AppModel; } });
const AppView_1 = __webpack_require__("./examples/TodoMVC/app/AppView.tsx");
Object.defineProperty(exports, "AppView", { enumerable: true, get: function () { return AppView_1.AppView; } });
const AddTodoController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/AddTodoController.ts");
Object.defineProperty(exports, "AddTodoController", { enumerable: true, get: function () { return AddTodoController_1.AddTodoController; } });
const RemoveTodoController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/RemoveTodoController.ts");
Object.defineProperty(exports, "RemoveTodoController", { enumerable: true, get: function () { return RemoveTodoController_1.RemoveTodoController; } });
const ToggleAllTodosStatusController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/ToggleAllTodosStatusController.ts");
Object.defineProperty(exports, "ToggleAllTodosStatusController", { enumerable: true, get: function () { return ToggleAllTodosStatusController_1.ToggleAllTodosStatusController; } });
const LocalStorageController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/LocalStorageController.ts");
Object.defineProperty(exports, "LocalStorageController", { enumerable: true, get: function () { return LocalStorageController_1.LocalStorageController; } });
const ActiveCountController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/ActiveCountController.ts");
Object.defineProperty(exports, "ActiveCountController", { enumerable: true, get: function () { return ActiveCountController_1.ActiveCountController; } });
const ClearCompletedController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/ClearCompletedController.ts");
Object.defineProperty(exports, "ClearCompletedController", { enumerable: true, get: function () { return ClearCompletedController_1.ClearCompletedController; } });
const RouterController_1 = __webpack_require__("./examples/TodoMVC/app/controllers/RouterController.ts");
Object.defineProperty(exports, "RouterController", { enumerable: true, get: function () { return RouterController_1.RouterController; } });


/***/ }),

/***/ "./examples/TodoMVC/app/keyCodes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ESCAPE_KEY_CODE = exports.ENTER_KEY_CODE = void 0;
exports.ENTER_KEY_CODE = 13;
exports.ESCAPE_KEY_CODE = 27;


/***/ }),

/***/ "./examples/TodoMVC/app/todo/TodoModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = exports.TodoStatus = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["active"] = 0] = "active";
    TodoStatus[TodoStatus["completed"] = 1] = "completed";
})(TodoStatus = exports.TodoStatus || (exports.TodoStatus = {}));
let uid = 0;
class TodoModel extends mvc_tsx_1.Model {
    constructor(name, status = TodoStatus.active) {
        super();
        this.editing = false;
        this.id = ++uid;
        this.name = name;
        this.status = status;
    }
    static fromJSON(row) {
        const todo = new TodoModel(row.name);
        todo.id = row.id;
        todo.status = row.status;
        return todo;
    }
    isActive() {
        return this.status === TodoStatus.active;
    }
    isCompleted() {
        return this.status === TodoStatus.completed;
    }
    toggleStatus() {
        const todo = this;
        const newStatus = (todo.status === TodoStatus.active ?
            TodoStatus.completed :
            TodoStatus.active);
        todo.setStatus(newStatus);
    }
    setStatus(newStatus) {
        const todo = this;
        todo.set({
            status: newStatus
        });
    }
    setName(newName) {
        const todo = this;
        todo.set({
            name: newName
        });
    }
    enableEdit() {
        const todo = this;
        todo.set({
            editing: true
        });
    }
    disableEdit() {
        const todo = this;
        todo.set({
            editing: false
        });
    }
    toJSON() {
        const row = {
            id: this.id,
            name: this.name,
            status: this.status
        };
        return row;
    }
}
exports.TodoModel = TodoModel;


/***/ }),

/***/ "./examples/TodoMVC/app/todo/TodoView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const react_dom_1 = __importDefault(__webpack_require__("react-dom"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
class TodoView extends mvc_tsx_1.View {
    template(todo) {
        let content;
        if (todo.editing) {
            content = (react_1.default.createElement("input", { className: "edit EditNameInput", defaultValue: todo.name, ref: "EditNameInput" }));
        }
        else {
            content = (react_1.default.createElement("div", { className: "view" },
                react_1.default.createElement("input", { className: "toggle ToggleStatus", type: "checkbox", checked: todo.isCompleted(), onChange: (e) => 1 }),
                react_1.default.createElement("label", { className: "StartEdit" }, todo.name),
                react_1.default.createElement("button", { className: "destroy RemoveTodo" })));
        }
        return (react_1.default.createElement("li", { className: this.getStatusClassName(todo) }, content));
    }
    componentDidUpdate() {
        const todo = this.model;
        if (todo.editing) {
            const inputEl = react_dom_1.default.findDOMNode(this.refs.EditNameInput);
            if (inputEl) {
                inputEl.focus();
                inputEl.setSelectionRange(todo.name.length, todo.name.length);
            }
        }
    }
    getStatusClassName(todo) {
        const classes = [];
        if (todo.status === TodoModel_1.TodoStatus.active) {
            classes.push("active");
        }
        else {
            classes.push("completed");
        }
        if (todo.editing) {
            classes.push("editing");
        }
        return classes.join(" ");
    }
}
exports.TodoView = TodoView;
TodoView.ui = {
    nameInput: ".EditNameInput",
    startEdit: ".StartEdit",
    remove: ".RemoveTodo"
};


/***/ }),

/***/ "./examples/TodoMVC/app/todo/controllers/EditNameController.ts":
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
const TodoView_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoView.tsx");
const keyCodes_1 = __webpack_require__("./examples/TodoMVC/app/keyCodes.ts");
let EditNameController = class EditNameController extends mvc_tsx_1.Controller {
    onStartEdit(target) {
        const todo = this.model;
        todo.enableEdit();
    }
    onKeyupEditInput(keyCode, inputValue) {
        if (keyCode === keyCodes_1.ENTER_KEY_CODE) {
            this.onPressEnter(inputValue);
        }
        if (keyCode === keyCodes_1.ESCAPE_KEY_CODE) {
            this.onPressEscape();
        }
    }
    onBlurEditInput() {
        const todo = this.model;
        todo.disableEdit();
    }
    onPressEnter(inputValue) {
        const todo = this.model;
        todo.disableEdit();
        todo.setName(inputValue);
    }
    onPressEscape() {
        const todo = this.model;
        todo.disableEdit();
    }
};
__decorate([
    mvc_tsx_1.on("dblclick", TodoView_1.TodoView.ui.startEdit),
    __param(0, mvc_tsx_1.event("target")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLDivElement]),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onStartEdit", null);
__decorate([
    mvc_tsx_1.on("keyup", TodoView_1.TodoView.ui.nameInput),
    __param(0, mvc_tsx_1.event("keyCode")),
    __param(1, mvc_tsx_1.event("target", "value")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onKeyupEditInput", null);
__decorate([
    mvc_tsx_1.on("blur", TodoView_1.TodoView.ui.nameInput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditNameController.prototype, "onBlurEditInput", null);
EditNameController = __decorate([
    mvc_tsx_1.forView(TodoView_1.TodoView)
], EditNameController);
exports.EditNameController = EditNameController;


/***/ }),

/***/ "./examples/TodoMVC/app/todo/controllers/ToggleStatusController.ts":
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
exports.ToggleStatusController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const TodoView_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoView.tsx");
let ToggleStatusController = class ToggleStatusController extends mvc_tsx_1.Controller {
    onChangeTodoCheckbox() {
        const todo = this.model;
        todo.toggleStatus();
    }
};
__decorate([
    mvc_tsx_1.on("change", ".ToggleStatus"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToggleStatusController.prototype, "onChangeTodoCheckbox", null);
ToggleStatusController = __decorate([
    mvc_tsx_1.forView(TodoView_1.TodoView)
], ToggleStatusController);
exports.ToggleStatusController = ToggleStatusController;


/***/ }),

/***/ "./examples/TodoMVC/app/todo/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EditNameController = exports.ToggleStatusController = exports.TodoView = exports.TodoModel = void 0;
const TodoModel_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoModel.ts");
Object.defineProperty(exports, "TodoModel", { enumerable: true, get: function () { return TodoModel_1.TodoModel; } });
const TodoView_1 = __webpack_require__("./examples/TodoMVC/app/todo/TodoView.tsx");
Object.defineProperty(exports, "TodoView", { enumerable: true, get: function () { return TodoView_1.TodoView; } });
const ToggleStatusController_1 = __webpack_require__("./examples/TodoMVC/app/todo/controllers/ToggleStatusController.ts");
Object.defineProperty(exports, "ToggleStatusController", { enumerable: true, get: function () { return ToggleStatusController_1.ToggleStatusController; } });
const EditNameController_1 = __webpack_require__("./examples/TodoMVC/app/todo/controllers/EditNameController.ts");
Object.defineProperty(exports, "EditNameController", { enumerable: true, get: function () { return EditNameController_1.EditNameController; } });


/***/ }),

/***/ "./examples/TodoMVC/index.tsx":
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
const app_1 = __webpack_require__("./examples/TodoMVC/app/index.ts");
const appModel = new app_1.AppModel();
ReactDOM.render(React.createElement(app_1.AppView, { model: appModel }), document.getElementById("app"));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/TodoMVC/app/App.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #4d4d4d;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n:focus {\n\toutline: 0;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -155px;\n\twidth: 100%;\n\tfont-size: 100px;\n\tfont-weight: 100;\n\ttext-align: center;\n\tcolor: rgba(175, 47, 47, 0.15);\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tborder: 0;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\ttext-align: center;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n}\n\n.toggle-all + label {\n\twidth: 60px;\n\theight: 34px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -52px;\n\tleft: -13px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all + label:before {\n\tcontent: '❯';\n\tfont-size: 22px;\n\tcolor: #e6e6e6;\n\tpadding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #737373;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: 506px;\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n}\n\n.todo-list li.completed label {\n\tcolor: #d9d9d9;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #cc9a9a;\n\tmargin-bottom: 11px;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n\tcolor: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '×';\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tcolor: #777;\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n\tborder-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 20px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #bfbfbf;\n\tfont-size: 10px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}", ""]);
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

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./examples/TodoMVC/index.tsx");


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