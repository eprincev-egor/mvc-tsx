import { Controller, on } from "mvc-tsx";
import { CounterModel } from "./CounterModel";

export class CounterController extends Controller<CounterModel> {
    
    @on("click", ".Counter--button")
    onClickButton() {
        this.model.set({
            counter: this.model.counter + 1
        });
    }

}