import { Controller, on, event, forView } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoStatus } from "../todo/TodoModel";
import { AppView } from "../AppView";

@forView(AppView)
export class ToggleAllTodosStatusController extends Controller<AppModel> {

    @on("change", AppView.ui.toggleAllStatus)
    onChangeToggleAll(
        @event("target", "checked") checked: boolean
    ) {
        const app = this.model;
        const newStatus = app.isAllCompleted() ? TodoStatus.active : TodoStatus.completed;

        app.setAllTodosStatus(newStatus);
    }

}