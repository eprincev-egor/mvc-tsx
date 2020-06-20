import { Controller } from "mvc-tsx";
import { ClockModel } from "./ClockModel";

export class ClockController extends Controller<ClockModel> {
    
    constructor(model: ClockModel) {
        super(model);

        this.createInterval();
    }

    private createInterval() {
        setInterval(() => {
            this.nextTick();
        }, 500);
    }

    nextTick() {
        this.model.set({
            time: new Date()
        });
    }
}