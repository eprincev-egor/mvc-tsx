
import { Controller, on, forView, event } from "mvc-tsx";
import { SceneModel } from "../SceneModel";
import { SceneView } from "../SceneView";
import { BallView } from "../ball";

@forView(SceneView)
export class DragDropController extends Controller<SceneModel> {

    private startBallPosition = {
        x: 0,
        y: 0
    };
    private startMousePosition = {
        x: 0,
        y: 0
    };


    @on("mousedown", BallView)
    onDragStart(
        @event("clientX") mouseX: number,
        @event("clientY") mouseY: number
    ) {
        this.startMousePosition = {
            x: mouseX,
            y: mouseY
        };

        const scene = this.model;
        const ball = scene.ball;

        this.startBallPosition = {
            x: ball.x,
            y: ball.y
        };

        ball.setCapture(true);
    }

    @on("mousemove", "window")
    onMove(
        @event("clientX") currentMouseX: number,
        @event("clientY") currentMouseY: number
    ) {
        const scene = this.model;
        const ball = scene.ball;

        if ( !ball.captured ) {
            return;
        }

        const mouseDeltaX = currentMouseX - this.startMousePosition.x;
        const mouseDeltaY = currentMouseY - this.startMousePosition.y;

        let x = this.startBallPosition.x + mouseDeltaX;
        x = fixBounds(x, scene.width, ball.getDiameter());

        let y = this.startBallPosition.y + mouseDeltaY;
        y = fixBounds(y, scene.height, ball.getDiameter());
        
        ball.setPosition(x, y);
    }

    @on("mouseup", "window")
    onDrop() {
        const scene = this.model;
        const ball = scene.ball;

        ball.setCapture(false);
    }
}

function fixBounds(
    coordinate: number, 
    sceneSize: number,
    ballDiameter: number
): number {
    coordinate = Math.max(0, coordinate);
    coordinate = Math.min(
        coordinate,
        sceneSize - ballDiameter
    );

    return coordinate;
}