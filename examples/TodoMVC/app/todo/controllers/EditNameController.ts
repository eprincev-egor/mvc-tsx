import { Controller, on, arg } from "mvc-tsx";
import { TodoModel } from "../TodoModel";
import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from "../../keyCodes";

export class EditNameController extends Controller<TodoModel> {

    @on("dblclick", ".StartEdit")
    onStartEdit(@arg("target") target: HTMLDivElement) {
        const todo = this.model;
        todo.enableEdit();
    }

    @on("keyup", ".EditNameInput")
    onKeyupEditInput(
        @arg("keyCode") keyCode: number,
        @arg("target", "value") inputValue: string
    ) {
        if ( keyCode === ENTER_KEY_CODE ) {
            this.onPressEnter(inputValue);
        }
        if ( keyCode === ESCAPE_KEY_CODE ) {
            this.onPressEscape();
        }
    }

    private onPressEnter(inputValue: string) {
        const todo = this.model;
        todo.disableEdit();
        todo.setName(inputValue);
    }

    private onPressEscape() {
        const todo = this.model;
        todo.disableEdit();
    }
}