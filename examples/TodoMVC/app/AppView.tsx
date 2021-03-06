import React from "react";
import { View } from "mvc-tsx";
import { AppModel } from "./AppModel";
import { TodoView } from "./todo/TodoView";
import "./App.css";

export class AppView extends View<AppModel> {

    static ui = {
        addTodo: ".AddTodo",
        clearCompleted: ".ClearCompleted",
        toggleAllStatus: ".ToggleAllStatus"
    };
    
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
                            <a 
                                className={app.statusFilter === "all" ? "selected" : ""} 
                                href="#/"
                            >All</a>
                        </li>
                        <li>
                            <a 
                                className={app.statusFilter === "active" ? "selected" : ""} 
                                href="#/active"
                            >Active</a>
                        </li>
                        <li>
                            <a 
                                className={app.statusFilter === "completed" ? "selected" : ""} 
                                href="#/completed"
                            >Completed</a>
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
                        {app.getFilteredTodos().map(item =>
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