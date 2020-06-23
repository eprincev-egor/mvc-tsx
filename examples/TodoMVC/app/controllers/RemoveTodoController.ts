import { Controller, on, arg } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoModel } from "../todo/TodoModel";

export class RemoveTodoController extends Controller<AppModel> {
    
    @on("click", ".RemoveTodo")
    onClickRemove(
        @arg(TodoModel) todo: TodoModel
    ) {
        const app = this.model;
        app.removeTodo(todo.id);
    }

}