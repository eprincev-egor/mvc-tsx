import { Model } from "mvc-tsx";
import { TodoStatus, TodoModel } from "./todo/TodoModel";

export class AppModel extends Model {
    statusFilter: "all" | "active" | "completed" = "all";
    todos: TodoModel[] = [];
    activeTodosCount: number = 0;

    createTodo(todoName: string, status = TodoStatus.active) {
        const app: AppModel = this;

        const todo = new TodoModel(todoName, status);
        const newTodos = [...app.todos, todo];

        app.set({
            todos: newTodos
        });
        app.recalculateActiveTodosCount();

        app.emit("createTodo", todo);
    }

    removeTodo(todoId: number) {
        const app: AppModel = this;
        const todo = app.todos.find(someTodo =>
            someTodo.id === todoId
        );

        if ( todo ) {
            const newTodos = [...app.todos];

            const todoIndex = newTodos.indexOf(todo);
            newTodos.splice(todoIndex, 1);

            app.set({
                todos: newTodos
            });
            app.recalculateActiveTodosCount();

            app.emit("removeTodo", todo);
        }
    }

    setStatusFilter(newStatusFilter: this["statusFilter"]) {
        const app: AppModel = this;

        app.set({
            statusFilter: newStatusFilter
        });
    }

    getFilteredTodos() {
        const app: AppModel = this;
        const filteredTodos = app.todos.filter(todo =>
            this.filterTodo(todo)
        );

        return filteredTodos;
    }

    private filterTodo(todo: TodoModel) {
        if ( this.statusFilter === "active" ) {
            return todo.isActive();
        }
        if ( this.statusFilter === "completed" ) {
            return todo.isCompleted();
        }
        
        return true;
    }

    setAllTodosStatus(newStatus: TodoStatus) {
        const app: AppModel = this;
        
        app.todos.forEach(todo =>
            todo.setStatus(newStatus)
        );
        app.recalculateActiveTodosCount();
    }

    isAllCompleted() {
        const app: AppModel = this;
        const activeTodosCount = app.activeTodosCount;
        const allTodosCount = app.todos.length;
        
        const isAllCompleted = (
            allTodosCount > 0 &&
            activeTodosCount === 0
        );

        return isAllCompleted;
    }

    hasCompletedTodo() {
        const app: AppModel = this;
        const hasCompletedTodo = app.todos.some(todo =>
            todo.isCompleted()
        );

        return hasCompletedTodo;
    }

    clearCompleted() {
        const app: AppModel = this;
        const removedTodos = app.todos.filter(todo =>
            todo.isCompleted()
        );
        const newTodos = app.todos.filter(todo =>
            todo.isActive()
        );

        app.set({
            todos: newTodos
        });
        app.recalculateActiveTodosCount();

        for (const todo of removedTodos) {
            app.emit("removeTodo", todo);
        }
    }

    recalculateActiveTodosCount() {
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