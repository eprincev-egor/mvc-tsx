import React from "react";
import { View } from "mvc-tsx";
import { TodoModel, TodoStatus } from "./TodoModel";

export class TodoView extends View<TodoModel> {
    
    template(todo: TodoModel) {
        return (<li className={this.getStatusClassName(todo)}>
            <div className="view">
                <input 
                    className="toggle ToggleStatus" 
                    type="checkbox"
                    checked={todo.isCompleted()}
                    onChange={(e) => 1}
                />
                <label>{todo.name}</label>
                <button className="destroy RemoveTodo"></button>
            </div>
            <input className="edit" defaultValue={todo.name}/>
        </li>);
    }

    getStatusClassName(todo: TodoModel) {
        if ( todo.status === TodoStatus.active ) {
            return "active";
        }
        else {
            return "completed";
        }
    }
}