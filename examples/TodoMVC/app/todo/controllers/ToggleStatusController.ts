import { Controller, on } from "mvc-tsx";
import { TodoModel } from "../TodoModel";

export class ToggleStatusController extends Controller<TodoModel> {

    @on("change", ".ToggleStatus")
    onChangeTodoCheckbox() {
        const todo = this.model;
        todo.toggleStatus();
    }

}
