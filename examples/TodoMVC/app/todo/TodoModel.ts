import { Model } from "mvc-tsx";

export enum TodoStatus {
    active,
    completed
}
export interface ITodoRow {
    id: number;
    name: string;
    status: TodoStatus;
}

let uid = 0;

export class TodoModel extends Model {
    
    static fromJSON(row: ITodoRow): TodoModel {
        const todo = new TodoModel(row.name);
        todo.id = row.id;
        todo.status = row.status;

        return todo;
    }

    status: TodoStatus;
    id: number;
    name: string;
    editing: boolean = false;
    
    constructor(name: string, status = TodoStatus.active) {
        super();

        this.id = ++uid;
        this.name = name;
        this.status = status;
    }

    isActive() {
        return this.status === TodoStatus.active;
    }

    isCompleted() {
        return this.status === TodoStatus.completed;
    }

    toggleStatus() {
        const todo: TodoModel = this;
        const newStatus = (
            todo.status === TodoStatus.active ?
                TodoStatus.completed :
                TodoStatus.active
        );
        
        todo.setStatus(newStatus);
    }

    setStatus(newStatus: TodoStatus) {
        const todo: TodoModel = this;
        
        todo.set({
            status: newStatus
        });
    }

    setName(newName: string) {
        const todo: TodoModel = this;
        
        todo.set({
            name: newName
        });
    }

    enableEdit() {
        const todo: TodoModel = this;
        
        todo.set({
            editing: true
        });
    }

    disableEdit() {
        const todo: TodoModel = this;
        
        todo.set({
            editing: false
        });
    }

    toJSON(): ITodoRow {
        const row = {
            id: this.id,
            name: this.name,
            status: this.status
        };
        return row;
    }
}