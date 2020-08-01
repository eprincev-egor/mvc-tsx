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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/chat-group/components/chat/group/Group.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/chat/group/Group.css");

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

/***/ "./examples/chat-group/components/chat/group/GroupModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const user_1 = __webpack_require__("./examples/chat-group/components/chat/user/index.ts");
class GroupModel extends mvc_tsx_1.Model {
    constructor() {
        super(...arguments);
        this.name = "";
        this.usersIds = [];
        this.searchPhrase = "";
        this.filteredUsers = [];
    }
    getUser(userId) {
        const userModel = this.filteredUsers.find(user => user.id === userId);
        return userModel;
    }
    setFilteredUsers(users) {
        const group = this;
        const usersModels = users.map(userRow => {
            const isSelected = group.usersIds.includes(userRow.id);
            const userModel = new user_1.UserModel(userRow, isSelected, group.searchPhrase);
            return userModel;
        });
        group.set({
            filteredUsers: usersModels
        });
    }
    setSearchPhrase(newSearchPhrase) {
        const group = this;
        group.set({ searchPhrase: newSearchPhrase });
    }
    setAvatar(newAvatar) {
        const group = this;
        group.set({
            avatar: newAvatar
        });
    }
}
exports.GroupModel = GroupModel;


/***/ }),

