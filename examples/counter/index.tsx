import * as React from "react";
import * as ReactDOM from "react-dom";
import { CounterView } from "./CounterView";
import { CounterModel } from "./CounterModel";

const counterModel = new CounterModel();

ReactDOM.render(
    <CounterView model={counterModel}/>,
    document.getElementById("root")
);
