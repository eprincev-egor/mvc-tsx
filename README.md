# MVC-TSX  (WIP, alpha version)

MVC-TSX позволяет писать императивный код для построения реактивных приложений.

```tsx
import React from "react";
import * as ReactDOM from "react-dom";
import {Model, View, Controller, on, arg} from "mvc";

// define Model
class LoginModel extends Model {
    login: string;
    password: string;
}

// define Controller
class LoginController extends Controller<LoginModel> {

    @on("change", ".Login--loginInput")
    onChangeLogin( @arg("target", "value") inputValue ) {
        this.model.set({
            name: inputValue
        });
    }

    @on("change", ".Login--passInput")
    onChangePassword( @arg("target", "value") inputValue ) {
        this.model.set({
            password: inputValue
        });
    }

    @on("click", ".User--loginBtn")
    onClickLogin() {
        const {login, password} = this.model;
        // do login ...
    }
}

// define View
class LoginView extends View<LoginModel> {
    
    // list of Controllers
    controllers() {
        return [
            LoginController
        ];
    }

    template(loginModel: LoginModel>) {
        return (<div className="Login">
            <input className="Login--loginInput"/>
            <input className="Login--passInput"/>
        </div>);
    }

}

// and render
const loginModel = new LoginModel();

ReactDOM.render(
    <LoginView model={loginModel}/>,
    document.getElementById("root")
);

```