/***/ "./examples/chat-group/components/chat/group/GroupView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const GroupModel_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupModel.ts");
const user_1 = __webpack_require__("./examples/chat-group/components/chat/user/index.ts");
__webpack_require__("./examples/chat-group/components/chat/group/Group.css");
class GroupView extends mvc_tsx_1.View {
    template(group) {
        return react_1.default.createElement("div", { className: "ChatGroup" },
            react_1.default.createElement("div", { className: "ChatGroup--head" },
                this.printAvatar(group),
                react_1.default.createElement("div", { className: "ChatGroup--form" },
                    react_1.default.createElement("input", { className: "ChatGroup--groupNameInput", placeholder: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B", autoFocus: true }),
                    react_1.default.createElement("div", { className: "ChatGroup--searchUsers" },
                        react_1.default.createElement("input", { className: "ChatGroup--searchUsersInput", placeholder: "\u041F\u043E\u0438\u0441\u043A" })))),
            react_1.default.createElement("div", { className: "ChatGroup--users " + (group.filteredUsers.length === 0 ?
                    "ChatGroup--users-empty" : "") },
                react_1.default.createElement("div", { className: "ChatGroup--usersEmptyBox" },
                    react_1.default.createElement("div", { className: "ChatGroup--usersEmptyText" }, "\u041D\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439")),
                group.filteredUsers.map(user => react_1.default.createElement(user_1.UserView, { model: user, key: user.id }))),
            react_1.default.createElement("div", { className: "ChatGroup--bottom" },
                react_1.default.createElement("div", { className: "ChatGroup--selectedUsersCount" }, this.getSelectedUsersCountText(group)),
                react_1.default.createElement("div", { className: "ChatGroup--clearSelectedButton" }, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C")));
    }
    getSelectedUsersCountText(group) {
        if (!group.usersIds.length) {
            return "";
        }
    }
    printAvatar(group) {
        if (group.avatar) {
            return react_1.default.createElement("div", { className: "ChatGroup--avatar", style: {
                    backgroundImage: `url('${group.avatar.url}')`
                } },
                react_1.default.createElement("input", { accept: "image/*", type: "file", className: "ChatGroup--avatarInput" }));
        }
        else {
            return react_1.default.createElement("div", { className: "ChatGroup--avatar fas fa-image" },
                react_1.default.createElement("input", { accept: "image/*", type: "file", className: "ChatGroup--avatarInput" }));
        }
    }
}
exports.GroupView = GroupView;
GroupView.defaultProps = {
    model: new GroupModel_1.GroupModel()
};
GroupView.ui = {
    avatarInput: ".ChatGroup--avatarInput",
    searchInput: ".ChatGroup--searchUsersInput"
};


/***/ }),

/***/ "./examples/chat-group/components/chat/group/controllers/OnlineStatusController.ts":
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
exports.OnlineStatusController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const GroupModel_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupModel.ts");
const GroupView_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupView.tsx");
const UsersService_1 = __webpack_require__("./examples/chat-group/server/UsersService.ts");
let OnlineStatusController = class OnlineStatusController extends mvc_tsx_1.Controller {
    constructor(group) {
        super(group);
        this.usersService = new UsersService_1.UsersService();
        this.usersService.listenUserEvents("login", (userId, loginDate) => this.onLoginUser(userId, loginDate));
        this.usersService.listenUserEvents("logout", (userId, logoutDate) => this.onLogoutUser(userId, logoutDate));
    }
    onLoginUser(userId, loginDate) {
        const group = this.model;
        const user = group.getUser(userId);
        if (!user) {
            return;
        }
        user.setLastLogin(loginDate);
    }
    onLogoutUser(userId, logoutDate) {
        const group = this.model;
        const user = group.getUser(userId);
        if (!user) {
            return;
        }
        user.setLastLogout(logoutDate);
    }
};
OnlineStatusController = __decorate([
    mvc_tsx_1.forView(GroupView_1.GroupView),
    __metadata("design:paramtypes", [GroupModel_1.GroupModel])
], OnlineStatusController);
exports.OnlineStatusController = OnlineStatusController;


/***/ }),

/***/ "./examples/chat-group/components/chat/group/controllers/SearchUsersController.ts":
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
exports.SearchUsersController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const GroupModel_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupModel.ts");
const GroupView_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupView.tsx");
const UsersService_1 = __webpack_require__("./examples/chat-group/server/UsersService.ts");
const ENTER_KEY_CODE = 13;
let SearchUsersController = class SearchUsersController extends mvc_tsx_1.Controller {
    constructor(group) {
        super(group);
        this.usersService = new UsersService_1.UsersService();
        this.load();
    }
    onKeyupInSearchInput(searchPhrase, keyCode) {
        const group = this.model;
        group.setSearchPhrase(searchPhrase);
        if (keyCode === ENTER_KEY_CODE) {
            this.onPressEnter();
        }
        else {
            this.onChangeSearchPhrase();
        }
    }
    onPressEnter() {
        this.clearTimeout();
        this.load();
    }
    onChangeSearchPhrase() {
        this.clearTimeout();
        this.timer = setTimeout(() => {
            this.load();
        }, 2000);
    }
    clearTimeout() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    async load() {
        const group = this.model;
        const searchPhrase = group.searchPhrase;
        const users = await this.usersService.findUsers(searchPhrase || undefined);
        group.setFilteredUsers(users);
    }
};
__decorate([
    mvc_tsx_1.on("keyup", GroupView_1.GroupView.ui.searchInput),
    __param(0, mvc_tsx_1.event("target", "value")),
    __param(1, mvc_tsx_1.event("keyCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], SearchUsersController.prototype, "onKeyupInSearchInput", null);
SearchUsersController = __decorate([
    mvc_tsx_1.forView(GroupView_1.GroupView),
    __metadata("design:paramtypes", [GroupModel_1.GroupModel])
], SearchUsersController);
exports.SearchUsersController = SearchUsersController;


/***/ }),

/***/ "./examples/chat-group/components/chat/group/controllers/UploadAvatarController.ts":
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
exports.UploadAvatarController = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const GroupView_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupView.tsx");
const FilesService_1 = __webpack_require__("./examples/chat-group/server/FilesService.ts");
let UploadAvatarController = class UploadAvatarController extends mvc_tsx_1.Controller {
    constructor() {
        super(...arguments);
        this.filesService = new FilesService_1.FilesService();
    }
    async onChangeAvatarFile(file) {
        const group = this.model;
        const uploadedURL = await this.filesService.uploadFile(file);
        const newAvatar = {
            url: uploadedURL
        };
        group.setAvatar(newAvatar);
    }
};
__decorate([
    mvc_tsx_1.on("change", GroupView_1.GroupView.ui.avatarInput),
    __param(0, mvc_tsx_1.event("target", "files", "0")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [File]),
    __metadata("design:returntype", Promise)
], UploadAvatarController.prototype, "onChangeAvatarFile", null);
UploadAvatarController = __decorate([
    mvc_tsx_1.forView(GroupView_1.GroupView)
], UploadAvatarController);
exports.UploadAvatarController = UploadAvatarController;


/***/ }),

/***/ "./examples/chat-group/components/chat/group/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineStatusController = exports.UploadAvatarController = exports.SearchUsersController = exports.GroupView = exports.GroupModel = void 0;
const GroupModel_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupModel.ts");
Object.defineProperty(exports, "GroupModel", { enumerable: true, get: function () { return GroupModel_1.GroupModel; } });
const GroupView_1 = __webpack_require__("./examples/chat-group/components/chat/group/GroupView.tsx");
Object.defineProperty(exports, "GroupView", { enumerable: true, get: function () { return GroupView_1.GroupView; } });
const SearchUsersController_1 = __webpack_require__("./examples/chat-group/components/chat/group/controllers/SearchUsersController.ts");
Object.defineProperty(exports, "SearchUsersController", { enumerable: true, get: function () { return SearchUsersController_1.SearchUsersController; } });
const UploadAvatarController_1 = __webpack_require__("./examples/chat-group/components/chat/group/controllers/UploadAvatarController.ts");
Object.defineProperty(exports, "UploadAvatarController", { enumerable: true, get: function () { return UploadAvatarController_1.UploadAvatarController; } });
const OnlineStatusController_1 = __webpack_require__("./examples/chat-group/components/chat/group/controllers/OnlineStatusController.ts");
Object.defineProperty(exports, "OnlineStatusController", { enumerable: true, get: function () { return OnlineStatusController_1.OnlineStatusController; } });


/***/ }),

