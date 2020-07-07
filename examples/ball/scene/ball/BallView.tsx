import { View } from "mvc-tsx";
import { BallModel } from "./BallModel";
import React from "react";
import "./Ball.css";

export class BallView extends View<BallModel> {

    template(ball: BallModel) {
        return <div className="Ball" style={{
            backgroundColor: ball.color,
            width: ball.radius * 2 + "px",
            height: ball.radius * 2 + "px",
            left: ball.x + "px",
            top: ball.y + "px"
        }}/>
    }

}