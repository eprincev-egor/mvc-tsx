import { Controller, on, forView } from "mvc-tsx";
import { CounterModel } from "./CounterModel";
import { CounterView } from "./CounterView";

@forView(CounterView)
export class CounterController extends Controller<CounterModel> {
    
    @on("click", CounterView.ui.raiseButton)
    onClickButton() {
        this.model.set({
            counter: this.model.counter + 1
        });
    }

}