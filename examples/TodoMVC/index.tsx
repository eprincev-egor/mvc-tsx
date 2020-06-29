import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppModel, AppView } from "./app";

const appModel = new AppModel();

ReactDOM.render(
    <AppView model={appModel}/>,
    document.getElementById("app")
);
