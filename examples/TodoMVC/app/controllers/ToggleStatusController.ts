import { Controller, on, arg } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoModel, TodoStatus } from "../todo/TodoModel";

export class ToggleStatusController extends Controller<AppModel> {

    @on("change", ".ToggleStatus")
    onChangeTodoCheckbox(
        @arg(TodoModel) todo: TodoModel,
        @arg("target", "checked") checked: boolean
    ) {
        const app = this.model;
        const newStatus = toggleStatus(checked);

        app.setTodoStatus(todo.id, newStatus);
    }

    @on("change", ".ToggleAllStatus")
    onChangeToggleAll(
        @arg("target", "checked") checked: boolean
    ) {
        const app = this.model;
        const newStatus = toggleStatus(checked);

        app.setAllTodosStatus(newStatus);
    }

}

function toggleStatus(checked: boolean): TodoStatus {
    const newStatus: TodoStatus = (
        checked ?
            TodoStatus.active :
            TodoStatus.completed
    );
    return newStatus;
}