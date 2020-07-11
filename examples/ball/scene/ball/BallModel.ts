import { Model } from "mvc-tsx";

export class BallModel extends Model {
    color = "red";
    radius = 30;
    x = 0;
    y = 0;
    captured = false;

    setCapture(newCapturedState: boolean) {
        const ball: BallModel = this;

        ball.set({
            captured: newCapturedState
        });
    }

    setPosition(x: number, y: number) {
        const ball: BallModel = this;

        ball.set({
            x, y
        });
    }

    getDiameter() {
        return this.radius * 2;
    }
}