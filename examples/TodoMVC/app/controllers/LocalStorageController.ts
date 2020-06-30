import { Controller, on, forView } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { AppView } from "../AppView";
import { TodoModel, ITodoRow } from "../todo/TodoModel";

@forView(AppView)
export class LocalStorageController extends Controller<AppModel> {
    private loading: boolean = false;

    constructor(app: AppModel) {
        super(app);
        
        this.onChangeTodo = this.onChangeTodo.bind(this);

        setTimeout(() => {
            this.loadTodos();
        });
    }

    @on(AppModel, "createTodo")
    onCreateTodo(todo: TodoModel) {

        this.saveTodos();
        this.listenTodo(todo);
    }

    @on(AppModel, "removeTodo")
    onRemoveTodo(todo: TodoModel) {

        this.saveTodos();
        this.stopListenTodo(todo);
    }

    private onChangeTodo() {
        this.saveTodos();
    }

    private loadTodos() {
        const todosJSON = localStorage.getItem("todos");
        if ( !todosJSON ) {
            return;
        }

        this.loading = true;
        try {
            const app = this.model;
            const todosRows = JSON.parse(todosJSON) as ITodoRow[];

            for (const row of todosRows) {
                app.createTodo(row.name, row.status);
            }

        } catch(err) {
            // tslint:disable-next-line: no-console
            console.error("failed parse todos from localStorage", err);
        }
        this.loading = false;
    }

    private saveTodos() {
        if ( this.loading ) {
            return;
        }
        
        const app = this.model;
        const todosRows = app.todos.map(todo =>
            todo.toJSON()
        );
        const todosJSON = JSON.stringify(todosRows);

        localStorage.setItem("todos", todosJSON);
    }

    private listenTodo(todo: TodoModel) {
        todo.on("change", this.onChangeTodo);
    }

    private stopListenTodo(todo: TodoModel) {
        todo.off("change", this.onChangeTodo);
    }
}