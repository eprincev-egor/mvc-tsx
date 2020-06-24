import React from "react";
import ReactDOM from "react-dom";
import { View } from "mvc-tsx";
import { TodoModel, TodoStatus } from "./TodoModel";
import { ToggleStatusController } from "./controllers/ToggleStatusController";
import { EditNameController } from "./controllers/EditNameController";

export class TodoView extends View<TodoModel> {
    
    controllers() {
        return [
            ToggleStatusController,
            EditNameController
        ];
    }
    
    template(todo: TodoModel) {
        let content!: JSX.Element;

        if ( todo.editing ) {
            content = (
                <input 
                    className="edit EditNameInput" 
                    defaultValue={todo.name}
                    ref="EditNameInput"
                />
            );
        }
        else {
            content = (
                <div className="view">
                    <input 
                        className="toggle ToggleStatus" 
                        type="checkbox"
                        checked={todo.isCompleted()}
                        onChange={(e) => 1}
                    />
                    <label className="StartEdit">{todo.name}</label>
                    <button className="destroy RemoveTodo"></button>
                </div>
            );
        }

        return (<li className={this.getStatusClassName(todo)}>
            {content}
        </li>);
    }

    componentDidUpdate() {
        const todo = this.model;
        if ( todo.editing ) {
            const inputEl = ReactDOM.findDOMNode(this.refs.EditNameInput) as HTMLInputElement | null;

            if ( inputEl ) {
                inputEl.focus();
                inputEl.setSelectionRange(todo.name.length, todo.name.length);
            }
        }
    }

    getStatusClassName(todo: TodoModel) {
        const classes: string[] = [];

        if ( todo.status === TodoStatus.active ) {
            classes.push("active");
        }
        else {
            classes.push("completed");
        }

        if ( todo.editing ) {
            classes.push("editing");
        }

        return classes.join(" ");
    }
}