import * as React from "react";
import * as ReactDOM from "react-dom";
import { products } from "./products";
import { RootView, RootModel } from "./root";

const rootModel = new RootModel(products);

ReactDOM.render(
    <RootView model={rootModel}/>,
    document.getElementById("root")
);
