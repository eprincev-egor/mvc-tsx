import React from "react";
import { View } from "mvc-tsx";
import { AppModel } from "./AppModel";
import { TodoView } from "./todo/TodoView";
import { AddTodoController } from "./controllers/AddTodoController";
import { RemoveTodoController } from "./controllers/RemoveTodoController";
import { ToggleStatusController } from "./controllers/ToggleStatusController";
import { LocalStorageController } from "./controllers/LocalStorageController";
import "./App.css";

export class AppView extends View<AppModel> {

    controllers() {
        return [
            AddTodoController,
            RemoveTodoController,
            ToggleStatusController,
            LocalStorageController
        ];
    }
    
    template(app: AppModel) {
        return (
            <section className="todoapp">

                <header className="header">
                    <h1>todos</h1>
                    <input 
                        className="new-todo AddTodo" 
                        placeholder="What needs to be done?" 
                        autoFocus={true}
                        defaultValue=""
                    />
                </header>

                <section className="main">
                    <input 
                        className="toggle-all ToggleAllStatus" 
                        id="toggle-all" 
                        type="checkbox"
                        defaultChecked={false}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>

                    <ul className="todo-list">
                        {app.todos.map(item =>
                            <TodoView model={item} key={item.id}/>
                        )}
                    </ul>
                </section>

                <footer className="footer">
                    <span className="todo-count">
                        <strong>{app.activeTodosCount}</strong> {this.getItemsWord()} left
                    </span>

                    <ul className="filters">
                        <li>
                            <a className="selected" href="#/">All</a>
                        </li>
                        <li>
                            <a href="#/active">Active</a>
                        </li>
                        <li>
                            <a href="#/completed">Completed</a>
                        </li>
                    </ul>
                </footer>

        </section>
        );
    }

    getItemsWord() {
        const app = this.model;
        if ( app.activeTodosCount === 1 ) {
            return "item";
        }
        else {
            return "items";
        }
    }
}