import { Model } from "mvc-tsx";
import { TodoStatus, TodoModel, ITodoRow } from "./todo/TodoModel";

export class AppModel extends Model {
    filterStatus: TodoStatus | null = null;
    todos: TodoModel[] = [];
    activeTodosCount: number = 0;

    createTodo(todoName: string) {
        const app: AppModel = this;

        const todo = new TodoModel(todoName);
        const newTodos = [...app.todos, todo];

        app.set({
            todos: newTodos
        });
        app.recalculateActiveTodosCount();
    }

    removeTodo(todoId: number) {
        const app: AppModel = this;
        const todo = app.getTodo(todoId);

        if ( todo ) {
            const newTodos = [...app.todos];

            const todoIndex = newTodos.indexOf(todo);
            newTodos.splice(todoIndex, 1);

            app.set({
                todos: newTodos
            });
            app.recalculateActiveTodosCount();
        }
    }

    setTodoStatus(todoId: number, newStatus: TodoStatus) {
        const app: AppModel = this;
        const todo = app.getTodo(todoId);
        
        if ( todo ) {
            todo.setStatus(newStatus);
            app.recalculateActiveTodosCount();
        }
    }

    setAllTodosStatus(newStatus: TodoStatus) {
        const app: AppModel = this;
        
        app.todos.forEach(todo =>
            todo.setStatus(newStatus)
        );
        app.recalculateActiveTodosCount();
    }

    setTodosRows(todosRows: ITodoRow[]) {
        const app: AppModel = this;
        const todos = todosRows.map(row =>
            TodoModel.fromJSON(row)
        );
        
        app.set({
            todos
        });
        app.recalculateActiveTodosCount();
    }

    getTodosRows(): ITodoRow[] {
        const app: AppModel = this;
        const rows = app.todos.map(todo =>
            todo.toJSON()
        );
        return rows;
    }

    getTodo(todoId: number): TodoModel | undefined {
        const app: AppModel = this;
        const todo = app.todos.find(someTodo =>
            someTodo.id === todoId
        );

        return todo;
    }

    private recalculateActiveTodosCount() {
        const app: AppModel = this;
        const newActiveTodosCount = app.calculateActiveTodosCount();

        app.set({
            activeTodosCount: newActiveTodosCount
        });
    }

    private calculateActiveTodosCount() {
        const app: AppModel = this;
        const activeTodos = app.todos.filter(todo =>
            todo.isActive()
        );
        const activeTodosCount = activeTodos.length;

        return activeTodosCount;
    }
}