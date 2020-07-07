import { View } from "mvc-tsx";
import { SceneModel } from "./SceneModel";
import React from "react";
import {BallView} from "./ball";
import "./Scene.css";

export class SceneView extends View<SceneModel> {

    template(scene: SceneModel) {
        return <div className="Scene" style={{
            width: scene.width + "px",
            height: scene.height + "px"
        }}>
            <BallView model={scene.ball}></BallView>
        </div>
    }

}