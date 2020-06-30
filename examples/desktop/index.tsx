import * as React from "react";
import * as ReactDOM from "react-dom";
import { DesktopView, DesktopModel } from "./desktop";
import { ItemModel } from "./desktop/item";

const desktopModel = new DesktopModel([
    new ItemModel({ name: "File 1.pdf", x: 20, y: 20 }),
    new ItemModel({ name: "File 2.pdf", x: 60, y: 60 })
]);

ReactDOM.render(
    <DesktopView model={desktopModel}/>,
    document.getElementById("root")
);
