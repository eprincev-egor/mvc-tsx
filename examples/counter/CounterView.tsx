import React from "react";
import { View } from "mvc-tsx";
import { CounterModel } from "./CounterModel";

export class CounterView extends View<CounterModel> {
    static ui = {
        raiseButton: ".Counter--button"
    };

    template(model: CounterModel) {
        return <div className="Counter">
            <div className="Counter--value">{model.counter}</div>
            <button className="Counter--button">raise</button>
        </div>
    }
}