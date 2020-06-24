import React from "react";
import { View } from "mvc-tsx";
import { AppModel } from "./AppModel";
import { TodoView } from "./todo/TodoView";
import { AddTodoController } from "./controllers/AddTodoController";
import { RemoveTodoController } from "./controllers/RemoveTodoController";
import { ToggleAllTodosStatusController } from "./controllers/ToggleAllTodosStatusController";
import { LocalStorageController } from "./controllers/LocalStorageController";
import { ActiveCountController } from "./controllers/ActiveCountController";
import { ClearCompletedController } from "./controllers/ClearCompletedController";
import "./App.css";

export class AppView extends View<AppModel> {

    controllers() {
        return [
            AddTodoController,
            RemoveTodoController,
            ToggleAllTodosStatusController,
            LocalStorageController,
            ActiveCountController,
            ClearCompletedController
        ];
    }
    
    template(app: AppModel) {
        let footer: JSX.Element | undefined;
        
        if ( app.todos.length ) {
            footer = (
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

                    {app.hasCompletedTodo() ? (
                        <span className="todo-clear">
                            <button className="clear-completed ClearCompleted">Clear completed</button>
                        </span>
                    ): null}
                </footer>
            );
        }

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
                        checked={app.isAllCompleted()}
                        onChange={(e) => 1}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>

                    <ul className="todo-list">
                        {app.todos.map(item =>
                            <TodoView model={item} key={item.id}/>
                        )}
                    </ul>
                </section>

                {footer}
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