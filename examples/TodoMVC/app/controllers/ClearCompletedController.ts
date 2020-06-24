import { Controller, on } from "mvc-tsx";
import { AppModel } from "../AppModel";

export class ClearCompletedController extends Controller<AppModel> {
    @on("click", ".ClearCompleted")
    onClickClearCompleted() {
        const app = this.model;
        app.clearCompleted();
    }
}