/***/ "./examples/chat-group/components/chat/user/Highlight.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
class Highlight extends react_1.default.Component {
    render() {
        if (!this.props.highlightText) {
            return react_1.default.createElement("div", { className: this.props.className }, this.props.text);
        }
        const lowerText = this.props.text.toLowerCase();
        const lowerHighlightPhrase = this.props.text;
        const startHighlight = lowerText.indexOf(lowerHighlightPhrase);
        const endHighlight = startHighlight + lowerHighlightPhrase.length;
        if (startHighlight === -1) {
            return react_1.default.createElement("div", { className: this.props.className }, this.props.text);
        }
        const beforeText = this.props.text.slice(0, startHighlight);
        const highlightedText = this.props.text.slice(startHighlight, endHighlight);
        const afterText = this.props.text.slice(endHighlight);
        return react_1.default.createElement("div", { className: this.props.className },
            beforeText,
            react_1.default.createElement("span", { className: this.props.highlightClassName }, highlightedText),
            afterText);
    }
}
exports.Highlight = Highlight;


/***/ }),

/***/ "./examples/chat-group/components/chat/user/User.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/chat/user/User.css");

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

/***/ "./examples/chat-group/components/chat/user/UserModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class UserModel extends mvc_tsx_1.Model {
    constructor(userRow, selected = false, highlightPhrase = "") {
        super();
        this.selected = false;
        this.highlightPhrase = "";
        this.id = userRow.id;
        this.name = userRow.name;
        this.avatar = userRow.avatar;
        this.lastLogin = userRow.lastLogin;
        this.lastLogout = userRow.lastLogout;
        this.selected = selected;
        this.highlightPhrase = highlightPhrase;
    }
    getColor() {
        const user = this;
        const colors = [
            "red",
            "green",
            "blue",
            "orange"
        ];
        const colorIndex = +user.id % colors.length;
        const color = colors[colorIndex];
        return color;
    }
    setLastLogin(loginDate) {
        const user = this;
        if (user.lastLogin && user.lastLogin > loginDate) {
            return;
        }
        user.set({
            lastLogin: loginDate
        });
    }
    setLastLogout(logoutDate) {
        const user = this;
        if (user.lastLogout && user.lastLogout > logoutDate) {
            return;
        }
        user.set({
            lastLogout: logoutDate
        });
    }
    isOnline() {
        const user = this;
        const isOnline = user.lastLogin && (!user.lastLogout
            ||
                user.lastLogout < user.lastLogin);
        return isOnline;
    }
    getOnlineStatus() {
        const user = this;
        if (!user.lastLogin) {
            return "Не заходил";
        }
        const isOnline = (!user.lastLogout
            ||
                user.lastLogout < user.lastLogin);
        if (isOnline) {
            return "Онлайн";
        }
        if (user.lastLogout) {
            return `Заходил ${user.lastLogout.toLocaleTimeString()}`;
        }
        return "";
    }
}
exports.UserModel = UserModel;


