import { Controller, on, forView } from "mvc-tsx";
import { TodoModel } from "../TodoModel";
import { TodoView } from "../TodoView";

@forView(TodoView)
export class ToggleStatusController extends Controller<TodoModel> {

    @on("change", ".ToggleStatus")
    onChangeTodoCheckbox() {
        const todo = this.model;
        todo.toggleStatus();
    }

}
