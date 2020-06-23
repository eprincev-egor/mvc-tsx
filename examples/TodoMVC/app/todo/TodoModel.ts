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

    status: TodoStatus = TodoStatus.active;
    id: number;
    name: string;
    
    constructor(name: string) {
        super();

        this.id = ++uid;
        this.name = name;
    }

    isActive() {
        return this.status === TodoStatus.active;
    }

    isCompleted() {
        return this.status === TodoStatus.completed;
    }

    setStatus(newStatus: TodoStatus) {
        const todo: TodoModel = this;
        
        todo.set({
            status: newStatus
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