import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppView } from "./app/AppView";
import { AppModel } from "./app/AppModel";

const appModel = new AppModel();

ReactDOM.render(
    <AppView model={appModel}/>,
    document.getElementById("app")
);
