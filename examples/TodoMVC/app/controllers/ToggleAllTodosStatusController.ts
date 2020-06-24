import { Controller, on, arg } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoStatus } from "../todo/TodoModel";

export class ToggleAllTodosStatusController extends Controller<AppModel> {

    @on("change", ".ToggleAllStatus")
    onChangeToggleAll(
        @arg("target", "checked") checked: boolean
    ) {
        const app = this.model;
        const newStatus = app.isAllCompleted() ? TodoStatus.active : TodoStatus.completed;

        app.setAllTodosStatus(newStatus);
    }

}