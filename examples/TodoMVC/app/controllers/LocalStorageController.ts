import { Controller, on } from "mvc-tsx";
import { AppModel } from "../AppModel";

export class LocalStorageController extends Controller<AppModel> {
    
    constructor(app: AppModel) {
        super(app);
        this.loadTodos();
    }

    @on("change", "model")
    onChangeModel() {
        this.saveTodos();
    }

    private loadTodos() {
        const todosJSON = localStorage.getItem("todos");
        if ( !todosJSON ) {
            return;
        }

        try {
            const app = this.model;
            const todos = JSON.parse(todosJSON);

            app.setTodosRows(todos);
        } catch(err) {
            console.error("failed parse todos from localStorage", err);
        }
    }

    private saveTodos() {
        const app = this.model;
        const todosRows = app.getTodosRows();
        const todosJSON = JSON.stringify(todosRows);

        localStorage.setItem("todos", todosJSON);
    }

}