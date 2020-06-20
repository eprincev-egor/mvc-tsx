import React from "react";
import { View } from "mvc-tsx";
import { ClockController } from "./ClockController";
import { ClockModel } from "./ClockModel";

export class ClockView extends View<ClockModel> {
    controllers() {
        return [
            ClockController
        ];
    }

    template(model: ClockModel) {
        return <div className="Clock">
            {model.time.toTimeString()}
        </div>
    }
}