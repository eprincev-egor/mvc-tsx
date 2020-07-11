import { Controller, forView } from "mvc-tsx";
import { SceneModel } from "..";
import { SceneView } from "../SceneView";

@forView(SceneView)
export class GravityController extends Controller<SceneModel> {
    constructor(scene: SceneModel) {
        super(scene);

        this.createInterval();
    }

    private createInterval() {
        setInterval(() => {
            this.processBallGravity();
        }, 30);
    }

    private processBallGravity() {
        const scene = this.model;
        const ball = scene.ball;

        if ( ball.captured ) {
            return;
        }

        const maxY = scene.height - ball.getDiameter();
        const newY = Math.min(ball.y + 10, maxY);
        
        ball.setPosition(
            ball.x,
            newY
        );
    }
}