import { Controller, on, arg } from "mvc-tsx";
import { AppModel } from "../AppModel";
import { ENTER_KEY_CODE } from "../keyCodes";

interface IInput {
    value: string;
}

export class AddTodoController extends Controller<AppModel> {

    @on("keyup", ".AddTodo")
    onKeyupInput(
        @arg("keyCode") keyCode: number,
        @arg("target") input: IInput
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
