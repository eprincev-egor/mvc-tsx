import * as React from "react";
import * as ReactDOM from "react-dom";
import { products } from "./products";
import { RootView } from "./root/RootView";
import { RootModel } from "./root/RootModel";

const rootModel = new RootModel(products);

ReactDOM.render(
    <RootView model={rootModel}/>,
    document.getElementById("root")
);