/***/ }),

/***/ "./examples/chat-group/components/chat/user/UserView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
const Highlight_1 = __webpack_require__("./examples/chat-group/components/chat/user/Highlight.tsx");
__webpack_require__("./examples/chat-group/components/chat/user/User.css");
class UserView extends mvc_tsx_1.View {
    template(user) {
        return react_1.default.createElement("div", { className: this.getClassName(user) },
            this.printAvatar(user),
            react_1.default.createElement(Highlight_1.Highlight, { className: "ChatUser--userName", highlightClassName: "ChatUser--userNameHighlight", text: user.name, highlightText: user.highlightPhrase }),
            react_1.default.createElement("div", { className: "ChatUser--lastSeen" }, user.getOnlineStatus()));
    }
    getClassName(user) {
        const classes = ["ChatUser"];
        if (user.isOnline()) {
            classes.push("ChatUser-online");
        }
        const className = classes.join(" ");
        return className;
    }
    printAvatar(user) {
        if (user.avatar) {
            return react_1.default.createElement("div", { className: "ChatUser--avatar", style: {
                    backgroundImage: `url('${user.avatar.url}')`
                } });
        }
        else {
            return react_1.default.createElement("div", { className: "ChatUser--avatar ChatUser--avatar-default", "data-color": user.getColor() });
        }
    }
}
exports.UserView = UserView;


/***/ }),

/***/ "./examples/chat-group/components/chat/user/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = exports.UserModel = void 0;
const UserModel_1 = __webpack_require__("./examples/chat-group/components/chat/user/UserModel.ts");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return UserModel_1.UserModel; } });
const UserView_1 = __webpack_require__("./examples/chat-group/components/chat/user/UserView.tsx");
Object.defineProperty(exports, "UserView", { enumerable: true, get: function () { return UserView_1.UserView; } });


/***/ }),

/***/ "./examples/chat-group/components/window/Window.css":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/window/Window.css");

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

/***/ "./examples/chat-group/components/window/WindowModel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowModel = void 0;
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
class WindowModel extends mvc_tsx_1.Model {
    constructor(title, width, height) {
        super();
        this.title = title;
        this.width = width;
        this.height = height;
    }
}
exports.WindowModel = WindowModel;


/***/ }),

/***/ "./examples/chat-group/components/window/WindowView.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowView = void 0;
const react_1 = __importDefault(__webpack_require__("react"));
const mvc_tsx_1 = __webpack_require__("mvc-tsx");
__webpack_require__("./examples/chat-group/components/window/Window.css");
class WindowView extends mvc_tsx_1.View {
    template(windowModel) {
        return react_1.default.createElement("div", { className: "Window" },
            react_1.default.createElement("div", { className: "Window--head" },
                react_1.default.createElement("div", { className: "Window--title fas fa-arrows-alt" }, windowModel.title),
                react_1.default.createElement("div", { className: "Window--buttons" },
                    react_1.default.createElement("div", { className: "Window--helpButton fas fa-question" }),
                    react_1.default.createElement("div", { className: "Window--minimizeButton fas fa-minus" }),
                    react_1.default.createElement("div", { className: "Window--maximizeButton fas fa-desktop" }),
                    react_1.default.createElement("div", { className: "Window--closeButton fas fa-times" }))),
            react_1.default.createElement("div", { className: "Window--content" }, this.props.children));
    }
}
exports.WindowView = WindowView;


