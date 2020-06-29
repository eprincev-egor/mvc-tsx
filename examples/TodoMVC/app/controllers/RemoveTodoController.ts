import { Controller, on, arg, forView } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoModel } from "../todo/TodoModel";
import { TodoView } from "../todo";
import { AppView } from "../AppView";

@forView(AppView)
export class RemoveTodoController extends Controller<AppModel> {
    
    @on("click", TodoView.ui.remove)
    onClickRemove(
        @arg(TodoModel) todo: TodoModel
    ) {
        const app = this.model;
        app.removeTodo(todo.id);
    }

}