import { Controller, on } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { TodoModel } from "../todo/TodoModel";

export class ActiveCountController extends Controller<AppModel> {

    constructor(app: AppModel) {
        super(app);
        
        this.onChangeTodo = this.onChangeTodo.bind(this);
    }

    @on(AppModel, "createTodo")
    onCreateTodo(todo: TodoModel) {
        this.listenTodo(todo);
    }

    @on(AppModel, "removeTodo")
    onRemoveTodo(todo: TodoModel) {
        this.stopListenTodo(todo);
    }

    private onChangeTodo() {
        const app = this.model;
        app.recalculateActiveTodosCount();
    }

    private listenTodo(todo: TodoModel) {
        todo.on("change", this.onChangeTodo);
    }

    private stopListenTodo(todo: TodoModel) {
        todo.off("change", this.onChangeTodo);
    }
}