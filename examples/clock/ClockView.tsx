import React from "react";
import { View } from "mvc-tsx";
import { ClockModel } from "./ClockModel";

export class ClockView extends View<ClockModel> {
    
    template(model: ClockModel) {
        return <div className="Clock">
            {model.time.toTimeString()}
        </div>
    }
}