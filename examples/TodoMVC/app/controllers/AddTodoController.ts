import { Controller, on, event, forView } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { ENTER_KEY_CODE } from "../keyCodes";
import { AppView } from "../AppView";

interface IInput {
    value: string;
}

@forView(AppView)
export class AddTodoController extends Controller<AppModel> {

    @on("keyup", AppView.ui.addTodo)
    onKeyupInput(
        @event("keyCode") keyCode: number,
        @event("target") input: IInput
    ) {
        if ( keyCode === ENTER_KEY_CODE ) {
            this.onPressEnter(input);
        }
    }

    onPressEnter(input: IInput) {
        this.createTodo(input.value);
        this.clearInput(input);
    }

    private createTodo(todoName: string) {
        const app = this.model;
        app.createTodo(todoName);
    }

    private clearInput(input: IInput) {
        input.value = "";
    }
}
