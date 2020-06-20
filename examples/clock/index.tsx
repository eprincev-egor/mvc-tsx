import * as React from "react";
import * as ReactDOM from "react-dom";
import { ClockView } from "./ClockView";
import { ClockModel } from "./ClockModel";

const clockModel = new ClockModel();

ReactDOM.render(
    <ClockView model={clockModel}/>,
    document.getElementById("root")
);
