import { Controller, on, forView } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { AppView } from "../AppView";

@forView(AppView)
export class ClearCompletedController extends Controller<AppModel> {

    @on("click", AppView.ui.clearCompleted)
    onClickClearCompleted() {
        const app = this.model;
        app.clearCompleted();
    }
}