/***/ }),

/***/ "./examples/chat-group/components/window/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowView = exports.WindowModel = void 0;
const WindowModel_1 = __webpack_require__("./examples/chat-group/components/window/WindowModel.ts");
Object.defineProperty(exports, "WindowModel", { enumerable: true, get: function () { return WindowModel_1.WindowModel; } });
const WindowView_1 = __webpack_require__("./examples/chat-group/components/window/WindowView.tsx");
Object.defineProperty(exports, "WindowView", { enumerable: true, get: function () { return WindowView_1.WindowView; } });


/***/ }),

/***/ "./examples/chat-group/index.tsx":
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
const window_1 = __webpack_require__("./examples/chat-group/components/window/index.ts");
const group_1 = __webpack_require__("./examples/chat-group/components/chat/group/index.ts");
const windowModel = new window_1.WindowModel("Создать групповой чат", 320, 600);
ReactDOM.render(React.createElement(window_1.WindowView, { model: windowModel },
    React.createElement(group_1.GroupView, null)), document.getElementById("root"));


/***/ }),

/***/ "./examples/chat-group/server/FilesService.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const utils_1 = __webpack_require__("./examples/chat-group/server/utils.ts");
class FilesService {
    async uploadFile(file) {
        const base64 = await utils_1.convertFileToBase64(file);
        return base64;
    }
}
exports.FilesService = FilesService;


/***/ }),

/***/ "./examples/chat-group/server/UsersService.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const utils_1 = __webpack_require__("./examples/chat-group/server/utils.ts");
const testUsers_1 = __webpack_require__("./examples/chat-group/server/testUsers.ts");
class UsersService {
    constructor() {
        this.users = testUsers_1.testUsers;
    }
    async findUsers(searchPhrase) {
        await utils_1.sleepRandomTime();
        let users = this.users;
        if (searchPhrase) {
            const lowerSearchPhrase = searchPhrase.toLowerCase();
            users = users.filter(user => {
                const lowerUserName = user.name.toLowerCase();
                const containsSearchPhrase = lowerUserName.includes(lowerSearchPhrase);
                return containsSearchPhrase;
            });
        }
        users = users.map(user => cloneUser(user));
        return users;
    }
    async listenUserEvents(eventType, handler) {
        while (true) {
            await utils_1.sleepRandomTime();
            const randomDate = utils_1.getRandomDateNearNow();
            const randomUser = utils_1.getRandomArrayElement(this.users);
            if (eventType === "login") {
                const lastLogin = randomUser.lastLogin;
                const newLastLogin = calculateNewMaxDate(lastLogin, randomDate);
                randomUser.lastLogin = newLastLogin;
            }
            else {
                const lastLogout = randomUser.lastLogout;
                const newLastLogout = calculateNewMaxDate(lastLogout, randomDate);
                randomUser.lastLogout = newLastLogout;
            }
            handler(randomUser.id, randomDate);
        }
    }
}
exports.UsersService = UsersService;
function calculateNewMaxDate(lastDate, newDate) {
    if (!lastDate) {
        return newDate;
    }
    if (lastDate > newDate) {
        return lastDate;
    }
    return newDate;
}
function cloneUser(sourceUser) {
    const userClone = {
        ...sourceUser
    };
    if (sourceUser.avatar) {
        userClone.avatar = {
            ...sourceUser.avatar
        };
    }
    return userClone;
}


/***/ }),

