import * as React from "react";
import * as ReactDOM from "react-dom";
import { SceneView, SceneModel } from "./scene";

const sceneModel = new SceneModel();

ReactDOM.render(
    <SceneView model={sceneModel}/>,
    document.getElementById("root")
);
