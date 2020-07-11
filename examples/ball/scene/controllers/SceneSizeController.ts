import { Controller, on, event, forView } from "mvc-tsx";
import { SceneModel } from "../SceneModel";
import { SceneView } from "../SceneView";

@forView(SceneView)
export class SceneSizeController extends Controller<SceneModel> {

    @on("load", "window")
    @on("resize", "window")
    onResizeWindow() {
        
        const scene = this.model;
        scene.set({
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        });
    }
}