/***/ "./examples/chat-group/server/testUsers.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsers = void 0;
exports.testUsers = [
    {
        id: "1",
        name: "Стэнли Кубрик",
        avatar: {
            url: "images/stan.jpg"
        },
        lastLogin: new Date(1990, 2, 7),
        lastLogout: new Date(1999, 2, 7)
    },
    {
        id: "2",
        name: "Джеффри Ансуорт",
        avatar: {
            url: "images/unsworth.jpg"
        },
        lastLogin: new Date(1970, 2, 7),
        lastLogout: new Date(1978, 9, 28)
    },
    {
        id: "3",
        name: "Кир Дуллеа",
        avatar: {
            url: "images/keir.jpg"
        },
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "4",
        name: "Хезер Даунхэм",
        avatar: {
            url: "images/downham.jpg"
        },
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "5",
        name: "Маргарет Тайзэк",
        avatar: {
            url: "images/margaret.jpg"
        },
        lastLogin: new Date(1960, 0, 1),
        lastLogout: new Date(2011, 5, 25)
    },
    {
        id: "6",
        name: "Уильям Сильвестр",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "7",
        name: "Дэниэл Риктер",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "8",
        name: "Леонард Росситер",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "9",
        name: "Роберт Битти",
        lastLogin: new Date(1960, 0, 1)
    }
];


/***/ }),

/***/ "./examples/chat-group/server/utils.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDateNearNow = exports.getRandomArrayElement = exports.sleep = exports.sleepRandomTime = exports.convertFileToBase64 = void 0;
/**
 * @see https://developer.mozilla.org/ru/docs/Web/API/File
 * @param file instanceof window.File
 * @returns Promise<string> string like are: "data:image/png;base64,iVBOR...."
 */
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const base64 = (fileReader.result || "").toString();
            resolve(base64);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
exports.convertFileToBase64 = convertFileToBase64;
/**
 * sleep some time in range 30ms - 3000ms
 */
async function sleepRandomTime() {
    const randomPause = 30 + 3000 * Math.random();
    await sleep(randomPause);
}
exports.sleepRandomTime = sleepRandomTime;
/**
 * sleep some time, just async wrapper for setTimeout
 * @param ms timeout in milliseconds
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function getRandomArrayElement(someArr) {
    const randomIndex = Math.floor(Math.random() * someArr.length);
    const randomElement = someArr[randomIndex];
    return randomElement;
}
exports.getRandomArrayElement = getRandomArrayElement;
function getRandomDateNearNow() {
    const now = Date.now();
    const randomDelta = Math.random() * 10000 - 5000;
    const randomUnixTimestamp = now + randomDelta;
    const randomDate = new Date(randomUnixTimestamp);
    return randomDate;
}
exports.getRandomDateNearNow = getRandomDateNearNow;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/chat/group/Group.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.ChatGroup {\n\theight: 100%;\n}\n\n.ChatGroup--head {\n    background: #4c6e93;\n    width: 100%;\n    display: inline-block;\n    height: 80px;\n}\n\n.ChatGroup--avatar {\n    width: 63px;\n    height: 79px;\n    float: left;\n\tposition: relative;\n\tbackground-size: cover;\n\tbackground-position: center center;\n}\n\n.ChatGroup--avatar:before {\n    color: white;\n    font-size: 38px;\n    position: absolute;\n    top: 50%;\n    margin-top: -22px;\n    left:  50%;\n    margin-left: -19px;\n    cursor: pointer;\n}\n\n.ChatGroup--avatarInput {\n    position: absolute;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n}\n\n.ChatGroup--form {\n    width: calc( 100% - 72px );\n    float: left;\n    padding-top: 6px;\n    padding-left: 5px;\n    padding-right: 4px;\n    box-sizing: border-box;\n}\n\n.ChatGroup--groupNameInput,\n.ChatGroup--searchUsersInput {\n\tposition: relative;\n\tz-index: 12;\n\theight: 26px;\n\tfont-size: 12px;\n\tpadding-right: 22px;\n\tpadding-left: 7px;\n\twidth: 100%;\n\tbackground: transparent;\n\tborder-radius: 0;\n\tborder: 1px solid transparent;\n\tborder-bottom: 1px solid #ccc;\n\tbox-shadow: 0px 0px;\n\tcolor: white;\n\tpadding-bottom: 4px;\n\tmargin-bottom: 7px;\n}\n\n.ChatGroup--groupNameInput:focus,\n.ChatGroup--searchUsersInput:focus {\n\tborder-top: 1px solid transparent;\n\tborder-left: 1px solid transparent;\n\tborder-right: 1px solid transparent;\n\tborder-bottom: 2px solid #ccc;\n\tpadding-bottom: 3px;\n\tbox-shadow: 0px 0px;\n\toutline: none;\n}\n\n.ChatGroup--groupNameInput::placeholder,\n.ChatGroup--searchUsersInput::placeholder {\n\tcolor: #ddd;\n}\n\n.ChatGroup--searchUsers {\n\tposition: relative;\n}\n\n.ChatGroup--searchUsers:after {\n\tfont-family: 'Font Awesome 5 Free';\n\tdisplay: block;\n\tcontent: \"\\f002\";\n\tfont-size: 12px;\n\tposition: absolute;\n\tright: 5px;\n\ttop: 8px;\n\tz-index: 11;\n\tfont-weight: bold;\n\tcolor: white;\n}\n\n.ChatGroup--users {\n    height: calc( 100% - 120px );\n    overflow: auto;\n    position: relative;\n    background: white;\n    box-sizing: border-box;\n    border: 1px solid #597696;\n    padding-top: 6px;\n    padding-bottom: 6px;\n}\n\n\n.ChatGroup--usersEmptyText {\n\tdisplay: inline-block;\n\tfont-family: Arial;\n\tbackground: rgb(189, 189, 189);\n\tcolor: white;\n\tpadding: 2px 12px;\n\tfont-size: 12px;\n\tborder-radius: 10px;\n\tpadding-top: 3px;\n}\n\n.ChatGroup--usersEmptyBox {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 50%;\n\twidth: 100%;\n\ttext-align: center;\n\tmargin-top: -11px;\n}\n\n.ChatGroup--users-empty .ChatGroup--usersEmptyBox {\n\tdisplay: block;\n}\n\n.ChatGroup--bottom {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    background: #4c6e93;\n    color: white;\n    font-size: 12px;\n    height: 40px;\n}\n\n.ChatGroup--selectedUsersCount {\n    float: left;\n    color: #ddd;\n    height: 100%;\n    line-height: 40px;\n    padding-left: 10px;\n}\n\n.ChatGroup--clearSelectedButton {\n\tmargin-bottom: 0px;\n\tfont-weight: normal;\n\tline-height: 1.42857;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tcursor: pointer;\n\tbackground-image: none;\n\tuser-select: none;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-image: initial;\n\tfont-size: 12px;\n\tpadding: 4px 12px;\n\tborder-radius: 0;\n\tcolor: #333;\n\tbackground-color: #fff;\n\tborder-color: #ccc;\n\tfont-family: Arial;\n\tfloat: right;\n\tmargin-top: 7px;\n\tmargin-right: 10px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/chat/user/User.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.ChatUser {\n    width: 100%;\n    overflow: hidden;\n    position: relative;\n    padding: 8px;\n    box-sizing: border-box;\n    user-select: none;\n    cursor: pointer;\n}\n\n.ChatUser:hover {\n\tbackground: #f2f2f2;\n\ttransition: all .2s;\n}\n\n.ChatUser--avatar {\n\twidth: 46px;\n\theight: 46px;\n\toverflow: hidden;\n\tborder-radius: 1000px;\n\tbackground-position: center center;\n\tbackground-size: cover;\n\tfloat: left;\n\tborder: 1px solid transparent;\n\tbox-sizing: border-box;\n\tposition: relative;\n}\n\n.ChatUser-selected .ChatUser--avatar {\n\tbox-shadow: 0px 0px 0px 2px #40ace3;\n    border: 1px solid white;\n}\n\n.ChatUser--userName {\n    float: left;\n    width: calc( 100% - 46px );\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    font-weight: bold;\n    font-size: 12px;\n    height: 23px;\n    line-height: 24px;\n    padding-left: 10px;\n    position: relative;\n    box-sizing: border-box;\n    font-family: Arial;\n}\n\n.ChatUser--userName:before {\n    font-family: 'Font Awesome 5 Free';\n    content: \"\\f00c\";\n    content: \"\\f00c\";\n    color: #40ace3;\n    font-size: 0;\n    transition: all .3s;\n    margin-right: 4px;\n}\n\n.ChatUser-selected .ChatUser--userName:before {\n    color: #40ace3;\n    font-size: 12px;\n}\n\n.ChatUser--lastSeen {\n    width: calc( 100% - 46px );\n    font-size: 12px;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    text-decoration: none;\n    color: #adadad;\n    font-family: Arial;\n    padding-left: 14px;\n    float: left;\n    box-sizing: border-box;\n}\n\n.ChatUser-online .ChatUser--lastSeen:before {\n\tcontent: \"\";\n\tdisplay: inline-block;\n\twidth: 6px;\n\theight: 6px;\n\tbackground: rgb(0 181 0);\n\tborder-radius: 100px;\n\tmargin-right: 4px;\n\tposition: relative;\n\tvertical-align: top;\n\tmargin-top: 3px;\n\tbox-shadow: 0px 0px 2px rgba(0, 181, 0, 0.6);\n}\n\n.ChatUser--avatar-default {\n\tbackground: #4c6e93;\n}\n\n.ChatUser--avatar-default:before {\n    font-family: 'Font Awesome 5 Free';\n    content: \"\\f007\";\n    font-weight: bold;\n    font-size: 38px;\n    line-height: 46px;\n    width: 100%;\n    text-align: center;\n    display: block;\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.ChatUser--avatar:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 100px;\n    box-sizing: border-box;\n}\n\n.ChatUser--avatar-default[data-color=\"red\"] {\n\tbackground: rgb(211, 100, 75);\n}\n\n.ChatUser--avatar-default[data-color=\"green\"] {\n\tbackground: rgb(117, 192, 87);\n}\n\n.ChatUser--avatar-default[data-color=\"blue\"] {\n\tbackground: rgb(100, 159, 211);\n}\n\n.ChatUser--avatar-default[data-color=\"orange\"] {\n\tbackground: rgb(228, 168, 97);\n}\n\n.ChatUser--avatar-loading:before {\n    content: \"\";\n    border-radius: 100px;\n    display: block;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: calc( 100% - 0px );\n    height: calc( 100% - 0px );\n    border: 2px solid #6a91b1;\n    border-top: 2px solid transparent;\n    -webkit-animation: fa-spin 2s infinite linear;\n    animation: fa-spin 2s infinite linear;\n    box-sizing: border-box;\n}\n\n.ChatUser--userNameHighlight {\n    display: inline;\n    background: yellow;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./examples/chat-group/components/window/Window.css":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.Window {\n    position: absolute;\n    width: 320px;\n    left: 50%;\n    margin-left: -160px;\n    top: 20px;\n    box-sizing: border-box;\n    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.6);\n    border-style: solid;\n    border-width: 3px;\n    border-color: #4c6e93;\n    box-sizing: border-box;\n    height: 600px;\n}\n\n.Window--content {\n\theight: calc( 100% - 20px );\n}\n\n.Window--head {\n    width: 100%;\n    background: #4c6e93;\n    color: white;\n    font-size: 12px;\n    font-family: arial;\n    height: 20px;\n}\n\n.Window--title {\n    display: inline-block;\n    font-family: arial;\n}\n\n.Window--title:before {\n    font-size: 14px;\n    display: inline-block;\n    padding: 2px;\n    padding-right: 5px;\n    font-family: 'Font Awesome 5 Free';\n    font-weight: 900;\n}\n\n.Window--buttons {\n    float: right;\n    font-size: 14px;\n}\n\n.Window--minimizeButton {\n    position: relative;\n}\n\n.Window--minimizeButton:before {\n    position: relative;\n    top: 4px;\n}\n\n.Window--helpButton {\n    font-size: 12px;\n}\n\n.Window--maximizeButton {\n    font-size: 12px;\n}\n\n.Window--helpButton,\n.Window--minimizeButton,\n.Window--maximizeButton,\n.Window--closeButton {\n    margin-right: 4px;\n    cursor: pointer;\n}\n", ""]);
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./examples/chat-group/index.tsx");


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